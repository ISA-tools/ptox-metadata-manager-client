import { login_redirect, logout, autoLogin, getMyself, createUser } from "@/lib/login"

const NEW_USER = {
    organisation: null,
    username: null,
    password: null,
    confirmPassword: null,
}

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
    },
    createUserData: { ...NEW_USER },
    creationSuccess: null
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
    setNewUserUsername(state, username) { state.createUserData.username = username },
    setNewUserPassword(state, password) { state.createUserData.password = password },
    setNewUserConfirmPassword(state, confirmPassword) { state.createUserData.confirmPassword = confirmPassword },
    setNewUserOrganisation(state, organisation) { state.createUserData.organisation = organisation },
    resetNewUser(state) { state.createUserData = { ...NEW_USER } },
    setCreationSuccess(state, success) { state.creationSuccess = success },
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
    async getMyself({ commit, state }) { await getMyself(state.token, commit) },
    async createUser({ state, commit }) {
        await createUser(state.token, state.createUserData, commit)
    }
}

export default { namespaced: true, state, mutations, actions }
