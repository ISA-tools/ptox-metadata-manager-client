<template>
  <v-container
    id="solventSelector"
    class="pa-0"
  >
    <v-row no-gutters>
      <v-col cols="6">
        <v-btn
          height="100px"
          block
          depressed
          x-large
          :color="color('water')"
          @click="setSolvent('WATER')"
        >
          WATER
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          height="100px"
          block
          depressed
          x-large
          :color="color('dmso')"
          @click="setSolvent('DMSO')"
        >
          DMSO
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {useCreatorGeneralStore} from "@/stores/creator-general";
const creatorGeneral = useCreatorGeneralStore();

export default {
  name: "CreatorSolvent",
  methods: {
    color(solvent) { return creatorGeneral.solvent.toLowerCase() === solvent ? 'primary lighten-2' : '' },
    setSolvent(solvent) { return creatorGeneral.setSolvent(solvent); }
  }
}
</script>

<style scoped>
#solventSelector button {
  border-radius: 0 !important;
}
</style>
