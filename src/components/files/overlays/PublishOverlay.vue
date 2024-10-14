<template>
  <v-dialog
    v-model="showOverlay"
    transition="dialog-bottom-transition"
    width="500px"
  >
    <v-card
      v-if="publishOverlay.file"
      color="info"
      outlined
    >
      <v-card-title>
        <div
          class="white--text ellipsis"
          style="max-width: 95%"
        >
          {{ publishOverlay.file.name }}
        </div>
      </v-card-title>
      <v-card-subtitle v-if="publishOverlay.error">
        <v-icon class="mr-3">
          fas fa-exclamation-triangle
        </v-icon>
        {{ publishOverlay.error }}
      </v-card-subtitle>
      <v-card-text class="white--text text-body-1 text-center">
        Marking a file as received will prevent any further editing and will publish the samples in a stable and
        accessible database. Are you sure you want to proceed?
      </v-card-text>
      <v-card-text>
        <v-date-picker
          v-model="receiveDate"
          flat
          reactive
          width="95%"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="primary lighten-2"
          @click="hidePublishOverlay()"
        >
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn
          class="success white--text"
          outlined
          :loading="publishOverlay.loading"
          @click="submit()"
        >
          Accept shipment
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "PublishOverlay",
  data() { return { receiveDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) }},
  computed: {
    ...mapState("files", ["publishOverlay"]),
    ...mapState("user", ["token"]),
    showOverlay: {
      get() { return this.publishOverlay.show },
      set() { this.hidePublishOverlay() }
    }
  },
  methods: {
    ...mapMutations("files", ["hidePublishOverlay"]),
    ...mapActions("files", ["publishFile"]),
    async submit() {
      await this.publishFile({token: this.token, at: this.receiveDate })
      this.hidePublishOverlay();
    }
  }
}
</script>

<style scoped>

</style>
