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