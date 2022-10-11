import { Dropdown, Menu, Popconfirm, Tag } from "antd"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"

import moment from "moment-timezone"

export default function columns(onAction) {
  return [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: 40
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 250
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: 100,
      render: (created_at) => (
        <div className="text-400">{moment(created_at).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "modified",
      key: "modified",
      width: 100,
      render: (modified) => (
        <div className="text-400">{moment(modified).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      title: "Thứ tự hiển thị",
      dataIndex: "sort_order",
      key: "sort_order",
      width: 80,
      align: "center"
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      width: 90,
      align: "center",
      render: (isActive) => {
        return <Tag color={isActive ? "blue" : "red"}>{isActive ? "Active" : "Inactive"}</Tag>
      }
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      width: 80,
      fixed: "right",
      align: "center",
      render: (v, r) => (
        <div className="article-action">
          <Dropdown
            // trigger={["click"]}
            overlay={
              <Menu className="bottom-2">
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
            <div className="text-blue-800 cursor-pointer flex justify-center items-center h-10">
              <AppstoreAddOutlined className="text-xl" />
            </div>
          </Dropdown>
        </div>
      )
    }
  ]
}
