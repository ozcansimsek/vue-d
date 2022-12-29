<script setup lang="ts">
import { ucFirstLetters } from "@/helpers/ucFirstLetters";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
</script>

<template>
  <VSheet rounded width="100%">
    <VList>
      <VListSubheader>Products in Cart</VListSubheader>
      <VDivider />
      <VListItem v-if="cartStore.count === 0">Your cart is empty.</VListItem>
      <VListItem v-for="item in cartStore.contents">
        <template v-slot:prepend>
          <RouterLink
            class="text-decoration-none black--text"
            :to="'/products/' + item.slug"
          >
            <VListItemTitle class="text-h6">{{
              ucFirstLetters(item.title)
            }}</VListItemTitle>
          </RouterLink>
        </template>

        <template v-slot:append>
          <v-btn
            color="red"
            size="small"
            @click="cartStore.remove(item._id)"
            variant="elevated"
          >
            —
          </v-btn>
          <VListItemTitle class="mx-4">{{ item.quantity }}</VListItemTitle>
          <v-btn
            color="green"
            size="small"
            @click="cartStore.add(item)"
            variant="elevated"
          >
            +
          </v-btn>
          <VListItemAction>
            <v-btn icon @click="cartStore.removeAll(item._id)">
              <v-icon color="red darken-4">mdi-basket-remove</v-icon>
            </v-btn>
          </VListItemAction>
        </template>
      </VListItem>
    </VList>
  </VSheet>
</template>
