import Client from "../client/ClientOnSport"
const resource = "/api/v1"

function gets(data) {
  return Client.post(`${resource}/slides`, data)
}
function create(data) {
  return Client.post(`${resource}/slides/`, data)
}
function update(id, data) {
  return Client.put(`${resource}/account/password/${id}/`, data)
}
function remove(id) {
  return Client.delete(`${resource}/account/password/${id}/`)
}

const api = {
  gets,
  create,
  update,
  remove
}
export default api
