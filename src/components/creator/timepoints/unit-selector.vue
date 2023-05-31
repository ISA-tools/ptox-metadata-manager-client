<template>
  <div id="unitSelector">
    <v-select
      v-model="selected_unit"
      :items="units"
      :close-on-select="true"
      class="hideBorder py-5"
      hide-details
      disabled
      :menu-props="{ contentClass: 'bigList', offsetY: true, closeOnClick: true, closeOnContentClick: true }"
    />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "UnitSelector",
  computed: {
    ...mapState("creator-timepoints", ["units", "unit"]),
    selected_unit: {
      get() { return this.unit },
      set(value) { this.changeUnit(value) }
    },
  },
  methods: { ...mapMutations("creator-timepoints", ["changeUnit"]) }
}
</script>

<style>
  .bigList .v-list-item__title,
  #unitSelector .v-select__selections {
    text-transform: uppercase;
    text-align: center;
    font-size: 30px;
    color: #1976d2;
    font-weight: bolder;
  }
  #unitSelector .hideBorder.v-text-field>.v-input__control>.v-input__slot:before,
  #unitSelector .hideBorder.v-text-field>.v-input__control>.v-input__slot:after{
    border-style: none;
  }
  #unitSelector .v-input__append-inner .v-icon,
  #unitSelector .v-select__selections input,
  #unitSelector .v-select__slot .v-input__append-inner {
    display:none
  }
  #unitSelector .v-select__slot .v-select__selection {
    height: 45px;
    line-height: 40px;
    width: 100%;
    max-width: 100% !important;
  }
</style>
