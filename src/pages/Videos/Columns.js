import { LockOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import TagTranscodeStatus from "components/TagTranscodeStatus"
import CONSTANT from "lib/constains"
import { convertDurationToClock, convertLinkImg } from "lib/function"
import moment from "moment-timezone"
import "../Video/index.scss"

export default function columns({ onAction }) {
  return [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      minWidth: 340,
      fixed: "left",
      render: (v, r) => (
        <div className="flex gap-2 wapper__action">
          <div className="relative basis-28">
            {r?.is_drm && (
              <div className="__protected_content">
                <LockOutlined />
              </div>
            )}
            <div className="absolute top-1 right-1 z-20">
              <TagTranscodeStatus status={r?.trans_status} />
            </div>
            <div
              className="absolute
                text-xs
               right-1 bottom-1 bg-black/70 text-white px-1 rounded"
            >
              {convertDurationToClock(r?.duration)}
            </div>

            <div
              className="w-28 bg-slate-500 rounded-sm h-[63px] cursor-pointer"
              onClick={() => onAction("play", r)}
            >
              <img
                loading="lazy"
                className="rounded-sm"
                src={convertLinkImg(r?.image1, r?.url_img)}
                alt=""
              />
              {/* </Link> */}
            </div>
          </div>

          <div className="relative flex-grow">
            <div className="line-clamp-3">{v}</div>
            <div className="absolute px-2 py-2 w-full -bottom-2 opacity-0 -left-2 duration-200 ease-in-out __action">
              <div className="flex gap-3"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Transcode",
      dataIndex: "id",
      key: "id",
      width: 140,
      align: "center",
      render: (v, r) => (
        <div>
          {r?.trans_status === CONSTANT.TRANSCODE_ERROR && (
            <div className="flex justify-center">
              <button
                onClick={() => onAction("reload", r)}
                className="border px-2 h-[27px] border-red-500 text-red-500 rounded flex gap-1 items-center"
              >
                Thất bại
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          )}
          {r?.trans_status === CONSTANT.TRANSCODE_SUCCESS && (
            <span className="border px-2 py-1 border-green-500 text-green-500 rounded">
              Thành công
            </span>
          )}
          {r?.trans_status === CONSTANT.TRANSCODE_DOING && (
            <span className="border px-2 py-1 border-orange-500 text-orange-500 rounded">
              Transcoding
            </span>
          )}
        </div>
      )
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 150,
      render: (v) => (
        <Tooltip placement="topLeft" title={v}>
          <div className="line-clamp-3">{v}</div>
        </Tooltip>
      )
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      key: "created_date",
      width: 140,
      sorter: true,
      render: (v) => <div className="text-gray-400">{moment(v).format("HH:mm DD-MM-Y")}</div>
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "modified_date",
      key: "modified_date",
      width: 140,
      sorter: true,
      render: (v) => <div className="text-gray-400">{moment(v).format("HH:mm DD-MM-Y")}</div>
    }
  ]
}
