<template>
  <div class="pt-5">
    <v-snackbar
      v-model="error"
      color="error"
      top
      style="top: 70px;"
      :timeout="-1"
    >
      {{ error }}
    </v-snackbar>
    <v-snackbar
      v-model="success"
      color="success"
      top
      style="top: 70px;"
      :timeout="-1"
    >
      {{ success }}. Please login below.
    </v-snackbar>
    <LoginUser
      v-if="tokenValidation"
      classes="mt-12 pt-10"
      :show-next="false"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import LoginUser from "@/components/login/login.vue";

export default {
  name: "ValidateAccount",
  components: { LoginUser },
  computed: {
    token() { return this.$route.params.token },
    ...mapState('user', ['tokenValidation', 'tokenError']),
    error: {
      get() { return this.tokenError },
      set() { }
    },
    success: {
      get() { return this.tokenValidation },
      set() { }
    }
  },
  async mounted() { await this.activateToken(this.token) },
  methods: {
    ...mapActions('user', ['activateToken']),
    ...mapMutations('user', ['setTokenError', 'setTokenValidation'])
  },
}
</script>

<style>
  .v-snack__content {
    text-align: center;
  }
</style>
