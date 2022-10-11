import { useState } from "react"
import { Drawer, Button } from "antd"
import FormUpdate from "./FormUpdate"

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  return (
    <Drawer
      title={item ? "Cập nhật" : "Thêm mới"}
      visible={visible}
      width={860}
      onClose={() => onClose(false)}
      footer={
        <div className="flex justify-end">
          <Button className="mr-4 w-150" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button
            type="primary"
            className="w-150"
            htmlType="submit"
            loading={loading}
            form="update_events"
          >
            {item ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      }
    >
      {visible && <FormUpdate onClose={onClose} item={item} setLoading={setLoading} />}
    </Drawer>
  )
}
