import type { ApiResponse } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/database";

// Definir habilidades disponíveis por classe - Expandido até nível 50
const AVAILABLE_SKILLS = {
  ninja: [
    // NÍVEL 1-5 - Habilidades Básicas
    {
      name: "Kunai Throw",
      description: "Ataque à distância com kunais",
      cost: 100,
      level_required: 1,
    },
    {
      name: "Shuriken Barrage",
      description: "Lançamento múltiplo de shurikens",
      cost: 150,
      level_required: 2,
    },
    {
      name: "Fire Jutsu",
      description: "Técnica de fogo básica",
      cost: 200,
      level_required: 3,
    },
    {
      name: "Wind Jutsu",
      description: "Técnica de vento básica",
      cost: 200,
      level_required: 3,
    },
    {
      name: "Water Jutsu",
      description: "Técnica de água básica",
      cost: 200,
      level_required: 4,
    },
    {
      name: "Earth Jutsu",
      description: "Técnica de terra básica",
      cost: 200,
      level_required: 4,
    },
    {
      name: "Shadow Clone",
      description: "Cria clones ilusórios",
      cost: 500,
      level_required: 5,
    },
    {
      name: "Lightning Jutsu",
      description: "Técnica de raio básica",
      cost: 300,
      level_required: 5,
    },

    // NÍVEL 6-10 - Habilidades Intermediárias
    {
      name: "Fire Dragon",
      description: "Invoca um dragão de fogo",
      cost: 800,
      level_required: 6,
    },
    {
      name: "Wind Tornado",
      description: "Cria um tornado devastador",
      cost: 800,
      level_required: 7,
    },
    {
      name: "Water Prison",
      description: "Prende inimigos em esfera de água",
      cost: 900,
      level_required: 8,
    },
    {
      name: "Earth Spikes",
      description: "Faz espinhos de terra emergirem",
      cost: 900,
      level_required: 8,
    },
    {
      name: "Chidori",
      description: "Ataque elétrico devastador",
      cost: 1000,
      level_required: 8,
    },
    {
      name: "Rasengan",
      description: "Esfera de energia concentrada",
      cost: 1000,
      level_required: 8,
    },
    {
      name: "Ice Jutsu",
      description: "Técnica de gelo avançada",
      cost: 1200,
      level_required: 9,
    },
    {
      name: "Rock Armor",
      description: "Cobre o corpo com armadura de pedra",
      cost: 1200,
      level_required: 10,
    },

    // NÍVEL 11-20 - Habilidades Avançadas
    {
      name: "Fire Phoenix",
      description: "Invoca uma fênix de fogo imortal",
      cost: 2000,
      level_required: 11,
    },
    {
      name: "Tsunami",
      description: "Cria uma onda gigante devastadora",
      cost: 2200,
      level_required: 12,
    },
    {
      name: "Earthquake",
      description: "Causa um terremoto devastador",
      cost: 2400,
      level_required: 13,
    },
    {
      name: "Hurricane",
      description: "Invoca um furacão de destruição",
      cost: 2600,
      level_required: 14,
    },
    {
      name: "Thunder Storm",
      description: "Tempestade de raios contínua",
      cost: 2800,
      level_required: 15,
    },
    {
      name: "Blizzard",
      description: "Nevasca que congela tudo",
      cost: 3000,
      level_required: 16,
    },
    {
      name: "Meteor Strike",
      description: "Invoca meteoros do espaço",
      cost: 3500,
      level_required: 17,
    },
    {
      name: "Dimension Slash",
      description: "Corta através das dimensões",
      cost: 4000,
      level_required: 18,
    },
    {
      name: "Chakra Mode",
      description: "Ativa modo chakra poderoso",
      cost: 5000,
      level_required: 19,
    },
    {
      name: "Resurrection",
      description: "Ressuscita aliados mortos",
      cost: 6000,
      level_required: 20,
    },

    // NÍVEL 21-30 - Habilidades Épicas
    {
      name: "Solar Flare",
      description: "Invoca energia solar devastadora",
      cost: 8000,
      level_required: 21,
    },
    {
      name: "Ocean Depths",
      description: "Cria abismo oceânico que engole inimigos",
      cost: 9000,
      level_required: 22,
    },
    {
      name: "Mountain Crush",
      description: "Invoca montanha para esmagar inimigos",
      cost: 10000,
      level_required: 23,
    },
    {
      name: "Sky Tornado",
      description: "Tornado que toca céu e terra",
      cost: 12000,
      level_required: 24,
    },
    {
      name: "Lightning God",
      description: "Invoca forma de deus do trovão",
      cost: 15000,
      level_required: 25,
    },
    {
      name: "Ice Age",
      description: "Inicia nova era do gelo",
      cost: 18000,
      level_required: 26,
    },
    {
      name: "Planet Crush",
      description: "Usa força gravitacional planetária",
      cost: 20000,
      level_required: 27,
    },
    {
      name: "Reality Warp",
      description: "Altera realidade ao redor",
      cost: 25000,
      level_required: 28,
    },
    {
      name: "Sage Mode",
      description: "Ativa modo sábio com poder imenso",
      cost: 30000,
      level_required: 29,
    },
    {
      name: "Divine Intervention",
      description: "Invoca poder divino para salvar aliados",
      cost: 40000,
      level_required: 30,
    },

    // NÍVEL 31-40 - Habilidades Lendárias
    {
      name: "Supernova",
      description: "Cria explosão estelar devastadora",
      cost: 50000,
      level_required: 31,
    },
    {
      name: "Cosmic Flood",
      description: "Inunda universo com águas cósmicas",
      cost: 60000,
      level_required: 32,
    },
    {
      name: "Galaxy Crush",
      description: "Esmaga inimigos com peso de galáxia",
      cost: 70000,
      level_required: 33,
    },
    {
      name: "Universal Storm",
      description: "Tempestade que afeta todo universo",
      cost: 80000,
      level_required: 34,
    },
    {
      name: "God Thunder",
      description: "Trovão dos deuses que destrói tudo",
      cost: 90000,
      level_required: 35,
    },
    {
      name: "Absolute Zero",
      description: "Reduz temperatura ao zero absoluto",
      cost: 100000,
      level_required: 36,
    },
    {
      name: "Black Hole",
      description: "Cria buraco negro que consome tudo",
      cost: 120000,
      level_required: 37,
    },
    {
      name: "Dimension Collapse",
      description: "Faz dimensões inteiras colapsarem",
      cost: 150000,
      level_required: 38,
    },
    {
      name: "Transcendence",
      description: "Transcende realidade física",
      cost: 200000,
      level_required: 39,
    },
    {
      name: "Omnipotence",
      description: "Alcança poder absoluto sobre tudo",
      cost: 300000,
      level_required: 40,
    },

    // NÍVEL 41-50 - Habilidades Míticas
    {
      name: "Big Bang",
      description: "Recria Big Bang para destruir tudo",
      cost: 400000,
      level_required: 41,
    },
    {
      name: "Primordial Ocean",
      description: "Invoca oceano primordial da criação",
      cost: 500000,
      level_required: 42,
    },
    {
      name: "World Tree",
      description: "Faz crescer árvore do mundo",
      cost: 600000,
      level_required: 43,
    },
    {
      name: "Infinite Wind",
      description: "Vento infinito que nunca para",
      cost: 700000,
      level_required: 44,
    },
    {
      name: "Divine Lightning",
      description: "Raio divino que criou universo",
      cost: 800000,
      level_required: 45,
    },
    {
      name: "Eternal Winter",
      description: "Inverno eterno que nunca termina",
      cost: 900000,
      level_required: 46,
    },
    {
      name: "Void Creation",
      description: "Cria vazio primordial",
      cost: 1000000,
      level_required: 47,
    },
    {
      name: "Reality Mastery",
      description: "Domina completamente realidade",
      cost: 1500000,
      level_required: 48,
    },
    {
      name: "Godhood",
      description: "Ascende ao status de divindade",
      cost: 2000000,
      level_required: 49,
    },
    {
      name: "Creation",
      description: "Poder de criar universos inteiros",
      cost: 5000000,
      level_required: 50,
    },
  ],
  guerreiro_espacial: [
    // NÍVEL 1-5 - Habilidades Básicas
    {
      name: "Plasma Shot",
      description: "Disparo de plasma energético",
      cost: 100,
      level_required: 1,
    },
    {
      name: "Laser Beam",
      description: "Feixe de laser preciso",
      cost: 150,
      level_required: 2,
    },
    {
      name: "Energy Shield",
      description: "Escudo de energia defensivo",
      cost: 200,
      level_required: 3,
    },
    {
      name: "Gravity Bomb",
      description: "Bomba de gravidade",
      cost: 200,
      level_required: 3,
    },
    {
      name: "Photon Blast",
      description: "Explosão de fótons",
      cost: 250,
      level_required: 4,
    },
    {
      name: "Magnetic Field",
      description: "Campo magnético defensivo",
      cost: 250,
      level_required: 4,
    },
    {
      name: "Quantum Strike",
      description: "Ataque quântico poderoso",
      cost: 500,
      level_required: 5,
    },
    {
      name: "Warp Drive",
      description: "Teletransporte espacial",
      cost: 400,
      level_required: 5,
    },

    // NÍVEL 6-10 - Habilidades Intermediárias
    {
      name: "Solar Flare",
      description: "Explosão solar devastadora",
      cost: 800,
      level_required: 6,
    },
    {
      name: "Nebula Storm",
      description: "Tempestade de nebulosa",
      cost: 900,
      level_required: 7,
    },
    {
      name: "Asteroid Field",
      description: "Invoca campo de asteroides",
      cost: 1000,
      level_required: 8,
    },
    {
      name: "Nova Blast",
      description: "Explosão estelar devastadora",
      cost: 1000,
      level_required: 8,
    },
    {
      name: "Black Hole",
      description: "Cria buraco negro temporário",
      cost: 1000,
      level_required: 8,
    },
    {
      name: "Dark Matter",
      description: "Manipula matéria escura",
      cost: 1200,
      level_required: 9,
    },
    {
      name: "Stellar Wind",
      description: "Vento estelar poderoso",
      cost: 1200,
      level_required: 10,
    },
    {
      name: "Cosmic Ray",
      description: "Raio cósmico devastador",
      cost: 1500,
      level_required: 10,
    },

    // NÍVEL 11-20 - Habilidades Avançadas
    {
      name: "Supernova",
      description: "Explosão de supernova",
      cost: 2000,
      level_required: 11,
    },
    {
      name: "Galactic Core",
      description: "Acessa energia do núcleo galáctico",
      cost: 2500,
      level_required: 12,
    },
    {
      name: "Pulsar Beam",
      description: "Feixe de pulsar devastador",
      cost: 3000,
      level_required: 13,
    },
    {
      name: "Quasar Blast",
      description: "Explosão de quasar",
      cost: 3500,
      level_required: 14,
    },
    {
      name: "White Dwarf",
      description: "Compressão de anã branca",
      cost: 4000,
      level_required: 15,
    },
    {
      name: "Red Giant",
      description: "Expansão de gigante vermelha",
      cost: 4500,
      level_required: 16,
    },
    {
      name: "Neutron Star",
      description: "Densidade de estrela de nêutrons",
      cost: 5000,
      level_required: 17,
    },
    {
      name: "Wormhole",
      description: "Cria buraco de minhoca",
      cost: 6000,
      level_required: 18,
    },
    {
      name: "Space-Time Rift",
      description: "Rasga espaço-tempo",
      cost: 7000,
      level_required: 19,
    },
    {
      name: "Universal Constant",
      description: "Manipula constantes universais",
      cost: 8000,
      level_required: 20,
    },

    // NÍVEL 21-30 - Habilidades Épicas
    {
      name: "Big Bang",
      description: "Recria Big Bang",
      cost: 10000,
      level_required: 21,
    },
    {
      name: "Dark Energy",
      description: "Manipula energia escura",
      cost: 12000,
      level_required: 22,
    },
    {
      name: "Multiverse",
      description: "Acessa multiverso",
      cost: 15000,
      level_required: 23,
    },
    {
      name: "String Theory",
      description: "Manipula teoria das cordas",
      cost: 18000,
      level_required: 24,
    },
    {
      name: "Quantum Entanglement",
      description: "Entrelaçamento quântico",
      cost: 20000,
      level_required: 25,
    },
    {
      name: "Higgs Field",
      description: "Manipula campo de Higgs",
      cost: 25000,
      level_required: 26,
    },
    {
      name: "Planck Scale",
      description: "Acessa escala de Planck",
      cost: 30000,
      level_required: 27,
    },
    {
      name: "Inflation Field",
      description: "Campo de inflação cósmica",
      cost: 35000,
      level_required: 28,
    },
    {
      name: "Vacuum Decay",
      description: "Decaimento do vácuo",
      cost: 40000,
      level_required: 29,
    },
    {
      name: "Cosmic Consciousness",
      description: "Consciência cósmica universal",
      cost: 50000,
      level_required: 30,
    },

    // NÍVEL 31-40 - Habilidades Lendárias
    {
      name: "Universal Creation",
      description: "Criação universal",
      cost: 60000,
      level_required: 31,
    },
    {
      name: "Dimensional Mastery",
      description: "Domínio dimensional",
      cost: 70000,
      level_required: 32,
    },
    {
      name: "Reality Engine",
      description: "Motor da realidade",
      cost: 80000,
      level_required: 33,
    },
    {
      name: "Existence Protocol",
      description: "Protocolo de existência",
      cost: 90000,
      level_required: 34,
    },
    {
      name: "Infinite Loop",
      description: "Loop infinito temporal",
      cost: 100000,
      level_required: 35,
    },
    {
      name: "Zero Point",
      description: "Ponto zero da existência",
      cost: 120000,
      level_required: 36,
    },
    {
      name: "Absolute Reality",
      description: "Realidade absoluta",
      cost: 150000,
      level_required: 37,
    },
    {
      name: "Omniverse",
      description: "Acessa omniverso",
      cost: 200000,
      level_required: 38,
    },
    {
      name: "Transcendent Being",
      description: "Ser transcendente",
      cost: 250000,
      level_required: 39,
    },
    {
      name: "Universal Override",
      description: "Sobrescreve universo",
      cost: 300000,
      level_required: 40,
    },

    // NÍVEL 41-50 - Habilidades Míticas
    {
      name: "Genesis Protocol",
      description: "Protocolo de gênese",
      cost: 400000,
      level_required: 41,
    },
    {
      name: "Alpha Point",
      description: "Ponto alfa da criação",
      cost: 500000,
      level_required: 42,
    },
    {
      name: "Omega Sequence",
      description: "Sequência ômega",
      cost: 600000,
      level_required: 43,
    },
    {
      name: "Infinite Recursion",
      description: "Recursão infinita",
      cost: 700000,
      level_required: 44,
    },
    {
      name: "Absolute Truth",
      description: "Verdade absoluta",
      cost: 800000,
      level_required: 45,
    },
    {
      name: "Perfect Symmetry",
      description: "Simetria perfeita",
      cost: 900000,
      level_required: 46,
    },
    {
      name: "Eternal Paradox",
      description: "Paradoxo eterno",
      cost: 1000000,
      level_required: 47,
    },
    {
      name: "Universal Paradox",
      description: "Paradoxo universal",
      cost: 1500000,
      level_required: 48,
    },
    {
      name: "Transcendent Paradox",
      description: "Paradoxo transcendente",
      cost: 2000000,
      level_required: 49,
    },
    {
      name: "Absolute Paradox",
      description: "Paradoxo absoluto",
      cost: 5000000,
      level_required: 50,
    },
  ],
};

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    let token = extractTokenFromHeader(authHeader);
    if (!token) {
      const cookieToken = getCookie(event, "token");
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

    const characterId = getQuery(event).character_id;

    if (!characterId) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem é obrigatório",
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
      .get(characterId, payload.userId) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Buscar habilidades já aprendidas
    const learnedSkills = db
      .prepare(
        `
      SELECT skill_name FROM skills 
      WHERE character_id = ?
    `
      )
      .all(characterId) as { skill_name: string }[];

    const learnedSkillNames = learnedSkills.map((s) => s.skill_name);

    // Filtrar habilidades disponíveis
    const availableSkills = AVAILABLE_SKILLS[
      character.class as keyof typeof AVAILABLE_SKILLS
    ].map((skill) => ({
      ...skill,
      can_learn:
        character.level >= skill.level_required &&
        !learnedSkillNames.includes(skill.name),
      learned: learnedSkillNames.includes(skill.name),
    }));

    const response: ApiResponse<typeof availableSkills> = {
      success: true,
      data: availableSkills,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
