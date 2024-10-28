import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import CreatorIndex from '@/pages/files/create.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

import { useUserStore } from '@/stores/user'
const user = useUserStore();
import Creator from '@/store/creator'

const $store = new Vuex.Store(
    {
        modules: {
            user: user,
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