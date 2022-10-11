import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TitlePage } from "components/ui"
import { apiEventTV, apiScreenblockOnTV } from "api"
import { Button, List, notification } from "antd"
import { DeleteOutlined, SendOutlined } from "@ant-design/icons"
import FillterVod from "components/FillterVod"
import FillterEvent from "components/FillterEvent"

export default function MenuBlocks() {
  const { block_id } = useParams()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [block, setBlock] = useState()

  async function fetchScreenBlock() {
    let __rows = []
    try {
      setLoading(true)
      const data = await apiScreenblockOnTV.getListBlocks(block_id)
      __rows = data
    } catch (e) {
      throw e
    } finally {
      setBlock(__rows)
      setItems(__rows?.is_live ? __rows?.events : __rows.videos)
      setLoading(false)
    }
  }

  function onChangeItems(value) {
    const _index = items.findIndex((i) => i.id === value.id)
    const __list = [...items]
    if (_index > -1) {
      __list.splice(_index, 1)
    } else {
      __list.unshift(value)
    }
    setItems(__list)
  }
  async function onFinish() {
    let data = {
      events: block?.is_live
        ? items?.map((item) => {
            return item?.id
          })
        : undefined,
      videos: block?.is_live
        ? undefined
        : items?.map((item) => {
            return item?.id
          }),
      screenblock: Number(block_id)
    }
    try {
      if (block?.is_live) {
        await apiEventTV.updateContentEvent(data)
      } else {
        await apiEventTV.updateContentVod(data)
      }
      notification.success({ description: "Update thành công!", message: "Thông báo" })
      fetchScreenBlock()
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchScreenBlock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block_id])
  return (
    <section className="wapper_small">
      <div className="mb-6">
        <TitlePage
          isBack={true}
          title={
            <div>
              Quản lý nội dung trong khối sự kiện :{" "}
              <span className="text-primary">{block?.name}</span>
            </div>
          }
        />
      </div>
      <div className="lg:grid grid-cols-5 gap-4 mb-4">
        <div className="col-span-2 __content mb-4 lg:mb-0">
          <div className="font-semibold mb-4">Thêm xóa nội dung trong khối</div>
          {block?.is_live ? (
            <FillterEvent block={block} onChangeItems={onChangeItems} items={items} />
          ) : (
            <FillterVod block={block} onChangeItems={onChangeItems} items={items} />
          )}
        </div>

        <div className="col-span-3 __content mb-4 lg:mb-0">
          <Blocks items={items} onChangeItems={onChangeItems} />
        </div>
      </div>
      <div className="flex justify-end __content">
        <Button type="primary" loading={loading} icon={<SendOutlined />} onClick={onFinish}>
          Xác nhận
        </Button>
      </div>
    </section>
  )
}
const Blocks = ({ onSortEnd, items, onChangeItems }) => {
  return (
    <List
      dataSource={items}
      onChangeItems={onChangeItems}
      inlineIndent={0}
      renderItem={(item, index) => {
        return (
          <div className="mb-2">
            <div className="shadow px-4 py-1 border border-gray-300 rounded cursor-pointer relative w-full">
              {index + 1}. {item.name}
              <div className="absolute right-1 top-1/2 -translate-y-1/2">
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => onChangeItems({ id: item.id, name: item.name })}
                />
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}
