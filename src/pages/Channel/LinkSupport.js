import { useEffect, useState, forwardRef } from "react"
import { Button, Input } from "antd"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"

const LinkSupport = forwardRef(({ value, onChange }, ref) => {
  const [rows, setRows] = useState(value)

  function onAdd() {
    if (rows && rows.length > 0) {
      setRows([...rows, ""])
    } else {
      setRows([""])
    }
  }

  function onRemove(index) {
    const _rows = [...rows]
    _rows.splice(index, 1)
    setRows(_rows)
  }

  function onChangeValues(index, value) {
    let _rows = [...rows]
    _rows[index] = value
    setRows(_rows)
  }

  useEffect(() => {
    onChange(rows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows])

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(rows)) {
      setRows(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  return (
    <div ref={ref} className="p-4 border-gray-200 border">
      {rows?.length > 0 &&
        rows?.map((item, index) => {
          return (
            <div className="grid grid-cols-8 gap-4 mb-4" key={index}>
              <div className="col-span-7">
                <Input
                  value={item}
                  key={index}
                  onChange={(e) => onChangeValues(index, e.target.value)}
                  placeholder="Link..."
                />
              </div>
              <div className="col-span-1">
                <Button onClick={() => onRemove(index)} icon={<DeleteOutlined />} danger />
              </div>
            </div>
          )
        })}
      <div className="flex justify-center mt-2">
        <Button type="primary" onClick={onAdd} icon={<PlusOutlined />}>
          Thêm link
        </Button>
      </div>
    </div>
  )
})
export default LinkSupport
