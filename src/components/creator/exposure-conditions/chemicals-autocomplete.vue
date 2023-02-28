<template>
  <v-container class="pa-0">
    <v-row
      no-gutters
      class="px-0"
    >
      <v-col
        v-for="(chemicalName, chemicalIndex) in getSelectedChemicals()(index)"
        :key="'Chemical_' + chemicalIndex"
        cols="12"
        style="border-bottom: 1px solid #ccc"
        class="d-flex flex-row align-center pa-2 px-4"
      >
        <div>
          <v-btn
            fab
            small
            class="white--text break mr-4"
            :class="doseColor(1)"
          >
            {{ getChemical()(chemicalName).ptx_code.toString().padStart(3, '0') }}
          </v-btn>
        </div>
        <div style="max-width: 80%">
          <div :class="doseTextColor(1)">
            {{ getChemical()(chemicalName).common_name }}
          </div>
          <div
            class="grey--text"
            style="font-size: 14px;"
          >
            ({{ getChemical()(chemicalName).formula }})
          </div>
        </div>
        <v-spacer />
        <v-btn
          fab
          x-small
          :color="doseColor(1)"
          @click="removeChemicalFromSelectedGroup({ index, chemical: chemicalName })"
        >
          <v-icon
            small
            class="white--text"
          >
            fa-trash
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      class="py-4 px-0"
      no-gutters
    >
      <v-col
        cols="12"
        class="px-6"
      >
        <v-autocomplete
          v-model="chemicals"
          :items="getAvailableChemicals()(index) || [] "
          label="Select chemicals"
          item-text="common_name"
          multiple
          outlined
          filled
          rounded
          dense
          hide-details
          :color="doseColor(1)"
          :filter="searchChemicals"
        >
          <template #item="{item}">
            <div class="py-2 d-flex">
              <v-btn
                outlined
                disabled
                rounded
                class="mr-3 white--text"
                :class="doseColor(1)"
              >
                <span class="white--text">{{ item.ptx_code.toString().padStart(3, "0") }}</span>
              </v-btn>
              <span class="ellipsis">{{ item.common_name }}</span>
            </div>
          </template>
          <template #selection />
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex"
import { searchChemicals } from "@/utils/search"
import doseMixin from "@/mixins/doseCSSMixin"

export default {
  name: "ChemicalAutocomplete",
  mixins: [doseMixin],
  props: { index: { type: Number, required: true } },
  data () {
    return { def: ""}
  },
  computed: {
    chemicals: {
      get() { return this.getSelectedChemicals()(this.index) || [] },
      set(value) { this.setChemicalGroupChemicals({ index: this.index, chemicals: value }) }
    }
  },
  methods: {
    ...mapGetters("creator-chemicals", ["getAvailableChemicals", "getSelectedChemicals", "getChemical"]),
    ...mapActions("creator-chemicals", ["setChemicalGroupChemicals"]),
    ...mapMutations("creator-chemicals", ["removeChemicalFromSelectedGroup"]),
    searchChemicals: (chemical, queryText) => searchChemicals(chemical, queryText)
  },
}
</script>

<style>
</style>
