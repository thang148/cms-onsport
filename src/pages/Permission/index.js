import React from "react"
import { Tabs } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import ListGroup from "./ListGroup"
import ListUser from "./ListUser"
import "./index.scss"

const { TabPane } = Tabs

export default function SimpleTabs({ tabs }) {
  const _tab = useParams().tab
  const navigate = useNavigate()

  function onChangeLink(link) {
    navigate(`/staff/${link}`)
  }

  return (
    <section className="wapper_small">
      <div className="test bg-white p-4">
        <Tabs defaultActiveKey={_tab ? _tab : "list"} size="large" onChange={onChangeLink}>
          {tabs.find((i) => i.url.includes("list")) && (
            <TabPane tab="Danh sách nhân viên" key="list">
              <ListUser />
            </TabPane>
          )}
          {tabs.find((i) => i.url.includes("groups")) && (
            <TabPane tab="Nhóm nhân viên" key="groups">
              <ListGroup />
            </TabPane>
          )}
        </Tabs>
      </div>
    </section>
  )
}
