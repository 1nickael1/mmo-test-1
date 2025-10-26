import type { ApiResponse, StoryChapter } from "../../../types";
import { extractTokenFromHeader, verifyToken } from "../../utils/auth";
import db from "../../utils/databaseAdapter";

// Capítulos da história - Expandido até nível 50
const STORY_CHAPTERS: StoryChapter[] = [
  // Capítulos 1-10 (Níveis 1-10)
  {
    id: 1,
    chapter: 1,
    title: "O Início da Jornada",
    description: "Um jovem ninja/guerreiro espacial inicia sua aventura",
    story_text:
      "Em um mundo distante, você desperta com um chamado interior. O destino o aguarda, mas primeiro você deve provar seu valor contra os perigos básicos que rondam as terras iniciais.",
    npc: {
      id: "story_goblin_1",
      name: "Goblin Iniciante",
      level: 1,
      stats: {
        strength: 5,
        agility: 4,
        defense: 3,
        health: 40,
        max_health: 40,
      },
      xp_reward: 50,
      gold_reward: 25,
      difficulty: "easy",
    },
    rewards: { xp: 50, gold: 25, items: ["Poção de Cura Pequena"] },
    level_required: 1,
  },
  {
    id: 2,
    chapter: 2,
    title: "Primeira Prova",
    description: "Enfrente seu primeiro desafio real",
    story_text:
      "Os goblins não são mais um problema, mas agora criaturas mais perigosas começam a aparecer. Você deve aprender a usar suas habilidades básicas para sobreviver.",
    npc: {
      id: "story_orc_1",
      name: "Orc Guerreiro",
      level: 2,
      stats: {
        strength: 8,
        agility: 5,
        defense: 6,
        health: 60,
        max_health: 60,
      },
      xp_reward: 80,
      gold_reward: 40,
      difficulty: "easy",
    },
    rewards: { xp: 80, gold: 40 },
    level_required: 2,
  },
  {
    id: 3,
    chapter: 3,
    title: "A Floresta Sombria",
    description: "Adentre a floresta onde criaturas sombrias habitam",
    story_text:
      "Uma floresta antiga se estende à sua frente. Sussurros sombrios ecoam entre as árvores. Você sente que algo poderoso o aguarda no coração desta floresta.",
    npc: {
      id: "story_shadow_1",
      name: "Sombra da Floresta",
      level: 3,
      stats: {
        strength: 10,
        agility: 8,
        defense: 5,
        health: 70,
        max_health: 70,
      },
      xp_reward: 120,
      gold_reward: 60,
      difficulty: "medium",
    },
    rewards: { xp: 120, gold: 60, items: ["Poção de Cura Média"] },
    level_required: 3,
  },
  {
    id: 4,
    chapter: 4,
    title: "O Guardião da Ponte",
    description: "Uma ponte antiga guardada por um ser poderoso",
    story_text:
      "Uma ponte de pedra antiga cruza um abismo profundo. No centro, um guardião ancestral aguarda. Ele testará sua força e determinação antes de permitir a passagem.",
    npc: {
      id: "story_guardian_1",
      name: "Guardião da Ponte",
      level: 4,
      stats: {
        strength: 12,
        agility: 6,
        defense: 10,
        health: 100,
        max_health: 100,
      },
      xp_reward: 150,
      gold_reward: 75,
      difficulty: "medium",
    },
    rewards: { xp: 150, gold: 75 },
    level_required: 4,
  },
  {
    id: 5,
    chapter: 5,
    title: "O Primeiro Chefe",
    description: "Enfrente o primeiro chefe da sua jornada",
    story_text:
      "Após cruzar a ponte, você encontra uma caverna escura. No fundo, um dragão jovem descansa sobre um tesouro brilhante. Este será seu primeiro teste real como guerreiro.",
    npc: {
      id: "story_dragon_1",
      name: "Dragão Jovem",
      level: 5,
      stats: {
        strength: 15,
        agility: 10,
        defense: 12,
        health: 150,
        max_health: 150,
      },
      xp_reward: 300,
      gold_reward: 200,
      difficulty: "hard",
    },
    rewards: {
      xp: 300,
      gold: 200,
      items: ["Poção de Cura Grande"],
      equipment: "Katana Afiada",
    },
    level_required: 5,
  },

  // Capítulos 6-15 (Níveis 6-15)
  {
    id: 6,
    chapter: 6,
    title: "As Terras Desoladas",
    description: "Uma região devastada pela guerra antiga",
    story_text:
      "As terras à frente foram devastadas por uma guerra antiga. Restos de armaduras e armas espalhados pelo chão. Mas entre os destroços, criaturas corrompidas ainda vagam.",
    npc: {
      id: "story_corrupted_1",
      name: "Soldado Corrompido",
      level: 6,
      stats: {
        strength: 18,
        agility: 8,
        defense: 14,
        health: 120,
        max_health: 120,
      },
      xp_reward: 200,
      gold_reward: 100,
      difficulty: "medium",
    },
    rewards: { xp: 200, gold: 100 },
    level_required: 6,
  },
  {
    id: 7,
    chapter: 7,
    title: "O Labirinto Perdido",
    description: "Um labirinto antigo cheio de mistérios",
    story_text:
      "Um labirinto de pedra se estende à sua frente. As paredes parecem se mover, criando novos caminhos. Você deve encontrar a saída, mas criaturas estranhas habitam este lugar.",
    npc: {
      id: "story_minotaur_1",
      name: "Minotauro do Labirinto",
      level: 7,
      stats: {
        strength: 20,
        agility: 6,
        defense: 16,
        health: 140,
        max_health: 140,
      },
      xp_reward: 250,
      gold_reward: 125,
      difficulty: "medium",
    },
    rewards: { xp: 250, gold: 125, items: ["Poção de Cura Média"] },
    level_required: 7,
  },
  {
    id: 8,
    chapter: 8,
    title: "A Cidade Fantasma",
    description: "Uma cidade abandonada há séculos",
    story_text:
      "Uma cidade antiga se ergue à distância, mas não há sinais de vida. Apenas fantasmas e criaturas sombrias vagam pelas ruas vazias. Algo terrível aconteceu aqui.",
    npc: {
      id: "story_phantom_1",
      name: "Fantasma da Cidade",
      level: 8,
      stats: {
        strength: 22,
        agility: 12,
        defense: 10,
        health: 130,
        max_health: 130,
      },
      xp_reward: 280,
      gold_reward: 140,
      difficulty: "medium",
    },
    rewards: { xp: 280, gold: 140 },
    level_required: 8,
  },
  {
    id: 9,
    chapter: 9,
    title: "O Templo Esquecido",
    description: "Um templo antigo com segredos ocultos",
    story_text:
      "Um templo de pedra antiga se ergue no topo de uma montanha. Esculturas estranhas decoram as paredes. Você sente uma energia mística emanando de dentro.",
    npc: {
      id: "story_priest_1",
      name: "Sacerdote Corrompido",
      level: 9,
      stats: {
        strength: 25,
        agility: 10,
        defense: 18,
        health: 160,
        max_health: 160,
      },
      xp_reward: 320,
      gold_reward: 160,
      difficulty: "hard",
    },
    rewards: { xp: 320, gold: 160, items: ["Poção de Cura Grande"] },
    level_required: 9,
  },
  {
    id: 10,
    chapter: 10,
    title: "O Segundo Chefe",
    description: "Enfrente um demônio das profundezas",
    story_text:
      "No coração do templo, um portal para o submundo se abre. Um demônio das profundezas emerge, seus olhos brilhando com malícia. Esta será uma batalha épica.",
    npc: {
      id: "story_demon_1",
      name: "Demônio das Profundezas",
      level: 10,
      stats: {
        strength: 30,
        agility: 15,
        defense: 20,
        health: 250,
        max_health: 250,
      },
      xp_reward: 500,
      gold_reward: 400,
      difficulty: "hard",
    },
    rewards: {
      xp: 500,
      gold: 400,
      items: ["Poção de Cura Superior"],
      equipment: "Katana do Vento",
    },
    level_required: 10,
  },

  // Capítulos 11-20 (Níveis 11-20)
  {
    id: 11,
    chapter: 11,
    title: "As Planícies Infinitas",
    description: "Vastas planícies onde o vento sopra eternamente",
    story_text:
      "As planícies se estendem até o horizonte. O vento sopra constantemente, carregando sussurros de batalhas antigas. Criaturas poderosas vagam por estas terras.",
    npc: {
      id: "story_centaur_1",
      name: "Centauro Guerreiro",
      level: 12,
      stats: {
        strength: 35,
        agility: 20,
        defense: 25,
        health: 200,
        max_health: 200,
      },
      xp_reward: 400,
      gold_reward: 200,
      difficulty: "medium",
    },
    rewards: { xp: 400, gold: 200 },
    level_required: 12,
  },
  {
    id: 12,
    chapter: 12,
    title: "A Montanha Gélida",
    description: "Uma montanha coberta de gelo eterno",
    story_text:
      "Uma montanha imponente se ergue à frente, sua superfície coberta de gelo eterno. O frio é intenso, mas você deve escalar para alcançar o que está no topo.",
    npc: {
      id: "story_yeti_1",
      name: "Yeti da Montanha",
      level: 14,
      stats: {
        strength: 40,
        agility: 12,
        defense: 30,
        health: 250,
        max_health: 250,
      },
      xp_reward: 500,
      gold_reward: 250,
      difficulty: "hard",
    },
    rewards: { xp: 500, gold: 250, items: ["Poção de Cura Superior"] },
    level_required: 14,
  },
  {
    id: 13,
    chapter: 13,
    title: "O Vale dos Dragões",
    description: "Um vale onde dragões antigos descansam",
    story_text:
      "Um vale profundo onde dragões antigos fazem seus ninhos. O ar está carregado de energia mágica. Você deve passar por aqui, mas os dragões não são hospitaleiros.",
    npc: {
      id: "story_dragon_2",
      name: "Dragão Ancião",
      level: 16,
      stats: {
        strength: 45,
        agility: 18,
        defense: 35,
        health: 300,
        max_health: 300,
      },
      xp_reward: 600,
      gold_reward: 300,
      difficulty: "hard",
    },
    rewards: { xp: 600, gold: 300 },
    level_required: 16,
  },
  {
    id: 14,
    chapter: 14,
    title: "A Torre Mágica",
    description: "Uma torre que toca as nuvens",
    story_text:
      "Uma torre de cristal se ergue até as nuvens. Energia mágica pulsa através de suas paredes. No topo, um mago poderoso aguarda para testar sua força.",
    npc: {
      id: "story_mage_1",
      name: "Mago Arcano",
      level: 18,
      stats: {
        strength: 30,
        agility: 25,
        defense: 20,
        health: 280,
        max_health: 280,
      },
      xp_reward: 700,
      gold_reward: 350,
      difficulty: "hard",
    },
    rewards: { xp: 700, gold: 350, items: ["Poção de Cura Épica"] },
    level_required: 18,
  },
  {
    id: 15,
    chapter: 15,
    title: "O Terceiro Chefe",
    description: "Enfrente o Lich Rei",
    story_text:
      "No topo da torre, o Lich Rei aguarda. Um ser de poder imenso que governou estas terras há milênios. Sua magia negra é devastadora, mas você deve vencê-lo.",
    npc: {
      id: "story_lich_1",
      name: "Lich Rei",
      level: 20,
      stats: {
        strength: 50,
        agility: 30,
        defense: 40,
        health: 500,
        max_health: 500,
      },
      xp_reward: 1000,
      gold_reward: 800,
      difficulty: "hard",
    },
    rewards: {
      xp: 1000,
      gold: 800,
      items: ["Poção de Cura Épica"],
      equipment: "Katana do Fogo",
    },
    level_required: 20,
  },

  // Capítulos 16-25 (Níveis 21-30)
  {
    id: 16,
    chapter: 16,
    title: "O Reino Submerso",
    description: "Um reino perdido sob as ondas",
    story_text:
      "As águas se abrem revelando um reino antigo submerso. Palácios de coral e criaturas marinhas místicas habitam este lugar. Você deve nadar através dos perigos aquáticos.",
    npc: {
      id: "story_leviathan_1",
      name: "Leviatã Menor",
      level: 22,
      stats: {
        strength: 55,
        agility: 20,
        defense: 45,
        health: 400,
        max_health: 400,
      },
      xp_reward: 800,
      gold_reward: 400,
      difficulty: "hard",
    },
    rewards: { xp: 800, gold: 400 },
    level_required: 22,
  },
  {
    id: 17,
    chapter: 17,
    title: "A Dimensão Paralela",
    description: "Um portal para outro mundo",
    story_text:
      "Um portal brilhante se abre diante de você, levando a uma dimensão onde as leis da física são diferentes. Criaturas estranhas habitam este lugar bizarro.",
    npc: {
      id: "story_void_1",
      name: "Entidade do Vazio",
      level: 25,
      stats: {
        strength: 60,
        agility: 35,
        defense: 30,
        health: 450,
        max_health: 450,
      },
      xp_reward: 1000,
      gold_reward: 500,
      difficulty: "hard",
    },
    rewards: { xp: 1000, gold: 500, items: ["Poção de Cura Lendária"] },
    level_required: 25,
  },
  {
    id: 18,
    chapter: 18,
    title: "O Quarto Chefe",
    description: "Enfrente o Dragão Elemental",
    story_text:
      "Um dragão de quatro cabeças, cada uma representando um elemento diferente, aguarda no centro da dimensão. Fogo, água, terra e ar se combinam em um poder devastador.",
    npc: {
      id: "story_elemental_dragon",
      name: "Dragão Elemental",
      level: 30,
      stats: {
        strength: 80,
        agility: 40,
        defense: 60,
        health: 800,
        max_health: 800,
      },
      xp_reward: 2000,
      gold_reward: 1500,
      difficulty: "hard",
    },
    rewards: {
      xp: 2000,
      gold: 1500,
      items: ["Poção de Cura Lendária"],
      equipment: "Katana da Sombra",
    },
    level_required: 30,
  },

  // Capítulos 19-30 (Níveis 31-40)
  {
    id: 19,
    chapter: 19,
    title: "O Céu Infinito",
    description: "Cidades flutuantes nas nuvens",
    story_text:
      "Cidades de cristal flutuam nas nuvens acima de você. Seres alados habitam estes lugares celestiais. Você deve voar através dos céus para continuar sua jornada.",
    npc: {
      id: "story_angel_1",
      name: "Anjo Caído",
      level: 32,
      stats: {
        strength: 70,
        agility: 50,
        defense: 55,
        health: 600,
        max_health: 600,
      },
      xp_reward: 1200,
      gold_reward: 600,
      difficulty: "hard",
    },
    rewards: { xp: 1200, gold: 600 },
    level_required: 32,
  },
  {
    id: 20,
    chapter: 20,
    title: "O Quinto Chefe",
    description: "Enfrente o Arcanjo da Destruição",
    story_text:
      "No mais alto dos céus, o Arcanjo da Destruição aguarda. Suas asas brilham com poder divino, mas sua alma foi corrompida pela escuridão. Esta será sua batalha mais difícil até agora.",
    npc: {
      id: "story_archangel",
      name: "Arcanjo da Destruição",
      level: 40,
      stats: {
        strength: 100,
        agility: 60,
        defense: 80,
        health: 1200,
        max_health: 1200,
      },
      xp_reward: 3000,
      gold_reward: 2500,
      difficulty: "hard",
    },
    rewards: {
      xp: 3000,
      gold: 2500,
      items: ["Poção de Cura Divina"],
      equipment: "Katana Lendária",
    },
    level_required: 40,
  },

  // Capítulos 21-30 (Níveis 41-50)
  {
    id: 21,
    chapter: 21,
    title: "O Fim dos Tempos",
    description: "A batalha final se aproxima",
    story_text:
      "Você chegou ao fim de sua jornada. O destino do universo está em suas mãos. O Senhor do Caos aguarda no coração da realidade, pronto para destruir tudo que existe.",
    npc: {
      id: "story_chaos_lord",
      name: "Senhor do Caos",
      level: 50,
      stats: {
        strength: 150,
        agility: 80,
        defense: 120,
        health: 2000,
        max_health: 2000,
      },
      xp_reward: 5000,
      gold_reward: 5000,
      difficulty: "hard",
    },
    rewards: {
      xp: 5000,
      gold: 5000,
      items: ["Poção de Cura Celestial"],
      equipment: "Katana Celestial",
    },
    level_required: 50,
  },
];

export default defineEventHandler(async (event) => {
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));

    if (!token) {
      token = getCookie(event, "@mmo/ninja/token"); // Try to get token from cookie
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
      .get(characterId, payload.id) as any;

    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem não encontrado",
      });
    }

    // Buscar progresso da história
    const storyProgress = db
      .prepare(
        `
      SELECT * FROM story_progress 
      WHERE character_id = ?
      ORDER BY chapter
    `
      )
      .all(characterId) as any[];

    const completedChapters = storyProgress.map((p) => p.chapter);

    // Retornar todos os capítulos até nível 50 com status
    const characterLevel = character.level;
    const allChapters = STORY_CHAPTERS.map((chapter) => {
      const isCompleted = completedChapters.includes(chapter.chapter);
      const isAvailable =
        chapter.level_required <= characterLevel &&
        (completedChapters.includes(chapter.chapter - 1) ||
          chapter.chapter === 1);
      const isLocked = !isAvailable && !isCompleted;

      return {
        ...chapter,
        is_completed: isCompleted,
        is_available: isAvailable,
        is_locked: isLocked,
        can_play: isAvailable && !isCompleted,
      };
    });

    const response: ApiResponse<any[]> = {
      success: true,
      data: allChapters,
    };

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor",
    });
  }
});
