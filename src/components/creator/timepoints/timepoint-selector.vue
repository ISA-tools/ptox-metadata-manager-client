<template>
  <v-text-field
    v-model="timePoint"
    class="tpSelector"
    rounded
    outlined
    hide-details
    dense
    style="width:100%"
    type="number"
  />
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: "TimepointSelector",
  props: {
    timepointIndex: {
      type: Number,
      required: true
    },
  },
  computed: {
    ...mapState('creator-timepoints', ['units']),
    ...mapGetters('creator-timepoints', ['getTimepointValue']),
    timePoint: {
      get() { return this.getTimepointValue(this.timepointIndex) },
      set(value) { this.setTimepointValue({ index: this.timepointIndex, value }) }
    },
  },
  methods: { ...mapActions('creator-timepoints', ['setTimepointValue']) },
}
</script>

<style>
  .tpSelector input {
    text-align: center;
    font-size: 33px;
    color: #1976d2 !important;
    font-weight: bolder;
  }
  .tpSelector input[type=number] {
    -moz-appearance: textfield;
  }
  .tpSelector input::-webkit-outer-spin-button,
  .tpSelector input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

