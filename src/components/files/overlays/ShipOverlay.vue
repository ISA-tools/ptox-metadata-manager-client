<template>
  <v-dialog
    v-model="showOverlay"
    transition="dialog-bottom-transition"
    width="500px"
    persistent
  >
    <v-card
      v-if="shipOverlay.file"
      id="ship-file"
      color="info"
      outlined
    >
      <v-card-title>
        <div
          class="white--text ellipsis"
          style="max-width: 95%"
        >
          {{ shipOverlay.file.name }}
        </div>
      </v-card-title>
      <v-card-subtitle v-if="shipOverlay.error">
        <v-icon class="mr-3">
          fas fa-exclamation-triangle
        </v-icon>
        {{ shipOverlay.error }}
      </v-card-subtitle>
      <v-card-text class="white--text text-body-1 text-center">
        <span v-if="!shipOverlay.wrongBatch">
          Are you sure you want to ship this file? This action cannot be undone and will lock the file from further
          editing.
        </span>
        <span v-else>
          This batch is already used with this species. You can resubmit the file with a new batch
          identifier in the box below. If you do, it will modify the identifiers in your spreadsheet.
        </span>
      </v-card-text>
      <v-card-text v-if="shipOverlay.wrongBatch">
        <v-text-field
          v-model="new_batch"
          label="Replace current batch with a new one (this will modify the identifiers in your spreadsheet)"
          color="white"
          outlined
          dark
          filled
          rounded
        />
      </v-card-text>
      <v-card-text>
        <v-date-picker
          v-model="shipDate"
          flat
          reactive
          width="95%"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="hideShipOverlay()">
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn
          class="success white--text"
          outlined
          :loading="shipOverlay.loading"
          @click="submit()"
        >
          Ship samples
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "ShipOverlay",
  data() {
    return {
      shipDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      new_batch: null
    }
  },
  computed: {
    ...mapState("files", ["shipOverlay"]),
    ...mapState("user", ["token"]),
    showOverlay: {
      get() { return this.shipOverlay.show },
      set() { this.hideShipOverlay() }
    }
  },
  methods: {
    ...mapMutations("files", ["hideShipOverlay"]),
    ...mapActions("files", ["shipFile"]),
    ...mapActions("user", ["getMyself"]),
    async submit() {
      await this.shipFile({ token: this.token, at: this.shipDate, new_batch: this.new_batch })
      this.new_batch = null
    }
  }
}
</script>

<style>
  #ship-file input {
    margin-top: 0 !important;
    font-size: 30px !important;
    line-height: 30px !important;
  }
</style>
