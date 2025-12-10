

import express from "express"

const orderRouter = express.Router();

orderRouter.post("/new", newOrder)


export default orderRouter;

