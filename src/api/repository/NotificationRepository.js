import Client from "../client/ClientNotification"
const resource = "api/notifications"

function gets(params) {
  return Client.get(`${resource}/general`, { params })
}
function get(id, params) {
  return Client.get(`${resource}/general/${id}`, { params })
}
function create(data) {
  return Client.post(`${resource}/general`, data)
}
function update(id, data) {
  return Client.put(`${resource}/general/${id}`, data)
}
function remove(id) {
  return Client.delete(`${resource}/general/${id}`)
}
function push(data) {
  return Client.post(`api/push_notification`, { noti_id: data })
}

const api = {
  gets,
  get,
  create,
  update,
  remove,
  push
}
export default api
