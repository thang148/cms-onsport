import Client from "../client/ClientOnSport"
import ClientSoccer from "../client/ClientSoccer"
import ClientPayment from "../client/ClientPayment"
const resource = "/api/v1"

const getEvents = (params) => {
  return Client.get(`${resource}/events/`, { params })
}
const get = (id) => {
  return Client.get(`${resource}/event/${id}/`)
}
const create = (data) => {
  return Client.post(`${resource}/events/`, data)
}
const update = (id, data) => {
  return Client.put(`${resource}/event/${id}/`, data)
}
const updateStatus = (id, data) => {
  return Client.put(`${resource}/event/update-status/${id}/`, data)
}
const getMatch = (params) => {
  return ClientSoccer.get(`${resource}/publish/leagues/matchbytime/`, { params })
}
const search = (params) => {
  return Client.get(`${resource}/selected/events/`, { params })
}
const eventFullmatch = (id) => {
  return Client.put(`${resource}/event/active-fullmatch/${id}/`)
}
const getPaymentONETIME = (params) => {
  return ClientPayment.get(`/api/products?type=ONE_TIME`, { params })
}
const getListContentBlock = (params) => {
  return Client.get(`${resource}/screen-block/list-event/`, { params })
}
const getListContentVod = (params) => {
  return Client.get(`${resource}/screen-block/list-video/`, { params })
}
const updateContentEvent = (data) => {
  return Client.post(`${resource}/screen-block/event/`, data)
}
const updateContentVod = (data) => {
  return Client.post(`${resource}/screen-block/video/`, data)
}
const getEventFilters = (params) => {
  return Client.get(`${resource}/events/filter/`, { params })
}
const api = {
  getEvents,
  get,
  create,
  getMatch,
  update,
  updateStatus,
  search,
  eventFullmatch,
  getPaymentONETIME,
  getListContentBlock,
  getListContentVod,
  updateContentEvent,
  updateContentVod,
  getEventFilters
}
export default api
