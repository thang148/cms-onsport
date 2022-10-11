import { lazy } from "react"

const Channel = lazy(() => import("pages/Channel"))
const Event = lazy(() => import("pages/Event"))
const Leagues = lazy(() => import("pages/Leagues"))
const Slide = lazy(() => import("pages/Slide"))
const Video = lazy(() => import("pages/Video"))
const PageUpdateVideo = lazy(() => import("pages/Video/PageUpdateVideo"))
const Screenblocks = lazy(() => import("pages/Screenblocks"))
const Permission = lazy(() => import("pages/Permission"))
const PermissionDetail = lazy(() => import("pages/Permission/PermissionDetail"))
const EventDetail = lazy(() => import("pages/EventDetail"))
// const FolderNas = lazy(() => import("pages/Event/ModalNas/FolderNas"))
const PageUpdateEvent = lazy(() => import("pages/Event/PageUpdateEvent"))
const Team = lazy(() => import("pages/Team"))
const Version = lazy(() => import("pages/Version"))
const BannerWeb = lazy(() => import("pages/BannerWeb"))
const Chat = lazy(() => import("pages/Chat"))
const Notification = lazy(() => import("pages/Notification"))
const BlockKeywords = lazy(() => import("pages/BlockKeywords"))
const Advertising = lazy(() => import("pages/Advertising"))
const MiniGame = lazy(() => import("pages/MiniGame"))
const EventMiniGame = lazy(() => import("pages/EventMiniGame"))
const Tag = lazy(() => import("pages/Tag"))
const Videos = lazy(() => import("pages/Videos"))
const BlockContent = lazy(() => import("pages/Screenblocks/BlockContent"))
const SettingDRM = lazy(() => import("pages/SettingDRM"))
//sub
const Identity = lazy(() => import("pages/Sub/Identity"))
const Supscription = lazy(() => import("pages/Sub/Supscription"))
const Ticket = lazy(() => import("pages/Sub/Ticket"))
const DetailIdentity = lazy(() => import("pages/Sub/Identity/DetailIdentity"))
const Product = lazy(() => import("pages/Sub/Product"))
const SubGroup = lazy(() => import("pages/Sub/SubGroup"))

function pageList(__role) {
  return [
    {
      Element: Leagues,
      path: "/league",
      code: "LEAGUE_CONTROLLER"
    },
    {
      Element: Event,
      path: "/event",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: Slide,
      path: "/slide",
      code: "SLIDE_CONTROLLER"
    },
    {
      Element: Channel,
      path: "/channel",
      code: "CHANNEL_CONTROLLER"
    },
    {
      Element: Video,
      path: "/video",
      code: "VIDEO_CONTROLLER"
    },
    {
      Element: PageUpdateVideo,
      path: "/video/:video_id",
      code: "VIDEO_CONTROLLER"
    },
    {
      Element: Screenblocks,
      path: "/type-event",
      code: "TYPE_EVENT_CONTROLLER"
    },
    {
      Element: BlockContent,
      path: "/type-event/block/:block_id",
      code: "TYPE_EVENT_CONTROLLER"
    },
    {
      Element: Permission,
      path: "/staff/:tab",
      code: "STAFF_CONTROLLER"
    },
    {
      Element: PermissionDetail,
      path: "/staff/groups/:id/:name",
      code: "STAFF_CONTROLLER"
    },
    {
      Element: EventDetail,
      path: "/event/detail/:event_id",
      code: "EVENT_CONTROLLER"
    },
    // {
    //   Element: FolderNas,
    //   path: "/event/create",
    //   code: "EVENT_CONTROLLER"
    // },
    {
      Element: PageUpdateEvent,
      path: "/event/:event_id",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: Team,
      path: "/team/:league_sync_id",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: Version,
      path: "/version",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: BannerWeb,
      path: "/banner",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: Chat,
      path: "/chat/chat-manage",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: Notification,
      path: "/notification",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: BlockKeywords,
      path: "/chat/block-keywords",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: Advertising,
      path: "/app-config",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: MiniGame,
      path: "/game/mini-game",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: EventMiniGame,
      path: "/game/event-mini-game",
      code: "EVENT_CONTROLLER"
    },
    {
      Element: Tag,
      path: "/Tag",
      code: "EVENT_CONTROLLER"
    },
    {
      path: "/contents",
      Element: Videos,
      code: "EVENT_CONTROLLER"
    },
    {
      path: "/settings",
      Element: SettingDRM,
      code: "SETTING_CONTROLLER"
    },
    //sub
    {
      Element: Identity,
      path: "subscription/customer",
      code: "CUSTOMER_CONTROLLER"
    },
    {
      Element: DetailIdentity,
      path: "subscription/customer/:id",
      code: "CUSTOMER_CONTROLLER"
    },
    {
      Element: Supscription,
      path: "subscription/subscription",
      code: "SUBSCRIPTION_CONTROLLER"
    },
    {
      Element: SubGroup,
      path: "subscription/subscripton-group",
      code: "SUBSCRIPTION_CONTROLLER"
    },
    {
      Element: Ticket,
      path: "subscription/ticket",
      code: "TICKET_CONTROLLER"
    },
    {
      Element: Product,
      path: "subscription/product/:package_id",
      code: "SUBSCRIPTION_CONTROLLER"
    }
  ]
}

export default pageList
