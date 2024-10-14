import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import FilterFiles from '@/components/files/FilterFiles.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

import CreatorChemicals from '@/store/creator-chemicals'
import CreatorGeneral from '@/store/creator-general'
import User from '@/store/user'

const $store = new Vuex.Store(
    {
        modules: {
            'creator-chemicals': CreatorChemicals,
            'creator-general': CreatorGeneral,
            user: User,
        }
    }
)

describe("index.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(FilterFiles, {
            vuetify,
            localVue,
            mocks: { $store}
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("FilterFiles");
    });

});