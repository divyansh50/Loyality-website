import jwt from 'jsonwebtoken';

function requireAdmin(req, res, next) {
  const authorizationHeader = req.headers.authorization || '';
  const token = authorizationHeader.startsWith('Bearer ') ? authorizationHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing Bearer token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload; // { id, phoneE164, role }
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export default requireAdmin;
