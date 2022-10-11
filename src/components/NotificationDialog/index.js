import React from "react"
import { Modal } from "antd"

export default function AlertDialog({
  isVisible,
  handleClose,
  handleSubmit,
  titleHeader,
  titleContent,
  loading
}) {
  return (
    <Modal
      title={titleHeader}
      visible={isVisible}
      onOk={handleSubmit}
      confirmLoading={loading}
      onCancel={handleClose}
    >
      <p>{titleContent}</p>
    </Modal>
  )
}
