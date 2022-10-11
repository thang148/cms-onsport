import getInstanceAxios from "utils/request"
const baseDomain = process.env.REACT_APP_API_UPLOAD
const baseURL = `${baseDomain}/`

export default getInstanceAxios(baseURL)
