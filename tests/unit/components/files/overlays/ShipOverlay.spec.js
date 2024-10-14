import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import ShipOverlay from '@/components/files/overlays/ShipOverlay.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

import User from '@/store/user'
import Files from '@/store/files'

const $store = new Vuex.Store(
    {
        modules: {
            files: Files,
            user: User
        }
    }
)

describe("index.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(ShipOverlay, {
            vuetify,
            localVue,
            mocks: { $store}
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("ShipOverlay");
    });

});