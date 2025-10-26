import type { ApiResponse, Skill } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import getDatabase from "../../utils/databaseAdapter";

// Função para calcular cooldown baseado no nível
// Nível 1 = 1 segundo, Nível 50 = 30 segundos (proporcional)
const calculateCooldown = (level: number): number => {
  // Fórmula: 1 + (level - 1) * (29 / 49)
  // Isso garante que nível 1 = 1s e nível 50 = 30s
  return Math.round(1 + (level - 1) * (29 / 49));
};

// Definir habilidades disponíveis por classe
const AVAILABLE_SKILLS = {
  ninja: [
    {
      name: "Kunai Throw",
      description: "Ataque à distância com kunais",
      cost: 100,
      level_required: 1,
      cooldown_seconds: calculateCooldown(1), // 1 segundo
      damage: 25,
    },
    {
      name: "Fire Jutsu",
      description: "Técnica de fogo básica",
      cost: 200,
      level_required: 3,
      cooldown_seconds: calculateCooldown(3), // 2 segundos
      damage: 35,
    },
    {
      name: "Wind Jutsu",
      description: "Técnica de vento básica",
      cost: 200,
      level_required: 3,
      cooldown_seconds: calculateCooldown(3), // 2 segundos
      damage: 30,
    },
    {
      name: "Shadow Clone",
      description: "Cria clones ilusórios",
      cost: 500,
      level_required: 5,
      cooldown_seconds: calculateCooldown(5), // 3 segundos
      damage: 40,
    },
    {
      name: "Chidori",
      description: "Ataque elétrico devastador",
      cost: 1000,
      level_required: 8,
      cooldown_seconds: calculateCooldown(8), // 9 segundos
      damage: 60,
    },
    {
      name: "Rasengan",
      description: "Esfera de energia concentrada",
      cost: 1000,
      level_required: 8,
      cooldown_seconds: calculateCooldown(8), // 9 segundos
      damage: 65,
    },
  ],
  guerreiro_espacial: [
    {
      name: "Plasma Shot",
      description: "Disparo de plasma energético",
      cost: 100,
      level_required: 1,
      cooldown_seconds: calculateCooldown(1), // 1 segundo
      damage: 30,
    },
    {
      name: "Energy Shield",
      description: "Escudo de energia defensivo",
      cost: 200,
      level_required: 3,
      cooldown_seconds: calculateCooldown(3), // 2 segundos
      damage: 0, // Habilidade defensiva
    },
    {
      name: "Gravity Bomb",
      description: "Bomba de gravidade",
      cost: 200,
      level_required: 3,
      cooldown_seconds: calculateCooldown(3), // 2 segundos
      damage: 40,
    },
    {
      name: "Quantum Strike",
      description: "Ataque quântico poderoso",
      cost: 500,
      level_required: 5,
      cooldown_seconds: calculateCooldown(5), // 3 segundos
      damage: 50,
    },
    {
      name: "Nova Blast",
      description: "Explosão estelar devastadora",
      cost: 1000,
      level_required: 8,
      cooldown_seconds: calculateCooldown(8), // 9 segundos
      damage: 70,
    },
    {
      name: "Black Hole",
      description: "Cria um buraco negro temporário",
      cost: 1000,
      level_required: 8,
      cooldown_seconds: calculateCooldown(8), // 9 segundos
      damage: 80,
    },
  ],
};

export default defineEventHandler(async (event) => {
    const db = getDatabase();
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
    if (!token) {
      const cookieToken = getCookie(event, "@mmo/ninja/token");
      token = cookieToken || null;
    }

    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autenticação não fornecido",
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inválido",
      });
    }

    const body = await readBody<{ character_id: number; skill_name: string }>(
      event
    );
    const { character_id, skill_name } = body;

    if (!character_id || !skill_name) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem e nome da habilidade são obrigatórios",
      });
    }

    // Verificar se o personagem pertence ao usuário
    const character = db
      .prepare(
        `
      SELECT * FROM characters 
      WHERE id = ? AND user_id = ?
    `
      )
      .get(character_id, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Verificar se a habilidade existe para a classe
    const availableSkills =
      AVAILABLE_SKILLS[character.class as keyof typeof AVAILABLE_SKILLS];
    const skillInfo = availableSkills.find((s) => s.name === skill_name);

    if (!skillInfo) {
      throw createError({
        statusCode: 400,
        message: "Habilidade não disponível para esta classe",
      });
    }

    // Verificar se o personagem tem nível suficiente
    if (character.level < skillInfo.level_required) {
      throw createError({
        statusCode: 400,
        message: `Nível ${skillInfo.level_required} necessário para aprender esta habilidade`,
      });
    }

    // Verificar se já possui a habilidade
    const existingSkill = db
      .prepare(
        `
      SELECT * FROM skills 
      WHERE character_id = ? AND skill_name = ?
    `
      )
      .get(character_id, skill_name);

    if (existingSkill) {
      throw createError({
        statusCode: 409,
        message: "Você já possui esta habilidade",
      });
    }

    // Aprender habilidade (sem consumir XP)
    const result = db
      .prepare(
        `
          INSERT INTO skills (character_id, skill_name, level, unlocked, cooldown_seconds, damage, description)
          VALUES (?, ?, 1, TRUE, ?, ?, ?)
        `
      )
      .run(
        character_id,
        skill_name,
        skillInfo.cooldown_seconds || 30,
        skillInfo.damage || 20,
        skillInfo.description || ""
      );

    // Buscar habilidade criada
    const newSkill = db
      .prepare("SELECT * FROM skills WHERE id = ?")
      .get(result.lastInsertRowid) as Skill;

    const response: ApiResponse<Skill> = {
      success: true,
      data: newSkill,
      message: `Habilidade "${skill_name}" aprendida com sucesso!`,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
