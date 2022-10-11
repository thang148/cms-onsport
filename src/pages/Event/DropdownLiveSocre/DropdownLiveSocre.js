import { useState, useEffect, forwardRef, memo, useRef } from "react"
import { apiEventTV } from "api"
import { Select, DatePicker, Form, Row, Col } from "antd"
import moment from "moment-timezone"
// import "moment/locale/vi"
import { nextDate } from "lib/dateTime"

const DropdownLiveSocre = forwardRef(({ onChange, league_id, value }, ref) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const __isCurrent = useRef(true)

  const [date, setDate] = useState({
    match_from: moment().subtract(1, "months").format("Y-MM-DD"),
    match_to: moment().add(1, "months").format("Y-MM-DD")
  })

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      const { match_to, match_from } = date
      let params = {}
      if (value && __isCurrent.current) {
        params.match_id = value
      } else {
        params = {
          league_id,
          from_date: match_from,
          to_date: match_to,
          timezone: 7
        }
      }
      const { data } = await apiEventTV.getMatch(params)
      if (data?.length > 0) {
        _rows = data.map((i) => {
          return { value: i.id, label: `${i.home_name} - ${i.away_name}`, ...i }
        })
      }
      if (value && !_rows.find((i) => i.value === value)) {
        onChange({})
      }
      __isCurrent.current = false
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }

  function onChangeDate(date, str) {
    let _date = {}
    if (str) {
      _date = {
        match_from: str[0] || undefined,
        match_to: str[1] || undefined
      }
    }
    setDate(_date)
  }

  function onChangeItem(v) {
    const item = rows.find((i) => i.id === v)
    if (item) {
      onChange(item)
    } else {
      onChange({})
    }
  }

  useEffect(() => {
    if (league_id) {
      fetch()
    } else {
      setRows([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [league_id, date])

  const { match_to, match_from } = date
  return (
    <div className="items-end" ref={ref}>
      <Row gutter={12}>
        <Col span={12}>
          <div className="mb-3">
            <DatePicker.RangePicker
              ranges={nextDate()}
              defaultValue={
                match_to
                  ? [moment(match_from), moment(match_to)]
                  : [moment(), moment().add(1, "months")]
              }
              onChange={onChangeDate}
            />
          </div>
        </Col>
        <Col span={12}>
          <Form.Item
            name="match_sync_id"
            rules={[{ required: true, message: "Chọn trận đấu liên kết" }]}
          >
            <Select
              showSearch
              loading={loading}
              value={value}
              className="w-full"
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Chọn trận đấu liên kết..."
              allowClear
              onChange={onChangeItem}
              filterOption={(input, option) => {
                return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
              options={rows}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
})

export default memo(DropdownLiveSocre)
