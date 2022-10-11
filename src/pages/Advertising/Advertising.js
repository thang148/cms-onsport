import React, { useState, useEffect, useRef } from "react"
import { Button } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import ModalCreateUser from "./ModalUpdate"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiAdvertising } from "api"
// import Filter from "./Filter"

const Component = () => {
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
      const { data, count } = await apiAdvertising.getAds(__pagination.current)
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
      await apiAdvertising.deleteAds(id)
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

  // const onFilter = (data) => {
  //   __pagination.current.page_num = 1
  //   __pagination.current = { ...__pagination.current, ...data }
  //   fetch()
  // }

  function changePage(page_num, page_size) {
    __pagination.current.page_num = page_num
    __pagination.current.page_size = page_size
    fetch()
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý quảng cáo" />

      <div className="flex justify-end bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Button type="primary" onClick={() => handleModal(true)}>
          Thêm mới quảng cáo
        </Button>
      </div>
      {/* <Filter filter={__pagination.current} onFilter={onFilter} /> */}
      <ModalCreateUser visible={visible} onClose={onClose} item={item.current} />

      <div className="__content">
        <Table
          size="small"
          pagination={false}
          dataSource={rows}
          loading={loading}
          columns={columns(actionData)}
        />
        <Pagination {...__pagination.current} onChange={changePage} />
      </div>
    </section>
  )
}

export default Component
