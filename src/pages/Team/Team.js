import React, { useState, useEffect, useRef } from "react"
import { Button, Card, notification, Skeleton, Input } from "antd"
import { TitlePage } from "components/ui"
import { apiLeagues } from "api"
import UploadImageOnsport from "./Upload"
import UploadImage from "./UploadLogo"
import { useParams } from "react-router-dom"

const Component = () => {
  const { league_sync_id } = useParams()
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingSubmit, setLoadingSubmtit] = useState(false)
  const __index = useRef(-1)
  const item = useRef(false)
  const dfEvent = localStorage.getItem("event_id")

  function handleModal(value) {
    if (item.current) item.current = false
    setVisible(value)
  }

  function setSelectSrc(src) {
    const _list = [...rows]
    _list[__index.current].logo_custom = src
    _list[__index.current].change = true
    setRows(_list)
  }

  function onChangeName(index, key, e) {
    const { value } = e.target
    const list = [...rows]
    list[index][key] = value
    list[index].change = true
    setRows(list)
  }

  async function fetch() {
    let rows = []
    try {
      setLoading(true)
      const { data } = await apiLeagues.getTeamByLeague({
        league_id: league_sync_id
      })
      rows = data
    } catch (e) {
      throw e
    } finally {
      setRows(rows)
      setLoading(false)
    }
  }
  async function update() {
    try {
      setLoadingSubmtit(true)
      let __rows = []
      rows.forEach((i) => {
        if (i.change) {
          const item = {
            ...i,
            id_nosql: i.id
          }
          delete item.id
          __rows.push(item)
        }
      })
      const { data } = await apiLeagues.updateTeam(__rows)
      notification.success({ message: "Thông báo!", description: data })
      __index.current = -1
    } catch (error) {
      throw error
    } finally {
      setLoadingSubmtit(false)
    }
  }

  function onClose() {
    setVisible(false)
  }
  function setIndex(k) {
    __index.current = k
    setVisible(true)
  }

  function onChangeSrc(k, src) {
    __index.current = k
    setSelectSrc(src)
  }

  useEffect(() => {
    if (dfEvent) {
      setTimeout(function () {
        handleModal(true)
      }, 500)
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section>
      <TitlePage title="Danh sách đội bóng" />
      {loading ? (
        <Skeleton paragraph={{ rows: 8 }} />
      ) : (
        <Card size="small">
          <div className="flex justify-end mb-4">
            <Button
              // disabled={__index.current === -1}
              loading={loadingSubmit}
              type="primary"
              onClick={update}
            >
              Cập nhật đội bóng
            </Button>
          </div>
          <div>
            <div className="item flex justify-between p-2 items-center border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4 w-96">
                <div className="col-span-1">Tên đội bóng</div>
                <div className="col-span-1">Tên viết tắt</div>
              </div>
              <div className="flex space-x-4">
                <div>Logo mặc định</div>
                <div className="w-20">Logo mới</div>
                <div className="w-20">Thao tác</div>
              </div>
            </div>
            {rows?.map(({ id, logo, logo_custom, name, short_name }, key) => {
              return (
                <div
                  className="item flex justify-between p-2 items-center border-b border-gray-200"
                  key={id}
                >
                  <div className="grid grid-cols-2 w-96 gap-4">
                    <div className="col-span-1">
                      <Input
                        placeholder="Short name"
                        className="w-full"
                        value={name}
                        onChange={(e) => onChangeName(key, "name", e)}
                      />
                    </div>

                    <div className="col-span-1">
                      <Input
                        placeholder="Short name"
                        className="w-full"
                        value={short_name}
                        maxLength={3}
                        onChange={(e) => onChangeName(key, "short_name", e)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 flex-grow justify-end">
                    <div className="w-20 flex justify-center">
                      <img src={logo} alt="" className="w-12 h-12" />
                    </div>
                    <div onClick={() => setIndex(key)} className="cursor-pointer w-20">
                      {logo_custom ? (
                        <img src={logo_custom} alt="" className="w-12 h-12" />
                      ) : (
                        <Button type="primary">Media</Button>
                      )}
                    </div>
                    <div className="w-20">
                      <UploadImage onChange={(src) => onChangeSrc(key, src)} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}
      <UploadImageOnsport onChange={setSelectSrc} onClose={onClose} visible={visible} />
    </section>
  )
}

export default Component
