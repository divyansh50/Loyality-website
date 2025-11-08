import { Router } from "express";
import { prisma } from "../../prisma/client.js";
import  requireAdmin  from "../mw.js";

const router = Router();

// Public: GET /api/items
router.get("/", async (_req, res, next) => {
  try {
    const items = await prisma.rewardItem.findMany({
      where: { isActive: true },
      orderBy: [{ costPoints: "asc" }, { createdAt: "desc" }]
    });
    res.json(items);
  } catch (e) { next(e); }
});

export default router;
