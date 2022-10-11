import React, { useState, useRef, useEffect } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Upload, message } from "antd"
import ImgCrop from "antd-img-crop"
import { convertLinkImg } from "lib/function"
import { getAuthLocal } from "lib/localstorage"
import { configThumbSlide } from "lib/config"

const config = JSON.stringify(configThumbSlide.upload)

function beforeUpload(file) {
  const isLt3M = file.size / 1024 / 1024 < 2
  if (!isLt3M) {
    message.error("Ảnh phải nhỏ hơn 2mb")
  }
  return isLt3M
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
          accept="image/*"
          name="file"
          action={`${process.env.REACT_APP_API_UPLOAD}/api/v1/file/upload/imagecustom?configThumString=${config}`}
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
