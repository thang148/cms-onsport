import Client from "../client/ClientOnSport"
const resource = "/api/v1"

function gets(params) {
  return Client.get(`${resource}/banner/`, { params })
}
function create(data) {
  return Client.post(`${resource}/banner/`, data)
}
function update(id, data) {
  return Client.put(`${resource}/banner/${id}/`, data)
}
function remove(id) {
  return Client.delete(`${resource}/banner/${id}/`)
}
function updateOrder(data) {
  return Client.put(`${resource}/banner/reorder/`, data)
}

const api = {
  gets,
  create,
  update,
  remove,
  updateOrder
}
export default api
