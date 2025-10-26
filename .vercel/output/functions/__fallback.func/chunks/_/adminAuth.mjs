import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ROOT_USER = {
  username: "root",
  password: "$2a$10$o06lhME3P0BcNGGQ7.MT0uPUHUi5UW3Eyz28i.kxHWlFx2F6ed0lG",
  // "root" hashed
  role: "admin"
};
function verifyRootCredentials(username, password) {
  if (username !== ROOT_USER.username) {
    return false;
  }
  return bcrypt.compareSync(password, ROOT_USER.password);
}
function generateRootToken() {
  const payload = {
    username: ROOT_USER.username,
    role: ROOT_USER.role,
    iat: Math.floor(Date.now() / 1e3),
    exp: Math.floor(Date.now() / 1e3) + 24 * 60 * 60
    // 24 horas
  };
  return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key");
}
function verifyRootToken(token) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    if (decoded.role !== "admin" || decoded.username !== "root") {
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
}

export { verifyRootCredentials as a, generateRootToken as g, verifyRootToken as v };
//# sourceMappingURL=adminAuth.mjs.map
