import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//created one time prisma client instance
import { prisma } from "../../prisma/client.js";

const router = Router();

// bcrypt.hash('YourPassword123', 10)
//   .then(hash => console.log(hash))
//   .catch(err => console.error(err));

// POST /api/auth/login { phone, password }
router.post("/login", async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    //Error handling for missing fields
    if (!phone || !password) return res.status(400).json({ error: "phone and password required" });

    //Databse lookup
    const admin = await prisma.admin.findUnique({ where: { phoneE164: phone } });
    if (!admin || !admin.passwordHash) return res.status(401).json({ error: "Invalid login" });


    const isPasswordCorrect = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordCorrect) return res.status(401).json({ error: "Password Not Correct" });

    const token = jwt.sign({ id: admin.id, phoneE164: admin.phoneE164 }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, admin: { id: admin.id, name: admin.name, phone: admin.phoneE164 } });
  } catch (e) { next(e); }
});

export default router;
