import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuetify from 'vuetify'

import ValidationReport from '@/components/files/ValidationReport.vue'

const vuetify = new Vuetify();
const localVue = createLocalVue();

let report = {
    lines: [[],[]]
};

describe("index.vue", function(){
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(ValidationReport, {
            vuetify,
            localVue,
            propsData: {
                report: report,
                recordId: '1'
            }
        })
    });

    it("can be instantiated", () => {
        expect(wrapper.vm.$options.name).toMatch("ValidationReport");
    });

});