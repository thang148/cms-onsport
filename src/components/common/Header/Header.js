import React from "react"
import { Dropdown, Avatar } from "antd"
import { useNavigate, Link } from "react-router-dom"
import { UserOutlined, LoginOutlined } from "@ant-design/icons"
import { useStore } from "components/ui"

const MyMenu = () => {
  const { logOut } = useStore()
  const navigate = useNavigate()

  function handleLogout() {
    logOut()
    navigate("/login")
  }

  return (
    <div className="p-4 shadow_antd space-y-4 bg-white rounded">
      <Link to="/profile" className="cursor-pointer text-slate-900 hover:text-primary">
        <UserOutlined /> &nbsp;Thông tin tài khoản
      </Link>

      <div onClick={handleLogout} className="cursor-pointer hover:text-primary">
        <LoginOutlined />
        &nbsp; Đăng xuất
      </div>
    </div>
  )
}

const Header = ({ user }) => {
  console.log(user?.avatar)
  return (
    <div className="flex">
      <Dropdown overlay={<MyMenu />} placement="bottomLeft">
        <div className="cursor-pointer flex jutify-center items-center">
          <div className="flex items-center justify-center hover-sb mr-2">
            <Avatar
              size={30}
              onClick={(e) => e.preventDefault()}
              src={
                user?.avatar ||
                "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F613df8e8d679a21b766a1636%2Fbigbun-2%2F960x0.jpg%3Ffit%3Dscale"
              }
            />
          </div>
          <span className="user-name text-white">{user?.name}</span>
          <div className="h-6 w-6 hidden"></div>
        </div>
      </Dropdown>
    </div>
  )
}

export default Header
