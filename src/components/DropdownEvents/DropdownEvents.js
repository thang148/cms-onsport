import { useState, useEffect, forwardRef, useRef } from "react"
import { apiEventTV } from "api"
import { Select, Spin } from "antd"

const Dropdown = forwardRef(({ onChange, value }, ref) => {
  const [options, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const __time = useRef()
  const fetch = async (search, id) => {
    setLoading(true)
    setRows([])
    let _rows = []
    try {
      const { data } = await apiEventTV.search({ name: search, id })
      _rows = data.map(({ id, name, status }) => {
        return { value: id, label: name, disabled: status === "finish" ? true : false }
      })
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }

  function onChangeSearch(value) {
    if (__time.current) {
      clearTimeout(__time.current)
    }
    __time.current = setTimeout(() => {
      fetch(value)
    }, [400])
  }
  useEffect(() => {
    fetch(undefined, value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Select
      showSearch
      loading={loading}
      ref={ref}
      className="w-full"
      placeholder="Chọn event..."
      allowClear
      onClear={onChangeSearch}
      filterOption={false}
      value={value}
      notFoundContent={loading ? <Spin size="small" /> : "Không tìm thấy"}
      options={options}
      onChange={onChange}
      onSearch={onChangeSearch}
    />
  )
})

export default Dropdown
