<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row no-gutters>
      <v-col
        cols="12"
        class="d-flex white--text align-center justify-center py-0 primary"
      >
        <h2 class="text-center pageTitle">
          Spreadsheet creator
        </h2>
      </v-col>
    </v-row>
    <v-row
      no-gutters
    >
      <v-col
        cols="12"
        class="pa-0"
      >
        <v-stepper
          v-model="currentStep"
          alt-labels
          class="pa-0"
          flat
          tile
        >
          <v-container
            fluid
            class="pa-0 primary"
          >
            <v-container class="pa-0">
              <v-stepper-header
                class="primary"
                style="box-shadow: none !important;"
              >
                <v-stepper-step
                  :complete="currentStep > 1"
                  step="1"
                  color="white"
                  class="primary"
                  complete-icon="fas fa-circle-check"
                >
                  General Information
                </v-stepper-step>
                <v-divider />
                <v-stepper-step
                  :complete="currentStep > 2"
                  step="2"
                  color="white"
                  class="primary"
                >
                  Chemical groups
                </v-stepper-step>
                <v-divider />
                <v-stepper-step
                  :complete="currentStep === 3"
                  step="3"
                  color="white"
                  class="primary"
                >
                  Results
                </v-stepper-step>
              </v-stepper-header>
            </v-container>
          </v-container>
          <v-stepper-items>
            <v-stepper-content step="1">
              <CreatorGeneralStep />
            </v-stepper-content>
            <v-stepper-content step="2">
              <ExposureConditions />
            </v-stepper-content>
            <v-stepper-content step="3">
              <CreatorResults />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import CreatorGeneralStep from "@/components/creator/general/"
import ExposureConditions from "@/components/creator/exposure-conditions/"
import CreatorResults from "@/components/creator/creator-results.vue"

export default {
  name: "CreatorIndex",
  components: { CreatorGeneralStep, ExposureConditions, CreatorResults },
  computed: {
    ...mapState('creator-steps', ['currentStep']),
    ...mapState('creator', ['created'])
  },
  watch: {
    created() { if (this.created) window.open(this.created, '_blank') }
  }
}
</script>

<style>
#createSpreadsheet .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
  color: white !important;
  text-shadow: none !important;
}
#createSpreadsheet .v-stepper__step .v-stepper__step__step {
   z-index:3;
}
#createSpreadsheet .v-stepper__step--active .v-stepper__step__step {
  color: #1976d2 !important;
}
#createSpreadsheet .v-stepper .v-stepper__header .v-divider {
  border-color: white !important;
  z-index: 3;
}
#createSpreadsheet .v-stepper__step--complete .v-stepper__step__step {
  background: #1976d2 !important;
  color: #1976d2;
}
#createSpreadsheet .v-stepper__step--complete .v-stepper__step__step i.fas {
  background: transparent !important;
  color: white !important;
}
#createSpreadsheet .v-stepper__label {
  z-index: 3;
}
#createSpreadsheet .v-stepper,
#createSpreadsheet .v-stepper .v-stepper__items,
#createSpreadsheet .v-stepper .v-stepper__wrapper {
  overflow: clip  !important;
}
</style>
