import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        order: null,
        orderOk: null,
    },
    mutations: {
        changeUser(state, user) {
            state.user = user

        },
        changeOrder(state, order) {
            state.order = order

        },
        changeOrderOk(state, orderOk) {
            state.orderOk = orderOk
        }
    },
    actions: {},
    modules: {

    }
})