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
          <li> Files: {{ userData.files }}</li>
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
