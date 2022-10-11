import React from "react"

import DropdownDrm from "components/DropdownDrm"

const Component = ({ onChange }) => {
  function onChangeDrm(v) {
    onChange(v)
  }

  return (
    <div className="border px-2 pb-4">
      <DropdownDrm onChange={onChangeDrm} />
    </div>
  )
}

export default Component
