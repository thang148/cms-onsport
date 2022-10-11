import React, { useState, useEffect, useRef } from "react"
import { Button, notification } from "antd"
import { Pagination, Table, TitlePage } from "components/ui"
import columns from "./Columns"
import { paramsUrl } from "lib/function"
import { apiTranscodes } from "api"
import Filter from "./Filter"
import { Link } from "react-router-dom"
import ModalPreviewVideo from "components/ModalPreviewVideo"

export default function Videos() {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const itemLink = useRef({})

  const __item = useRef(false)
  const __time = useRef()
  const __pagination = useRef({
    page_num: 1,
    page_size: 10,
    count: 0,
    is_used: undefined,
    ...paramsUrl.get()
  })

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      let { data, success } = await apiTranscodes.gets(__pagination.current)
      if (success && data?.rows?.length > 0) {
        _rows = data?.rows
        __pagination.current.count = data?.total
      }
      if (!__time.current && _rows.find((i) => i.trans_status === 0)) {
        __time.current = setInterval(() => {
          checkStatus()
        }, 10000)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }

  async function checkStatus() {
    let _rows = []
    try {
      let { data, success } = await apiTranscodes.gets(__pagination.current)
      if (success) {
        _rows = data?.rows
        __pagination.current.count = data?.total
      }

      if (!_rows.find((i) => i.trans_status === 1) && __time.current) {
        clearInterval(__time.current)
        __time.current = false
      }
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
    }
  }

  function changePage(page_num, page_size) {
    __pagination.current.page_num = page_num
    __pagination.current.page_size = page_size
    fetch()
  }

  async function reLoad(r) {
    const { file_name, vod_path, id, is_drm } = r
    try {
      setLoading(true)
      await apiTranscodes.reTranscode({
        file_name: file_name,
        file_path: vod_path,
        id,
        is_drm: is_drm ? 1 : 0
      })
      notification.success({ title: "Thông báo!", message: "Transcode lại thành công!" })
      fetch()
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }

  const actionData = (key, record) => {
    if (key === "new") {
      __item.current = false
    }
    if (key === "reload") {
      reLoad(record)
    }
    if (key === "play") {
      itemLink.current = {
        link_widevine: record.url_vod + record.file_name + "/index.m3u8",
        is_protected: record.is_drm,
        job_transcode_id: record.job_id,
        thumbnail: record.image1
      }
      setVisible(true)
    }
  }

  const onFilter = (data) => {
    __pagination.current.page_num = 1
    __pagination.current = { ...__pagination.current, ...data }
    fetch()
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý VOD từ dms" />

      <div className="flex justify-end __content mb-4 rounded gap-4">
        <Link to="/settings">
          <Button type="primary">DRM</Button>
        </Link>
        <Filter filter={__pagination.current} onFilter={onFilter} />
      </div>
      <div className="col-span-2 __content">
        <Table columns={columns({ onAction: actionData })} dataSource={rows} loading={loading} />
        <Pagination onChange={changePage} {...__pagination.current} />
      </div>

      <ModalPreviewVideo
        visible={visible}
        item={itemLink.current}
        onClose={() => setVisible(false)}
      />
    </section>
  )
}
