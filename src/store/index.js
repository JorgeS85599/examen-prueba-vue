import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../service/API'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empresas: []
  },
  mutations: {
    saveEmpresas(state,arrayEmpresas) {
      state.empresas = arrayEmpresas
    }
  },
  actions: {
    getEmpresas(context) {
      Api.empresas.getAll()
      .then(response=>context.commit('saveEmpresas',response.data))
      .catch(error=>console.log(error))

    },
  },
  modules: {
  }
})
