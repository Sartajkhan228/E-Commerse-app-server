import express from "express";
const dashboardRoutes = express.Router();
// "/api/v1/dashboard/stats"
dashboardRoutes.get("/stats");
dashboardRoutes.get("/pie");
dashboardRoutes.get("/bar");
dashboardRoutes.get("/line");
export default dashboardRoutes;
//# sourceMappingURL=stats.js.map