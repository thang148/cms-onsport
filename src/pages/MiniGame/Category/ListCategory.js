import React, { useState, useEffect, useRef } from "react"
import { Button, Card, notification } from "antd"
import { Table, Pagination } from "components/ui"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiMiniGame } from "api"
import ModalCreateUser from "./ModalUpdate"

const Component = ({ tabs }) => {
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
      const { data, count } = await apiMiniGame.getCategoryMiniGame(__pagination.current)
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
  async function deleteCategoryMiniGame(id) {
    try {
      setLoading(true)
      await apiMiniGame.deleteCategoryMiniGame(id)
      notification.success({ message: "Thông báo!", description: "Xóa thành công!" })
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
      fetch()
    }
  }

  function onAction(k, v) {
    if (k === "edit") {
      item.current = v
      setVisible(true)
    } else {
      deleteCategoryMiniGame(v)
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
    <section>
      <Card size="small">
        <div className="flex justify-end mb-4">
          <Button type="primary" onClick={() => handleModal(true)}>
            Tạo mới Category
          </Button>
        </div>

        <ModalCreateUser visible={visible} onClose={onClose} item={item.current} />
        <Table
          size="small"
          pagination={false}
          dataSource={rows}
          loading={loading}
          columns={columns(onAction)}
        />

        <Pagination {...__pagination.current} onChange={changePage} />
      </Card>
    </section>
  )
}

export default Component
