import express from "express"
import userRouter from "./routes/user.js";
import { mongoDB } from "./utils/features.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(express.json());

mongoDB()

app.get("/", (req, res) => {
    res.send(`<h1>Api routes are working</h1>`)
})


app.use("/api/v1/user", userRouter);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost${port}`)
})