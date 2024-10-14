import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'

import GeneralLoader from '@/components/GeneralLoader.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();

describe("GeneralLoader.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(GeneralLoader, {
            vuetify,
            localVue
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("GeneralLoader");
    });

});