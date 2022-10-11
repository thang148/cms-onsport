import React, { useRef } from "react"
import { Select, Input } from "antd"

const { Option } = Select

export default function Filter({ onFilter, filter }) {
  const __filter = useRef({})
  const __timeOut = useRef()
  const listStatus = [
    { name: "Hoạt động", value: "true" },
    { name: "Tạm dừng", value: "false" }
  ]
  function onChangeFilter(key, value) {
    __filter.current[key] = value
    if (__timeOut.current) {
      clearTimeout(__timeOut.current)
    }
    __timeOut.current = setTimeout(() => {
      onFilter(__filter.current)
    }, 500)
  }
  const { name } = filter
  return (
    <div className="flex justify-start space-x-4 ">
      <div className="grid grid-cols-12 xl:grid-cols-10 gap-4">
        <div className="col-span-4 xl:col-span-2">
          <Input
            defaultValue={name}
            className="w-200"
            placeholder="Tên Event Mini Game..."
            onChange={(e) => onChangeFilter("name", e.target.value)}
          />
        </div>
        <div className="col-span-4 xl:col-span-2">
          <Select
            onChange={(v) => onChangeFilter("is_active", v)}
            name="status"
            allowClear
            placeholder="Tất cả trạng thái"
            className="w-full"
          >
            {listStatus.map(({ name, value }) => {
              return (
                <Option key={value} value={value}>
                  {name}
                </Option>
              )
            })}
          </Select>
        </div>
      </div>
    </div>
  )
}
