import { useRef, useState } from "react"
import { Modal, Form, Input, notification, Switch } from "antd"
import { useEffect } from "react"
import { apiBanner } from "api"
import UploadImageBanner from "../UploadImageBanner"

import DropdownEvents from "components/DropdownEvents"

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)

  async function onFinish(values) {
    try {
      setLoading(true)
      if (!values.event) {
        values.event = null
      }
      if (values.thumbnail.includes("http")) {
        const list = values.thumbnail.split("/")
        values.thumbnail = list[list.length - 1]
      }
      if (item) {
        await apiBanner.update(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
        setLoading(false)
        form.resetFields()
        form.setFieldsValue({
          is_active: true
        })
      } else {
        await apiBanner.create(values)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
        setLoading(false)
        form.resetFields()
        form.setFieldsValue({
          is_active: true
        })
      }
      onClose(true)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }
  function resetForm() {
    form.resetFields()
  }

  useEffect(() => {
    if (formRef.current) {
      if (item) {
        form.setFieldsValue({
          ...item,
          event: item?.id,
          thumbnail: `${item?.base_url}160x90/${item?.thumbnail}`
        })
      } else {
        form.resetFields()
        form.setFieldsValue({
          is_active: true
        })
        resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    resetForm()
    form.setFieldsValue({
      is_active: true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      title={item ? "Cập nhật" : "Thêm mới"}
      visible={visible}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => onClose(false)}
    >
      <Form name="update_slide" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Nhập title!" }]}>
          <Input placeholder="title..." />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Nhập description!" }]}
        >
          <Input.TextArea placeholder="description..." />
        </Form.Item>
        <Form.Item
          label="Ảnh"
          name="thumbnail"
          rules={[{ required: true, message: "Nhập thumbnail!" }]}
        >
          <UploadImageBanner aspect={16 / 9} />
        </Form.Item>

        <Form.Item label="Events" name="event">
          <DropdownEvents />
        </Form.Item>

        <Form.Item
          label="Link click (Kích hoạt khi không có event)"
          name="link"
          rules={[{ required: true, message: "Nhập vị trí!" }]}
        >
          <Input placeholder="https://onsports.vn/" />
        </Form.Item>
        <Form.Item
          label="Vị trí"
          name="order"
          rules={[{ required: true, message: "Nhập vị trí!" }]}
        >
          <Input placeholder="1,2,3..." />
        </Form.Item>

        <Form.Item label="Hiển thị" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}
