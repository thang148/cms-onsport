import React, { useRef } from "react"
import { DatePicker, Select, Button } from "antd"
import { selectedDate } from "lib/function"
import moment from "moment-timezone"

const Filter = ({ onFilter, filter }) => {
  const __filter = useRef({})
  // const __timeOut = useRef()

  function onChangeFilter(key, value) {
    if (key === "date") {
      __filter.current.from_date = value[0] || undefined
      __filter.current.to_date = value[1] || undefined
    } else if (key === "sort") {
      switch (value) {
        case 0:
          __filter.current.order_by = null
          __filter.current.order = null
          break
        case 1:
          __filter.current.order_by = SORT_NAME.total_price
          __filter.current.order = SORT_TYPE.desc
          break
        case 2:
          __filter.current.order_by = SORT_NAME.total_price
          __filter.current.order = SORT_TYPE.asc
          break
        case 3:
          __filter.current.order_by = SORT_NAME.total_point
          __filter.current.order = SORT_TYPE.desc
          break
        case 4:
          __filter.current.order_by = SORT_NAME.total_point
          __filter.current.order = SORT_TYPE.asc
          break
        default:
        // code block
      }
    } else {
      __filter.current[key] = value
    }
    // if (__timeOut.current) {
    //   clearTimeout(__timeOut.current)
    // }
    // __timeOut.current = setTimeout(() => {
    //   onFilter(__filter.current)
    // }, 200)
  }

  function onSubmit() {
    onFilter(__filter.current)
  }
  const { from, to } = filter

  return (
    <div className="mb-4 grid grid-cols-11 gap-4 xx box_filter">
      <div className="col-span-3">
        <p className="m-1 title_filter">Sắp xếp</p>
        <Select
          className="w-full"
          placeholder="Mới nhất"
          defaultValue={listSortMerchant[0].value}
          onChange={(v) => onChangeFilter("sort", v)}
        >
          {listSortMerchant.map(({ name, value }) => {
            return (
              <Select.Option value={value} key={value}>
                {name}
              </Select.Option>
            )
          })}
        </Select>
      </div>
      <div className="col-span-2">
        <p className="m-1 title_filter">Trạng thái</p>
        <Select
          placeholder="Tất cả"
          defaultValue={listStatus[0].value}
          onChange={(v) => onChangeFilter("status", v)}
          className="w-full"
        >
          {listStatus.map(({ name, value }) => {
            return (
              <Select.Option value={value} key={value}>
                {name}
              </Select.Option>
            )
          })}
        </Select>
      </div>
      <div className="col-span-3">
        <p className="m-1 title_filter">Thời gian</p>
        <DatePicker.RangePicker
          ranges={selectedDate()}
          defaultValue={filter.from ? [moment(from), moment(to)] : undefined}
          className="w-full"
          onChange={(value, dateString) => onChangeFilter("date", dateString)}
        />
      </div>
      <div className="col-span-2 flex items-end">
        <Button type="primary" className="w-full" onClick={onSubmit}>
          Lọc kết quả
        </Button>
      </div>
    </div>
  )
}

export default Filter

const SORT_NAME = {
  total: "total",
  total_point: "total_point",
  total_price: "total_price",
  total_revenue: "total_revenue"
}
const SORT_TYPE = {
  asc: "asc",
  desc: "desc"
}

const listSortMerchant = [
  {
    name: "Mới nhất",
    value: 0
  },
  {
    name: "Doanh thu lớn nhất",
    value: 1
  },
  {
    name: "Doanh thu nhỏ nhất",
    value: 2
  },
  {
    name: "Điểm lớn nhất",
    value: 3
  },
  {
    name: "Điểm nhỏ nhất",
    value: 4
  }
]

export const STATUSES = {
  PROCESSING: "PROCESSING",
  WAITING: "WAITING",
  SHIPPING: "SHIPPING",
  SUCCESSED: "SUCCESSED",
  FAILED: "FAILED",
  REJECTED: "REJECTED"
}
export const listStatus = [
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
