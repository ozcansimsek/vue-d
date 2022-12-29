import type { Product } from "@/types/Products";
import { defineStore } from "pinia";

interface ProductState {
  items: Record<string, Product>;
  ids: string[];
}

export const useProductStore = defineStore({
  id: "products",

  state: (): ProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {
      return this.ids.map((i) => this.items[i]);
    },

    loaded(): boolean {
      return this.ids.length > 0;
    },
  },
});
