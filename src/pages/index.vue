<template>
  <div
    id="createSpreadsheet"
    style="height:100%"
  >
    <CreatorIndex v-if="!created" />
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
        <div class="d-flex flex-column align-center justify-center pa-2 text-center error--text">
          There was en error: {{ error }}
          <v-divider
            class="my-4 error"
            style="width: 100%; height:1px"
          />
          <v-btn
            class="primary"
            v-bind="attrs"
            @click="showSnackbar = false"
          >
            Close
          </v-btn>
        </div>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex"
import CreatorIndex from "@/components/creator/"


export default {
  name: 'IndexPage',
  components: { CreatorIndex },
  data() {
    return {
      showSnackbar: false,
      stepper: 1
    }
  },
  computed: {
    ...mapState('user', ['token']),
    ...mapState('creator-general', ['created', 'error'])
  },
  watch: { error() { if (this.error) this.showSnackbar = true } },
  async mounted() { await this.getFormData(this.token) },
  methods: {
    ...mapActions('creator-general', ['getFormData']),
    ...mapMutations('creator-general', ['backButton'])
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
#createSpreadsheet  .v-snack__content {
  display: none;
}
#createSpreadsheet .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
  display: block !important;
  font-size: 12px;
  color: #1976d2;
  max-width: 70px;
  word-break: break-word;
  overflow: hidden;
  text-align: center;
}
</style>
