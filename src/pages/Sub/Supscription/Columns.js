import { Dropdown, Menu, Tag, Tooltip } from "antd"
import { AppstoreAddOutlined, EditOutlined, SwapOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import moment from "moment-timezone"

export default function columns(onAction) {
  return [
    { key: "id", dataIndex: "id", title: "ID", width: 100, fixed: "left", align: "center" },
    {
      title: "Tên gói",
      dataIndex: "name",
      key: "name",
      minWidth: 250,
      fixed: "left",
      render: (name, r) => (
        <Tooltip title={name}>
          <div className="line-clamp-2">
            <Link style={{ color: "#1890FF" }} onClick={() => onAction(r, r?.id, "detailSub")}>
              {name}
            </Link>
          </div>
        </Tooltip>
      )
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Mô tả gói",
      width: 230,
      render: (v) => (
        <Tooltip title={v}>
          <div className="line-clamp-2">
            <div dangerouslySetInnerHTML={{ __html: v }}></div>
          </div>
        </Tooltip>
      )
    },
    {
      key: "level",
      dataIndex: "level",
      title: "Cấp độ",
      width: 140,
      render: (level, r) => (
        <div className="text-400">
          {level === 1 && (
            <div className="text-400">
              <span>{"Tất Cả"}</span>
            </div>
          )}
          {level === 2 && (
            <div className="text-400">
              <span>{"Môn Thể Thao"}</span>
            </div>
          )}
          {level === 3 && (
            <div className="text-400">
              <span>{"Giải Đấu"}</span>
            </div>
          )}
          {level === 4 && (
            <div className="text-400">
              <span>{"Mùa giải"}</span>
            </div>
          )}
          {level === 5 && (
            <div className="text-400">
              <span>{"Trận đấu"}</span>
            </div>
          )}
        </div>
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
      key: "disable",
      dataIndex: "disable",
      width: 100,
      align: "center",
      render: (disable, r) => {
        return <Tag color={disable ? "red" : "blue"}>{disable ? "Tạm dừng" : "Hoạt động"}</Tag>
      }
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 90,
      align: "center",
      render: (disable, r) => (
        <div className="article-action">
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => onAction(r, r?.id, "edit")}>
                  <EditOutlined /> Chỉnh sửa
                </Menu.Item>

                <Menu.Item key="6" onClick={() => onAction(r, !r?.disable, "swapStatus")}>
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
