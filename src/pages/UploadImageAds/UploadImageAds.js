import React, { useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Upload, message } from "antd"
import ImgCrop from "antd-img-crop"
import "./index.scss"
import { getAuthLocal } from "lib/localstorage"

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("Ảnh không đúng định dạng png hoặc jpg")
  }
  const isLt3M = file.size / 1024 / 1024 < 0.5
  if (!isLt3M) {
    message.error("Ảnh phải nhỏ hơn 500kb")
  }
  return isJpgOrPng && isLt3M
}

const UploadImage = React.forwardRef(({ onChange, value, aspect }, ref) => {
  const [loading, setLoading] = useState(false)

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      const url = info?.file?.response?.data?.root_url
      // setImageurl(url)
      onChange(url)
    }
  }

  return (
    <div className="flex items-center">
      <ImgCrop rotate aspect={aspect} beforeCrop={beforeUpload} quality={1} fillColor="transparent">
        <Upload
          ref={ref}
          aspect={aspect}
          name="file"
          action={`${process.env.REACT_APP_API_UPLOAD}/api/v1/file/upload/image?is_get_default_url=true`}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          // beforeUpload={beforeUpload}
          headers={{
            Authorization: `Bearer ${getAuthLocal()?.token}`
          }}
          onChange={handleChange}
        >
          <div className="relative upload_label">
            {value ? (
              <img src={value} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </div>
        </Upload>
      </ImgCrop>
    </div>
  )
})

export default UploadImage
