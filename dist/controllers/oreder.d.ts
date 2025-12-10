import type { Request, Response } from "express";
import type { NewOrderRequestBody } from "../types/type.js";
export declare const myOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const allOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSingleOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const newOrder: (req: Request<{}, {}, NewOrderRequestBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const processOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=oreder.d.ts.map