export interface ProductsResponse {
    payload: Products[];
    totalPages: number;
    prevPage: null;
    nextPage: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    prevLink: null;
    nextLink: string;
}

export interface Products {
    _id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    code: string;
    stock: number;
    status: boolean;
    category: string;
    __v: number;
}

export interface CartResponse {
    _id: string;
    products: CartProduct[];
    __v: number;
}

export interface CartProduct {
    quantity: number;
    product: string;
}

export interface CartByID {
    _id: string;
    products: ProductElement[];
    __v: number;
}

export interface ProductElement {
    quantity: number;
    product: Products;
}