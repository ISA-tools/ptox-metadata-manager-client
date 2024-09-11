import RESTClient from "@/lib/RESTClient";

const restClient = new RESTClient();

export const state = () => ({
    deleteOverlay: {
        show: false,
        file: null,
        loading: false,
        error: null,
        success: false
    },
    publishOverlay: {
        show: false,
        file: null,
        loading: false,
        error: null,
        success: false
    },
    shipOverlay: {
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
    setDeleteOverlaySuccess(state, success) { state.deleteOverlay.success = success },

    showPublishOverlay(state, file) {
        state.publishOverlay = {
            show: true,
            file: file,
            loading: false,
            error: null,
            success: false
        }
    },
    hidePublishOverlay(state) {
        state.publishOverlay = {
            show: false,
            file: null,
            loading: false,
            error: null,
            success: false
        }
    },
    setPublishOverlayLoading(state, loading) { state.publishOverlay.loading = loading },
    setPublishOverlayError(state, error) { state.publishOverlay.error = error },
    setPublishOverlaySuccess(state, success) { state.publishOverlay.success = success },

    showShipOverlay(state, file) {
        state.shipOverlay = {
            show: true,
            file: file,
            loading: false,
            error: null,
            success: false
        }
    },
    hideShipOverlay(state) {
        state.shipOverlay = {
            show: false,
            file: null,
            loading: false,
            error: null,
            success: false
        }
    },
    setShipOverlayLoading(state, loading) { state.shipOverlay.loading = loading },
    setShipOverlayError(state, error) { state.shipOverlay.error = error },
    setShipOverlaySuccess(state, success) { state.shipOverlay.success = success }
}

export const actions = {
    async deleteFile({ commit, state }, token) {
        commit('setDeleteOverlayLoading', true)
        try {
            const response = await restClient.delete_file(token, state.deleteOverlay.file.file_id)
            commit('hideDeleteOverlay')
            commit('setDeleteOverlaySuccess', response.data)
        }
        catch (e) { commit('setDeleteOverlayError', e.response.data.message) }
        finally { commit('setDeleteOverlayLoading', false) }
    },
    async publishFile({ commit, state }, { token, at }) {
        commit('setPublishOverlayLoading', true)
        commit('setPublishOverlaySuccess', false)
        try {
            const response = await restClient.publishSamples(token, state.publishOverlay.file.file_id, at)
            commit('hidePublishOverlay')
            commit('setPublishOverlaySuccess', response.data)
        }
        catch (e) { commit('setPublishOverlayError', e.response.data.message) }
        finally { commit('setPublishOverlayLoading', false) }
    },
    async shipFile({ commit, state }, {token, at}) {
        commit('setShipOverlayLoading', true)
        commit('setShipOverlaySuccess', false)
        try {
            const response = await restClient.shipSamples(token, state.shipOverlay.file.file_id, at)
            commit('hideShipOverlay')
            commit('setShipOverlaySuccess', response.data)
        }
        catch (e) { console.log(e); commit('setShipOverlayError', e.response.data.message) }
        finally { commit('setShipOverlayLoading', false) }
    }
}


export default { namespaced: true, state, mutations, actions }
