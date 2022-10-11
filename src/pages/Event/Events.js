import React, { useState, useEffect, useRef } from "react"
import { Button, DatePicker, Modal, notification } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { Link, useNavigate } from "react-router-dom"
import { apiEventTV } from "api"
import Filter from "./Filter"
import moment from "moment-timezone"

const Component = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const __pagination = useRef({
    page_num: 1,
    page_size: 20,
    count: 0,
    timezone: 7,
    ...paramsUrl.get()
  })

  async function fetch() {
    let rows = []
    try {
      setLoading(true)
      const { data, count } = await apiEventTV.getEvents(__pagination.current)
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
  async function updateStatus(id, isStart, time, duration) {
    try {
      await apiEventTV.updateStatus(id, {
        status: isStart ? "live" : "finish",
        over_time: time,
        duration
      })
    } catch (e) {
      throw e
    } finally {
      fetch()
    }
  }
  async function eventFullmatch(id) {
    localStorage.setItem("event_fullmatch_id", id)
    navigate("/video")
  }

  function onAction(k, v) {
    let _time
    switch (k) {
      case "fullmatch":
        eventFullmatch(v)
        break
      case "start":
        updateStatus(v, true)
        break
      case "end":
        Modal.confirm({
          onOk: () => {
            const duration = moment(_time).diff(moment(v?.start_time * 1000), "seconds")
            if (duration > 0) {
              updateStatus(v.id, false, moment(_time).format("X"), duration)
            } else {
              notification.error({
                message: "Thông báo",
                description: "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc!"
              })
            }
          },
          title: "Nhập thời gian kết thúc thực tế!",
          content: (
            <div>
              <DatePicker
                defaultValue={moment()}
                showTime={{ format: "HH:mm" }}
                onChange={(v, str) => (_time = str)}
              />
            </div>
          )
        })
        break
      case "addSlide":
        localStorage.setItem("event_id", v)
        navigate(`/slide`)
        break
      case "addHighlight":
        localStorage.setItem("event_id", v)
        navigate(`/video`)
        break
      case "chat":
        localStorage.setItem("event_id", v)
        navigate(`/chat/chat-manage`)
        break
      default:
        break
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
  function handleTableChange(pagination, filters, sorter) {
    const { order, field } = sorter
    console.log(sorter)
    __pagination.current.page_num = 1
    __pagination.current.order = order
    __pagination.current.field = field
    fetch()
  }
  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý sự kiện" />
      <div className="flex justify-between bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Link to="/event/new">
          <Button type="primary" className="ml-10">
            Thêm mới sự kiện
          </Button>
        </Link>
      </div>
      <div className="__content">
        <Table
          dataSource={rows}
          loading={loading}
          columns={columns(onAction)}
          onChange={handleTableChange}
        />
        <Pagination {...__pagination.current} onChange={changePage} />
      </div>
    </section>
  )
}

export default Component
