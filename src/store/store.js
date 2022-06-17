import Vue from 'vue'
import Vuex from 'vuex'

import tournament from './module.tournament'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        layout: {
            groupsPerRow: 2,
            isPaginationEnabled: false,
            gamesPerPage: 6,
            isColoredTeamsEnabled: true,
            isCupLayoutEnabled: false
        },
    },
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        tournament
    }
})
