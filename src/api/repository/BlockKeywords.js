import Client from "../client/ClientOnSport"
const resource = "/api/v1/blocked-keywords"

const getKeywords = (id) => {
  return Client.get(`${resource}/get-all`)
}
const editKeywords = (id, data) => {
  return Client.put(`${resource}/edit/?id=${id}`, data)
}

const TagRepository = {
  getKeywords,
  editKeywords
}
export default TagRepository
