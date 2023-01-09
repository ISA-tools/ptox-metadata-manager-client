<template>
  <v-form
    id="login-form"
    ref="LoginForm"
    v-model="isValid"
    style="height:100%"
    class="primary white--text pa-4 d-flex flex-column justify-center align-center"
  >
    <v-alert
      v-if="error"
      type="error"
      class="white--text"
      style="width: 100%"
    >
      {{ error }}
    </v-alert>
    <v-card
      class="primary white--text d-flex flex-column"
      style="height: 80%; width: 100%"
      outlined
    >
      <v-card-title
        class="d-flex justify-center align-center"
      >
        <h3> Login </h3>
      </v-card-title>
      <v-card-text>
        <v-alert
          type="info"
          class="success"
        >
          Contact us if you need an account
        </v-alert>
      </v-card-text>
      <v-card-text class="flex-grow-1">
        <v-text-field
          :value="username"
          dark
          label="Username"
          outlined
          dense
          class="mt-5"
          color="white"
          filled
          rounded
          :rules="[rules.required()]"
          @input="updateUsername"
        />
        <v-text-field
          :value="password"
          dark
          label="Password"
          outlined
          dense
          color="white"
          filled
          rounded
          :rules="[rules.required()]"
          class="mt-10"
          :type="showPwd ? 'text' : 'password'"
          :append-icon="showPwd ? 'fas fa-eye' : 'fas fa-eye-slash'"
          @input="updatePassword"
          @click:append="showPwd = !showPwd"
        />
      </v-card-text>
      <v-card-actions
        class="pr-3 d-flex justify-end"
      >
        <v-btn
          class="success mr-2"
          :disabled="!isValid"
          @click="login({router: $router, form: $refs.LoginForm})"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { required } from "@/utils/rules.js"

export default {
  name: 'LoginPage',
  data() {
    return {
      isValid: false,
      rules: { required: () => required() },
      loading: false,
      showPwd: false,
    }
  },
  computed: { ...mapState('user', ['error', 'username', 'password']) },
  methods: {
    ...mapActions('user', ['login']),
    ...mapMutations('user', ['setUsername', 'setPassword']),
    updateUsername (e) { this.setUsername(e) },
    updatePassword (e) { this.setPassword(e) },
  }
}
</script>

<style>
  #login-form input {
    font-size: 30px;
    padding: 30px 0;
  }
  #login-form label {
    font-size: 1.5rem;
    overflow: initial !important;
  }
  #login-form .v-input__append-inner {
    margin-top: 20px;
  }
</style>
