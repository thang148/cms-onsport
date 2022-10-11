import Client from "../client/ClientOnSport"
const resource = "/api/v1"

const getTags = (params) => {
  return Client.get(`${resource}/tags/`, { params })
}

const createTags = (data) => {
  return Client.post(`${resource}/tags/`, data)
}

const updateTags = (data, tagId) => {
  return Client.put(`${resource}/tags/${tagId}/`, data)
}

const deleteTags = (tagId) => {
  return Client.delete(`${resource}/tags/${tagId}/`)
}

const TagRepository = {
  getTags,
  createTags,
  updateTags,
  deleteTags
}
export default TagRepository
