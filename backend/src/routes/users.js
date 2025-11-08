import { Router } from "express";
import { prisma } from "../../prisma/client.js";
import  requireAdmin  from "../mw.js";

const router = Router();

// Public: GET /api/users/by-phone?phone=+91...
router.get("/by-phone", async (req, res, next) => {
  try {
    const phone = String(req.query.phone || "").trim();
    if (!phone) return res.status(400).json({ error: "phone required" });

    const u = await prisma.user.findUnique({ where: { phoneE164: phone } });
    if (!u) return res.status(400).json({ error: "No user Found" });

    res.json({ id: u.id, phone: u.phoneE164, name: u.name, points: u.points });
  } catch (e) { next(e); }
});

export default router;
