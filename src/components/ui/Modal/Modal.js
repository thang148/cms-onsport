import React, { Fragment } from "react"
const ModalCore = React.lazy(() => import("./ModalCore"))

export default function Modal({ visible, children, onCancel, closeClass }) {
  return (
    <Fragment>
      {visible && (
        <ModalCore onCancel={onCancel} closeClass={closeClass}>
          {children}
        </ModalCore>
      )}
    </Fragment>
  )
}
