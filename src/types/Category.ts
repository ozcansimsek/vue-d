import type { Product } from "./Products";

export interface CategoryProducts {
    products: Product[];
    _id: string;
    name: string;
    slug: string;
}