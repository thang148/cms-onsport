import React, { useEffect } from "react"
import { StoreProvider } from "components/ui/Context"
import Routes from "components/Router"
import "./taiwind.css"
import "antd/dist/antd.less"
import "./Base.css"

function App() {
  useEffect(() => {
    window.addEventListener("error", (e) => {
      // prompt user to confirm refresh
      if (/Loading chunk [\d]+ failed/.test(e.message)) {
        window.location.reload()
      }
    })
  }, [])

  return (
    <div className="App">
      <StoreProvider>
        <Routes />
        <div id="modal-root"></div>
      </StoreProvider>
    </div>
  )
}

export default App
