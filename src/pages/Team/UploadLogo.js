import React, { useState, forwardRef } from "react"
import { Upload, Button, message } from "antd"
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
      // setImageUrl(info.file.response.url)
      setLoading(false)
      onChange(info.file.response.data.root_url)
      // Get this url from response in real world.
    }
  }

  return (
    <Upload
      width="100%"
      className="__img_main"
      beforeUpload={beforeUpload}
      ref={ref}
      headers={{
        Authorization: `Bearer ${getAuthLocal()?.token}`
      }}
      action={`${process.env.REACT_APP_API_UPLOAD}/api/v1/file/upload/image?is_get_default_url=true`}
      onChange={onChangeFile}
      showUploadList={false}
      {...props}
    >
      <div>
        <Button loading={loading}>Upload</Button>
      </div>
    </Upload>
  )
})

export default UploadImage
