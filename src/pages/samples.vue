<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card tile>
          <v-card-title class="primary lighten-2 white--text">
            <h1>Samples</h1>
          </v-card-title>
          <v-card-text class="pt-2">
            <v-container fluid>
              <v-row>
                <v-col cols="2">
                  <v-select
                    v-model="pagination.per_page"
                    :items="per_page_options"
                    label="samples per page"
                    outlined
                    dense
                    hide-details
                    flat
                    rounded
                    @change="getData(1)"
                  />
                </v-col>
                <v-col cols="10">
                  <v-pagination
                    v-model="pagination.current_page"
                    :length="pagination.pages"
                    :total-visible="7"
                    circle
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider />
          <v-card-text class="pt-2">
            <v-data-table
              :items-per-page="parseInt(pagination.per_page)"
              :items="samples"
              :headers="headers"
              hide-default-footer
              :loading="loading"
            >
              <template #[`item.compound`]="{ item }">
                {{ item.compound.common_name }} ({{ item.compound.ptx_code }})
              </template>
              <template #[`item.vehicle`]="{ item }">
                {{ item.vehicle.common_name }}
              </template>
              <template #[`item.google_file`]="{ item }">
                <a
                  :href="'https://docs.google.com/spreadsheets/d/' + item.google_file"
                  target="_blank"
                >
                  <v-icon class="primary--text">
                    fab fa-google-drive
                  </v-icon>
                </a>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import { getSamples } from '@/lib/RESTClient'

export default {
  name: "SamplesPage",
  data() {
    return {
      samples: [],
      pagination: {
        per_page: 10,
        current_page: 1
      },
      per_page_options: [5, 10, 25, 50, 100],
      headers: [],
      loading: false
    }
  },
  computed: {
    ...mapState('user', ['token']),
    page() { return this.pagination.current_page }
  },
  watch: { async page() { await this.getData() } },
  async mounted() { await this.getData() },
  methods: {
    async getData(page = 0) {
      this.loading = true
      this.samples = []
      const current_page = page === 0 ? this.pagination.current_page : page
      const data  = await getSamples(this.token, current_page, this.pagination.per_page)
      this.makeHeaders(data.samples[0])
      this.samples = data.samples
      this.pagination = data.pagination
      this.loading = false
    },
    makeHeaders(sample){
      this.headers = []
      if (!sample) {
        return null;
      }

      Object.keys(sample).forEach(key => {
        this.headers.push({
          text: key.replace(/_/g, " ").toLowerCase(),
          value: key.toLowerCase(),
          sortable: true,
          align: "start"
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
