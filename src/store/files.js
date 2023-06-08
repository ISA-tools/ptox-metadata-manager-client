import { delete_file } from "@/lib/RESTClient";

export const state = () => ({
    deleteOverlay: {
        show: false,
        file: null,
        loading: false,
        error: null,
        success: false
    }
})

export const mutations = {
    showDeleteOverlay(state, file) {
        state.deleteOverlay = {
            show: true,
            file: file,
            loading: false,
            error: null,
            success: false
        }
    },
    hideDeleteOverlay(state) {
        state.deleteOverlay = {
            show: false,
            file: null,
            loading: false,
            error: null,
            success: false
        }
    },
    setDeleteOverlayLoading(state, loading) { state.deleteOverlay.loading = loading },
    setDeleteOverlayError(state, error) { state.deleteOverlay.error = error },
    setDeleteOverlaySuccess(state, success) { state.deleteOverlay.success = success }
}

export const actions = {
    async deleteFile({ commit, state }, token) {
        commit('setDeleteOverlayLoading', true)
        try {
            const response = await delete_file(token, state.deleteOverlay.file.file_id)
            commit('hideDeleteOverlay')
            commit('setDeleteOverlaySuccess', response.data)
        }
        catch (e) { commit('setDeleteOverlayError', e.response.data.message) }
        finally { commit('setDeleteOverlayLoading', false) }
    }
}

export const getters = {}

export default { namespaced: true, state, mutations, actions, getters }
