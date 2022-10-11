import { forwardRef } from "react"
import { SketchPicker } from "react-color"
import useComponentVisible from "components/ClickOutSide"

const Color = forwardRef(({ value, onChange }, reff) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  function onChangeColor(params) {
    onChange(params.hex)
  }
  return (
    <div ref={reff}>
      <div
        className="_color_leagues"
        style={{ backgroundColor: value }}
        onClick={() => setIsComponentVisible(true)}
      >
        <span className="text-white">{value}</span>
        <div ref={ref}>
          {isComponentVisible && (
            <div className="absolute top-full left-0 z-10">
              <SketchPicker color={value} onChange={onChangeColor} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default Color
