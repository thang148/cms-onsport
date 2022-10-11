import React, { useState, useEffect, useRef } from "react"
import { Button, Card, notification } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import ModalUpdate from "./ModalUpdate"
import ModalView from "./ModalView"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiMiniGame } from "api"
import Filter from "./Filter"

const Component = () => {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visibleDetail, setVisibleDetail] = useState(false)
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
      const { data, count } = await apiMiniGame.getAllMiniGamesEvent(__pagination.current)
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
    if (k === "view_detail") {
      item.current = v
      setVisibleDetail(true)
    }
    if (k === "delete") {
      deleteMiniGame(v?.id)
    }
  }

  async function deleteMiniGame(id) {
    try {
      await apiMiniGame.deleteMiniGameEvent(id)
      notification.success({ message: "Thông báo!", description: "Xóa Mini Game thành công" })
      fetch()
    } catch (e) {
      throw e
    }
  }
  const onFilter = (data) => {
    __pagination.current.page_num = 1
    __pagination.current = { ...__pagination.current, ...data }
    fetch()
  }
  function onClose(isLoad) {
    setVisible(false)
    if (isLoad) {
      fetch()
    }
  }
  function onClose_Detail(isLoad) {
    setVisibleDetail(false)
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
      <TitlePage title="Quản lý Event Mini Game" />

      <div className="flex justify-between bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Button type="primary" onClick={() => handleModal(true)}>
          Thêm mới Event Mini Game
        </Button>
      </div>
      <div className="__content">
        <ModalUpdate visible={visible} onClose={onClose} item={item.current} />
        <ModalView visible={visibleDetail} onClose={onClose_Detail} item={item.current} />
        <Table dataSource={rows} loading={loading} columns={columns(actionData)} />
        <Pagination {...__pagination.current} onChange={changePage} />
      </div>
    </section>
  )
}

export default Component
