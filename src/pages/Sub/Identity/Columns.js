import moment from "moment-timezone"
import { Dropdown, Menu, Tag, Tooltip } from "antd"
import { AppstoreAddOutlined, SwapOutlined } from "@ant-design/icons"

export default function columns(onAction) {
  return [
    { key: "id", dataIndex: "id", title: "User ID", width: 120, fixed: "left", align: "center" },
    {
      key: "fullname",
      title: "Khách hàng",
      minWidth: 230,
      render: (val) => (
        <div>
          {val.fullname && (
            <Tooltip title={val.fullname}>
              <button onClick={() => onAction(val.id, null, "push_url")}>
                <div className="line-clamp-2" style={{ color: "#1890FF" }}>
                  {val.fullname}
                </div>
              </button>
            </Tooltip>
          )}
        </div>
      )
    },
    { key: "email", dataIndex: "email", title: "Email", width: 140 },
    { key: "phone", dataIndex: "phone", title: "Số điện thoại", width: 160 },
    {
      title: "Ngày tạo",
      key: "created_at",
      dataIndex: "created_at",
      width: 140,
      render: (created_at) => <span>{moment(created_at).format("DD-MM-Y HH:mm")}</span>
    },
    {
      title: "Trạng thái",
      key: "is_active",
      dataIndex: "deactivated",
      width: 120,
      align: "center",
      render: (deactivated, r) => {
        return (
          <Tag color={deactivated ? "red" : "blue"}>{deactivated ? "Tạm dừng" : "Hoạt động"}</Tag>
        )
      }
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 80,
      align: "center",
      render: (deactivated, r) => (
        <div className="article-action">
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => onAction(r?.id, !r?.deactivated, "switch")}>
                  <span className="text-blue-500">
                    <SwapOutlined /> Chuyển trạng thái
                  </span>
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
