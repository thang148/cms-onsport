import React, { useState, useEffect, useRef, memo } from "react"
import { apiVideosTV } from "api"
import { Input } from "antd"
import useComponentVisible from "components/ClickOutSide"
import { paramsUrl } from "lib/function"

const FillterSeries = memo(({ onChangeItems, items, contentAge, contentTopics }) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const [rows, setRows] = useState([])
  const __time = useRef()

  const params = useRef({
    page_num: 1,
    page_size: 10000,
    is_active: true,
    ...paramsUrl.get()
  })
  async function fetch() {
    let items = []

    try {
      const { data } = await apiVideosTV.gets(params.current)
      items = data
    } catch (e) {
      console.log(e)
    } finally {
      setRows(items)
      // setLoading(false)
    }
  }

  function onChangeSearch(e) {
    params.current.name = e.target.value
    if (__time.current) clearTimeout(__time.current)
    __time.current = setTimeout(() => {
      fetch()
    }, 500)
  }

  function onBlur() {
    setIsComponentVisible(true)
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative">
      <Input onClick={onBlur} onChange={onChangeSearch} placeholder="Tìm kiếm nội dung..." />
      <div ref={ref}>
        {isComponentVisible && (
          <div className="absolute top-10 bg-white shadow_antd left-0 w-full z-20 p-4 space-y-2 max-h-[350px] overflow-auto">
            {rows.length > 0 ? (
              rows.map((item) => {
                const __class = items?.find((i) => i.id === item.id) ? "bg-gray-300" : ""
                return (
                  <div
                    className={`py-1 text-base border rounded hover:bg-slate-200 px-4 ${__class}`}
                    key={item.id}
                    onClick={() => onChangeItems({ id: item.id, name: item.name })}
                  >
                    {item.name}
                  </div>
                )
              })
            ) : (
              <div className="text-base">No contents</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

export default FillterSeries
