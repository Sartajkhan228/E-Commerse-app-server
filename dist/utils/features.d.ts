import type { InvalidateCacheProps, OrderItemType } from "../types/type.js";
export declare const mongoDB: () => Promise<void>;
export declare const invalidateCache: ({ product, order, admin, userId }: InvalidateCacheProps) => Promise<void>;
export declare const reduceStock: (orderItems: OrderItemType[]) => Promise<void>;
//# sourceMappingURL=features.d.ts.map