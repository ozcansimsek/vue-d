export interface Category {
    _id: string;
    name: string;
    slug: string;
}

export interface CreatedBy {
    role: string;
    _id: string;
    name: string;
}

export interface Product {
    _id: string;
    title: string;
    price: number;
    category: Category;
    description: string;
    createdBy: CreatedBy;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    image: string;
}

