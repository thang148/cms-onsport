import { useRef, useState } from "react"
import { Form, Input, notification, Modal, Select } from "antd"
import { useEffect } from "react"
import { apiNotification } from "api"
import UploadImageOnTVDF from "components/UploadImageOnTVDF"
import DropdownEvents from "components/DropdownEvents"
import DropdownVideo from "components/DropdownVideo"

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)
  const [typeLink, setTypeLink] = useState(0)
  const typeLinks = [
    {
      name: "Sự kiện",
      value: 1
    },
    {
      name: "Video",
      value: 2
    }
  ]

  async function onFinish(values) {
    try {
      setLoading(true)
      let data = {
        title: values?.title,
        body: values?.body,
        image_uri: values?.image_uri,
        data: {},
        target_type: 1,
        delivery_mode: 0
      }
      if (values?.event !== undefined) {
        data.data = {
          deep_link: `https://tv.onsports-dev.com/video?id=` + values?.event + `&type=0`,
          type: 1,
          id_event: values?.event
        }
      } else if (values?.video !== undefined) {
        data.data = {
          deep_link: `https://tv.onsports-dev.com/video?id=` + values?.video + `&type=2`,
          type: 2,
          id_video: values?.video
        }
      } else if (values?.link !== undefined) {
        data.data = {
          deep_link: values?.link,
          type: 0,
          id_link: values?.link
        }
      }

      if (item) {
        await apiNotification.update(item.id, data)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
        setLoading(false)
      } else {
        await apiNotification.create(data)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
        setLoading(false)
      }
      onClose(true)
      resetForm()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }
  function onChangeTypeLink(value) {
    setTypeLink(value)
  }
  function resetForm() {
    const event_id = localStorage.getItem("event_id")
    form.resetFields()
    form.setFieldsValue({ event: event_id })
    localStorage.removeItem("event_id")
  }
  useEffect(() => {
    if (formRef.current) {
      if (item) {
        form.setFieldsValue({
          ...item,
          image_uri: item?.image_uri,
          type_link: item?.data?.type,
          link: item?.data?.id_link,
          event: item?.data?.id_event,
          video: item?.data?.id_video
        })
        setTypeLink(item.data.type)
      } else {
        form.resetFields()
        resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Modal
      title={item ? "Cập nhật thông báo" : "Thêm mới thông báo"}
      visible={visible}
      width={640}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => onClose(false)}
    >
      <Form name="update_role" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Nhập tiêu đề!" }]}
        >
          <Input placeholder="Nhập tiêu đề..." />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="body"
          rules={[{ required: true, message: "Nhập nội dung !" }]}
        >
          <Input placeholder="Nội dung..." />
        </Form.Item>
        <div className="p-2 border border-gray-300 mb-4">
          <Form.Item
            label="Loại link"
            name="type_link"
            rules={[{ required: true, message: "Nhập thumbnail!" }]}
          >
            <Select placeholder="Chọn loại link" onChange={onChangeTypeLink}>
              {typeLinks?.map(({ value, name }) => {
                return (
                  <Select.Option value={value} key={value}>
                    {name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>

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
        <Form.Item
          label="Ảnh"
          name="image_uri"
          rules={[{ required: false, message: "Chọn ảnh !" }]}
        >
          <UploadImageOnTVDF />
        </Form.Item>
      </Form>
    </Modal>
  )
}
