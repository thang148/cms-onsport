import { useState, useEffect, forwardRef, useRef } from "react"
import { apiLeagues } from "api"
import { Select } from "antd"
const { Option } = Select

const Component = forwardRef(({ onChange, value }, ref) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const __isMonter = useRef(true)

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      const { data } = await apiLeagues.gets({ page_size: 200 })
      _rows = data
    } catch (e) {
      console.log(e)
    } finally {
      if (__isMonter.current) {
        setRows(_rows)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (__isMonter.current) fetch()
    return () => (__isMonter.current = false)
  }, [])

  return (
    <Select
      showSearch
      loading={loading}
      ref={ref}
      style={{ width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Giải đấu..."
      allowClear
      value={value}
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {rows.length > 0 &&
        rows.map(({ id, name }) => {
          return (
            <Option key={id} value={id}>
              {name}
            </Option>
          )
        })}
    </Select>
  )
})

export default Component
