import React, { useState } from "react"
import Icon from "@ant-design/icons"
import MyHeader from "../Header/Header"
import Navbar from "./Navbar"
import "./index.css"
import { useStore } from "components/ui"

function convertMenus(menus) {
  return menus.map((i) => {
    const IconX = () => <span dangerouslySetInnerHTML={{ __html: i.icon }} />
    let __children = []
    const newChildren = i.sub_menu

    if (newChildren?.length > 0) {
      for (let index = 0; index < newChildren?.length; index++) {
        // if (newChildren[index].is_active) {
        const IconY = () => <span dangerouslySetInnerHTML={{ __html: newChildren[index].icon }} />
        const item = {
          href: i.url + newChildren[index].url,
          label: newChildren[index].title,
          icon: <Icon component={IconY} />
        }
        __children.push(item)
      }
      // }
    }

    return {
      href: i.url,
      label: i.title,
      icon: <Icon component={IconX} />,
      children: __children
    }
  })
}

function MyLayout({ children }) {
  const { menus, user } = useStore()
  // const { menus, user } = useStore()
  const isShow = localStorage.getItem("isShow")
  const [isNav, setIsNav] = useState(isShow === "false" ? false : true)

  function togleSidebar() {
    localStorage.setItem("isShow", !isNav)
    setIsNav((c) => !c)
  }
  return (
    <div className="flex min-h-screen">
      <Navbar items={convertMenus(menus)} isNav={isNav} />
      <section className="flex-grow w-0 bg_layout_content">
        <header className="flex justify-between bg-slate-900 py-2 pr-6 pl-4 h-14 w-full sticky top-0 z-[1]">
          <button onClick={togleSidebar} className="text-slate-200 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <MyHeader user={user} />
        </header>
        <div className="p-6">{children}</div>
      </section>
    </div>
  )
}
export default MyLayout
