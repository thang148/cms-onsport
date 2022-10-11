import getInstanceAxios from "utils/request"
const baseDomain = process.env.REACT_APP_DOMAIN_SUBSCRIPTION
const baseURL = `${baseDomain}/`

export default getInstanceAxios(baseURL)

// const Subcription = {
//   title: "Quản lý gói",
//   icon: (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke-width="1.5"
//       stroke="currentColor"
//       class="w-6 h-6"
//     >
//       <path
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
//       />
//     </svg>
//   ),
//   permission_required: "",
//   sub_menu: [
//     {
//       title: "Danh sách khách hàng",
//       url: "/customer",
//       code: "CUSTOMER_CONTROLLER",
//       permission_required: ""
//     },
//     {
//       title: "Subscription",
//       url: "/supscription",
//       code: "SUBSCRIPTION_CONTROLLER",
//       permission_required: ""
//     },
//     {
//       title: "Subscription Group",
//       url: "/subscripton-group",
//       code: "SUBSCRIPTION_CONTROLLER",
//       permission_required: ""
//     },
//     {
//       title: "Ticket",
//       url: "/ticket",
//       code: "TICKET_CONTROLLER",
//       permission_required: ""
//     }
//   ],
//   tab: [],
//   url: "/sub",
//   code: "SUBSCRIPTION_CONTROLLER"
// }
