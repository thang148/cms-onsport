import Client from "../client/ClientOnSport"
const resource = "/api/v1"

const login = (data) => {
  return Client.post(`${resource}/authentications/login/`, data)
}

const getInfo = () => {
  return Client.get(`${resource}/account/information/`)
}

const getSignkey = () => {
  return Client.get(`${resource}/sign-key/`)
}

const changePassword = (data) => {
  return Client.put(`${resource}/account/password/`, data)
}

const userRepository = {
  login,
  getSignkey,
  getInfo,
  changePassword
}
export default userRepository
