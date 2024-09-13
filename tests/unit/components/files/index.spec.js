import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import FileOverlay from '@/components/files/index.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

let file = {
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
            }
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("FileOverlay");
    });

});