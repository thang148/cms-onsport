import { useState, useEffect, useRef, memo } from "react"
import { Select, Spin } from "antd"
import { apiTranscodes } from "api"
import CONSTANT from "lib/constains"

const DropdownVideo = ({ onChange }) => {
  const [options, setRows] = useState([])
  const [title, setTitle] = useState()
  const [loading, setLoading] = useState(false)
  const __filter = useRef({
    is_used: CONSTANT.NOT_USED,
    status: CONSTANT.TRANSCODE_SUCCESS,
    page_num: 1,
    is_drm: 0,
    page_size: 100
  })
  const __time = useRef()

  const fetch = async () => {
    setLoading(true)
    setRows([])
    let _rows = []
    try {
      const { data } = await apiTranscodes.gets(__filter.current)
      _rows = data?.rows?.map((item) => {
        const { id, title } = item
        return { value: id, label: title, ...item }
      })
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }

  function onChangeSeach(v) {
    __filter.current.title = v
    if (__time.current) {
      clearTimeout(__time.current)
    }
    __time.current = setTimeout(() => {
      fetch()
    }, [400])
  }

  function onChangeFilter(key, v) {
    __filter.current[key] = v
    __filter.current.title = undefined
    setTimeout(() => {
      setTitle(undefined)
      fetch()
      onChange()
    }, 300)
  }

  function onChangeData(v, p) {
    setTitle(v)
    onChange(p)
  }
  useEffect(() => {
    fetch(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-blue-50 p-2 border border-blue-200">
      <div className="flex gap-2 justify-end mb-2">
        <Select
          defaultValue={0}
          onChange={(v) => onChangeFilter("is_drm", v)}
          placeholder="Tùy chọn drm"
          className="w-28"
        >
          <Select.Option value={1}>DRM</Select.Option>
          <Select.Option value={0}>Not DRM</Select.Option>
        </Select>
        <Select
          className="w-36"
          onChange={(v) => onChangeFilter("is_used", v)}
          defaultValue={CONSTANT.NOT_USED}
        >
          <Select.Option value={CONSTANT.NOT_USED}>Chưa biên tập</Select.Option>
          <Select.Option value={CONSTANT.USED}>Đã biên tập</Select.Option>
        </Select>
      </div>
      <Select
        showSearch
        loading={loading}
        className="w-full flex-grow"
        placeholder="Chọn vod từ dms..."
        allowClear
        onClear={onChangeSeach}
        filterOption={false}
        value={title}
        notFoundContent={loading ? <Spin size="small" /> : "Không tìm thấy"}
        options={options}
        onChange={onChangeData}
        onSearch={onChangeSeach}
      />
    </div>
  )
}

export default memo(DropdownVideo)
