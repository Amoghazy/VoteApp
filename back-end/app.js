import express from "express";

import cors from "cors";
const app = express();
const port = 3000;
import { login, signup } from "./controller/controller.users.js";
import { getvotes, sendvotes } from "./controller/controller.votes.js";
import { verifyToken } from "./utlis/verifytoken.js";
app.use(cors());

app.use(express.json());

app.post("/register", signup);

app.post("/login", login);
app.get("/poll", verifyToken, getvotes);

app.post("/poll", verifyToken, sendvotes);

app.listen(port, () => {
  console.log("Server is started on port 3000");
});
