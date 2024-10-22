import { defineStore } from 'pinia';
import RESTClient from "../lib/RESTClient";

const restClient = new RESTClient();

export const useAppStore = defineStore('app', {
    state: () => ({
        booted: false,
    }),
    getters: {
        getToken: () => {
            const user = JSON.parse(localStorage.getItem("user"));
            return user ? user.token : null
        }
    },
    actions: {
        async bootApp (state) {
            const token = this.getToken()
            if (!state.booted && token) {
                try { await restClient.test_token(token) }
                catch (error) {
                    this.commit('user/logout')
                    localStorage.removeItem("user")
                }
                finally {
                    this.setBooted(true);
                }
            }
            else {
                this.setBooted(true);
            }
        },
        setBooted(state, value) {
            state.booted = value;
        }
    }
})


