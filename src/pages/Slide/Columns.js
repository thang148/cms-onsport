import { Dropdown, Menu, Popconfirm, Tag } from "antd"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { MenuOutlined } from "@ant-design/icons"
import { sortableHandle } from "react-sortable-hoc"
import { typeLinks } from "lib/Const"
import { convertLinkImg } from "lib/function"

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: "grab", color: "#999" }} />)

export default function columns(onAction) {
  return [
    {
      title: "Sort",
      dataIndex: "sort",
      align: "center",
      width: 70,
      className: "drag-visible",
      render: () => (
        <span className="text-xl">
          <DragHandle />
        </span>
      )
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      minWidth: 280,
      render: (avatar, r) => (
        <div className="flex space-x-2">
          <img src={convertLinkImg(avatar)} className="h-[63px] w-28 rounded-sm" alt="avatar" />
          <div className="text-sm">{r?.name}</div>
        </div>
      )
    },
    {
      title: "Type Link",
      dataIndex: "type_link",
      width: 340,
      render: (v, r) => (
        <div>
          <Tag color={convertTag(v)}>{typeLinks[Number(v)].label}</Tag> {r?.order_number}
          <div>
            <a target="__blank" href={convertHrefLink(r)}>
              {convertName(r)}
            </a>
          </div>
        </div>
      )
    },
    {
      title: "Hiển thị",
      key: "is_visible",
      dataIndex: "is_visible",
      width: 90,
      align: "center",
      render: (is_visible) => {
        return (
          <Tag className="rounded-xl" color={is_visible ? "blue" : "red"}>
            {is_visible ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      fixed: "right",
      key: "id",
      width: 80,
      align: "center",
      render: (v, r) => (
        <div className="article-action">
          <Dropdown
            // trigger={["click"]}
            overlay={
              <Menu className="bottom-3">
                <Menu.Item key="1" type="link" onClick={() => onAction("edit", r)}>
                  <EditOutlined /> Chỉnh sửa
                </Menu.Item>
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa?"
                  onConfirm={() => onAction("delete", v)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Menu.Item key="2" type="link">
                    <span className="text-red-500">
                      <DeleteOutlined /> Xóa
                    </span>
                  </Menu.Item>
                </Popconfirm>
              </Menu>
            }
          >
            {/* <Button type="text" size="small" icon={<AppstoreAddOutlined />} /> */}
            <div className="text-blue-800 cursor-pointer flex justify-center items-center h-14">
              <AppstoreAddOutlined className="text-xl" />
            </div>
          </Dropdown>
        </div>
      )
    }
  ]
}

function convertTag(type_link) {
  if (type_link === 1) return "red"
  if (type_link === 2) return "blue"
  return undefined
}

function convertName(item) {
  const { type_link, video, event, link } = item
  if (type_link === 1) return event?.name
  if (type_link === 2) return video?.name
  return link
}

function convertHrefLink(item) {
  const { type_link, video, event, link } = item
  if (type_link === 1) return `event?name=${event?.name}`
  if (type_link === 2) return `video?name=${video?.name}`
  return link
}
