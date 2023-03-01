import { getFormData, today, incrementField, resetCreator } from "@/lib/creator/creator-controls";

export const state = () => ({
    availableOrganisms: [],
    availablePartners: [],
    selectedOrganism: 1,
    selectedPartner: null,
    dates: [today.format(), today.format()],
    solvent: 'WATER',
    batch: 'AA',
    controls: 4,
    replicates: 4,
    timepoints: 3,
    blanks: 3,
    userOrganisation: null
})

export const mutations = {
    setAvailableOrganisms(state, organisms) { state.availableOrganisms = organisms },
    setAvailablePartners(state, partners) { state.availablePartners = partners },
    setSelectedPartner(state, partner) { state.selectedPartner = partner },
    setUserOrganisation(state, organisation) { state.userOrganisation = organisation },
    setDates(state, dates) { state.dates = dates },
    setSolvent(state, solvent) { state.solvent = solvent },
    setSelectedOrganism(state, organism) { state.selectedOrganism = organism },
    setBatch(state, batch) { state.batch = batch.toUpperCase() },
    setControls(state, controls) { state.controls = controls },
    setReplicates(state, replicates) { state.replicates = replicates },
    setTimepoints(state, timepoints) { state.timepoints = timepoints },
    setBlanks(state, blanks) { state.blanks = blanks },
    backButton(state) {
        state.created = false;
        state.error = false;
        state.loading = false
    },
}

export const actions = {
    async getFormData({ commit }, token) { await getFormData(commit, token) },
    changeField({ commit, state }, { field, value }) { incrementField(commit, state, field, value) },
    resetForm({ commit, state }) { resetCreator(commit, state) },
    sortDates({ commit }, dates) { commit('setDates', dates.sort((a, b) => new Date(a) - new Date(b)))}
}

export const getters = {
    getPartner: state => state.availablePartners.find(partner => partner['name'] === state.selectedPartner),
}

export default { namespaced: true, state, mutations, actions, getters }
