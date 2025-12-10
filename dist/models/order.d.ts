import mongoose from "mongoose";
export declare const Order: mongoose.Model<{
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: string;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }> & {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: string;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }> & {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: string;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }> & {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: string;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }> & {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: string;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }> & {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: string;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }> & {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    }>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        user: string;
        subtotal: number;
        tax: number;
        shippingCharges: number;
        discount: number;
        total: string;
        status: "Processing" | "Shipped" | "Delivered";
        orderItems: mongoose.Types.DocumentArray<{
            name?: string | null;
            photo?: string | null;
            price?: number | null;
            quantity?: number | null;
            productId?: mongoose.Types.ObjectId | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            photo?: string | null;
            price?: number | null;
            quantity?: number | null;
            productId?: mongoose.Types.ObjectId | null;
        }> & {
            name?: string | null;
            photo?: string | null;
            price?: number | null;
            quantity?: number | null;
            productId?: mongoose.Types.ObjectId | null;
        }>;
        shippingInfo?: {
            address: string;
            city: string;
            state: string;
            country: string;
            pinCode: number;
        } | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        user: string;
        subtotal: number;
        tax: number;
        shippingCharges: number;
        discount: number;
        total: string;
        status: "Processing" | "Shipped" | "Delivered";
        orderItems: mongoose.Types.DocumentArray<{
            name?: string | null;
            photo?: string | null;
            price?: number | null;
            quantity?: number | null;
            productId?: mongoose.Types.ObjectId | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            name?: string | null;
            photo?: string | null;
            price?: number | null;
            quantity?: number | null;
            productId?: mongoose.Types.ObjectId | null;
        }> & {
            name?: string | null;
            photo?: string | null;
            price?: number | null;
            quantity?: number | null;
            productId?: mongoose.Types.ObjectId | null;
        }>;
        shippingInfo?: {
            address: string;
            city: string;
            state: string;
            country: string;
            pinCode: number;
        } | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: string;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    } | {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: string | null;
        _id: string;
    }, mongoose.Types.Subdocument<string | mongoose.mongo.BSON.ObjectId, unknown, {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    } | {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: string | null;
        _id: string;
    }> & ({
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    } | {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: string | null;
        _id: string;
    })>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: string;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: mongoose.Types.DocumentArray<{
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    } | {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: string | null;
        _id: string;
    }, mongoose.Types.Subdocument<string | mongoose.mongo.BSON.ObjectId, unknown, {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    } | {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: string | null;
        _id: string;
    }> & ({
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: mongoose.Types.ObjectId | null;
    } | {
        name?: string | null;
        photo?: string | null;
        price?: number | null;
        quantity?: number | null;
        productId?: string | null;
        _id: string;
    })>;
    shippingInfo?: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: number;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=order.d.ts.map