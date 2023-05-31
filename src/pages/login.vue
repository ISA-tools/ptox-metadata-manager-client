<template>
  <v-container
    fluid
    class="pa-0"
    style="height:100%"
  >
    <v-row style="height:100%">
      <v-col cols="12">
        <LoginUser v-if="pageStep === 1" />
        <CreateUser v-else-if="pageStep === 2" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import LoginUser from "@/components/login/login";
import CreateUser from "@/components/login/create_user.vue";

export default {
  name: 'LoginPage',
  components: { CreateUser, LoginUser },
  computed: { ...mapState('user', ['pageStep']) }
}
</script>

<style>
</style>
