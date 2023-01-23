import {
  listeArticles,
  articleParCAB,
  detail_liv,
  test_proc,
  work_inv_insert,
} from "../controllers/articlesControllers.js";
import express from "express";
const Routes = express.Router();
Routes.route("/").get(listeArticles);
Routes.route("/test").get(test_proc);

Routes.route("/:bar").get(articleParCAB);
Routes.route("/:bar/detail").get(detail_liv);
Routes.route("/insert").post(work_inv_insert);
export default Routes;
