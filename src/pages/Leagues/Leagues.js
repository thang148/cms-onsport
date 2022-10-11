import React, { useState, useEffect, useRef } from "react"
import { Button, Drawer } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import FormUpdateLeague from "./FormUpdateLeague"
import columns from "./Columns"
import { useNavigate } from "react-router-dom"
import { paramsUrl } from "lib/function"
import { apiLeagues } from "api"
import "./index.scss"
import Filter from "./Filter"

const Component = () => {
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const item = useRef(false)

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
      const { data, count } = await apiLeagues.gets(__pagination.current)
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

  function actionData(k, v) {
    if (k === "edit") {
      item.current = v
      setVisible(true)
    }
    if (k === "next") {
      localStorage.setItem("league_id", v)
      navigate(`/event`)
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
      <TitlePage title=" Quản lý giải đấu" />

      <div className="flex justify-between bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Button type="primary" onClick={() => handleModal(true)}>
          Tạo mới giải đấu
        </Button>
      </div>

      <Drawer
        title={item.current ? "Cập nhật" : "Thêm mới"}
        open={visible}
        onClose={() => onClose(false)}
        footer={false}
        width={720}
        bodyStyle={{ padding: 0 }}
      >
        <FormUpdateLeague onClose={onClose} item={item.current} />
      </Drawer>

      <div className="__content">
        <Table dataSource={rows} loading={loading} columns={columns(actionData)} />
        <Pagination {...__pagination.current} onChange={changePage} />
      </div>
    </section>
  )
}

export default Component
