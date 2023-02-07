<template>
  <v-container
    class="pa-0 grey lighten-2 mb-0 pb-4"
  >
    <v-row
      no-gutters
      style="padding: 0 12px"
    >
      <v-col
        v-for="chemicalIndex in selectedChemicals"
        :key="'Chemical_' + chemicalIndex"
        cols="12"
        style="border-bottom: 2px solid white"
        class="d-flex flex-row align-center pa-2"
      >
        <div>
          <v-btn
            fab
            small
            class="primary white--text break mr-4"
          >
            {{ getChemical()(chemicalIndex).ptx_code.toString().padStart(3, '0') }}
          </v-btn>
        </div>
        <div style="max-width: 80%">
          <div class="primary--text">
            {{ getChemical()(chemicalIndex).common_name }}
          </div>
          <div
            class="grey--text"
            style="font-size: 14px;"
          >
            ({{ getChemical()(chemicalIndex).formula }})
          </div>
        </div>
        <v-spacer />
        <v-btn
          icon
          x-small
          color="deep-orange mr-3"
          @click="removeChemical(chemicalIndex)"
        >
          <v-icon small>
            fa-trash
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        class="pa-3 primary--text pt-7"
        style="cursor: pointer;"
      >
        <AddButton />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import AddButton from "./add-button";

export default {
  name: "AddChemicals",
  components: { AddButton },
  computed: { ...mapState("creator", ["availableChemicals", "selectedChemicals"]) },
  methods: {
    ...mapMutations("creator", ["addChemical", "removeChemical"]),
    ...mapGetters("creator", ["getChemical"])
  }
}
</script>

<style>
  .shadowed {
    text-shadow: 3px 3px 6px #6E6D6D;
  }
  .break {
    overflow-wrap: anywhere;
    overflow-x: hidden
  }
  #create-form .v-chip--select {
    display: none;
  }
</style>
