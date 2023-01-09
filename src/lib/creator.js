import { get_chemicals, get_organisms, get_organisations, create_file } from "./RESTClient";


export const getFormData = async (commit, token) => {
    const chemicals = get_chemicals(token)
    const organisms = get_organisms(token)
    const organisations = get_organisations(token)
    Promise.all([chemicals, organisms, organisations]).then((values) => {
        commit("setAvailableChemicals", values[0]['data'])
        commit("setAvailableOrganisms", values[1]['data'])
        commit("setAvailablePartners", values[2]['data'])
    })
}


export const incrementDose = (commit, state, value) => {
    let dose = value < 0 ? state.selectedDose - 1 : state.selectedDose + 1
    if (dose >= 1 && dose <= 3) commit('setDose', dose)
    if (dose === 4) commit('setDose', 1)
    if (dose === 0) commit('setDose', 3)
}


export const incrementField = (commit, state, field, value) => {
    if (field === 'dose') incrementDose(commit, state, value)
    else if (field === "controls") incrementControls(commit, state, value)
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
    const partner = state.availablePartners.filter(organisation => organisation.name === state.selectedPartner)[0]
    const organism = state.availableOrganisms.filter(organism => organism['organism_id'] === state.selectedOrganism)[0]
    const dose = state.availableDoses.filter(dose => dose.id === state.selectedDose)[0]
    const chemicals = state.availableChemicals.filter(
        chemical => state.selectedChemicals.includes(chemical['chemical_id'])
    )
    console.log(chemicals)
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
        "start_date": state.dates[1],
        "timepoints": 3,
        "vehicle": state.solvent.toLowerCase()
    }
    try {
        commit('setLoading', true)
        const response = await create_file(token, body)
        commit('setCreated', response.data['file_url'])
    }
    catch (error) { commit('setError', error.response.data.message) }
    finally { commit('setLoading', false) }
}


export const today = new Date();
today.format = function() {
    const month = (this.getMonth() + 1).toString().padStart(2, "0");
    const day = this.getDate().toString().padStart(2, "0");
    return `${this.getFullYear()}-${month}-${day}`;
}
