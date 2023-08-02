import user from './user'
import { test_token } from "@/lib/RESTClient"



export const actions = {
    async bootApp({ commit, state }) {
        const token = getToken()
        if (!state.booted && token) {
            try { await test_token(token) }
            catch (error) {
                console.log('ERROR')
                this.commit('user/logout')
                localStorage.removeItem("user")
            }
            finally { commit('setBooted', true) }
        }
        else { commit('setBooted', true) }
    }
}

export const mutations = {
    setBooted(state, value) { state.booted = value }
}

export const state = () => ({
    booted: false,
})

export default {
    namespaced: true,
    actions,
    mutations,
    modules: { user },
    state
}


export const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user ? user.token : null
}
