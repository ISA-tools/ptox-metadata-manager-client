import { login_redirect, logout, autoLogin, getMyself } from "@/lib/login"

export const state = () => ({
    isLoggedIn: false,
    token: null,
    username: null,
    password: null,
    error: null,
    userData: {
        organisation: null,
        googleDriveID: null,
        userID: null,
        files: []
    }
})

export const mutations = {
    login(state, token) {
        state.isLoggedIn = true
        state.token = token
        state.password = null
    },
    logout(state) {
        state.isLoggedIn = false
        state.token = null
    },
    setUsername(state, username) { state.username = username },
    setPassword(state, password) { state.password = password },
    setUserData(state, userData) { state.userData = userData },
    error(state, error) { state.error = error }
}

export const actions = {
    async login({ state, commit }, {router, form}) {
        await login_redirect(router, commit, {username: state.username, password: state.password}, form)
        await getMyself(state.token, commit)
    },
    async autologin({ commit }) { await autoLogin(commit) },
    logout({ commit }) {
        logout()
        commit("logout")
    },
    async getMyself({ commit, state }) { await getMyself(state.token, commit) }
}

export default { namespaced: true, state, mutations, actions }
