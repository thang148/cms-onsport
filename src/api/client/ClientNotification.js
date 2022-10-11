import getInstanceAxios from "utils/request"
const baseDomain = process.env.REACT_APP_NOTIFICATION
const baseURL = `${baseDomain}/`

export default getInstanceAxios(baseURL)
