import { useState, useEffect, forwardRef } from "react"
import { apiCategorie } from "api"
import { TreeSelect } from "antd"
import { converDataTree, setCategories } from "lib/function"

const DropdownCategorieTree = forwardRef(({ onChange, value, isOne }, ref) => {
  // const categories = getCategories()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      let _rows = []
      try {
        const { data } = await apiCategorie.getCategoriesVisible()
        _rows = data
      } catch (e) {
        console.log(e)
      } finally {
        setRows(converDataTree(_rows, true))
        setLoading(false)
        setCategories(_rows)
      }
    }
    if (!rows.length) fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TreeSelect
      ref={ref}
      showSearch={false}
      multiple={!isOne}
      loading={loading}
      style={{ width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Thể thao 247..."
      allowClear
      treeData={rows}
      value={value}
      onChange={onChange}
    />
  )
})

export default DropdownCategorieTree
