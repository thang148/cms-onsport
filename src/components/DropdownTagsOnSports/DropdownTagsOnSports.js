import { useState, useEffect, forwardRef, useRef } from "react"
import { apiOnposrtTag } from "api"
import { Select, Spin } from "antd"

const DropdownTags = forwardRef(({ onChange, value, defaultTags }, ref) => {
  const [options, setRows] = useState(defaultTags || [])
  const [loading, setLoading] = useState(false)
  const __time = useRef()

  const fetch = async (search) => {
    setLoading(true)
    let _rows = []
    try {
      const { data } = await apiOnposrtTag.getTags({
        page_size: 20,
        name: search
      })
      _rows = data.map(({ id, name }) => {
        return { value: id, label: name }
      })
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }

  function onSearch(text) {
    if (__time.current) {
      clearTimeout(__time.current)
      __time.current = null
    }
    __time.current = setTimeout(() => {
      fetch(text)
    }, 400)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <Select
      mode="multiple"
      ref={ref}
      style={{ width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Tags..."
      allowClear
      filterOption={false}
      onSearch={onSearch}
      options={options}
      notFoundContent={loading ? <Spin size="small" /> : "Không tìm thấy"}
      value={value}
      onChange={onChange}
    />
  )
})

export default DropdownTags
