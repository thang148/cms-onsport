import React, { useState, useRef, useEffect } from "react"
import { Modal, Upload, Progress, notification, Button, message } from "antd"
import axios from "axios"
import { getAuthLocal } from "lib/localstorage"

export default function ModalUploadInage({ id, fetch }) {
  const [visible, setVisible] = useState()
  const [defaultFileList, setDefaultFileList] = useState([])
  const [progress, setProgress] = useState(0)

  const promise = useRef([])

  const beforeUpload = (file) => {
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

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options

    const fmData = new FormData()
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${getAuthLocal()?.token}`
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100)
        setProgress(percent)
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000)
        }
        onProgress({ percent: (event.loaded / event.total) * 100 })
      }
    }
    fmData.append("file", file)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_UPLOAD}/api/v1/file/image?parent_id_text&parent_id=${id}&is_get_default_url=true`,
        fmData,
        config
      )
      promise.current.push(res)
      if (!res.data.success) {
        notification.error({
          message: res.data.message,
          duration: 2
        })
        promise.current = []
      } else {
        if (promise.current.length === defaultFileList.length) {
          promise.current = []
          notification.success({
            message: "Upload thành công",
            duration: 2
          })
          // submitModal()
        }
        setVisible(false)
        fetch()
        onSuccess("Ok")
      }
    } catch (err) {
      notification.error({ message: "Thông báo!", description: err?.response?.data?.message })
      onError({ err })
    }
  }

  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setDefaultFileList(fileList)
    //filelist - [{uid: "-1",url:'Some url to image'}]
  }

  useEffect(() => {
    setDefaultFileList([])
  }, [visible])

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Upload Image
      </Button>
      <Modal
        className="modal-upload"
        title="Upload Ảnh"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div className="text-center">
          <Upload
            accept="image/*"
            listType="picture-card"
            customRequest={uploadImage}
            onChange={handleOnChange}
            fileList={defaultFileList}
            beforeUpload={beforeUpload}
            multiple={true}
          >
            {defaultFileList.length >= 1 ? null : <div>Upload Button</div>}
          </Upload>
          {progress > 0 ? <Progress percent={progress} /> : null}
        </div>
      </Modal>
    </div>
  )
}
