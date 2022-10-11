import { useEffect, useRef, useState } from "react"
import { Select } from "antd"
import Areas from "./Area"
import { apiLeagues } from "api"

const { Option } = Select

function filterOptionLeague(input, option) {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

export default function FilterLeagues({ onChange, leagueID }) {
  const [filter, setFilter] = useState({})
  const [countries, setCountries] = useState([])
  const [leagues, setLeagues] = useState([])
  const { area, country, league } = filter
  const dfLeagues = useRef([])
  async function getsCountries(area) {
    try {
      let list = []
      if (area) {
        const { data } = await apiLeagues.getCountry({ area })
        list = data
      }
      setCountries(list)
    } catch (error) {
      throw error
    }
  }
  function filterOption(input, option) {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
  function onChangeFilterArea(v) {
    setFilter({ area: v })
    getsCountries(v)
  }

  function onChangeFilterCountry(v) {
    const __state = { ...filter, country: v, league: undefined }
    setFilter(__state)
    getLeagues(__state)
  }

  function onChangeFilterLeague(v) {
    setFilter((s) => ({ ...s, league: v }))
    const item = dfLeagues.current.find((i) => i.id === v) || {}
    onChange(item)
  }

  async function getLeagues(values) {
    try {
      const { data } = await apiLeagues.getInternal(values)
      dfLeagues.current = data
      const list = data.map((i) => {
        return { label: i.name + " " + i.current_season, value: i.id }
      })
      setLeagues(list)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    setFilter({})
  }, [leagueID])

  return (
    <div className="shadow p-4 border border-blue-500 rounded">
      <div className="mb-2 font-semibold">Tìm kiếm giải đấu</div>
      <div className="grid grid-cols-2 gap-2 relative mb-4">
        <div className="col-span-1">
          <Select
            placeholder="Tìm kiếm khu vực hoặc quốc gia..."
            filterOption={filterOption}
            showSearch
            allowClear
            value={area}
            onChange={onChangeFilterArea}
            className="w-full"
          >
            {Areas.map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              )
            })}
          </Select>
        </div>
        <div className="col-span-1">
          <Select
            showSearch
            allowClear
            filterOption={filterOption}
            className="w-full"
            onChange={onChangeFilterCountry}
            value={country}
            placeholder="Chọn Loại"
          >
            {countries.map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              )
            })}
          </Select>
        </div>
      </div>

      <Select
        showSearch
        allowClear
        className="w-full"
        value={league}
        onChange={onChangeFilterLeague}
        filterOption={filterOptionLeague}
        placeholder="Tìm kiếm giải đấu"
        options={leagues}
      />
    </div>
  )
}
