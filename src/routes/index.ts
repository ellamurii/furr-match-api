import express from "express";
import PingController from "../controllers/ping";
import PetsController from "../controllers/pets";
import { getPaginationData } from "../utils/query";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/pets", async (req, res) => {
  const pagination = getPaginationData(req);
  const controller = new PetsController();
  const response = await controller.get(pagination);
  return res.send(response);
});

export default router;
