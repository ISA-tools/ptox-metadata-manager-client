<template>
  <v-container fluid>
    <v-alert
      v-if="showPubOverlay"
      type="success"
      dismissible
    >
      Samples above were successfully published to the database: <br>
      {{ publishOverlay.success.samples }}
    </v-alert>
    <v-alert
      v-if="isa.error"
      type="error"
      dismissible
    >
      {{ isa.error }}
    </v-alert>
    <DeleteOverlay />
    <PublishOverlay />
    <GeneralLoader
      v-if="loading"
      text="Loading your files ..."
    />
    <div v-else>
      <v-card>
        <v-card-title class="primary lighten-2 white--text">
          Search files
        </v-card-title>
        <v-card-text>
          <v-data-table
            id="searchFilesTable"
            :items="files"
            :headers="headers"
          >
            <template #[`item.author`]="{ item }">
              {{ item.author }} ({{ item.organisation }})
            </template>
            <template #[`item.shipped`]="{ item }">
              <div v-if="item.shipment_date">
                {{ item.shipment_date }}
              </div>
              <div v-else>
                No
              </div>
            </template>
            <template #[`item.received`]="{ item }">
              <div v-if="item.receive_date">
                {{ item.receive_date }}
              </div>
              <div v-else>
                No
              </div>
            </template>
            <template #[`item.validated`]="{ item }">
              <div
                style="width:100%"
                class="d-flex justify-start"
              >
                <StatusBadge :validated="item.validated" />
              </div>
            </template>
            <template #[`item.chemicals`]="{ item }">
              <ul>
                <li
                  v-for="chemical in item.chemicals"
                  :key="chemical.id"
                >
                  {{ chemical }}
                </li>
              </ul>
            </template>
            <template #[`item.timepoints`]="{ item, index }">
              <ul>
                <li
                  v-for="timepoint in item.timepoints"
                  :key="'file_' + index + '_timepoint_' + timepoint.label"
                >
                  <b>{{ timepoint.label }}</b> ({{ timepoint.value }} {{ timepoint.unit }})
                </li>
              </ul>
            </template>
            <template #[`item.actions`]="{ item }">
              <v-menu
                offset-x
                left
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>fas fa-bars</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    link
                  >
                    <a
                      :href="'https://docs.google.com/spreadsheets/d/'+ item.gdrive_id "
                      target="_blank"
                    >
                      View on Google Drive
                    </a>
                  </v-list-item>
                  <v-list-item
                    link
                  >
                    <div
                      style="width: 100%"
                      class="text-center"
                    >
                      <nuxt-link :to="'/files/' + item.file_id + '/validate'">
                        Validate File
                      </nuxt-link>
                    </div>
                  </v-list-item>
                  <v-list-item
                    link
                  >
                    <div
                      style="width: 100%"
                      class="text-center primary--text cursor-pointer"
                      @click="showDeleteOverlay({ name: item.name, file_id: item.file_id })"
                    >
                      Delete File
                    </div>
                  </v-list-item>
                  <v-list-item
                    link
                    v-if="item.shipped && item.received"
                  >
                    <div
                      style="width: 100%"
                      class="text-center"
                    >
                      <div
                        style="width: 100%"
                        class="text-center primary--text cursor-pointer"
                        @click="downloadISA(item.file_id)"
                      >
                        Download ISA JSON
                      </div>
                    </div>
                  </v-list-item>
                  <v-list-item
                    link
                    v-if="item.shipped && !item.received"
                  >
                    <div
                      style="width: 100%"
                      class="text-center primary--text cursor-pointer"
                      @click="showPublishOverlay({ name: item.name, file_id: item.file_id })"
                    >
                      Mark file as received
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { searchFiles, convertFileToISA } from '@/lib/RESTClient'
import GeneralLoader from "@/components/GeneralLoader"
import StatusBadge from "@/components/files/StatusBadge";
import DeleteOverlay from "@/components/files/overlays/DeleteOverlay.vue";
import PublishOverlay from "@/components/files/overlays/PublishOverlay.vue";
import publishOverlay from "@/components/files/overlays/PublishOverlay.vue";

export default {
  name: "SearchFilesForAdmin",
  components: { PublishOverlay, DeleteOverlay, StatusBadge, GeneralLoader },
  data() {
    return {
      files: [],
      perPage: 1000,
      search: null,
      loading: false,
      headers: [
        {
          text: "Filename",
          value: "name",
          sortable: true,
          align: "center"
        },
        {
          text: "Status",
          value: "validated",
          sortable: true,
          align: "start"
        },
        {
          text: "Shipped",
          value: "shipped",
          sortable: true,
          align: "start"
        },
        {
          text: "Received",
          value: "received",
          sortable: true,
          align: "start"
        },
        {
          text: "Author",
          align: "center",
          sortable: true,
          value: "author"
        },
        {
          text: "Organism",
          align: "start",
          sortable: true,
          value: "organism"
        },
        {
          text: "Batch",
          value: "batch",
          sortable: true,
          align: "center"
        },
        {
          text: "Blanks",
          value: "blanks",
          sortable: true,
          align: "center"
        },
        {
          text: "Replicates",
          value: "replicates",
          sortable: true,
          align: "center"
        },
        {
          text: "Controls",
          value: "controls",
          sortable: true,
          align: "center"
        },
        {
          text: "Chemicals",
          value: "chemicals",
          sortable: true,
          align: "start"
        },
        {
          text: "Timepoints",
          value: "timepoints",
          sortable: true,
          align: "start"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: true,
          align: "center"
        },

      ],
      isa: {
        error: null,
        loading: false,
      }
    }
  },
  computed: {
    publishOverlay() {
      return publishOverlay
    },
    ...mapState("user", ["token"]),
    ...mapState("files", ["deleteOverlay", "publishOverlay"]),
    showDelOverlay() { return this.deleteOverlay.show },
    showPubOverlay() { return this.publishOverlay.show },
  },
  watch: {
    async showDelOverlay(newValue) { if (newValue === false) await this.getData() },
    async showPubOverlay(newValue) { console.log(newValue) ; if (newValue === false) await this.getData() }
  },
  async mounted() { await this.getData() },
  destroyed() { this.setPublishOverlaySuccess(false) },
  methods: {
    ...mapMutations("files", ['showDeleteOverlay', 'showPublishOverlay', 'setPublishOverlaySuccess']),
    async getData() {
      this.loading = true
      let query = `per_page=${this.perPage}`
      if (this.search) query += `&search=${this.search}`
      const response = await searchFiles(this.token, query)
      this.files = response.data
      this.loading = false
    },
    async downloadISA(fileID) {
      this.isa = { error: null, loading: true }
      try {
        const isa = await convertFileToISA(this.token, fileID)
        const data = JSON.stringify(isa)
        const blob = new Blob([data], { type: 'application/json' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'isa.json')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      catch (e) { this.isa.error = e.response.data.message }
      finally { this.isa.loading = false }
    }
  }
}
</script>

<style>
  #searchFilesTable table thead th {
    min-width: 120px;
  }
  #searchFilesTable table ul {
    list-style-type: none
  }
</style>
