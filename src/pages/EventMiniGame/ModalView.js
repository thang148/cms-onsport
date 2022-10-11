import { useRef, useState } from "react"
import {
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  Tag,
  Radio,
  Switch,
  Space,
  Button,
  notification
} from "antd"
import { useEffect } from "react"
import { apiMiniGame } from "api"
import UploadImageOnsport from "components/ModalNas/FolderNas"
import moment from "moment-timezone"
import { getUser } from "lib/function"
const { Option } = Select

export default function App({ visible, onClose, item }) {
  const [form] = Form.useForm()
  const formRef = useRef(null)
  const [dataEvent, setDataEvent] = useState([])
  const [dataDetailMiniGame, setDetailMiniGame] = useState([])
  const [checkCancel, setcheckCancel] = useState(false)
  const [value, setValue] = useState(0)
  const [resultsArr, setresultsArr] = useState([])
  const user = getUser()

  async function fetch() {
    try {
      const { data } = await apiMiniGame.getEventsLive()
      setDataEvent(data)
    } catch (e) {
      throw e
    } finally {
    }
  }

  async function getDetailMiniGame(minigame_id) {
    try {
      const data = await apiMiniGame.getDetailMiniGame(minigame_id)
      setDetailMiniGame(data)
      if (data?.status === 2 || data?.status === 7) {
        setcheckCancel(true)
        form.setFieldsValue({
          status: true
        })
      } else {
        setcheckCancel(false)
        form.setFieldsValue({
          status: false
        })
      }
    } catch (error) {
      throw error
    } finally {
    }
  }
  function onChangeCancel(value) {
    setcheckCancel(value)
  }
  async function cancelMiniGame() {
    try {
      await apiMiniGame.cancelMiniGameEvent(item?.id)
      notification.success({ message: "Thông báo!", description: "Hủy kèo thành công" })
      resetForm()
      onClose(true)
    } catch (e) {
      throw e
    } finally {
      fetch()
    }
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }
  async function onConfirmValue() {
    let dataConfirm = {
      user_cms_id: user?.user_id,
      user_cms_name: user?.name,
      result_event_id: value,
      event_id: item?.id,
      state: true
    }

    try {
      const { data } = await apiMiniGame.confirmResultEvent(dataConfirm)
      notification.success({ message: "Thông báo !", description: data.message })
      onClose(true)
      fetch()
    } catch (e) {
      throw e
    }
  }
  async function onFinish(values) {}

  function resetForm() {
    form.resetFields()
  }
  useEffect(() => {
    fetch()
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
        setresultsArr(item?.results)
        getDetailMiniGame(item?.id)
      } else {
        form.resetFields()
        resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Modal
      title={"Chi tiết Mini Game"}
      visible={visible}
      width={640}
      onCancel={() => onClose(false)}
      footer={
        <div className="flex justify-end">
          {checkCancel === true && dataDetailMiniGame?.status !== 2 && (
            <div className="flex justify-end">
              <Button className="ant-btn" onClick={() => onClose(false)}>
                Cancel
              </Button>
              <Button className="ant-btn ant-btn-primary" onClick={() => cancelMiniGame()}>
                Xác nhận Hủy
              </Button>
            </div>
          )}
          {checkCancel === false && dataDetailMiniGame?.status === 3 && (
            <div className="flex justify-end">
              <Button className="ant-btn" onClick={() => onClose(false)}>
                Cancel
              </Button>
              <Button className="ant-btn ant-btn-primary" onClick={() => onConfirmValue()}>
                Xác nhận Đáp án
              </Button>
            </div>
          )}
          {checkCancel === false && dataDetailMiniGame?.status === 4 && (
            <div className="flex justify-end">
              <Button className="ant-btn" onClick={() => onClose(false)}>
                Cancel
              </Button>
              <Button className="ant-btn ant-btn-primary" onClick={() => onConfirmValue()}>
                Xác nhận Đáp án
              </Button>
            </div>
          )}
        </div>
      }
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
                className="w-full"
                dropdownStyle={{ maxHeight: 600, overflow: "auto" }}
                placeholder="Chọn sự kiện..."
                allowClear
                disabled={true}
              >
                {dataEvent.length > 0 &&
                  dataEvent.map(({ id, name }) => {
                    return (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    )
                  })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Chọn Mini Game"
              name="mini_game"
              rules={[{ required: true, message: "Chọn Mini Game !" }]}
            >
              <Input readOnly placeholder="Mini Game ..." />
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
          <Col span={6}>
            <Form.Item label="Trạng thái" name="is_active" valuePropName="checked">
              <Switch disabled={true} />
            </Form.Item>
          </Col>
          {dataDetailMiniGame?.status === 1 && (
            <Col span={6}>
              <Form.Item label="Hủy kèo" name="status" valuePropName="checked">
                <Switch onChange={onChangeCancel} />
              </Form.Item>
            </Col>
          )}
          {dataDetailMiniGame?.status === 2 && (
            <Col span={6}>
              <Form.Item label="Hủy kèo" name="status" valuePropName="checked">
                <Switch disabled={true} />
              </Form.Item>
            </Col>
          )}
          {dataDetailMiniGame?.status === 7 && (
            <Col span={6}>
              <Form.Item label="Hủy kèo" name="status" valuePropName="checked">
                <Switch disabled={true} />
              </Form.Item>
            </Col>
          )}
          {dataDetailMiniGame?.status === 3 && (
            <Col span={6}>
              <Form.Item label="Hủy kèo" name="status" valuePropName="checked">
                <Switch onChange={onChangeCancel} />
              </Form.Item>
            </Col>
          )}
          {dataDetailMiniGame?.status === 4 && (
            <Col span={6}>
              <Form.Item label="Hủy kèo" name="status" valuePropName="checked">
                <Switch onChange={onChangeCancel} />
              </Form.Item>
            </Col>
          )}
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
                <Input readOnly placeholder="Tottenham..." />
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
                <Input readOnly placeholder="Tottenham..." />
              </Form.Item>
              <div className="flex justify-between">
                <Form.Item label="Logo" name="away_logo">
                  <UploadImageOnsport />
                </Form.Item>
              </div>
            </div>
          </Col>
          {dataDetailMiniGame?.status === 1 && (
            <Col span={24} className="flex mt-4">
              <Form.List name="result">
                {(result) => (
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
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </Col>
          )}
          {dataDetailMiniGame?.status === 2 && (
            <Col span={24} className="flex mt-4">
              <div className="text-center  text-lg text-red-500">Trạng Thái: HỦY</div>
              <Form.List name="result">
                {(result) => (
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
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </Col>
          )}
          {dataDetailMiniGame?.status === 7 && (
            <Col span={24} className="flex mt-4">
              <div className="text-center  text-lg text-red-500">Trạng Thái: Đang hủy kèo</div>
              <Form.List name="result">
                {(result) => (
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
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </Col>
          )}
          {dataDetailMiniGame?.status === 3 && (
            <Col span={24} className="flex mt-4">
              <div className="text-center  text-lg text-red-500">Trạng Thái: Cập nhật kết quả</div>
              <Form.Item name="result">
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    {resultsArr.map(({ id, name }) => (
                      <Radio value={id}>{name}</Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          )}
          {dataDetailMiniGame?.status === 4 && (
            <Col span={24} className="flex mt-4">
              <div className="text-center  text-lg text-red-500">
                Trạng Thái: Cập nhật kết quả - 1/2
              </div>
              <Form.Item name="result">
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    {resultsArr.map(({ id, name }) => (
                      <Radio value={id}>{name}</Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          )}
          {dataDetailMiniGame?.status === 5 && (
            <Col span={24} className="flex mt-4">
              <div className="text-center  text-lg text-red-500">
                Trạng Thái: Cập nhật kết quả - 2/2
              </div>
            </Col>
          )}
          {dataDetailMiniGame?.status === 6 && (
            <Col span={24} className="flex mt-4">
              <div className="text-center  text-lg text-red-500">Trạng Thái: Hoàn thành kèo</div>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  )
}
