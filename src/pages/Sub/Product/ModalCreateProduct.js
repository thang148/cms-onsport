import { useRef, useState } from "react"
import { Modal, Form, Input, Row, Col, Switch, Select, notification, InputNumber } from "antd"
import { useEffect } from "react"
import { apiProduct } from "api"
import TextArea from "antd/lib/input/TextArea"

export default function App({ visible, onClose, item, packageID }) {
  const [form] = Form.useForm()
  const formRef = useRef(null)

  const [type, setType] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bonus, setBonus] = useState(false)
  const [rq, setRq] = useState(false)

  const timeSelect = [
    {
      name: "1 ngày",
      value: 1
    },
    {
      name: "1 tuần",
      value: 7
    },
    {
      name: "1 tháng",
      value: 30
    },
    {
      name: "3 tháng",
      value: 90
    },
    {
      name: "6 tháng",
      value: 180
    },
    {
      name: "1 năm",
      value: 365
    }
  ]
  const typeProduct = [
    {
      name: "Subscription",
      value: "SUBS"
    },
    {
      name: "Consumable Product",
      value: "ONE_TIME"
    },
    {
      name: "Gold",
      value: "GOLD"
    }
  ]

  function resetForm() {
    form.resetFields()
  }

  function onChangeType(value) {
    setType(value)
    if (value !== "SUBS") {
      setType(false)
      form.setFieldsValue({ period: undefined })
    } else {
      setType(true)
    }
  }
  function handleBonus(value) {
    if (value === false) {
      form.setFieldsValue({ is_bonus: false, gold_bonus_amount: undefined })
    }
    setBonus(value)
  }

  async function onFinish(values) {
    let dataBody = values
    setLoading(true)
    try {
      if (item) {
        await apiProduct.updateProduct(item.id, dataBody)
        notification.success({
          message: "Thông báo!",
          description: "Update Product thành công!"
        })
        onClose(true)
      } else {
        dataBody.package_id = Number.parseInt(packageID)
        await apiProduct.createProduct(dataBody)
        notification.success({
          message: "Thông báo!",
          description: "Tạo mới Product thành công!"
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
  function onChangeVNP(value) {
    if (value?.target.value) {
      setRq(true)
    } else {
      setRq(false)
    }
  }
  useEffect(() => {
    if (formRef.current) {
      if (item) {
        if (item?.is_bonus === true) {
          handleBonus(item?.is_bonus)
        } else {
          handleBonus(false)
        }
        if (item?.type === "SUBS") {
          setType(true)
        }
        form.setFieldsValue(item)
      }
      if (item === false) {
        resetForm()
        handleBonus(false)
        setBonus(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    setBonus(false)
    // fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      title={item ? "Cập nhật Product" : "Thêm mới Product"}
      visible={visible}
      onOk={() => form.submit()}
      onCancel={() => onClose(false)}
      confirmLoading={loading}
      width={640}
    >
      <Form name="update_role" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="Tên Product"
              name="name"
              rules={[{ required: true, message: "Nhập tên Product !" }]}
            >
              <Input placeholder="Gói khám phá ..." />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={rq && [{ required: true, message: "Nhập mô tả !" }]}
            >
              <TextArea placeholder="Gói 1 tuần..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Content pack VNP"
              name="contentpack"
              rules={[{ required: true, message: "Nhập Contentpack!" }]}
            >
              <Input placeholder="Content pack VNP..." onChange={onChangeVNP} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Đầu số dịch vụ"
              name="service_number"
              rules={rq && [{ required: true, message: "Nhập đầu số dịch vụ !" }]}
            >
              <Input placeholder="Đầu số dịch vụ..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Cú pháp đăng ký"
              name="sms_register_syntax"
              rules={rq && [{ required: true, message: "Nhập cú pháp đăng ký !" }]}
            >
              <Input placeholder="Cú pháp đăng ký..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Cú pháp hủy"
              name="sms_cancel_syntax"
              rules={rq && [{ required: true, message: "Nhập cú pháp hủy !" }]}
            >
              <Input placeholder="Cú pháp hủy..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Mt đăng ký"
              name="mt_register"
              rules={[{ required: true, message: "Nhập mt !" }]}
            >
              <TextArea placeholder="mt đăng ký..." />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mt gia hạn"
              name="mt_renew"
              rules={[{ required: true, message: "Nhập mt !" }]}
            >
              <TextArea placeholder="Mt gia hạn..." />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              label="SKU IOS"
              name="ios_sku"
              rules={!rq && [{ required: true, message: "Nhập ios_sku !" }]}
            >
              <Input disabled={item} placeholder="sub_one_week..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="SKU ANDROID"
              name="android_sku"
              rules={!rq && [{ required: true, message: "Nhập android_sku !" }]}
            >
              <Input disabled={item} placeholder="sub_one_week..." />
            </Form.Item>
          </Col> */}
          <Col span={12}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: " Chọn Type !" }]}
            >
              <Select disabled={item} placeholder="Chọn Type" onChange={onChangeType}>
                {typeProduct?.map(({ value, name }) => {
                  return (
                    <Select.Option value={value} key={value}>
                      {name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          {type === true && (
            <Col span={12}>
              <Form.Item
                label="Thời gian"
                name="period"
                rules={[{ required: true, message: "Nhập thời gian !" }]}
              >
                <Select placeholder="Chọn thời gian">
                  {timeSelect?.map(({ value, name }) => {
                    return (
                      <Select.Option value={value} key={value}>
                        {name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: { type: true }, message: "Nhập giá !" }]}
            >
              <InputNumber
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                style={{ width: "100%" }}
                placeholder="500000..."
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Gold"
              name="gold_amount"
              rules={[{ required: false, message: "Nhập gold !" }]}
            >
              <InputNumber
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                style={{ width: "100%" }}
                placeholder="500000..."
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Siêu tiết kiệm" name="is_eco" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Bonus" name="is_bonus" valuePropName="checked">
              <Switch onChange={handleBonus} />
            </Form.Item>
          </Col>
          {bonus && (
            <Col span={12}>
              <Form.Item
                label="Gold Bonus"
                name="gold_bonus_amount"
                rules={[{ required: false, message: "Nhập GOLD !" }]}
              >
                <InputNumber
                  formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  style={{ width: "100%" }}
                  placeholder="500000..."
                  min={0}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  )
}
