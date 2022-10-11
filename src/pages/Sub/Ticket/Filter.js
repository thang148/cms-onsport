import { useRef } from "react"
import React from "react"
import { Input, Select } from "antd"

const { Option } = Select
const STATUS_USER = [
  { value: true, name: "Hoạt động" },
  { value: false, name: "Tạm dừng" }
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

  const { name, user_id, is_active } = filter
  return (
    <div className="flex justify-end space-x-4 mb-4">
      <Input
        defaultValue={user_id}
        className="w-200"
        placeholder="Tìm kiếm theo ID..."
        onChange={(e) => onChangeFilter("user_id", e.target.value)}
      />
      <Select
        placeholder="Chọn trạng thái"
        className="w-200"
        value={is_active}
        onChange={(v) => onChangeFilter("is_active", v)}
      >
        {STATUS_USER?.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.name}
          </Option>
        ))}
      </Select>
      {/* <Input
        defaultValue={name}
        className="w-200"
        placeholder="Tìm kiếm..."
        onChange={(e) => onChangeFilter("search", e.target.value)}
      /> */}
    </div>
  )
}
