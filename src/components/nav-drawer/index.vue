<template>
  <v-container
    fluid
    class="pa-0 d-flex flex-column"
    style="height:99%"
    :class="$vuetify.breakpoint.mdAndDown ? 'py-2' : ''"
  >
    <v-row
      v-if="$vuetify.breakpoint.lgAndUp"
      class="righteous mt-1 flex-grow-0"
    >
      <v-col
        cols="12"
        class="text-center white--text pb-5 d-flex justify-center align-center flex-column"
        style="border-bottom: 1px solid dimgrey"
      >
        <div class="text-bigger">
          Metadata Manager
        </div>
        <div
          class="ellipsis"
          style="max-width: 245px"
        >
          Welcome, {{ username }}
        </div>
      </v-col>
    </v-row>

    <NavLink
      v-if="role !== 'banned' && role !== 'disabled'"
      to="/users/files"
      icon="fas fa-circle-user"
      text="Browse files"
    />

    <NavLink
      v-if="role === 'admin' || role === 'user'"
      to="/files/create"
      icon="fas fa-file-excel"
      text="Create a file"
    />

    <NavLink
      v-if="role !== 'disabled' && role !== 'banned'"
      to="/files/register"
      icon="fas fa-file-excel"
      text="Register a file"
    />

    <NavLink
      v-if="role === 'admin'"
      to="/users"
      icon="fas fa-person-booth"
      text="List of users"
    />

    <div
      v-if="role === 'disabled'"
      class="pa-4 white--text text-center"
    >
      <v-icon
        large
        class="white--text my-2"
      >
        fas fa-warning
      </v-icon> <br>
      Your account has not been activated. Please check your email.
    </div>
    <div
      v-if="$vuetify.breakpoint.lgAndUp"
      class="flex-grow-1"
    />

    <NavLink
      v-if="isLoggedIn"
      to="/logout"
      icon="fas fa-sign-out"
      text="Logout"
      breaker
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import NavLink from "@/components/nav-drawer/link.vue"


export default {
  name: "NavDrawer",
  components: { NavLink },
  computed: { ...mapState("user", ["isLoggedIn", "username", "role"]) },
}
</script>

<style scoped>
  .text-bigger {
    font-size: 1.2rem;
  }
</style>
