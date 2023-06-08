<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="d-flex justify-center align-center"
        style="height:90vh"
      >
        <v-card
          class="white"
          width="400px"
        >
          <v-card-title>
            <h1>Unauthorized</h1>
          </v-card-title>
          <v-card-text> You are not authorized to view this page.</v-card-text>
          <v-card-actions>
            <v-btn
              nuxt
              color="primary"
              to="/"
            >
              Home
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UnauthorizedPage"
}
</script>

<style scoped>

</style>
