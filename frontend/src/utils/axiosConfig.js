import store from "../store"

import axios from "axios"

axios.defaults.baseURL = "http://localhost:8181"
axios.defaults.headers.get["Accept"] = "application/json"
axios.defaults.headers.post["Accept"] = "application/json"
axios.defaults.headers.put["Accept"] = "application/json"

const getStoredToken = localStorage.getItem('token')

const token = store?.state?.token

export const Axios = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getStoredToken || token}`,
  },
})
