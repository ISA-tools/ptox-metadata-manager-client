import { get_chemicals, get_organisms, get_organisations, testBatch } from "../RESTClient";


export const getFormData = async (commit, state, getter, token) => {
    await Promise.all(
        [get_organisms(token), get_organisations(token), validateBatch(commit, state, getter, token)]
    ).then(async (values) => {
        commit("setAvailableOrganisms", values[0]['data'])
        commit("setAvailablePartners", values[1]['data'])
    })
}

export const validateBatch = async (commit, state, getters, token) => {
    commit('setBatchError', null)
    try { await testBatch(token, getters.getOrganism, state.batch) }
    catch (error) { commit('setBatchError', error.response.data['message']) }
}


export const getChemicalsData = async (commit, token) => {
    const chemicals = await get_chemicals(token)
    commit("setAvailableChemicals", chemicals['data'])
}

export const incrementField = (commit, state, field, value) => {
    if (field === "controls") incrementControls(commit, state, value)
    else if (field === "replicates") incrementReplicates(commit, state, value)
    else if (field === "timepoints") incrementTimepoints(commit, state, value)
    else if (field === "blanks") incrementBlanks(commit, state, value)
}


export const incrementControls = (commit, state, value) => {
    if (value > 0) commit('setControls', state.controls + 1)
    else if (state.controls > 4) commit('setControls', state.controls - 1)
}


export const incrementReplicates = (commit, state, value) => {
    if (value > 0) commit('setReplicates', state.replicates + 1)
    else if (state.replicates > 4) commit('setReplicates', state.replicates - 1)
}


export const incrementTimepoints = (commit, state, value) => {
    if (value > 0 && state.timepoints < 5) commit('setTimepoints', state.timepoints + 1)
    else if (state.timepoints > 0 && value < 0) commit('setTimepoints', state.timepoints - 1)
}


export const incrementBlanks = (commit, state, value) => {
    if (value > 0 && state.blanks < 3) commit('setBlanks', state.blanks + 1)
    else if (state.blanks > 1 && value < 0) commit('setBlanks', state.blanks - 1)
}


export const resetCreator = (commit, state) => {
    commit('setSelectedOrganism', 1)
    commit('setSelectedPartner', state.userOrganisation)
    commit('setDates', [today.format(), today.format()])
    commit('setSolvent', 'WATER')
    commit('setBatch', 'AA')
    commit('setControls', 4)
    commit('setReplicates', 4)
    commit('setBlanks', 3)
}


export const getAvailableChemicals = (state, index)  => {
    const usedChemicals = state.selectedChemicalsGroups.map((group, i) =>
        i === index ? [] : group.chemicals
    ).flat()
    return state.availableChemicals.map(chemical => {
        if (!usedChemicals.includes(chemical['common_name'])) return chemical
    })
}


export const today = new Date();
today.format = function() {
    const month = (this.getMonth() + 1).toString().padStart(2, "0");
    const day = this.getDate().toString().padStart(2, "0");
    return `${this.getFullYear()}-${month}-${day}`;
}
