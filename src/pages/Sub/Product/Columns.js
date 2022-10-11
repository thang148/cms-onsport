import { Dropdown, Menu, Tag } from "antd"
import moment from "moment-timezone"
import { AppstoreAddOutlined, EditOutlined, SwapOutlined } from "@ant-design/icons"
import { numberToCurrency } from "lib/function"

export default function columns(onAction) {
  return [
    { key: "id", dataIndex: "id", title: "ID", width: 60, fixed: "left", align: "center" },
    {
      title: "Tiêu đề",
      dataIndex: "name",
      fixed: "left",
      key: "name",
      minWidth: 200,
      render: (image_uri, r) => (
        <div className="flex space-x-2">
          <div className="text-sm">{r?.name}</div>
        </div>
      )
    },
    { key: "type", dataIndex: "type", title: "Type", width: 90 },
    // { key: "ios_sku", dataIndex: "ios_sku", title: "SKU_IOS", width: 130 },
    // { key: "android_sku", dataIndex: "android_sku", title: "SKU_ANDROID", width: 140 },
    { key: "period", dataIndex: "period", title: "Thời gian", width: 120 },
    {
      key: "gold_amount",
      dataIndex: "gold_amount",
      title: "Gold",
      width: 140,
      render: (v) => <span>{numberToCurrency(v) || 0} VND</span>
    },
    { key: "is_bonus", dataIndex: "gold_bonus_amount", title: "Bonus", width: 120 },
    {
      key: "price",
      dataIndex: "price",
      title: "Price",
      width: 120,
      render: (v) => <span>{numberToCurrency(v) || 0} VND</span>
    },
    { key: "contentpack", dataIndex: "contentpack", title: "Content pack", width: 120 },
    {
      key: "is_active",
      dataIndex: "is_active",
      title: "Trạng thái",
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
      key: "updated_at",
      dataIndex: "updated_at",
      title: "Ngày cập nhật ",
      width: 140,
      render: (updated_at) => (
        <div className="text-gray-400">{moment(updated_at).format("HH:mm DD-MM-Y")}</div>
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
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => onAction(r, r?.id, "edit")}>
                  <EditOutlined /> Chỉnh sửa
                </Menu.Item>
                <Menu.Item key="6" onClick={() => onAction(r, r?.id, "swapStatus")}>
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
