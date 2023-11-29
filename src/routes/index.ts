import express from "express";
import PingController from "../controllers/ping";
import PetsController from "../controllers/pets";
import { getPaginationData } from "../utils/query";
import AppCache from "../utils/cache";

const appCache = new AppCache();
const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/cache/clear", async (_req, res) => {
  await appCache.clear();
  return res.send({ message: "Cleared cache" });
});

router.get("/pets", async (req, res) => {
  const pagination = getPaginationData(req);
  const controller = new PetsController();

  const response = await appCache.getOrSet(
    `pets-${pagination?.skip || ""}-${pagination?.take || ""}`,
    async () => {
      return await controller.get(pagination);
    }
  );

  return res.send(response);
});

export default router;
