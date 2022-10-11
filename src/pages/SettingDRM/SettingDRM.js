import React, { useState, useEffect, useRef } from "react"
import { Alert, Switch } from "antd"
import { TitlePage } from "components/ui"
import { apiAdvertising } from "api"

const Component = () => {
  const [setting, setSetting] = useState({})

  const __pagination = useRef({
    page_num: 1,
    page_size: 200
  })

  async function fetch() {
    let drm = {}
    try {
      const { data, count } = await apiAdvertising.getAds(__pagination.current)
      const item = data.find((i) => i.key === "drm_system")
      if (item) drm = item

      __pagination.current.count = count
    } catch (e) {
      throw e
    } finally {
      setSetting(drm)
    }
  }

  async function updateDRM(checked) {
    try {
      const dataBody = {
        ...setting,
        value: checked
      }
      await apiAdvertising.editAds(dataBody.id, dataBody)
      fetch()
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { value } = setting
  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý DRM" />

      <div className="__content">
        <div className="mb-2">
          <Alert type="warning" message="DRM trên toàn hệ thống."></Alert>
        </div>

        <Switch checked={value} onChange={updateDRM}>
          DRM
        </Switch>
      </div>
    </section>
  )
}

export default Component
