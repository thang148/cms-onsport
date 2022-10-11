import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button, notification } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import columns from "./Columns"
import ModalPreviewVideo from "components/ModalPreviewVideo"
import { paramsUrl } from "lib/function"
import { apiVideosTV } from "api"
import Filter from "./Filter"
import "./index.scss"
import { Link } from "react-router-dom"

const Component = () => {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleV, setVisibleV] = useState(false)
  const [loading, setLoading] = useState(false)
  const item = useRef(false)
  const dfEvent = localStorage.getItem("event_id")
  const itemLink = useRef({})
  const __pagination = useRef({
    page_num: 1,
    page_size: 20,
    count: 0,
    event_id: localStorage.getItem("event_fullmatch_id"),
    screen_block_type: localStorage.getItem("event_fullmatch_id") ? "fullmatch" : undefined,
    ...paramsUrl.get()
  })

  function handleModal(value) {
    if (item.current) item.current = false
    setVisible(value)
  }

  async function fetch(notLoading) {
    let rows = []
    try {
      if (!notLoading) setLoading(true)
      const { data, count } = await apiVideosTV.gets(__pagination.current)
      rows = data
      __pagination.current.count = count
    } catch (e) {
      throw e
    } finally {
      setRows(rows)
      if (!notLoading) setLoading(false)
    }
    paramsUrl.set(__pagination.current)
  }

  async function removeVideo(id) {
    try {
      const { message } = await apiVideosTV.remove(id)
      notification.success({ message: "Thông báo!", description: message })
      fetch()
    } catch (e) {
      throw e
    }
  }

  async function publicVideo(id) {
    try {
      const { message } = await apiVideosTV.updateLink(id)
      notification.success({ message: "Thông báo!", description: message })
      fetch()
    } catch (e) {
      throw e
    }
  }

  function onAction(k, v) {
    if (k === "edit") {
      item.current = v
      setVisible(true)
    }
    if (k === "delete") {
      removeVideo(v)
    }
    if (k === "play") {
      itemLink.current = v
      setVisibleV(true)
    }
    if (k === "public") {
      publicVideo(v)
    }
  }

  const onCloseV = useCallback(
    () => {
      setVisibleV(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible]
  )
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
    if (dfEvent) {
      setTimeout(function () {
        handleModal(true)
      }, 500)
    }
    fetch()
    if (localStorage.getItem("event_fullmatch_id")) localStorage.removeItem("event_fullmatch_id")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý videos" />
      <div className="flex justify-between bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Link to={`/video/new`}>
          <Button type="primary">Thêm video</Button>
        </Link>
      </div>
      <div className="__content">
        <Table dataSource={rows} loading={loading} columns={columns(onAction)} />
        <Pagination {...__pagination.current} onChange={changePage} />
      </div>

      <ModalPreviewVideo visible={visibleV} item={itemLink.current} onClose={onCloseV} />
    </section>
  )
}

export default Component
