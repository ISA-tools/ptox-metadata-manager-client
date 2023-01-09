<template>
  <div
    class="d-flex flex-row"
    style="width:100%"
  >
    <div class="selector white pl-5 text-center d-flex justify-center align-center borderBlue">
      <div class="mr-2 shower">
        <div class="d-flex justify-center align-center">
          <v-icon
            class="primary--text mr-1"
            small
          >
            fas fa-circle-question
          </v-icon>
          <div class="label">
            DOSE <b>{{ getDose().dose }}</b>
          </div>
        </div>
        <div class="value primary--text">
          {{ getDose().value }}
        </div>
      </div>
      <div
        class="controls d-flex flex-column justify-space-between primary--text shadowed"
        style="height:80%"
      >
        <div
          style="cursor:pointer;"
          @click="addDose()"
        >
          &#9650;
        </div>
        <div
          style="cursor:pointer;"
          @click="decreaseDose()"
        >
          &#9660;
        </div>
      </div>
    </div>
    <div class="selector white text-center">
      <div
        class="d-flex flex-column justify-center align-center"
        style="height:100%"
      >
        <div class="d-flex justify-center align-center">
          <v-icon
            class="primary--text mr-1"
            small
          >
            fas fa-circle-question
          </v-icon>
          <div class="label">
            SOLVENT
          </div>
        </div>
        <div
          class="solvent mb-2"
          :class="{'selected primary--text shadowed font-weight-bold': solvent === 'WATER'}"
          @click="setSolvent('WATER')"
        >
          WATER
        </div>
        <div
          class="solvent"
          :class="{'selected primary--text shadowed font-weight-bold': solvent === 'DMSO'}"
          @click="setSolvent('DMSO')"
        >
          DMSO
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: "SolventDose",
  computed: { ...mapState('creator', ['solvent']) },
  methods: {
    ...mapGetters('creator', ['getDose']),
    ...mapActions('creator', ['addDose', 'decreaseDose']),
    ...mapMutations('creator', ['setSolvent'])
  }

}
</script>

<style scoped>
  .selector {
    width: 50%;
    height: 130px;
  }
  .borderBlue {
    border-right: 2px solid #1976d2 !important;
  }
  .label {
    font-size: 14px;
  }
  .value {
    font-weight: bold;
    font-size: 40px;
    position: relative;
    top: -10px;
    letter-spacing: 3px;
  }
  .shower {
    position: relative;
    top: 10px
  }
  .solvent {
    font-size: 22px;
    width: 80%;
    cursor: pointer;
    border: 1px dashed grey;
    color: #CCCCCC;
  }
  .selected {
    font-size: 30px;
    border: 1px dashed #1976d2;
  }
</style>
