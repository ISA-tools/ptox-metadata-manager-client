import chemicals from "./creator-chemicals"
import general from './creator-general'
import steps from './creator-steps'
import user from './user'

import { submitCreatorForm } from "@/lib/creator/creator-submit"


export const actions = {
    submitForm: async ({ rootState, commit }) => await submitCreatorForm({ rootState, commit })
}
export const mutations = {
    setLoading(state, loading) { state.loading = loading },
    setError(state, error) { state.error = error },
    setCreated(state, created) { state.created = created },
}

export const state = () => ({
    loading: false,
    created: false,
    error: false
})

export default {
    namespaced: true,
    modules: { chemicals, general, steps, user },
    actions,
    mutations,
    state
}
