import { Skeleton } from "antd"

export default function SuspenseComponent() {
  return (
    <div className="wapper_small">
      <Skeleton.Button active shape="round" size="large" style={{ width: 200 }} className="mb-2" />
      <div className="__content mb-4">
        <Skeleton active paragraph={{ rows: 2 }} title={false} />
      </div>
      <div className="__content">
        <Skeleton active paragraph={{ rows: 18 }} title={false} />
      </div>
    </div>
  )
}
