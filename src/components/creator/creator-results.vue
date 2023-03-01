<template>
  <v-container>
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
            @click="copyURL()"
          >
            <v-icon class="white--text">
              fas fa-file-excel
            </v-icon>
          </v-btn>
          <v-text-field
            id="URLTextField"
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
          @click="setStep(1)"
        >
          Go back
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "CreatorResults",
  computed: { ...mapState('creator', ['created']) },
  methods: {
    ...mapMutations('creator-steps', ['setStep']),
    copyURL() { navigator.clipboard.writeText(this.created) }
  }
}
</script>

<style scoped>

</style>
