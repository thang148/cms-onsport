import { useState, memo, useRef } from "react"
import { Form, Input, Switch, notification, Button } from "antd"
import { useEffect } from "react"
import { apiTranscodes, apiVideosTV } from "api"
import DropdownEvents from "components/DropdownEvents"
import DropdownBlocksOnSport from "components/DropdownBlocksOnSport"
import DropdownLeagueFilter from "components/DropdownLeagueFilter"
import UploadImageOnsport from "components/UploadImageOnsport"
import DropdownTags from "components/DropdownTagsOnSports"
import { SendOutlined } from "@ant-design/icons"
import { TitlePage } from "components/ui"
import DropdownDrm from "components/DropdownDrm"
import ShakaPlayer from "components/ShakaPlayer"
import { convertLinkVOD } from "lib/function"
import { useNavigate, useParams } from "react-router-dom"
import { configThumbVideoEvent } from "lib/config"
import { message } from "antd"
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

function FormUpdate() {
  const { video_id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState({ is_fullmatch: false })
  const initVideo = useRef({ is_fullmatch: false })
  const [form] = Form.useForm()

  async function onFinish(values) {
    setLoading(true)
    try {
      values.tag = values?.tag?.toString()
      if (!values.event) values.event = null
      values.duration_transcode = content.duration
      values.config_thumbnail = configThumbVideoEvent.name
      if (values.link) {
        values.link_fairplay = values.link
        values.link_widevine = values.link
      } else {
        if (!values.is_fullmatch) {
          message.error("Bạn cần chọn video từ DMS")
          return
        }
      }

      if (video_id !== "new") {
        await apiVideosTV.update(video_id, values)
        if (initVideo.current.is_fullmatch && !initVideo.current.link && values.link) {
          await apiTranscodes.updateSelect({ id: content.id })
        }
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiVideosTV.create(values)
        await apiTranscodes.updateSelect({ id: content.id })
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
      }
      navigate(-1)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  function onChangeDms(v) {
    const values = form.getFieldsValue()
    if (v) {
      form.setFieldsValue({
        ...values,
        is_protected: v?.is_drm,
        link: v?.file_name,
        name: v?.title,
        thumbnail: v?.image1,
        duration: v?.duration,
        job_transcode_id: v?.job_id
      })

      setContent((s) => ({
        ...s,
        id: v?.id,
        file_name: v?.file_name,
        duration: v?.duration
      }))
    } else {
      form.setFieldsValue({
        ...values,
        link: undefined,
        name: undefined,
        thumbnail: undefined,
        duration: undefined,
        job_transcode_id: undefined
      })
      setContent({})
    }
  }

  async function fetch() {
    try {
      const res = await apiVideosTV.get(video_id)
      const values = {
        ...res,
        screen_blocks: res?.screen_blocks?.map((i) => {
          return i.id
        }),
        event: res?.event?.id,
        league: res?.league?.id,
        tags: res?.tags?.map((i) => {
          return i.id
        })
      }
      initVideo.current = values
      setContent({
        file_name: res?.link_transcode_temp,
        name: res?.name
      })
      form.setFieldsValue(values)
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    if (video_id !== "new") {
      fetch()
    } else {
      form.setFieldsValue({ is_active: true, is_fullmatch: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isNew = video_id === "new"
  const { name } = content
  const { link, is_fullmatch } = initVideo.current
  return (
    <section className="wapper_small">
      <TitlePage
        isBack={true}
        title={
          <div>
            {video_id !== "new" ? "[Sửa] " : "[Thêm mới] "}
            <span className="text-primary">{name}</span>
          </div>
        }
      />
      <div className="mb-4 xl:grid grid-cols-5 gap-4">
        <div className="col-span-3 __content mb-4 xl:mb-0">
          <Form name="update_vod" {...layout} onFinish={onFinish} form={form}>
            {(isNew || (is_fullmatch && !link)) && (
              <>
                <div className="grid grid-cols-6">
                  <div className="col-span-1 flex justify-end">
                    <div className="text-right pr-2">
                      <span className="text-red-600">*</span> Chọn từ DMS:
                    </div>
                  </div>
                  <div className="col-span-5">
                    <div className="mb-2">
                      <Form.Item noStyle={true}>
                        <DropdownDrm onChange={onChangeDms} />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </>
            )}
            <Form.Item
              label="Title"
              name="name"
              rules={[{ required: true, message: "Nhập title!" }]}
            >
              <Input placeholder="title..." />
            </Form.Item>

            {!is_fullmatch && (
              <Form.Item
                label="Giải đấu"
                name="league"
                rules={[{ required: true, message: "Nhập giải đấu!" }]}
              >
                <DropdownLeagueFilter />
              </Form.Item>
            )}

            <Form.Item label="Event (hoặc link)" name="event">
              <DropdownEvents />
            </Form.Item>

            <Form.Item name="job_transcode_id" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="duration" hidden>
              <Input />
            </Form.Item>

            <Form.Item
              label="Khối hiển thị"
              name="screen_blocks"
              rules={[{ required: true, message: "Nhập vị trí!" }]}
            >
              <DropdownBlocksOnSport isLive={false} />
            </Form.Item>

            <Form.Item label="Tags" name="tags" rules={[{ required: true, message: "Nhập tags!" }]}>
              <DropdownTags />
            </Form.Item>
            <Form.Item
              label="Ảnh thumbnail"
              name="thumbnail"
              rules={[{ required: true, message: "Chọn ảnh thumbnail!" }]}
            >
              <UploadImageOnsport aspect={16 / 9} />
            </Form.Item>
            <Form.Item hidden name="is_fullmatch" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Tắt quảng cáo" name="skip_ads" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="DRM" name="is_protected" valuePropName="checked">
              <Switch disabled />
            </Form.Item>
            <Form.Item label="Hiển thị" name="is_active" valuePropName="checked">
              <Switch disabled={check(content)} />
            </Form.Item>

            <Form.Item name="is_fullmatch" valuePropName="checked" hidden>
              <Switch />
            </Form.Item>
            <Form.Item name="link" hidden>
              <Input />
            </Form.Item>
          </Form>
        </div>
        <div className="col-span-2 __content">
          {content?.file_name && (
            <ShakaPlayer mpdFile={convertLinkVOD(content?.file_name)} is_protected={false} />
          )}
        </div>
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
    </section>
  )
}

export default memo(FormUpdate)

function check(r) {
  if (!r) return true
  const { status_transcode, is_fullmatch, link_transcode_temp } = r
  if (status_transcode === 2) return true
  if (status_transcode === 0) {
    if ((is_fullmatch && link_transcode_temp) || !is_fullmatch) return true
  }
  return false
}
