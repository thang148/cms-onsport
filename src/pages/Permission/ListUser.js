import React, { useState, useEffect, useRef } from "react"
import { Tag, Button, Card } from "antd"
import { Pagination, Table } from "components/ui"
import { apiPermissionTV } from "api"
import ModalCreate from "./ModalCreateUser"

const dfParams = {
  page_num: 1,
  page_size: 10,
  count: 10
}

const columns = (actionData) => {
  return [
    {
      key: "first_name",
      dataIndex: "first_name",
      title: "Họ",
      width: 150,
      fixed: "left"
    },
    { key: "last_name", dataIndex: "last_name", title: "Tên", width: 150 },
    { key: "email", dataIndex: "email", title: "Email", width: 230 },
    {
      key: "is_active",
      dataIndex: "is_active",
      title: "Trạng thái",
      width: 120,
      render: (isActive) => {
        return (
          <Tag className="rounded-xl" color={isActive ? "green" : "red"}>
            {isActive ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    {
      key: "action",
      width: 100,
      title: "Hành động",
      render: (record) => {
        return (
          <div>
            <Button type="link" onClick={() => actionData("edit", record)}>
              Edit
            </Button>
          </div>
        )
      }
    }
  ]
}

export default function ListUser() {
  const [rows, setRows] = useState([])
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [editdata, setEditData] = useState(null)

  const [loading, setLoading] = useState(false)
  const [visible, setvisible] = useState(false)
  const __params = useRef(dfParams)
  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      const { data, count } = await apiPermissionTV.getStaffs(__params.current)
      _rows = data
      __params.current.count = count
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }

  function changePage(page, limit) {
    __params.current.page_num = page
    __params.current.page_size = limit
    fetch()
  }

  const actionData = (type, data) => {
    if (type === "new") {
      setvisible(true)
    } else {
      setEditData(data)
      setVisibleEdit(true)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section>
      <Card className="p-4">
        <div className="flex justify-end mb-4">
          <Button onClick={() => actionData("new", null)} type="primary">
            Tạo mới
          </Button>
        </div>

        <Table columns={columns(actionData)} dataSource={rows} loading={loading} />

        <Pagination onChange={changePage} {...__params.current} />
      </Card>

      {visible && (
        <ModalCreate
          visible={visible}
          submitModal={() => {
            setvisible(false)
            fetch()
          }}
          closeModal={() => setvisible(false)}
        />
      )}
      {visibleEdit && (
        <ModalCreate
          visible={visibleEdit}
          valEdit={editdata}
          submitModal={() => {
            setVisibleEdit(false)
            fetch()
          }}
          closeModal={() => setVisibleEdit(false)}
        />
      )}
    </section>
  )
}
