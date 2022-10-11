import { Space, Button, Popconfirm, Tag, Tooltip } from "antd"

export default function columns(onAction) {
  return [
    {
      title: "Tên vai trò",
      dataIndex: "name",
      key: "name",
      width: 150
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (v) => (
        <Tooltip title={v}>
          <div className="line_clamp1" style={{ maxWidth: 200 }}>
            {v}
          </div>
        </Tooltip>
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "isActived",
      key: "isActived",
      width: 140,
      render: (v) => <span> {v ? <Tag color="#108ee9">Hoạt động</Tag> : <Tag>Khóa</Tag>}</span>
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (v, r) => (
        <Space>
          <Button type="link" onClick={() => onAction("edit", r)}>
            Edit
          </Button>
          {/* <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => onAction("delete", v)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm> */}
        </Space>
      )
    }
  ]
}
