<template>
  <v-container
    fluid
    class="pa-0"
    style="height: 100%"
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
      style="min-height: calc(100vh - 110px);"
    >
      <v-col
        cols="12"
        class="pa-0"
      >
        <v-stepper
          v-model="currentStep"
          alt-labels
          class="pa-0 transparent"
          flat
          tile
          style="height:100%"
        >
          <StepsHeader />
          <v-stepper-items style="height:100%">
            <v-stepper-content step="1">
              <CreatorLayout />
            </v-stepper-content>
            <v-stepper-content step="2">
              <CreatorLayout />
            </v-stepper-content>
            <v-stepper-content step="3">
              <CreatorLayout />
            </v-stepper-content>
            <v-stepper-content step="4">
              <CreatorResults />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
import CreatorLayout from "@/components/creator/layout"
import CreatorResults from "@/components/creator/creator-results.vue";
import StepsHeader from "@/components/creator/layout/steps-header";

export default {
  name: "CreatorIndex",
  components: { CreatorLayout, StepsHeader, CreatorResults },
  async fetch() { await this.getFormData(this.token) },
  computed: {
    ...mapState('creator-steps', ['currentStep', 'stepsSize']),
    ...mapState('creator', ['created']),
    ...mapState('user', ['token']),
    ...mapGetters('creator-steps', ['getSectionName'])
  },
  watch: {
    created() { if (this.created) window.open(this.created, '_blank') }
  },
  methods: {
    ...mapActions("creator-chemicals", ["getFormData"])
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

#createSpreadsheet .v-stepper__content,
#createSpreadsheet .v-stepper__wrapper {
  height: 100% !important;
}
</style>
