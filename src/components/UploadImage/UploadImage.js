import React, { useState, forwardRef } from "react"
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

  const onChangeFile = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      console.log(info)
      // setImageUrl(info.file.response.url)
      setLoading(false)
      onChange(info.file.response.data.root_url)
      // Get this url from response in real world.
    }
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  return (
    <ImgCrop rotate aspect={aspect} beforeCrop={beforeUpload}>
      <Upload
        width="100%"
        className="__img_main"
        ref={ref}
        headers={{
          Authorization: `Bearer ${getAuthLocal()?.token}`
        }}
        action={`${process.env.REACT_APP_API_UPLOAD}/api/v1/file/upload/image?is_get_default_url=true`}
        listType="picture-card"
        onChange={onChangeFile}
        showUploadList={false}
        onPreview={onPreview}
        {...props}
      >
        {value ? (
          <img src={value} alt="avatar" style={{ width: "100%", maxWidth: 350 }} />
        ) : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </ImgCrop>
  )
})

export default UploadImage
