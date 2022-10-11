import { forwardRef } from "react"
import { sportTypeDefault } from "lib/Const"
import { Select } from "antd"
const { Option } = Select

const Component = forwardRef(({ onChange, value }, ref) => {
  return (
    <Select value={value} onChange={onChange} placeholder="Môn thể thao..." ref={ref}>
      {sportTypeDefault.map(({ value, name }) => {
        return (
          <Option value={value} key={value}>
            {name}
          </Option>
        )
      })}
    </Select>
  )
})

export default Component
