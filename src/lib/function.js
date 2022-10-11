import queryString from "query-string"
import { getConfig } from "./localstorage"

export function convertDurationToClock(n) {
  let h = Math.floor(n / 3600)
  let m = n % 3600
  let _m = Math.floor(m / 60)
  let s = m % 60
  if (h === 0) {
    h = ""
  } else {
    h = h + ":"
  }
  if (_m < 10) _m = "0" + _m
  if (s < 10) s = "0" + s
  return h + _m + ":" + s
}

export function numberToCurrency(text) {
  if (text)
    return Math.floor(text)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  return ""
}

export function converDataTree(_list, filter) {
  let list = [..._list]
  function loop(__list) {
    for (let i = 0; i < __list.length; i++) {
      __list[i].value = __list[i].id
      __list[i].title = __list[i].name

      if (__list[i].children && __list[i].children.length > 0) {
        if (filter) {
          __list[i].selectable = true
        } else {
          __list[i].selectable = false
        }
        loop(__list[i].children)
      }
    }
  }
  loop(list)
  return list
}

export function getUser() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : {}
}

export function setCategories(categories) {
  if (categories) localStorage.setItem("categories", JSON.stringify(categories))
}

export function getCategories() {
  const categories = localStorage.getItem("categories")
  return categories ? JSON.parse(categories) : false
}

export function getMenus() {
  const menus = localStorage.getItem("menus")
  return menus ? JSON.parse(menus) : []
}

export const paramsUrl = {
  get: () => {
    return queryString.parse(window.location.search)
  },
  set: (params) => {
    const currentUrlParams = queryString.stringify(params, {
      skipNull: true
    })
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${currentUrlParams.toString()}`
    )
  }
}

export function convertLinkImg(url, baseUrl) {
  const config = getConfig("base_link")
  if (config) {
    if (url?.includes("http")) return url
    return baseUrl ? baseUrl + url : config?.image_url + url
  }
  return ""
}

export function convertLinkVOD(url, baseUrl) {
  const config = getConfig("base_link")
  if (config) {
    if (url?.includes("http")) return url
    return baseUrl ? baseUrl + url + "/index.m3u8" : config?.vod_url + url + "/index.m3u8"
  }
  return ""
}
