import {createLocalVue, shallowMount} from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing';
import { PiniaVuePlugin } from 'pinia';
import Vuetify from 'vuetify';

import FileOverlay from '@/components/files/index.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(PiniaVuePlugin);

const file = {
    file_id: 1
}

describe("index.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(FileOverlay, {
            vuetify,
            localVue,
            propsData: {
                file: file
            },
            pinia: createTestingPinia()
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("FileOverlay");
    });

});