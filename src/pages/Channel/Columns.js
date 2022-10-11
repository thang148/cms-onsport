import { Tag, Dropdown, Menu } from "antd"
import moment from "moment-timezone"
import { AppstoreAddOutlined, EyeOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons"

export default function columns(onAction) {
  return [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 320,
      fixed: "left",
      render: (logo, r) => {
        return (
          <div className="flex space-x-2">
            <img
              style={{ height: 54, minWidth: 54 }}
              onClick={() => onAction("play", r)}
              className="border border-gray-900 h-16 rounded-sm cursor-pointer"
              src={logo}
              alt="avatar"
            />

            <div>{r?.name}</div>
          </div>
        )
      }
    },

    {
      title: "Content id",
      dataIndex: "content_id",
      key: "content_id",
      width: 160
    },
    {
      title: "Hiển thị",
      dataIndex: "is_active",
      key: "is_active",
      width: 90,
      align: "center",
      render: (isActive) => {
        return (
          <Tag className="rounded-xl" color={isActive ? "blue" : "red"}>
            {isActive ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    {
      title: "Hết hạn xem lại",
      dataIndex: "count_day_expire",
      key: "count_day_expire",
      width: 120,
      render: (count_day_expire) => <span>{count_day_expire} Ngày</span>
    },
    {
      title: "DRM",
      dataIndex: "is_protected",
      key: "is_protected",
      width: 90,
      align: "center",
      render: (is_protected) => {
        return (
          <Tag className="rounded-xl" color={is_protected ? "blue" : "red"}>
            {is_protected ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    {
      title: "Time shift",
      dataIndex: "is_timeshift",
      key: "is_timeshift",
      width: 90,
      align: "center",
      render: (is_timeshift) => {
        return (
          <Tag className="rounded-xl" color={is_timeshift ? "blue" : "red"}>
            {is_timeshift ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "created",
      key: "created",
      width: 140,
      render: (created) => (
        <div className="text-gray-400">{moment(created).format("HH:mm DD-MM-Y")}</div>
      )
    },

    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 80,
      align: "center",
      render: (v, r) => (
        <div className="article-action">
          <Dropdown
            // trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu className="bottom-3">
                <Menu.Item key="1" onClick={() => onAction("edit", r)}>
                  <EditOutlined /> Chỉnh sửa
                </Menu.Item>
                <Menu.Item key="5" onClick={() => onAction("view", r)}>
                  <EyeOutlined /> Xem
                </Menu.Item>
                {r?.is_active && (
                  <Menu.Item key="2" onClick={() => onAction("next", v)}>
                    <span className="text-blue-500">
                      <PlusOutlined /> Thêm sự kiện
                    </span>
                  </Menu.Item>
                )}
                {/* <Popconfirm
                  title="Bạn có chắc chắn muốn xóa?"
                  onConfirm={() => onAction("delete", v)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Menu.Item key="6" onClick={() => onAction("delete", v)}>
                    <span className="text-red-500">
                      <DeleteOutlined /> Xoá
                    </span>
                  </Menu.Item>
                </Popconfirm> */}
              </Menu>
            }
          >
            <div className="text-blue-800 cursor-pointer  flex justify-center items-center h-12">
              <AppstoreAddOutlined className="text-xl" />
            </div>
          </Dropdown>
        </div>
      )
    }
  ]
}
