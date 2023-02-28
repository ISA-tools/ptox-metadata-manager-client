<template>
  <v-col
    cols="12"
    class="pa-3 d-flex flex-column justify-center align-center pb-5"
  >
    <v-container class="pa-0">
      <v-row
        v-if="target !== 'timepoints'"
        bo-gutters
      >
        <v-col cols="12 conditionLabel text-center">
          {{ getLabel() }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2 d-flex justify-center align-center">
          <v-btn
            large
            icon
            elevation="3"
            class="primary"
          >
            <v-icon
              class="white--text"
              @click="decrement()"
            >
              fas fa-minus
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="8 conditionValue primary--text text-center">
          {{ controls }} {{ timepoints }} {{ replicates }} {{ blanks }}
        </v-col>
        <v-col cols="2 d-flex justify-center align-center">
          <v-btn
            large
            icon
            elevation="3"
            class="primary"
          >
            <v-icon
              class="white--text"
              @click="increment()"
            >
              fas fa-plus
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CreatorControls",
  props: {
    target: {type: String, required: true}
  },
  data() {
    this.$options.computed = { ...mapState("creator-general", [this.target]) }
    return {}
  },
  computed: {
    controls() { return this[this.target] },
    timepoints() { return this[this.target] },
    replicates() { return this[this.target] },
    blanks() { return this[this.target] }
  },
  methods: {
    ...mapActions("creator-general", ["changeField"]),
    increment() { this.changeField({ field: this.target, value: 1 }) },
    decrement() { this.changeField({ field: this.target, value: -1 }) },
    getLabel() {
      const labels = {
        'controls': 'Controls',
        'timepoints': 'Timepoints',
        'replicates': 'Exposed',
        'blanks': 'Empty tubes'
      }
      return labels[this.target]
    }
  }
}
</script>

<style>
  .borderRight {
    border-bottom: 2px solid white;
  }
  .conditionLabel {
    font-size: 14px;
    font-weight: lighter;
  }
  .conditionValue {
    font-size: 40px;
    font-weight: bold;
  }
</style>
