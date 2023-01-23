import express from "express";
import cors from "cors";
import articleRoutes from "./routes/articleRoutes.js";
import bodyParser from "body-parser";
const app = express();
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("serveur activé!");
});
app.use("/article", articleRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server marche dans port ${PORT}`));
