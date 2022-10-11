const expireDay = 1

function setLocalExpire(key, value, day) {
  const now = new Date()
  const item = {
    value: JSON.stringify(value),
    expiry: now.getTime() + day * 86400000
  }
  localStorage.setItem(key, JSON.stringify(item))
}

function getLocalExpire(key) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) return null
  const item = JSON.parse(itemStr)
  return item.value
}

export function setAuthLocal(auth) {
  setLocalExpire("auth", auth, expireDay)
}

function checkExpireToken() {
  const itemStr = localStorage.getItem("auth")
  if (!itemStr) return null
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    removeAuthLocal()
  }
}

export function getAuthLocal() {
  checkExpireToken()
  const auth = getLocalExpire("auth")
  if (auth) {
    return JSON.parse(auth)
  } else {
    return {}
  }
}

export function removeAuthLocal() {
  localStorage.clear()
}

export function setConfig(type, data) {
  localStorage.setItem(type, JSON.stringify(data))
}

export function getConfig(type) {
  const data = localStorage.getItem(type)
  if (data) {
    return JSON.parse(data)
  } else {
    return []
  }
}
