import { Dropdown, Menu, Tag } from "antd"
import { AppstoreAddOutlined, PlusOutlined, EditOutlined, SendOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { leaguesDefault, sportTypeDefault } from "lib/Const"

export default function columns(onAction) {
  return [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      align: "center",
      width: 90,
      fixed: "left",
      render: (logo) => {
        return (
          <div className="flex justify-center">
            <img className="h-14" src={logo} alt="avatar" />
          </div>
        )
      }
    },
    {
      title: "Tên giải đấu",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 200,
      render: (text, r) => (
        <div>
          {text} [{r?.short_name}]
        </div>
      )
    },

    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: 170
    },
    {
      title: "Màu",
      dataIndex: "backgroud_color",
      key: "backgroud_color",
      width: 120,
      render: (backgroud_color) => {
        return (
          <div
            className="__color flex justify-center items-center text-white "
            style={{ backgroundColor: backgroud_color }}
          >
            <div>{backgroud_color}</div>
          </div>
        )
      }
    },
    {
      title: "Hoạt động",
      key: "is_active",
      dataIndex: "is_active",
      width: 90,
      align: "center",
      render: (isActive) => {
        return (
          <Tag className="rounded-xl" color={isActive ? "blue" : "red"}>
            {isActive ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    {
      title: "Hiển thị",
      key: "app_display",
      dataIndex: "app_display",
      width: 120,
      align: "center",
      render: (app_display) => {
        return (
          <Tag className="rounded-xl" color={app_display ? "blue" : "red"}>
            {app_display ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    {
      title: "Mùa giải",
      dataIndex: "current_season",
      key: "current_season",
      width: 170
    },
    {
      title: "Loại giải đấu",
      dataIndex: "league_type",
      key: "league_type",
      width: 100,
      render: (league_type) => (
        <span>{leaguesDefault?.find((i) => i.value === Number(league_type))?.name}</span>
      )
    },
    {
      title: "Bộ môn",
      dataIndex: "sport_type",
      key: "sport_type",
      width: 90,
      render: (sport_type) => (
        <span>{sportTypeDefault?.find((i) => i.value === Number(sport_type))?.name}</span>
      )
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 80,
      align: "center",
      render: (v, r) => (
        <div className="article-action">
          <Dropdown
            // trigger={["click"]}
            overlay={
              <Menu className="bottom-3">
                <Menu.Item key="1" onClick={() => onAction("edit", r)}>
                  <EditOutlined /> Chỉnh sửa
                </Menu.Item>
                <Menu.Item key="2" onClick={() => onAction("next", v)}>
                  <span className="text-blue-500">
                    <PlusOutlined /> Thêm sự kiện
                  </span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={`/team/${r?.league_sync_id}`}>
                    <span>
                      <SendOutlined /> Cập nhật đội bóng
                    </span>
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <div className="text-blue-800 cursor-pointer flex justify-center items-center h-12">
              <AppstoreAddOutlined className="text-xl" />
            </div>
          </Dropdown>
        </div>
      )
    }
  ]
}
