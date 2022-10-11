import { Tooltip, Tag } from "antd"
import { numberToCurrency } from "lib/function"
import moment from "moment-timezone"
// import { STATUSES, listStatus } from "./Filter"

const STATUSES = {
  PROCESSING: "PROCESSING",
  WAITING: "WAITING",
  SHIPPING: "SHIPPING",
  SUCCESSED: "SUCCESSED",
  FAILED: "FAILED",
  REJECTED: "REJECTED"
}

const listStatus = [
  {
    name: "Tất cả",
    value: null
  },
  {
    name: "Đang xử lý",
    value: STATUSES.PROCESSING
  },
  {
    name: "Chờ xác nhận",
    value: STATUSES.WAITING
  },
  {
    name: "Đang giao",
    value: STATUSES.SHIPPING
  },
  {
    name: "Đã giao",
    value: STATUSES.SUCCESSED
  },
  {
    name: "Lỗi",
    value: STATUSES.FAILED
  },
  {
    name: "Từ chối",
    value: STATUSES.REJECTED
  }
]

export default function columns(action) {
  function render(status) {
    if (status === STATUSES.SUCCESSED) {
      return "green"
    } else if (
      status === STATUSES.PROCESSING ||
      status === STATUSES.WAITING ||
      status === STATUSES.SHIPPING
    ) {
      return "gold"
    } else if (status === STATUSES.REJECTED || status === STATUSES.FAILED) {
      return "red"
    } else {
      return "default"
    }
  }

  function renderName(status) {
    const _filter = listStatus.filter((item) => item.value === status)
    return _filter.length > 0 ? _filter[0].name : "No status available"
  }
  return [
    {
      key: "product_name",
      dataIndex: "product_name",
      title: "Tên sản phẩm",
      width: 200,
      render: (val) => {
        return (
          <Tooltip title={val} placement="bottom">
            <span className="line_clamp3">{val}</span>
          </Tooltip>
        )
      },
      fixed: "left"
    },
    {
      key: "agency_name",
      dataIndex: "agency_name",
      title: "Tên agency",
      width: 150
    },
    { key: "merchant_name", dataIndex: "merchant_name", title: "Tên merchant", width: 200 },
    { key: "sku", dataIndex: "sku", title: "SKU", width: 200 },
    {
      title: "Điểm",
      key: "total_point",
      dataIndex: "total_point",
      width: 120,
      render: (v) => <span>{numberToCurrency(v)}</span>
    },
    {
      title: "Tổng tiền",
      key: "total_revenue",
      dataIndex: "total_revenue",
      width: 120,
      render: (v) => <span>{numberToCurrency(v)}</span>
    },
    {
      title: "Thời gian",
      key: "created_at",
      dataIndex: "created_at",
      width: 200,
      render: (v) => <span>{moment(v).format("hh:mm:ss DD-MM-YYYY")}</span>
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: 150,
      render: (v) => {
        return (
          <Tag className="rounded-full" color={render(v.status)}>
            {renderName(v.status)}
          </Tag>
        )
      }
    }
    // {
    //   key: "action",
    //   width: 150,
    //   title: "Hành động",
    //   render: (record) => {
    //     return (
    //       <div>
    //         <Dropdown
    //           trigger={["click"]}
    //           overlay={
    //             <Menu>
    //               <Menu.Item key="1" onClick={() => action("edit", record)}>
    //                 Chỉnh sửa
    //               </Menu.Item>
    //             </Menu>
    //           }
    //         >
    //           <Button>Tùy chọn</Button>
    //         </Dropdown>
    //       </div>
    //     )
    //   }
    // }
  ]
}
