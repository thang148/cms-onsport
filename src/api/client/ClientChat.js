import getInstanceAxios from "utils/request"
const baseDomain = process.env.REACT_APP_CHAT
const baseURL = `${baseDomain}/`

export default getInstanceAxios(baseURL)
