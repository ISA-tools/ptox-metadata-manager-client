export const state = () => ({
    currentStep: 1
})

export const mutations = {
    setStep(state, step) { state.currentStep = step }
}

export const actions = {
    increaseStep({ commit, state }) { commit("setStep", state.currentStep + 1) },
    decreaseStep({ commit, state }) { commit("setStep", state.currentStep - 1) },
}

export default { namespaced: true, state, mutations, actions }
