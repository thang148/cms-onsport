import React, { useRef } from "react"
import { Input, Select } from "antd"
import CONSTANT from "lib/constains"
const { Option } = Select

export default function Filter({ onFilter, filter }) {
  const __filter = useRef({})
  const __timeOut = useRef()

  function onChangeFilter(key, value) {
    __filter.current[key] = value
    if (__timeOut.current) {
      clearTimeout(__timeOut.current)
    }
    __timeOut.current = setTimeout(() => {
      onFilter(__filter.current)
    }, 500)
  }
  const { title, status, is_used, is_drm } = filter
  return (
    <div className="flex justify-end gap-2 flex-wrap">
      <Input
        defaultValue={title}
        className="w-200"
        placeholder="Tên VOD..."
        onChange={(e) => onChangeFilter("title", e.target.value)}
      />

      <Select
        value={status}
        className="w-200"
        allowClear
        placeholder="Chọn trạng thái..."
        onChange={(v) => onChangeFilter("status", v)}
      >
        <Option value={CONSTANT.TRANSCODE_DOING}>Transcoding</Option>
        <Option value={CONSTANT.TRANSCODE_SUCCESS}>Thành công</Option>
        <Option value={CONSTANT.TRANSCODE_ERROR}>Thất bại</Option>
      </Select>
      <Select
        value={is_used}
        className="w-200"
        allowClear
        placeholder="Tất cả..."
        onChange={(v) => onChangeFilter("is_used", v)}
      >
        <Option value={CONSTANT.ALL}>Tất cả</Option>
        <Option value={CONSTANT.USED}>Đã dùng</Option>
        <Option value={CONSTANT.NOT_USED}>Chưa dùng</Option>
      </Select>
      <Select
        value={is_drm}
        className="w-32"
        allowClear
        placeholder="Chọn drm..."
        onChange={(v) => onChangeFilter("is_drm", v)}
      >
        <Option value={1}>DRM</Option>
        <Option value={0}>NOT DRM</Option>
      </Select>
    </div>
  )
}
