import React, { useState, useEffect, useRef } from "react"
import { Button, message } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiTicket } from "api"
import ModalCreateTicket from "./ModalCreateTicket"
import Filter from "./Filter"

const Component = () => {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const item = useRef(false)

  const __pagination = useRef({
    page_num: 1,
    page_size: 10,
    count: 0,
    is_active: true,
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
      const { data, total } = await apiTicket.getListTicket(__pagination.current)
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

  async function actionData(k, v) {
    if (k === "edit") {
      item.current = v
      setVisible(true)
    }
    if (k === "delete") {
      await apiTicket.deleteTicket(v)
      message.success("Success!")
      fetch()
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

  const onFilter = (data) => {
    __pagination.current.page_num = 1
    __pagination.current = { ...__pagination.current, ...data }
    fetch()
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý Ticket" />

      <div className="__content flex justify-between mb-4">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Button type="primary" onClick={() => handleModal(true)}>
          Thêm mới Ticket
        </Button>
      </div>
      <div className="__content">
        <Table dataSource={rows} loading={loading} columns={columns(actionData)} />
        <Pagination {...__pagination.current} onChange={changePage} />
      </div>

      <ModalCreateTicket visible={visible} onClose={onClose} item={item.current} />
    </section>
  )
}

export default Component
