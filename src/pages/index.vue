<template>
  <div id="createSpreadsheet">
    <CreateSpreadsheet v-if="!created" />
    <v-container v-else-if="!error">
      <v-card>
        <v-card-title class="text-center primary white--text">
          Your URL is ready
        </v-card-title>
        <v-card-text class="pt-2">
          <div
            id="viewURL"
            class="d-flex flex-column justify-center align-center"
          >
            <v-btn
              fab
              x-large
              icon
              class="green mb-3"
            >
              <v-icon class="white--text">
                fas fa-file-excel
              </v-icon>
            </v-btn>
            <v-text-field
              v-model="created"
              disabled
              rounded
              outlined
              hide-details
              style="width:100%"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            rounded
            color="primary"
            class="px-3 mt-10"
            @click="backButton()"
          >
            Go back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-snackbar v-model="showSnackbar">
      <template #action="{ attrs }">
        There was en error: {{ error }}
        <v-btn
          color="error"
          text
          v-bind="attrs"
          @click="showSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex"
import CreateSpreadsheet from "@/components/creator/create-spreadsheet"


export default {
  name: 'IndexPage',
  components: { CreateSpreadsheet },
  data() { return { showSnackbar: false } },
  computed: {
    ...mapState('user', ['token']),
    ...mapState('creator', ['created', 'error'])
  },
  watch: { error() { if (this.error) this.showSnackbar = true } },
  async mounted() { await this.getFormData(this.token) },
  methods: {
    ...mapActions('creator', ['getFormData']),
    ...mapMutations('creator', ['backButton'])
  }
}
</script>

<style>
#viewURL fieldset {
  border: 3px solid #1976d2;
}
#createSpreadsheet .v-snack__wrapper {
  bottom: 50px;
}
</style>
