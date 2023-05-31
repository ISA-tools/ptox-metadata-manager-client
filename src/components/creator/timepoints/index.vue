<template>
  <v-col
    cols="12"
    class="pa-0"
  >
    <v-container
      class="pa-0"
    >
      <CreatorSubtitle
        text="Number of timepoints"
        icon="fas fa-clock"
        :definition="definitions['timepoints_number']"
      />
      <v-row no-gutters>
        <v-col
          cols="12"
          class="pa-3 d-flex flex-column justify-center align-center pb-0 grey lighten-2"
        >
          <v-container
            fluid
            class="pa-0"
          >
            <v-row
              no-gutters
              class="pb-4"
            >
              <v-col cols="2 d-flex justify-center align-center">
                <v-btn
                  large
                  icon
                  elevation="3"
                  class="primary"
                  @click="changeTimepointsSize(-1)"
                >
                  <v-icon class="white--text">
                    fas fa-minus
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="8 conditionValue primary--text text-center">
                {{ timepoints_size }}
              </v-col>
              <v-col cols="2 d-flex justify-center align-center">
                <v-btn
                  large
                  icon
                  elevation="3"
                  class="primary"
                  @click="changeTimepointsSize(+1)"
                >
                  <v-icon class="white--text">
                    fas fa-plus
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>

      <CreatorSubtitle
        icon="fas fa-ruler-horizontal"
        text="Timepoints unit"
        :definition="definitions['timepoints_unit']"
      />
      <v-row no-gutters>
        <v-col
          cols="12"
          class="white"
        >
          <UnitSelector />
        </v-col>
      </v-row>

      <CreatorSubtitle
        icon="fas fa-hourglass-half"
        text="Timepoints values"
        :definition="definitions['timepoints_values']"
      />
      <v-row no-gutters>
        <CreatorTimepoints />
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CreatorSubtitle from "@/components/creator/general-information/creator-subtitle";
import CreatorTimepoints from "@/components/creator/timepoints/content";
import UnitSelector from "@/components/creator/timepoints/unit-selector";
import definitions from "@/assets/data/definitions.yml"

export default {
  name: "CreatorConditions",
  components: { UnitSelector, CreatorSubtitle, CreatorTimepoints },
  data() { return { definitions: { ...definitions } } },
  computed: {
    ...mapState("creator-timepoints", ["timepoints_size"])
  },
  methods: {
    ...mapActions("creator-timepoints", ["changeTimepointsSize"])
  }
}
</script>

<style scoped>

</style>
