<template>
  <v-container
    class="me primary"
    style="height:100%"
  >
    <v-card
      class="d-flex flex-column grey lighten-2"
      style="height:100%"
    >
      <v-card-title class="primary--text">
        Hello, {{ username }}
      </v-card-title>
      <v-card-text class="primary--text flex-grow-1">
        My data:
        <ul>
          <li> Organisation: {{ userData.organisation }}</li>
          <li> Google Drive: {{ userData.googleDriveID }}</li>
          <li> User ID: {{ userData.userID }}</li>
          <li class="pr-4">
            <div class="mb-2">
              Files:
            </div>
            <v-container>
              <v-row>
                <v-col
                  v-for="(file, file_index) in userData.files"
                  :key="'userFile_' + file_index"
                  xs="12"
                  sm="12"
                  md="6"
                  lg="6"
                  xl="4"
                >
                  <v-card>
                    <v-card-title class="py-1 primary white--text">
                      {{ file.name }}
                    </v-card-title>
                    <v-card-text class="pt-2">
                      <ul>
                        <li>
                          Link:
                          <a
                            :href="'https://docs.google.com/spreadsheets/d/' + file.gdrive_id"
                            target="_blank"
                          >
                            ...{{ file.gdrive_id }}
                          </a>
                        </li>
                        <li>batch: {{ file.batch }}</li>
                        <li>organisation: {{ file.organisation }}</li>
                        <li>organism: {{ file.organism }}</li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <nuxt-link to="/">
          <v-btn
            color="primary"
            small
          >
            Create spreadsheet
          </v-btn>
        </nuxt-link>
        <v-spacer />
        <nuxt-link to="/logout">
          <v-btn
            color="red"
            dark
            small
          >
            Logout
          </v-btn>
        </nuxt-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: 'MePage',
  computed: { ...mapState('user', ['username', 'userData']) },
  async mounted(){ await this.getMyself() },
  methods: { ...mapActions('user', ['getMyself']) },
}
</script>

<style scoped>

</style>
