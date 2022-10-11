import Client from "../client/ClientOnSport"
const resource = "/api/v1"

function gets(params) {
  return Client.get(`${resource}/screen-blocks/`, { params })
}
function getFilters(params) {
  return Client.get(`${resource}/screen-blocks/selected/`, { params })
}
function create(data) {
  return Client.post(`${resource}/screen-blocks/`, data)
}
const update = (id, data) => {
  return Client.put(`${resource}/screen-blocks/${id}/`, data)
}
const remove = (id) => {
  return Client.delete(`${resource}/screen-blocks/${id}/`)
}
function updateOrder(data) {
  return Client.put(`${resource}/screen-block/reorder/`, data)
}
const getListBlocks = (id) => {
  return Client.get(`${resource}/screen-blocks/${id}/`)
}
const api = {
  gets,
  create,
  update,
  remove,
  getFilters,
  updateOrder,
  getListBlocks
}
export default api
