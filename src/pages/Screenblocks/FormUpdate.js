import { useState } from "react"
import { Form, Input, Switch, notification, Select, Button, InputNumber } from "antd"
import { useEffect } from "react"
import { apiScreenblockOnTV } from "api"
const { Option } = Select

export default function App({ onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [isEventLive, setEventLive] = useState(true)
  const [form] = Form.useForm()

  async function onFinish(values) {
    try {
      setLoading(true)
      if (item) {
        await apiScreenblockOnTV.update(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiScreenblockOnTV.create(values)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
      }
      resetForm()
      onClose(true)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  function onChangeTypeEvent(value) {
    setEventLive(value)
  }

  function resetForm() {
    form.resetFields()
    form.setFieldsValue({
      is_active: true,
      is_liveshow: false,
      is_live: true,
      os_display: 0
    })
    setEventLive(true)
  }

  useEffect(() => {
    if (item) {
      form.setFieldsValue(item)
      setEventLive(item?.is_live)
    } else {
      resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  const disabled = item?.id
  return (
    <div>
      <Form name="update_screenblock" onFinish={onFinish} form={form} layout="vertical">
        <div className="p-6">
          <Form.Item
            label="Tên khối"
            name="name"
            rules={[{ required: true, message: "Nhập tên khối!" }]}
          >
            <Input placeholder="title..." />
          </Form.Item>

          <Form.Item label="Vị trí" name="order_number">
            <InputNumber className="w-200" placeholder="Vị trí hiển thị..." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <Form.Item label="Hiển thị" name="is_active" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>
            <div className="col-span-1">
              <Form.Item label="Trực tiếp" name="is_live" valuePropName="checked">
                <Switch onChange={onChangeTypeEvent} disabled={disabled} />
              </Form.Item>
            </div>

            {isEventLive && (
              <div className="w-200">
                <Form.Item label="Loại sự kiện" name="is_liveshow">
                  <Select disabled={disabled}>
                    <Option value={false}>Live trận đấu</Option>
                    <Option value={true}>Talkshow</Option>
                  </Select>
                </Form.Item>
              </div>
            )}
          </div>
          <div className="w-200">
            <Form.Item label="Nền tảng sử dụng" name="os_display">
              <Select options={listViews} />
            </Form.Item>
          </div>
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

const listViews = [
  {
    label: "ALL",
    value: 0
  },
  {
    label: "MOBILE",
    value: 1
  },
  {
    label: "WEB",
    value: 2
  },
  {
    label: "SMART_TV",
    value: 3
  }
]
