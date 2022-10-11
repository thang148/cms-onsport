import Client from "../client/ClientOnSport"
import ClientSoccer from "../client/ClientSoccer"
const resource = "/api/v1/leagues"
const resourceSoccer = "/api/v1"
function gets(params) {
  return Client.get(`${resource}/`, { params })
}
function get(id, params) {
  return Client.get(`${resource}/${id}`, { params })
}
function create(data) {
  return Client.post(`${resource}/`, data)
}
function update(id, data) {
  return Client.put(`${resource}/${id}/`, data)
}
function remove(id) {
  return Client.delete(`${resource}/${id}/`)
}
function getInternal(params) {
  // return Client.get(`/api/v1/internal/leagues/find/`, { params })
  return ClientSoccer.get(`${resourceSoccer}/league`, { params })
}
function getCountry(params) {
  return ClientSoccer.get(`${resourceSoccer}/country`, { params })
}
function getTeamByLeague(params) {
  return ClientSoccer.get(`/api/v1/teamprofile`, { params })
}
function updateTeam(data) {
  return ClientSoccer.post(`/api/v1/teamprofile`, data)
}
const api = {
  gets,
  get,
  create,
  update,
  remove,
  getInternal,
  getCountry,
  getTeamByLeague,
  updateTeam
}
export default api
