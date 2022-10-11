import { Dropdown, Menu, Popconfirm, Tag } from "antd"
import {
  AppstoreAddOutlined,
  EditOutlined,
  DeleteOutlined,
  NotificationOutlined,
  SyncOutlined
} from "@ant-design/icons"
import moment from "moment-timezone"

export default function columns(onAction) {
  return [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      minWidth: 300,
      render: (image_uri, r) => (
        <div className="flex space-x-2">
          <img src={r?.image_uri} className="h-14 rounded-sm" alt="image_uri" />
          <div className="text-sm">{r?.title}</div>
        </div>
      )
    },
    {
      title: "Nội dung",
      dataIndex: "body",
      key: "body",
      width: 200
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: 140,
      render: (created_at) => (
        <div className="text-400">{moment(created_at).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "delivery_status",
      key: "delivery_status",
      width: 80,
      render: (delivery_status, r) => (
        <div className="text-400">
          {0 <= delivery_status && delivery_status <= 2 && (
            <div className="text-400">
              <Tag className="rounded-xl" color={"blue"}>
                {"Chưa gửi"}
              </Tag>
            </div>
          )}
          {delivery_status === 3 && (
            <div className="text-400">
              <Tag className="rounded-xl" color={"green"}>
                {"Đã gửi"}
              </Tag>
            </div>
          )}
          {4 <= delivery_status && delivery_status <= 5 && (
            <div className="text-400">
              <Tag className="rounded-xl" color={"red"}>
                {"Gửi lỗi"}
              </Tag>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Đặt lịch thông báo",
      dataIndex: "delivery_mode",
      key: "delivery_mode",
      width: 140,
      render: (delivery_mode, r) => {
        return (
          <div className="text-400">
            {delivery_mode === 1 ? (
              <>
                <div className="text-400">{moment(r?.scheduled_time).format("DD-MM-Y HH:mm")}</div>
              </>
            ) : (
              <div>N/A</div>
            )}
          </div>
        )
      }
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: "right",
      align: "center",
      render: (v, r) => {
        return (
          <div className="article-action">
            <Dropdown
              overlay={
                <Menu className="bottom-3">
                  {r?.delivery_status !== 3 && (
                    <Menu.Item key="1" type="link" onClick={() => onAction("edit", r)}>
                      <EditOutlined /> Chỉnh sửa
                    </Menu.Item>
                  )}
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
                  {0 <= r.delivery_status && r.delivery_status <= 2 && (
                    <Menu.Item key="3" type="link" onClick={() => onAction("push", v)}>
                      <span className="text-blue-500">
                        <NotificationOutlined /> Push
                      </span>
                    </Menu.Item>
                  )}
                  {r.delivery_status === 5 && (
                    <Menu.Item key="4" type="link" onClick={() => onAction("push", v)}>
                      <span className="text-blue-500">
                        <SyncOutlined /> Thử lại
                      </span>
                    </Menu.Item>
                  )}
                </Menu>
              }
            >
              <div className="text-blue-800 cursor-pointer flex justify-center items-center h-12">
                <AppstoreAddOutlined className="text-xl" />
              </div>
              {/* <Button type="text" size="small" icon={<AppstoreAddOutlined />} /> */}
            </Dropdown>
          </div>
        )
      }
    }
  ]
}
