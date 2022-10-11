// sort keo tha su kien
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TitlePage } from "components/ui"
import { apiEventTV, apiScreenblockOnTV } from "api"
import { Button, notification } from "antd"
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

  // const fetch = async () => {
  //   setLoading(true)
  //   let _item
  //   try {
  //     if (block?.is_live) {
  //       const { data } = await apiEventTV.getListContentBlock(__pagination.current)
  //       _item = data.map((item) => {
  //         return item?.event
  //       })
  //     } else {
  //       const { data } = await apiEventTV.getListContentVod(__pagination.current)
  //       _item = data.map((item) => {
  //         return item?.video
  //       })
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   } finally {
  //     setItems(_item)
  //     setLoading(false)
  //   }
  // }

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

  function onSortEnd({ oldIndex, newIndex }) {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex))
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
      {/* <div className="mb-4 __content gap-4">
        <div className="text font-semibold">
          <div className="grid grid-cols-3 gap-2 max-w-[600px]">
            <div className="col-span-1">Loại hiển thị:</div>
            <div className="col-span-2">{"doipham2"}</div>

            <div className="col-span-1">Độ tuổi:</div>
            <div className="col-span-2">{block?.name}</div>

            <div className="col-span-1"> Thể loại:</div>
            <div className="col-span-2">
              {block?.map(({ id, name }) => (
                <Tag key={id} color="blue">
                  {name}
                </Tag>
              ))}
              "tag : doipham 3"
            </div>

            <div className="col-span-1">Icon:</div>
            <div className="col-span-2">
              <Avatar size={46} shape="square" />
            </div>
          </div>
        </div>
      </div> */}
      <div className="lg:grid grid-cols-5 gap-4 mb-4">
        <div className="col-span-2 __content mb-4 lg:mb-0">
          <div className="font-semibold mb-4">Thêm xóa nội dung trong khối</div>
          {block?.is_live ? (
            <FillterEvent
              // contentAge={configAges.find((i) => i.value === config_age?.id)?.key}
              // contentTopics={topic_ids?.map((i) => i.id)}
              block={block}
              onChangeItems={onChangeItems}
              items={items}
            />
          ) : (
            <FillterVod
              block={block}
              // contentType={config_type?.key}
              // contentAge={config_age?.key}
              // contentTopics={topic_ids?.map((i) => i.id)}
              onChangeItems={onChangeItems}
              items={items}
            />
          )}
        </div>

        <div className="col-span-3 __content mb-4 lg:mb-0">
          <div className="font-semibold mb-4">Kéo thả để thay đổi vị trí</div>
          <Blocks items={items} onSortEnd={onSortEnd} onChangeItems={onChangeItems} />
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

const SortableItem = SortableElement(({ value, indexV, onChangeItems, id }) => {
  return (
    <li className="shadow px-4 py-2 border border-gray-300 rounded cursor-pointer relative">
      {indexV}. {value}
      <div className="absolute right-1 top-1/2 -translate-y-1/2">
        {/* {event ? (
            <span>
              {event?.is_active ? (
                <Tag color={"green"}>Active</Tag>
              ) : (
                <Tag color={"red"}>Deactive</Tag>
              )}
            </span>
          ) : (
            <span>
              {video?.is_active ? (
                <Tag color={"green"}>Active</Tag>
              ) : (
                <Tag color={"red"}>Deactive</Tag>
              )}
            </span>
          )} */}
        {/* <TagType type={CONSTANT.CONFIG_AGE} name={config_age?.name} /> */}
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={() => onChangeItems({ id, name: value })}
        />
      </div>
    </li>
  )
})

const SortableList = SortableContainer(({ items, onChangeItems }) => {
  return (
    <ul className="space-y-2">
      {items?.length > 0 &&
        items?.map(({ id, name }, index) => {
          return (
            <SortableItem
              key={`item-${id}`}
              indexV={index + 1}
              index={index}
              value={name}
              id={id}
              onChangeItems={onChangeItems}
            />
          )
        })}
    </ul>
  )
})

const Blocks = ({ onSortEnd, items, onChangeItems }) => {
  return <SortableList onSortEnd={onSortEnd} items={items} onChangeItems={onChangeItems} />
}
