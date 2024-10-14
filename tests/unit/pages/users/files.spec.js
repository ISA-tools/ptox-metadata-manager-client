import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import MePage from '@/pages/users/files.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

import User from '@/store/user'
import Files from '@/store/files'
const $store = new Vuex.Store(
    {
        modules: {
            user: User,
            files: Files
        },
    }
)

jest.mock('@/lib/RESTClient');


describe("isa.vue", function(){
    let wrapper;

    beforeAll(async () => {
        wrapper = await shallowMount(MePage, {
            vuetify,
            localVue,
            mocks: { $store }
        })
    });

    it("can be instantiated", async () => {
        expect(wrapper.vm.$options.name).toMatch("MePage");
    });

});