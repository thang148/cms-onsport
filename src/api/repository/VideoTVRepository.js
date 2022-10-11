import Client from "../client/ClientOnSport"
const resource = "/api/v1/video"

function gets(params) {
  return Client.get(`${resource}`, { params })
}
function get(video_id) {
  return Client.get(`${resource}/${video_id}`)
}
function create(data) {
  return Client.post(`${resource}`, data)
}
function update(id, data) {
  return Client.put(`${resource}/${id}`, data)
}
function updateLink(id, data) {
  return Client.put(`${resource}/update-transcode/${id}/`, data)
}
function remove(id) {
  return Client.delete(`${resource}/${id}`)
}
const api = {
  gets,
  get,
  create,
  update,
  updateLink,
  remove
}

export default api
