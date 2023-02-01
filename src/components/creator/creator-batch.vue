<template>
  <v-col
    id="batchSelector"
    cols="12"
    class="white pt-2 pb-1 d-flex justify-center align-center px-8"
  >
    <v-text-field
      v-model="selectedBath"
      class="batch primary-text hideBorder"
      :rules="[rules.required(), rules.maxSize(), rules.batch()]"
    />
  </v-col>
</template>
<script>
import { mapState } from "vuex";
import { required, isBatch, maxSize } from "@/utils/rules";

export default {
  name: "CreatorBatch",
  data() {
    return {
      rules: {
        required: () => required(),
        batch: () => isBatch(),
        maxSize: () => maxSize(2)
      }
    }},
  computed: {
    ...mapState("creator", ["batch"]),
    selectedBath: {
      get() { return this.batch },
      set(value) { this.$store.commit("creator/setBatch", value) }
    }
  }
}
</script>

<style>
  .batch {
    font-size: 40px;
    padding-top: 20px;
  }
  .batch.v-input {
    padding: 10px 5px 5px 5px;
    margin-top: 5px;
  }
  .batch.v-input.error--text {
    border: 1px solid #FF5252 !important;
    margin-bottom: 5px;
  }
  .batch .v-input__slot {
    height: 50px;
  }
  .batch .v-text-field__slot {
    height: 100%;
  }
  .batch.v-input input {
    text-align: center;
    letter-spacing: 5px;
    color: #1976d2;
    text-transform: uppercase;
    text-shadow: 3px 3px 6px #6E6D6D;
    padding: 0 !important;
    height: 50px;
  }
  #batchSelector .hideBorder.v-text-field>.v-input__control>.v-input__slot:before {
    border-style: none;
  }
  #batchSelector .hideBorder.v-text-field>.v-input__control>.v-input__slot:after {
    border-style: none;
  }

</style>
