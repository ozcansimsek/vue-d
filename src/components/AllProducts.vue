<script lang="ts">
import type { Product } from "@/types/Products";
import type { Response } from "@/types/Response";
import ProductCard from "./ProductCard.vue";

export default {
  data() {
    return {
      error: false,
      loading: false,
      products: [] as Product[],
    };
  },
  async created() {
    this.loading = true;
    try {
      const response = await fetch("https://api.storerestapi.com/products");
      const responseJSON: Response<Product[]> = await response.json();
      this.products = responseJSON.data;
    } catch (error) {
      this.error = true;
    }
    this.loading = false;
  },
  components: { ProductCard },
};
</script>

<template>
  <VProgressCircular v-if="loading" />
  <VAlert type="error" v-if="error">Error while fetching data.</VAlert>

  <ProductCard v-if="products" v-for="product in products" :product="product" />
</template>
