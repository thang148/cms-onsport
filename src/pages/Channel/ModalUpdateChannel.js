import { useRef, useState } from "react"
import { Modal, Form, Input, Switch, notification, Row, Col } from "antd"
import { useEffect } from "react"
import { apiChannel } from "api"
import LinkSupport from "./LinkSupport"
import UploadImageOnTVDF from "components/UploadImageOnTVDF"
import slugify from "slugify"
import Logo1 from "images/logo1.png"
import Logo2 from "images/Logo2.png"

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)
  async function onFinish(values) {
    try {
      if (values.link_preventive && values.link_preventive.find((i) => !i.includes("https"))) {
        notification.error({ message: "Cảnh báo!", description: "Link kênh phải là link https" })
        return
      }
      setLoading(true)
      if (item) {
        await apiChannel.update(item?.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiChannel.create(values)
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

  function onChangeSlug(e) {
    console.log(e.target.value)
    form.setFields([
      {
        name: "slug",
        value: slugify(e.target.value, { locale: "vi", lower: true, strict: true })
      }
    ])
  }

  useEffect(() => {
    if (formRef.current) {
      if (item) {
        form.setFieldsValue({
          ...item,
          link_preventive: item?.link_preventive ? item?.link_preventive : undefined
        })
      } else {
        resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  function resetForm() {
    form.resetFields()
    form.setFieldsValue({
      is_active: true,
      is_protected: true
    })
  }

  return (
    <Modal
      title={item ? "Cập nhật" : "Thêm mới"}
      visible={visible}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => {
        resetForm()
        if (item) {
          form.setFieldsValue({
            ...item,
            link_preventive: item?.link_preventive ? item?.link_preventive : undefined
          })
        }
        onClose(false)
      }}
      width={800}
    >
      <Form name="update_role" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Tên kênh"
                  name="name"
                  onChange={onChangeSlug}
                  rules={[{ required: true, message: "Nhập name!" }]}
                >
                  <Input placeholder="Admin..." />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  label="Slug"
                  name="slug"
                  rules={[{ required: true, message: "Nhập slug" }]}
                >
                  <Input placeholder="VTV3..." />
                </Form.Item>
              </Col> */}
              <Col span={12}>
                <Form.Item
                  label="Content_id(drm_id)"
                  name="content_id"
                  rules={[
                    { required: true, message: "Nhập content id" },
                    () => ({
                      validator(_, value) {
                        var textUpperCase
                        var textRemoveAccents
                        if (value) {
                          textRemoveAccents = removeAccents(value)
                        }
                        textUpperCase = value.toLowerCase()

                        if (value && value.length > 0 && value.includes(" ")) {
                          return Promise.reject(
                            new Error(
                              "Content Id không được chứa khoảng trắng, chữ hoa , ký tự tiếng Việt !"
                            )
                          )
                        }
                        if (value && value !== textUpperCase) {
                          return Promise.reject(
                            new Error(
                              "Content Id không được chứa khoảng trắng, chữ hoa , ký tự tiếng Việt !"
                            )
                          )
                        }
                        if (value && value !== textRemoveAccents) {
                          return Promise.reject(
                            new Error(
                              "Content Id không được chứa khoảng trắng, chữ hoa , ký tự tiếng Việt !"
                            )
                          )
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <Input placeholder="content id..." />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <img src={Logo1} alt="widevine" className="w-48 h-16"></img>
            <Form.Item
              label={
                <div>
                  Link Widevine
                  <span className="text-red-500">(Lưu ý tất cả link đều phải https)</span>
                </div>
              }
              name="link_widevine"
              rules={[
                { required: true, message: "Nhập link!" },
                () => ({
                  validator(_, value) {
                    if (value && !value.includes("https")) {
                      return Promise.reject(new Error("Link phải là https!"))
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input placeholder="Link..." />
            </Form.Item>
            <Form.Item
              label="Link xem lại (catch up link)"
              name="catch_up_link_widevine"
              rules={[
                { required: true, message: "Nhập link xem lại!" },
                () => ({
                  validator(_, value) {
                    if (value && !value.includes("https")) {
                      return Promise.reject(new Error("Link phải là https!"))
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input placeholder="https://onsportlive.vtvcab.vn/hls/dvr/TTSD/index-timeshifting.m3u8?startTime=123&stopTime=123" />
            </Form.Item>

            <Form.Item
              label="Link dự phòng "
              name="link_preventive_widevine"
              rules={[
                () => ({
                  validator(_, value) {
                    if (value && value.length > 0 && value.indexOf("") > -1) {
                      return Promise.reject(new Error("Link không được trống!"))
                    }
                    if (value && value.length > 0 && value.find((i) => !i.includes("http"))) {
                      return Promise.reject(new Error("Link sai định dạng!"))
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <LinkSupport />
            </Form.Item>
          </Col>
          <Col span={12}>
            <img src={Logo2} alt="FairPlay " className="w-48 h-16"></img>
            <Form.Item
              label={
                <div>
                  Link FairPlay
                  <span className="text-red-500">(Lưu ý tất cả link đều phải https)</span>
                </div>
              }
              name="link_fairplay"
              rules={[
                { required: true, message: "Nhập link!" },
                () => ({
                  validator(_, value) {
                    if (value && !value.includes("https")) {
                      return Promise.reject(new Error("Link phải là https!"))
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input placeholder="Link..." />
            </Form.Item>
            <Form.Item
              label="Link xem lại (catch up link)"
              name="catch_up_link_fairplay"
              rules={[
                { required: true, message: "Nhập link xem lại!" },
                () => ({
                  validator(_, value) {
                    if (value && !value.includes("https")) {
                      return Promise.reject(new Error("Link phải là https!"))
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input placeholder="https://onsportlive.vtvcab.vn/hls/dvr/TTSD/index-timeshifting.m3u8?startTime=123&stopTime=123" />
            </Form.Item>

            <Form.Item
              label="Link dự phòng"
              name="link_preventive_fairplay"
              rules={[
                () => ({
                  validator(_, value) {
                    if (value && value.length > 0 && value.indexOf("") > -1) {
                      return Promise.reject(new Error("Link không được trống!"))
                    }
                    if (value && value.length > 0 && value.find((i) => !i.includes("http"))) {
                      return Promise.reject(new Error("Link sai định dạng!"))
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <LinkSupport />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Logo" name="logo" rules={[{ required: true, message: "Nhập logo!" }]}>
              <UploadImageOnTVDF />
            </Form.Item>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label="Hiển thị" name="is_active" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="DRM" name="is_protected" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Time shift" name="is_timeshift" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Hết hạn xem lại (ngày)" name="count_day_expire">
                  <Input placeholder="3..." />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Form>
    </Modal>
  )
}

function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"
  ]
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g")
    var char = AccentsMap[i][0]
    str = str.replace(re, char)
  }
  return str
}
