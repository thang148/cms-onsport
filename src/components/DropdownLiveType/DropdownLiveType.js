import { forwardRef } from "react"
import { liveTypes } from "lib/Const"
import { Select } from "antd"
const { Option } = Select

const DropdownLiveType = forwardRef(({ onChange, value, disabled, isTalkshow }, ref) => {
  return (
    <Select
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="w-full"
      placeholder="Loại sự kiện..."
      ref={ref}
      allowClear
    >
      {liveTypes.map(({ value, name }) => {
        return (
          <Option value={value} key={value}>
            {name}
          </Option>
        )
      })}
    </Select>
  )
})

export default DropdownLiveType
