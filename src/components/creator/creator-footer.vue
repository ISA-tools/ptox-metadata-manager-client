<template>
  <v-footer
    class="pa-0 primary"
    style="bottom:0"
  >
    <v-container
      fluid
      class="pa-0"
    >
      <v-row no-gutters>
        <v-col
          cols="6"
          class="pa-0 mb-0"
          style="border-right: 3px solid #1976D2"
        >
          <v-btn
            tile
            class="primary darken-4 white--text fullWidth py-7"
            @click="resetForm()"
          >
            <v-icon
              class="white--text"
              left
            >
              fas fa-trash-can
            </v-icon>
            <b>RESET</b>
          </v-btn>
        </v-col>
        <v-col
          cols="6"
          class="pa-0 mb-0"
        >
          <v-btn
            tile
            class="primary darken-4 white--text fullWidth py-7"
            :loading="loading"
            @click="submitForm(token)"
          >
            <v-icon
              class="white--text"
              left
            >
              fas fa-file-excel
            </v-icon>
            <b>CREATE</b>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CreatorFooter",
  computed: {
    ...mapState("user", ["token"]),
    ...mapState("creator", ["loading"])
  },
  methods: { ...mapActions("creator", ["resetForm", "submitForm"]) }
}
</script>

<style scoped>

</style>
