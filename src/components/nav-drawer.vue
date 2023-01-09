<template>
  <v-container
    fluid
    class="pa-0"
  >
    <div
      class="user pa-2"
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
    </div>
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
