import Client from "../client/ClientSubscription"
const resource = "/api"

const getListTicket = (params) => {
  return Client.get(`${resource}/tickets`, { params })
}
const createTicket = (data) => {
  return Client.post(`${resource}/tickets`, data)
}
const updateTicket = (id, data) => {
  return Client.put(`${resource}/tickets/${id}`, data)
}
const deleteTicket = (id, data) => {
  return Client.delete(`${resource}/tickets/${id}/`)
}
const TagRepository = {
  getListTicket,
  createTicket,
  updateTicket,
  deleteTicket
}
export default TagRepository
