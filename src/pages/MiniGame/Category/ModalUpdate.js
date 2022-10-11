import { useRef, useState } from "react"
import { Modal, Form, Input, Row, Switch, Col, notification } from "antd"
import { useEffect } from "react"
// import DropdownTypeOnTV from "components/DropdownTypeOnTV"
import { apiMiniGame } from "api"

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)

  async function onFinish(values) {
    values.sort_order = parseInt(values?.sort_order)
    try {
      setLoading(true)
      if (item) {
        await apiMiniGame.updateCategoryMiniGame(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiMiniGame.createCategoryMiniGame(values)
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

  function resetForm() {
    form.resetFields()
    form.setFieldsValue({
      is_active: true,
      is_liveshow: false
    })
  }

  useEffect(() => {
    if (formRef.current) {
      if (item) {
        form.setFieldsValue(item)
      } else {
        resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      title={item ? "Cập nhật" : "Thêm mới"}
      visible={visible}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => onClose(false)}
      afterClose={() => resetForm()}
    >
      <Form name="update_slide" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Nhập tên Category !" }]}
        >
          <Input placeholder="title..." />
        </Form.Item>

        <Form.Item
          label="Vị trí"
          name="sort_order"
          rules={[{ required: true, message: "Nhập vị trí!" }]}
        >
          <Input placeholder="Vị trí hiển thị..." />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Hiển thị" name="is_active" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
