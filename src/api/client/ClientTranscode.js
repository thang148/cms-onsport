import getInstanceAxios from "utils/request"
const baseDomain = process.env.REACT_APP_TRANSCODE
const baseURL = `${baseDomain}/api/v1/`

export default getInstanceAxios(baseURL)
