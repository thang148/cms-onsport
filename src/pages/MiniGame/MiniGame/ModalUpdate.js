import { useRef, useState } from "react"
import { Modal, Form, Input, Row, Switch, Col, notification, Select } from "antd"
import { useEffect } from "react"
import UploadImageOnsport from "components/UploadImageOnsport"
import { apiMiniGame } from "api"
const { Option } = Select

export default function App({ visible, onClose, item, tabs }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)
  const [dataCategory, setdataCategory] = useState([])
  const [dataGameType, setdataGameType] = useState([])

  async function getCategoryMiniGame() {
    try {
      setLoading(true)
      const { data } = await apiMiniGame.getCategoryMiniGame()
      setdataCategory(data)
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }
  async function getGameType() {
    try {
      setLoading(true)
      const { data } = await apiMiniGame.getGameType()
      setdataGameType(data)
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }
  async function onFinish(values) {
    values.sort_order = parseInt(values?.sort_order)
    try {
      setLoading(true)
      if (item) {
        await apiMiniGame.updateMiniGame(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiMiniGame.createMiniGame(values)
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

  function onChangeCategory(value) {}

  function onChangeGameType(value) {}

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
        form.setFieldsValue({
          ...item,
          category: item?.category?.id,
          game_type: item?.game_type?.id
        })
      } else {
        resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    getCategoryMiniGame()
    getGameType()
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs])

  useEffect(() => {
    getCategoryMiniGame()
    getGameType()
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
          rules={[{ required: true, message: "Nhập tên Mini Game !" }]}
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
        <Form.Item
          label="Link"
          name="link"
          rules={[
            { required: true, message: "Nhập link !" },
            { type: "url", message: "Nhập đúng định dạng URL !" }
          ]}
        >
          <Input placeholder="Link...." />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Danh mục"
              name="category"
              rules={[{ required: true, message: "Chọn danh mục !" }]}
            >
              <Select
                // showSearch
                className="w-full"
                dropdownStyle={{ maxHeight: 600, overflow: "auto" }}
                placeholder="Chọn danh mục..."
                allowClear
                onChange={onChangeCategory}
              >
                {dataCategory.length > 0 &&
                  dataCategory.map(({ id, name, is_active }) => {
                    return (
                      <Option key={id} value={id} disabled={!is_active}>
                        {name}
                      </Option>
                    )
                  })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Loại Game"
              name="game_type"
              rules={[{ required: true, message: "Chọn loại game !" }]}
            >
              <Select
                // showSearch
                className="w-full"
                dropdownStyle={{ maxHeight: 600, overflow: "auto" }}
                placeholder="Chọn loại game..."
                allowClear
                onChange={onChangeGameType}
              >
                {dataGameType.length > 0 &&
                  dataGameType.map(({ id, name }) => {
                    return (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    )
                  })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Ảnh thumbnail"
              name="thumb"
              rules={[{ required: true, message: "Chọn ảnh thumbnail!" }]}
            >
              <UploadImageOnsport aspect={16 / 9} />
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
