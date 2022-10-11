import { useState, useEffect, forwardRef, memo, useRef } from "react"
import { apiChannel } from "api"
import { Select } from "antd"
import { LockOutlined } from "@ant-design/icons"
const { Option } = Select

const Component = forwardRef(({ onChange, value }, ref) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const isMonter = useRef(true)

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      const { data } = await apiChannel.gets({ page_size: 200 })
      _rows = data
    } catch (e) {
      console.log(e)
    } finally {
      if (isMonter.current) {
        setRows(_rows)
        setLoading(false)
      }
    }
  }
  useEffect(() => {
    fetch()
    return () => {
      isMonter.current = false
    }
  }, [])

  return (
    <Select
      ref={ref}
      showSearch
      loading={loading}
      style={{ width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Chọn kênh..."
      allowClear
      value={value}
      onChange={onChange}
      filterOption={(input, option) => {
        console.log(option)
        return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }}
    >
      {rows.length > 0 &&
        rows.map(({ id, name, is_active, is_protected }) => {
          return (
            <Option key={id} value={id} disabled={!is_active} name={name}>
              <div className="flex justify-between">
                <span>{name}</span>
                <span>{is_protected && <LockOutlined />}</span>
              </div>
            </Option>
          )
        })}
    </Select>
  )
})

export default memo(Component)
