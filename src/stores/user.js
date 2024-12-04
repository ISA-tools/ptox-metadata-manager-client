import { login_redirect, logout, autoLogin, getMyself, createUser, validateToken } from "@/lib/login"
import { defineStore, createPinia } from "pinia";
import { createApp } from 'vue';

const pinia = createPinia();
const app = createApp({})
app.use(pinia);

const NEW_USER = {
    organisation: null,
    username: null,
    password: null,
    confirmPassword: null,
    email: null
}

export const useUserStore = defineStore('user', {
    state: () => ({
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
            validationStatus: null,
            selectedBatch: null,
            selectedDates: [null, null]
        },
        availableStatuses: ["No", "failed", "success"],
        availableVehicles: ["DMSO", "Water"],

        resetPasswordMessage: null
    }),
    getters: {
        getFiles () {
            const startDateBreakpoint = this.filesFilters.selectedDates[0]
            const endDateBreakpoint = this.filesFilters.selectedDates[1]

            return this.userData.files.filter(file => {
                if (startDateBreakpoint && endDateBreakpoint) {
                    const afterStartDate = startDateBreakpoint ? new Date(file.start_date) >= new Date(startDateBreakpoint) : true
                    const beforeEndDate = endDateBreakpoint ? new Date(file.end_date) <= new Date(endDateBreakpoint) : true
                    if (!afterStartDate || !beforeEndDate) return false
                }

                if (this.filesFilters.selectedOrganism && this.filesFilters.selectedOrganism !== this.organism) return false
                if (this.filesFilters.selectedVehicle && this.filesFilters.selectedVehicle !== file.vehicle) return false
                if (this.filesFilters.validationStatus && this.filesFilters.validationStatus !== file.validated) return false
                if (this.filesFilters.selectedBatch && !file.batch.includes(this.filesFilters.selectedBatch)) return false
                return !(this.filesFilters.selectedCompound && !file.chemicals.includes(this.filesFilters.selectedCompound));
            })
        }
    },
    actions: {
        async login({ router, form, next }) {
            console.log("Logging in!");
            await login_redirect(
                router,
                { username: this.username, password: this.password },
                form,
                next
            )
        },
        autologin() { autoLogin() },
        async logout() {
            await logout(this.token)
        },
        async getMyself() { await getMyself(this.token) },
        async createUser() {
            await createUser(this.token, this.createUserData)
        },
        async activateToken(token) { await validateToken(token) },
        clearFilters() {
            this.filesFilters = {
                selectedOrganism: null,
                selectedVehicle: null,
                selectedCompound: null,
                validationStatus: null,
                selectedBatch: null,
                selectedDates: [null, null]
            }
        },
        setUsername(username) {this.username = username },
        setPassword(password) { this.password = password },
        setRole(role) { this.role = role },
        setUserData(userData) { this.userData = userData },
        setNewUserUsername(username) { this.createUserData.username = username },
        setNewUserPassword(password) { this.createUserData.password = password },
        setNewUserConfirmPassword(confirmPassword) { this.createUserData.confirmPassword = confirmPassword },
        setNewUserOrganisation(organisation) { this.createUserData.organisation = organisation },
        setNewUserEmail(email) { this.createUserData.email = email },
        resetNewUser() { this.createUserData = { ...NEW_USER } },
        setCreationSuccess(success) { this.creationSuccess = success },
        setTokenValidation(message) { this.tokenValidation = message },
        setTokenError(error) { this.tokenError = error },
        setStep(step) { this.pageStep = step },
        error(error) { this.error = error },

        setSelectedOrganism(organism) { Vue.set(this.filesFilters, 'selectedOrganism', organism) },
        setSelectedVehicle(vehicle) { Vue.set(this.filesFilters, "selectedVehicle", vehicle) },
        setSelectedChemical(compound) { Vue.set(this.filesFilters, "selectedCompound", compound) },
        setValidationStatus(status) { Vue.set(this.filesFilters, "validationStatus", status) },
        setSelectedBatch(batch) { Vue.set(this.filesFilters, "selectedBatch", batch) },
        setSelectedDates(dates) {
            Vue.set(this.filesFilters, "selectedDates", dates).sort((a, b) => new Date(a) - new Date(b))
        },

        setResetPasswordMessage(message) {
            this.resetPasswordMessage = message
        },
    }

})

/*
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


}
 */
