import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'

import HomePage from '@/pages/index.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();


describe("index.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(HomePage, {
            vuetify,
            localVue
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("HomePage");
    });

});