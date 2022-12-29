<script lang="ts">
import type { Response } from "@/types/Response";
import type { Token } from "@/types/Token";

export default {
  data() {
    return {
      email: "marklyan@gmail.com",
      password: "simple_password",
      response: {} as Response<Token>,
    };
  },

  methods: {
    async fetchLogin() {
      await fetch("https://api.storerestapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((responseJSON: Response<Token>) => {
          this.response = responseJSON;
        });
    },
  },
};
</script>

<template>
  <VSheet class="ma-10" width="100%">
    <VTextField
      v-model="email"
      variant="outlined"
      name="username"
      label="Username"
    />
    <VTextField
      v-model="password"
      variant="outlined"
      name="password"
      label="Password"
      type="password"
    />
    <VAlert class="my-2" type="success" v-if="response.status === 200"
      >Login Success! You will not be redirected.</VAlert
    >
    <VAlert class="my-2" type="error" v-if="response.status === 400"
      >Login Failed! You will not be redirected.</VAlert
    >

    <v-btn color="blue" type="submit" @click="fetchLogin">Login</v-btn>
  </VSheet>
</template>
