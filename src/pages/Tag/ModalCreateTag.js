import React, { useEffect, useState } from "react"
import { Input, Modal, Form, Button, notification } from "antd"
import { apiOnposrtTag } from "api"
import slugify from "slugify"

export default function ModalCreateTag({ visible, handleClose, submitData }) {
  const [form] = Form.useForm()
  const [dataInput] = useState({
    name: "",
    code: ""
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    const formData = {
      name: values.name,
      code: values.code
    }

    setLoading(true)
    try {
      const res = await apiOnposrtTag.createTags(formData)
      notification.success({
        message: "Tạo thành công!",
        duration: 2
      })
      submitData(res)
      handleClose()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  function onChangeName(e) {
    const temp = form.getFieldValue("name")
    form.setFields([
      {
        name: "code",
        value: slugify(temp, { locale: "vi", lower: true })
      }
    ])
  }

  useEffect(() => {
    if (form) form.resetFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <Modal
      title={"Cập nhật thông tin tag"}
      visible={visible}
      onCancel={handleClose}
      footer={null}
      form={form}
    >
      <Form
        name="basic"
        initialValues={dataInput}
        onFinish={handleSubmit}
        className="modal-form"
        form={form}
        // onFinishFailed={onFinishFailed}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Form.Item
              name="name"
              label="Tên tag"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Điền tên tag" onChange={onChangeName} />
            </Form.Item>
          </div>
          <div className="col-span-2">
            <Form.Item
              name="code"
              label="Mã tag"
              rules={[{ required: true, message: "Please input your code!" }]}
            >
              <Input placeholder="Điền mã tag" />
            </Form.Item>
          </div>
          <div className="col-span-2">
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Xác nhận
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
