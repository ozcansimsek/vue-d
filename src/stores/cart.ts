import type { Product } from "@/types/Products";
import { defineStore } from "pinia";
import { CART_STORAGE } from "../composables/usePersistCart";
import { useProductStore } from "./products";

export interface ProductPurchase extends Product {
  quantity: number;
}

interface CartState {
  contents: Record<string, ProductPurchase>;
}

export interface CartPreview {
  id: string;
  image: string;
  title: string;
  quantity: number;
  cost: number;
}

export const useCartStore = defineStore({
  id: "cart",

  state: (): CartState => ({
    contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {},
  }),

  getters: {
    singleProductCount: (state) => {
      return (productId: string) => state.contents[productId].quantity;
    },
    count(): number {
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + this.contents[id].quantity;
      }, 0);
    },

    total(): number {
      const products = useProductStore();
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + products.items[id].price * this.contents[id].quantity;
      }, 0);
    },
  },

  actions: {
    add(product: Product) {
      if (this.contents[product._id]) {
        this.contents[product._id].quantity += 1;
      } else {
        this.contents[product._id] = {
          ...product,
          quantity: 1,
        };
      }
    },
    remove(productId: string) {
      if (!this.contents[productId]) {
        return;
      }

      this.contents[productId].quantity -= 1;

      if (this.contents[productId].quantity === 0) {
        delete this.contents[productId];
      }
    },

    removeAll(productId: string) {
      delete this.contents[productId];
    },
  },
});
