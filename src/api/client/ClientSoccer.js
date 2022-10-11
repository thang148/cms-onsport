import getInstanceAxios from "utils/request"
const baseDomain = process.env.REACT_APP_DOMAIN_SOCCER
const baseURL = `${baseDomain}/`

export default getInstanceAxios(baseURL)
