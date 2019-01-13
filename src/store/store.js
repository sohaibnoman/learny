import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'
import Messages from './messages'
import Requests from './requests'
import Reviews from './reviews'
import Shared from './shared'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: User,
        requests: Requests,
        reviews: Reviews,
        messages: Messages,
        shared: Shared
    },
    actions: {
        logout({ commit }) {
            commit('setUser', null)
            commit('setMessages', {})
            commit('setReq', [])
            commit('setUsers', [])
            firebase.auth().signOut()
        }
    }
})
