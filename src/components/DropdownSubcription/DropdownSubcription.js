import { useState, useEffect, forwardRef, memo, useRef } from "react"
import { apiSubscription } from "api"
import { Select } from "antd"

const Component = forwardRef(({ onChange, value, onChangeLevel }, ref) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const isMonter = useRef(true)

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      let params = {
        page_num: 1,
        page_size: 5000
      }
      const { data } = await apiSubscription.getListSubscription(params)
      _rows = data
    } catch (e) {
      console.log(e)
    } finally {
      if (isMonter.current) {
        let _result = []
        _result = _rows.filter((word) => word.disable === false)
        setRows(
          _result.map((i) => {
            return { label: i.name, value: i.id.toString(), level: i.level }
          })
        )
        setLoading(false)
      }
    }
  }

  function onChangeData(v, o) {
    onChange(v)
    onChangeLevel(o)
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
      placeholder="Chọn Subscription"
      allowClear
      value={value}
      options={rows}
      onChange={onChangeData}
      filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    />
  )
})

export default memo(Component)
