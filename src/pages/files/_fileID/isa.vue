<template>
  <v-container fluid>
    <GeneralLoader
      v-if="loading"
      text="Loading your files ..."
      :loading="loading"
    />
    <v-card
      v-else
      tile
    >
      <v-card-title class="primary lighten-2 white--text">
        <h1>ISA Converter</h1>
      </v-card-title>
      <v-card-text class="pt-2">
        <v-btn @click="makeJSONFIle()">
          Download JSON
        </v-btn>
      </v-card-text>
      <v-card-text v-if="!error && isa">
        {{ isa }}
      </v-card-text>
      <v-card-text
        v-else-if="error"
        class="pt-2"
      >
        <v-alert type="error">
          {{ error }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import RESTClient from "@/lib/RESTClient";

const restClient = new RESTClient();

export default {
  name: "ISAConverter",
  data() { return { isa: null, error: null, loading: false } },
  computed: {
    ...mapState("user", ["token"]),
    fileID() { return this.$route.params.fileID }
  },
  async mounted() {
    this.error = null
    this.loading = true
    try { this.isa = await restClient.convertFileToISA(this.token, this.fileID) }
    catch (error) { this.error = error.response.data.message }
    finally { this.loading = false }
  },
  methods: {
    makeJSONFIle() {
      const data = JSON.stringify(this.isa)
      const blob = new Blob([data], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'isa.json')
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>

<style scoped>

</style>
