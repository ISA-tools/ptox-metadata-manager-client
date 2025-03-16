import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import DeleteOverlay from '@/components/files/overlays/DeleteOverlay.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

import { useUserStore } from '@/stores/user'
const user = useUserStore();
import Files from '@/store/files'

const $store = new Vuex.Store(
    {
        modules: {
            files: Files,
            user: user
        }
    }
)

describe("DeleteOverlay", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(DeleteOverlay, {
            vuetify,
            localVue,
            mocks: { $store}
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("DeleteOverlay");
    });

});