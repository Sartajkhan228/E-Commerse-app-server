import type { Request, Response } from "express";
import type { NewProductRequestBody, SearchRequesQuery } from "../types/type.js";
export declare const createProduct: (req: Request<{}, {}, NewProductRequestBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getLatestProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCategories: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAdminProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSingleProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSearchedProducts: (req: Request<{}, {}, {}, SearchRequesQuery>, res: Response) => Promise<void>;
//# sourceMappingURL=product.d.ts.map