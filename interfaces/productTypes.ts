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
