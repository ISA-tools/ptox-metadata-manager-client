import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import Index from '@/components/creator/index.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

import CreatorSteps from '@/store/creator-steps'
import Creator from '@/store/creator'
import User from '@/store/user'

const $store = new Vuex.Store(
    {
        modules: {
            'creator-steps': CreatorSteps,
            creator: Creator,
            user: User,
        }
    }
)

describe("index.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Index, {
            vuetify,
            localVue,
            mocks: { $store}
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("CreatorIndex");
    });

});