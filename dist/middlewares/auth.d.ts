import type { NextFunction, Request, Response } from "express";
export declare const adminOnly: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.d.ts.map