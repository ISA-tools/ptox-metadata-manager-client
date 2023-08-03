<template>
  <v-container
    fluid
    class="pa-0 "
  >
    <v-row
      v-if="report && !success"
      justify="center"
      no-gutters
    >
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="8"
        xl="6"
      >
        <v-card
          tile
          elevation="5"
          :color="errorCode === 404 ? 'error' : 'white'"
          class="animated fadeIn"
        >
          <v-card-title
            v-if="errorCode === 404"
            class="py-8 righteous font-italic text-h3"
          >
            <div
              class="text-center white--text d-flex flex-row align-center justify-center"
              style="width: 100%"
            >
              <v-icon
                x-large
                color="white"
                class="mr-10"
              >
                fas fa-circle-exclamation
              </v-icon>
              File {{ $route.params.fileID }} not found
            </div>
          </v-card-title>
          <v-card-text
            v-if="errorCode !== 404"
            class="pa-0"
          >
            <ValidationReport
              :report="report"
              :record-id="gdrive"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="success">
      <v-col
        cols="12"
        class="pa-4 px-10"
      >
        <v-alert type="success">
          Congratulation! The file {{ $route.params.fileID }} was successfully validated.
        </v-alert>
      </v-col>
    </v-row>

    <GeneralLoader
      text="Loading your report ..."
      :loading="loading"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import { validate_file } from "@/lib/RESTClient"
import ValidationReport from "@/components/files/ValidationReport.vue";
import GeneralLoader from "@/components/GeneralLoader.vue";

export default {
  name: "FilePage",
  components: { ValidationReport, GeneralLoader },
  data() {
    return {
      loading: false,
      report: null,
      errorCode: null,
      success: false,
      gdrive: null
    }
  },
  computed: { ...mapState("user", ['token']) },
  async mounted() {
    this.loading = true
    try {
      await validate_file(this.token, this.$route.params.fileID)
      this.report = null
      this.success = true
    }
    catch(e) {
      this.gdrive = e.response.data.gdrive
      this.errorCode = e.response.status
      if (this.errorCode === 404) {
        this.report = { "File not found": "The file you are trying to validate does not exist."}
      }
      else this.report = e.response.data.errors
    }
    finally { this.loading = false }
  }
}
</script>

<style scoped>

</style>
