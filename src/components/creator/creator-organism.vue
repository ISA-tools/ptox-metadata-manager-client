<template>
  <v-col
    id="organismSelector"
    cols="12"
    class="white pb-5 px-5 pt-0"
  >
    <v-select
      v-model="organism"
      label="Select an organism"
      :items="availableOrganisms"
      item-text="ptox_biosystem_name"
      item-value="organism_id"
      hide-details
      class="hideBorder"
      :close-on-select="true"
      :menu-props="{ offsetY: true, closeOnClick: true, closeOnContentClick: true }"
      style="min-height: 50px"
    >
      <template #selection="{ item }">
        <div
          class="d-flex align-center flex-column justify-center align-center"
          style="width: 100%"
        >
          <v-btn
            fab
            color="primary"
            class="mb-3 organismLetter"
          >
            {{ item.ptox_biosystem_code }}
          </v-btn>
          <div class="d-flex flex-column justify-center align-center">
            <span class="primary--text mr-2 organismName text-center"> {{ item.scientific_name }}</span>
            <span class="">({{ item.ptox_biosystem_name }})</span>
          </div>
        </div>
      </template>
    </v-select>
  </v-col>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: "CreatorOrganism",
  computed: {
    ...mapState("creator", ['selectedOrganism', 'availableOrganisms']),
    organism: {
      get() { return this.selectedOrganism },
      set(value) { this.setSelectedOrganism(value) }
    }
  },
  methods: { ...mapMutations("creator", ['setSelectedOrganism']) }


}
</script>

<style>
  #organismSelector .v-input__append-inner .v-icon {
    display:none
  }
  #organismSelector .hideBorder.v-text-field>.v-input__control>.v-input__slot:before {
    border-style: none;
  }
  #organismSelector .hideBorder.v-text-field>.v-input__control>.v-input__slot:after {
    border-style: none;
  }
  #organismSelector .v-label--active {
    display: none;
  }
  .organismName {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }
  .organismLetter .v-btn__content{
    font-size: 40px;
  }
  .v-menu__content .v-select-list {
    padding-top: 0;
  }
  .v-menu__content {
    border: 2px solid #1976d2;
    scrollbar-color: #1976d2 #E0E0E0;
  }
  .v-menu__content::-webkit-scrollbar {
    background: #1976d2;
  }
  #organismSelector .v-select__slot label {
    font-size: 30px;
    color: #1976D2;
    height: 45px;
    line-height: 40px;
  }
  .v-select__selections {
    width: 100%
  }
  .v-input__append-inner {
    display: none !important;
  }
</style>
