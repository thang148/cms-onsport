import React, { useState, forwardRef, useEffect, useRef } from "react"
import { Upload, message } from "antd"
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons"
import ImgCrop from "antd-img-crop"
import "./index.css"
import { getAuthLocal } from "lib/localstorage"

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!")
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!")
  }
  return isJpgOrPng && isLt2M
}

const UploadImage = forwardRef(({ onChange, value, aspect, ...props }, ref) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const link = useRef()
  const onChangeFile = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      setLoading(false)
      setImageUrl(info?.file?.response?.data?.root_url)
      const baselink = info?.file?.response?.data?.base_url
      link.current = baselink
      onChange(baselink)
      // Get this url from response in real world.
    }
  }

  useEffect(() => {
    if (link.current !== value) setImageUrl(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <ImgCrop rotate aspect={aspect} beforeCrop={beforeUpload}>
      <Upload
        className="__img_main"
        ref={ref}
        headers={{
          Authorization: `Bearer ${getAuthLocal()?.token}`
        }}
        action={`${process.env.REACT_APP_API_UPLOAD}/api/v1/file/upload/image?is_get_default_url=true`}
        listType="picture-card"
        onChange={onChangeFile}
        showUploadList={false}
        {...props}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          <div className="w-full h-full flex justify-center items-center" style={{ height: 187 }}>
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </div>
        )}
      </Upload>
    </ImgCrop>
  )
})

export default UploadImage
