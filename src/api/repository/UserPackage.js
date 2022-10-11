import Client from "../client/ClientProduct"
const resource = "/api"

const getListPackage = (params) => {
  return Client.get(`${resource}/packages`, { params })
}
const getPackage = (id) => {
  return Client.get(`${resource}/packages/${id}`)
}
const createPackage = (data) => {
  return Client.post(`${resource}/packages`, data)
}
const updatePackage = (id, data) => {
  return Client.put(`${resource}/packages/${id}`, data)
}
const TagRepository = {
  getListPackage,
  createPackage,
  updatePackage,
  getPackage
}
export default TagRepository
