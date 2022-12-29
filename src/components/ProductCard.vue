<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types/Products";
defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
const imgUrl = `https://picsum.photos/200/180?random=${Math.random()}`;

const isProductInCart = (productId: string) =>
  Object.keys(cartStore.contents).includes(productId);
</script>

<template>
  <v-card
    class="ma-2 pa-4"
    width="250"
    height="320"
    tile
    flat
    density="compact"
  >
    <RouterLink :to="'/products/' + product.slug">
      <v-img :src="imgUrl" cover></v-img>
    </RouterLink>

    <RouterLink :to="'/products/' + product.slug" class="text-decoration-none">
      <v-card-title class="px-1 text-body-2 text-wrap">
        {{ product.title.charAt(0).toUpperCase() + product.title.slice(1) }}
      </v-card-title>
    </RouterLink>

    <v-card-actions>
      <v-card-subtitle class="text-body-1 font-weight-bold text-red price">
        ₺{{ product.price }}
      </v-card-subtitle>

      <v-btn
        class="add-to-cart"
        color="primary"
        variant="outlined"
        size="small"
        @click="cartStore.add(product)"
        v-if="!isProductInCart(product._id)"
      >
        Add to Cart
      </v-btn>

      <div class="add-to-cart" v-if="isProductInCart(product._id)">
        <v-btn
          color="red"
          size="small"
          @click="cartStore.remove(product._id)"
          variant="elevated"
        >
          —
        </v-btn>
        <span class="px-2">{{
          cartStore.singleProductCount(product._id)
        }}</span>
        <v-btn
          size="small"
          color="green"
          @click="cartStore.add(product)"
          variant="elevated"
        >
          +
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.add-to-cart {
  position: absolute;
  margin: 10px;
  margin-right: 15px;
  bottom: 0;
  right: 0;
}

.price {
  position: absolute;
  margin: 10px;
  margin-bottom: 17px;
  bottom: 0;
  left: 0;
}
</style>
