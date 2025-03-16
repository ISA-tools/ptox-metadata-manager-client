import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'
//import { useUserStore } from '@/stores/user'
import { createTestingPinia } from '@pinia/testing'

import FilePage from '@/pages/files/_fileID/validate.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

let testUserStore = createTestingPinia({
    user: {
        initialState: {
            organisation: 'organisation',
            username: 'username',
            password: 'password',
            confirmPassword: 'password',
            email: 'email@email.com',
        }
    }
});

/*
const $store = new Vuex.Store(
    {
        modules: {
            user: user
        },
    }
)
 */

const $route = {
    path: "/",
    params: { fileID: 123456 },
}


jest.mock('@/lib/RESTClient');

describe("isa.vue", function(){
    let wrapper;

    beforeAll(async () => {
        wrapper = await shallowMount(FilePage, {
            vuetify,
            localVue,
            //mocks: { $store, $route }
            mocks: { $route },
            plugins: [ testUserStore ]
        })
    });

    it("can be instantiated", async () => {
        expect(wrapper.vm.$options.name).toMatch("FilePage");
    });

});