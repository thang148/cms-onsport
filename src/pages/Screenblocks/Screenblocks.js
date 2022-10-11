import React, { useState, useEffect, useRef } from "react"
import { Button, Modal, notification } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiScreenblockOnTV } from "api"
import FormUpdate from "./FormUpdate"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const Screenblocks = () => {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const item = useRef(false)

  const __pagination = useRef({
    page_num: 1,
    page_size: 1000,
    count: 0,
    ...paramsUrl.get()
  })

  function handleModal(value) {
    if (item.current) item.current = false
    setVisible(value)
  }

  async function updateOrder(list) {
    try {
      await apiScreenblockOnTV.updateOrder(
        list.map((i, k) => {
          return {
            block_id: i.id,
            order_number: i.order_number
          }
        })
      )
      notification.success({ message: "Thông báo!", description: "Cập nhật thành công!" })
    } catch (error) {
      console.log(error)
    }
  }
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      let newData = arrayMoveImmutable([].concat(rows), oldIndex, newIndex).filter((el) => !!el)
      const __data = newData.map((i, k) => {
        return {
          ...i,
          order_number: k + 1 + (__pagination.current.page_num - 1) * __pagination.current.page_size
        }
      })
      updateOrder(__data)
      setRows(__data)
    }
  }
  async function fetch() {
    let rows = []
    try {
      setLoading(true)
      const { data, count } = await apiScreenblockOnTV.gets(__pagination.current)
      rows = data
      __pagination.current.count = count
    } catch (e) {
      throw e
    } finally {
      setRows(rows)
      setLoading(false)
    }
    paramsUrl.set(__pagination.current)
  }
  async function remove(id) {
    try {
      setLoading(true)
      await apiScreenblockOnTV.remove(id)
      notification.success({ message: "Thông báo!", description: "Xóa thành công!" })
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
      fetch()
    }
  }

  const DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  )

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = rows.findIndex((x) => x.id === restProps["data-row-key"])
    return <SortableItem index={index} {...restProps} />
  }

  function onAction(k, v) {
    if (k === "edit") {
      item.current = v
      setVisible(true)
    } else {
      remove(v)
    }
  }

  function onClose(isLoad) {
    setVisible(false)
    if (isLoad) {
      fetch()
    }
  }

  function changePage(page_num, page_size) {
    __pagination.current.page_num = page_num
    __pagination.current.page_size = page_size
    fetch()
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý khối hiển thị" />

      <div className="flex justify-end bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Button type="primary" onClick={() => handleModal(true)}>
          Tạo mới khối
        </Button>
      </div>

      <Modal
        title={item.current ? "Cập nhật" : "Thêm mới"}
        open={visible}
        onCancel={() => onClose(false)}
        footer={false}
        bodyStyle={{ padding: 0 }}
      >
        <FormUpdate visible={visible} onClose={onClose} item={item.current} />
      </Modal>

      <div className="__content">
        <Table
          dataSource={rows}
          loading={loading}
          columns={columns(onAction)}
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow
            }
          }}
        />
        <Pagination {...__pagination.current} onChange={changePage} />
      </div>
    </section>
  )
}

export default Screenblocks
