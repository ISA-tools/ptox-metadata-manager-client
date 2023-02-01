<template>
  <v-container
    fluid
    class="pa-0"
    :class="{'pt-6': $vuetify.breakpoint.lgAndUp}"
  >
    <v-row
      no-gutters
      class="user pa-2"
      :class="{'mt-10': $vuetify.breakpoint.lgAndUp}"
      style="border-bottom: 1px solid dimgrey"
    >
      <v-icon class="white--text mr-2">
        fas fa-circle-user
      </v-icon>
      <nuxt-link
        to="/me"
        class="white--text"
      >
        Welcome, {{ username }}
      </nuxt-link>
    </v-row>
    <v-row
      no-gutters
      class="user pa-2 pl-3"
      style="border-bottom: 1px solid dimgrey"
    >
      <v-icon class="white--text mr-2">
        fas fa-file-excel
      </v-icon>
      <nuxt-link
        to="/"
        class="white--text"
      >
        Create spreadsheet
      </nuxt-link>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavDrawer",
  computed: { ...mapState("user", ["username"]) },
}
</script>

<style scoped>

</style>
