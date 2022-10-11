import { forwardRef, memo } from "react"
import { TreeSelect } from "antd"

const DropdownCategories = forwardRef(({ onChange, value, categories }, ref) => {
  return (
    <TreeSelect
      ref={ref}
      showSearch={false}
      style={{ width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Thể thao 247..."
      allowClear
      treeData={categories}
      value={value}
      onChange={onChange}
    />
  )
})

const DropdownCategoriesMemo = memo(DropdownCategories)
export default DropdownCategoriesMemo
