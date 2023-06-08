<template>
  <v-container
    fluid
    style="height: 100%"
  >
    <v-row
      style="height: 100%"
      align="center"
    >
      <v-col
        cols="12"
        class="righteous d-flex flex-column justify-center align-center white--text animated fadeIn slow"
      >
        <div
          :style="$vuetify.breakpoint.lgAndUp ? 'max-width: 1200px' : 'max-width: 500px'"
          class="primary pa-10"
        >
          <h1 :class="$vuetify.breakpoint.mdAndUp ? 'text-right' : 'text-center'">
            Metadata Manager for Life science experiments
          </h1>
          <h2
            class="font-italic"
            :class="$vuetify.breakpoint.mdAndUp ? 'text-right' : 'text-center'"
          >
            Simple,
          </h2>
          <h2
            class="font-italic"
            :class="$vuetify.breakpoint.mdAndUp ? 'text-right' : 'text-center'"
          >
            Efficient.
          </h2>
          <div
            class="buttonZone mt-5 d-flex"
            :class="$vuetify.breakpoint.mdAndUp ? 'flex-row justify-end align-end' : 'flex-column justify-center align-center'"
          >
            <v-btn
              nuxt
              to="/files/create"
              color="success"
              class="mr-2"
              outlined
              x-large
            >
              Create a new experiment
            </v-btn>
            <v-btn
              nuxt
              to="/users/files"
              color="grey lighten-1"
              class="ml-2"
              :class="$vuetify.breakpoint.mdAndUp ? 'mt-0' : 'mt-4'"
              outlined
              x-large
            >
              Browse your files
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>



export default {
  name: "HomePage",
}
</script>

<style>
</style>
