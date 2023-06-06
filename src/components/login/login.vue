<template>
  <v-form
    id="login-form"
    ref="LoginForm"
    v-model="isValid"
    style="height:100%"
    class="white--text pa-4 d-flex flex-column justify-center align-center"
    :class="classes"
  >
    <v-snackbar
      v-model="error"
      color="error"
    >
      {{ error }}
    </v-snackbar>
    <v-card
      class="primary white--text d-flex flex-column elevation-0 animated fadeIn pa-8"
      outlined
    >
      <v-card-title
        style="border-bottom: 1px solid #ccc"
        class="mb-3 pl-0 pb-1"
      >
        <h4 class="righteous">
          Login
        </h4>
      </v-card-title>
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
          hide-details
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
          hide-details
          @input="updatePassword"
          @click:append="showPwd = !showPwd"
        />
        <div
          v-if="showNext"
          class="text-center mt-4 white--text cursor-pointer text-decoration-underline"
          @click="setStep(2)"
        >
          Need a new account ? Create one here.
        </div>
      </v-card-text>
      <v-card-actions
        class="pr-3 d-flex justify-center"
      >
        <v-btn
          class="success"
          :disabled="!isValid"
          @click="login({router: $router, form: $refs.LoginForm, next: redirect_url})"
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
    name: "LoginUser",
    props: {
      classes: {
        type: String,
        default: '',
        required: false
      },
      showNext: {
        type: Boolean,
        default: true,
        required: false
      }
    },
    data() {
      return {
        isValid: false,
        rules: { required: () => required() },
        loading: false,
        showPwd: false,
      }
    },
    computed: {
      ...mapState('user', ['error', 'username', 'password']),
      redirect_url() { return this.$route.query.next || '/' }
    },
    methods: {
      ...mapActions('user', ['login']),
      ...mapMutations('user', ['setUsername', 'setPassword', 'setStep']),
      updateUsername (e) { this.setUsername(e) },
      updatePassword (e) { this.setPassword(e) },
    }
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
