<script lang="ts">
import type { CategoryProducts } from "@/types/Category";
import type { Response } from "@/types/Response";
import ProductCard from "./ProductCard.vue";

export default {
  data() {
    return {
      error: false,
      loading: false,
      categoryProducts: {} as CategoryProducts,
    };
  },

  created() {
    this.$watch(
      () => this.$route.params.category,
      (category) => {
        if (category) {
          this.fetchCategoryProducts();
        }
      }
    );

    this.fetchCategoryProducts();
  },

  methods: {
    async fetchCategoryProducts() {
      this.loading = true;
      try {
        const response = await fetch(
          `https://api.storerestapi.com/categories/${this.$route.params.category}`
        );
        const responseJSON: Response<CategoryProducts> = await response.json();
        this.categoryProducts = responseJSON.data;
      } catch (error) {
        this.error = true;
      }
      this.loading = false;
    },
  },

  components: { ProductCard },
};
</script>

<template>
  <VProgressCircular v-if="loading" />
  <VAlert type="error" v-if="error">Error while fetching data.</VAlert>

  <ProductCard
    v-if="categoryProducts.products && !loading"
    v-for="product in categoryProducts.products"
    :key="product._id"
    :product="product"
  />
</template>
