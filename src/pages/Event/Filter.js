import React, { useRef } from "react"
import { DatePicker, Input, Select } from "antd"
import { listStatus } from "lib/Const"
import DropdownLeagueFilter from "components/DropdownLeagueFilter"
import DropdownLiveType from "components/DropdownLiveType"
import DropdownBlocksOnSport from "components/DropdownBlocksOnSport"
import DropdownChannel from "components/DropdownChannel"
import { nextDate } from "lib/dateTime"
import moment from "moment-timezone"
const { Option } = Select

export default function Filter({ onFilter, filter }) {
  const __filter = useRef({})
  const __timeOut = useRef()

  function onChangeFilter(key, value) {
    if (key === "date") {
      __filter.current.from_date = value[0] || undefined
      __filter.current.to_date = value[1] || undefined
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
  const { from_date, to_date, name, league_id, channel_id, type, screen_block_ids, status } = filter

  return (
    <div className="flex justify-end">
      <div className="grid grid-cols-12 xl:grid-cols-10 gap-2">
        <div className="col-span-4 xl:col-span-2">
          <Input
            defaultValue={name}
            placeholder="Tên sự kiện..."
            allowClear
            onChange={(e) => onChangeFilter("name", e.target.value)}
          />
        </div>
        <div className="col-span-4 xl:col-span-2">
          <Select
            onChange={(v) => onChangeFilter("status", v)}
            name="status"
            allowClear
            value={status}
            placeholder="Tất cả trạng thái"
            className="w-full"
          >
            {listStatus.map(({ name, value }) => {
              return (
                <Option key={value} value={value}>
                  {name}
                </Option>
              )
            })}
          </Select>
        </div>

        <div className="col-span-4 xl:col-span-2">
          <DropdownBlocksOnSport
            value={parseInt(screen_block_ids)}
            isFilter={true}
            isLive={true}
            onChange={(v) => onChangeFilter("screen_block_ids", v)}
          />
        </div>

        <div className="col-span-4 xl:col-span-2">
          <DropdownChannel value={channel_id} onChange={(v) => onChangeFilter("channel_id", v)} />
        </div>

        <div className="col-span-4 xl:col-span-2">
          <DropdownLeagueFilter
            value={league_id}
            onChange={(v) => onChangeFilter("league_id", v)}
          />
        </div>
        <div className="col-span-4 xl:col-span-2">
          <DatePicker.RangePicker
            ranges={nextDate()}
            value={from_date ? [moment(from_date), moment(to_date)] : undefined}
            className="w-full"
            onChange={(value, dateString) => onChangeFilter("date", dateString)}
          />
        </div>
        <div className="col-span-4 xl:col-span-2">
          <DropdownLiveType
            value={type ? parseInt(type) : undefined}
            onChange={(v) => onChangeFilter("type", v)}
          />
        </div>
      </div>
    </div>
  )
}
