const KEY = {
  SET_USER: "SET_USER",
  GET_MENUS: "GET_MENUS",
  LOADING: "LOADING",
  LINE_SHIP: "LINE_SHIP",
  SERVICES: "SERVICES",
  STATUS: "STATUS",
  LIST_CUSTOMER_SHIP: "LIST_CUSTOMER_SHIP",
  ERROR: "Network Error",
  SET_SELLERS: "SET_SELLERS",
  SET_SKUS: "SET_SKUS",
  SET_CARRIERS: "SET_CARRIERS",
  SELLER: "seller",
  CUSTOMER_SHIP: "customer_ship",
  SUPPLIER: "supplier",
  FULILLMENT: "fulfillment",
  SET_TOPUP: "SET_TOPUP",
  COUNT_MENUS: "COUNT_MENUS",
  VERSION_API: ""
}

export default KEY

export const articlePermissions = [
  { value: "published", permission: "can_change_published", text: "Đã đăng" },
  { value: "draft", permission: "can_change_draft", text: "Nháp" },
  { value: "waiting_accept", permission: "can_change_waiting_accept", text: "Chờ duyệt" },
  { value: "accepted", permission: "can_change_accepted", text: "Đã duyệt" },
  { value: "return", permission: "can_change_return", text: "Trả bài" },
  { value: "take_down", permission: "can_change_take_down", text: "Hạ bài" }
]

export const listType = [
  { value: "live", name: "Live", color: "red" },
  { value: "talkshow", name: "Talkshow", color: "green" },
  { value: "highlight", name: "Highlight", color: "pink" },
  { value: "fullmatch", name: "Fullmatch", color: "blue" }
]

export const listStatus = [
  { name: "Sắp diễn ra", value: "not_started" },
  { name: "Đang diễn ra", value: "live" },
  { name: "Kết thúc", value: "finish" }
]

export const leaguesDefault = [
  { name: "Cup", value: 0 },
  { name: "League", value: 1 }
]

export const sportTypeDefault = [
  { name: "Soccer", value: 1 },
  { name: "Tennis", value: 2 },
  { name: "Basketball", value: 3 },
  { name: "Golf", value: 4 },
  { name: "Volletball", value: 5 },
  { name: "Boxing", value: 6 }
]

export const liveTypes = [
  { value: 0, name: "Live", color: "red" },
  { value: 1, name: "Talkshow", color: "green" }
]

export const typeLinks = [
  {
    label: "Tin tức",
    value: 0
  },
  {
    label: "Sự kiện",
    value: 1
  },
  {
    label: "Video",
    value: 2
  }
]
