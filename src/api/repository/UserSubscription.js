import Client from "../client/ClientSubscription"
const resource = "/api"

const getListSubscription = (params) => {
  return Client.get(`${resource}/subscriptions`, { params })
}
const getListSport = (params) => {
  return Client.get(`${resource}/sports`, { params })
}
const getListLeagues = (params) => {
  return Client.get(`${resource}/leagues`, { params })
}
const getListSeasons = (params) => {
  return Client.get(`${resource}/seasons`, { params })
}
const getListMatch = (params) => {
  return Client.get(`${resource}/matches`, { params })
}
const createSubscription = (data) => {
  return Client.post(`${resource}/subscriptions`, data)
}
const updateSubscription = (id, data) => {
  return Client.put(`${resource}/subscriptions/${id}`, data)
}
const detailSubscription = (id, data) => {
  return Client.get(`${resource}/subscriptions/${id}/`)
}
const TagRepository = {
  getListSubscription,
  getListSport,
  getListLeagues,
  getListSeasons,
  getListMatch,
  createSubscription,
  updateSubscription,
  detailSubscription
}
export default TagRepository
