import { Dropdown, Menu, Button, Tag } from "antd"
import {
  AppstoreAddOutlined,
  EditOutlined,
  StopOutlined,
  LockOutlined,
  FundViewOutlined
} from "@ant-design/icons"
import moment from "moment-timezone"
import { convertLinkImg } from "lib/function"

export default function columns(onAction) {
  return [
    {
      title: "Tên sự kiện",
      dataIndex: "name",
      key: "name",
      minWidth: 300,
      fixed: "left",
      render: (text, r) => (
        <div className="flex space-x-2">
          <div className="relative ">
            <img src={convertLinkImg(r?.image)} alt={""} className="__image" />
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
      width: 130,
      render: (created) => (
        <div className="text-gray-400">{moment(created).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "modified",
      key: "modified",
      width: 140,
      render: (modified) => (
        <div className="text-gray-400">{moment(modified).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
      width: 130,
      render: (start_time) => (
        <div className="text-gray-400">{moment(start_time * 1000).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      title: "Hiển thị",
      dataIndex: "is_active",
      key: "is_active",
      width: 80,
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "center",
      render: (status) => (
        <div>
          {status === 1 && <div className="text-400">Mở kèo</div>}
          {status === 2 && <div className="text-400">Hủy kèo</div>}
          {status === 3 && <div className="text-400">Cập nhật</div>}
          {status === 4 && <div className="text-400">Xác nhận 1/2</div>}
          {status === 5 && <div className="text-400">Xác nhận 2/2</div>}
          {status === 6 && <div className="text-400">Hoàn thành</div>}
          {status === 7 && <div className="text-400">Đang hủy kèo</div>}
        </div>
      )
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
            trigger={["click"]}
            overlay={
              <Menu>
                {r.is_active === false && (
                  <Menu.Item key="1" type="link" onClick={() => onAction("edit", r)}>
                    <EditOutlined /> Chỉnh sửa
                  </Menu.Item>
                )}
                {r.is_active === true && (
                  <Menu.Item key="1" type="link" onClick={() => onAction("view_detail", r)}>
                    <FundViewOutlined /> Xem chi tiết
                  </Menu.Item>
                )}
                <Menu.Item key="5" onClick={() => onAction("delete", r)}>
                  <span className="text-red-500">
                    <StopOutlined /> Xóa
                  </span>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="text" size="small" icon={<AppstoreAddOutlined />} />
          </Dropdown>
        </div>
      )
    }
  ]
}
