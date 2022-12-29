<script lang="ts">
import { ucFirstLetters } from "@/helpers/ucFirstLetters";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types/Products";
import type { Response } from "@/types/Response";

export default {
  setup() {
    const cartStore = useCartStore();
    const isProductInCart = (productId: string) =>
      Object.keys(cartStore.contents).includes(productId);

    return { cartStore, isProductInCart };
  },

  data() {
    return {
      error: false,
      loading: false,
      product: {} as Product,
      image: `https://picsum.photos/200/180?random=${Math.random()}`,
    };
  },

  async created() {
    await this.fetchProduct();
  },

  methods: {
    ucFirstLetters,

    async fetchProduct() {
      this.loading = true;
      try {
        const response = await fetch(
          `https://api.storerestapi.com/products/${
            this.$route.params.product as string
          }`
        );
        const responseJSON: Response<Product> = await response.json();
        this.product = responseJSON.data;
      } catch (error) {
        this.error = true;
      }
      this.loading = false;
    },
  },
};
</script>

<template>
  <VProgressCircular v-if="!product._id" />
  <VAlert type="error" v-if="error">Error while fetching data.</VAlert>

  <VSheet>
    <VCard elevation="0" width="100%">
      <VCardTitle>{{ ucFirstLetters(product.title) }}</VCardTitle>
      <VImg :src="image"></VImg>

      <v-card-actions class="d-flex justify-space-between">
        <v-card-subtitle class="text-h6 font-weight-bold text-red">
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

        <div v-if="isProductInCart(product._id)">
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
    </VCard>
  </VSheet>
</template>
