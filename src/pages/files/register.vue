<template>
  <v-container
    fluid
    class="pa-0"
    style="height:100%"
  >
    <v-row style="height:100%">
      <v-col cols="12">
        <v-form
          v-if="!loading && ! fileData"
          id="register-file"
          ref="RegisterFile"
          style="height:100%"
          class=" white--text pa-4 d-flex flex-column justify-center align-center"
        >
          <v-card
            class="primary white--text d-flex flex-column elevation-0 animated fadeIn pa-8"
            outlined
            style="min-width: 350px; max-width: 900px"
          >
            <v-card-title class="px-0 text">
              <h4
                v-if="$vuetify.breakpoint.mdAndUp"
                class="righteous"
              >
                Register an external file
              </h4>
              <h5
                v-else
                class="righteous"
              >
                Register an external file
              </h5>
            </v-card-title>
            <v-card-subtitle
              class="white--text px-0"
              style="border-bottom: 1px solid #ccc"
            >
              Click the <pre class="mx-1 px-1 primary lighten-2">Share</pre> button in your google document, set the visibility to
              <pre class="mx-1 px-1 primary lighten-2">Anyone with the link</pre> and copy the link below.
            </v-card-subtitle>
            <v-card-text class="px-0 mt-5">
              <v-text-field
                v-model="fileURL"
                label="File URL"
                color="white"
                outlined
                dark
                filled
                rounded
                placeholder="https://drive.google.com/file/d/1X0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z/"
                :rules="[rules.isURL()]"
              />
            </v-card-text>
            <v-card-text
              v-if="resubmit"
              class="px-0"
            >
              <v-alert type="error">
                This batch is already used with this species. You can resubmit the file with a new batch identifier in
                the box below. If you do, it will modify the identifiers in your spreadsheet.
              </v-alert>
              <v-text-field
                v-model="newBatch"
                label="Replace current batch with a new one (this will modify the identifiers in your spreadsheet)"
                color="white"
                outlined
                dark
                filled
                rounded
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                tile
                color="success"
                @click="submitForm()"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        <v-container fluid>
          <v-row justify="center">
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="12"
              lg="6"
              xl="5"
            >
              <FileCard
                v-if="fileData && !loading"
                :file="fileData"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <GeneralLoader
      v-if="loading"
      :loading="loading"
      :text="'Registering file ' + fileID + ' ...'"
    />
    <v-snackbar
      v-model="error"
      type="error"
    >
      An error occurred while registering the file: {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import { register_file } from "@/lib/RESTClient"
import { isURL } from "@/utils/rules"
import FileCard from "@/components/files/";

export default {
  name: "RegisterFile",
  components: {FileCard},
  data() {
    return {
      loading: false,
      error: false,
      errorMessage: "",
      rules: { isURL: () => isURL() },
      fileURL: null,
      fileID: null,
      fileData: null,
      resubmit: false,
      newBatch: null
    }
  },
  computed: { ...mapState("user", ['token']) },
  methods: {
    async submitForm() {
      if (!this.$refs.RegisterFile.validate()) return

      this.loading = true
      this.fileData = null
      this.error = false
      this.errorMessage = ""

      const url = new URL(this.fileURL);
      const fileID = url.pathname.split('d/')[1].split('/')[0]
      try {
        this.fileID = fileID
        const response = await register_file(this.token, fileID, this.newBatch)
        this.fileData = response.data.file
      }
      catch (err) {
        if (err.response.status === 412) {
          this.resubmit = true
        }
        else {
          this.error = true
          this.errorMessage = err.response.data.message
        }
      }
      finally {
        this.fileID = null
        this.loading = false
      }
    }
  }
}
</script>

<style>
#register-file input {
  margin-top: 0 !important;
  font-size: 30px !important;
  line-height: 30px !important;
}
#register-file pre {
  display: inline;
}
</style>
