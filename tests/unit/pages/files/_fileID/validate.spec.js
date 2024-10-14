import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import FilePage from '@/pages/files/_fileID/validate.vue'

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
    params: { fileID: 123456 },
}


jest.mock('@/lib/RESTClient');


describe("isa.vue", function(){
    let wrapper;

    beforeAll(async () => {
        wrapper = await shallowMount(FilePage, {
            vuetify,
            localVue,
            mocks: { $store, $route }
        })
    });

    it("can be instantiated", async () => {
        expect(wrapper.vm.$options.name).toMatch("FilePage");
    });

});