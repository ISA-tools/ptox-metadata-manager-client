import { get_chemicals, get_organisms, get_organisations, create_file } from "../RESTClient";


export const getFormData = async (commit, token) => {
    const organisms = get_organisms(token)
    const organisations = get_organisations(token)
    Promise.all([organisms, organisations]).then((values) => {
        commit("setAvailableOrganisms", values[0]['data'])
        commit("setAvailablePartners", values[1]['data'])
    })
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
    else if (state.controls > 1) commit('setControls', state.controls - 1)
}


export const incrementReplicates = (commit, state, value) => {
    if (value > 0) commit('setReplicates', state.replicates + 1)
    else if (state.replicates > 1) commit('setReplicates', state.replicates - 1)
}


export const incrementTimepoints = (commit, state, value) => {
    if (value > 0 && state.timepoints < 5) commit('setTimepoints', state.timepoints + 1)
    else if (state.timepoints > 0 && value < 0) commit('setTimepoints', state.timepoints - 1)
}


export const incrementBlanks = (commit, state, value) => {
    if (value > 0 && state.blanks < 3) commit('setBlanks', state.blanks + 1)
    else if (state.blanks > 1 && value < 0) commit('setBlanks', state.blanks - 1)
}


export const createFile = async (state, commit, token) => {
    commit('setError', false)
    commit('setCreated', false)

    if (!state.selectedChemicals.length) return commit('setError', "You must select at least one chemical")

    const partner = state.availablePartners.filter(organisation => organisation.name === state.selectedPartner)[0]
    const organism = state.availableOrganisms.filter(organism => organism['organism_id'] === state.selectedOrganism)[0]
    const dose = state.availableDoses.filter(dose => dose.id === state.selectedDose)[0]
    const chemicals = state.availableChemicals.filter(
        chemical => state.selectedChemicals.includes(chemical['chemical_id'])
    )
    const body = {
        "end_date": state.dates[1],
        "exposure_batch": state.batch,
        "exposure_conditions": [
            {
                "chemicals_name": chemicals.map(chemical => chemical.common_name),
                "dose": dose.dose
            }
        ],
        "organism": organism['ptox_biosystem_name'],
        "partner": partner.name,
        "replicate4control": state.controls,
        "replicate4exposure": state.replicates,
        "replicate_blank": state.blanks,
        "start_date": state.dates[0],
        "timepoints": state.timepoints,
        "vehicle": state.solvent === "DMSO" ? "DMSO" : "water"
    }
    try {
        commit('setLoading', true)
        const response = await create_file(token, body)
        const URL = response.data['file_url']
        commit('setCreated', URL)
    }
    catch (error) { commit('setError', error.response.data.message) }
    finally { commit('setLoading', false) }
}

export const resetCreator = (commit, state) => {
    commit('setSelectedOrganism', 1)
    commit('setSelectedPartner', state.userOrganisation)
    commit('setDates', [today.format(), today.format()])
    commit('setSolvent', 'WATER')
    commit('setBatch', 'AA')
    commit('setControls', 4)
    commit('setReplicates', 4)
    commit('setTimepoints', 3)
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
