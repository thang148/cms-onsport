import React, { useState, useEffect, useRef } from "react"
import { Button, notification, Dropdown, Menu, Tag } from "antd"
import { TitlePage } from "components/ui"
import { Table } from "components/ui"
import { apiOnposrtTag } from "api"
import ModalUpdateTag from "./ModalUpdateTag"
import ModalCreateTag from "./ModalCreateTag"
import NotificationDialog from "components/NotificationDialog"
import { Pagination } from "components/ui"

const dfParams = {
  page_num: 1,
  page_size: 10,
  count: 10
}
const columns = (handleAction) => {
  return [
    { key: "name", dataIndex: "name", title: "Tên Tag", minWidth: 300 },
    {
      key: "code",
      dataIndex: "code",
      title: "Mã Tag",
      width: 300,
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      key: "action",
      title: "Hành động",
      fixed: "right",
      width: 120,
      render: (record) => {
        return (
          <div>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={() => handleAction("edit", record)}>
                    Edit
                  </Menu.Item>
                  <Menu.Item key="2" onClick={() => handleAction("delete", record)}>
                    Remove
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

export default function Tags() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [dataAction, setDataAction] = useState([])

  const __params = useRef(dfParams)

  const handleAction = (type, record) => {
    if (type === "edit") {
      setVisibleEdit(true)
    } else {
      setVisibleDelete(true)
    }
    setDataAction(record)
  }

  const onDelete = async (item) => {
    setLoadingDelete(true)
    try {
      await apiOnposrtTag.deleteTags(item.id)
      setVisibleDelete(false)
      notification.success({
        message: "Xoá thành công!",
        duration: 2
      })

      fetchTags()
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingDelete(false)
    }
  }

  function changePage(page, limit) {
    __params.current.page_num = page
    __params.current.page_size = limit
    fetchTags()
  }

  const fetchTags = async () => {
    let _rows = []
    setLoading(true)

    try {
      const { data, count } = await apiOnposrtTag.getTags(__params.current)
      _rows = data
      __params.current.count = count
      setData(data)
    } catch (e) {
      console.log(e)
    } finally {
      setData(_rows)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Tag" />
      <div className="flex justify-end bg-white p-4 rounded gap-4 shadow border border-b-gray-300 mb-4">
        <Button type="primary" onClick={() => setVisibleCreate(true)}>
          Thêm mới
        </Button>
        <ModalCreateTag
          visible={visibleCreate}
          handleClose={() => setVisibleCreate(false)}
          submitData={(dataReturn) => {
            fetchTags()
          }}
        />
      </div>

      <div className="__content">
        {data.length > 0 && (
          <Table columns={columns(handleAction)} dataSource={data} loading={loading} />
        )}

        <Pagination onChange={changePage} {...__params.current} />
      </div>

      {visibleEdit && (
        <ModalUpdateTag
          visible={visibleEdit}
          itemData={dataAction}
          handleClose={() => setVisibleEdit(false)}
          submitData={(dataReturn) => {
            fetchTags()
          }}
        />
      )}
      {visibleDelete && (
        <NotificationDialog
          isVisible={visibleDelete}
          handleClose={() => setVisibleDelete(false)}
          handleSubmit={() => onDelete(dataAction)}
          titleHeader="Xoá Thông Tin"
          titleContent="Bạn có chắc chắn muốn xoá không?"
          loading={loadingDelete}
        />
      )}
    </section>
  )
}
