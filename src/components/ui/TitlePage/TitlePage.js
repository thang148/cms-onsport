import { Button } from "antd"
import { useNavigate } from "react-router-dom"
export default function MyPagination({ title, canGoBack = true }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center mb-2">
      {canGoBack ? (
        <Button
          type="text"
          size="large"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="#475569"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          }
          onClick={() => navigate(-1)}
        />
      ) : null}

      <div className="font-semibold text-lg text-slate-600">{title}</div>
    </div>
  )
}
