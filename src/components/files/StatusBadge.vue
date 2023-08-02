<template>
  <v-tooltip
    v-if="validated"
    bottom
  >
    <template #activator="{ on, attrs }">
      <v-chip
        pill
        :style="style"
        class="led white--text float-end"
        v-bind="attrs"
        v-on="on"
      >
        <strong class="mr-2"> Validated: </strong> {{ validated }}
      </v-chip>
    </template>
    <span> {{ statusTooltip }} </span>
  </v-tooltip>
</template>

<script>
export default {
  name: "StatusBadge",
  props: { validated: { type: String, required: true } },
  computed: {
    style() {
      console.log(this.validated)
      if (this.validated === 'No') return `background: ${this.$vuetify.theme.themes.light.warning} !important;`
      else if (this.validated === 'success') return `background: ${this.$vuetify.theme.themes.light.success} !important;`
      else if (this.validated === 'failed') return `background: ${this.$vuetify.theme.themes.light.error} !important;`
      return ''
    },
    statusTooltip() {
      if (this.validated === 'No') return 'This file has not been validated yet'
      else if (this.validated === 'success') return 'This file has passed validation'
      else if (this.validated === 'failed') return 'This file has failed validation'
      return ''
    }
  }
}
</script>

<style scoped>

</style>
