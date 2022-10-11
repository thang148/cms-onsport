import { Tooltip, Tag } from "antd"
import { FolderOutlined, SyncOutlined } from "@ant-design/icons"
import { CaretRightOutlined } from "@ant-design/icons"
import React, { useEffect, useRef, useState } from "react"
import "./index.scss"

const ItemView = ({ onAction, item, setSelectedItem, isSelected, typeAction }) => {
  const [edit, setEdit] = useState(false)
  const input = useRef()

  function onClick(e) {
    if (edit) {
      e.stopPropagation()
    }
  }

  function onClose() {
    setEdit(false)
  }

  function onSave() {
    if (edit) {
      onClose()
      onAction("edit", input.current.innerHTML)
    }
  }

  function onKeyPress(e) {
    if (e.keyCode === 13) {
      if (edit) {
        onClose()
        onAction("edit", input.current.innerHTML)
      }
    }
  }

  useEffect(() => {
    if (isSelected && typeAction === "edit") {
      setEdit(true)
      setTimeout(() => {
        input.current.focus()
      }, 200)
    }
  }, [isSelected, typeAction])

  const { item_name, type, trans_status } = item
  return (
    <div onMouseDown={setSelectedItem} className="text-center relative w-full">
      <div>
        {type === 2 && <FolderOutlined style={{ fontSize: 48 }} />}
        {(type === 1 || item.type === 0) && (
          <div className="relative">
            {type === 0 && (
              <div className="_youtube text-red-700 px-3 bg-white absolute text-lg">
                <CaretRightOutlined />
              </div>
            )}
            <img src={item.image_url.default_url} alt="" loading="lazy" />
            {trans_status === 0 && type === 0 && (
              <div className="_icon_loading">
                <Tag color="processing" icon={<SyncOutlined spin />}>
                  loading...
                </Tag>
              </div>
            )}
          </div>
        )}
        {edit && (
          <div
            onBlur={onSave}
            onKeyDown={onKeyPress}
            tabIndex="0"
            className="cursor-text __text absolute left-0 bg-white __change_name"
            contentEditable={edit}
            suppressContentEditableWarning={true}
            ref={input}
            onDoubleClick={onClick}
            onClick={onClick}
          >
            {item_name}
          </div>
        )}

        <Tooltip title={item_name}>
          <div className="cursor-pointer">
            <div className="line-clamp-1 __text" style={{ maxWidth: 120 }}>
              {item_name}
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default ItemView
