import React, { Fragment, useEffect, useState, useRef } from "react"
import { Breadcrumb, Button, Dropdown, Menu, message, notification } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import ModalUploadImage from "./ModalUploadImage"
import ModalUploadVideo from "./ModalUploadVideo"
import ItemView from "./ItemView"
import { apiMedia } from "api"

const itemMenu = (onChangeItem, isSpace, isCopy) => {
  return (
    <Menu>
      {!isSpace ? (
        <Fragment>
          <Menu.Item key="1" onClick={() => onChangeItem("edit")}>
            Đổi tên
          </Menu.Item>
          <Menu.Item key="2" onClick={() => onChangeItem("copy")}>
            Di chuyển
          </Menu.Item>
          <Menu.Item key="3" onClick={() => onChangeItem("delete")}>
            Xoá
          </Menu.Item>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item onClick={() => onChangeItem("create")} key="1">
            New folder
          </Menu.Item>
          <Menu.Item key="3" onClick={() => onChangeItem("upload-image")}>
            Tải tập tin
          </Menu.Item>
          <Menu.Item key="4" onClick={() => onChangeItem("upload-video")}>
            Tải video
          </Menu.Item>
        </Fragment>
      )}
      {isCopy && (
        <Menu.Item onClick={() => onChangeItem("paste")} key="22">
          Dán
        </Menu.Item>
      )}
    </Menu>
  )
}

export default function ViewFolder({ selected, reLoad, setSelected, backFolder, onChangeFile }) {
  const [subSelected, setSubSelected] = useState({})
  const [isSapce, setIsSpace] = useState(true)
  const [typeAction, setType] = useState()
  const [itemSelected, setItemSelected] = useState()
  const itemCopy = useRef()
  const fetch = async () => {
    try {
      const { data } = await apiMedia.getDetailFolder({ parent_id: selected.id })
      setSubSelected(data)
      reLoad()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const fetchStatus = async (item) => {
    if (item.job_id) {
      try {
        const res = await apiMedia.checkStatusTranscode([item.job_id])
        if (res.data && res.data[item.job_id] === 1) {
          if (onChangeFile) {
            onChangeFile(item.item_video)
          } else {
            window.open(item.item_video, "_blank")
          }
        } else {
          notification.warn({
            message: "Thông báo",
            description: "Video đang được xử lý xin vui lòng đợi thêm!"
          })
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      return
    }
  }

  const doubleClickItem = (item, index) => {
    if (item.type === 2) {
      setSelected({
        id: item.id,
        item_name: item.item_name,
        parent_id: item.parent_id,
        parent_id_text: item.parent_id_text
      })
    } else if (item.type === 0) {
      fetchStatus(item)
    } else {
      if (onChangeFile) {
        onChangeFile(item.image_url.root_url)
      } else {
        window.open(item.image_url.root_url, "_blank")
      }
    }
  }

  const clickItem = (e, index) => {
    e.stopPropagation()
    if (e.ctrlKey) {
      console.log("Ctrl+click has just happened!")
    }
  }

  const onPaste = async () => {
    try {
      const res = await apiMedia.updateFolder({
        ...itemCopy.current,
        parent_id: itemSelected.id ? itemSelected.id : selected.id
      })

      if (res.success) {
        notification.success({
          message: "Di chuyển thành công!",
          duration: 2
        })
        itemCopy.current = {}
        fetch()
      } else {
        notification.error({
          message: res.message,
          duration: 2
        })
        itemCopy.current = {}
      }
    } catch (e) {
      console.log(e)
    }
  }
  async function onCreate() {
    function getName(list, newName, index) {
      const _name = newName + index
      if (!list.find((i) => i.item_name === _name)) {
        return _name
      } else {
        index++
        return getName(list, newName, index)
      }
    }
    let newName = "New folder"
    if (subSelected?.find((i) => i.item_name === newName)) {
      newName = getName(subSelected, newName, 1)
    }

    await apiMedia.createFolder({
      item_name: newName,
      parent_id: selected.id,
      parent_id_text: selected.item_name
    })
    fetch()
  }

  async function onChangeItem(type) {
    const item = itemSelected
    try {
      switch (type) {
        case "delete":
          await apiMedia.deleteFile([item.id])
          fetch()
          break
        case "edit":
          setType(type)
          break
        case "copy":
          itemCopy.current = itemSelected
          setType(type)
          break
        case "paste":
          onPaste()
          break
        case "create":
          onCreate()
          break
        default:
          break
      }
    } catch (error) {
      message.error("Error!")
    }
  }

  async function onAction(key, v) {
    try {
      switch (key) {
        case "edit":
          try {
            await apiMedia.updateFolder({
              id: itemSelected.id,
              item_name: v,
              type: itemSelected.type,
              parent_id: selected.id,
              parent_id_text: selected.item_name
            })
            fetch()
          } catch (error) {
            throw error
          } finally {
            setType("")
          }
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  function setSelectedItem(e, item) {
    setItemSelected(item)
    setIsSpace(false)
    e.stopPropagation()
  }

  function resetItem() {
    setTimeout(() => {
      setItemSelected(false)
      setIsSpace(true)
    }, 150)
  }

  return (
    <div className="view-folder">
      <div
        className="flex items-center justify-between p-2 shadow sticky top-0 z-10 mb-4"
        style={{ background: "#fafafa" }}
      >
        <div className="flex items-center" onClick={backFolder}>
          <Button size="small" type="text">
            <LeftOutlined />
          </Button>
          <Breadcrumb>
            <Breadcrumb.Item>
              <div className="text-lg cursor-pointer hover:text-blue-600">
                {selected?.item_name}
              </div>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          <ModalUploadImage id={selected.id} fetch={fetch} />
          <ModalUploadVideo id={selected.id} fetch={fetch} />
        </div>
      </div>
      <Dropdown
        overlayClassName="__dropdown"
        overlay={itemMenu(onChangeItem, isSapce, typeAction === "copy")}
        trigger={["contextMenu"]}
      >
        <div onMouseDown={resetItem}>
          {subSelected && subSelected?.length > 0 && (
            <div className="flex flex-wrap space-x-2">
              {subSelected.map((item, index) => (
                <div
                  className="flex flex-col justify-end __item_file items-center"
                  key={index}
                  tabIndex="1"
                  onClick={(e) => clickItem(e, index)}
                  onDoubleClick={() => doubleClickItem(item, index)}
                >
                  <ItemView
                    item={item}
                    typeAction={typeAction}
                    isSelected={item.id === itemSelected?.id}
                    onAction={onAction}
                    setSelectedItem={(e) => setSelectedItem(e, item)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  )
}
