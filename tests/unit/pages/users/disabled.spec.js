import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import DisabledAccount from '@/pages/users/disabled.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);


describe("isa.vue", function(){
    let wrapper;

    beforeAll(async () => {
        wrapper = await shallowMount(DisabledAccount, {
            vuetify,
            localVue
        })
    });

    it("can be instantiated", async () => {
        expect(wrapper.vm.$options.name).toMatch("DisabledAccount");
    });

});