import React, { useState, useEffect } from "react"
import { Row, Col, Card } from "antd"
import { apiIdentity } from "api"
import { useNavigate } from "react-router-dom"
import HistoryBooking from "./HistoryBooking"
import { numberToCurrency } from "lib/function"
import "./index.scss"
import { TitlePage } from "components/ui"

const dfText = "Chưa cập nhật"

const dfSpanL = { xs: 24, sm: 24, md: 24, lg: 8 }
const dfSpanR = { xs: 24, sm: 24, md: 24, lg: 16 }
const DetailIdentity = ({ match }) => {
  const identityId = match.params.id
  const [customerInfo, setCustomerInfo] = useState({ data: {} })
  const [point, setPoint] = useState(0)

  const navigate = useNavigate()
  const fetch = async () => {
    let _list = {}
    try {
      const response = await apiIdentity.getInfoCustomer(identityId)
      _list = response.data
    } catch (e) {
      throw e
    } finally {
      setCustomerInfo({ data: _list })
    }
  }

  async function fetchUserPoint() {
    try {
      const { data } = await apiIdentity.getsUserPoint({ user_id: identityId })
      setPoint(data[0].point)
    } catch (e) {
      console.log(e)
    }
  }

  // async function onChangeReload() {
  //   await fetch()
  // }

  // function backToListCustomer() {
  //   navigate(`/customer`)
  // }

  useEffect(() => {
    fetch()
    fetchUserPoint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section>
      <TitlePage title="Thông tin khách hàng" />
      <Card size="small">
        <div className="customer-main p-4">
          <Row gutter={24}>
            <Col {...dfSpanL}>
              <Card className="card-info">
                <div className="avatar">
                  <img
                    src={
                      customerInfo.data.avatar
                        ? customerInfo.data.avatar
                        : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
                    }
                    width={100}
                    height={100}
                    alt="avatar"
                  />
                </div>
                <div className="text-name">{customerInfo.data.fullname}</div>
                <div>
                  <Row gutter={16} className="info-customer">
                    <Col span={12}>
                      <p className="hearder-text">Số điểm</p>
                      <p>{point > 0 ? numberToCurrency(point) : point}</p>
                    </Col>
                    <Col span={12}>
                      <p className="hearder-text">Số điện thoại</p>
                      <p>{customerInfo.data.phone ? customerInfo.data.phone : dfText}</p>
                    </Col>
                  </Row>
                  <Row gutter={16} className="info-customer">
                    <Col span={12}>
                      <p className="hearder-text">Giới tính</p>
                      <p>{customerInfo.data.gender ? customerInfo.data.gender : dfText}</p>
                    </Col>
                    <Col span={12}>
                      <p className="hearder-text">Ngày sinh</p>
                      <p>{customerInfo.data.dob ? customerInfo.data.dob : dfText}</p>
                    </Col>
                  </Row>
                  <Row gutter={16} className="info-customer">
                    <Col span={24}>
                      <p className="hearder-text">Email</p>
                      <p>{customerInfo.data.email ? customerInfo.data.email : dfText}</p>
                    </Col>
                  </Row>
                  <Row gutter={16} className="info-customer">
                    <Col span={24}>
                      <p className="hearder-text">Địa chỉ</p>
                      <p>{customerInfo.data.address ? customerInfo.data.address : dfText}</p>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col {...dfSpanR}>
              <HistoryBooking id={identityId} />
            </Col>
          </Row>
        </div>
      </Card>
    </section>
  )
}
export default DetailIdentity
