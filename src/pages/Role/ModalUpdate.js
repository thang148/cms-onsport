import { useRef, useState } from "react"
import { Modal, Form, Input, Switch, notification } from "antd"
import { useEffect } from "react"
import { apiRole } from "api"

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)

  async function onFinish(values) {
    try {
      setLoading(true)
      if (item) {
        await apiRole.updateRole(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiRole.createRole(values)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
      }
      onClose(true)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (formRef.current) {
      if (item) {
        form.setFieldsValue(item)
      } else {
        form.resetFields()
        form.setFieldsValue({
          isActived: true
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Modal
      title={item ? "Cập nhật vai trò" : "Thêm vai trò"}
      visible={visible}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => onClose(false)}
    >
      <Form name="update_role" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          label="Tên vai trò"
          name="name"
          hasFeedback
          rules={[{ required: true, message: "Nhập name!" }]}
        >
          <Input placeholder="Admin..." />
        </Form.Item>

        <Form.Item
          label="Mã code"
          hasFeedback
          name="code"
          rules={[{ required: true, message: "Nhập code" }]}
        >
          <Input placeholder="sale..." />
        </Form.Item>

        <Form.Item
          label="Mô tả vai trò"
          name="description"
          hasFeedback
          rules={[{ required: true, message: "Nhập mô tả!" }]}
        >
          <Input.TextArea placeholder="Dùng để làm gì..." />
        </Form.Item>

        <Form.Item label="Trạng thái" name="isActived" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}
