import { forwardRef } from "react"
import { listType } from "lib/Const"
import { Select, Badge } from "antd"
const { Option } = Select

const DropdownPundits = forwardRef(({ onChange, value, disabled }, ref) => {
  return (
    <Select
      disabled={disabled}
      ref={ref}
      onChange={onChange}
      value={value}
      name="category"
      placeholder="Chọn Loại"
    >
      {listType.map(({ name, value, color }) => {
        return (
          <Option key={value} value={value}>
            <Badge color={color} text={name} />
          </Option>
        )
      })}
    </Select>
  )
})

export default DropdownPundits
