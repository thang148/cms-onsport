import { useEffect, useRef, useState } from "react"
import { apiMedia } from "api"
import { FolderOutlined, LeftOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import "components/ModalNas/index.scss"

export default function Component({ onChange, onClose, visible }) {
  const [rows, setRows] = useState([])
  const [select, setSelect] = useState("")
  const prev = useRef([""])
  async function fetch(path) {
    let rows = []
    try {
      const { data } = await apiMedia.getfolderOnTV({ filepath: path })
      rows = data
    } catch (e) {
      throw e
    } finally {
      setRows(rows)
    }
  }

  function onSelect(path) {
    prev.current.push(path)
    fetch(path)
  }

  function onPrev() {
    if (prev.current.length > 1) {
      fetch(prev.current[prev.current.length - 2])
      prev.current.splice(-1)
    }
  }

  function onOk() {
    onChange(select)
    onClose()
  }

  function onDoubleClick(path) {
    onChange(path)
    onClose()
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <Modal
        title={null}
        closable={false}
        onCancel={onClose}
        width={600}
        visible={visible}
        bodyStyle={{ padding: 0 }}
        onOk={onOk}
      >
        <div className="__nas">
          <div className="flex bg-white border-b border-gray-400 p-2 space-x-4 sticky top-0">
            <Button icon={<LeftOutlined />} onClick={onPrev} />
          </div>
          <div className="flex flex-wrap p-2 __content_folder">
            {rows.map(({ file_name, path_folder, type, link_image }, key) => {
              return (
                <div key={key} className="view_folder">
                  {type === 2 ? (
                    <div onClick={() => onSelect(path_folder)} className="__item">
                      <div>
                        <FolderOutlined style={{ fontSize: 42 }} />
                      </div>
                      {file_name}
                    </div>
                  ) : (
                    <div
                      onClick={() => setSelect(link_image)}
                      onDoubleClick={() => onDoubleClick(link_image)}
                      className={select === link_image ? "__active __item" : "__item"}
                    >
                      <img src={link_image} alt={link_image} />
                      <div className="line-clamp-3">{file_name}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    </div>
  )
}
