import { getFormData, today, incrementField, resetCreator, validateBatch } from "@/lib/creator/creator-controls";

export const state = () => ({
    availableOrganisms: [],
    availablePartners: [],
    selectedOrganism: 3,
    selectedPartner: null,
    dates: [today.format(), today.format()],
    solvent: 'WATER',
    batch: 'AA',
    controls: 4,
    replicates: 4,
    blanks: 3,
    userOrganisation: null,
    batchError: null,
    batchRef: null,
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
    setBatchError(state, error) { state.batchError = error },
    setBatchRef(state, batchRef) { state.batchRef = batchRef }
}

export const actions = {
    async getFormData({ commit, state, getters }, token) { await getFormData(commit, state, getters, token) },
    changeField({ commit, state }, { field, value }) { incrementField(commit, state, field, value) },
    resetForm({ commit, state }) { resetCreator(commit, state) },
    sortDates({ commit }, dates) { commit('setDates', dates.sort((a, b) => new Date(a) - new Date(b)))},
    async changeSelectedBatch({ commit, state, getters }, { batch, token, batchRef }) {
        commit('setBatch', batch)
        commit('setBatchError', null)
        batchRef.validate()
        if (batchRef.valid) await validateBatch(commit, state, getters, token)
    },
    async changeSelectedOrganism({ commit, state, getters }, { organism, token }) {
        commit('setSelectedOrganism', organism)
        commit('setBatchError', null)
        console.log(state.batchRef)
        console.log(state.batch)
        state.batchRef.validate()
        if (state.batchRef.valid) await validateBatch(commit, state, getters, token)
    }
}

export const getters = {
    getPartner: state => {
        if (!state.selectedPartner) return 'UOB'
        return state.availablePartners.find(partner => partner['name'] === state.selectedPartner)
    },
    getOrganism: state => {
        const organism = state.availableOrganisms.find(organism => organism['organism_id'] === state.selectedOrganism)
        if (organism) return organism["ptox_biosystem_name"]
        else return null
    }
}

export default { namespaced: true, state, mutations, actions, getters }
