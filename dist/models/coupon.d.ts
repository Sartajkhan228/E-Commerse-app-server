import mongoose from "mongoose";
export declare const Coupon: mongoose.Model<{
    coupon: string;
    amount: number;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    coupon: string;
    amount: number;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    coupon: string;
    amount: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    coupon: string;
    amount: number;
}, mongoose.Document<unknown, {}, {
    coupon: string;
    amount: number;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    coupon: string;
    amount: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        coupon: string;
        amount: number;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        coupon: string;
        amount: number;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    coupon: string;
    amount: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    coupon: string;
    amount: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=coupon.d.ts.map