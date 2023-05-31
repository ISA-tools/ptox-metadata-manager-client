<template>
  <v-container
    fluid
    class="pa-0 primary"
  >
    <v-container class="pa-0">
      <v-stepper-header
        v-if="$vuetify.breakpoint.lgAndUp"
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
          complete-icon="fas fa-circle-check"
        >
          Timepoints
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          :complete="currentStep > 3"
          step="3"
          color="white"
          class="primary"
          complete-icon="fas fa-circle-check"
        >
          Exposure Information
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          :complete="currentStep === 4"
          step="4"
          color="white"
          class="primary"
        >
          Results
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-header
        v-else
        class="primary py-1"
        style="box-shadow: none !important;"
      >
        <div
          class="white--text text-center"
          style="width:100%"
        >
          {{ getSectionName }} <span v-if="currentStep !== 4">({{ currentStep }} / {{ stepsSize }})</span>
        </div>
      </v-stepper-header>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapState} from "vuex";

export default {
  name: "StepsHeader",
  computed: {
    ...mapState('creator-steps', ['currentStep', 'stepsSize', 'steps']),
    ...mapGetters('creator-steps', ['getSectionName'])
  }
}
</script>

<style scoped>

</style>
