<template>
  <v-form
    id="changePwdWithToken"
    ref="changePwdWithTokenForm"
    v-model="isValid"
    style="height:100%"
    class="white--text pa-4 d-flex flex-column justify-center align-center bigForm"
  >
    <v-alert
      v-if="response.error"
      type="error"
    >
      {{ response.message }}
    </v-alert>
    <v-card
      class="primary white--text d-flex flex-column elevation-0 animated fadeIn pa-4"
      outlined
    >
      <v-card-title
        style="border-bottom: 1px solid #ccc"
        class="mb-3 pl-0 pb-1"
      >
        <h4 class="righteous">
          Set a new password
        </h4>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="password"
          dark
          label="Password"
          required
          outlined
          filled
          rounded
          dense
          class="mt-2"
          :rules="[rules.required(), rules.minSize(4)]"
          :type="showPwd ? 'text' : 'password'"
          :append-icon="showPwd ? 'fas fa-eye' : 'fas fa-eye-slash'"
          @click:append="showPwd = !showPwd"
        />
        <v-text-field
          v-model="confirmPassword"
          dark
          label="Confirm Password"
          required
          outlined
          filled
          rounded
          dense
          class="mt-2"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
          :rules="[rules.required(), rules.minSize(4)]"
          @click:append="showConfirmPassword = !showConfirmPassword"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          class="success px-4"
          :disabled="!isValid"
          :loading="response.loading"
          @click="submit()"
        >
          Change password
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { required, minSize } from "@/utils/rules"
import { reset_password } from "@/lib/RESTClient"
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "ChangePwdWithToken",
  data() {
    return {
      token: this.$route.params.token,
      password: null,
      confirmPassword: null,
      showPwd: false,
      showConfirmPassword: false,
      isValid: false,
      rules: { required: () => required(), minSize: (s) => minSize(s) },
      response: {
        loading: false,
        success: false,
        error: false,
        message: null
      }
    }
  },
  computed: { ...mapState('user', ['isLoggedIn']) },
  async mounted() { if (this.isLoggedIn) await this.logout() },
  methods: {
    ...mapMutations('user', ['setPassword', 'setResetPasswordMessage']),
    ...mapActions('user', ['logout']),
    async submit() {
      this.response = { loading: false, success: false, error: false, message: null }
      if (this.password !== this.confirmPassword) {
        this.response.error = true
        this.response.message = "Passwords do not match"
      }
      else if (this.$refs.changePwdWithTokenForm.validate()) {
        try {
          await reset_password(this.token, this.password)
          this.setPassword(this.password)
          this.setResetPasswordMessage("Password changed successfully. Please login.")
          await this.$router.push({ path: "/login" })
        }
        catch (e) {
          this.response.error = true
          this.response.message = e.response.data.msg
        }
      }
      else {
        this.response.error = true
        this.response.message = "Please fill in all fields"
      }
      this.response.loading = false
    }
  }
}
</script>

<style scoped>

</style>
