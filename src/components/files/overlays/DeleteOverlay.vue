<template>
  <v-dialog
    v-model="showOverlay"
    transition="dialog-bottom-transition"
    width="500px"
  >
    <v-card
      v-if="deleteOverlay.file"
      color="error"
      outlined
    >
      <v-card-title>
        <div
          class="white--text ellipsis"
          style="max-width: 95%"
        >
          {{ deleteOverlay.file.name }}
        </div>
      </v-card-title>
      <v-card-subtitle v-if="deleteOverlay.error">
        <v-icon class="mr-3">
          fas fa-exclamation-triangle
        </v-icon>
        {{ deleteOverlay.error }}
      </v-card-subtitle>
      <v-card-text class="white--text text-body-1 text-center">
        Are you sure you want to delete this file? This action cannot be undone.
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="success"
          @click="hideDeleteOverlay()"
        >
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn
          class="error"
          outlined
          :loading="deleteOverlay.loading"
          @click="submit()"
        >
          delete anyway
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {useUserStore} from "@/stores/user";
const user = useUserStore();
import {useFilesStore} from "~/stores/files";

const filesStore = useFilesStore();

export default {
  name: "DeleteOverlay",
  computed: {
    showOverlay: {
      get() { return this.deleteOverlay.show },
      set() { this.hideDeleteOverlay() }
    },
    deleteOverlay() {
      return filesStore.deleteOverlay;
    }
  },
  methods: {
    async submit() {
      await filesStore.deleteFile(user.token);
      if (this.deleteOverlay.success) {
        await user.getMyself(user.token);
        this.hideDeleteOverlay();
      }
    },
    hideDeleteOverlay() {
      filesStore.hideDeleteOverlay();
    }
  }
}
</script>

<style scoped>

</style>
