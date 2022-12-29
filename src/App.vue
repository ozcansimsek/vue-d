<script setup lang="ts">
import CategoriesNav from "./components/CategoriesNav.vue";
import { usePersistCart } from "./composables/usePersistCart";
import { useCartStore } from "./stores/cart";
const cartStore = useCartStore();

const links = [{ text: "Home", path: "/", icon: "mdi-home" }];

const loginLink = { text: "Login", path: "/login", icon: "mdi-login" };
const cartLink = { text: "Cart", path: "/cart", icon: "mdi-cart" };
usePersistCart();
</script>

<template>
  <v-app id="app">
    <v-app-bar flat color="blue-grey-darken-4">
      <v-container class="fill-height d-flex align-center">
        <v-chip
          class="mr-10 ml-4 pa-2 text-h6 font-weight-bold"
          color="blue-darken-1"
          size="32"
          >Awesome Shop</v-chip
        >

        <v-btn
          v-for="link in links"
          :key="link.text"
          variant="text"
          :to="link.path"
        >
          <v-icon>{{ link.icon }}</v-icon>
          {{ link.text }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn :key="loginLink.text" variant="text" :to="loginLink.path">
          <v-icon>{{ loginLink.icon }}</v-icon>
          {{ loginLink.text }}
        </v-btn>

        <v-btn :key="cartLink.text" variant="text" :to="cartLink.path"
          ><v-icon>mdi-cart</v-icon> {{ cartLink.text }}
          {{ cartStore.count }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg"><CategoriesNav /></v-sheet>
          </v-col>

          <v-col cols="10">
            <VSheet min-height="70vh">
              <RouterView class="main justify-center" />
            </VSheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.main {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: "white";
  padding: 4;
}
</style>
