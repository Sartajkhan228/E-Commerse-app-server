export interface NewUserRequesBody {
    name: string,
    email: string,
    photo: string,
    gender: string,
    _id: string,
    dob: Date;

}

export interface NewProductRequestBody {
    name: string,
    photo: string,
    price: Number,
    stock: Number,
    category: string

}

export type SearchRequesQuery = {

    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string
}

export interface BaseQuery {
    name?: {
        $regex: string;
        $options: string;
    };
    price?: { $lte: number };
    category?: string;

}

export type InvalidateCacheProps = {
    product?: boolean;
    order?: boolean;
    admin?: boolean;

}