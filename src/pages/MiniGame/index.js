import React, { useState } from "react"
import { Tabs } from "antd"

import ListMiniGame from "./MiniGame/ListMiniGame"
import ListCategory from "./Category/ListCategory"
import "./index.scss"
import { paramsUrl } from "lib/function"

const { TabPane } = Tabs

export default function SimpleTabs({ match, tab }) {
  const [tabs, setTabs] = useState("")
  const callbackTabClicked = (key, event) => {
    setTabs(key)
    paramsUrl.set({ ...paramsUrl.get(), tabs: key })
  }

  return (
    <section className="wapper_small">
      <div className="test bg-white p-4">
        <Tabs onTabClick={callbackTabClicked} defaultActiveKey={paramsUrl.get()?.tabs}>
          <TabPane tab="Danh sách Categories " key="category">
            <ListCategory tabs={tabs} />
          </TabPane>
          <TabPane tab="Danh sách Mini Game " key="list">
            <ListMiniGame tabs={tabs} />
          </TabPane>
        </Tabs>
      </div>
    </section>
  )
}
