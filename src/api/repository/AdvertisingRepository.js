import Client from "../client/ClientOnSport"
const resource = "api/v1/app-config"

function getAds(params) {
  return Client.get(`${resource}/`, { params })
}
function createAds(data) {
  return Client.post(`${resource}/`, data)
}
function editAds(id, data) {
  return Client.put(`${resource}/${id}/`, data)
}
function deleteAds(id) {
  return Client.delete(`${resource}/${id}/`)
}

const api = {
  getAds,
  createAds,
  editAds,
  deleteAds
}
export default api
