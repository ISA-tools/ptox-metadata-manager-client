import { defineStore } from 'pinia';
import RESTClient from "../lib/RESTClient";
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();
const restClient = new RESTClient();

export const useAppStore = defineStore('app', {
    state: () => ({
        booted: false,
    }),
    getters: {
        getToken: () => {
            const user = JSON.parse(localStorage.getItem("user"));
            return user ? user.token : null
        },
        user: () => {
            return userStore;
        }
    },
    actions: {
        async bootApp (state) {
            const token = this.getToken()
            if (!state.booted && token) {
                try { await restClient.test_token(token) }
                catch (error) {
                    await userStore.logout;
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


