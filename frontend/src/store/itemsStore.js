import { Axios } from "@/utils/axiosConfig"

const state = {
  items: [],
  item: {},
  pagination: {},
  message: "",
  status: "",
}

const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload
  },

  SET_PAGINATION(state, payload) {
    state.pagination = payload
  },

  SET_ITEM(state, payload) {
    state.item = payload
  },

  SET_MESSAGE(state, payload) {
    state.message = payload
  },

  SET_STATUS(state, payload) {
    state.status = payload
  },
}

const actions = {
  getAllItems: async ({ commit }, query) => {

    try {
      const { data } = query ? await Axios.get(`/order_items${query}`) : await Axios.get("/order_items")

      commit("SET_ITEMS", data.data)
      commit("SET_PAGINATION", data.pagination)

    } catch (e) {
      console.log(e?.response.data)
    }
  },

  getOneItem: async ({ commit }, orderID) => {
    try {
      const { data } = await Axios.get(`/order_items/${orderID}`)

      commit("SET_ITEM", data?.order)
    } catch (e) {
      console.log(e?.response.data)
    }
  },

  updateOneItem: async ({ commit }, formData) => {
    const { id, ...rest } = formData
    try {
      const { data } = await Axios.patch(`/order_items/${id}`, rest)

      commit("SET_ITEM", data.order)
      commit("SET_STATUS", data.status)
      commit("SET_MESSAGE", data.message)

      setTimeout(() => {
        commit("SET_STATUS", "")
        commit("SET_MESSAGE", "")
      }, 5000)
    } catch (e) {
      commit("SET_STATUS", "failed")
      commit("SET_MESSAGE", e?.response.data)
      console.log(e?.response.data)
    }
  },

  deleteOneItem: async ({ commit }, id) => {
    try {
      const { data } = await Axios.delete(`/order_items/${id}`)

      commit("SET_ITEM", {})

      commit("SET_STATUS", data.status)
      commit("SET_MESSAGE", data.message)

      setTimeout(() => {
        commit("SET_STATUS", "")
        commit("SET_MESSAGE", "")
      }, 5000)
      console.log(data.message)
    } catch (e) {
      commit("SET_STATUS", "failed")
      commit("SET_MESSAGE", e?.response.data)

      setTimeout(() => {
        commit("SET_STATUS", "")
        commit("SET_MESSAGE", "")
      }, 5000)
      console.log(e?.response.data)
    }
  },
}

export const ItemsModules = { namespaced: true, state, mutations, actions }
