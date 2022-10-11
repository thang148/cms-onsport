import React, { useRef } from "react"
import { Select, Input } from "antd"

const { Option } = Select

const STATUS_USER = [
  { value: false, name: "Hoạt động" },
  { value: true, name: "Tạm dừng" }
]

const LEVEL = [
  { value: 1, name: "Tất cả" },
  { value: 2, name: "Môn thể thao" },
  { value: 3, name: "Giải đấu" }
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
  const { name, level, disable } = filter
  // const [filterVal, setFilterVal] = useState({
  //   status: null,
  //   type: null,
  //   created_from: null,
  //   created_to: null,
  //   created_by: null,
  //   categories: null,
  //   name: ""
  // })

  return (
    <div className="flex gap-2">
      <Input
        defaultValue={name}
        className="w-200"
        placeholder="Nhập tìm kiếm..."
        onChange={(e) => onChangeFilter("name", e.target.value)}
      />

      <Select
        placeholder="Chọn cấp độ"
        allowClear
        className="w-200"
        value={level ? Number(level) : undefined}
        onChange={(v) => onChangeFilter("level", v)}
      >
        {LEVEL?.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.name}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Chọn trạng thái"
        className="w-200"
        value={JSON.parse(disable)}
        onChange={(v) => onChangeFilter("disable", v)}
      >
        {STATUS_USER?.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  )
}
