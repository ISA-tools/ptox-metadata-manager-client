import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            count: 0,
        };
    },
    mutations: {
        increment(state) {
            state.count++;
        },
    },
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
    // Install the store instance as a plugin
});

// See also: https://stackoverflow.com/questions/74564225/how-to-install-vuex-in-fresh-nuxt-3-project