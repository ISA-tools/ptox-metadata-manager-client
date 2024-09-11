<template>
  <v-container class="pa-0">
    <v-row v-if="error">
      <v-col cols="12">
        <v-alert type="error">
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card
          class="white"
          tile
        >
          <v-card-title class="text-h2 primary--text mb-4 text-uppercase">
            System users
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="users"
              :items-per-page="100"
              class="elevation-5"
              selectable-key="id"
              :loading="loading"
            >
              <template #[`item.role`]="{ item }">
                <v-chip
                  :color="getColor(item)"
                  dark
                >
                  {{ item.role }}
                </v-chip>
              </template>
              <template #[`item.action`]="{ item }">
                <v-btn
                  dense
                  tile
                  color="primary"
                  :disabled="item.role !== 'enabled'"
                  @click="activateUser(item.id)"
                >
                  Activate
                </v-btn>
                <v-btn
                  dense
                  tile
                  color="primary"
                  :disabled="item.role === 'admin'"
                  @click="make_admin(item.id)"
                >
                  Make admin
                </v-btn>
                <v-btn
                  dense
                  tile
                  color="primary"
                  :disabled="item.role === 'admin'"
                  @click="ban_user(item.id)"
                >
                  Ban user
                </v-btn>
                <v-btn
                  dense
                  tile
                  color="primary"
                  @click="delete_user(item.id)"
                >
                  delete user
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import RESTClient from "@/lib/RESTClient";

const restClient = new RESTClient();

export default {
  name: "UsersListPage",
  data() {
    return {
      loading: false,
      users: [],
      headers: [
        {
          text: 'id',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Username',
          value: 'username'
        },
        {
          text: 'Role',
          align: 'center',
          value: 'role'
        },
        {
          text: 'Organisation',
          value: 'organisation'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Modify user',
          sortable: false,
          value: 'action',
        }
      ],
      snackbar: false,
      error: false,
      success: false
    }
  },
  async fetch() { await this.getUser() },
  computed: { ...mapState('user', ['token']) },
  methods: {
    async activateUser(user_id) {
      await restClient.activate_user(this.token, user_id)
      await this.getUser()
    },
    async getUser() {
      this.error = false
      this.success = false
      this.loading = true
      try {
        this.users = await restClient.get_users(this.token)
        this.success = true
      }
      catch (e) { this.error = e }
      finally { this.loading = false }
    },
    async make_admin(user_id) {
      await restClient.make_admin(this.token, user_id)
      await this.getUser()
    },
    async ban_user(user_id) {
      await restClient.ban_user(this.token, user_id)
      await this.getUser()
    },
    async delete_user(user_id) {
      this.error = false
      try {
        await restClient.delete_user(this.token, user_id)
        await this.getUser()
      }
      catch (e) {
        this.error = e.response.data
      }
    },
    getColor(user) {
      const colors = {
        'enabled': 'grey lighten-1',
        'disabled': 'warning',
        'banned': 'error',
        'user': 'success',
        'admin': 'primary'
      }
      return colors[user.role]
    }
  }
}
</script>

<style scoped>
.blur {
  filter: blur(5px);
}
</style>
