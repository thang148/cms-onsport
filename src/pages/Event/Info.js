import React, { forwardRef, Fragment } from "react"
import { Input, Form, Row, Col, Tag, InputNumber } from "antd"
import UploadImageOnsport from "components/ModalNas/FolderNas"

const InfoEvent = () => {
  return (
    <div className="mb-4 mt-2">
      <Row gutter={12}>
        <Col span={12}>
          <div className="border border-blue-600 p-4 rounded relative mt-4">
            <Tag color="blue" className="mb-2 absolute z-10 tag_name left-2">
              Đội chủ nhà
            </Tag>
            <Form.Item
              label="Tên đội"
              name="home_name"
              rules={[{ required: true, message: "home_name!" }]}
            >
              <Input placeholder="Cheales..." />
            </Form.Item>

            {/* <div className="flex justify-between">
              <Form.Item
                label="Logo"
                name="home_logo"
                rules={[{ required: true, message: "Chọn logo!" }]}
              >
                <ImageDefault />
              </Form.Item>
              <Form.Item
                label="Score"
                name="home_score"
                rules={[{ required: true, message: "Chọn Score!" }]}
              >
                <InputNumber min={0} placeholder="Tỉ số..." />
              </Form.Item>
            </div> */}
            <div className="flex justify-between">
              <Form.Item label="Logo mặc định" name="home_logo_df">
                <ImageDefault />
              </Form.Item>
              <Form.Item
                label="Logo"
                name="home_logo"
                rules={[{ required: true, message: "Chọn logo!" }]}
              >
                <UploadImageOnsport />
              </Form.Item>
              <Form.Item
                label="Score"
                name="home_score"
                rules={[{ required: true, message: "Chọn Score!" }]}
              >
                <InputNumber min={0} placeholder="Tỉ số..." />
              </Form.Item>
            </div>
          </div>
        </Col>

        <Col span={12}>
          <div className="border border-blue-600 p-4 rounded relative mt-4">
            <Tag color="#87d068" className="mb-2 absolute z-10 tag_name left-2">
              Đội khách
            </Tag>
            <Form.Item
              label="Tên đội"
              name="away_name"
              rules={[{ required: true, message: "away_name!" }]}
            >
              <Input placeholder="Tottenham..." />
            </Form.Item>
            {/* <div className="flex justify-between">
              <Form.Item
                label="Logo"
                name="away_logo"
                rules={[{ required: true, message: "Chọn away_logo!" }]}
              >
                <ImageDefault />
              </Form.Item>
              <Form.Item
                label="Score"
                name="away_score"
                rules={[{ required: true, message: "Chọn away_score!" }]}
              >
                <InputNumber min={0} placeholder="Tỉ số..." />
              </Form.Item>
            </div> */}
            <div className="flex justify-between">
              <Form.Item label="Logo mặc định" name="home_logo_df">
                <ImageDefault />
              </Form.Item>
              <Form.Item
                label="Logo"
                name="away_logo"
                rules={[{ required: true, message: "Chọn logo!" }]}
              >
                <UploadImageOnsport />
              </Form.Item>
              <Form.Item
                label="Score"
                name="away_score"
                rules={[{ required: true, message: "Chọn Score!" }]}
              >
                <InputNumber min={0} placeholder="Tỉ số..." />
              </Form.Item>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default InfoEvent

const ImageDefault = forwardRef(({ value }, ref) => {
  return (
    <div className="relative">
      {value ? (
        <img className="__logo rounded" src={value} ref={ref} alt="" />
      ) : (
        <Fragment>
          <div className="__logo rounded" />
          <div className="absolute  inset-0 flex items-center justify-center">No logo</div>
        </Fragment>
      )}
    </div>
  )
})
