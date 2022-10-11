import React, { useState, useEffect } from "react"
import { Card } from "antd"
import { TitlePage } from "components/ui"
import { apiEventTV } from "api"
import moment from "moment-timezone"
import { useParams } from "react-router-dom"
import "./index.scss"

const Component = () => {
  const { event_id } = useParams()
  const [event, setEvent] = useState({})
  const [loading, setLoading] = useState(false)

  async function fetch() {
    try {
      setLoading(true)
      const { data } = await apiEventTV.get(event_id)
      setEvent(data)
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {
    season,
    channel,
    league,
    screen_block,
    thumbnail,
    location,
    start_time,
    attribute,
    sport_type
  } = event
  return (
    <section>
      <TitlePage title="Chi tiết sự kiện" />
      <Card size="small" loading={loading}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="flex justify-between __row">
              <div>Tên sự kiện:</div>
              <div>{event?.name}</div>
            </div>
            <div className="flex justify-between __row">
              <div>Tên kênh:</div>
              <div>{channel?.name}</div>
            </div>
            <div className="flex justify-between __row">
              <div>Giải đấu:</div>
              <div>{league?.name}</div>
            </div>
            <div className="flex justify-between __row">
              <div>Khối sự kiện:</div>
              <div>{screen_block?.name}</div>
            </div>
            <div className="flex justify-between __row">
              <div>Mùa giải:</div>
              <div>{season}</div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex justify-between __row">
              <div>Bộ môn:</div>
              <div>{sport_type}</div>
            </div>
            <div className="flex justify-between __row">
              <div>Thời gian bắt đầu:</div>
              <div>{moment(start_time).format("HH:mm DD-MM-Y")}</div>
            </div>
            <div className="flex justify-between __row">
              <div>Địa điểm:</div>
              <div>{location}</div>
            </div>
            <div className="flex justify-between __row">
              <div>Trạng thái:</div>
              <div>{event?.status}</div>
            </div>
            <div className="flex justify-between __row">
              <div>Ảnh thumbnail:</div>
              <div>
                <img className="w-32" src={thumbnail} alt={thumbnail} />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="mb-4"></div>
      {screen_block?.block_type === "live" && (
        <div className="grid grid-cols-2 gap-4">
          <Card size="small" loading={loading}>
            <div className="col-span-1">
              <div className="bg-blue-50 p-1 px-2 rounded mb-2 font-semibold">Đội 1</div>
              <div className="flex justify-between __row">
                <div>Tên đội:</div>
                <div>{attribute?.home_name}</div>
              </div>
              <div className="flex justify-between __row">
                <div>Bàn thắng:</div>
                <div>{attribute?.home_score}</div>
              </div>
              <div className="flex justify-between __row">
                <div>Logo:</div>
                <img
                  className="rounded"
                  style={{ height: 100 }}
                  src={attribute?.home_logo}
                  alt={attribute?.home_logo}
                />
              </div>
            </div>
          </Card>

          <Card size="small" loading={loading}>
            <div className="col-span-1">
              <div className="bg-green-50 p-1 px-2 rounded mb-2 font-semibold">Đội 2</div>
              <div className="flex justify-between __row">
                <div>Tên đội:</div>
                <div>{attribute?.away_name}</div>
              </div>
              <div className="flex justify-between __row">
                <div>Bàn thắng:</div>
                <div>{attribute?.away_score}</div>
              </div>
              <div className="flex justify-between __row">
                <div>Logo:</div>
                <img
                  style={{ height: 100 }}
                  className="rounded"
                  src={attribute?.away_logo}
                  alt={attribute?.away_logo}
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </section>
  )
}

export default Component
