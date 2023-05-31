<template>
  <v-app>
    <v-navigation-drawer
      v-if="isLoggedIn"
      v-model="drawer"
      fixed
      :width="drawerWidth"
      :height="drawerHeight"
      class="fixed elevation-0"
      :bottom="$vuetify.breakpoint.mdAndDown"
      centered
      color="primary darken-3"
      style="z-index: 11"
      clipped
      temporary
    >
      <NavDrawer />
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      app
      class="elevation-0 primary"
      height="64"
      style="z-index: 10"
    >
      <nuxt-link
        to="/"
        class="white--text"
      >
        <v-toolbar-title
          class="text-body-1 righteous"
        >
          {{ title }}
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer />
      <v-app-bar-nav-icon
        v-if="isLoggedIn"
        class="white--text"
        @click.stop="drawer = !drawer"
      />
    </v-app-bar>
    <v-main class="primary">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavDrawer from "../components/nav-drawer"

export default {
  name: 'DefaultLayout',
  components: { NavDrawer },
  data () {
    return {
      drawer: false,
      fixed: false,
      title: 'Metadata Manager'
    }
  },
  computed: {
    drawerHeight() { return this.$vuetify.breakpoint.mdAndDown ? '33%' : '100%' },
    drawerWidth() { return this.$vuetify.breakpoint.mdAndDown ? '80%' : '300px' },
    ...mapState('user', ['isLoggedIn'])
  },
}
</script>

<style>
  html {
    font-size: 20px;
    scrollbar-color: #14418A #E0E0E0;
  }
  a {
    text-decoration: none !important;
  }
  main {
    padding-bottom: 0 !important;
  }
  .v-application .righteous {
    font-family: 'Righteous', cursive !important;
    text-transform: uppercase;
  }
  .v-application--wrap {
    display: flex;
    flex-direction: column;
  }
</style>
