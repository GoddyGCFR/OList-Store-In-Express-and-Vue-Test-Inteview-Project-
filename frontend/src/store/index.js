import { createStore } from 'vuex'
import {AccountModule} from "@/store/accountStore";
import {ItemsModules} from "@/store/itemsStore";


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Account: AccountModule,
    Items: ItemsModules
  }
})

