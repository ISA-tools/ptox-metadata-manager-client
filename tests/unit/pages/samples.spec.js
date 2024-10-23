import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import SamplesPage from '@/pages/samples.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

import User from '@/store/user'

const $store = new Vuex.Store(
    {
        modules: {
            user: User
        }
    }
)

describe("index.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(SamplesPage, {
            vuetify,
            localVue,
            mocks: { $store}
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("SamplesPage");
    });

});