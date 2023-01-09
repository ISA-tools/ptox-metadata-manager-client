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
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "AddButton",
  computed: {
    ...mapState("creator", ["availableChemicals", "selectedChemicals"]),
    selected: {
      get() { return this.selectedChemicals },
      set(value) { this.setSelectedChemicals(value) }
    }
  },
  methods: { ...mapMutations("creator", ["setSelectedChemicals"]) }
}
</script>

<style>
.v-menu__content.v-autocomplete__content {
  border: 2px solid #1976d2;
}
.v-menu__content.v-autocomplete__content .v-select-list {
  padding-top: 0;
}

</style>
