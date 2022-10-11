import { memo } from "react"
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import React, { useRef, useState } from "react"
import "./index.scss"

const ItemTitle = memo(({ onAction, item_name }) => {
  const [edit, setEdit] = useState(false)
  const input = useRef()

  function handleAction(e, key) {
    e.stopPropagation()
    if (key === "edit") {
      setEdit(true)
      setTimeout(() => {
        input.current.focus()
      }, 200)
    } else {
      onAction(key)
    }
  }

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

  return (
    <div className="inline-block __width">
      <div className="flex justify-between relative" onBlur={onSave}>
        <div
          contentEditable={edit}
          onClick={onClick}
          ref={input}
          className={edit ? "cursor-text w-full __input_name" : "cursor-pointer line-clamp-1"}
        >
          {item_name}
        </div>
        {!edit && (
          <div className="space-x-2 hidden icon__action absolute right-0 top-0">
            <span className="hover:text-blue-600">
              <PlusOutlined onClick={(e) => handleAction(e, "add")} />
            </span>
            {item_name !== "Home" && (
              <>
                <span className="hover:text-blue-600">
                  <EditOutlined onClick={(e) => handleAction(e, "edit")} />
                </span>

                <span className="hover:text-red-600">
                  <DeleteOutlined onClick={(e) => handleAction(e, "delete")} />
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

export default ItemTitle
