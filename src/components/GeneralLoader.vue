<template>
  <v-overlay :value="loading">
    <v-card
      color="transparent"
      elevation="0"
      class="d-flex flex-column align-center justify-center"
    >
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
        class="mb-4"
      />
      <span class="white--text righteous"> {{ text }} </span>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: "GeneralLoader",
  props: {
    text: {
      type: String,
      default: "Loading ...",
    },
    loading: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>

</style>
