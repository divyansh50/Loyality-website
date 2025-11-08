import { Router } from "express";
import { prisma } from "../../../prisma/client.js";
import  requireAdmin  from "../../mw.js";

const router = Router();
//Admin: GET /api/admin/items
router.get("/",requireAdmin, async (req, res, next) => {
  try {
    const items = await prisma.rewardItem.findMany({
      where: { isActive: true },
      orderBy: [{ costPoints: "asc" }, { createdAt: "desc" }]
    });
    res.json(items);
  } catch (e) { next(e); }
});

// Admin: POST /api/admin/items/add
router.post("/add", requireAdmin, async (req, res, next) => {
  try {
    const { title, costPoints, imageUrl } = req.body;
    if (!title || !Number.isInteger(costPoints)) {
      return res.status(400).json({ error: "title and integer costPoints required" });
    }
    const item = await prisma.rewardItem.create({
      data: { title, costPoints, description, imageUrl,isActive: true }
    });
    res.status(201).json(item);
  } catch (e) { next(e); }
});

// Admin: PATCH /api/admin/items/:id
router.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const item = await prisma.rewardItem.update({ where: { id: req.params.id }, data: req.body });
    res.json(item);
  } catch (e) { next(e); }
});

// Admin: DELETE /api/admin/items/:id
router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    await prisma.rewardItem.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (e) { next(e); }
});

export default router;
