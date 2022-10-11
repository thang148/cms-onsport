import { Dropdown, Menu } from "antd"
import { AppstoreAddOutlined, StopOutlined, CheckCircleOutlined } from "@ant-design/icons"
export default function columns(onAction) {
  return [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      width: 120,
      fixed: "left",
      render: (avatar) => {
        return (
          <img
            className="w-full"
            src={avatar ? avatar : "./../../../../../AvatarDefault.png"}
            alt="avatar"
          />
        )
      }
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      width: 130,
      align: "center"
    },
    {
      title: "Full Name",
      dataIndex: "user_name",
      key: "user_name",
      width: 170
    },
    {
      title: "Tin nhắn",
      dataIndex: "message",
      key: "message",
      minWidth: 300
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 120,
      align: "center",
      render: (v, r) => (
        <div className="article-action">
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="6" onClick={() => onAction("banchat", r)}>
                  <span className="text-red-500">
                    <StopOutlined /> Ban Chat 24H
                  </span>
                </Menu.Item>
                <Menu.Item key="1" onClick={() => onAction("unban", r)}>
                  <CheckCircleOutlined /> UnBan Chat
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
