import { getChemicalsData, getAvailableChemicals } from "@/lib/creator/creator-controls";


export const state = () => ({
    availableChemicals: [],
    selectedChemicalsGroups: [
        { chemicals: [], dose: 1 },
        { chemicals: [], dose: 2 },
        { chemicals: [], dose: 3 }
    ],
    availableDoses: [
        { id: 1, dose: 'BMD10', value: 'LOW' },
        { id: 2, dose: 'BMD25', value: 'MEDIUM' },
        { id: 3, dose: '10mg/L', value: 'HIGH' }
    ],
})

export const mutations = {
    setChemicalGroupChemicalNames(state, { chemicals, index }) {
        state.selectedChemicalsGroups[index].chemicals = chemicals
    },
    setAvailableChemicals(state, chemicals) { state.availableChemicals = chemicals },
    setDose(state, { index, dose }) { state.selectedChemicalsGroups[index].dose = dose },
    resetSelected(state) {
        state.selectedChemicalsGroups = [
            { chemicals: [], dose: 1 },
            { chemicals: [], dose: 2 },
            { chemicals: [], dose: 3 }
        ]
    },
    removeChemicalFromSelectedGroup(state, { index, chemical }) {
        state.selectedChemicalsGroups[index].chemicals = state.selectedChemicalsGroups[index].chemicals.filter(
            chem => chem !== chemical
        )
    }
}


export const actions = {
    async getFormData({ commit }, token) { await getChemicalsData(commit, token) },
    setChemicalGroupChemicals({ commit }, { chemicals, index }) {
        commit('setChemicalGroupChemicalNames', { chemicals, index })
    }
}

export const getters = {
    getAvailableChemicals: (state) => (index) => getAvailableChemicals(state, index),
    getSelectedChemicals: (state) => (index) => state.selectedChemicalsGroups[index].chemicals,
    getChemical: (state) => (name) => state.availableChemicals.find(chemical => chemical['common_name'] === name),
    getDose: (state) => (id) => state.availableDoses.find(dose => dose.id === state.selectedChemicalsGroups[id].dose)
}

export default { namespaced: true, state, mutations, actions, getters }
