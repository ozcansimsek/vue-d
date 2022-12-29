<script lang="ts">
import type { CategoryProducts } from "@/types/Category";
import type { Response } from "@/types/Response";
import { ucFirstLetters } from "../helpers/ucFirstLetters";

export default {
  data() {
    return {
      error: false,
      loading: false,
      categories: {} as CategoryProducts[],
    };
  },
  async created() {
    this.loading = true;
    try {
      const response = await fetch("https://api.storerestapi.com/categories");
      const responseJson: Response<CategoryProducts[]> = await response.json();
      this.categories = responseJson.data;
    } catch (error) {
      this.error = true;
    }
    this.loading = false;
  },

  methods: {
    ucFirstLetters,
  },
};
</script>

<template>
  <VProgressCircular v-if="loading" />
  <VAlert type="error" v-if="error">Error while fetching data.</VAlert>

  <v-list rounded="lg" v-if="categories">
    <v-list-item
      v-for="category in categories"
      :key="category.slug"
      link
      :to="'/category/' + category.slug"
    >
      <v-list-item-title>
        {{ ucFirstLetters(category.name) }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
