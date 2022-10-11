import { Dropdown, Popconfirm, Tag, Tooltip } from "antd"
import {
  AppstoreAddOutlined,
  EditOutlined,
  DeleteOutlined,
  SendOutlined,
  LockOutlined
} from "@ant-design/icons"
import moment from "moment-timezone"
import { convertLinkImg } from "lib/function"
import { Link } from "react-router-dom"
import { message } from "antd"

function timeConvert(n) {
  let h = Math.floor(n / 3600)
  let m = n % 3600
  let _m = Math.floor(m / 60)
  let s = m % 60
  if (h === 0) {
    h = ""
  } else {
    h = h + ":"
  }
  if (_m < 10) _m = "0" + _m
  if (s < 10) s = "0" + s
  return h + _m + ":" + s
}

function convertHourToDay(n) {
  let d = Math.floor(Number(n) / 24) > 0 ? Math.floor(Number(n) / 24) : 0
  let h = n % 24 > 0 ? n % 24 : 0
  if (d < 10) d = "0" + d
  if (h < 10) h = "0" + h
  return d + "ngày " + h + "giờ"
}

function isExpire(video) {
  const { expire_date, link, is_fullmatch, event } = video
  if (is_fullmatch) {
    if (!link && moment(expire_date).diff(moment(), "seconds") < 0) {
      return "exprire"
    }
    if (moment().diff(moment(event?.start_time * 1000), "minutes") < 0) {
      return "not_start"
    }
  }

  return false
}

export default function columns(onAction) {
  async function onPlay(r) {
    if (isExpire(r)) {
      message.error("Event đã hết hạn hoặc chưa bắt đầu không thể play")
    } else {
      onAction("play", r)
    }
  }

  return [
    {
      title: "Tên sự video",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 350,
      render: (text, r) => {
        const check = isExpire(r)
        return (
          <div className="flex space-x-2">
            <div className="relative cursor-pointer" onClick={() => onPlay(r)}>
              <img src={convertLinkImg(r?.thumbnail)} alt={""} className="__image" />
              {r?.is_protected && (
                <div className="__protected">
                  <LockOutlined />
                </div>
              )}
              <div className="__time">{timeConvert(r?.duration)}</div>
              {check && (
                <div className="__false">
                  <div className="error__text text-white bg-red-600 bg-opacity-60 px-1 rounded">
                    {check === "exprire" ? "Quá hạn" : "Not start"}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="line-clamp-3">{text}</div>
            </div>
          </div>
        )
      }
    },
    {
      title: "Ngày hết hạn",
      key: "expire_date",
      dataIndex: "expire_date",
      width: 180,
      render: (expire_date, r) => (
        <div>
          {r.is_fullmatch && !r?.link && (
            <div className="text-gray-500">
              <div className="cursor-pointer">
                {!r?.link_transcode_temp && (
                  <div>
                    <div>{moment(expire_date).format("HH:mm DD-MM-Y")}</div>
                    <div className="text-sm">
                      Còn lại: {convertHourToDay(moment(expire_date).diff(moment(), "hours"))}
                    </div>
                    <Link to={`/video/${r?.id}`}>
                      <div className="flex space-x-1 items-center text text-blue-900">
                        <div className="text-red-700 flex items-center">{icW}</div>
                        <div>Update link</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Khối hiển thị",
      dataIndex: "screen_blocks",
      key: "screen_blocks",
      width: 180,
      render: (screen_blocks) => {
        return (
          <Tooltip
            className="capitalize space-y-2"
            title={
              <div>
                {screen_blocks?.map(({ name, id }) => {
                  return <div key={id}>{name}</div>
                })}
              </div>
            }
          >
            <div className="line-clamp-2">
              {screen_blocks?.map(({ name, id }) => {
                return <div key={id}>{name}</div>
              })}
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: "Sự kiện liên kết",
      dataIndex: "event",
      key: "event",
      width: 230,
      render: (item) => (
        <div>
          {item?.name && (
            <Tooltip title={item?.name}>
              <a href={item?.link}>
                <div className="line-clamp-2">{item?.name}</div>
              </a>
            </Tooltip>
          )}
        </div>
      )
    },
    {
      title: "Content ID",
      dataIndex: "content_id",
      key: "content_id",
      width: 130,
      render: (v) => <span>{v}</span>
    },
    {
      title: "Hiển thị",
      key: "is_active",
      dataIndex: "is_active",
      width: 90,
      align: "center",
      render: (is_active) => {
        return (
          <Tag className="rounded-xl" color={is_active ? "blue" : "red"}>
            {is_active ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    {
      title: "Ngày tạo",
      dataIndex: "created",
      key: "created",
      width: 130,
      render: (created) => (
        <span className="text-gray-400">{moment(created).format("HH:mm DD-MM-Y")}</span>
      )
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
            overlay={
              <div className="shadow_antd w-40 relative bottom-5">
                <Link to={`/video/${r?.id}`}>
                  <div key="1">
                    <EditOutlined /> Chỉnh sửa
                  </div>
                </Link>
                {r?.screen_block?.block_type === "fullmatch" &&
                  r?.link_transcode_temp &&
                  !r?.is_change_transcode && (
                    <div key="2" onClick={() => onAction("public", v)}>
                      <span className="text-blue-500">
                        <SendOutlined /> Xuất bản
                      </span>
                    </div>
                  )}
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa?"
                  onConfirm={() => onAction("delete", v)}
                  okText="Yes"
                  cancelText="No"
                >
                  <div key="3" type="link">
                    <span className="text-red-500">
                      <DeleteOutlined /> Xóa
                    </span>
                  </div>
                </Popconfirm>
              </div>
            }
          >
            <div className="text-blue-800 cursor-pointer flex justify-center items-center h-14">
              <AppstoreAddOutlined className="text-xl" />
            </div>
          </Dropdown>
        </div>
      )
    }
  ]
}
const icW = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
)
