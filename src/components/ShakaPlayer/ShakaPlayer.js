import { memo, useEffect } from "react"
import muxjs from "mux.js"
import "shaka-player/dist/controls.css"
import CorePlayer from "./CorePlayer"
import CorePlayerDrm from "./CorePlayerDrm" /* Shaka player CSS import */
window.muxjs = muxjs

function ShakaPlayer(props) {
  useEffect(() => {
    window.muxjs = muxjs
  }, [])

  return (
    <div>
      {props?.is_protected === true ? <CorePlayerDrm {...props} /> : <CorePlayer {...props} />}
    </div>
  )
}

export default memo(ShakaPlayer)
