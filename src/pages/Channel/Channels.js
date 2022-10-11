import React, { useState, useEffect, useRef } from "react"
import { Button } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
// import ModalCreateUser from "./ModalUpdate"
import ModalUpdateChannel from "./ModalUpdateChannel"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiChannel } from "api"
import { useNavigate } from "react-router-dom"
import ModalPreviewVideo from "components/ModalPreviewVideo"
import Filter from "./Filter"

const Component = () => {
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visibleV, setVisibleV] = useState(false)
  const itemLink = useRef({})
  const item = useRef(false)

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
      const { data, count } = await apiChannel.gets(__pagination.current)
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
    if (k === "play") {
      itemLink.current = v
      setVisibleV(true)
    }
    if (k === "next") {
      localStorage.setItem("channel_id", v)
      navigate(`/event`)
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
      <TitlePage title="Quản lý channels" />
      {/* <div className="text-red-600">pham ngoc doi</div> */}
      <div className="flex justify-between bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Button type="primary" onClick={() => handleModal(true)}>
          Thêm mới channel
        </Button>
      </div>
      <ModalUpdateChannel visible={visible} onClose={onClose} item={item.current} />
      <div className="__content">
        <Table dataSource={rows} loading={loading} columns={columns(actionData)} />
        <Pagination {...__pagination.current} onChange={changePage} />
      </div>

      <ModalPreviewVideo
        visible={visibleV}
        item={itemLink.current}
        onClose={() => setVisibleV(false)}
      />
    </section>
  )
}

export default Component
