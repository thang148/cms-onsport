import React, { useState, useEffect, useRef } from "react"
import { Button } from "antd"
import { Table, Pagination, TitlePage } from "components/ui"
import ModalCreateUser from "./ModalUpdate"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiRole } from "api"

const Component = () => {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const item = useRef(false)

  const __pagination = useRef({
    pageNumber: 1,
    pageSize: 20,
    total: 0,
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
      const { items, total } = await apiRole.getRoles(__pagination.current)
      rows = items
      __pagination.current.total = total
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
  }

  function onClose(isLoad) {
    setVisible(false)
    if (isLoad) {
      fetch()
    }
  }
  function changePage(pageNumber, pageSize) {
    __pagination.current.pageNumber = pageNumber
    __pagination.current.pageSize = pageSize
    fetch()
  }
  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className="wapper_small">
      <TitlePage title="Vai trò phân quyền" />
      <div className="__content">
        <div className="flex justify-end mb-4">
          <Button type="primary" onClick={() => handleModal(true)}>
            Thêm mới vai trò
          </Button>
        </div>

        <ModalCreateUser visible={visible} onClose={onClose} item={item.current} />
        <Table dataSource={rows} loading={loading} columns={columns(actionData)} />

        <Pagination {...__pagination.current} onChange={changePage} />
      </div>
    </div>
  )
}

export default Component
