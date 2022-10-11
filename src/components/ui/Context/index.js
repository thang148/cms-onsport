import { useReducer, useMemo, createContext, useContext } from "react"
import { setAuthLocal, removeAuthLocal, getAuthLocal } from "lib/localstorage"
import KEY from "./Const"

function initialState() {
  let auth = {}
  if (getAuthLocal()) {
    auth = getAuthLocal()
  }
  return {
    ...auth
  }
}

function reducer(state, action) {
  switch (action.type) {
    case KEY.SET_AUTH:
      return { ...state, ...action.value }
    case KEY.SET_BLOCK:
      return { ...state, blocks: action.value }
    case KEY.SET_CHANNEL:
      return { ...state, channels: action.value }
    case KEY.SET_LEAGUE:
      return { ...state, leagues: action.value }
    case KEY.LOG_OUT:
      removeAuthLocal()
      return initialState()
    default:
      throw new Error()
  }
}

const MyContext = createContext(initialState())
MyContext.displayName = "MyContext"

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState())

  const setAuth = (value) => {
    setAuthLocal(value)
    return dispatch({ type: KEY.SET_AUTH, value })
  }

  const logOut = () => dispatch({ type: KEY.LOG_OUT })

  const value = useMemo(
    () => ({
      ...state,
      setAuth,
      logOut
    }),
    [state]
  )
  return <MyContext.Provider value={value} {...props} />
}

const useStore = () => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export default useStore
