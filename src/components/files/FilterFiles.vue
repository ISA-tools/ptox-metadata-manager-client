<template>
  <v-card
    elevation="0"
    class="px-1 transparent white--text primary"
    tile
  >
    <v-card-title class="pa-0">
      <h3 class="mb-5">
        Filter files:
      </h3>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-select
        v-model="status"
        label="Validated"
        :items="availableStatuses"
        outlined
        color="white"
        flat
        dark
        filled
        rounded
        hide-details
        class="mb-4"
        :close-on-select="true"
        :menu-props="{ offsetY: true, closeOnClick: true, closeOnContentClick: true }"
      />
      <v-select
        v-model="organism"
        label="Organism"
        :items="availableOrganisms"
        item-text="ptox_biosystem_name"
        item-key="ptox_biosystem_id"
        outlined
        color="white"
        flat
        dark
        filled
        rounded
        hide-details
        class="mb-4"
        :close-on-select="true"
        :menu-props="{ offsetY: true, closeOnClick: true, closeOnContentClick: true }"
      />
      <v-autocomplete
        v-model="chemical"
        label="Chemical"
        :items="availableChemicals"
        outlined
        color="white"
        item-text="common_name"
        item-key="common_name"
        dark
        filled
        rounded
        hide-details
        class="mt-4"
        :close-on-select="true"
        :menu-props="{ offsetY: true, closeOnClick: true, closeOnContentClick: true }"
      />
      <v-text-field
        v-model="batch"
        outlined
        color="white"
        flat
        dark
        filled
        rounded
        hide-details
        class="my-4 batchSelector"
        label="Batch"
      />
      <v-menu
        offset-y
        :close-on-content-click="false"
        selected-items-text="From"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            label="Start and end dates"
            :value="getDates"
            class="my-4 showDates cursor-pointer dateSelector"
            outlined
            color="white"
            flat
            dark
            filled
            rounded
            readonly
            hide-details
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-card>
          <v-date-picker
            v-model="dates"
            range
            style="width: 100%"
          />
        </v-card>
      </v-menu>
    </v-card-text>
    <v-card-actions class="px-0 mt-5">
      <v-spacer />
      <v-btn
        class="px-4 mt-2"
        color="white"
        rounded
        filled
        dark
        outlined
        @click="clearFilters()"
      >
        Reset filters
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "FilterFiles",
  computed: {
    ...mapState('user', ['token', 'filesFilters', 'availableStatuses', 'availableVehicles']),
    ...mapState('creator-general', ['availableOrganisms']),
    ...mapState('creator-chemicals', ['availableChemicals']),
    organism: {
      get() { return this.filesFilters.selectedOrganism },
      set(value) { this.setSelectedOrganism(value) }
    },
    chemical: {
      get() { return this.filesFilters.selectedCompound },
      set(value) { this.setSelectedChemical(value) }
    },
    status: {
      get() { return this.filesFilters.validationStatus },
      set(value) { this.setValidationStatus(value) }
    },
    batch: {
      get() { return this.filesFilters.selectedBatch },
      set(value) { this.setSelectedBatch(value) }
    },
    dates: {
      get() { return this.filesFilters.selectedDates },
      set(value) { this.setSelectedDates(value) }
    },
    getDates() {
      let data = ""
      const dates = this.filesFilters.selectedDates
      if (!dates) return  ''
      if (dates[0]) data += 'From: ' + dates[0]
      if (dates[1]) data += '; To: ' + dates[1]
      return data
    },
  },
  destroyed() { this.clearFilters() },
  methods: {
    ...mapMutations('user', [
        'setSelectedOrganism',
        'setSelectedChemical',
        'clearFilters',
        'setValidationStatus',
        'setSelectedVehicle',
        'setSelectedBatch',
        'setSelectedDates'
    ]),
  }
}
</script>

<style>
.batchSelector input, .dateSelector input {
  margin-top: 0 !important;
}
</style>
