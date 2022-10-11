import { Dropdown, Menu, Tag, Tooltip } from "antd"
import { AppstoreAddOutlined, EditOutlined, SwapOutlined } from "@ant-design/icons"
import moment from "moment-timezone"

export default function columns(onAction) {
  return [
    // { key: "id", dataIndex: "id", title: "ID", width: 70, fixed: "left", align: "center" },
    {
      title: "Tên gói",
      dataIndex: "name",
      key: "name",
      minWidth: 300,
      fixed: "left",
      render: (name, r) => (
        <div className="flex space-x-2">
          <img src={r?.image_uri} className="h-14 rounded-sm" alt="image_uri" />
          <Tooltip title={name}>
            <div className="line-clamp-3">
              <div
                className="cursor-pointer"
                style={{ color: "#1890FF" }}
                onClick={() => onAction(r, r?.id, "detailSub")}
              >
                {name}
              </div>
            </div>
          </Tooltip>
        </div>
      )
    },
    { key: "subs_name", dataIndex: "subs_name", title: "Tên gói Sub", width: 160 },
    {
      key: "description",
      dataIndex: "description",
      title: "Mô tả gói",
      width: 200,
      render: (v) => (
        <Tooltip title={v}>
          <div className="line-clamp-2">{v}</div>
        </Tooltip>
      )
    },
    {
      key: "created_at",
      dataIndex: "created_at",
      title: "Ngày tạo",
      width: 140,
      render: (created_at) => (
        <span className="text-gray-400">{moment(created_at).format("DD-MM-Y HH:mm")}</span>
      )
    },
    {
      title: "Trạng thái",
      key: "is_active",
      dataIndex: "is_active",
      width: 100,
      align: "center",
      render: (is_active, r) => {
        return <Tag color={is_active ? "blue" : "red"}>{is_active ? "Hoạt động" : "Tạm dừng"}</Tag>
      }
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 90,
      align: "center",
      render: (is_active, r) => (
        <div className="article-action">
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => onAction(r, r?.id, "edit")}>
                  <EditOutlined /> Chỉnh sửa
                </Menu.Item>

                <Menu.Item key="6" onClick={() => onAction(r?.id, !r?.is_active, "swapStatus")}>
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
