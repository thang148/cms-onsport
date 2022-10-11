import Collapse from "components/Collapse"
import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import Logo from "images/LogoVina.svg"

export default function Navbar({ items, isNav }) {
  const location = useLocation()

  useEffect(() => {
    if (isNav === "left-0") {
      if (document.body.style.overflow !== "hidden") {
        document.body.style.overflow = "hidden"
      }
    }
    return () => {
      document.body.style.overflow = null
      document.body.style.width = null
    }
  }, [isNav])
  const wapperClass = isNav ? "show__sider" : "hide__sider"

  return (
    <div
      className={`bg-slate-900 z-12 sticky text-slate-400 h-screen border-r border-slate-700 top-0 shadow ease-in-out duration-300 ${wapperClass}`}
    >
      <Link to="/">
        <div
          className={`gap-3 border-b border-slate-700 px-6 h-14 flex text-xl font-bold items-center text-slate-50`}
        >
          <img src={Logo} alt="???" className="h-10 w-10" />
          {isNav && <div className="italic text-2xl font-black min-w-[154px]">Vina Sports</div>}
        </div>
      </Link>
      <div className={isNav ? "overflow-y-auto __scroll " : ""}>
        <div className="flex flex-col py-4">
          <ul className="space-y-2 ">
            {items.map((item) => {
              const { href, label, icon, children } = item
              if (children && children.length > 0) {
                return <MenuItem {...item} key={href} location={location} isNav={isNav} />
              } else {
                const activeClassName = location.pathname.includes(href)
                  ? "bg-white/20 text-slate-200"
                  : "text-slate-400"
                return (
                  <li key={href} className="px-4 list-none">
                    <NavLink to={href}>
                      <div className={`${activeClassName} menu__item`}>
                        {icon}
                        <span className="text-ellipsis flex-auto overflow-hidden whitespace-nowrap text-sm">
                          {label}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function MenuItem({ label, icon, href, children, location, isNav, closeSidebar }) {
  const [isOpen, setOpen] = useState(children.find((i) => location.pathname.includes(i.href)))
  function onTogle() {
    setOpen((c) => !c)
  }
  const activeClassname = location.pathname.includes(href) ? "bg-white/10 text-slate-300" : ""
  const classIsDown = isOpen ? "rotate-180" : "rotate-0"

  return (
    <div className="sub__menu relative text-sm">
      <li className="px-4">
        <div
          onClick={onTogle}
          className={`${activeClassname} rounded cursor-pointer hover:bg-white/20
        h-11 px-4 flex items-center justify-between gap-4`}
        >
          <div className="flex w-full items-center gap-4">
            {icon}
            <span className="text-ellipsis flex-auto overflow-hidden whitespace-nowrap">
              {label}
            </span>
          </div>
          {isNav && (
            <div className={`${classIsDown} flex items-center transition-all duration-300`}>
              {icDown}
            </div>
          )}
        </div>
      </li>
      <div className="h-[1px]"></div>
      <Collapse isOpen={isOpen} isShow={isNav}>
        <ul className="p-2 space-y-2 bg-white/10 rounded">
          {children.map((item) => {
            return (
              <li key={`${item.href}-${href}`}>
                <NavLink
                  to={`${item.href}`}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center text-slate-200 gap-4 py-1 px-4 rounded __active__sub__menu hover:text-white"
                      : "flex items-center text-slate-400 gap-4 py-1 px-4 rounded hover:text-white"
                  }
                >
                  <span className="text-ellipsis flex items-center gap-2 flex-auto overflow-hidden whitespace-nowrap">
                    <div className="h-[6px] w-[6px] bg-slate-400 rounded-full __icon_sub"></div>
                    {item.label}
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </Collapse>
    </div>
  )
}

const icDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)
