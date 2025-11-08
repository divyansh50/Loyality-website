import { Router } from "express";
import { prisma } from "../../../prisma/client.js";
import  requireAdmin  from "../../mw.js";

const router = Router();

// Admin: POST /api/admin/users/add  { phone, name }
router.post("/add", requireAdmin, async (req, res, next) => {
  try {
    const { phone, name } = req.body;
    if (!phone) return res.status(400).json({ error: "phone required" });

    const user = await prisma.user.upsert({
      where: { phoneE164: phone },
      update: { name },
      create: { phoneE164: phone, name }
    });

    res.status(201).json({ id: user.id, name: user.name, points: user.points });
  } catch (e) { next(e); }
});

// Admin: PATCH /api/users/:userId/points { delta }
router.patch("/:userId/points", requireAdmin, async (req, res, next) => {
  try {
    const delta = Number(req.body?.delta);
    if (!Number.isInteger(delta)) return res.status(400).json({ error: "delta must be integer" });

    const updated = await prisma.$transaction(async (tx) => {
      const u = await tx.user.findUnique({ where: { id: req.params.userId } });
      if (!u) throw new Error("User not found");
      const nextPoints = u.points + delta;
      if (nextPoints < 0) throw new Error("Insufficient points");
      return tx.user.update({ where: { id: u.id }, data: { points: nextPoints } });
    });

    res.json({ points: updated.points });
  } catch (e) {
    if (e.message === "User not found") return res.status(404).json({ error: e.message });
    if (e.message === "Insufficient points") return res.status(422).json({ error: e.message });
    next(e);
  }
});

export default router;
