<template>
  <v-col
    cols="12"
    class="grey lighten-2 pa-0"
  >
    <v-container
      fluid
      class="pa-0 px-3"
    >
      <v-row no-gutters>
        <CreatorControls
          target="replicates"
          class="borderRight"
        />
        <CreatorControls
          target="blanks"
          class="borderRight"
        />
        <CreatorControls
          target="controls"
        />
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import CreatorControls from "./creator-controls";
export default {
  name: "CreatorReplicates",
  components: { CreatorControls }
}
</script>

<style scoped>

</style>
