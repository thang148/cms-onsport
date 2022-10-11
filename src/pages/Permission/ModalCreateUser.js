import React, { useEffect, useState } from "react"
import { Input, Modal, Select, Form, Button, DatePicker, notification } from "antd"
import { apiPermissionTV } from "api"
import moment from "moment-timezone"
import UploadImage from "components/UploadImage"

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
}
const { Option } = Select
const dfData = {
  email: "",
  first_name: "",
  groups: null,
  last_name: "",
  partner: 0,
  profile: {
    avatar: null,
    birth_day: moment(new Date(), "YYYY-MM-DD"),
    phone: null
  },
  username: "",
  password: ""
}

export default function ModalCreate({ visible, closeModal, submitModal, valEdit }) {
  const [form] = Form.useForm()
  const convertVal = valEdit
    ? {
        ...valEdit,
        groups: valEdit.groups[0],
        profile: {
          ...valEdit.profile,
          birth_day: valEdit?.profile?.birth_day
            ? moment(valEdit?.profile?.birth_day, "YYYY-MM-DD")
            : null
        }
      }
    : dfData
  const [values, setValues] = useState(convertVal)
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchGroup = async () => {
    try {
      const { data } = await apiPermissionTV.getGroups()
      setGroups(data)
    } catch (e) {
      console.log(e)
    }
  }

  async function onSubmit(values) {
    const bodyVal = {
      ...values,
      groups: [values.groups],
      profile: {
        ...values.profile,
        birth_day: moment(values.profile.birth_day).format("YYYY-MM-DD")
      }
    }
    setLoading(true)

    try {
      if (valEdit) {
        await apiPermissionTV.updateStaff(bodyVal, convertVal.id)
      } else {
        await apiPermissionTV.createStaff(bodyVal)
      }
      notification.success({
        message: valEdit ? "Chỉnh sửa thành công!" : "Tạo thành công!",
        duration: 2
      })
      submitModal()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onChangeData = (e) => {
    const regNumber = /^[0-9]*$/
    const val = e.target.value

    form.setFields([
      {
        name: ["profile", "phone"],
        value: regNumber.test(val) ? val : ""
      }
    ])
  }

  useEffect(() => {
    if (valEdit) {
      setValues(convertVal)
    } else {
      setValues(dfData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    fetchGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      title={valEdit ? "Cập nhật thông tin" : "Tạo mới"}
      visible={visible}
      onCancel={closeModal}
      footer={null}
      form={form}
    >
      <Form
        name="basic"
        {...layout}
        initialValues={values}
        onFinish={onSubmit}
        className="modal-form"
        form={form}
      >
        <Form.Item
          className="justify-center"
          name={["profile", "avatar"]}
          rules={[{ required: true, message: "Cần có ảnh!" }]}
        >
          <UploadImage className="upload-avatar-user" />
        </Form.Item>
        <Form.Item
          name="first_name"
          label="Họ"
          rules={[{ required: true, message: "Hãy điền họ!" }]}
        >
          <Input placeholder="Họ" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Tên"
          rules={[{ required: true, message: "Hãy điền tên!" }]}
        >
          <Input placeholder="Tên" />
        </Form.Item>

        <Form.Item
          name={["profile", "phone"]}
          label="Số điện thoại"
          rules={[
            { required: true, message: "Hãy điền tên!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const regPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/

                if (regPhone.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("Số điện thoại chưa đúng chuẩn!"))
              }
            })
          ]}
        >
          <Input
            className="modal-input-number"
            placeholder="Số điện thoại"
            onChange={onChangeData}
          />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name={["profile", "birth_day"]}
          rules={[{ required: true, message: "Ngày sinh không được để trống!" }]}
        >
          <DatePicker format="DD-MM-YYYY" placeholder="Ngày sinh" />
        </Form.Item>

        <Form.Item
          name="groups"
          label="Nhóm"
          rules={[{ required: true, message: "Hãy chọn nhóm người dùng!" }]}
        >
          <Select placeholder="Nhóm người dùng">
            {groups.map((item, index) => (
              <Option value={item.id} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="username"
          label="Tài khoản"
          rules={[
            {
              required: true,
              message: "Useranme không được để trống!"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                console.log(value)
                if (value === value.toLowerCase()) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error("Tài khoản phải là chữ thường, không dấu, không khoảng trống!")
                )
              }
            })
          ]}
        >
          <Input placeholder="Tài khoản..." disabled={valEdit ? true : false} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true, message: "Hãy nhập email!" }]}
        >
          <Input placeholder="Email" disabled={valEdit ? true : false} />
        </Form.Item>

        {!valEdit && (
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
            <Input.Password placeholder="Mật khẩu" autoComplete="new-password" />
          </Form.Item>
        )}
        <div className="col-span-2 flex justify-center">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Xác nhận
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}
