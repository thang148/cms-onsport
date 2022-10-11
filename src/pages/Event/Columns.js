import { Fragment } from "react"
import { Dropdown, Tag, Tooltip } from "antd"
import { Link } from "react-router-dom"
import moment from "moment-timezone"
import {
  AppstoreAddOutlined,
  PlusOutlined,
  SendOutlined,
  StopOutlined,
  EditOutlined,
  ExpandOutlined,
  WechatOutlined
} from "@ant-design/icons"
import { liveTypes } from "lib/Const"

function getColor(value) {
  let color = "red"
  if (value === "not_started") color = "gold"

  if (value === "finish") color = ""
  return color
}

export default function columns(onAction) {
  return [
    {
      title: "Tên sự kiện",
      dataIndex: "name",
      key: "name",
      width: 250,
      fixed: "left",
      render: (name, r) => (
        <Tooltip title={name}>
          <div className="line-clamp-1">
            <Link to={`/event/detail/${r.id}`}>{name}</Link>
          </div>
        </Tooltip>
      )
    },
    {
      title: "Khối hiển thị",
      dataIndex: "screen_blocks",
      key: "screen_blocks",
      width: 180,
      render: (screen_blocks) => (
        <div className="capitalize">
          <div className="capitalize space-y-2">
            {screen_blocks?.map(({ name, id }) => {
              return <div key={id}>{name}</div>
            })}
          </div>
        </div>
      )
    },
    {
      title: "Loại sự kiện",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type) => <span>{liveTypes?.find((i) => i.value === type)?.name}</span>
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        return (
          <Tag color={getColor(status)}>{listStatus.find((i) => i.value === status)?.name}</Tag>
        )
      }
    },
    {
      title: "Hiển thị",
      dataIndex: "is_active",
      key: "is_active",
      width: 90,
      align: "center",
      render: (isActive) => {
        return <Tag color={isActive ? "blue" : "red"}>{isActive ? "Active" : "Inactive"}</Tag>
      }
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
      width: 150,
      sorter: true,
      render: (start_time) => (
        <div className="text-gray-400">{moment(start_time * 1000).format("HH:mm DD-MM-Y")}</div>
      )
    },
    {
      title: "Thời lượng",
      dataIndex: "over_time",
      key: "over_time",
      width: 90,
      render: (over_time, r) => (
        <div className="text-gray-400">
          {moment(over_time * 1000).diff(moment(r.start_time * 1000), "minutes")} Phút
        </div>
      )
    },

    {
      title: "Ngày tạo",
      dataIndex: "created",
      key: "created",
      width: 130,
      render: (v) => <span className="text-gray-400">{moment(v).format("HH:mm DD-MM-Y")}</span>
    },
    {
      title: "Kênh",
      dataIndex: "channel",
      key: "channel",
      width: 200,
      render: (v) => (
        <a href={`/channel?name=${v?.name}`} target="__blank">
          {v?.name}
        </a>
      )
    },
    {
      title: "Giải đấu",
      dataIndex: "league",
      key: "league",
      width: 200,
      render: (v) => <span>{v?.name}</span>
    },
    {
      title: "Quảng cáo",
      dataIndex: "skip_ads",
      key: "skip_ads",
      width: 100,
      align: "center",
      render: (skip_ads) => <div>{skip_ads ? "Tắt" : "Bật"}</div>
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center",
      fixed: "right",
      render: (v, r) => (
        <div className="article-action">
          <Dropdown
            placement="bottomRight"
            overlay={
              <div className="shadow_antd w-40 relative bottom-5">
                {r.status !== "finish" && (
                  <Fragment>
                    <div>
                      <Link to={`/event/${v}`}>
                        <div key="1">
                          <EditOutlined /> Chỉnh sửa
                        </div>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to={{
                          pathname: "/slide",
                          hash: "#slide"
                        }}
                        state={{ event_id: v, type_link: 1 }}
                      >
                        <div key="2">
                          <span className="text-blue-500">
                            <PlusOutlined /> Thêm slide
                          </span>
                        </div>
                      </Link>
                    </div>
                  </Fragment>
                )}
                <div key="3" onClick={() => onAction("addHighlight", v)}>
                  <span className="text-indigo-500">
                    <PlusOutlined /> Thêm highlight
                  </span>
                </div>
                {r.status === "finish" && (
                  <div key="6" onClick={() => onAction("fullmatch", v)}>
                    <span className="text-indigo-500">
                      <ExpandOutlined /> Fullmatch
                    </span>
                  </div>
                )}
                {r.status === "not_started" && (
                  <div key="4" onClick={() => onAction("start", v)}>
                    <span className="text-green-500">
                      <SendOutlined /> Bắt đầu
                    </span>
                  </div>
                )}
                {r.status === "live" && r.off_chat === false && (
                  <div key="6" onClick={() => onAction("chat", v)}>
                    <span className="text-blue-500">
                      <WechatOutlined /> Quản lý chat
                    </span>
                  </div>
                )}
                {r.status === "live" && (
                  <div key="5" onClick={() => onAction("end", r)}>
                    <span className="text-red-500">
                      <StopOutlined /> Kêt thúc
                    </span>
                  </div>
                )}

                {/* <Popconfirm
                  title="Bạn có chắc chắn muốn xóa?"
                  onConfirm={() => onAction("delete", v)}
                  okText="Yes"
                  cancelText="No"
                >
                  <div key="6" onClick={() => onAction("delete", v)}>
                    <span className="text-red-500">
                      <DeleteOutlined /> Xóa
                    </span>
                  </div>
                </Popconfirm> */}
              </div>
            }
          >
            <div className="text-blue-800 cursor-pointer flex justify-center items-center h-6">
              <AppstoreAddOutlined className="text-xl" />
            </div>
          </Dropdown>
        </div>
      )
    }
  ]
}

const listStatus = [
  { name: "Sắp diễn ra", value: "not_started" },
  { name: "Đang diễn ra", value: "live" },
  { name: "Kết thúc", value: "finish" }
]
