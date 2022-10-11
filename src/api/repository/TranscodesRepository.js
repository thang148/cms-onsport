import Client from "../client/ClientTranscode"

function gets(params) {
  return Client.get(`search`, { params })
}
function reTranscode(params) {
  return Client.get(`transcode`, { params })
}
function updateSelect(params) {
  return Client.get(`/update-is-used`, { params })
}

const api = {
  gets,
  reTranscode,
  updateSelect
}
export default api
