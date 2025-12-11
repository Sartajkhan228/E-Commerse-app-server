import type { InvalidateCacheProps, OrderItemType } from "../types/type.js";
export declare const mongoDB: () => Promise<void>;
export declare const invalidateCache: ({ product, order, admin, userId, productId }: InvalidateCacheProps) => Promise<void>;
export declare const reduceStock: (orderItems: OrderItemType[]) => Promise<void>;
export declare const calculatePercentage: (thisMonth: number, lastMonth: number) => string | 0 | 100;
//# sourceMappingURL=features.d.ts.map