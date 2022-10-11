import { useEffect, useRef, useState } from "react"
import { apiMedia } from "api"
import { FolderOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import "./index.scss"

export default function Component({ onChange, value }) {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [select, setSelect] = useState("")
  const __isMoner = useRef(true)
  const prev = useRef([""])
  async function fetch(path) {
    let rows = []
    try {
      const { data } = await apiMedia.getfolderOnTV({ filepath: path })
      rows = data
    } catch (e) {
      throw e
    } finally {
      if (__isMoner.current) setRows(rows)
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
  function onClose() {
    setVisible(false)
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
    __isMoner.current = true
    fetch()
    return () => {
      __isMoner.current = false
    }
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
      <div className="__img_upload" onClick={() => setVisible(true)}>
        {value ? (
          <img src={value} alt={value} />
        ) : (
          <div className="text-center">
            <PlusOutlined />
            <div>Upload</div>
          </div>
        )}
      </div>
    </div>
  )
}
