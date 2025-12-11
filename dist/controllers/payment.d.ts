import type { Request, Response } from "express";
export declare const newCoupon: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const applyDiscount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const allCoupons: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCoupon: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=payment.d.ts.map