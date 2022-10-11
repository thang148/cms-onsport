import React, { useState, useEffect, useRef } from "react"
import { Button, Card, Input, Switch, Form, Tag, notification, InputNumber } from "antd"
import { TitlePage } from "components/ui"
import { apiVersion } from "api"

const Component = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const __id = useRef("")
  async function onFinish(values) {
    try {
      setLoading(true)
      await apiVersion.update(__id.current, values)
      notification.success({ message: "Thông báo!", description: "Cập nhật thành công" })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }
  async function fetch() {
    let row = {}
    try {
      setLoading(true)
      const { data } = await apiVersion.get()
      row = data
      __id.current = data?.id
      setVisible(false)
    } catch (e) {
      throw e
    } finally {
      form.setFieldsValue(row)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý phiên bản app" />
      <Card size="small">
        <Form
          onChange={() => setVisible(true)}
          name="update_slide"
          onFinish={onFinish}
          form={form}
          layout="vertical"
        >
          <div className="text-lg font-bold">Config Mobile</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <Tag color="green">Android</Tag>
              <Form.Item
                label="Mã phiên bản Android"
                name="mobile_android_version_code"
                rules={[{ required: true, message: "Nhập code!" }]}
              >
                <InputNumber placeholder="2.2.2" />
              </Form.Item>
              <Form.Item
                label="Tên phiên bản Android"
                name="mobile_android_version_name"
                rules={[{ required: true, message: "Nhập name!" }]}
              >
                <Input placeholder="7.0.0" />
              </Form.Item>
              <Form.Item
                label="Yêu cầu cập nhật phiên bản Android"
                name="mobile_android_version_update_required"
                rules={[{ required: true }]}
                valuePropName="checked"
                initialValue={true}
              >
                <Switch onChange={() => setVisible(true)} />
              </Form.Item>
            </div>
            <div className="col-span-1">
              <Tag>Apple</Tag>
              <Form.Item
                label="Tên Phiên bản iOS"
                name="mobile_ios_version_name"
                rules={[{ required: true, message: "Nhập name!" }]}
              >
                <Input placeholder="8.8.8..." />
              </Form.Item>
              <Form.Item
                label="Yêu cầu cập nhật phiên bản iOS"
                name="mobile_ios_version_update_required"
                rules={[{ required: true }]}
                valuePropName="checked"
              >
                <Switch onChange={() => setVisible(true)} />
              </Form.Item>
            </div>
          </div>
          <div className="text-lg font-bold">Config SmartTV</div>
          <hr className="mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <Tag color="red">Web OS</Tag>
              <Form.Item
                label="Mã phiên bản tivi LG"
                name="smart_tv_lg_version_code"
                rules={[{ required: true, message: "Nhập code!" }]}
              >
                <InputNumber placeholder="2.2.2" />
              </Form.Item>
              <Form.Item
                label="Tên phiên bản tivi LG"
                name="smart_tv_lg_version_name"
                rules={[{ required: true, message: "Nhập name!" }]}
              >
                <Input placeholder="7.0.0" />
              </Form.Item>
              <Form.Item
                label="Yêu cầu cập nhật phiên bản tivi LG"
                name="smart_tv_lg_version_update_required"
                rules={[{ required: true }]}
                valuePropName="checked"
              >
                <Switch onChange={() => setVisible(true)} />
              </Form.Item>
            </div>
            <div className="col-span-1">
              <Tag>Anroid TV</Tag>
              <Form.Item
                label="Mã phiên bản tivi Android"
                name="smart_tv_android_version_code"
                rules={[{ required: true, message: "Nhập name!" }]}
              >
                <InputNumber placeholder="8.8.8..." />
              </Form.Item>
              <Form.Item
                label="Tên phiên bản tivi Android"
                name="smart_tv_android_version_name"
                rules={[{ required: true, message: "Nhập name!" }]}
              >
                <Input placeholder="7.0.0" />
              </Form.Item>
              <Form.Item
                label="Yêu cầu cập nhật phiên bản tivi Android"
                name="smart_tv_android_version_update_required"
                rules={[{ required: true }]}
                valuePropName="checked"
              >
                <Switch onChange={() => setVisible(true)} />
              </Form.Item>
            </div>

            <div className="col-span-1">
              <Tag color="gold">Tizen</Tag>
              <Form.Item
                label="Mã phiên bản tivi Samsung"
                name="smart_tv_web_os_version_code"
                rules={[{ required: true, message: "Nhập name!" }]}
              >
                <InputNumber placeholder="8.8.8..." />
              </Form.Item>
              <Form.Item
                label="Tên phiên bản tivi Samsung"
                name="smart_tv_web_os_version_name"
                rules={[{ required: true, message: "Nhập name!" }]}
              >
                <Input placeholder="7.0.0" />
              </Form.Item>
              <Form.Item
                label="Yêu cầu cập nhật "
                name="smart_tv_web_os_version_update_required"
                rules={[{ required: true }]}
                valuePropName="checked"
              >
                <Switch onChange={() => setVisible(true)} />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              disabled={!visible}
              htmlType="submit"
              type="primary"
              className="w-36"
              loading={loading}
            >
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </section>
  )
}

export default Component
