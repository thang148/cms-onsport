import React, { useState, useEffect, useRef } from "react"
import { Button, Card, notification } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import ModalCreateUser from "./ModalUpdate"
import { sortableContainer, sortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiBanner } from "api"
import Filter from "./Filter"

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)
const Component = () => {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const item = useRef(false)
  const dfEvent = localStorage.getItem("event_id")

  const __pagination = useRef({
    page_num: 1,
    page_size: 20,
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
      const { data, count } = await apiBanner.gets(__pagination.current)
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
      await apiBanner.remove(id)
      fetch()
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }

  function actionData(k, v) {
    if (k === "edit") {
      item.current = v
      setVisible(true)
    }
    if (k === "delete") {
      removeItem(v)
    }
  }

  function onClose(isLoad) {
    setVisible(false)
    if (isLoad) {
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
      await apiBanner.updateOrder(
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

  function changePage(page_num, page_size) {
    __pagination.current.page_num = page_num
    __pagination.current.page_size = page_size
    fetch()
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      let newData = arrayMoveImmutable([].concat(rows), oldIndex, newIndex).filter((el) => !!el)
      const __data = newData.map((i, k) => {
        return { ...i, order_number: k + 1 }
      })
      setRows(__data)
      updateOrder(__data)
    }
  }
  useEffect(() => {
    if (dfEvent) {
      setTimeout(function () {
        handleModal(true)
      }, 500)
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
    <section>
      <TitlePage title="Quản lý banner web" />
      <Card size="small">
        <div className="flex justify-end mb-4">
          <Button type="primary" onClick={() => handleModal(true)}>
            Thêm mới banner
          </Button>
        </div>
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <ModalCreateUser visible={visible} onClose={onClose} item={item.current} />

        <Table
          // size="small"
          // pagination={false}
          dataSource={rows}
          loading={loading}
          columns={columns(actionData)}
          // rowKey={(record) => record.id}
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow
            }
          }}
        />
        <Pagination {...__pagination.current} onChange={changePage} />
      </Card>
    </section>
  )
}

export default Component
