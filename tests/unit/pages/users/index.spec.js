import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import Index from '@/pages/users/index.vue'

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

jest.mock('@/lib/RESTClient');


describe("isa.vue", function(){
    let wrapper;

    beforeAll(async () => {
        wrapper = await shallowMount(Index, {
            vuetify,
            localVue,
            mocks: { $store }
        })
    });

    it("can be instantiated", async () => {
        expect(wrapper.vm.$options.name).toMatch("UsersListPage");
    });

});