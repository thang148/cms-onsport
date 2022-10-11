import React, { useState, useEffect } from "react"
import { Button, Dropdown, Menu, Card } from "antd"
import { useNavigate } from "react-router-dom"
import { Table } from "components/ui"
import { apiPermissionTV } from "api"

const columns = (actionData) => {
  return [
    { key: "name", dataIndex: "name", title: "Tên Group", width: 300 },
    {
      key: "action",
      title: "Hành động",
      render: (record) => {
        return (
          <div>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={() => actionData(record)}>
                    Xem chi tiết
                  </Menu.Item>
                </Menu>
              }
            >
              <Button>Tùy chọn</Button>
            </Dropdown>
          </div>
        )
      }
    }
  ]
}

export default function CheckboxList() {
  const navigate = useNavigate()
  const [listData, setListData] = useState([])
  const [loading, setloading] = useState(false)

  const fetchGroups = async () => {
    let _newData = []

    setloading(true)
    try {
      const { data } = await apiPermissionTV.getGroups()
      _newData = data.filter((item) => item.name !== "Manager")
    } catch (e) {
      console.log(e)
    } finally {
      setListData(_newData)
      setloading(false)
    }
  }

  const actionData = (record) => [navigate(`/staff/groups/${record.id}/${record.name}`)]

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <section>
      <Card className="p-4">
        {/* <div className="flex justify-end mb-4">
          <Button onClick={() => actionData("new", null)} type="primary">
            Tạo mới
          </Button>
        </div> */}

        <Table columns={columns(actionData)} dataSource={listData} loading={loading} />

        {/* <Pagination onChange={changePage} {...__params.current} /> */}
      </Card>
    </section>
  )
}
