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
        <ResetPwd v-else-if="pageStep === 3" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginUser from "@/components/login/login"
import CreateUser from "@/components/login/create_user"
import ResetPwd from "@/components/login/reset_pwd"
import { useUserStore } from "~/stores/user";

const user = useUserStore();

export default {
  name: 'LoginPage',
  components: { ResetPwd, CreateUser, LoginUser },
  computed: {
    pageStep() { return user.pageStep }
  }
}
</script>

<style>
</style>
