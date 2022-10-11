import getInstanceAxios from "utils/request"
const baseDomain = process.env.REACT_APP_DOMAIN_ONSPORT
const baseURL = `${baseDomain}/`

export default getInstanceAxios(baseURL)
