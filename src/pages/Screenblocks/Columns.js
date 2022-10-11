import { Dropdown, Popconfirm, Tag } from "antd"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined, MenuOutlined } from "@ant-design/icons"

import { sortableHandle } from "react-sortable-hoc"
import { Link } from "react-router-dom"
const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: "grab", color: "#999" }} />)

export default function columns(onAction) {
  return [
    {
      title: "Sort",
      dataIndex: "sort",
      align: "center",
      width: 60,
      className: "drag-visible",
      render: () => <DragHandle />
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      minWidth: 300,
      render: (v, r) => (
        <div>
          <span className="font-bold">{r?.order_number}.</span> {v}
        </div>
      )
    },
    {
      title: "Loại",
      dataIndex: "is_live",
      key: "is_live",
      width: 260,

      render: (v, r) => {
        return (
          <div>
            {v ? (
              <div>
                {r?.is_liveshow ? (
                  <Tag color="gold">Talkshow</Tag>
                ) : (
                  <Tag color="magenta">Live trận đấu</Tag>
                )}
              </div>
            ) : (
              <Tag color="cyan">VOD</Tag>
            )}
          </div>
        )
      }
    },
    {
      title: "Hiển thị",
      dataIndex: "is_active",
      key: "is_active",
      width: 100,
      align: "center",
      render: (isActive) => {
        return <Tag color={isActive ? "blue" : "red"}>{isActive ? "Active" : "Inactive"}</Tag>
      }
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      width: 100,
      fixed: "right",
      align: "center",
      render: (v, r) => (
        <div className="article-action">
          <Dropdown
            overlay={
              <div className="shadow_antd w-40 relative bottom-5 space-y-2">
                <div onClick={() => onAction("edit", r)}>
                  <EditOutlined /> Chỉnh sửa
                </div>
                {/* <div>
                  <Link to={`/type-event/block/${r?.id}`}>
                    <span className="w-full flex items-center text-violet-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h8m-8 6h16"
                        />
                      </svg>
                      <span>Quản lý nội dung</span>
                    </span>
                  </Link>
                </div> */}
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa?"
                  onConfirm={() => onAction("delete", v)}
                  okText="Yes"
                  cancelText="No"
                >
                  <div key="3">
                    <span className="text-red-500">
                      <DeleteOutlined /> Xóa
                    </span>
                  </div>
                </Popconfirm>
              </div>
            }
          >
            {/* <Button type="text" size="small" icon={<AppstoreAddOutlined />} /> */}
            <div className="text-blue-800 cursor-pointer flex justify-center items-center h-6">
              <AppstoreAddOutlined className="text-xl" />
            </div>
          </Dropdown>
        </div>
      )
    }
  ]
}
