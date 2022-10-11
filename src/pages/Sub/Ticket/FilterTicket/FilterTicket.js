import { useEffect, useState } from "react"
import { Select, Form, Col } from "antd"
import { apiSubscription } from "api"

const { Option } = Select

export default function FilterLeagues({ onChange }) {
  const [filter, setFilter] = useState({})
  const [checkLevel, setCheckLevel] = useState(1)
  const [sportsType, setSportsType] = useState([])
  const [leaguesType, setLeaguesType] = useState([])
  const [seasonsType, setSeasonsType] = useState([])
  const [matchsType, setMatchsType] = useState([])
  const { level, sports, league, season, match } = filter
  console.log("filterfilterfilter", filter)
  const listLevel = [
    { name: "1", id: 1 },
    { name: "2", id: 2 },
    { name: "3", id: 3 },
    { name: "4", id: 4 },
    { name: "5", id: 5 }
  ]
  async function getListSport() {
    try {
      let listSp = []
      const { data } = await apiSubscription.getListSport({})
      listSp = data
      setSportsType(listSp)
    } catch (error) {
      throw error
    }
  }

  async function getLeagues(sportsID) {
    try {
      let list = []
      if (sportsID) {
        const { data } = await apiSubscription.getListLeagues({ sportsID })
        list = data
        console.log("listssts ", list)
      }
      setLeaguesType(list)
    } catch (error) {
      throw error
    }
  }

  async function getSeasons(leagueID) {
    try {
      let list = []
      if (leagueID) {
        const { data } = await apiSubscription.getListLeagues({ leagueID })
        list = data
        console.log("lists sts ", list)
      }
      setSeasonsType(list)
    } catch (error) {
      throw error
    }
  }

  async function getMatchs(seasonID) {
    try {
      let list = []
      if (seasonID) {
        const { data } = await apiSubscription.getListMatch({ seasonID })
        list = data
      }
      setMatchsType(list)
    } catch (error) {
      throw error
    }
  }

  function onChangeLevel(v) {
    setCheckLevel(v)
    setFilter({ level: v })
  }

  function onChangeSports(v) {
    const __state = { ...filter, sports: v, league: undefined, season: undefined, match: undefined }
    getLeagues(v)
    setFilter(__state)
  }
  function onChangeLeagues(v) {
    const __state = { ...filter, league: v, season: undefined, match: undefined }
    getSeasons(v)
    setFilter(__state)
  }
  function onChangeSeason(v) {
    const __state = { ...filter, season: v, match: undefined }
    getMatchs(v)
    setFilter(__state)
  }
  function onChangeMatch(v) {
    const __state = { ...filter, match: v }
    setFilter(__state)
  }

  useEffect(() => {
    getListSport()
    setFilter({})
  }, [])

  return (
    <div className="p-1">
      <Form.Item
        label="Chọn Level"
        name="level"
        rules={[{ required: true, message: "Chọn Level!" }]}
      >
        <Select
          allowClear
          className="w-full"
          value={level}
          onChange={onChangeLevel}
          placeholder="Chọn Level"
        >
          {listLevel.map(({ name, id }) => {
            return (
              <Option key={id} value={id}>
                {name}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      <div className="grid grid-cols-2 gap-2 relative mb-4">
        {checkLevel !== 1 && checkLevel <= 5 ? (
          <div className="col-span-1">
            <Form.Item
              label="Môn thể thao"
              name="sport_id"
              rules={[{ required: true, message: "Chọn bộ môn!" }]}
            >
              <Select
                placeholder="Chọn bộ môn ..."
                allowClear
                value={sports}
                onChange={onChangeSports}
                className="w-full"
              >
                {sportsType.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
        ) : null}
        {checkLevel !== 1 && checkLevel > 2 && checkLevel <= 5 ? (
          <div className="col-span-1">
            <Form.Item
              label="Giải đấu"
              name="league_id"
              rules={[{ required: true, message: "Chọn giải đấu!" }]}
            >
              <Select
                placeholder="Chọn giải đấu ..."
                allowClear
                value={league}
                onChange={onChangeLeagues}
                className="w-full"
              >
                {leaguesType.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
        ) : null}
        {checkLevel !== 1 && checkLevel > 3 && checkLevel <= 5 ? (
          <div className="col-span-1">
            <Form.Item
              label="Mùa giải"
              name="season_id"
              rules={[{ required: true, message: "Chọn mùa giải!" }]}
            >
              <Select
                placeholder="Chọn mùa giải ..."
                allowClear
                value={season}
                onChange={onChangeSeason}
                className="w-full"
              >
                {seasonsType.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
        ) : null}
        {checkLevel !== 1 && checkLevel === 5 ? (
          <div className="col-span-1">
            <Form.Item
              label="Trận đấu"
              name="match_id"
              rules={[{ required: true, message: "Chọn trận đấu!" }]}
            >
              <Select
                placeholder="Chọn trận đấu ..."
                allowClear
                value={match}
                onChange={onChangeMatch}
                className="w-full"
              >
                {matchsType.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
        ) : null}
      </div>
    </div>
  )
}
