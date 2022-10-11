import { useRef, useState } from "react"
import { Modal, Form, Input, notification, Switch, Col, Row } from "antd"
import { useEffect } from "react"
import { apiAdvertising } from "api"
import UploadImageAds from "../UploadImageAds"

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)

  async function onFinish(values) {
    let dataAds = {
      key: values?.key,
      value: { thumbnail: values?.thumbnail, link: values?.link },
      is_active: values?.is_active
    }
    try {
      setLoading(true)
      if (item) {
        await apiAdvertising.editAds(item?.id, dataAds)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
        setLoading(false)
        form.resetFields()
        form.setFieldsValue({
          is_active: true
        })
      } else {
        await apiAdvertising.createAds(dataAds)
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
        form.setFieldsValue({ ...item, link: item?.value?.link, thumbnail: item?.value?.thumbnail })
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
    form.setFieldsValue({
      is_active: true
    })
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      title={item ? "Cập nhật" : "Thêm mới"}
      open={visible}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => {
        resetForm()
        if (item) {
          form.setFieldsValue({
            ...item,
            link: item?.value?.link,
            thumbnail: item?.value?.thumbnail
          })
        }
        onClose(false)
      }}
    >
      <Form name="update_slide" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="Key"
              name="key"
              hasFeedback
              rules={[{ required: true, message: "Nhập Key!" }]}
            >
              <Input placeholder="Key..." />
            </Form.Item>
            <Form.Item
              label="Link"
              name="link"
              hasFeedback
              rules={[{ required: true, message: "Nhập link!" }]}
            >
              <Input placeholder="title..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ảnh"
              name="thumbnail"
              rules={[{ required: true, message: "Nhập thumbnail!" }]}
            >
              <UploadImageAds aspect={1 / 2.1653} />
            </Form.Item>
          </Col>
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
