import { useState, useEffect, useRef } from "react"
import { Skeleton, Button, Select, notification, Input } from "antd"
import { TitlePage } from "components/ui"
import { apiBlockKeywords } from "api"
import "./index.scss"

export default function EditArticles() {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [_id, setID] = useState()
  const [values, setValues] = useState([])
  const [addValues, setAddValues] = useState([])
  const [deleteValues, setDeleteValues] = useState([])
  const initList = useRef()
  const __time = useRef()

  async function getData() {
    setLoading(true)
    const { data } = await apiBlockKeywords.getKeywords()
    const dfList = data[0]?.keywords?.split(",")
    const newList = dfList.map((i) => {
      return i.trim().toLowerCase()
    })
    setValues(newList)
    initList.current = newList
    setID(data[0]?._id)
    try {
      setLoading(true)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(value) {
    setAddValues(value)
  }

  function onSearch(v) {
    if (__time.current) {
      clearTimeout(__time.current)
    }
    __time.current = setTimeout(() => {
      const list = initList.current.filter((i) => i.toLowerCase().includes(v.toLowerCase()))
      setSuggestions(
        list.map((i) => {
          return { label: i, value: i }
        })
      )
    }, 300)
  }

  function onChangeFind(e) {
    if (__time.current) {
      clearTimeout(__time.current)
    }
    const { value } = e.target
    __time.current = setTimeout(() => {
      let __list = initList.current
      if (value) {
        __list = initList.current.filter((i) => i.toLowerCase().includes(value.toLowerCase()))
      }
      setValues(__list)
    }, 300)
  }

  async function addKeywords() {
    if (addValues === undefined) {
      notification.error({ message: "Thông báo!", description: "Bạn cần nhập từ khóa cần chặn !" })
    } else {
      let listValues = initList.current
      let difference = addValues.filter((x) => !listValues.includes(x))
      if (difference && difference.length !== 0) {
        const newListAdd = difference.map((i) => {
          return i?.trim()?.toLowerCase()
        })
        let mergeArrs = listValues.concat(newListAdd)
        let convertStr = mergeArrs.sort().toString()
        console.log({ convertStr })
        let strKey = { keywords: convertStr.replaceAll(",", ",") }
        try {
          setLoading(true)
          await apiBlockKeywords.editKeywords(_id, strKey)
          notification.success({
            message: "Thông báo!",
            description: "Thêm từ cần chặn thành công!"
          })
          getData()
          setAddValues()
        } catch (error) {
          throw error
        } finally {
          setLoading(false)
        }
      } else {
        notification.error({
          message: "Thông báo!",
          description: "Từ khóa đã tồn tại !"
        })
      }
    }
  }

  function handleChangeDelete(value, o) {
    console.log({ o })
    setDeleteValues(value)
  }

  async function deleteKeywords() {
    if (deleteValues === undefined) {
      notification.error({ message: "Thông báo!", description: "Bạn cần nhập từ khóa cần xóa !" })
    } else {
      let listValues = initList.current
      let newArr = listValues.filter((x) => !deleteValues.includes(x))
      let match = deleteValues.filter((x) => listValues.includes(x))
      if (match && match.length !== 0) {
        let convertStr = newArr.toString()
        let strKey = { keywords: convertStr }
        try {
          setLoading(true)
          await apiBlockKeywords.editKeywords(_id, strKey)
          notification.success({
            message: "Thông báo!",
            description: "Xóa thành công!"
          })
          getData()
          if (suggestions) setSuggestions(undefined)
          setDeleteValues([])
        } catch (error) {
          throw error
        } finally {
          setLoading(false)
        }
      } else {
        notification.error({
          message: "Thông báo!",
          description: "Từ khóa không tồn tại !"
        })
      }
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý chặn từ khóa" />

      <div className="__content mt-4 mb-4">
        <div className="flex gap-2 mb-2">
          <Select
            mode="tags"
            value={addValues}
            dropdownMatchSelectWidth={true}
            style={{ width: "540px" }}
            onChange={handleChange}
            placeholder="Chọn từ khóa cần thêm..."
            allowClear
          />
          <Button type="primary" size="middle" onClick={addKeywords}>
            Thêm từ khóa
          </Button>
        </div>
        <div className="flex gap-2 mb-2">
          <Select
            mode="multiple"
            dropdownMatchSelectWidth={true}
            style={{ width: "540px" }}
            listHeight={600}
            onSearch={onSearch}
            value={deleteValues}
            placeholder="Chọn từ khóa cần xóa..."
            onChange={handleChangeDelete}
            options={suggestions}
            allowClear
          />
          <Button type="primary" size="middle" onClick={deleteKeywords}>
            Xóa từ khóa
          </Button>
        </div>
        <div>
          <Input onChange={onChangeFind} allowClear className="w-200" placeholder="Tìm kiếm từ" />
        </div>
      </div>

      <div className="relative __content">
        <div className="border border-gray-200 p-2 box">
          <div className="text_box space-x-2">
            {loading ? (
              <Skeleton paragraph={{ rows: 8 }} />
            ) : (
              <div>
                {values?.length > 0 ? (
                  values?.map((item, k) => {
                    return <span key={k}>{item}, </span>
                  })
                ) : (
                  <div>Không thấy kết quả từ tìm kiếm</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
