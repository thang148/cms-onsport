import Client from "../client/ClientChat"
import ClienOnsport from "../client/ClientOnSport"
const resource = "/api/v1/publish/chat"
const resourceOnsport = "/api/v1"

const getHistoryChat = (id) => {
  return Client.get(`${resource}/cms-history?room_id=${id}`)
}
const banChat = (data) => {
  return ClienOnsport.post(`${resourceOnsport}/event/ban/chat/`, data)
}
const unbanChat = (id) => {
  return ClienOnsport.delete(`${resourceOnsport}/event/chat/remove/${id}/`)
}
const getListUser = (id) => {
  return ClienOnsport.get(`${resourceOnsport}/list-user/ban/?search=${id}`)
}

const TagRepository = {
  getHistoryChat,
  banChat,
  unbanChat,
  getListUser
}
export default TagRepository
