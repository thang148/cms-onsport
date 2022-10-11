import Client from "../client/ClientOnSport"
const resource = "/api/v1"

// API CATEGORY
const getCategoryMiniGame = (params) => {
  return Client.get(`${resource}/mini-game-category/`, { params })
}
const createCategoryMiniGame = (data) => {
  return Client.post(`${resource}/mini-game-category/create/`, data)
}
const updateCategoryMiniGame = (id, data) => {
  return Client.put(`${resource}/mini-game-category/update/${id}/`, data)
}
function deleteCategoryMiniGame(id) {
  return Client.delete(`${resource}/mini-game-category/delete/${id}/`)
}
// END API CATEGORY
// API GAMETYPE
const getGameType = (params) => {
  return Client.get(`${resource}/game-type/`, { params })
}
// API MINIGAME
const getMiniGame = (params) => {
  return Client.get(`${resource}/mini-games/`, { params })
}
const createMiniGame = (data) => {
  return Client.post(`${resource}/mini-games/`, data)
}
const updateMiniGame = (id, data) => {
  return Client.put(`${resource}/mini-game/${id}/`, data)
}
function deleteMiniGame(id) {
  return Client.delete(`${resource}/mini-game/${id}/`)
}
//END API MINIGAME
const getAllMiniGamesEvent = (params) => {
  return Client.get(`${resource}/mini-game/event/`, { params })
}
const getDetailMiniGame = (id, params) => {
  return Client.get(`${resource}/mini-game/event/${id}/`, { params })
}
const createMiniGameEvent = (data) => {
  return Client.post(`${resource}/mini-game/event/create/`, data)
}
const updateMiniGameEvent = (id, data) => {
  return Client.put(`${resource}/mini-game/event/update/${id}/`, data)
}
function deleteMiniGameEvent(id) {
  return Client.delete(`${resource}/mini-game/event/delete/${id}/`)
}
const cancelMiniGameEvent = (id) => {
  return Client.put(`${resource}/mini-game/cancel-event/${id}/`)
}
const getEventsLive = (params) => {
  return Client.get(`${resource}/events/?type=0&page_num=1&page_size=20`, { params })
}

const getDetailEvent = (id) => {
  return Client.get(`${resource}/event/${id}/`)
}
//API RESULT
const confirmResultEvent = (data) => {
  return Client.post(`${resource}/confirm-result-event/`, data)
}

const api = {
  // API CATEGORY
  getCategoryMiniGame,
  createCategoryMiniGame,
  updateCategoryMiniGame,
  deleteCategoryMiniGame,
  // API GAME TYPE
  getGameType,
  // API MINIGAME
  getMiniGame,
  createMiniGame,
  updateMiniGame,
  deleteMiniGame,
  // API MINIGAME
  getAllMiniGamesEvent,
  getDetailMiniGame,
  createMiniGameEvent,
  updateMiniGameEvent,
  cancelMiniGameEvent,
  deleteMiniGameEvent,
  getEventsLive,
  getDetailEvent,
  //API RESULT
  confirmResultEvent
}
export default api
