import Client from "../client/ClientOnSport"
const resource = "/api/v1"

const getGroups = () => {
  return Client.get(`${resource}/groups/`)
}

const getVisiblePermission = (idGroup) => {
  return Client.get(`${resource}/group/${idGroup}/permissions/visible/`)
}

const getCurrentPermission = (idGroup) => {
  return Client.get(`${resource}/group/${idGroup}/permissions/`)
}

const updatePermission = (data, idGroup) => {
  return Client.put(`${resource}/group/${idGroup}/permissions/`, data)
}

const getStaffs = (params) => {
  return Client.get(`${resource}/staffs/`, { params })
}

const createStaff = (data) => {
  return Client.post(`${resource}/staffs/`, data)
}

const updateStaff = (data, staffId) => {
  return Client.put(`${resource}/staff/${staffId}/`, data)
}

const getMenus = () => {
  return Client.get(`${resource}/menu/`)
}

const getPermissions = () => {
  return Client.get(`${resource}/account/permissions/`)
}

const PermissionRepository = {
  getGroups,
  getVisiblePermission,
  getCurrentPermission,
  updatePermission,
  getStaffs,
  createStaff,
  updateStaff,
  getMenus,
  getPermissions
}
export default PermissionRepository
