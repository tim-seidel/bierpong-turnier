import {SET_CURRENT} from "@/store/mutations.type";

const state = {
    current: undefined,
    tournamentList: []
}

const mutations = {
    [SET_CURRENT] (state, current) {
        state.current = current
    }
}

const actions = {}

const getters = {
    currentTournament: (state) => {
        return state.current
    },
    visibleGroups: (state) => {
        return (state.current?.groups ?? []).filter(g => g.isVisible)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
