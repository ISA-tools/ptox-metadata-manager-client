<template>
  <div
    id="selectPartner"
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
  </div>
</template>

<script>
import { useCreatorGeneralStore } from "@/stores/creator-general";
import { useUserStore } from "@/stores/user";
const creatorGeneral = useCreatorGeneralStore();
const user = useUserStore()

export default {
  name: "CreatorPartner",
  computed: {
    availablePartners() {
      return creatorGeneral.availablePartners;
    },
    partner: {
      get() { return creatorGeneral.getPartner },
      set(value) { creatorGeneral.setSelectedPartner(value) }
    }
  },
  mounted() {
    const organisation = user.userData.organisation || 'UOX'
    creatorGeneral.setSelectedPartner(organisation)
    creatorGeneral.setUserOrganisation(organisation)
  }
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
#selectPartner .v-select__selections {
  max-width: 100% !important;
}
#selectPartner .v-label--active,
#selectPartner .v-input__append-inner{
  display: none;
}
</style>
