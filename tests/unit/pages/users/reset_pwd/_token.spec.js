import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import Token from '@/pages/users/reset_pwd/_token.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

import User from '@/store/user'
const $store = new Vuex.Store(
    {
        modules: {
            user: User
        },
    }
)

const $route = {
    path: "/",
    params: { token: 123456 },
}


jest.mock('@/lib/RESTClient');


describe("isa.vue", function(){
    let wrapper;

    beforeAll(async () => {
        wrapper = await shallowMount(Token, {
            vuetify,
            localVue,
            mocks: { $store, $route }
        })
    });

    it("can be instantiated", async () => {
        expect(wrapper.vm.$options.name).toMatch("ChangePwdWithToken");
    });

});