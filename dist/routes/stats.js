import express from "express";
import { getDashboardStates } from "../controllers/stats.js";
const dashboardRoutes = express.Router();
// "/api/v1/dashboard"
dashboardRoutes.get("/stats", getDashboardStates);
// dashboardRoutes.get("/pie");
// dashboardRoutes.get("/bar");
// dashboardRoutes.get("/line");
export default dashboardRoutes;
//# sourceMappingURL=stats.js.map