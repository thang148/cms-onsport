import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import { notification } from "antd"
import axiosRetry from "axios-retry"
import { getAuthLocal } from "lib/localstorage"

axiosRetry(axios, { retries: 3 })
const refreshAuthLogic = (failedRequest) =>
  axios
    .post(`${process.env.REACT_APP_DOMAIN}auth/refresh`, {
      refresh_token: getAuthLocal()?.refresh
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem("accessToken", tokenRefreshResponse.data.token)

      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.token

      return Promise.resolve()
    })
    .catch(() => {
      localStorage.clear()
      // axios.delete("/auth/register", { token: getRefreshToken() })
      window.location.href = "/login"
    })

export default function getInstanceAxios(baseAPI) {
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const instance = axios.create({
    baseURL: baseAPI
  })

  instance.interceptors.request.use(
    function (config) {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getAuthLocal() ? `Bearer ${getAuthLocal()?.token}` : undefined
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      try {
        if (response.status >= 200 && response.status < 300) return response.data
        return Promise.reject(response.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async function (error) {
      if (error.response) {
        const { response } = error
        console.log({ error })
        const data = response.data
        if (data && response.config.method !== "get" && response.status !== 500) {
          if (data && !data.message && Object.values(data).length > 0) {
            if (data.length > 0) {
              data.forEach((item) => {
                notification.error({
                  message: item,
                  duration: 3
                })
              })
            } else {
              Object.values(data).forEach((item) => {
                notification.error({
                  message: item[0],
                  duration: 3
                })
              })
            }
          } else {
            notification.error({
              message: data?.message || data?.error_message
            })
          }
        }
      }
      return Promise.reject(error)
    }
  )

  createAuthRefreshInterceptor(instance, refreshAuthLogic)
  return instance
}
