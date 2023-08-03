import { create_file } from "../RESTClient";

export function prepareGeneralData(state) {
    const partner = state.availablePartners.filter(
        organisation => organisation.name === state.selectedPartner
    )[0].name
    const organism = state.availableOrganisms.filter(
        organism => organism['organism_id'] === state.selectedOrganism
    )[0]['ptox_biosystem_name']
    return {
        partner,
        organism,
        exposure_batch: state.batch,
        replicate4control: state.controls,
        replicate4exposure: state.replicates,
        replicate_blank: state.blanks,
        start_date: state.dates[0],
        end_date: state.dates[1],
        vehicle: state.solvent === "DMSO" ? "DMSO" : "Water"
    }
}

export function prepareChemicalData(state) {
    let chemicals = []
    state.selectedChemicalsGroups.reduce((accumulator, group) => {
        if (group.chemicals.length > 0) {
            accumulator.push({
                chemicals: group.chemicals,
                dose: state.availableDoses.find(d => d.id === group.dose).dose
            })
        }
        return accumulator
    }, chemicals)
    if (chemicals.length === 0) throw new Error("You must select at least one chemical")
    return chemicals
}


export async function submitCreatorForm ({ rootState, commit })  {
    commit('setError', false)
    commit('setCreated', false)
    try {
        const token = rootState['user'].token
        const exposure_conditions = prepareChemicalData(rootState['creator-chemicals'])
        const body = { ...prepareGeneralData(rootState['creator-general']), exposure_conditions }
        body['timepoints'] = rootState['creator-timepoints'].timepoints.map(tp => parseInt(tp.value))
        commit('setLoading', true)
        const response = await create_file(token, body)
        const URL = response.data['file_url']
        commit('setCreated', URL)
        commit('creator-steps/setStep', 3, { root: true })
    }
    catch(e) {
        let error = e
        if (e.response) error = e.response.data.msg ? e.response.data.msg : e.response.data.message
        if (error.response) commit('setError', error)
        else commit('setError', error)
    }
    finally { commit('setLoading', false) }
}
