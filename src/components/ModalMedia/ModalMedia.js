import React, { useState } from "react"
import MediaManager from "components/MediaManager"
import { Modal, Button } from "antd"
import "./index.scss"

const ModalMedia = ({ onChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  function onChangeFile(link) {
    onChange(link)
    handleCancel()
  }
  return (
    <>
      <Button type="primary" onClick={showModal} className="mb-2">
        Chọn từ media
      </Button>
      <Modal
        footer={false}
        className="modal_media"
        title={false}
        width={860}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <MediaManager onChangeFile={onChangeFile} />
      </Modal>
    </>
  )
}

export default ModalMedia
