import { memo } from "react"
import { Modal } from "antd"
import ShakaPlayer from "components/ShakaPlayer"
// import { convertLinkVOD } from "lib/function"

function Component({ item, visible, onClose, is_protected = true }) {
  function onCancel() {
    onClose()
  }
  const { content_id, job_transcode_id, thumbnail, link_widevine } = item
  return (
    <Modal
      bodyStyle={{ padding: 0 }}
      closable={false}
      width={720}
      forceRender={true}
      visible={visible}
      onCancel={onCancel}
      title={null}
      footer={false}
    >
      {visible && (
        <ShakaPlayer
          mpdFile={link_widevine}
          signKey={localStorage.getItem("signKey")}
          posterUrl={thumbnail}
          content_id={job_transcode_id ? job_transcode_id : content_id}
          is_protected={is_protected}
        />
      )}
    </Modal>
  )
}

export default memo(Component)
