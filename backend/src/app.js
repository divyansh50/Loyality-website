import express from 'express';
import cors from 'cors';
import body from 'body-parser';
import authRoutes from "./routes/auth.js"; // login
import publicUserRoutes from "./routes/users.js"; // /api/users/by-phone
import publicItemRoutes from "./routes/items.js"; // /api/items

// ADMIN ROUTES
import adminUserRoutes from "./routes/admin/users.js";
import adminItemRoutes from "./routes/admin/items.js";

const app = express();
app.use(cors());    
app.use(body.json());

// Public (user-side)
app.use("/api/users", publicUserRoutes);
app.use("/api/items", publicItemRoutes);

// Login
app.use("/api/admin/", authRoutes);

// Admin (protected)
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/items", adminItemRoutes);

app.get('/health', (_req, res) => res.json({ ok: true }));
  
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on :${port}`));