import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button, notification, Modal } from "antd"
import { Table, TitlePage } from "components/ui"
import FormUpdate from "./FormUpdate"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiSlide } from "api"
import Filter from "./Filter"
import { useLocation } from "react-router-dom"

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const Component = () => {
  const { state } = useLocation()
  const __init = useRef(state)
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const item = useRef(false)

  const __pagination = useRef({
    page_num: 1,
    page_size: 100,
    count: 0,
    ...paramsUrl.get()
  })

  function handleModal(value) {
    if (item.current) item.current = false
    setVisible(value)
  }

  async function fetch() {
    let rows = []
    try {
      setLoading(true)
      const { data, count } = await apiSlide.gets(__pagination.current)
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
  async function removeItem(id) {
    try {
      setLoading(true)
      await apiSlide.remove(id)
      fetch()
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }

  const actionData = useCallback((k, v) => {
    if (k === "edit") {
      item.current = v
      setVisible(true)
    }
    if (k === "delete") {
      removeItem(v)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onClose(isLoad) {
    setVisible(false)
    if (isLoad) {
      __init.current = {}
      fetch()
    }
  }

  const onFilter = (data) => {
    __pagination.current.page_num = 1
    __pagination.current = { ...__pagination.current, ...data }
    fetch()
  }

  async function updateOrder(list) {
    try {
      await apiSlide.updateOrder(
        list.map((i, k) => {
          return {
            slide_id: i.id,
            order_number: k + 1
          }
        })
      )
      notification.success({ message: "Thông báo!", description: "Cập nhật thành công!" })
    } catch (error) {
      console.log(error)
    }
  }

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        let newData = arrayMoveImmutable([].concat(rows), oldIndex, newIndex).filter((el) => !!el)
        const __data = newData.map((i, k) => {
          return { ...i, order_number: k + 1 }
        })
        setRows(__data)
        updateOrder(__data)
      }
    },
    [rows]
  )

  useEffect(() => {
    if (state?.event_id) {
      setTimeout(function () {
        handleModal(true)
      }, 500)
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const DraggableContainer = useCallback(
    (props) => (
      <SortableContainer
        useDragHandle
        disableAutoscroll
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
    ),
    [onSortEnd]
  )

  const DraggableBodyRow = useCallback(
    ({ className, style, ...restProps }) => {
      // function findIndex base on Table rowKey props and should always be a right array index
      const index = rows.findIndex((x) => x.id === restProps["data-row-key"])
      return <SortableItem index={index} {...restProps} />
    },
    [rows]
  )

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý slides" />
      <div className="flex justify-between bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Button type="primary" onClick={() => handleModal(true)}>
          Thêm mới slide
        </Button>
      </div>
      <Modal
        title={item.current ? "Cập nhật" : "Thêm mới"}
        open={visible}
        onCancel={() => onClose(false)}
        footer={false}
        bodyStyle={{ padding: 0 }}
      >
        <FormUpdate initslide={__init.current} onClose={onClose} item={item.current} />
      </Modal>
      <div className="__content">
        <Table
          size="small"
          pagination={false}
          dataSource={rows}
          loading={loading}
          columns={columns(actionData)}
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow
            }
          }}
        />
      </div>
    </section>
  )
}

export default Component
