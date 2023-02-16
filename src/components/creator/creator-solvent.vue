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
import { mapState, mapMutations } from 'vuex'

export default {
  name: "CreatorSolvent",
  computed: { ...mapState('creator', ['solvent']) },
  methods: {
    ...mapMutations('creator', ['setSolvent']),
    color(solvent) { return this.solvent.toLowerCase() === solvent ? 'primary lighten-2' : '' }
  }
}
</script>

<style scoped>
#solventSelector button {
  border-radius: 0 !important;
}
</style>
