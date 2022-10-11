import React, { Fragment, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import "./index.css"

export default function ModalCore({ children }) {
  const __el = useRef(document.createElement("div"))

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root")
    modalRoot.appendChild(__el.current)
    document.body.style.overflow = "hidden"
    return () => {
      modalRoot.innerHTML = ""
      document.body.style.overflow = "inherit"
    }
  }, [])

  return ReactDOM.createPortal(
    <Fragment>
      <div className="w-full bg-gray-100 fixed inset-0 __root__content h-100vh overflow-auto">
        {children}
      </div>
    </Fragment>,
    __el.current
  )
}
