import { useRef, useState, useEffect } from "react"
import { Row, Col, Input, Modal, Form, notification, Switch } from "antd"
import { apiPackage } from "api"
import UploadImageFullLink from "components/UploadImageFullLink"
import DropdownSubcription from "components/DropdownSubcription"

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const __level = useRef()
  const __subsName = useRef()
  const formRef = useRef(null)

  function onChangeItem(value) {}

  async function onFinish(values) {
    values.level = __level.current
    values.subs_name = __subsName.current
    setLoading(true)
    try {
      if (item) {
        await apiPackage.updatePackage(item.id, values)
        notification.success({
          message: "Thông báo!",
          description: "Update Package thành công!"
        })
        onClose(true)
        resetForm()
      } else {
        await apiPackage.createPackage(values)
        notification.success({
          message: "Thông báo!",
          description: "Tạo mới Package thành công!"
        })
        onClose(true)
        resetForm()
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  function onChangeLevel(v) {
    __level.current = v?.level
    __subsName.current = v?.label
  }
  function resetForm() {
    form.resetFields()
  }

  useEffect(() => {
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (formRef.current) {
      if (item) {
        form.setFieldsValue(item)
      } else {
        resetForm()
        form.setFieldsValue({ is_active: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Modal
      title={item ? "Cập nhật Subscription Group" : "Thêm mới Subscription Group"}
      open={visible}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => onClose(false)}
    >
      <Form
        name="update_subscription"
        ref={formRef}
        onFinish={onFinish}
        form={form}
        onChange={onChangeItem}
        layout="vertical"
      >
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="Tên Subscription Group"
              name="name"
              rules={[{ required: true, message: "Nhập tên Subscription Group!" }]}
            >
              <Input placeholder="Nhập tên Subscription Group..." />
            </Form.Item>

            <Form.Item
              label="Chọn Subscription"
              name="subs_id"
              rules={[{ required: true, message: "Chọn Subscription!" }]}
            >
              <DropdownSubcription onChangeLevel={onChangeLevel} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Nhập Description !" }]}
            >
              <Input.TextArea placeholder="Nhập Description..." rows={4} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Ảnh"
              name="image_uri"
              rules={[{ required: true, message: "Chọn ảnh !" }]}
            >
              <UploadImageFullLink aspect={16 / 9} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[{ required: false, message: "Chọn trạng thái" }]}
              label="Trạng thái"
              name="is_active"
              valuePropName="checked"
            >
              <Switch defaultChecked />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
