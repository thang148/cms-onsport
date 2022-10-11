import React, { useState, useEffect } from "react"
import { message, Tabs } from "antd"
import { TitlePage, Table } from "components/ui"
import { apiChat } from "api"
import columns from "./Columns"
import Filter from "./Filter"
import "./index.scss"

const { TabPane } = Tabs

const Component = () => {
  const [loading, setLoading] = useState(false)
  const dfEventID = localStorage.getItem("event_id")
  const [rows, setRows] = useState([])

  async function fetch() {
    try {
      setLoading(true)
      const { data } = await apiChat.getHistoryChat(dfEventID)
      data.reverse()
      setRows(data)
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }
  async function actionData(k, v) {
    if (k === "banchat") {
      let data = {
        user_id: v?.user_id,
        exp: 1
      }
      await apiChat.banChat(data)
      message.success("Chặn chat thành công !")
    }
    if (k === "unban") {
      await apiChat.unbanChat(v?.user_id)
      message.success("Mở chat thành công !")
    }
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý Chat" />
      <div className="test bg-white p-4">
        <Tabs>
          <TabPane tab="Chat trong sự kiện" key="chatEvent">
            <Table dataSource={rows} loading={loading} columns={columns(actionData)} />
          </TabPane>
          <TabPane tab="Chat All" key="chatAll">
            <Filter />
          </TabPane>
        </Tabs>
      </div>
    </section>
  )
}

export default Component
