import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import ResetPwdPage from '@/pages/users/reset_pwd/index.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);


describe("isa.vue", function(){
    let wrapper;

    beforeAll(async () => {
        wrapper = await shallowMount(ResetPwdPage, {
            vuetify,
            localVue
        })
    });

    it("can be instantiated", async () => {
        expect(wrapper.vm.$options.name).toMatch("ResetPwdPage");
    });

});