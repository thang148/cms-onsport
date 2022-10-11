import Client from "../client/ClientOnSport"
const resource = "/api/v1"

function gets(params) {
  return Client.get(`${resource}/slides/`, { params })
}
function create(data) {
  return Client.post(`${resource}/slides/`, data)
}
function update(id, data) {
  return Client.put(`${resource}/slide/${id}/`, data)
}
function remove(id) {
  return Client.delete(`${resource}/slide/${id}/`)
}
function updateOrder(data) {
  return Client.put(`${resource}/slides/reorder/`, data)
}

const api = {
  gets,
  create,
  update,
  remove,
  updateOrder
}
export default api
