<template>
  <div class="d-flex flex-row align-center py-1">
    <v-autocomplete
      v-model="selected"
      label="Add chemicals"
      outlined
      filled
      rounded
      dense
      hide-details
      color="primary"
      :items="availableChemicals"
      item-text="common_name"
      item-value="chemical_id"
      multiple
      chips
      :filter="searchChemicals"
    >
      <template #item="{item}">
        <div class="py-2 d-flex">
          <v-btn
            outlined
            disabled
            rounded
            class="mr-3 primary white--text"
          >
            <span class="white--text">{{ item.ptx_code.toString().padStart(3, "0") }}</span>
          </v-btn>
          <span class="ellipsis">{{ item.common_name }}</span>
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { searchChemicals } from "@/utils/search";

export default {
  name: "AddButton",
  computed: {
    ...mapState("creator", ["availableChemicals", "selectedChemicals"]),
    selected: {
      get() { return this.selectedChemicals },
      set(value) { this.setSelectedChemicals(value) }
    }
  },
  methods: {
    ...mapMutations("creator", ["setSelectedChemicals"]),
    searchChemicals: (chemical, queryText) => searchChemicals(chemical, queryText)
  }
}
</script>

<style>
.v-menu__content.v-autocomplete__content {
  border: 2px solid #1976d2;
}
.v-menu__content.v-autocomplete__content .v-select-list {
  padding-top: 0;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
}
</style>
