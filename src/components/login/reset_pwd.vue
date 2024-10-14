<template>
  <v-form
    id="reset-pwd-form"
    ref="ResetPwdForm"
    v-model="isValid"
    style="height:100%"
    class="white--text pa-4 d-flex flex-column justify-center align-center bigForm"
    :class="classes"
  >
    <v-alert
      v-if="response.error"
      type="error"
    >
      {{ response.message }}
    </v-alert>
    <v-alert
      v-if="response.success"
      type="green"
    >
      {{ response.message }}
    </v-alert>
    <v-card
      class="primary white--text d-flex flex-column elevation-0 animated fadeIn pa-8"
      outlined
    >
      <v-card-title
        style="border-bottom: 1px solid #ccc"
        class="mb-3 pl-0 pb-1"
      >
        <h4 class="righteous">
          Reset Password
        </h4>
      </v-card-title>
      <v-card-text class="flex-grow-1">
        <v-text-field
          v-model="email"
          dark
          label="Email address"
          outlined
          dense
          class="mt-5"
          color="white"
          filled
          rounded
          :rules="[rules.required(), rules.email()]"
          hide-details
        />
      </v-card-text>
      <v-card-actions
        class="pr-3 d-flex"
      >
        <v-btn
          class="orange white--text"
          @click="setStep(1)"
        >
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          class="success"
          :disabled="!isValid"
          :loading="response.loading"
          @click="submit()"
        >
          Send Reset Link
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapMutations } from 'vuex'
import { required, isEmail } from "@/utils/rules"
import RESTClient from "@/lib/RESTClient";

const restClient = new RESTClient();

export default {
  name: "ResetPwd",
  props: {
    classes: { type: String, default: '', required: false }
  },
  data() {
    return {
      isValid: false,
      rules: { required: () => required(), email: () => isEmail() },
      email: null,
      response: { message: null, error: false, loading: false, success: false }
    }
  },
  destroyed() { this.setStep(1) },
  methods: {
    ...mapMutations('user', ['setStep']),
    async submit() {
      this.response = { message: null, error: false, loading: false, success: false };
      try {
        await restClient.send_reset_link(this.email);
        this.response.message = "Email sent successfully. Please check your inbox and click the provided link."
        this.response.success = true;
      }
      catch (e) {
        console.log(e)
        this.response.message = "Something went wrong.";
        this.response.error = true
      }
      finally { this.loading = false }
    }
  }
}
</script>

<style scoped>

</style>
