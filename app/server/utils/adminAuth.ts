import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Configuração do usuário root (em produção, isso deveria vir de variáveis de ambiente)
const ROOT_USER = {
  username: "root",
  password: "$2a$10$o06lhME3P0BcNGGQ7.MT0uPUHUi5UW3Eyz28i.kxHWlFx2F6ed0lG", // "root" hashed
  role: "admin",
};

export function verifyRootCredentials(
  username: string,
  password: string
): boolean {
  if (username !== ROOT_USER.username) {
    return false;
  }

  return bcrypt.compareSync(password, ROOT_USER.password);
}

export function generateRootToken(): string {
  const payload = {
    username: ROOT_USER.username,
    role: ROOT_USER.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 horas
  };

  // Usar a mesma chave secreta do sistema principal
  return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key");
}

export function verifyRootToken(token: string): any {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    if (
      (decoded as any).role !== "admin" ||
      (decoded as any).username !== "root"
    ) {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function updateRootPassword(newPassword: string): void {
  // Em produção, isso deveria salvar em um arquivo de configuração ou banco de dados
  }`);
  }
