import React, { useState, useRef } from "react"
import { Modal, Upload, Button, notification, Progress } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { getAuthLocal } from "lib/localstorage"

export default function ModalItem({ fetch, id }) {
  const [visible, setVisible] = useState()
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingSaveVideo, setloadingSaveVideo] = useState(false)
  const __imgLink = useRef()
  const __videoLink = useRef()
  const __input = useRef()

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      setLoading(false)
      setImageUrl(info.file.response.data.default_url)
      __imgLink.current = info.file.originFileObj
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      notification.error({
        description: "You can only upload JPG/PNG file!",
        message: "Error"
      })
    }
    return isJpgOrPng
  }

  const handleInputChange = (event) => {
    __videoLink.current = event.target.files[0]
  }
  function resetForm() {
    __videoLink.current = ""
    __input.current.value = ""
    __imgLink.current = ""
    setloadingSaveVideo(false)
    setImageUrl("")
    setProgress(0)
    setVisible(false)
    fetch()
  }

  const submit = async () => {
    const FileGuid = uuidv4()
    let count = 0
    const chunkQuantity = 8
    const file = __videoLink.current
    let chunkSize = 1024 * 1024
    let fileSize = file.size
    let chunks = Math.ceil(file.size / chunkSize)
    let chunk = 0
    let _index = 0
    let _process = Number(100 / chunks).toFixed(2)
    const url = `${process.env.REACT_APP_API_UPLOAD}/api/v1/file/video?parent_id_text&parent_id=${id}`
    if (file.type.includes("video")) {
      if (imageUrl && imageUrl !== "") {
        setloadingSaveVideo(true)

        async function onUpload(_chunk, reload) {
          let offset = _chunk * chunkSize
          const fileItem = file.slice(offset, offset + chunkSize)
          const formData = new FormData()
          formData.append("file", fileItem)
          let fake = {
            file_guid: FileGuid,
            file_name: file.name,
            total_count: chunks,
            file_size: fileSize,
            file_type: file.type,
            index: _chunk
          }
          formData.append("chunkMetadata", JSON.stringify(fake))
          if (_chunk === chunks - 1) {
            formData.append("fileImage", __imgLink.current)
          }
          try {
            const { data } = await axios.post(url, formData, {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${getAuthLocal()?.token}`
              }
            })
            _index++
            if (data?.data?.video_url) {
              notification.success({
                message: "Upload thành công",
                duration: 2
              })
              resetForm()
            } else {
              count--
              sendChunk()
              if (_process * _index < 93) setProgress(_process * _index)
            }
          } catch (error) {
            if (!reload) onUpload(_chunk, true)
            setloadingSaveVideo(false)
            throw error
          }
        }

        function sendChunk() {
          if (count < chunkQuantity && chunk < chunks) {
            onUpload(chunk)
            count++
            chunk++
            if (_index > 0) sendChunk()
          }
        }
        sendChunk()
      } else {
        notification.error({
          message: "Bạn cần tải đúng định dạng video",
          duration: 2
        })
      }
    }
  }

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Upload video
      </Button>
      <Modal
        title={"Upload Video"}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div className="grid grid-cols-9 gap-4">
          <div className="col-span-2 ...">Tải ảnh:</div>
          <div className="col-span-7 ...">
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
              action={`${process.env.REACT_APP_API_UPLOAD}/api/v1/file/upload/image?is_get_default_url=true`}
              headers={{
                Authorization: `Bearer ${getAuthLocal()?.token}`
              }}
              beforeUpload={beforeUpload}
              onChange={onChangeImage}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </div>
        </div>
        <div className="grid grid-cols-9 gap-4 mt-4">
          <div className="col-span-2 ...">Chọn video:</div>
          <div className="col-span-7 ...">
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  ref={__input}
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  className="form-control"
                  name="upload_file"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {progress > 0 ? <Progress percent={parseInt(progress)} /> : null}
          </div>
        </div>
        <div className="text-center mt-4">
          <Button
            type="primary"
            className="btn btn-dark"
            onClick={() => submit()}
            loading={loadingSaveVideo}
          >
            Tải video và lưu lại
          </Button>
        </div>
      </Modal>
    </div>
  )
}
