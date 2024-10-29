const MIN_TP = 1
const MAX_TP = 10

import {defineStore} from "pinia";

export const useCreatorTimepointsStore = defineStore('creatorGeneral', {
    state: () => ({
        timepoints_size: 3,
        timepoints: [{ value: 0, class: '' }, { value: 0, class: '' }, { value: 0, class: '' }],
        units: ['hours', 'days', 'weeks', 'months'],
        unit: 'hours'
    }),
    actions: {
        resetForm({ commit }) { commit('resetStore') },
        changeTimepointsSize({ commit, state }, val) {
            const new_size = state.timepoints_size + val
            if (new_size > MIN_TP - 1 && new_size < MAX_TP) {
                commit('changeTimepointsSize', val)
                const timepoint_index = state.timepoints_size
                if (val > 0) {
                    commit('addTimepoint')
                    setTimeout(() => { commit('removeTimepointClass', timepoint_index - 1) }, 1500)
                }
                else if (val < 0) {
                    commit('changeTimepointClass', timepoint_index)
                    setTimeout(() => { commit('removeTimepoint') }, 800)
                }
            }
        },
        setTimepointValue({ commit }, { index, value }) { commit('setTimepoint', { index, value }) },
        getTimepointValue: (state) => (index) => state.timepoints[index].value,
        addTimepoint(state) { state.timepoints.push({ value: 0, class: 'slideInLeft' }) },
        removeTimepoint(state) { state.timepoints.pop() },
        //changeTimepointsSize(state, val) { state.timepoints_size += val },  // Old vuex mutation
        setTimepoint(state, { index, value }) { state.timepoints[index].value = value },
        changeTimepointClass(state, index) { state.timepoints[index].class = "slideOutLeft" },
        removeTimepointClass(state, index) { state.timepoints[index].class = ""},
        changeUnit(state, unit) { state.unit = unit },
        resetStore(state) {
            state.timepoints_size = 3
            state.timepoints = [{ value: 0, class: '' }, { value: 0, class: '' }, { value: 0, class: '' }]
        }
    }
})

