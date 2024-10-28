<template>
  <div
    class="creatorContent d-flex flex-column"
    :style="getHeight()"
  >
    <div class="flex-grow-1 animated fadeIn slow">
      <CreatorGeneralInformation v-if="currentStep === 1" />
      <CreatorTimepoints v-if="currentStep === 2" />
      <CreatorExposureInformation v-if="currentStep === 3" />
    </div>
    <div class="StepNavigator d-flex flex-row">
      <v-btn
        class="flex-grow-1 white--text primary lighten-2"
        text
        tile
        style="border-right: 1px solid white !important"
        @click="reset()"
      >
        Reset
      </v-btn>
      <v-btn
        v-if="currentStep > 1"
        class="flex-grow-1 primary darken-3"
        text
        tile
        style="border-left: 1px solid white !important"
        @click="decreaseStep()"
      >
        Previous
      </v-btn>
      <v-btn
        v-if="currentStep < 3"
        class="flex-grow-1 primary darken-3"
        text
        tile
        style="border-left: 1px solid white !important"
        @click="increaseStep()"
      >
        Next
      </v-btn>
      <v-btn
        v-if="currentStep === 3"
        class="flex-grow-1 primary darken-3"
        text
        tile
        style="border-left: 1px solid white !important"
        :loading="loading"
        @click="submit()"
      >
        Submit
      </v-btn>
    </div>
  </div>
</template>

<script>
import CreatorGeneralInformation from "@/components/creator/general-information"
import CreatorExposureInformation from "@/components/creator/exposure-information"
import CreatorTimepoints from "@/components/creator/timepoints"

import { useCreatorStepsStore } from "@/stores/creator-steps";
import { useCreatorStore } from '@/stores/creator';
const creator = useCreatorStore();
const creatorSteps = useCreatorStepsStore();

export default {
  name: "CreatorLayout",
  components: { CreatorGeneralInformation, CreatorExposureInformation, CreatorTimepoints },
  computed: {
    currentStep() {
      return creatorSteps.currentStep;
    }
  },
  methods: {
    increaseStep() {
      return creatorSteps.increaseStep;
    },
    decreaseStep() {
      return creatorSteps.decreaseStep;
    },
    reset() {
      return creatorSteps.reset;
    },
    getHeight() {
      if (this.$vuetify.breakpoint.lgAndUp) return `min-height: calc(100vh - 218px);`
      return `min-height: calc(100vh - 147px);`
    },
    async submit() {
      await this.submitForm()
      if (!this.error) this.increaseStep()
    },
    loading() {
      return creator.loading;
    },
    error() {
      return creator.error;
    },
    submitForm() {
      return creator.submitForm;
    }
  }
}
</script>

<style scoped>

</style>
