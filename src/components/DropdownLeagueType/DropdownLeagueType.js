import { forwardRef } from "react"
import { leaguesDefault } from "lib/Const"
import { Select } from "antd"
const { Option } = Select

const Component = forwardRef(({ onChange, value }, ref) => {
  return (
    <Select value={value} onChange={onChange} placeholder="Loại giải..." ref={ref}>
      {leaguesDefault.map(({ value, name }) => {
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
