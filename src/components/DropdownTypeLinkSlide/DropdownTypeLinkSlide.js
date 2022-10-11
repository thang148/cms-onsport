import { forwardRef } from "react"
import { typeLinks } from "lib/Const"
import { Select } from "antd"

const DropdownLiveType = forwardRef(({ onChange, value }, ref) => {
  return (
    <Select
      options={typeLinks}
      value={value}
      ref={ref}
      placeholder="Chọn loại link"
      onChange={onChange}
    />
  )
})

export default DropdownLiveType
