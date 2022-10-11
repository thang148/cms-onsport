import { useState, useEffect } from "react"
import { Modal } from "antd"
import { apiSubscription } from "api"
import moment from "moment-timezone"

export default function App({ visible, onClose, item }) {
  const [subscription, setSubscription] = useState({})

  async function fetch() {
    try {
      const { data } = await apiSubscription.detailSubscription(item)
      setSubscription(data)
    } catch (e) {
      throw e
    } finally {
    }
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  const { level, created_at, updated_at, sports, leagues } = subscription
  return (
    <Modal
      title={"Chi tiết gói Subscription"}
      open={visible}
      onCancel={() => onClose(false)}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      <div className="col-span-1">
        <div className="flex justify-between mb-2 bg-gray-200 rounded py-1 px-2">
          <div className="">Tên Subscription:</div>
          <div className="">{subscription?.name}</div>
        </div>
        <div className="flex justify-between mb-2 bg-gray-200 rounded py-1 px-2">
          <div className="">Thời gian tạo:</div>
          <div className="">{moment(created_at).format("HH:mm DD-MM-Y")}</div>
        </div>
        <div className="flex justify-between mb-2 bg-gray-200 rounded py-1 px-2">
          <div className="">Thời gian cập nhật:</div>
          <div className="">{moment(updated_at).format("HH:mm DD-MM-Y")}</div>
        </div>
        <div className="flex justify-between mb-2 bg-gray-200 rounded py-1 px-2">
          <div className="">Cấp độ:</div>
          <div className="">{level}</div>
        </div>
        <div className="flex justify-between mb-2 bg-gray-200 rounded py-1 px-2">
          <div className="">Môn thể thao:</div>
          {sports && sports !== null && (
            <div className="">
              {sports?.map((item, index) => (
                <div>{item.name}</div>
              ))}
            </div>
          )}
        </div>
        {/* <div className="flex justify-between __row">
          <div className="textTitle">Mùa giải:</div>
          {seasons && seasons !== null && (
            <div className="textDescription">
              {seasons.map((item, index) => (
                <div>{item.name}</div>
              ))}
            </div>
          )}
        </div>
        <hr /> */}
        <div className="flex justify-between mb-2 bg-gray-200 rounded py-1 px-2">
          <div className="">Giải đấu:</div>
          {leagues && leagues !== null && (
            <div className="">
              {leagues?.map((item, index) => (
                <div>{item.name}</div>
              ))}
            </div>
          )}
        </div>
        {/* <hr />
        <div className="flex justify-between __row">
          <div className="textTitle">Trận đấu:</div>
          {matches && matches !== null && (
            <div className="textDescription">
              {matches.map((item, index) => (
                <div>{item.name}</div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </Modal>
  )
}
