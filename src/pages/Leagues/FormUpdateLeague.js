import { forwardRef, useRef, useState } from "react"
import { Form, Input, Switch, notification, Row, Col, Image, Button } from "antd"
import { useEffect } from "react"
import { apiLeagues } from "api"
// import UploadImageOnTVDF from "../UploadImageOnTVDF"
import DropdownSportType from "components/DropdownSportType"
import DropdownLeagueType from "components/DropdownLeagueType"
import slugify from "slugify"
import UploadImageOnsport from "components/ModalNas/FolderNas"
import { leaguesDefault, sportTypeDefault } from "lib/Const"
import Color from "./Color"
import FilterLeagues from "./FinterLeagues"
import useLeagues from "components/hooks/useLeagues"

export default function FormUpdateLeague({ onClose, item }) {
  const { getLeagues } = useLeagues()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)

  async function onFinish(values) {
    try {
      setLoading(true)
      values.logo_default = undefined
      if (item) {
        await apiLeagues.update(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiLeagues.create(values)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
      }
      onClose(true)
      getLeagues()
      resetForm()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  function onChangeSlug(e) {
    form.setFields([
      {
        name: "slug",
        value: slugify(e.target.value, { locale: "vi", lower: true, strict: true })
      }
    ])
  }

  function onChangeItem(value) {
    const { name, logo, id, league_type, current_season, short_name, third_party_id } = value
    const __league_type = leaguesDefault.find((i) => i.name === league_type)

    form.setFieldsValue({
      league_sync_id: id,
      name,
      logo_default: logo,
      current_season,
      short_name,
      third_party_id,
      league_type: __league_type ? __league_type?.value : leaguesDefault[0]?.value,
      slug: name ? slugify(name, { locale: "vi", lower: true, strict: true }) : undefined
    })
  }

  function resetForm() {
    form.resetFields()
    form.setFieldsValue({
      is_active: true,
      app_display: true,
      league_type: leaguesDefault[0]?.value,
      sport_type: sportTypeDefault[0]?.value,
      backgroud_color: "#5539E2"
    })
  }

  useEffect(() => {
    if (item) {
      resetForm()
      form.setFieldsValue(item)
    } else {
      resetForm()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    // <Modal
    //   title={item ? "Cập nhật" : "Thêm mới"}
    //   open={visible}
    //   width={640}
    //   onOk={() => form.submit()}
    //   confirmLoading={loading}
    //   onCancel={() => {
    //     resetForm()
    //     if (item) {
    //       form.setFieldsValue(item)
    //     }
    //     onClose(false)
    //   }}
    // >
    <Form name="update_role" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
      <div className="p-6">
        <div className="mb-4">
          <FilterLeagues onChange={onChangeItem} leagueID={item.id} value={item.league_sync_id} />
        </div>
        <div className="hidden">
          <Form.Item name="league_sync_id">
            <Input />
          </Form.Item>
          <Form.Item name="third_party_id">
            <Input />
          </Form.Item>
        </div>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Tên giải đấu"
              name="name"
              onChange={onChangeSlug}
              rules={[{ required: true, message: "Nhập tên giải đấu!" }]}
            >
              <Input placeholder="Tên giải đấu..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tên viết tắt"
              name="short_name"
              rules={[{ required: true, message: "Nhập tên viết tắt giải đấu!" }]}
            >
              <Input placeholder="Tên viết tắt giải đấu..." />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Slug" name="slug" rules={[{ required: true, message: "Nhập slug" }]}>
          <Input placeholder="vo-dinh-tay-ban-nha..." />
        </Form.Item>
        <Form.Item
          label="Mùa giải"
          name="current_season"
          rules={[{ required: true, message: "Nhập mùa giải!" }]}
        >
          <Input placeholder="2021-2022..." />
        </Form.Item>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item label="Logo mặc định" name="logo_default">
              <DefaulltLogo />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Logo không nền"
              name="logo"
              rules={[{ required: true, message: "Nhập logo!" }]}
            >
              <UploadImageOnsport />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Màu nhận diện"
              name="backgroud_color"
              rules={[{ required: true, message: "Nhập backgroud_color" }]}
            >
              <Color />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Môn thể thao"
              name="sport_type"
              rules={[{ required: true, message: "Chọn bộ môn!" }]}
            >
              <DropdownSportType />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Loại giải"
              name="league_type"
              rules={[{ required: true, message: "Chọn loại giải!" }]}
            >
              <DropdownLeagueType />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label={
                <div>
                  Hoạt động &nbsp;
                  <span style={{ color: "red" }}>(trạng thái của giải đấu)</span>
                  {/* <Tooltip
                    title=<div style={{ color: "#f50" }}>Trạng thái hoạt động của giải đấu </div>
                    color={"white"}
                  >
                    <QuestionCircleOutlined />
                  </Tooltip> */}
                </div>
              }
              name="is_active"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <div>
                  Hiển thị trên app
                  {/* <Tooltip
                    title=<div style={{ color: "#f50" }}>
                      Trại thái của giải đấu có được hiển thị trên app hay không
                    </div>
                    color={"white"}
                  >
                    <QuestionCircleOutlined />
                  </Tooltip> */}
                </div>
              }
              name="app_display"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className="flex justify-end gap-2 px-4 py-2 border-gray-200 border-t">
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Ok
        </Button>
      </div>
    </Form>
    // </Modal>
  )
}

const DefaulltLogo = forwardRef(({ value }, ref) => {
  return (
    <div ref={ref}>
      <Image src={value} width={104} height={104} className="rounded" />
    </div>
  )
})
