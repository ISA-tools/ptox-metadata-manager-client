import { getFormData, today, incrementField, createFile, resetCreator } from "@/lib/creator";

export const state = () => ({
    availableChemicals: [],
    availableOrganisms: [],
    availablePartners: [],
    availableDoses: [
        { id: 1, dose: 'BMD10', value: 'LOW' },
        { id: 2, dose: 'BMD25', value: 'MEDIUM' },
        { id: 3, dose: '10mg/L', value: 'HIGH' }
    ],
    selectedChemicals: [],
    selectedOrganism: 1,
    selectedPartner: null,
    dates: [today.format(), today.format()],
    selectedDose: 1,
    solvent: 'WATER',
    batch: 'AA',
    controls: 4,
    replicates: 4,
    timepoints: 3,
    blanks: 3,
    loading: false,
    error: null,
    created: false,
    userOrganisation: null
})

export const mutations = {
    setAvailableChemicals(state, chemicals) { state.availableChemicals = chemicals },
    setAvailableOrganisms(state, organisms) { state.availableOrganisms = organisms },
    setAvailablePartners(state, partners) { state.availablePartners = partners },
    setSelectedPartner(state, partner) { state.selectedPartner = partner },
    setUserOrganisation(state, organisation) { state.userOrganisation = organisation },
    addChemical(state, chemical) { state.selectedChemicals.push(chemical) },
    removeChemical(state, chemID) { state.selectedChemicals = state.selectedChemicals.filter(c => c !== chemID) },
    setSelectedChemicals(state, chemicals) { state.selectedChemicals = chemicals },
    setDates(state, dates) { state.dates = dates },
    setDose(state, dose) { state.selectedDose = dose },
    setSolvent(state, solvent) { state.solvent = solvent },
    setSelectedOrganism(state, organism) { console.log(organism); state.selectedOrganism = organism },
    setBatch(state, batch) { state.batch = batch.toUpperCase() },
    setControls(state, controls) { state.controls = controls },
    setReplicates(state, replicates) { state.replicates = replicates },
    setTimepoints(state, timepoints) { state.timepoints = timepoints },
    setBlanks(state, blanks) { state.blanks = blanks },
    setLoading(state, loading) { state.loading = loading },
    setError(state, error) { state.error = error },
    setCreated(state, created) { state.created = created },
    backButton(state) {
        state.created = false;
        state.error = false;
        state.loading = false
    },
}

export const actions = {
    async getFormData({ commit }, token) { await getFormData(commit, token) },
    addDose({ commit, state }) { incrementField(commit, state, 'dose', 1) },
    decreaseDose({ commit, state }) { incrementField(commit, state, 'dose', -1) },
    changeField({ commit, state }, { field, value }) { incrementField(commit, state, field, value) },
    resetForm({ commit, state }) { resetCreator(commit, state) },
    async submitForm({ commit, state }, token) { await(createFile(state, commit, token))},
    sortDates({ commit }, dates) { commit('setDates', dates.sort((a, b) => new Date(a) - new Date(b)))}
}

export const getters = {
    getChemical: state => id => state.availableChemicals.find(chemical => chemical['chemical_id'] === id),
    getDose: state => state.availableDoses.find(dose => dose['id'] === state.selectedDose),
    getPartner: state => state.availablePartners.find(partner => partner['name'] === state.selectedPartner),
}

export default { namespaced: true, state, mutations, actions, getters }
