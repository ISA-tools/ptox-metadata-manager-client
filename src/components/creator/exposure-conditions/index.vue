<template>
  <v-container
    id="ExposureGroupCreator"
    class="pa-0 d-flex flex-column align-content-space-between"
    style="min-height: calc(100vh - 216px);"
  >
    <v-row class="flex-grow-0">
      <v-col cols="12">
        <CreatorSubtitle
          icon="fas fa-vial-virus"
          text="Chemical Groups"
          definition="For each dose, you can select chemical names using the autocomplete fields."
        />
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="flex-grow-1"
    >
      <v-col
        cols="12"
        class="px-0"
      >
        <v-expansion-panels
          v-model="panel"
          multiple
          tile
          accordion
        >
          <v-expansion-panel
            v-for="(dose, selectedChemicalIndex) in availableDoses"
            :id="'ChemicalGroupSlider_' + selectedChemicalIndex"
            :key="'ChemicalGroupSlider_' + selectedChemicalIndex"
            class="faster"
          >
            <v-expansion-panel-header :class="doseColor(1)">
              <div
                class="d-flex align-center text-h6 white--text"
              >
                <v-icon
                  class="white--text mr-3"
                >
                  fas fa-vial
                </v-icon>
                {{ dose.dose }}
                <span
                  class="font-weight-thin ml-1"
                >
                  ({{ dose.value }})
                </span>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="px-0"
              style="border-top: 1px solid #ccc"
            >
              <ChemicalAutocomplete :index="selectedChemicalIndex" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row
      no-gutter
      class="mt-2 flex-grow-0"
    >
      <v-col
        cols="12"
        class="d-flex flex-row py-0 mb-3"
      >
        <v-btn
          class="primary lighten-2 flex-grow-1 white--text"
          text
          tile
          style="border-right: 1px solid white !important"
          @click="resetSelected()"
        >
          Reset
        </v-btn>
        <v-btn
          class="primary flex-grow-1 white--text"
          text
          tile
          style="border-right: 1px solid white !important;border-left: 1px solid white !important"
          @click="decreaseStep()"
        >
          Back
        </v-btn>
        <v-btn
          class="primary darken-3 flex-grow-1"
          text
          tile
          style="border-left: 1px solid white !important"
        >
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import ChemicalAutocomplete from "./chemicals-autocomplete.vue";
import CreatorSubtitle from "../general/creator-subtitle.vue";
import doseMixin from "@/mixins/doseCSSMixin"

export default {
  name: "ChemicalsPage",
  components: { CreatorSubtitle, ChemicalAutocomplete },
  mixins: [doseMixin],
  data() {
    return {
      def: "You need to select at least one chemical. The chemicals will be used to generate the final identifiers. " +
          "You can search chemicals using their name or internal identifier.",
      panel: [0, 1, 2]
    }
  },
  computed: {
    ...mapState("creator-chemicals", ["selectedChemicalsGroups", "availableDoses"]),
    ...mapState("user", ["token"])
  },
  async mounted() { await this.getFormData(this.token) },
  methods: {
    ...mapActions("creator-chemicals", ["getFormData"]),
    ...mapActions("creator-steps", ["decreaseStep"]),
    ...mapMutations("creator-chemicals", ["resetSelected"]),
    ...mapGetters('creator-chemicals', ['getDose'])
  },
}
</script>

<style>
#ExposureGroupCreator .v-expansion-panel-content__wrap {
  padding: 0;
}
.font-weight-thin {
  font-weight: lighter !important;
}
#ExposureGroupCreator .fa-chevron-down, #ExposureGroupCreator .fa-chevron-up {
  color: #005eb6 !important;
}
#ExposureGroupCreator .fa-chevron-down, #ExposureGroupCreator .fa-chevron-up {
  color: white !important;
}
</style>
