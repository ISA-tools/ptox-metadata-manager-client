import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import Isa from '@/pages/files/_fileID/isa.vue'

import jest from "sinon";
jest.mock('@/lib/RESTClient', () => ({
    convertFileToISA: jest.fn(() => Promise.resolve({ data: {id: 1, name: 'John Doe' }})),
}));


const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

describe("isa.vue", function(){
    let wrapper;

    beforeEach(async () => {
        wrapper = await shallowMount(Isa, {
            vuetify,
            localVue
        })
    });

    it("can be instantiated", async () => {
        expect(wrapper.vm.$options.name).toMatch("ISAConverter");
    });

});