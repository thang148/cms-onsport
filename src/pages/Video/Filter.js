import React, { useRef } from "react"
import { Input, Select } from "antd"
import DropdownEvents from "components/DropdownEvents"
import DropdownLeagueFilter from "components/DropdownLeagueFilter"
import DropdownBlocksOnSport from "components/DropdownBlocksOnSport"
const { Option } = Select
export default function Filter({ onFilter, filter }) {
  const __filter = useRef({})
  const __timeOut = useRef()

  function onChangeFilter(key, value) {
    if (key === "date") {
      __filter.current.from = value[0] || undefined
      __filter.current.to = value[1] || undefined
    } else {
      __filter.current[key] = value
    }

    if (__timeOut.current) {
      clearTimeout(__timeOut.current)
    }
    __timeOut.current = setTimeout(() => {
      onFilter(__filter.current)
    }, 500)
  }
  const { name, event_id, league_id } = filter
  return (
    <div className="flex justify-end">
      <div className="grid grid-cols-12 gap-4  w-full">
        <div className="col-span-3">
          <Input
            defaultValue={name}
            placeholder="Tên video..."
            onChange={(e) => onChangeFilter("name", e.target.value)}
          />
        </div>
        <div className="col-span-3">
          <DropdownEvents value={event_id} onChange={(v) => onChangeFilter("event_id", v)} />
        </div>
        <div className="col-span-3">
          <DropdownBlocksOnSport
            isLive={false}
            onChange={(v) =>
              onChangeFilter("screen_block_ids", v?.length ? v.toString() : undefined)
            }
          />
        </div>
        <div className="col-span-3">
          <DropdownLeagueFilter
            value={league_id}
            onChange={(v) => onChangeFilter("league_id", v)}
          />
        </div>
        <div className="col-span-3">
          <Select
            onChange={(v) => onChangeFilter("is_active", v)}
            name="is_active"
            allowClear
            placeholder="Tất cả trạng thái"
            className="w-full"
          >
            <Option value={true}>Hiển thị</Option>
            <Option value={false}>Ẩn</Option>
          </Select>
        </div>
      </div>
    </div>
  )
}
