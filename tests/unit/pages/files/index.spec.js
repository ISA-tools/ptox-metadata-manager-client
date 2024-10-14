import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import SearchFilesForAdmin from '@/pages/files/index.vue'

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
        }
    }
)

describe("index.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(SearchFilesForAdmin, {
            vuetify,
            localVue,
            mocks: { $store }
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("SearchFilesForAdmin");
    });

});