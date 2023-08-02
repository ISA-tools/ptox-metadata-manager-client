<template>
  <v-container
    id="fileBrowser"
    fluid
    class="me white--text primary"
    style="height:100%"
  >
    <ShipOverlay />
    <DeleteOverlay />
    <GeneralLoader
      v-if="loading"
      text="Loading your files ..."
      :loading="loading"
    />
    <v-row
      v-else
      no-gutters
      justify="center"
      style="height:100%"
    >
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
        class="white--text"
      >
        <h1 class="text-center py-8">
          Preview the files you created
        </h1>
        <div class="white--text flex-grow-1">
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="3"
                xl="2"
              >
                <FilterFiles />
              </v-col>
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="9"
                xl="10"
              >
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-alert
                        v-if="files.length > 0"
                        type="info"
                        class="mb-0"
                      >
                        There are {{ files.length }} files in this query.
                      </v-alert>
                      <div v-else-if="!loading">
                        <v-alert
                          type="error"
                          class="mb-0"
                        >
                          Sorry but there is no result for this query.
                        </v-alert>
                        <v-btn
                          v-if="role === 'user' || role === 'admin'"
                          x-large
                          nuxt
                          to="/files/create"
                          tile
                          color="success"
                          class="mt-8"
                        >
                          Create a new file
                        </v-btn>
                        <v-btn
                          x-large
                          nuxt
                          to="/files/register"
                          tile
                          color="teal"
                          class="mt-8 white--text"
                        >
                          Register a new file
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      v-for="(file, file_index) in files"
                      :key="'userFile_' + file_index"
                      xs="12"
                      sm="12"
                      md="12"
                      lg="6"
                      xl="4"
                    >
                      <FileOverlay :file="file" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import FileOverlay from "@/components/files";
import FilterFiles from "@/components/files/FilterFiles.vue";
import DeleteOverlay from "@/components/files/overlays/DeleteOverlay.vue";
import ShipOverlay from "@/components/files/overlays/ShipOverlay.vue";

export default {
  name: 'MePage',
  components: { ShipOverlay, DeleteOverlay, FilterFiles, FileOverlay },
  data(){ return { loading: false } },
  async fetch() {
    this.loading = true;
    await Promise.all([
      this.getMyself(),
      this.getOrganisms(this.token),
      this.getChemicals(this.token),
    ])
    this.loading = false;
  },
  computed: {
    ...mapState('user', ['username', 'userData', 'token', 'role']),
    ...mapState('files', ['shipOverlay']),
    files() { return this.getFiles() },
    reload() { return this.shipOverlay.show }
  },
  watch: {
    async reload(val) {
      if (val === false) {
        this.loading = true;
        await this.getMyself();
        this.loading = false;
      }
    }
  },
  methods: {
    ...mapActions('user', ['getMyself']),
    ...mapGetters('user', ['getFiles']),
    ...mapActions('creator-general', { getOrganisms: 'getFormData' }),
    ...mapActions('creator-chemicals', { getChemicals: 'getFormData' })
  },
}
</script>

<style scoped>

</style>
