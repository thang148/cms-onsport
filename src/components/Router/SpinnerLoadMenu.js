import React from "react"
import "./index.scss"
const Spinner = ({ isShow }) => {
  const _class = isShow ? "overlay_show" : "overlay_hide"

  return (
    <div className={`box-bg fixed ${_class}`}>
      <div className="sk-cube-grid absolute">
        <div className="lds-hourglass "></div>
        <div className="text-center color f-500">ON NEWS</div>
      </div>
    </div>
  )
}

export default Spinner
