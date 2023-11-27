<template>
  <v-form
    id="create-form"
    ref="create-form"
    v-model="valid"
    lazy-validation
  >
    <v-container
      class="pa-0 elevation-5"
      :class="$vuetify.breakpoint.lgAndUp ? 'mb-2' : ''"
    >
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
            text="Solvent"
            icon="fas fa-flask-vial"
            :definition="definitions['solvent']"
          />
          <CreatorSolvent />
        </v-col>

        <v-col cols="12">
          <CreatorSubtitle
            text="Empty tubes"
            icon="fa-solid fa-vials"
            definition="Number of empty tubes in this batch."
          />
          <v-container
            fluid
            class="pa-0 px-3 grey lighten-2"
          >
            <v-row no-gutters>
              <CreatorControls
                target="blanks"
                class="borderRight"
              />
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12">
          <CreatorSubtitle
            text="Replicates per time point"
            icon="fas fa-copy"
            :definition="definitions['replicates']"
          />
          <CreatorReplicates />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import CreatorSubtitle from "./creator-subtitle.vue";
import CreateDates from "./dates/create-dates.vue";
import CreatorPartner from "./creator-partner.vue";
import CreatorBatch from "./creator-batch.vue";
import CreatorReplicates from "./conditions/creator-replicates.vue";
import CreatorOrganism from "./creator-organism.vue";
import CreatorSolvent from "./creator-solvent.vue";
import CreatorControls from "./conditions/creator-controls.vue";

import definitions from "@/assets/data/definitions.yml"

export default {
  name: "CreateSpreadsheet",
  components: {
    CreatorOrganism,
    CreatorReplicates,
    CreatorBatch,
    CreatorPartner,
    CreatorSolvent,
    CreateDates,
    CreatorSubtitle,
    CreatorControls
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
