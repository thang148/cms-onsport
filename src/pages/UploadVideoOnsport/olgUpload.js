import React, { useState, useRef } from "react"
import { Button, notification, Progress, Input, Tabs } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import DropdownDrm from "components/DropdownDrm"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { getAuthLocal } from "lib/localstorage"

const getVideoDuration = (file) =>
  new Promise((resolve, reject) => {
    var video = document.createElement("video")
    video.preload = "metadata"
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src)
      resolve(video.duration)
    }
    video.onerror = (error) => reject(error)
    video.src = URL.createObjectURL(file)
  })

function getAccessToken() {
  return getAuthLocal()?.token
}

const Component = ({ onChange }) => {
  const [progress, setProgress] = useState(0)
  const [videoLink, setVideoLink] = useState()
  const __input = useRef()

  function onChangeFile(e) {
    const file = e.target.files[0]
    setVideoLink(file.name)
    handleInputChange(file)
  }

  const handleInputChange = async (file) => {
    const FileGuid = uuidv4()
    let count = 0
    let _index = 0
    const chunkQuantity = 8
    let chunkSize = 1024 * 1024
    let fileSize = file.size
    let chunks = Math.ceil(file.size / chunkSize)
    let chunk = 0
    let _process = Number(100 / chunks).toFixed(2)
    const url = `${process.env.REACT_APP_API_UPLOAD}/api/v1/file/upload/video`

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

      try {
        const { data } = await axios.post(url, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${getAccessToken()}`
          }
        })
        _index++
        if (data?.data?.video_url) {
          const duration = await getVideoDuration(file)
          setProgress(100)
          notification.success({
            message: "Upload thành công",
            duration: 2
          })
          __input.current.value = ""
          onChange({
            link: data?.data?.video_url,
            job_transcode_id: FileGuid,
            duration: Math.ceil(duration)
          })
        } else {
          count--
          sendChunk()
          if (_process * _index < 99) setProgress(_process * _index)
        }
      } catch (error) {
        if (!reload) onUpload(_chunk, true)
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
  }

  function onChangeDrm(v) {
    onChange(v)
  }

  return (
    <div className="border px-2 pb-4">
      <Tabs size="small" defaultActiveKey="1">
        <Tabs.TabPane tab={<span>Chọn từ DMS </span>} key="1">
          <DropdownDrm onChange={onChangeDrm} />
        </Tabs.TabPane>
        {window.location.host !== "cms.vinasports.com.vn" && (
          <Tabs.TabPane tab={<span>Upload </span>} key="2">
            <div>
              <input
                style={{ display: "none" }}
                ref={__input}
                type="file"
                accept="video/mp4,video/x-m4v,video/*"
                name="upload_file"
                id="file-upload1"
                onChange={onChangeFile}
              />

              {progress > 0 ? <Progress percent={parseInt(progress)} /> : null}
              <div className="flex justify-between space-x-4">
                <Input placeholder="Link video" className="w-full" value={videoLink} />
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={() => __input.current.click()}
                >
                  Upload
                </Button>
              </div>
            </div>
          </Tabs.TabPane>
        )}
      </Tabs>
    </div>
  )
}

export default Component
