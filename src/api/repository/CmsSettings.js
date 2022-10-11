import Client from "../client/Client"
const resource = "/api/v1"

const getCmsSettings = () => {
  return Client.get(`${resource}/cms-settings/`)
}

const updateCmsSettings = (data) => {
  return Client.put(`${resource}/cms-settings/${data.id}/`, data)
}

const CmsSettingsRepository = {
  getCmsSettings,
  updateCmsSettings
}
export default CmsSettingsRepository
