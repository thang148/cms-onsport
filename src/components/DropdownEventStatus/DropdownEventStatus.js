import { forwardRef } from "react"
import { Select } from "antd"
import { listStatus } from "lib/Const"

const Component = forwardRef(({ onChange, value }, ref) => {
  return (
    <div className="w-200">
      <Select
        ref={ref}
        showSearch
        placeholder="Trạng thái"
        value={value}
        onChange={onChange}
        options={listStatus.map((i) => {
          return { label: i.name, value: i.value }
        })}
      />
    </div>
  )
})

export default Component
