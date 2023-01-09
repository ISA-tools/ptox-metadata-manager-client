<template>
  <v-col
    id="selectPartner"
    cols="12"
    class="white py-5 pl-8 pr-6 grey lighten-2"
  >
    <v-select
      v-model="partner"
      :items="availablePartners"
      item-text="longname"
      item-value="name"
      class="hideBorder mt-0 pt-0"
      :menu-props="{ offsetY: true, closeOnClick: true, closeOnContentClick: true }"
      hide-details
    >
      <template #selection="{ item }">
        <div
          class="d-flex flex-column align-center justify-center"
          style="width:100%"
        >
          <v-btn
            small
            rounded
            color="primary"
            class="mb-3"
          >
            {{ item.name }}
          </v-btn>
          <div class="primary--text partnerName flex-grow-1 text-center">
            {{ item.longname }}
          </div>
        </div>
      </template>
    </v-select>
  </v-col>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "CreatorPartner",
  async fetch() {
    this.setSelectedPartner(this.userData.organisation)
  },
  computed: {
    ...mapState("user", ["userData"]),
    ...mapState("creator", ["selectedPartner", "availablePartners"]),
    ...mapGetters("creator", ["getPartner"]),
    partner: {
      get() { return this.getPartner },
      set(value) { this.setSelectedPartner(value) }
    }
  },
  methods: {
    ...mapMutations("creator", ["setSelectedPartner"]),
    ...mapActions("user", ["getMyself"]),
  },
}
</script>

<style>
#selectPartner .hideBorder.v-text-field>.v-input__control>.v-input__slot:before,
#selectPartner .hideBorder.v-text-field>.v-input__control>.v-input__slot:after{
  border-style: none;
}
#selectPartner .v-label--active, #selectPartner input, #selectPartner .v-input__append-inner .v-icon  {
  display: none;
}
.partnerName {
  font-size: 25px;
  font-weight: bold;
  line-height: 1.2rem;
}
</style>
