import React, { useState, useRef, useEffect } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Upload, message } from "antd"
import ImgCrop from "antd-img-crop"
import { convertLinkImg } from "lib/function"
import { getAuthLocal } from "lib/localstorage"
import { configThumbVideoEvent } from "lib/config"

const config16_9 = JSON.stringify(configThumbVideoEvent.upload)
// const config1_1 = JSON.stringify([{ width: 720, height: 720 }])

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("Ảnh không đúng định dạng png hoặc jpg")
  }
  const isLt3M = file.size / 1024 / 1024 < 2
  if (!isLt3M) {
    message.error("Ảnh phải nhỏ hơn 2mb")
  }
  return isJpgOrPng && isLt3M
}

const UploadImage = React.forwardRef(({ onChange, value, aspect }, ref) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const link = useRef()
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      const url = info?.file?.response?.data?.root_url
      const baselink = info?.file?.response?.data?.base_url
      link.current = baselink
      setImageUrl(url)
      onChange(baselink)
    }
  }

  useEffect(() => {
    if (link.current !== value) setImageUrl(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className="flex items-center">
      <ImgCrop rotate aspect={aspect} beforeCrop={beforeUpload} quality={1} fillColor="transparent">
        <Upload
          ref={ref}
          aspect={aspect}
          name="file"
          action={`${process.env.REACT_APP_API_UPLOAD}/api/v1/file/upload/imagecustom?configThumString=${config16_9}`}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          headers={{
            Authorization: `Bearer ${getAuthLocal()?.token}`
          }}
          onChange={handleChange}
        >
          <div className="relative upload_label">
            {imageUrl ? (
              <img src={convertLinkImg(imageUrl)} alt="avatar" style={{ width: "100%" }} />
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
