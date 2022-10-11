import { Dropdown, Popconfirm, Menu, Tag } from "antd"
import moment from "moment-timezone"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"

export default function columns(onAction) {
  return [
    // { key: "id", dataIndex: "id", title: "ID", align: "center", width: 60, fixed: "left" },
    { key: "user_id", dataIndex: "user_id", title: "User ID", width: 90 },
    // {
    //   key: "created_at",
    //   dataIndex: "created_at",
    //   title: "Ngày tạo",
    //   width: 140,
    //   render: (created_at) => (
    //     <div className="text-gray-400">{moment(created_at).format("HH:mm DD-MM-Y")}</div>
    //   )
    // },
    {
      key: "subscription",
      dataIndex: "subscription",
      title: "Subscription",
      minWidth: 200,
      render: (subscription) => {
        return <div className="rounded-xl">{subscription?.name}</div>
      }
    },
    {
      key: "start_time",
      dataIndex: "start_time",
      title: "Ngày bắt đầu",
      width: 140,
      render: (start_time) => (
        <div className="text-gray-400">{moment(start_time).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      key: "expired_time",
      dataIndex: "expired_time",
      title: "Ngày hết hạn",
      width: 140,
      render: (expired_time) => (
        <div className="text-gray-400">{moment(expired_time).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      key: "updated_at",
      dataIndex: "updated_at",
      title: "Ngày cập nhật ",
      width: 140,
      render: (updated_at) => (
        <div className="text-gray-400">{moment(updated_at).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      key: "is_activate",
      dataIndex: "is_active",
      title: "Trạng thái",
      width: 100,
      align: "center",
      render: (isActive) => {
        return (
          <Tag className="rounded-xl" color={isActive ? "blue" : "red"}>
            {isActive ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    // {
    //   key: "subscription_id",
    //   dataIndex: "subscription_id",
    //   align: "center",
    //   title: "Subscription ID",
    //   width: 120
    // },

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
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => onAction("edit", r)}>
                  <EditOutlined /> Chỉnh sửa
                </Menu.Item>
                <Popconfirm
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
                </Popconfirm>
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
