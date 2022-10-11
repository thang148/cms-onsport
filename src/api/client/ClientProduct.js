import getInstanceAxios from "utils/request"
const baseDomain = process.env.REACT_APP_PRODUCT
const baseURL = `${baseDomain}/`

export default getInstanceAxios(baseURL)
