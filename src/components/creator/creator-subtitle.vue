<template>
  <v-row>
    <v-col
      cols="12"
      class="primary darken-1 white--text py-3 d-flex addTriangle"
    >
      <v-icon
        class="mr-3 ml-1 white--text"
        style="width: 40px;"
      >
        {{ icon }}
      </v-icon>
      <h4 class="font-weight-thin">
        {{ text }}
      </h4>
      <v-spacer />
      <v-tooltip
        v-if="definition"
        color="primary darken-4"
        left
      >
        <template #activator="{ on, attrs }">
          <v-icon
            class="mr-3 white--text"
            v-bind="attrs"
            v-on="on"
          >
            fas fa-circle-question
          </v-icon>
        </template>
        <span
          class="tooltip text-body-2 text-justify py-2"
          v-html="definition"
        />
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CreatorSubtitle",
  props: {
    text: { type: String, required: true },
    icon: { type: String, required: true },
    definition: { type: String, required: false, default: "" },
  }
}
</script>

<style scoped>
.addTriangle {
  position: relative;
}
.addTriangle::after {
  content: "\25bc";
  position: absolute;
  color: #005eb6;
  right: 100%;
  width: 0;
  height: 0;
  margin-top: 30px;
  z-index:4;
  left: 25px;
}
.tooltip {
  display: inline-block;
  width: 200px;
}
</style>
