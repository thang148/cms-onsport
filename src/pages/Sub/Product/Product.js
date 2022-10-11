import React, { useState, useEffect, useRef } from "react"
import { Button, notification } from "antd"
import { Pagination, Table, TitlePage } from "components/ui"
import { apiPackage, apiProduct } from "api"
import { paramsUrl } from "lib/function"
import Columns from "./Columns"
import { useParams } from "react-router-dom"
import ModalCreateProduct from "./ModalCreateProduct"
import Filter from "./Filter"

const dfParams = {
  page_num: 1,
  page_size: 50,
  count: 10,
  is_active: true,
  ...paramsUrl.get()
}

export default function ListProduct() {
  const { package_id } = useParams()
  const [rows, setRows] = useState([])
  const [initPakage, setInitPakage] = useState({})
  const [loading, setLoading] = useState(false)
  const __pagination = useRef(dfParams)
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
      const { data, total } = await apiProduct.getListProduct(package_id, params)
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
      r.is_active = !r.is_active
      console.log("r, v, k", r, v)
      togleActive(r, v)
    }
  }
  async function togleActive(data, id) {
    console.log("id, active", id, data)
    try {
      await apiProduct.updateProduct(id, data)
      notification.success({
        message: "Thông báo!",
        description: "Chuyển trạng thái thành công !"
      })
      fetch()
    } catch (error) {
      throw new Error(error)
    }
  }

  async function getPackage() {
    try {
      const { data } = await apiPackage.getPackage(package_id)
      setInitPakage(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
    getPackage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log({ initPakage })
  return (
    <section className="wapper_small">
      <TitlePage
        title={
          <span>
            Chi tiết package<span className="text-primary">{initPakage?.name}</span>
          </span>
        }
      />
      <div className="__content mb-4 flex justify-end gap-2">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Button type="primary" onClick={() => handleModal(true)}>
          Thêm mới Product
        </Button>
      </div>

      <div className="__content">
        <ModalCreateProduct
          visible={visible}
          onClose={onClose}
          item={item.current}
          packageID={package_id}
        />
        <Table columns={Columns(actionData)} dataSource={rows} loading={loading} />
        <Pagination onChange={changePage} {...__pagination.current} />
      </div>
    </section>
  )
}
