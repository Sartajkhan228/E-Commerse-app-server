import type { Request, Response } from "express";
export declare const getDashboardStates: (req: Request, res: Response) => Promise<void>;
export declare const getDashboardPieChart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getDashboardBars: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getDashboardLine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=stats.d.ts.map