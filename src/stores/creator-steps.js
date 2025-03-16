import {defineStore} from "pinia";

import { useCreatorGeneralStore} from "@/stores/creator-general";
const creatorGeneral = useCreatorGeneralStore()

export const useCreatorStepsStore = defineStore('creatorChemicals', {
    state: () => ({
        currentStep: 1,
        steps: [
            { "name": "General Information" },
            { "name": "Timepoints Information"},
            { "name": "Exposure Information" },
            { "name": "Results" }
        ],
        stepsSize: 3
    }),
    actions: {
        setStep(state, step) { state.currentStep = step },
        increaseStep({ commit, state }) { commit("setStep", state.currentStep + 1) },
        decreaseStep({ commit, state }) { commit("setStep", state.currentStep - 1) },
        reset({ state, dispatch }) {
            if (state.currentStep === 1) creatorGeneral.resetForm(null, { root: true })
            else if (state.currentStep === 2) dispatch('creator-timepoints/resetForm', null, { root: true })
            else if (state.currentStep === 3) dispatch('creator-chemicals/resetForm', null, { root: true })
        },
        getSectionName: state => state.steps[state.currentStep - 1].name,
    }
});