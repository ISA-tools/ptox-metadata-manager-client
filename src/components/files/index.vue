<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card
        :id="'file'+file.file_id"
        class="animated fadeIn slow d-flex flex-column fileCard px-0 white px-1 py-1"
        height="100%"
        elevation="5"
        tile
      >
        <FileCardContent :file="file" />
        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="grey darken-1"
            opacity="0.7"
          >
            <div
              class="d-flex flex-column align-center py-5"
              style="height: 100%"
            >
              <div
                class="flex-grow-1 d-flex justify-center flex-column align-center"
                style="width: 100%"
              >
                <v-btn
                  class="my-2"
                  color="success"
                  tile
                  :href="'https://docs.google.com/spreadsheets/d/' + file.gdrive_id"
                  target="_blank"
                  :x-large="$vuetify.breakpoint.mdAndUp"
                >
                  <v-icon class="mr-3">
                    fab fa-google-drive
                  </v-icon>
                  View on Google Drive
                </v-btn>
                <v-btn
                  class="my-2"
                  color="primary"
                  tile
                  :x-large="$vuetify.breakpoint.mdAndUp"
                  nuxt
                  :to="'/files/' + file.file_id + '/validate'"
                >
                  <v-icon class="mr-3">
                    fas fa-circle-check
                  </v-icon>
                  Validate
                </v-btn>
                <v-btn
                  v-if="!file.shipped && file.validated === 'success'"
                  class="my-2"
                  color="primary"
                  tile
                  :x-large="$vuetify.breakpoint.mdAndUp"
                  @click="showShipOverlay({ name: file.name, file_id: file.file_id })"
                >
                  <v-icon class="mr-3">
                    fab fa-usps
                  </v-icon>
                  Ship samples
                </v-btn>
              </div>
              <div
                class="flex-grow-0 d-flex justify-center align-center"
                style="width: 100%"
              >
                <v-btn
                  color="error"
                  tile
                  :x-large="$vuetify.breakpoint.mdAndUp"
                  @click="showDeleteOverlay({ name: file.name, file_id: file.file_id })"
                >
                  <v-icon class="mr-3">
                    fas fa-trash
                  </v-icon>
                  Delete file
                </v-btn>
              </div>
            </div>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import FileCardContent from "@/components/files/FileCardContent";
import { mapMutations } from "vuex";

export default {
  name: "FileOverlay",
  components: { FileCardContent },
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  methods: { ...mapMutations("files", ['showDeleteOverlay', 'showShipOverlay']) }
}
</script>

<style>

  .led {
    min-width: 24px;
    box-shadow: #D6D6D6 2px 2px 3px 1px, inset rgba(48, 71, 1, 0.60) 0 -1px 9px;
    font-size: 0.8rem;
    cursor: pointer;
  }
  .fileCard .v-timeline-item .v-timeline-item__body {
    margin-top: 5px;
  }
  .fileCard ul {
    list-style-type: none;
  }
  .fileCard .v-overlay__content {
    width: 100% !important;
    height: 100% !important;
  }
  .fileCard .v-btn {
    width: 95% !important;
  }
</style>
