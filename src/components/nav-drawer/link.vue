<template>
  <v-row
    class="borderedBottom flex-grow-0"
    :class="breaker ? 'borderedTop' : ''"
  >
    <v-col
      cols="12"
      class="pl-5 d-flex flex-row"
    >
      <div
        style="width: 50px"
        class="d-flex align-center justify-center"
      >
        <v-icon class="white--text">
          {{ icon }}
        </v-icon>
      </div>

      <nuxt-link
        :to="to"
        class="white--text"
      >
        {{ text }}
      </nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "NavLink",
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
    text: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    breaker: { type: Boolean, default: false },
  }
}
</script>

<style scoped>
 .borderedBottom {
   border-bottom: 1px solid dimgrey;
 }
 .borderedTop {
    border-top: 1px solid dimgrey;
 }
</style>
