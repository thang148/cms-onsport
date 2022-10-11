import { Dropdown, Menu, Tag } from "antd"
import { AppstoreAddOutlined, EditOutlined, StopOutlined, LockOutlined } from "@ant-design/icons"
import moment from "moment-timezone"
export default function columns(onAction) {
  return [
    {
      title: "Tên Mini Game",
      dataIndex: "name",
      key: "name",
      width: 300,
      fixed: "left",
      render: (text, r) => (
        <div className="flex space-x-2">
          <div className="relative ">
            <img
              src={
                (r?.thumb).indexOf("https")
                  ? "https://onsportimg.vtvcab.vn/image-upload/" + r?.thumb
                  : r?.thumb
              }
              alt={""}
              className="__image"
            />
            {r?.is_protected && (
              <div className="__protected">
                <LockOutlined />
              </div>
            )}
          </div>
          <div>
            <div className="line-clamp-3">{text}</div>
          </div>
        </div>
      )
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created",
      key: "created",
      width: 120,
      render: (created) => <div className="text-400">{moment(created).format("HH:mm DD-MM-Y")}</div>
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "modified",
      key: "modified",
      width: 120,
      render: (modified) => (
        <div className="text-400">{moment(modified).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      width: 100,
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
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: 150
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category) => {
        return <div className="text-400">{category?.name}</div>
      }
    },
    {
      title: "Loại game",
      dataIndex: "game_type",
      key: "game_type",
      width: 150,
      render: (game_type) => {
        return <div className="text-400">{game_type?.name}</div>
      }
    },
    {
      title: "Thứ tự hiển thị",
      dataIndex: "sort_order",
      key: "sort_order",
      width: 80
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: "right",
      align: "center",
      render: (v, r) => (
        <div className="article-action">
          <Dropdown
            // trigger={["click"]}
            overlay={
              <Menu className="bottom-3">
                <Menu.Item key="1" type="link" onClick={() => onAction("edit", r)}>
                  <EditOutlined /> Chỉnh sửa
                </Menu.Item>

                <Menu.Item key="5" onClick={() => onAction("delete", r)}>
                  <span className="text-red-500">
                    <StopOutlined /> Xóa
                  </span>
                </Menu.Item>
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
