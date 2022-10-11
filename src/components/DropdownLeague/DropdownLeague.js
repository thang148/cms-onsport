import { useState, useEffect, forwardRef, useRef } from "react"
import { apiLeagues } from "api"
import { Select } from "antd"
const { Option } = Select

const DropdownLeague = forwardRef(({ onChangeLeague, onChange, value }, ref) => {
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

  function onChangeData(v) {
    const item = rows.find((i) => i.id === v) || {}
    onChangeLeague({
      league_id: item?.league_sync_id,
      current_season: item?.current_season,
      league_logo_custom: item?.logo
    })
    onChange(v)
  }

  useEffect(() => {
    if (rows.length > 0 && value) {
      onChangeData(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, value])

  useEffect(() => {
    __isMonter.current = true
    fetch()
    return () => {
      __isMonter.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      onChange={onChangeData}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {rows.length > 0 &&
        rows.map(({ id, name, is_active }) => {
          return (
            <Option key={id} value={id} disabled={!is_active}>
              {name}
            </Option>
          )
        })}
    </Select>
  )
})

export default DropdownLeague
