import { useState, Fragment, useEffect } from "react"
import {
  Form,
  notification,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Switch,
  Button
} from "antd"
import { apiEventTV } from "api"
import DropdownLeague from "components/DropdownLeague"
import DropdownChannel from "components/DropdownChannel"
import DropdownLiveSocre from "./DropdownLiveSocre"
import UploadImageOnsport from "components/UploadImageOnsport"
import moment from "moment-timezone"
import Info from "./Info"
import { listStatus } from "lib/Const"
import DropdownTagsOnSports from "components/DropdownTagsOnSports"
import DropdownBlocksOnSport from "components/DropdownBlocksOnSport"
import { TitlePage } from "components/ui"
import { SendOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import DropdownEventStatus from "components/DropdownEventStatus"
import { Skeleton } from "antd"

const { Option } = Select

export default function App() {
  const { event_id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadingInit, setLoadingInit] = useState(event_id === "new" ? false : true)
  const [isLive, setLive] = useState(true)
  const [league, setLeague] = useState({})
  const [payFee, setPayFee] = useState(false)
  const [dataONETIME, setdataONETIME] = useState([])
  const [dataEvent, setDataEvent] = useState([])
  const [form] = Form.useForm()

  function onChangeLeague(v) {
    setLeague(v)
    form.setFieldsValue({
      ...form.getFieldsValue(),
      season: v?.current_season
    })
  }

  async function onFinish(values) {
    let value_pr_name
    let value_pr_price
    let value_sku_ios
    let value_sku_android
    let value_sku_web
    if (payFee) {
      value_pr_name = values?.product_name
      value_pr_price = parseInt(values?.product_price)
      if (values?.ios_sku === "undefined") {
        value_sku_ios = ""
      } else {
        value_sku_ios = values?.ios_sku
      }
      if (values?.android_sku === "undefined") {
        value_sku_android = ""
      } else {
        value_sku_android = values?.android_sku
      }
      if (values?.web_sku === "undefined") {
        value_sku_web = ""
      } else {
        value_sku_web = values?.web_sku
      }
    } else {
      value_pr_name = null
      value_pr_price = 0
      value_sku_ios = ""
      value_sku_android = ""
      value_sku_web = ""
    }
    try {
      const __values = {
        match_sync_id: values?.match_sync_id,
        channel: values.channel,
        is_active: values.is_active,
        league: values.league ? values.league : null,
        name: values.name,
        screen_blocks: [values.screen_blocks],
        season: values.season,
        status: values.status,
        thumbnail: values.thumbnail,
        location: values.location,
        type: isLive ? 0 : 1,
        off_chat: values.off_chat,
        start_time: parseInt(moment(values.start_time).format("X")),
        over_time: parseInt(moment(values.start_time).add(values.over_time, "minutes").format("X")),
        attribute: {
          home_name: values.home_name ? values.home_name : null,
          home_score: values.home_score ? values.home_score : null,
          home_logo: values.home_logo ? values.home_logo : null,
          home_short_name: dataEvent?.home_short_name ? dataEvent?.home_short_name : null,
          away_name: values.away_name ? values.away_name : null,
          away_score: values.away_score ? values.away_score : null,
          away_logo: values.away_logo ? values.away_logo : null,
          away_short_name: dataEvent?.away_short_name ? dataEvent?.away_short_name : null,
          league_name: dataEvent?.league_name ? dataEvent?.league_name : null,
          league_id: dataEvent?.league_id ? dataEvent?.league_id : null,
          league_logo_custom: dataEvent?.league_logo_custom ? dataEvent?.league_logo_custom : null,
          match_time: values.match_time ? values.match_time : null
        },
        tags: values?.tags,
        skip_ads: values.skip_ads,
        shopping: values.shopping,
        product_name: value_pr_name,
        product_price: value_pr_price,
        ios_sku: value_sku_ios,
        android_sku: value_sku_android,
        web_sku: value_sku_web,
        auto_update_status: values.auto_update_status
      }

      setLoading(true)
      if (event_id !== "new") {
        await apiEventTV.update(event_id, __values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiEventTV.create(__values)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
      }
      navigate(-1)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }
  //FC Koln - Borussia Dortmund

  function onChangeTypeEvent(is_talkshow) {
    setLive(!is_talkshow)
  }

  // function onChangePayfee(is_payfee) {
  //   setPayFee(is_payfee)
  //   getProductONETIME()
  // }

  function onChangeProduct(product) {
    let productInfo = []
    if (product && product !== undefined) {
      let data = product.split(" - ")
      productInfo = data
    }
    console.log("nnnnn")
    form.setFieldsValue({
      ...form.getFieldsValue(),
      product_name: productInfo[0],
      product_price: productInfo[1],
      ios_sku: productInfo[2],
      android_sku: productInfo[3],
      web_sku: productInfo[4]
    })
  }

  async function getProductONETIME() {
    try {
      let params = {
        page_num: 1,
        page_size: 200
      }
      const { data } = await apiEventTV.getPaymentONETIME(params)
      setdataONETIME(data)
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }

  function onChangeItem(item) {
    const { home_name, away_name, match_time } = item
    setDataEvent(item)
    form.setFieldsValue({
      ...form.getFieldsValue(),
      match_sync_id: item.id,
      location: item.location,
      name: home_name || away_name ? home_name + " - " + away_name : "",
      home_name: item.home_name,
      home_score: item.home_score,
      home_logo: item.home_logo_custom,
      away_name: item.away_name,
      away_score: item.away_score,
      away_logo: item.away_logo_custom,
      third_party_id: item.third_party_id,
      start_time: match_time ? moment(match_time * 1000) : null,
      over_time: match_time ? 115 : null
    })
  }

  useEffect(() => {
    async function fetch() {
      setLoadingInit(true)
      try {
        const { data } = await apiEventTV.get(event_id)
        setLive(!data.screen_blocks[0]?.is_liveshow)
        if (data.product_name !== null && data.product_price !== 0) {
          data.pay_fee = true
          setPayFee(true)
        }
        form.setFieldsValue({
          ...data,
          ...data.attribute,
          channel: data?.channel?.id,
          league: data?.league?.id,
          screen_blocks: data?.screen_blocks[0]?.id,
          start_time: moment(data?.start_time * 1000),
          tags: data?.tags?.map((i) => {
            return i.id
          }),
          over_time: moment(data?.over_time * 1000)?.diff(data?.start_time * 1000, "minutes") || 115
        })

        getProductONETIME()
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingInit(false)
      }
    }
    //VfB Stuttgart - Schalke 04
    if (event_id !== "new") {
      fetch()
    } else {
      form.setFieldsValue({
        is_active: true,
        status: listStatus[0].value,
        auto_update_status: true,
        over_time: 115,
        start_time: moment()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="max-w-[800px] m-auto">
      <TitlePage
        isBack={true}
        title={
          <div>
            {event_id !== "new" ? "[Sửa] " : "[Thêm mới] "}
            <span className="text-primary">{form.getFieldValue("name")}</span>
          </div>
        }
      />
      <div className="mb-4 __content">
        {loadingInit ? (
          <Skeleton paragraph={{ rows: 12 }} />
        ) : (
          <Form
            name="update_events"
            id="update_events"
            onFinish={onFinish}
            form={form}
            layout="vertical"
          >
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Chọn khối"
                  name="screen_blocks"
                  rules={[{ required: true, message: "Chọn khối!" }]}
                >
                  <DropdownBlocksOnSport isLive={true} onChangeTypeEvent={onChangeTypeEvent} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Chọn giải đấu"
                  name="league"
                  rules={[{ required: true, message: "Chọn giải đấu!" }]}
                >
                  <DropdownLeague onChangeLeague={onChangeLeague} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Chọn kênh"
                  name="channel"
                  rules={[{ required: true, message: "Chọn kênh phát!" }]}
                >
                  <DropdownChannel />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  rules={[{ required: true, message: "Nhập trạng thái!" }]}
                >
                  <DropdownEventStatus />
                </Form.Item>
              </Col>
            </Row>
            {payFee && (
              <div className="border border-blue-400 bg-blue-50 p-4 rounded mb-4 pb-0">
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item
                      label="Mã nhóm sản phẩm"
                      name="product_name"
                      rules={[{ required: true, message: "Chọn mã nhóm sản phẩm" }]}
                    >
                      <Select
                        showSearch
                        className="w-full"
                        dropdownStyle={{ maxHeight: 600, overflow: "auto" }}
                        placeholder="Chọn mã nhóm sản phẩm..."
                        allowClear
                        onChange={onChangeProduct}
                      >
                        {dataONETIME.length > 0 &&
                          dataONETIME.map(
                            ({ id, name, price, ios_sku, android_sku, web_sku, is_active }) => {
                              return (
                                <Option
                                  key={id}
                                  value={`${name} - ${price} - ${ios_sku} - ${android_sku} - ${web_sku}`}
                                  disabled={!is_active}
                                >
                                  {name}
                                </Option>
                              )
                            }
                          )}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="product_price" label="Giá">
                      <Input disabled placeholder="Giá..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={12}>
                  <Col span={8}>
                    <Form.Item name="ios_sku" label="SKU IOS">
                      <Input disabled placeholder="SKU IOS..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="android_sku" label="SKU Android">
                      <Input disabled placeholder="SKU Android..." />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="web_sku" label="SKU Web">
                      <Input disabled placeholder="SKU Web..." />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}
            {isLive && (
              <div className="border border-blue-400 bg-blue-50 p-4 rounded mb-4 pb-0">
                <Row gutter={12}>
                  <Col span={24}>
                    <div className="mb-2 font-semibold">Tìm kiếm sự kiện</div>
                    <Form.Item name="match_sync_id">
                      <DropdownLiveSocre league_id={league?.league_id} onChange={onChangeItem} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Mùa giải theo năm"
                      name="season"
                      rules={[{ required: true, message: "Nhập mùa giải!" }]}
                    >
                      <Input className="w-200" placeholder="Mùa giải..." />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Tên sự kiện"
                  name="name"
                  rules={[{ required: true, message: "Nhập tên sự kiện!" }]}
                >
                  <Input placeholder="Nhập tên sự kiện..." />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Thời gian bắt đầu trận đấu"
                  name="start_time"
                  rules={[{ required: true, message: "Nhập thời gian!" }]}
                >
                  <DatePicker
                    className="w-full"
                    showTime={{ format: "HH:mm" }}
                    format="DD-MM-Y HH:mm"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Thời gian dự kiến (phút)"
                  name="over_time"
                  rules={[{ required: true, message: "Nhập thời gian!" }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} placeholder="Ví dụ 90 phút" />
                </Form.Item>
              </Col>
            </Row>
            {isLive && (
              <Fragment>
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item
                      label="Sân vận động"
                      name="location"
                      rules={[{ required: true, message: "Nhập sân vận động!" }]}
                    >
                      <Input className="w-full" placeholder="Ví dụ Camp Nou..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Info />
              </Fragment>
            )}

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Tags"
                  name="tags"
                  rules={[{ required: true, message: "Nhập tags!" }]}
                >
                  <DropdownTagsOnSports />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Tắt quảng cáo" name="skip_ads" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Tắt trò chuyện" name="off_chat" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Ảnh hiển thị (Thumbnail)"
                  name="thumbnail"
                  rules={[{ required: true, message: "Tải ảnh đại diện!" }]}
                >
                  <UploadImageOnsport aspect={16 / 9} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Row span={12}>
                  <Col span={12}>
                    <Form.Item label="Hiển thị" name="is_active" valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mua sắm" name="shopping" valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
                <Row span={12}>
                  <Form.Item
                    label="Tự động bắt đầu/Kết thúc sự kiện"
                    name="auto_update_status"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </div>
      <div className="flex justify-end p-4 bg-black bg-opacity-20 bottom-6 sticky rounded z-30">
        <Button
          type="primary"
          loading={loading}
          icon={<SendOutlined />}
          onClick={() => {
            form.submit()
          }}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  )
}
