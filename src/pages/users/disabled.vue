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
          width="500px"
        >
          <v-card-title>
            <h1>Inactive account</h1>
          </v-card-title>
          <v-card-text> Your account has not been activated yet. Please check your email. </v-card-text>
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
  name: "DisabledAccount"
}
</script>

<style scoped>

</style>
