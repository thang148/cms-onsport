import React, { useState, useRef } from "react"
import { Input, Card, Dropdown, Menu, message, Tag } from "antd"
import { apiChat } from "api"
import { Table } from "components/ui"
import { AppstoreAddOutlined, StopOutlined, CheckCircleOutlined } from "@ant-design/icons"

const columns = (actionData) => {
  return [
    {
      title: "Avatar",
      dataIndex: "avatar_thumb",
      key: "avatar_thumb",
      align: "center",
      width: 23,
      fixed: "left",
      render: (logo) => {
        return (
          <img
            className="w-full"
            src={logo ? logo : "./../../../../../AvatarDefault.png"}
            alt="avatar"
          />
        )
      }
    },
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
      width: 45,
      align: "center"
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      width: 120
    },
    {
      title: "Status",
      dataIndex: "is_ban",
      key: "is_ban",
      width: 120,
      render: (is_ban) => {
        return (
          <Tag className="rounded-xl" color={is_ban ? "red" : "blue"}>
            {is_ban ? "Ban" : "Active"}
          </Tag>
        )
      }
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 70,
      align: "center",
      render: (v, r) => (
        <div className="article-action">
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="6">
                  <span className="text-red-500" onClick={() => actionData("banchat", r)}>
                    <StopOutlined /> Ban Chat 24H
                  </span>
                </Menu.Item>
                <Menu.Item key="1" onClick={() => actionData("unban", r)}>
                  <CheckCircleOutlined /> UnBan Chat
                </Menu.Item>
              </Menu>
            }
          >
            <div className="text-blue-800 cursor-pointer">
              <AppstoreAddOutlined className="text-xl" />
            </div>
          </Dropdown>
        </div>
      )
    }
  ]
}

export default function Filter({ onFilter, filter }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [valueSearch, setvalueSearch] = useState("")
  const __time = useRef()
  async function onChangeSearch(key, value) {
    setLoading(true)
    setvalueSearch(value)
    let _rows = []
    try {
      const { data } = await apiChat.getListUser(value)
      _rows = data
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }
  function onChangeFilter(key, value) {
    if (__time.current) {
      clearTimeout(__time.current)
    }
    __time.current = setTimeout(() => {
      onChangeSearch(key, value)
    }, [400])
  }
  async function actionData(k, v) {
    if (k === "banchat") {
      let data = {
        user_id: v?.id,
        exp: 1
      }
      await apiChat.banChat(data)
      message.success("Chặn chat thành công !")
      onChangeSearch("name", valueSearch)
    }
    if (k === "unban") {
      await apiChat.unbanChat(v?.id)
      message.success("Mở chat thành công !")
      onChangeSearch("name", valueSearch)
    }
  }
  return (
    <section>
      <div className="flex justify-end space-x-4 mb-4">
        <Input
          className="w-200"
          allowClear
          placeholder="Tên người dùng"
          onChange={(e) => onChangeFilter("name", e.target.value)}
        />
      </div>
      <Card className="p-4">
        <Table columns={columns(actionData)} dataSource={rows} loading={loading} />
      </Card>
    </section>
  )
}
