<template>
  <v-container class="grey lighten-2">
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
            @click="decreaseDose(index)"
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
            @click="addDose(index)"
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
  name: "ChemicalsDose",
  props: { index: { type: Number, required: true }},
  computed: {
    css() {
      const dose = this.getDose()(this.index).value
      if (dose === 'LOW') return 'green--text'
      else if (dose === 'HIGH') return 'red--text'
      return 'primary--text'
    },
    dose() { return this.getDose()(this.index).dose },
    value() { return this.getDose()(this.index).value }
  },
  methods: {
    ...mapGetters('creator-chemicals', ['getDose']),
    ...mapActions('creator-chemicals', ['addDose', 'decreaseDose']),
  }
}
</script>

<style>
  .conditionLabel {
    font-size: 14px;
    font-weight: lighter;
  }
  .conditionValue {
    font-size: 40px;
    font-weight: bold;
  }
</style>
