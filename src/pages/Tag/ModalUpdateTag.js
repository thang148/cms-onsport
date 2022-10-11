import React, { useState, useEffect } from "react"
import { Input, Modal, Form, Button, notification } from "antd"
import { apiOnposrtTag } from "api"
import slugify from "slugify"

export default function ModalUpdateTag({ visible, handleClose, itemData, submitData }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    const formData = {
      ...itemData,
      name: values.name,
      code: values.code
    }

    setLoading(true)
    try {
      await apiOnposrtTag.updateTags(formData, itemData.id)
      notification.success({
        message: "Chỉnh sửa thành công!",
        duration: 2
      })
      submitData(formData)
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
        initialValues={itemData}
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
              rules={[{ required: true, message: "Hãy điền tên tag!" }]}
            >
              <Input placeholder="Điền tên tag" onChange={onChangeName} />
            </Form.Item>
          </div>
          <div className="col-span-2">
            <Form.Item
              name="code"
              label="Mã tag"
              rules={[{ required: true, message: "Hãy điền mã tag!" }]}
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
