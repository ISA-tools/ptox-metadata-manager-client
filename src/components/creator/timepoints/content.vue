<template>
  <v-col
    v-if="timepoints_size > 0"
    id="timepointsSelectors"
    cols="12"
    class="pt-0 px-0"
  >
    <v-container fluid>
      <v-row
        v-for="(timepoint, timepointIndex) in timepoints"
        :key="'timepoint_' + timepointIndex"
        class="animated timepointsSelector grey lighten-2"
        :class="getCssClasses(timepointIndex)"
      >
        <TimepointSelector
          :timepoint-index="timepointIndex"
          class="py-4 px-3"
        />
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import TimepointSelector from "@/components/creator/timepoints/timepoint-selector.vue";
import { useCreatorTimepointsStore } from "@/stores/creator-timepoints";

const creatorTimepoints = useCreatorTimepointsStore();

export default {
  name: "CreatorTimepoints",
  components: { TimepointSelector },
  computed: {
    timepoints_size() {
      return creatorTimepoints.timepoints_size;
    }
  },
  methods: {
    getCssClasses(index) {
      let classes = creatorTimepoints.timepoints[index].class
      if (index === creatorTimepoints.timepoints_size - 1) classes += ' custom-elevation'
      return classes
    }
  }
}
</script>

<style>
  .custom-elevation {
    box-shadow: 0 11px 15px -1px rgba(0, 0, 0, 0.2);
  }
</style>
