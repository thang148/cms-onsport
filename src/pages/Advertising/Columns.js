import { Dropdown, Image, Menu, Popconfirm, Tag } from "antd"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"

export default function columns(onAction) {
  return [
    {
      title: "Ảnh & Link",
      dataIndex: "thumbnail",
      key: "thumbnail",
      minWidth: 250,
      render: (thumbnail, r) => (
        <div className="flex gap-2">
          <Image
            src={r?.value?.thumbnail}
            height={120}
            className="rounded-sm __img_ant"
            alt="avatar"
          />
          <div>
            <div className="text-sm">{r?.value?.link}</div>
          </div>
        </div>
      )
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      width: 120
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
            // trigger={["click"]}
            overlay={
              <Menu className="bottom-5">
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
