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
import { useUserStore } from "@/stores/user";
import { useCreatorGeneralStore} from "@/stores/creator-general";
import { useCreatorChemicalsStore} from "@/stores/creator-chemicals";
const user = useUserStore();
const creatorGeneral = useCreatorGeneralStore();
const creatorChemicals = useCreatorChemicalsStore();


export default {
  name: "FilterFiles",
  computed: {
    availableOrganisms() {
      return creatorGeneral.availableOrganisms;
    },
    availableChemicals() {
      return creatorChemicals.availableChemicals;
    },
    organism: {
      get() { return user.filesFilters.selectedOrganism },
      set(value) { user.setSelectedOrganism(value) }
    },
    chemical: {
      get() { return user.filesFilters.selectedCompound },
      set(value) { user.setSelectedChemical(value) }
    },
    status: {
      get() { return user.filesFilters.validationStatus },
      set(value) { user.setValidationStatus(value) }
    },
    batch: {
      get() { return user.filesFilters.selectedBatch },
      set(value) { user.setSelectedBatch(value) }
    },
    dates: {
      get() { return user.filesFilters.selectedDates },
      set(value) { user.setSelectedDates(value) }
    },
    getDates() {
      let data = ""
      const dates = user.filesFilters.selectedDates
      if (!dates) return  ''
      if (dates[0]) data += 'From: ' + dates[0]
      if (dates[1]) data += '; To: ' + dates[1]
      return data
    },
  },
  destroyed() { user.clearFilters() },
  methods: {
    availableStatuses() { user.availableStatuses() },
    clearFilters() { user.clearFilters() }
  },
}
</script>

<style>
.batchSelector input, .dateSelector input {
  margin-top: 0 !important;
}
</style>
