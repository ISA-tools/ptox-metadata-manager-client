<template>
  <v-container class="px-9 grey lighten-2">
    <v-row bo-gutters>
      <v-col
        cols="2"
        class="d-flex justify-center align-center"
      >
        <v-btn
          large
          icon
          elevation="3"
          class="primary"
        >
          <v-icon
            class="white--text"
            @click="decreaseDose()"
          >
            fas fa-minus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="8"
        class="primary--text text-center"
      >
        <div>
          <b
            class="black--text"
            style="position: relative; top: 10px;"
          >
            {{ dose }}
          </b>
          <div
            class="conditionValue"
            :class="css"
          >
            {{ value }}
          </div>
        </div>
      </v-col>
      <v-col
        cols="2"
        class="primary--text d-flex text-center justify-center align-center"
      >
        <v-btn
          large
          icon
          elevation="3"
          class="primary"
        >
          <v-icon
            class="white--text"
            @click="addDose()"
          >
            fas fa-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreatorDose",
  computed: {
    css() {
      const dose = this.getDose().value
      if (dose === 'LOW') return 'green--text'
      else if (dose === 'HIGH') return 'red--text'
      return 'primary--text'
    },
    dose() { return this.getDose().dose },
    value() { return this.getDose().value }
  },
  methods: {
    ...mapGetters('creator', ['getDose']),
    ...mapActions('creator', ['addDose', 'decreaseDose']),
  }
}
</script>

<style scoped>

</style>
