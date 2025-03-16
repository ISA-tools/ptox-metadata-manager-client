import { submitCreatorForm } from "@/lib/creator/creator-submit"
import {defineStore} from "pinia";

export const useCreatorStore = defineStore('creator', {
    state: () => ({
        loading: false,
        created: false,
        error: false
    }),
    actions: {
        async submitForm ({ rootState, commit }){ await submitCreatorForm({ rootState, commit }) },
        setLoading(state, loading) { state.loading = loading },
        setError(state, error) { state.error = error },
        setCreated(state, created) { state.created = created }
    }
})
