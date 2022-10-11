import { useRef, useState } from "react"
import {
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  Tag,
  notification,
  Switch,
  Space,
  Button,
  Spin
} from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { apiMiniGame } from "api"
import UploadImageOnsport from "components/ModalNas/FolderNas"
import moment from "moment-timezone"

const { Option } = Select

export default function App({ visible, onClose, item }) {
  const [options, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)
  const [dataEvent, setDataEvent] = useState([])
  const [dataMiniGame, setDataMiniGame] = useState([])
  const [detailEvent, setDetailEvent] = useState([])
  const __time = useRef()

  async function fetch(search, id) {
    setLoading(true)
    setDataEvent([])
    let _rows = []
    try {
      const { data } = await apiMiniGame.getEventsLive({ name: search, id })
      _rows = data.map(({ id, name, is_active }) => {
        return { value: id, label: name, is_active: is_active }
      })
    } catch (e) {
      throw e
    } finally {
      setDataEvent(_rows)
      setLoading(false)
    }
  }
  function onChangeSearch(value) {
    if (__time.current) {
      clearTimeout(__time.current)
    }
    __time.current = setTimeout(() => {
      fetch(value)
    }, [400])
  }
  async function getMiniGame() {
    try {
      setLoading(true)
      const { data } = await apiMiniGame.getMiniGame()
      setDataMiniGame(data)
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }

  function onChangeEvent(event_id) {
    if (event_id !== undefined) {
      getDetailEvent(event_id)
      form.setFieldsValue({
        is_active: false
      })
    } else {
      form.resetFields()
      resetForm()
    }
  }

  async function getDetailEvent(event_id) {
    const { data } = await apiMiniGame.getDetailEvent(event_id)
    setDetailEvent(data)
    let resultData = [
      {
        name: `${data?.attribute?.home_name} Thắng`,
        description: `${data?.attribute?.home_name} Thắng`
      },
      {
        name: `${data?.attribute?.away_name} Thắng`,
        description: `${data?.attribute?.away_name} Thắng`
      },
      {
        name: "Hòa",
        description: "Hòa"
      }
    ]
    form.setFieldsValue({
      league_name: data?.league?.name,
      start_time: moment(data?.start_time * 1000).format("HH:mm DD-MM-Y"),
      home_name: data?.attribute?.home_name,
      home_logo: data?.attribute?.home_logo,
      home_short_name: data?.attribute?.home_short_name,
      away_name: data?.attribute?.away_name,
      away_logo: data?.attribute?.away_logo,
      away_short_name: data?.attribute?.away_short_name,
      result: resultData
    })
  }

  async function onFinish(values) {
    if (item) {
      updateMiniGame(values)
    } else {
      createMiniGame(values)
    }
  }

  async function createMiniGame(values) {
    if (values?.result && values?.result.length !== 0) {
      for (let i = 0; i < values?.result.length; i++) {
        values.result[i].sort_order = i + 1
      }
    }
    let dataCreateMiniGame = {
      event_id: detailEvent?.id,
      match_sync_id: detailEvent?.match_sync_id,
      mini_game: values?.mini_game,
      attribute: {
        home_name: values?.home_name,
        home_short_name: values?.home_short_name,
        home_score: 0,
        home_logo: values?.home_logo,
        away_name: values?.away_name,
        away_score: 0,
        away_short_name: values?.away_short_name,
        away_logo: values?.away_logo,
        league_id: detailEvent?.league?.id,
        league_name: detailEvent?.league?.name,
        league_logo_custom: detailEvent?.attribute?.league_logo_custom
      },
      name: detailEvent?.name,
      image: detailEvent?.thumbnail,
      start_time: detailEvent?.start_time,
      sport_type: "soccer",
      is_active: values?.is_active,
      results: values?.result
    }

    try {
      setLoading(true)
      await apiMiniGame.createMiniGameEvent(dataCreateMiniGame)
      notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
      setLoading(false)
      setDetailEvent()
      onClose(true)
      resetForm()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function updateMiniGame(values) {
    if (values?.result && values?.result.length !== 0) {
      for (let i = 0; i < values?.result.length; i++) {
        values.result[i].sort_order = i + 1
      }
    }
    let dataUpdateMiniGame = {
      event_id: item?.event_id,
      match_sync_id: item?.match_sync_id,
      mini_game: values?.mini_game,
      attribute: {
        home_name: values?.home_name,
        home_score: 0,
        home_logo: values?.home_logo,
        home_short_name: values?.home_short_name,
        away_name: values?.away_name,
        away_score: 0,
        away_logo: values?.away_logo,
        away_short_name: values?.away_short_name,
        league_id: item?.attribute?.league_id,
        league_name: item?.attribute?.league_name,
        league_logo_custom: item?.attribute?.league_logo_custom
      },
      name: item?.name,
      description: item?.description,
      image: item?.image,
      start_time: item?.start_time,
      end_time: null,
      is_active: values?.is_active,
      sport_type: "soccer",
      status: 1,
      results: values?.result
    }
    try {
      setLoading(true)
      await apiMiniGame.updateMiniGameEvent(item.id, dataUpdateMiniGame)
      notification.success({ message: "Thông báo!", description: "Cập nhật thành công!" })
      setLoading(false)
      setDetailEvent()
      onClose(true)
      resetForm()
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
    fetch()
    getMiniGame()
    if (formRef.current) {
      if (item) {
        form.setFieldsValue({
          ...item,
          ...item.attribute,
          event: item?.event_id,
          league_name: item?.attribute?.league_name,
          result: item?.results,
          start_time: moment(item?.start_time * 1000).format("HH:mm DD-MM-Y")
        })
      } else {
        form.resetFields()
        resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Modal
      title={item ? "Cập nhật Event Mini Game" : "Thêm mới Event Mini Game"}
      visible={visible}
      width={640}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => onClose(false)}
      afterClose={() => resetForm()}
    >
      <Form name="update_role" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Sự kiện"
              name="event"
              rules={[{ required: true, message: "Chọn sự kiện !" }]}
            >
              <Select
                showSearch
                loading={loading}
                className="w-full"
                placeholder="Chọn event..."
                allowClear
                onClear={onChangeSearch}
                filterOption={false}
                notFoundContent={loading ? <Spin size="small" /> : "Không tìm thấy"}
                options={dataEvent}
                onSearch={onChangeSearch}
                onChange={onChangeEvent}
                disabled={item}
              >
                {/* {dataEvent.length > 0 &&
                  dataEvent.map(({ id, name, is_active }) => {
                    return (
                      <Option key={id} value={id} disabled={!is_active}>
                        {name}
                      </Option>
                    )
                  })} */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Chọn Mini Game"
              name="mini_game"
              rules={[{ required: true, message: "Chọn Mini Game !" }]}
            >
              <Select
                showSearch
                className="w-full"
                dropdownStyle={{ maxHeight: 600, overflow: "auto" }}
                placeholder="Chọn Mini Game..."
                allowClear
                onChange={onChangeEvent}
              >
                {dataMiniGame.length > 0 &&
                  dataMiniGame.map(({ id, name, is_active }) => {
                    return (
                      <Option key={id} value={id} disabled={!is_active}>
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
            <Form.Item label="Giải đấu" name="league_name">
              <Input readOnly placeholder="Premier League ..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Thời gian bắt đầu" name="start_time">
              <Input readOnly placeholder="20-03-2022 22:15" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Trạng thái" name="is_active" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <div className="border border-blue-600 p-4 rounded relative mt-4">
              <Tag color="blue" className="mb-2 absolute z-10 tag_name left-2">
                Đội chủ nhà
              </Tag>
              <Form.Item label="Tên đội" name="home_name">
                <Input readOnly placeholder="Cheales..." />
              </Form.Item>
              <Form.Item
                label="Tên đội viết tắt"
                name="home_short_name"
                rules={[{ required: true, message: "Nhập tên viết tắt đội bóng !" }]}
              >
                <Input placeholder="Tottenham..." />
              </Form.Item>
              <div className="flex justify-between">
                <Form.Item label="Logo" name="home_logo">
                  <UploadImageOnsport />
                </Form.Item>
              </div>
            </div>
          </Col>

          <Col span={12}>
            <div className="border border-blue-600 p-4 rounded relative mt-4">
              <Tag color="#87d068" className="mb-2 absolute z-10 tag_name left-2">
                Đội khách
              </Tag>
              <Form.Item label="Tên đội" name="away_name">
                <Input readOnly placeholder="Tottenham..." />
              </Form.Item>
              <Form.Item
                label="Tên đội viết tắt"
                name="away_short_name"
                rules={[{ required: true, message: "Nhập tên viết tắt đội bóng !" }]}
              >
                <Input placeholder="Tottenham..." />
              </Form.Item>
              <div className="flex justify-between">
                <Form.Item label="Logo" name="away_logo">
                  <UploadImageOnsport />
                </Form.Item>
              </div>
            </div>
          </Col>
          <Col span={24} className="flex mt-4">
            <Form.List name="result">
              {(result, { add, remove }) => (
                <>
                  {result.map(({ description, name, ...restField }) => (
                    <Space
                      key={description}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[{ required: true, message: "Nhập đáp án" }]}
                      >
                        <Input style={{ width: 290 }} placeholder="Cheales thắng !" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      style={{ width: 290 }}
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm đáp án
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
