import { useState, useEffect } from "react"
import { Select, Row, Col, Input, Form, notification, Switch, Button, Tag, InputNumber } from "antd"
import { apiSubscription } from "api"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
const { Option } = Select

const listLevel = [
  { name: "Tất cả", id: 1 },
  { name: "Môn thể thao", id: 2 },
  { name: "Giải đấu", id: 3 }
]

export default function FormUpdateSubscription({ onClose, item }) {
  const [form] = Form.useForm()

  const [level, setLevel] = useState({})
  const [sportsType, setSportsType] = useState([])
  const [leagues, setLeagues] = useState([])

  // Check Level
  function onChangeLevel(v) {
    setLevel(v)
    form.setFieldsValue({ sport_info: undefined })
  }
  // Get Data
  async function getListSport() {
    try {
      let listSp = []
      const { data } = await apiSubscription.getListSport({})
      listSp = data
      setSportsType(listSp)
    } catch (error) {
      throw error
    }
  }

  async function getLeague(sport_ids) {
    try {
      let list = []

      let _parmas = {
        sport_ids: sport_ids?.toString(),
        page_num: 1,
        page_size: 5000
      }
      const { data } = await apiSubscription.getListLeagues(_parmas)
      list = data

      setLeagues(list)
    } catch (error) {
      throw error
    }
  }

  // Filter Data
  function onChangeSports(v) {
    if (level === 3) getLeague(v)
    const sport_info = form.getFieldsValue()?.sport_info
    form.setFieldsValue({ sport_info: { ...sport_info, league_ids: undefined } })
  }

  async function onFinish(values) {
    let max_device_special = {}
    if (values.max_device_special?.length > 0) {
      for (let i = 0; i < values.max_device_special.length; i++) {
        let item = values.max_device_special[i]
        max_device_special[item.league_special] = parseInt(item.max_device)
      }
    } else {
      max_device_special = undefined
    }
    const dataBody = {
      name: values?.name,
      description: values?.description,
      level: values?.level,
      sport_info: values.sport_info,
      is_play_ads: values?.is_play_ads,
      max_device: values?.max_device,
      max_device_special: JSON.stringify(max_device_special)
    }
    // console.log({ dataBody })
    // return
    try {
      if (item) {
        await apiSubscription.updateSubscription(item.id, dataBody)
        notification.success({
          message: "Thông báo!",
          description: "Update Subscription thành công!"
        })
        onClose(true)
        resetForm()
      } else {
        await apiSubscription.createSubscription(dataBody)
        notification.success({
          message: "Thông báo!",
          description: "Tạo mới Subscription thành công!"
        })
        onClose(true)
        resetForm()
      }
    } catch (error) {
      throw error
    }
  }

  function resetForm() {
    form.resetFields()
  }

  useEffect(() => {
    resetForm()
    let _level = 1
    if (item) {
      const { sport_info, description, level, is_play_ads, name, max_device_special, max_device } =
        item
      _level = level
      let newMax_device_special = []

      if (max_device_special) {
        for (const item of Object.keys(JSON.parse(max_device_special))) {
          // console.log({ item })
          newMax_device_special.push({
            league_special: item,
            max_device: JSON.parse(max_device_special)[item]
          })
        }
      }

      console.log(newMax_device_special)
      form.setFieldsValue({
        name: name,
        description: description,
        level: level,
        sport_info: sport_info,
        is_play_ads: is_play_ads,
        max_device: max_device,
        max_device_special: newMax_device_special
      })
      getLeague(sport_info?.sport_ids)
    } else {
      form.setFieldsValue({
        max_device: 3,
        level: 1,
        is_play_ads: false
      })
      getLeague()
    }
    setLevel(_level)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    getListSport()
  }, [])

  return (
    <Form name="update_subscription" onFinish={onFinish} form={form} layout="vertical">
      <div className="p-6">
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="Tên Subscription"
              name="name"
              rules={[{ required: true, message: "Nhập tên Subscrition !" }]}
            >
              <Input placeholder="Nhập tên Subscrition..." />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Nhập Description !" }]}
            >
              <Input.TextArea rows={5} placeholder="Nhập Description..." />
            </Form.Item>
            <Form.Item
              label="Chọn Level"
              name="level"
              rules={[{ required: true, message: "Chọn Level!" }]}
            >
              <Select
                allowClear
                className="w-full"
                value={level}
                onChange={onChangeLevel}
                placeholder="Chọn Level"
              >
                {listLevel?.map(({ name, id }) => {
                  return (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            {level > 1 && (
              <Form.Item
                label="Môn thể thao"
                name={["sport_info", "sport_ids"]}
                rules={[{ required: true, message: "Chọn bộ môn!" }]}
              >
                <Select
                  placeholder="Chọn môn thể thao ..."
                  allowClear
                  mode="multiple"
                  onChange={onChangeSports}
                  className="w-full"
                >
                  {sportsType?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            )}
            {level > 2 && (
              <Form.Item
                label="Giải đấu"
                // name="league_ids"
                name={["sport_info", "league_ids"]}
                rules={[{ required: true, message: "Chọn giải đấu!" }]}
              >
                <Select
                  placeholder="Chọn mùa giải ..."
                  allowClear
                  mode="multiple"
                  className="w-full"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {leagues?.map(({ id, sport, name }) => {
                    return (
                      <Option key={id} value={id}>
                        <div className="flex justify-between gap-2">
                          <span>{name}</span>
                          <Tag color={sport?.color}>{sport?.name}</Tag>
                        </div>
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            )}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <Form.Item
                  label="Số lượng thiết bị"
                  name="max_device"
                  rules={[{ required: true, message: "Nhập số lượng thiết bị!" }]}
                >
                  <InputNumber min={1} max={100} />
                </Form.Item>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1">
                <Form.Item label="Chạy quảng cáo" name="is_play_ads" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </div>
            </div>
            {/* <div>Ngoại trừ:</div> */}
            <div className="rounded border border-gray-400 p-4">
              <div className="grid grid-cols-11 gap-2">
                <div className="col-span-7">Giải đấu</div>
                <div className="col-span-3">Số thiết bị tối đa</div>
              </div>
              <Form.List name="max_device_special">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div className="grid grid-cols-11 gap-2">
                        <div className="col-span-7">
                          <Form.Item
                            {...restField}
                            name={[name, "league_special"]}
                            rules={[{ required: true, message: "Missing first name" }]}
                          >
                            <Select
                              placeholder="Chọn mùa giải ..."
                              className="w-full"
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {leagues?.map(({ id, sport, name, uuid }) => {
                                return (
                                  <Option key={id} value={uuid}>
                                    {name}
                                  </Option>
                                )
                              })}
                            </Select>
                          </Form.Item>
                        </div>
                        <div className="col-span-3">
                          <Form.Item
                            {...restField}
                            name={[name, "max_device"]}
                            rules={[{ required: true, message: "Missing last name" }]}
                          >
                            <Input placeholder="Nhập số lượng..." />
                          </Form.Item>
                        </div>
                        <div className="col-span-1">
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      </div>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm giới hạn cho từng giải đấu
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </Col>
        </Row>
      </div>
      <div className="flex justify-end gap-2 px-4 py-2 border-gray-200 border-t">
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Ok
        </Button>
      </div>
    </Form>
  )
}
