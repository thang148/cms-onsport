import React, { useState, useEffect, useRef } from "react"
import { Button, notification, Drawer } from "antd"
import { Pagination, Table, TitlePage } from "components/ui"
import { apiSubscription } from "api"
import { paramsUrl } from "lib/function"
import Filter from "./Filter"
import Columns from "./Columns"
import FormUpdateSubscription from "./FormUpdateSubscription"
// import ModalDetailSubscription from "./ModalDetailSubscription"

const dfParams = {
  page_num: 1,
  page_size: 50,
  count: 10,
  disable: false,
  ...paramsUrl.get()
}

export default function ListSubscription() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const __pagination = useRef(dfParams)
  const item = useRef(false)
  const [visible, setVisible] = useState(false)
  const [visibleX, setVisibleX] = useState(false)

  function handleModal(value) {
    if (item.current) item.current = false
    setVisible(value)
  }

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      let params = { ...__pagination.current }
      params.page = params.page_num
      params.per_page = params.page_size
      const { data, total } = await apiSubscription.getListSubscription(params)
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
  function onCloseX(isLoad) {
    setVisibleX(false)
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
      togleActive(r?.id, r, v)
    }
    if (k === "detailSub") {
      item.current = v
      setVisibleX(true)
    }
  }
  async function togleActive(id, data, active) {
    data.disable = active
    try {
      await apiSubscription.updateSubscription(id, data)
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
      <TitlePage title="Gói Subscription" />
      <div className="__content flex justify-between mb-4">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Button type="primary" onClick={() => handleModal(true)}>
          Thêm mới Subscription
        </Button>
      </div>
      <div className="__content">
        <Drawer
          onClose={() => onClose(false)}
          open={visible}
          footer={false}
          width={640}
          bodyStyle={{ padding: 0 }}
          title={item.current ? "Cập nhật Subscription" : "Thêm mới Subscription"}
        >
          <FormUpdateSubscription item={item.current} onClose={onClose} />
        </Drawer>

        {/* <ModalDetailSubscription visible={visibleX} onClose={onCloseX} item={item.current} /> */}
        <Table columns={Columns(actionData)} dataSource={rows} loading={loading} />
        <Pagination onChange={changePage} {...__pagination.current} />
      </div>
    </section>
  )
}
