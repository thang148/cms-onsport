import { useRef, useState } from "react"
import { Modal, Form, Input, Row, Col, notification, Select } from "antd"
import { useEffect } from "react"
import { apiSubscription, apiTicket } from "api"
import { paramsUrl } from "lib/function"

const { Option } = Select
const dfParams = {
  page_num: 1,
  page_size: 500,
  count: 0,
  disable: false,
  ...paramsUrl.get()
}

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)
  const [dataSubscription, setDataSubscription] = useState([])
  useEffect(() => {
    fetch()
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetch() {
    try {
      let listSp = []
      setLoading(true)
      const { data } = await apiSubscription.getListSubscription(dfParams)
      listSp = data
      setDataSubscription(listSp)
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }
  function resetForm() {
    form.resetFields()
  }
  function onChangeName(e) {
    console.log("name", e.target.value)
  }
  function onChangeItem(value) {
    console.log("itemitemitem", item)
  }

  function onChangeSubscription(v) {
    console.log("aaaa")
  }
  function onFinish(values) {
    let dataCreateTicket = {
      user_id: parseInt(values.user_id),
      subscription_id: values.subscription_id
    }
    createTicket(dataCreateTicket)
    console.log("dataCreateTicket", dataCreateTicket)
  }
  async function createTicket(dataCreateTicket) {
    try {
      if (item) {
        await apiTicket.updateTicket(item.id, dataCreateTicket)
        notification.success({
          message: "Thông báo!",
          description: "Update Ticket thành công!"
        })
        onClose(true)
      } else {
        await apiTicket.createTicket(dataCreateTicket)
        notification.success({
          message: "Thông báo!",
          description: "Tạo mới Ticket thành công!"
        })
        onClose(true)
      }
    } catch (error) {
      throw error
    }
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

  return (
    <Modal
      title={item ? "Cập nhật Ticket" : "Thêm mới Ticket"}
      open={visible}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => onClose(false)}
    >
      <Form
        name="update_role"
        ref={formRef}
        onFinish={onFinish}
        form={form}
        onChange={onChangeItem}
        layout="vertical"
      >
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="User ID"
              name="user_id"
              onChange={onChangeName}
              rules={[{ required: true, message: "Nhập User ID !" }]}
            >
              <Input placeholder="1..2..3...." />
            </Form.Item>
            <Form.Item
              label="Chọn Subscription"
              name="subscription_id"
              rules={[{ required: true, message: "Chọn Subscription!" }]}
            >
              <Select
                allowClear
                className="w-full"
                value={"Subscription"}
                onChange={onChangeSubscription}
                placeholder="Chọn Subscription"
              >
                {dataSubscription?.map(({ name, id }) => {
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
      </Form>
    </Modal>
  )
}
