<template>
  <v-form
    id="createUser"
    ref="createUser"
    v-model="isValid"
    style="height:100%"
    class="white--text pa-4 d-flex flex-column justify-center align-center bigForm"
  >
    <v-alert
      v-if="error"
      type="error"
    >
      {{ error }}
    </v-alert>
    <v-card
      v-if="!creationSuccess"
      class="primary white--text d-flex flex-column elevation-0 animated fadeIn pa-4"
      outlined
    >
      <v-card-title
        style="border-bottom: 1px solid #ccc"
        class="mb-3 pl-0 pb-1"
      >
        <h4 class="righteous">
          Create a new account
        </h4>
      </v-card-title>
      <v-card-text class="flex-grow-1">
        <v-text-field
          v-model="username"
          label="Username"
          dark
          required
          outlined
          filled
          rounded
          dense
          class="mt-2"
          :rules="[rules.required()]"
        />
        <v-text-field
          v-model="email"
          dark
          label="Email"
          required
          outlined
          filled
          rounded
          dense
          class="mt-2"
          :rules="[rules.required(), rules.minSize(4), rules.isEmail()]"
        />
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
        <v-autocomplete
          v-model="organisation"
          dark
          :items="availablePartners"
          item-text="longname"
          item-value="name"
          label="Partner"
          required
          outlined
          filled
          rounded
          dense
          class="mt-2"
          :rules="[rules.required()]"
        />
        <div
          class="text-center mt-4 white--text cursor-pointer text-decoration-underline"
          @click="setStep(1)"
        >
          Already have an account ? Login here.
        </div>
      </v-card-text>
      <v-card-actions
        class="pr-3 d-flex justify-center"
      >
        <v-btn
          class="success"
          :disabled="!isValid"
          @click="createUser()"
        >
          Create my account
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card
      v-if="creationSuccess"
      type="success"
      class="primary white--text d-flex flex-column elevation-0 animated fadeIn pa-4"
      outlined
    >
      <v-card-title
        style="border-bottom: 1px solid #ccc"
        class="mb-3 pl-0 pb-1"
      >
        <h4 class="righteous">
          User account created successfully
        </h4>
      </v-card-title>
      <v-card-text class="pt-2 white--text text-body-1">
        Check your email address to confirm your account.
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import { required, minSize, isEmail } from "@/utils/rules";
import { useUserStore } from '@/stores/user'
import { useCreatorGeneralStore } from "@/stores/creator-general";

const user = useUserStore();
const creatorGeneral = useCreatorGeneralStore();

export default {
  name: "CreateUser",
  data() {
    return {
      isValid: false,
      rules: {
        required: () => required(),
        minSize: () => minSize(4),
        isEmail: () => isEmail()
      },
      showPwd: false,
      showConfirmPassword: false,
    }
  },
  computed: {
    availablePartners() {
      return creatorGeneral.availablePartners;
    },
    username: {
      get() { return user.createUserData.username },
      set(value) { user.setNewUserUsername(value) }
    },
    password: {
      get() { return user.createUserData.password },
      set(value) { user.setNewUserPassword(value) }
    },
    confirmPassword: {
      get() { return user.createUserData.confirmPassword },
      set(value) { user.setNewUserConfirmPassword(value) }
    },
    organisation: {
      get() { return user.createUserData.organisation },
      set(value) { user.setNewUserOrganisation(value) }
    },
    email: {
      get() { return user.createUserData.email },
      set(value) { user.setNewUserEmail(value) }
    },
    error() { return user.error },
    creationSuccess() { return user.creationSuccess }
  },
  watch: { error() { if (user.error) this.showSnackbar = true } },
  async mounted() { if (this.availablePartners.length === 0) await creatorGeneral.getFormData() },
  destroyed() { user.setStep(1) },
  methods: {
    createUser() { return user.createUser }
  }
}
</script>

<style scoped>
</style>
