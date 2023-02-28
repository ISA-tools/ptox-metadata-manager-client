<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row no-gutters>
      <v-col cols="12">
        <creator-subtitle
          text="Create User"
          icon="fas fa-user-plus"
        />
      </v-col>
      <v-col
        v-if="creationSuccess"
        class="pa-2"
      >
        <v-alert
          type="success"
          class="mt-2"
          dismissible
          @input="creationSuccess = false"
        >
          User created successfully
        </v-alert>
      </v-col>
      <v-col
        cols="12"
        class="pa-2"
      >
        <v-form
          id="createUser"
          ref="createUser"
        >
          <v-text-field
            v-model="username"
            label="Username"
            required
            outlined
            filled
            rounded
            dense
            class="mt-2"
          />
          <v-text-field
            v-model="password"
            label="password"
            required
            outlined
            filled
            rounded
            dense
            class="mt-2"
            type="password"
          />
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            required
            outlined
            filled
            rounded
            dense
            class="mt-2"
            type="password"
          />
          <v-autocomplete
            v-model="organisation"
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
          />
          <v-divider />
          <v-btn
            color="primary"
            class="mt-2"
            @click="createUser()"
          >
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-snackbar v-model="showSnackbar">
      <template #action="{ attrs }">
        <div class="d-flex flex-column align-center justify-center pa-2 text-center error--text">
          There was en error: {{ error }}
          <v-divider
            class="my-4 error"
            style="width: 100%; height:1px"
          />
          <v-btn
            class="primary"
            v-bind="attrs"
            @click="showSnackbar = false"
          >
            Close
          </v-btn>
        </div>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import CreatorSubtitle from "../components/creator/general/creator-subtitle.vue";

export default {
  name: "CreateUser",
  components: { CreatorSubtitle },
  data() { return { showSnackbar: false } },
  computed: {
    ...mapState('user', ['createUserData', 'token', 'error', 'creationSuccess']),
    ...mapState('creator-general', ['availablePartners']),
    username: {
      get() { return this.createUserData.username },
      set(value) { this.setNewUserUsername(value) }
    },
    password: {
      get() { return this.createUserData.password },
      set(value) { this.setNewUserPassword(value) }
    },
    confirmPassword: {
      get() { return this.createUserData.confirmPassword },
      set(value) { this.setNewUserConfirmPassword(value) }
    },
    organisation: {
      get() { return this.createUserData.organisation },
      set(value) { this.setNewUserOrganisation(value) }
    }
  },
  watch: { error() { if (this.error) this.showSnackbar = true } },
  async mounted() { if (this.availablePartners.length === 0) await this.getFormData(this.token) },
  methods: {
    ...mapActions('creator-general', ['getFormData']),
    ...mapActions('user', ['createUser']),
    ...mapMutations('user', [
        'setNewUserUsername', 'setNewUserPassword', 'setNewUserConfirmPassword', 'setNewUserOrganisation'
    ])
  }
}
</script>

<style scoped>
</style>
