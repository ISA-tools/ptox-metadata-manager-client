export const state = () => ({
    currentStep: 1,
    steps: [
        { "name": "General Information" },
        { "name": "Timepoints Information"},
        { "name": "Exposure Information" },
        { "name": "Results" }
    ],
    stepsSize: 3
})

export const mutations = {
    setStep(state, step) { state.currentStep = step }
}

export const actions = {
    increaseStep({ commit, state }) { commit("setStep", state.currentStep + 1) },
    decreaseStep({ commit, state }) { commit("setStep", state.currentStep - 1) },
    reset({ state, dispatch }) {
        if (state.currentStep === 1) dispatch('creator-general/resetForm', null, { root: true })
        else if (state.currentStep === 2) dispatch('creator-timepoints/resetForm', null, { root: true })
        else if (state.currentStep === 3) dispatch('creator-chemicals/resetForm', null, { root: true })
    }
}

export const getters = {
    getSectionName: state => state.steps[state.currentStep - 1].name,
}

export default { namespaced: true, state, mutations, actions, getters }
