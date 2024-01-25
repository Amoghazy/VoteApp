import "dotenv/config";
import express from "express";

import cors from "cors";
const app = express();
const port = 3000;
import { login, signup } from "./controller/controller.users.js";
import { getvotes, sendvotes } from "./controller/controller.votes.js";
import { verifyToken } from "./utlis/verifytoken.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../front-end")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/register.html"));
});
app.get("/poll", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/votinghome.html"));
});
app.use(cors());
app.post("/register", signup);

app.post("/login", login);
app.get("/poll", verifyToken, getvotes);

app.post("/poll", verifyToken, sendvotes);

app.listen(port, () => {
  console.log("Server is started on port 3000");
});
