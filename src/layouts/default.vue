<template>
  <v-app>
    <v-navigation-drawer
      v-if="isLoggedIn"
      v-model="drawer"
      :width="drawerWidth"
      class="fixed elevation-0"
      :location="$vuetify.breakpoint.mdAndDown ? 'bottom' : undefined"
      centered
      color="grey-darken-4"
      style="z-index: 11"
      temporary
    >
      <NavDrawer />
    </v-navigation-drawer>
    <v-app-bar
      class="elevation-0 bg-primary"
      height="64"
      style="z-index: 10"
    >
      <nuxt-link
        to="/"
        class="text-white"
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
        class="text-white"
        @click.stop="drawer = !drawer"
      />
      <v-btn
        v-else
        to="/login"
        color="white"
        variant="outlined"
      >
        Login
      </v-btn>
    </v-app-bar>
    <v-main class="bg-primary">
      <component :is="'script'" type="application/ld+json">
        {
        "@context": "http://schema.org",
        "@type": "SoftwareApplication",
        "@id": "https://ptmm.netlify.app/",
        "name": "Precision Toxicology Metadata Manager",
        "description": "Metadata Management for Life science experiments made easy",
        "applicationCategory": "SaaS",
        "operatingSystem": "All",
        "author": {"@type": "Person", "name": "Dominique Batista"},
        "funder": {"@type": "Organization", "name": "European Commission"},
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"}
        }
      </component>
      <NuxtParticles
        id="particles"
        :particles-init="particlesInit"
        :options="options"
        style="width:50%"
      />
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { loadFull } from "tsparticles"
import NavDrawer from "../components/nav-drawer"

const particlesInit = async engine => { await loadFull(engine); };

export default {
  name: 'DefaultLayout',
  components: { NavDrawer },
  data () {
    return {
      drawer: false,
      fixed: false,
      title: 'Metadata Manager',
      particlesInit
    }
  },
  computed: {
    drawerWidth() { return this.$vuetify.breakpoint.mdAndDown ? '80%' : '300px' },
    ...mapState('user', ['isLoggedIn']),
    options: {
      get() {
        return {
          pauseOnOutsideViewport: true,
          background: {
            color: {
              value: 'transparent'
            }
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: this.$vuetify.theme.themes.light.info
            },
            links: {
              color: this.$vuetify.theme.themes.light.info,
              distance: 130,
              enable: true,
              opacity: 0.8
            },
            collisions: {
              enable: true
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: 'bounce',
              random: false,
              speed: 1,
              straight: false
            },
            number: {
              density: {
                enable: true,
                value_area: 800
              },
              value: 80
            },
            opacity: {
              value: 1
            },
            shape: {
              type: null
            },
            size: {
              random: true,
              value: 5
            }
          },
          detectRetina: true
        }
      }
    }
  }
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

  .v-application--wrap {
    display: flex;
    flex-direction: column;
  }
</style>
