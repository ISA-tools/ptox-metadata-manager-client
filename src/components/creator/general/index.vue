<template>
  <v-form
    id="create-form"
    ref="createForm"
    v-model="valid"
    lazy-validation
  >
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <CreatorSubtitle
            icon="fas fa-industry"
            text="Partner"
            :definition="definitions['partner']"
          />
          <CreatorPartner />
        </v-col>
        <v-col cols="12">
          <CreatorSubtitle
            icon="fas fa-bacteria"
            text="Organism"
            :definition="definitions['organism']"
          />
          <CreatorOrganism />
        </v-col>
        <v-col cols="12">
          <CreatorSubtitle
            text="Expected timeframe"
            icon="fas far fa-calendar-days"
            :definition="definitions['timeframe']"
          />
          <CreateDates />
        </v-col>
        <v-col cols="12">
          <CreatorSubtitle
            icon="fas fa-table-cells"
            text="Exposure batch"
            :definition="definitions['batch']"
          />
          <CreatorBatch />
        </v-col>
        <v-col cols="12">
          <CreatorSubtitle
            text="Timepoints"
            icon="fas fa-clock"
            :definition="definitions['timepoints']"
          />
          <CreatorConditions />
        </v-col>

        <v-col cols="12">
          <CreatorSubtitle
            text="Solvent"
            icon="fas fa-flask-vial"
            :definition="definitions['solvent']"
          />
          <CreatorSolvent />
        </v-col>

        <v-col cols="12">
          <CreatorSubtitle
            text="Replicates"
            icon="fas fa-copy"
            :definition="definitions['replicates']"
          />
          <CreatorReplicates />
        </v-col>
      </v-row>
      <v-row
        no-gutter
        class="mt-0"
      >
        <v-col
          cols="12"
          class="d-flex flex-row py-0"
          :class="{'mb-3': $vuetify.breakpoint.mdAndDown}"
        >
          <v-btn
            class="flex-grow-1 white--text primary lighten-2"
            text
            tile
            style="border-right: 1px solid white !important"
            @click="resetForm()"
          >
            Reset
          </v-btn>
          <v-btn
            class="flex-grow-1 primary darken-3"
            text
            tile
            style="border-left: 1px solid white !important"
            @click="increaseStep()"
          >
            Next
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import CreatorSubtitle from "./creator-subtitle.vue";
import CreateDates from "./dates/create-dates.vue";
import CreatorConditions from "./conditions/creator-conditions.vue";
import CreatorPartner from "./creator-partner.vue";
import CreatorBatch from "./creator-batch.vue";
import CreatorReplicates from "./conditions/creator-replicates.vue";
import CreatorOrganism from "./creator-organism.vue";
import CreatorSolvent from "./creator-solvent.vue";

import definitions from "@/assets/data/definitions.yml"

export default {
  name: "CreateSpreadsheet",
  components: {
    CreatorOrganism,
    CreatorReplicates,
    CreatorBatch,
    CreatorPartner,
    CreatorConditions,
    CreatorSolvent,
    CreateDates,
    CreatorSubtitle
  },
  data() {
    return {
      valid: true,
      definitions: { ...definitions }
    }
  },
  methods: {
    ...mapActions('creator-steps', ['increaseStep']),
    ...mapActions("creator-general", ["resetForm"]),
  }
}
</script>

<style>
  .fullWidth {
    width: 100%;
    height: 100%;
  }
</style>
