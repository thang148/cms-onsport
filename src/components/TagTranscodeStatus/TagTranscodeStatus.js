import CONSTANT from "lib/constains"

export default function TagTranscodeStatus({ status }) {
  if (status === CONSTANT.TRANSCODE_DOING)
    return (
      <div className="bg-white p-1 h-7 bg-opacity-50 backdrop-blur-sm rounded text-primary">
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    )
  if (status === CONSTANT.TRANSCODE_ERROR)
    return (
      <div className="bg-white bg-opacity-50 font-semibold backdrop-blur-sm rounded text-red-500 px-2">
        Error
      </div>
    )
  return <div></div>
}
