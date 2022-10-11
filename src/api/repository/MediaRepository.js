import Client from "../client/ClientMedia"

const resource = "/api/v1"

const getTrees = () => {
  return Client.get(`${resource}/file/treefolder`)
}

const getDetailFolder = (params) => {
  return Client.get(`${resource}/file/data/`, { params })
}

const createFolder = (data) => {
  return Client.post(`${resource}/file/folder`, data)
}

const updateFolder = (data) => {
  return Client.put(`${resource}/file/folder`, data)
}

const deleteFile = (data) => {
  return Client.delete(`${resource}/file`, { data })
}

const saveDataStorage = (formData, headers) => {
  return Client.post(`${resource}/file/image`, formData, { headers: headers })
}

const checkStatusTranscode = (data) => {
  return Client.post(`${resource}/file/checkstatus`, data)
}

const uploadImage = (data) => {
  return Client.post(`${resource}/file/upload/image?is_get_default_url=true`, data)
}

const getDrms = () => {
  return Client.get(`${resource}/file/listdrm`)
}

const transcode = (data) => {
  return Client.post(`${resource}/file/transcodedrm`, data)
}

const getfolderOnTV = (params) => {
  return Client.get(`${resource}/file/getfoldernas`, { params })
}

const MediaRepository = {
  getTrees,
  getDetailFolder,
  createFolder,
  updateFolder,
  deleteFile,
  saveDataStorage,
  checkStatusTranscode,
  uploadImage,
  getDrms,
  transcode,
  getfolderOnTV
}
export default MediaRepository
