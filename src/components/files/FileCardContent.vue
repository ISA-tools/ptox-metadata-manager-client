<template>
  <v-card-text class="d-flex flex-column flex-grow-1 pa-0 white fileCardContent">
    <div class="flex-grow-0 grey lighten-2">
      <CreatorSubtitle
        icon="fas fa-info"
        text="General Information"
      />
      <ul class="flex-grow-1 mt-4 pb-4">
        <div class="mr-4">
          <StatusBadge :validated="file['validated']" />
        </div>
        <li
          class="ellipsis"
          style="max-width:70%"
        >
          <strong> Filename: </strong> {{ file.name }}
        </li>
        <li>
          <strong> Organism: </strong> {{ file.organism.replace(/_/g, ' ') }}
        </li>
        <li>
          <strong> Organisation: </strong> {{ file.organisation }}
        </li>
        <li>
          <strong> Author: </strong> {{ file.author }}
        </li>

        <li
          class="ellipsis"
          style="max-width:70%"
        >
          <strong> Shipped: </strong>
          <span v-if="file.shipped"> {{ formatDate(file.shipment_date) }} </span>
          <span v-else> No </span>
        </li>
        <li
          v-if="file.shipped"
          class="ellipsis"
          style="max-width:70%"
        >
          <strong> Received: </strong>
          <span v-if="file.received"> {{ formatDate(file.receive_date) }} </span>
          <span v-else> No </span>
        </li>
      </ul>
      <div class="px-4 mb-4">
        <v-data-table
          style="border: 1px solid #ccc"
          :items="[simpleData]"
          :headers="headers"
          hide-default-footer
          color="primary"
          dense
          class="elevation-5"
        />
      </div>
      <div class="px-12 grey lighten-2 primary--text d-flex justify-center">
        <DateShow
          label="Starts on"
          :date="file.start_date"
          left
        />
        <DateShow
          label="Ends on"
          :date="file.end_date"
          right
        />
      </div>
    </div>

    <div class="flex-grow-1 grey lighten-2 d-flex flex-column">
      <div class="flex-grow-0">
        <CreatorSubtitle
          icon="fas fa-hourglass-half"
          text="Timepoints"
        />
      </div>
      <div class="flex-grow-1 d-flex flex-column justify-center py-1">
        <v-timeline class="px-4">
          <v-timeline-item
            v-for="(timepoint, timepointIndex) in timepoints"
            :key="'file_' + file.file_id + '_tp_' + timepointIndex"
            icon="fas fa-clock"
            fill-dot
            :class="timepointIndex%2 !== 0 ? 'text-right' : ''"
          >
            <v-card>
              <v-card-title class="text-body-2 pb-0 pt-1 strong">
                <strong
                  style="width:100%"
                  :class="timepointIndex%2 !== 0 ? 'text-right' : ''"
                >{{ timepoint.label }}</strong>
              </v-card-title>
              <v-card-text class="pb-1">
                {{ timepoint.value }} {{ timepoint.unit }}
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </div>
    </div>

    <div class="flex-grow-0">
      <div class="flex-grow-0">
        <CreatorSubtitle
          icon="fas fa-vial"
          text="Compounds"
        />
      </div>
      <ul class="py-4 grey lighten-2">
        <li
          v-for="(chemical, chemicalIndex) in file.chemicals"
          :key="'file_' + file.file_id + '_chemical_' + chemicalIndex"
          class="text-center primary--text text-body-1"
        >
          {{ chemical }}
        </li>
      </ul>
    </div>
  </v-card-text>
</template>

<script>
import { formatDate } from "@/utils/dates"
import StatusBadge from "@/components/files/StatusBadge";
import DateShow from "@/components/creator/general-information/dates/date-show.vue";

export default {
  name: "FileCard",
  components: {DateShow, StatusBadge },
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      No: 'This file has not been validated yet',
      Failed: 'This file has failed validation',
      Success: 'This file has passed validation',
      headers: [
        {
          text: 'Batch',
          align: 'center',
          sortable: false,
          value: 'Batch',
        },
        {
          text: 'Blanks',
          align: 'center',
          sortable: false,
          value: 'Blanks',
        },
        {
          text: 'Controls',
          align: 'center',
          sortable: false,
          value: 'Controls',
        },
        {
          text: 'Replicates',
          align: 'center',
          sortable: false,
          value: 'Replicates',
        },
        {
          text: 'Vehicle',
          align: 'center',
          sortable: false,
          value: 'Vehicle',
        }
      ]
    }
  },
  computed: {
    simpleData() {
      return {
        Batch: this.file.batch,
        Blanks: this.file.blanks,
        Controls: this.file.controls,
        Replicates: this.file.replicates,
        Vehicle: this.file.vehicle,
      }
    },
    timepoints() {
      return this.file.timepoints.map(tp => {
        return { label: tp.label, unit: tp.unit, value: tp.value }
      })
    }
  },
  methods: {
    formatDate(date) { return formatDate(date).join(', ') }
  }
}
</script>

<style>
.fileCardContent .mainDate {
  line-height: 50px;
}
</style>
