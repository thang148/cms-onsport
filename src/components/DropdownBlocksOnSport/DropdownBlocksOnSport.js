import { useState, useEffect, forwardRef, memo, useRef } from "react"
import { apiScreenblockOnTV } from "api"
import { Select } from "antd"

const DropdownBlocksOnSport = forwardRef(
  ({ onChange, isLive, value, disabled, onChangeTypeEvent, isFilter }, ref) => {
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)
    const __isMonter = useRef(true)

    const fetch = async () => {
      setLoading(true)
      let _rows = []
      try {
        const { data } = await apiScreenblockOnTV.getFilters({ is_live: isLive })
        _rows = data
      } catch (e) {
        console.log(e)
      } finally {
        if (__isMonter.current) {
          setRows(
            _rows.map((i) => {
              return {
                value: i.id,
                label: i.name,
                disabled: !i.is_active && !isFilter,
                is_liveshow: i.is_liveshow ? 1 : 0
              }
            })
          )
          setLoading(false)
        }
      }
    }

    function onChangeData(id, o) {
      if (onChangeTypeEvent) onChangeTypeEvent(o?.is_liveshow ? true : false)
      onChange(id)
    }

    function filterOption(input, option) {
      return option.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    useEffect(() => {
      if (__isMonter.current) fetch()
      return () => (__isMonter.current = false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Select
        loading={loading}
        ref={ref}
        style={{ width: "100%" }}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Chọn khối ..."
        allowClear
        mode={isLive ? undefined : "multiple"}
        disabled={disabled}
        value={value ? value : undefined}
        showSearch={isLive ? true : false}
        options={rows}
        onChange={onChangeData}
        filterOption={isLive ? filterOption : false}
      />
    )
  }
)

export default memo(DropdownBlocksOnSport)
