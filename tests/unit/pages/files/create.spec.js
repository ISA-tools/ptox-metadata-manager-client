import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import CreatorIndex from '@/pages/files/create.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

import User from '@/store/user'
import Creator from '@/store/creator'

const $store = new Vuex.Store(
    {
        modules: {
            user: User,
            creator: Creator
        }
    }
)

describe("index.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(CreatorIndex, {
            vuetify,
            localVue,
            mocks: { $store }
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("IndexPage");
    });

});