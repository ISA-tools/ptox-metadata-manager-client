<template>
  <div
    id="createSpreadsheet"
    style="height: 100%"
  >
    <CreatorIndex />
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

    <GeneralLoader
      :loading="loading"
      text="Loading form data ..."
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex"
import CreatorIndex from "@/components/creator/"
import GeneralLoader from "@/components/GeneralLoader.vue";


export default {
  name: 'IndexPage',
  components: { CreatorIndex, GeneralLoader },
  data() { return { showSnackbar: false, loading: false }  },
  async fetch() {
    this.loading = true
    await this.getMyself()
    await this.getFormData(this.token)
    this.loading = false
  },
  computed: {
    ...mapState('user', ['token']),
    ...mapState('creator', ['created', 'error'])
  },
  watch: { error() { if (this.error) this.showSnackbar = true } },
  beforeDestroy() { this.setStep(1) },
  methods: {
    ...mapActions('creator-general', ['getFormData']),
    ...mapMutations('creator-steps', ['setStep']),
    ...mapActions('user', ['getMyself'])
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
