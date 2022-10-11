import { useRef, useState } from "react"
import { Form, Input, notification, Switch, InputNumber, Button } from "antd"
import { useEffect } from "react"
import { apiSlide } from "api"
import UploadImageBanner from "../UploadImageBanner"
import DropdownEvents from "components/DropdownEvents"
import DropdownVideo from "components/DropdownVideo"
import DropdownTypeLinkSlide from "components/DropdownTypeLinkSlide"

export default function App({ onClose, item, initslide }) {
  const [loading, setLoading] = useState(false)
  const [typeLink, setTypeLink] = useState(0)
  const [form] = Form.useForm()
  const formRef = useRef(null)
  async function onFinish(values) {
    try {
      setLoading(true)
      if (!values.event) {
        values.event = null
      }
      if (item) {
        if (values.thumbnail.includes("http")) {
          const str = values.thumbnail.split("/")
          values.thumbnail = str[str.length - 1]
        }
        await apiSlide.update(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
        setLoading(false)
        form.resetFields()
        form.setFieldsValue({
          is_visible: true
        })
      } else {
        await apiSlide.create(values)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
        setLoading(false)
        form.resetFields()
        form.setFieldsValue({
          is_visible: true
        })
      }
      onClose(true)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (item) {
      form.setFieldsValue({ ...item, event: item.event?.id, video: item?.video?.id })
      setTypeLink(item.type_link)
    } else {
      form.resetFields()
      if (initslide?.type_link) {
        setTypeLink(initslide.type_link)
      }
      form.setFieldsValue({
        is_visible: true,
        event: initslide?.event_id,
        type_link: initslide?.type_link
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  function onChangeTypeLink(value) {
    setTypeLink(value)
  }

  return (
    <div className="">
      <Form name="update_slide " ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <div className="p-6">
          <Form.Item
            label="Title"
            name="name"
            hasFeedback
            rules={[{ required: true, message: "Nhập title!" }]}
          >
            <Input placeholder="title..." />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="thumbnail"
            rules={[{ required: true, message: "Nhập thumbnail!" }]}
          >
            <UploadImageBanner aspect={16 / 9} />
          </Form.Item>
          <div className="p-2 border border-gray-300 mb-4">
            <Form.Item
              label="Loại link"
              name="type_link"
              rules={[{ required: true, message: "Nhập type link!" }]}
            >
              <DropdownTypeLinkSlide onChange={onChangeTypeLink} />
            </Form.Item>

            {typeLink === 0 && (
              <Form.Item name="link" rules={[{ required: true, message: "Nhập link!" }]}>
                <Input placeholder="https://onsports.vn/" />
              </Form.Item>
            )}

            {typeLink === 1 && (
              <Form.Item name="event" rules={[{ required: true, message: "Nhập link!" }]}>
                <DropdownEvents />
              </Form.Item>
            )}
            {typeLink === 2 && (
              <Form.Item name="video" rules={[{ required: true, message: "Nhập link!" }]}>
                <DropdownVideo />
              </Form.Item>
            )}
          </div>
          <Form.Item label="Vị trí" name="order_number" hidden>
            <InputNumber placeholder="1,2,3..." />
          </Form.Item>

          <Form.Item label="Hiển thị" name="is_visible" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>
        <div className="flex justify-end gap-2 px-4 py-2 border-gray-200 border-t">
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Ok
          </Button>
        </div>
      </Form>
    </div>
  )
}
