import type { InvalidateCacheProps, OrderItemType } from "../types/type.js";
export declare const mongoDB: () => Promise<void>;
export declare const invalidateCache: ({ product, order, admin, userId, productId }: InvalidateCacheProps) => Promise<void>;
export declare const reduceStock: (orderItems: OrderItemType[]) => Promise<void>;
export declare const calculatePercentage: (thisMonth: number, lastMonth: number) => string | 100 | 0;
interface myDocument extends Document {
    createdAt: Date;
    discount?: number;
    total?: number;
}
type funcProps = {
    length: number;
    docArr: myDocument[];
    today: Date;
    property?: "discount" | "total";
};
export declare const getBarsData: ({ length, docArr, today, property }: funcProps) => number[];
export {};
//# sourceMappingURL=features.d.ts.map