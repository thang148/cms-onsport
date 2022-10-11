import Client from "../client/ClientProduct"
const resource = "/api"

const getListProduct = (id, params) => {
  return Client.get(`${resource}/packages/${id}/products`, { params })
}
const createProduct = (data) => {
  return Client.post(`${resource}/products`, data)
}
const updateProduct = (id, data) => {
  return Client.put(`${resource}/products/${id}`, data)
}
const deleteProduct = (id, data) => {
  return Client.delete(`${resource}/products/${id}`)
}
const TagRepository = {
  getListProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
export default TagRepository
