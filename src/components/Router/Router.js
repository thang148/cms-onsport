import { Suspense } from "react"
import { Outlet, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Layout from "components/common/Layout"
import { Result } from "antd"
import SuspenseComponent from "./SuspenseComponent"
import pageList from "./PageList"
import Login from "pages/Authen/Login"
import { useStore } from "components/ui"

function ProtectedRoute() {
  return (
    <Layout>
      <Suspense fallback={<SuspenseComponent />}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}

export default function Routers() {
  const { token, menus } = useStore()

  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route element={<ProtectedRoute />}>
              {pageList().map(({ Element, code, path }, key) => {
                const item = menus?.find((i) => i.code === code)
                return <Route path={path} key={key} element={<Element tabs={item?.tab} />} />
              })}
              <Route path="*" element={<NotLoadAuthorization />} />
            </Route>
          </>
        ) : (
          <Route element={<Outlet />}>
            <Route path="*" element={<Login />} />
          </Route>
        )}
      </Routes>
    </Router>
  )
}

const NotLoadAuthorization = () => {
  return (
    <div className="__content">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/">Back Home</Link>}
      />
    </div>
  )
}
