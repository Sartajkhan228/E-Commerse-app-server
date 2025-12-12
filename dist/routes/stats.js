import express from "express";
import { getDashboardStates, getDashboardPieChart, getDashboardBars, getDashboardLine } from "../controllers/stats.js";
const dashboardRoutes = express.Router();
// "/api/v1/dashboard"
dashboardRoutes.get("/stats", getDashboardStates);
dashboardRoutes.get("/pie", getDashboardPieChart);
dashboardRoutes.get("/bar", getDashboardBars);
dashboardRoutes.get("/line", getDashboardLine);
export default dashboardRoutes;
//# sourceMappingURL=stats.js.map