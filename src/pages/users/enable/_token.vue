<template>
  <div class="pt-5 d-flex flex-column justify-center align-center">
    <v-alert
      v-if="tokenError"
      type="error"
      width="450px"
    >
      {{ tokenError }}
    </v-alert>
    <v-alert
      v-if="tokenValidation"
      type="success"
    >
      {{ tokenValidation }} Please login below.
    </v-alert>
    <LoginUser
      v-if="tokenValidation"
      classes="mt-12 pt-10"
      :show-next="false"
    />
  </div>
</template>

<script>
import LoginUser from "@/components/login/login.vue";
import { useUserStore } from "~/stores/user";

const user = useUserStore();

export default {
  name: "ValidateAccount",
  components: { LoginUser },
  async fetch() {
    try { await this.activateToken(this.token) }
    catch (error) { this.setTokenError(error) }
  },
  computed: {
    token() { return this.$route.params.token },
    tokenValidation() { return user.tokenValidation },
    tokenError() { return user.tokenError }
  },
  methods: {
    activateToken() { user.activateToken() },
    setTokenError() { user.setTokenError() },
    setTokenValidation() { user.setTokenValidation() }
  },
}
</script>

<style>
  .v-snack__content {
    text-align: center;
  }
</style>
