import { createRouter, createWebHistory } from "vue-router"
import { useStore } from "vuex"
import Home from "../views/Home.vue"
// import ItemEdit from "../views/Items/ItemEdit"
// import ItemDetails from "../views/Items/ItemDetails"
// import Items from "../views/Items/Items"

const store = useStore()

const localUser = localStorage.getItem("user")
const user = store?.state.Account.user || (localUser && JSON.parse(localUser))
const publicPages = ["/"]

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // beforeEnter: (to, from, next)=>{
    //   const authRequired = !publicPages.includes(to.path)
    //   if (authRequired && user) return next({ name: "Items" })
    // }
  },

  // {
  //   path: "/items",
  //   name: "Items",
  //   component: Items,
  // },
  //
  // {
  //   path: "/items/:id",
  //   name: "ItemDetails",
  //   component: ItemDetails,
  // },
  //
  // {
  //   path: "/items/:itemID/edit",
  //   name: "EditItem",
  //   component: ItemEdit,
  // },

  {
    path: "/items",
    name: "Items",
    component: () => import("../views/Items/Items"),
    props: true,
  },

  {
    path: "/items/:id",
    name: "ItemDetails",
    component: () => import("../views/Items/ItemDetails"),
  },

  {
    path: "/items/:id/edit",
    name: "EditItem",
    component: () => import("../views/Items/ItemEdit"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authRequired = !publicPages.includes(to.path)

  // if (from.name === "Home" && user) return router.push({ name: "Items" })

  if (authRequired && !user) return next({ name: "Home" })

  if (!authRequired && user) return next({ name: "Items" })

  return next()
})

export default router
