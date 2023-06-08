import Vue from "vue"
import { login_redirect, logout, autoLogin, getMyself, createUser, validateToken } from "@/lib/login"

const NEW_USER = {
    organisation: null,
    username: null,
    password: null,
    confirmPassword: null,
    email: null
}

export const state = () => ({
    isLoggedIn: false,
    token: null,
    username: null,
    email: null,
    password: null,
    role: null,
    error: null,
    userData: {
        organisation: null,
        googleDriveID: null,
        userID: null,
        files: []
    },
    createUserData: { ...NEW_USER },
    creationSuccess: null,
    pageStep: 1,
    tokenValidation: null,
    tokenError: null,

    filesFilters: {
        selectedOrganism: null,
        selectedVehicle: null,
        selectedCompound: null,
        validationStatus: null
    },
    availableStatuses: ["No", "failed", "success"],
    availableVehicles: ["DMSO", "Water"]
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
    setRole(state, role) { state.role = role },
    setUserData(state, userData) { state.userData = userData },
    setNewUserUsername(state, username) { state.createUserData.username = username },
    setNewUserPassword(state, password) { state.createUserData.password = password },
    setNewUserConfirmPassword(state, confirmPassword) { state.createUserData.confirmPassword = confirmPassword },
    setNewUserOrganisation(state, organisation) { state.createUserData.organisation = organisation },
    setNewUserEmail(state, email) { state.createUserData.email = email },
    resetNewUser(state) { state.createUserData = { ...NEW_USER } },
    setCreationSuccess(state, success) { state.creationSuccess = success },
    setTokenValidation(state, message) { state.tokenValidation = message },
    setTokenError(state, error) { state.tokenError = error },
    setStep(state, step) { state.pageStep = step },
    error(state, error) { state.error = error },

    setSelectedOrganism(state, organism) { Vue.set(state.filesFilters, 'selectedOrganism', organism) },
    setSelectedVehicle(state, vehicle) { Vue.set(state.filesFilters, "selectedVehicle", vehicle) },
    setSelectedChemical(state, compound) { Vue.set(state.filesFilters, "selectedCompound", compound) },
    setValidationStatus(state, status) { Vue.set(state.filesFilters, "validationStatus", status) },
    clearFilters(state) {
        state.filesFilters = {
            selectedOrganism: null,
            selectedVehicle: null,
            selectedCompound: null,
            validationStatus: null
        }
    }
}

export const actions = {
    async login({ state, commit }, { router, form, next }) {
        await login_redirect(
            router,
            commit,
            { username: state.username, password: state.password },
            form,
            next
        )
    },
    autologin({ commit }) { autoLogin(commit) },
    async logout({ state, commit }) {
        await logout(state.token)
        commit("logout")
    },
    async getMyself({ commit, state }) { await getMyself(state.token, commit) },
    async createUser({ state, commit }) {
        await createUser(state.token, state.createUserData, commit)
    },
    async activateToken({ commit }, token) { await validateToken(token, commit) }
}

export const getters = {
    getFiles: state => {
        return state.userData.files.filter(file => {
            if (state.filesFilters.selectedOrganism && state.filesFilters.selectedOrganism !== file.organism) return false
            if (state.filesFilters.selectedVehicle && state.filesFilters.selectedVehicle !== file.vehicle) return false
            if (state.filesFilters.validationStatus && state.filesFilters.validationStatus !== file.validated) return false
            return !(state.filesFilters.selectedCompound && !file.chemicals.includes(state.filesFilters.selectedCompound));
        })
    }
}

export default { namespaced: true, state, mutations, actions, getters }
