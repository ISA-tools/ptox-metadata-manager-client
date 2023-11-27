<template>
  <v-col
    id="batchSelector"
    cols="12"
    class="white pt-2 pb-1 d-flex justify-center align-center px-8"
  >
    <v-text-field
      ref="batch"
      v-model="selectedBatch"
      class="batch primary-text hideBorder"
      :rules="[rules.required(), rules.maxSize(), rules.batch()]"
      :error-messages="batchError"
    />
  </v-col>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
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
    ...mapState("creator-general", ["batch", "selectedOrganism", "batchError"]),
    ...mapState("user", ["token"]),
    selectedBatch: {
      get() { return this.batch },
      async set(value) {
        await this.changeSelectedBatch({ batch: value, token: this.token, batchRef: this.$refs['batch'] })
      }
    }
  },
  mounted() { this.setBatchRef(this.$refs['batch']) },
  methods: {
    ...mapActions("creator-general", ["changeSelectedBatch"]),
    ...mapGetters("creator-general", ["getOrganism"]),
    ...mapMutations("creator-general", ["setBatchRef"])
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
    padding: 0 !important;
    height: 100%;
    max-height: 100%;
    font-weight: bolder;
  }
  #batchSelector .hideBorder.v-text-field>.v-input__control>.v-input__slot:before {
    border-style: none;
  }
  #batchSelector .hideBorder.v-text-field>.v-input__control>.v-input__slot:after {
    border-style: none;
  }

</style>
