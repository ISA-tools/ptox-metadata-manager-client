<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      width="80%"
      height="80%"
      class="fixed elevation-0"
      bottom
      centered
      color="primary darken-3"
    >
      <NavDrawer />
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="elevation-0 primary"
    >
      <a
        href="/"
        class="white--text"
      >
        <v-toolbar-title
          id="righteous"
          class="text-body-1 righteous"
        > {{ title }} </v-toolbar-title>
      </a>
      <v-spacer />
      <v-app-bar-nav-icon
        class="white--text"
        @click.stop="drawer = !drawer"
      />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "../components/nav-drawer";

export default {
  name: 'DefaultLayout',
  components: { NavDrawer },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      title: 'Metadata Manager'
    }
  }
}
</script>

<style>
  html {
    font-size: 20px;
    scrollbar-color: #1976d2 #E0E0E0;
  }
  a {
    text-decoration: none !important;
  }
  main {
    padding-bottom: 0 !important;
  }
  .v-application .text-body-1.righteous#righteous {
    font-family: 'Righteous', cursive !important;
    text-transform: uppercase;
  }
</style>
