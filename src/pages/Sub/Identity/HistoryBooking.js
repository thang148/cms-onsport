import React, { useState, useEffect, useRef } from "react"
import { Card, Tabs, Skeleton, Divider, Tooltip } from "antd"
import moment from "moment-timezone"
import { apiIdentity } from "api"
import { numberToCurrency } from "lib/function"
import { Pagination, Table } from "components/ui"
import columns from "./ColumnsOrder"
import InfiniteScroll from "react-infinite-scroll-component"

const { TabPane } = Tabs
const dfParams = {
  page: 1,
  per_page: 5,
  count: 10
}
const dfParamsPoint = {
  page_num: 1,
  page_size: 10,
  count: 10
}

const HistoryBooking = ({ id }) => {
  const [listAppointments, setlistAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingPoint, setLoadingPoint] = useState(false)
  const [rowsOrder, setRowOrders] = useState([])
  const __params = useRef(dfParams)
  const __paramsPoint = useRef(dfParamsPoint)

  async function fetchPointHistory(page_num) {
    if (loadingPoint) {
      return
    }

    let _data = []
    setLoadingPoint(true)
    try {
      const { data, count } = await apiIdentity.getsBurnPoint({
        user_id: id,
        page_size: __paramsPoint.current.page_size,
        page_num: page_num
      })
      _data = data
      __paramsPoint.current.count = count
      __paramsPoint.current.page_num = page_num
    } catch (e) {
      console.log(e)
    } finally {
      if (page_num === 1) {
        setlistAppointments(_data)
      } else {
        setlistAppointments([...listAppointments, ..._data])
      }
      setLoadingPoint(false)
    }
  }

  async function fetchOrderHistory() {
    setLoading(true)
    let _rows = []
    try {
      const { data, total } = await apiIdentity.getsOrderHistory(id, __params.current)
      _rows = data
      __params.current.count = total
    } catch (e) {
      console.log(e)
    } finally {
      setRowOrders(_rows)
      setLoading(false)
    }
  }

  function onChangeLink(key) {
    switch (key) {
      case "1":
        setlistAppointments([])
        __paramsPoint.current.page_num = 1
        fetchPointHistory(__paramsPoint.current.page_num)
        break
      case "2":
        fetchOrderHistory()
        break
      default:
        break
    }
  }

  const actionData = (type, data) => {
    console.log("action data")
  }

  // function onFilter(params) {
  //   __params.current = {
  //     ...__params.current,
  //     page: 1,
  //     ...params
  //   }
  //   fetchOrderHistory()
  // }

  function loadMoreData() {
    __paramsPoint.current.page_num = __paramsPoint.current.page_num + 1
    fetchPointHistory(__paramsPoint.current.page_num)
  }

  function changePage(page, limit) {
    __params.current.page = page
    __params.current.per_page = limit
    fetchOrderHistory()
  }

  useEffect(() => {
    fetchPointHistory(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="detail-history card-info">
      <Tabs defaultActiveKey="1" size="large" onChange={onChangeLink}>
        <TabPane tab="Lịch sử burn điểm" key="1" loading={loading}>
          <div className="card-content">
            <div className="card-body">
              <div className="appointments" id="scrollableDiv">
                <InfiniteScroll
                  dataLength={listAppointments.length}
                  next={loadMoreData}
                  hasMore={listAppointments.length < __paramsPoint.current.count}
                  loader={<Skeleton paragraph={{ rows: 1 }} active />}
                  endMessage={listAppointments.length > 0 && <Divider plain>Hết</Divider>}
                  scrollableTarget="scrollableDiv"
                >
                  {listAppointments && listAppointments.length > 0 ? (
                    listAppointments.map((item, index) => {
                      let date = new Date(item.created)
                      return (
                        <div key={`${item.id}-${index}`} className="appointment">
                          <div className="appointment-date">
                            <img
                              className="rounded"
                              src={
                                item?.product
                                  ? item?.product?.images[0].url
                                  : "https://test-loyaty.s3.amazonaws.com/images/b18904a6-8286-49f2-a7cf-a5066d8369ba"
                              }
                              width={102}
                              height={57}
                              alt={item?.product?.name}
                            />
                          </div>
                          <div className="appointment-content">
                            <Tooltip
                              title={item?.product ? item?.product?.name : "Tặng điểm"}
                              placement="bottom"
                            >
                              <p className="job line_clamp2">
                                {item?.product ? item?.product?.name : "Tặng điểm"}
                              </p>
                            </Tooltip>
                            <p className="date">{moment(date).format("hh:mm:ss DD-MM-YYYY")}</p>
                          </div>
                          <div
                            className="price flex"
                            style={{ color: item.operator === 0 ? "#52C41A" : "#FF4D4F" }}
                          >
                            {item.operator === 0 ? "+" : "-"}
                            {item.point_transaction > 0
                              ? numberToCurrency(item.point_transaction)
                              : 0}{" "}
                            điểm
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="no-appointment">
                      <h3>Không có giao dịch điểm</h3>
                      {/* <p>{t("detail_customer_description")}</p> */}
                    </div>
                  )}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Lịch sử đơn hàng" key="2" loading={loading}>
          <div className="card-content">
            <div className="card-body">
              <div className="appointments">
                {/* <Filter filter={__params.current} onFilter={onFilter} /> */}
                <Table columns={columns(actionData)} dataSource={rowsOrder} loading={loading} />

                <Pagination
                  onChange={changePage}
                  page_num={__params.current.page}
                  page_size={__params.current.per_page}
                  count={__params.current.count}
                />
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default HistoryBooking
