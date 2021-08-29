import { Axios } from "@/utils/axiosConfig"
// import Router from '../router'

const state = {
  user: null,
  token: "",
  message: "",
}

const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },

  SET_TOKEN(state, payload) {
    state.token = payload
  },

  SET_MESSAGE(state, payload) {
    state.message = payload
  },
}

const actions = {
  loginUser: async ({ commit }, formData) => {
    try {
      const { data } = await Axios.post("/account", formData)

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.seller))

      commit("SET_TOKEN", data.token)
      commit("SET_USER", data.seller)
    } catch (e) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      commit("SET_TOKEN", "")
      commit("SET_USER", null)
      commit("SET_MESSAGE", e?.response?.data?.message)

      // console.log(e?.response.data || e.message)
      // console.log(state.message)

      setTimeout(() => {
        commit("SET_MESSAGE", "")
      }, 5000)
    }
  },

  checkUserLoggedInStatus: async ({ commit }) => {
    try {
      const { data } = await Axios.get("/account")

      commit("SET_USER", data)
    } catch (e) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      commit("SET_USER", null)

      console.log(e?.response.data || e.message)
    }
  },
}

export const AccountModule = { namespaced: true, state, actions, mutations }
