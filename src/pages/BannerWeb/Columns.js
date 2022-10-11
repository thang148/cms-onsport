import { Dropdown, Menu, Button, Popconfirm, Tooltip, Tag } from "antd"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { MenuOutlined } from "@ant-design/icons"
import { sortableHandle } from "react-sortable-hoc"

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: "grab", color: "#999" }} />)
const baseUrl = "https://onsportimg.vtvcab.vn/image-upload/"

function convertLink(base_url, id) {
  return base_url + "160x90/" + id
}

export default function columns(onAction) {
  return [
    {
      title: "Sort",
      dataIndex: "sort",
      align: "center",
      width: 60,
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
      width: 280,
      render: (thumbnail, r) => (
        <div className="flex space-x-2">
          <img src={convertLink(baseUrl, thumbnail)} className="h-14 rounded-sm" alt="avatar" />
          <div className="text-sm">{r?.title}</div>
        </div>
      )
    },
    {
      title: "Link click",
      dataIndex: "link",
      key: "link",
      width: 140,
      render: (link, r) => (
        <div>
          {!r.event && (
            <Tooltip title={link}>
              <div className="line-clamp-1" style={{ maxWidth: 140 }}>
                {link}
              </div>
            </Tooltip>
          )}
        </div>
      )
    },
    {
      title: "Sự kiện liên kết",
      dataIndex: "event",
      key: "event",
      width: 200,
      render: (item) => (
        <div>
          {item?.name && (
            <Tooltip title={item?.name}>
              <div className="line-clamp-1" style={{ maxWidth: 140 }}>
                <a href={item?.link}>{item?.name}</a>
              </div>
            </Tooltip>
          )}
        </div>
      )
    },
    {
      title: "Hiển thị",
      key: "is_active",
      dataIndex: "is_active",
      width: 90,
      align: "center",
      render: (is_active) => {
        return (
          <Tag className="rounded-xl" color={is_active ? "blue" : "red"}>
            {is_active ? "Active" : "Inactive"}
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
            trigger={["click"]}
            overlay={
              <Menu>
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
            <Button type="text" size="small" icon={<AppstoreAddOutlined />} />
          </Dropdown>
        </div>
      )
    }
  ]
}
