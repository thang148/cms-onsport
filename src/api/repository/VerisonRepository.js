import Client from "../client/ClientOnSport"
const resource = "/api/v1"

function get() {
  return Client.get(`/api/v1/version-app/`)
}
function update(id, data) {
  return Client.put(`/api/v1/version-app/${id}/`, data)
}

function remove(id) {
  return Client.delete(`${resource}/slide/${id}/`)
}
function updateOrder(data) {
  return Client.put(`${resource}/slides/reorder/`, data)
}

const api = {
  get,
  update,
  remove,
  updateOrder
}
export default api
