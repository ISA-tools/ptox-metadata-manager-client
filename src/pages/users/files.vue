<template>
  <v-container
    id="fileBrowser"
    fluid
    class="me white--text primary"
    style="height:100%"
  >
    <v-row
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
        <h1 class="text-center py-8 righteous font-italic">
          Preview the files you created
        </h1>
        <div class="white--text flex-grow-1">
          <v-container fluid>
            <v-row>
              <v-col
                v-for="(file, file_index) in userData.files"
                :key="'userFile_' + file_index"
                xs="12"
                sm="12"
                md="12"
                lg="6"
                xl="3"
              >
                <FileOverlay :file="file" />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>

    <v-overlay :value="loading">
      <v-card
        color="transparent"
        elevation="0"
        class="d-flex flex-column align-center justify-center"
      >
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
          class="mb-4"
        />
        <span class="white--text righteous"> Loading your files ... </span>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FileOverlay from "@/components/files";

export default {
  name: 'MePage',
  components: { FileOverlay },
  data(){ return { loading: false } },
  async fetch() { await this.getMyself() },
  computed: { ...mapState('user', ['username', 'userData']) },
  methods: { ...mapActions('user', ['getMyself']) },
}
</script>

<style scoped>

</style>
