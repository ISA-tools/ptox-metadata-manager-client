<template>
  <v-dialog
    v-model="showOverlay"
    transition="dialog-bottom-transition"
    width="500px"
  >
    <v-card
      v-if="shipOverlay.file"
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
        Are you sure you want to ship this file? This action cannot be undone and will lock the file from further
        editing.
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
  data() { return { shipDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) }},
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
    async submit() { await this.shipFile({token: this.token, at: this.shipDate}) }
  }
}
</script>

<style scoped>

</style>
