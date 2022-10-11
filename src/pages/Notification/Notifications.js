import React, { useState, useEffect, useRef } from "react"
import { Button, notification } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import ModalCreateUser from "./ModalUpdate"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiNotification } from "api"

const Component = () => {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const item = useRef(false)
  const checkLoading = useRef(false)

  const __pagination = useRef({
    page_num: 1,
    page_size: 10,
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
      const { data, total } = await apiNotification.gets(__pagination.current)
      rows = data
      __pagination.current.count = total
    } catch (e) {
      throw e
    } finally {
      setRows(rows)
      setLoading(false)
    }
    paramsUrl.set(__pagination.current)
  }

  function actionData(k, v) {
    if (k === "edit") {
      item.current = v
      setVisible(true)
    }
    if (k === "push" && checkLoading.current === false) {
      pushNotification(v)
    }
    if (k === "delete") {
      remove(v)
    }
  }
  async function pushNotification(id) {
    try {
      checkLoading.current = true
      await apiNotification.push(id)
      notification.success({ message: "Thông báo!", description: "Đẩy thông báo thành công" })
      fetch()
    } catch (e) {
      throw e
    } finally {
      checkLoading.current = false
    }
  }
  async function remove(id) {
    try {
      await apiNotification.remove(id)
      notification.success({ message: "Thông báo!", description: "Xóa thông báo thành công" })
      fetch()
    } catch (e) {
      throw e
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
      <TitlePage title="Quản lý thông báo" />

      <div className="flex justify-end bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Button type="primary" onClick={() => handleModal(true)}>
          Thêm mới thông báo
        </Button>
      </div>
      <ModalCreateUser visible={visible} onClose={onClose} item={item.current} />
      <div className="__content">
        <Table dataSource={rows} loading={loading} columns={columns(actionData)} />
        <Pagination {...__pagination.current} onChange={changePage} />
      </div>
    </section>
  )
}

export default Component
