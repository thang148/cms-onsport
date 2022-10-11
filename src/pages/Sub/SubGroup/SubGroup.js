import React, { useState, useEffect, useRef } from "react"
import { Button, notification } from "antd"
import { Pagination, Table, TitlePage } from "components/ui"
import { apiPackage } from "api"
import { paramsUrl } from "lib/function"
import Filter from "./Filter"
import Columns from "./Columns"
import { useNavigate } from "react-router-dom"
import ModalCreatePackage from "./ModalCreatePackage"
import { PlusOutlined } from "@ant-design/icons"

export default function ListUser() {
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const __pagination = useRef({
    page_num: 1,
    page_size: 50,
    count: 10,
    is_active: true,
    ...paramsUrl.get()
  })
  const item = useRef(false)
  const [visible, setVisible] = useState(false)

  function handleModal(value) {
    if (item.current) item.current = false
    setVisible(value)
  }

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      let params = { ...__pagination.current }
      const { data, total } = await apiPackage.getListPackage(params)
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
  function changePage(page_num, page_size) {
    __pagination.current.page_num = page_num
    __pagination.current.page_size = page_size
    fetch()
  }
  async function actionData(r, v, k) {
    if (k === "edit") {
      item.current = r
      setVisible(true)
    }
    if (k === "swapStatus") {
      togleActive(r, v)
    }
    if (k === "detailSub") {
      console.log("xcxc")
      localStorage.setItem("SubGroupName", r?.name)
      navigate(`/subscription/product/${v}`)
    }
  }
  async function togleActive(id, active) {
    console.log("id, active", id, active)
    try {
      await apiPackage.updatePackage(id, {
        is_active: active
      })
      notification.success({ description: "Chuyển trạng thái thành công!", message: "Thông báo" })
      fetch()
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý Subscription Group" />

      <div className="flex justify-between mb-4 __content">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleModal(true)}>
          Thêm Subscription Group
        </Button>
      </div>
      <ModalCreatePackage visible={visible} onClose={onClose} item={item.current} />
      <div className="__content">
        <Table columns={Columns(actionData)} dataSource={rows} loading={loading} />
        <Pagination onChange={changePage} {...__pagination.current} />
      </div>
    </section>
  )
}
