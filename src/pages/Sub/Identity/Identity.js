import React, { useState, useEffect, useRef } from "react"
import { notification } from "antd"
import { Pagination, Table, TitlePage } from "components/ui"
import { apiIdentity } from "api"
import { paramsUrl } from "lib/function"
import Filter from "./Filter"
import Columns from "./Columns"
import { useNavigate } from "react-router-dom"

const dfParams = {
  page_num: 1,
  page_size: 50,
  count: 10,
  ...paramsUrl.get()
}

export default function ListUser() {
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const __pagination = useRef(dfParams)

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      let params = { ...__pagination.current }
      params.page = params.page_num
      params.per_page = params.page_size
      const { data, total } = await apiIdentity.gets(params)
      _rows = data
      __pagination.current.count = total
      paramsUrl.set(__pagination.current)
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }
  async function togleActive(id, active) {
    try {
      await apiIdentity.updateActive(id, {
        deactivated: active
      })
      notification.success({ description: "Cập nhật thành công!", message: "Thông báo" })
      fetch()
    } catch (error) {
      throw new Error(error)
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

  const onAction = (id, active, key) => {
    if (key === "switch") {
      togleActive(id, active)
    } else {
      navigate(`/customer/${id}`)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Danh sách người dùng" />
      <div className="__content mb-4">
        <Filter filter={__pagination.current} onFilter={onFilter} />
      </div>
      <div className="__content ">
        <Table columns={Columns(onAction)} dataSource={rows} loading={loading} />
        <Pagination onChange={changePage} {...__pagination.current} />
      </div>
    </section>
  )
}
