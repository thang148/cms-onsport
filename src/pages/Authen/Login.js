import { Form, Input, Button, Card } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { apiUserOnSport } from "api"
import { useNavigate } from "react-router-dom"
import BackgroundLogin from "images/background-image.png"
import LogoVina from "images/LogoVina.svg"
import { useState } from "react"
import { setConfig } from "lib/localstorage"
import { useStore } from "components/ui"

const Login = () => {
  const { setAuth } = useStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      let res = {}
      res = await apiUserOnSport.login(values)
      const { user, token, menu, logo_side_bar, permissions, base_link, refresh } = res
      setLoading(false)
      setAuth({
        token,
        refresh,
        user: user,
        menus: menu,
        logo: logo_side_bar,
        permissions
      })

      setConfig("base_link", base_link)
      getKey()
      navigate("/event")
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  async function getKey() {
    try {
      const { sign_key } = await apiUserOnSport.getSignkey()
      localStorage.setItem("signKey", sign_key)
    } catch (error) {
      throw error
    }
  }

  function onLogin() {
    const values = {
      username: "huyhq",
      password: "000000a"
    }

    onFinish(values)
  }
  const isDev =
    process.env.NODE_ENV === "development" || window.location.host === "cms.vinasports.net"
  return (
    <div>
      <img src={BackgroundLogin} alt="BackgroundLogin" className="w-full h-screen" />
      <div className="fixed w-full inset-0 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <div className="flex justify-center mb-5">
            <img src={LogoVina} alt="Logo" />
          </div>
          <h1 className="text-center">Đăng Nhập</h1>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item name="username" rules={[{ required: true, message: "Hãy điền tài khoản!" }]}>
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tài khoản"
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Hãy điền mật khẩu!" }]}>
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                className="mb-8"
                placeholder="Mật khẩu"
              />
            </Form.Item>

            {isDev && (
              <div className="flex justify-center p-2">
                <Button onClick={onLogin}>DemoLogin</Button>
              </div>
            )}
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login
