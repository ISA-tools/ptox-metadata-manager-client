<template>
  <v-col
    cols="12"
    class="py-0 my-0 grey lighten-2"
  >
    <v-date-picker
      id="date-picker"
      v-model="selectedDates"
      range
      flat
      reactive
      width="95%"
      no-title
    />
    <div
      class="grey lighten-2 primary--text px-5 d-flex justify-center pt-4"
    >
      <DateShow
        v-if="dates[0]"
        id="from"
        label="Starts on"
        :date="dates[0]"
        left
      />
      <div
        v-if="dates[0] && dates[1]"
        id="separator"
        class="d-flex align-center justify-center"
      >
        <span style="font-size: 80px; position: relative; top: -13px;">-</span>
      </div>
      <DateShow
        v-if="dates[1]"
        id="to"
        label="Ends on"
        :date="dates[1]"
      />
    </div>
  </v-col>
</template>
<script>
import { mapState, mapActions } from "vuex";

import DateShow from "./date-show";
export default {
  name: "CreateDates",
  components: { DateShow },
  computed: {
    ...mapState("creator", ["dates"]),
    selectedDates: {
      get() { return this.dates },
      set(value) { this.sortDates(value) }
    }
  },
  methods: { ...mapActions("creator", ["sortDates"]) },
}
</script>
<style>
#date-picker .v-picker__body, #date-picker.v-picker.v-card {
  background-color: #e0e0e0;
}
#date-picker .v-date-picker-table {
  height: auto !important;
}
#date-picker {
  width: 100%;
}
#date-picker .v-date-picker-years li:hover {
  background-color: #1976d2 !important;
  color: white !important;
}

</style>
