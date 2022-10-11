import Client from "../client/ClientOnSport"
import ClientLoyaltyRedeem from "../client/ClientLoyaltyRedeem"
import ClientLoyaltyOrder from "../client/ClientLoyaltyOrder"
const resource = "/api/users"

const login = (data) => {
  return Client.post(`/api/login`, data)
}
const gets = (params) => {
  return Client.get(`${resource}`, { params })
}

const create = (data) => {
  return Client.post(`${resource}`, data)
}

const update = (data) => {
  return Client.put(`${resource}`, data)
}
const updateActive = (id, data) => {
  return Client.put(`api/admin/users/${id}`, data)
}
const remove = (id) => {
  return Client.delete(`${resource}/id`)
}

const getsBurnPoint = (params) => {
  return ClientLoyaltyRedeem.get(`/api/v1/publish/transaction/`, { params })
}
const getsUserPoint = (params) => {
  return Client.get(`/api/user_points`, { params })
}
const getsOrderHistory = (customer_id, params) => {
  return ClientLoyaltyOrder.get(`/api/customer/${customer_id}/orders`, { params })
}
const getInfoCustomer = (id) => {
  return Client.get(`/api/users/${id}`)
}

const TagRepository = {
  login,
  gets,
  create,
  update,
  updateActive,
  remove,
  getsBurnPoint,
  getsUserPoint,
  getsOrderHistory,
  getInfoCustomer
}
export default TagRepository
