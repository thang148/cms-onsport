import React, { useState, useRef } from "react"
import { Select, Input } from "antd"

import "./index.scss"
import moment from "moment-timezone"

const { Option } = Select

const STATUS_USER = [
  { value: "false", name: "Hoạt động" },
  { value: "true", name: "Tạm dừng" }
]

export default function Filter({ onFilter, filter }) {
  const __filter = useRef({})
  const __timeOut = useRef()

  function onChangeFilter(key, value) {
    __filter.current[key] = value
    if (__timeOut.current) {
      clearTimeout(__timeOut.current)
    }
    __timeOut.current = setTimeout(() => {
      onFilter(__filter.current)
    }, 500)
  }
  const { name, ids, status } = filter
  const [filterVal, setFilterVal] = useState({
    status: null,
    type: null,
    created_from: null,
    created_to: null,
    created_by: null,
    categories: null,
    search: ""
  })
  const onChangeData = (val, key) => {
    if (key === "date") {
      let from = null
      let to = null
      if (val) {
        from = moment(val[0]).format("YYYY-MM-DD")
        to = moment(val[1]).format("YYYY-MM-DD")
      }

      setFilterVal((state) => ({ ...state, created_from: from, created_to: to }))
    } else {
      setFilterVal((state) => ({ ...state, [key]: val }))
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        defaultValue={ids}
        className="w-200"
        placeholder="Tìm kiếm theo ID..."
        onChange={(e) => onChangeFilter("ids", e.target.value)}
      />

      <Input
        defaultValue={name}
        className="w-200"
        placeholder="Nhập tìm kiếm..."
        onChange={(e) => onChangeFilter("search", e.target.value)}
      />

      <Select
        placeholder="Chọn trạng thái"
        allowClear
        className="w-200"
        value={status}
        onChange={(v) => onChangeFilter("deactivated", v)}
      >
        {STATUS_USER.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  )
}
