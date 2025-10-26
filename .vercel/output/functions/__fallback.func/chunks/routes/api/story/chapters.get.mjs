import { d as defineEventHandler, a as getHeader, g as getCookie, c as createError, e as getQuery } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/auth.mjs';
import { g as getDatabase } from '../../../_/databaseAdapter.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'bcryptjs';
import 'jsonwebtoken';
import '@vercel/postgres';

const STORY_CHAPTERS = [
  // Capítulos 1-10 (Níveis 1-10)
  {
    id: 1,
    chapter: 1,
    title: "O In\xEDcio da Jornada",
    description: "Um jovem ninja/guerreiro espacial inicia sua aventura",
    story_text: "Em um mundo distante, voc\xEA desperta com um chamado interior. O destino o aguarda, mas primeiro voc\xEA deve provar seu valor contra os perigos b\xE1sicos que rondam as terras iniciais.",
    npc: {
      id: "story_goblin_1",
      name: "Goblin Iniciante",
      level: 1,
      stats: {
        strength: 5,
        agility: 4,
        defense: 3,
        health: 40,
        max_health: 40
      },
      xp_reward: 50,
      gold_reward: 25,
      difficulty: "easy"
    },
    rewards: { xp: 50, gold: 25, items: ["Po\xE7\xE3o de Cura Pequena"] },
    level_required: 1
  },
  {
    id: 2,
    chapter: 2,
    title: "Primeira Prova",
    description: "Enfrente seu primeiro desafio real",
    story_text: "Os goblins n\xE3o s\xE3o mais um problema, mas agora criaturas mais perigosas come\xE7am a aparecer. Voc\xEA deve aprender a usar suas habilidades b\xE1sicas para sobreviver.",
    npc: {
      id: "story_orc_1",
      name: "Orc Guerreiro",
      level: 2,
      stats: {
        strength: 8,
        agility: 5,
        defense: 6,
        health: 60,
        max_health: 60
      },
      xp_reward: 80,
      gold_reward: 40,
      difficulty: "easy"
    },
    rewards: { xp: 80, gold: 40 },
    level_required: 2
  },
  {
    id: 3,
    chapter: 3,
    title: "A Floresta Sombria",
    description: "Adentre a floresta onde criaturas sombrias habitam",
    story_text: "Uma floresta antiga se estende \xE0 sua frente. Sussurros sombrios ecoam entre as \xE1rvores. Voc\xEA sente que algo poderoso o aguarda no cora\xE7\xE3o desta floresta.",
    npc: {
      id: "story_shadow_1",
      name: "Sombra da Floresta",
      level: 3,
      stats: {
        strength: 10,
        agility: 8,
        defense: 5,
        health: 70,
        max_health: 70
      },
      xp_reward: 120,
      gold_reward: 60,
      difficulty: "medium"
    },
    rewards: { xp: 120, gold: 60, items: ["Po\xE7\xE3o de Cura M\xE9dia"] },
    level_required: 3
  },
  {
    id: 4,
    chapter: 4,
    title: "O Guardi\xE3o da Ponte",
    description: "Uma ponte antiga guardada por um ser poderoso",
    story_text: "Uma ponte de pedra antiga cruza um abismo profundo. No centro, um guardi\xE3o ancestral aguarda. Ele testar\xE1 sua for\xE7a e determina\xE7\xE3o antes de permitir a passagem.",
    npc: {
      id: "story_guardian_1",
      name: "Guardi\xE3o da Ponte",
      level: 4,
      stats: {
        strength: 12,
        agility: 6,
        defense: 10,
        health: 100,
        max_health: 100
      },
      xp_reward: 150,
      gold_reward: 75,
      difficulty: "medium"
    },
    rewards: { xp: 150, gold: 75 },
    level_required: 4
  },
  {
    id: 5,
    chapter: 5,
    title: "O Primeiro Chefe",
    description: "Enfrente o primeiro chefe da sua jornada",
    story_text: "Ap\xF3s cruzar a ponte, voc\xEA encontra uma caverna escura. No fundo, um drag\xE3o jovem descansa sobre um tesouro brilhante. Este ser\xE1 seu primeiro teste real como guerreiro.",
    npc: {
      id: "story_dragon_1",
      name: "Drag\xE3o Jovem",
      level: 5,
      stats: {
        strength: 15,
        agility: 10,
        defense: 12,
        health: 150,
        max_health: 150
      },
      xp_reward: 300,
      gold_reward: 200,
      difficulty: "hard"
    },
    rewards: {
      xp: 300,
      gold: 200,
      items: ["Po\xE7\xE3o de Cura Grande"],
      equipment: "Katana Afiada"
    },
    level_required: 5
  },
  // Capítulos 6-15 (Níveis 6-15)
  {
    id: 6,
    chapter: 6,
    title: "As Terras Desoladas",
    description: "Uma regi\xE3o devastada pela guerra antiga",
    story_text: "As terras \xE0 frente foram devastadas por uma guerra antiga. Restos de armaduras e armas espalhados pelo ch\xE3o. Mas entre os destro\xE7os, criaturas corrompidas ainda vagam.",
    npc: {
      id: "story_corrupted_1",
      name: "Soldado Corrompido",
      level: 6,
      stats: {
        strength: 18,
        agility: 8,
        defense: 14,
        health: 120,
        max_health: 120
      },
      xp_reward: 200,
      gold_reward: 100,
      difficulty: "medium"
    },
    rewards: { xp: 200, gold: 100 },
    level_required: 6
  },
  {
    id: 7,
    chapter: 7,
    title: "O Labirinto Perdido",
    description: "Um labirinto antigo cheio de mist\xE9rios",
    story_text: "Um labirinto de pedra se estende \xE0 sua frente. As paredes parecem se mover, criando novos caminhos. Voc\xEA deve encontrar a sa\xEDda, mas criaturas estranhas habitam este lugar.",
    npc: {
      id: "story_minotaur_1",
      name: "Minotauro do Labirinto",
      level: 7,
      stats: {
        strength: 20,
        agility: 6,
        defense: 16,
        health: 140,
        max_health: 140
      },
      xp_reward: 250,
      gold_reward: 125,
      difficulty: "medium"
    },
    rewards: { xp: 250, gold: 125, items: ["Po\xE7\xE3o de Cura M\xE9dia"] },
    level_required: 7
  },
  {
    id: 8,
    chapter: 8,
    title: "A Cidade Fantasma",
    description: "Uma cidade abandonada h\xE1 s\xE9culos",
    story_text: "Uma cidade antiga se ergue \xE0 dist\xE2ncia, mas n\xE3o h\xE1 sinais de vida. Apenas fantasmas e criaturas sombrias vagam pelas ruas vazias. Algo terr\xEDvel aconteceu aqui.",
    npc: {
      id: "story_phantom_1",
      name: "Fantasma da Cidade",
      level: 8,
      stats: {
        strength: 22,
        agility: 12,
        defense: 10,
        health: 130,
        max_health: 130
      },
      xp_reward: 280,
      gold_reward: 140,
      difficulty: "medium"
    },
    rewards: { xp: 280, gold: 140 },
    level_required: 8
  },
  {
    id: 9,
    chapter: 9,
    title: "O Templo Esquecido",
    description: "Um templo antigo com segredos ocultos",
    story_text: "Um templo de pedra antiga se ergue no topo de uma montanha. Esculturas estranhas decoram as paredes. Voc\xEA sente uma energia m\xEDstica emanando de dentro.",
    npc: {
      id: "story_priest_1",
      name: "Sacerdote Corrompido",
      level: 9,
      stats: {
        strength: 25,
        agility: 10,
        defense: 18,
        health: 160,
        max_health: 160
      },
      xp_reward: 320,
      gold_reward: 160,
      difficulty: "hard"
    },
    rewards: { xp: 320, gold: 160, items: ["Po\xE7\xE3o de Cura Grande"] },
    level_required: 9
  },
  {
    id: 10,
    chapter: 10,
    title: "O Segundo Chefe",
    description: "Enfrente um dem\xF4nio das profundezas",
    story_text: "No cora\xE7\xE3o do templo, um portal para o submundo se abre. Um dem\xF4nio das profundezas emerge, seus olhos brilhando com mal\xEDcia. Esta ser\xE1 uma batalha \xE9pica.",
    npc: {
      id: "story_demon_1",
      name: "Dem\xF4nio das Profundezas",
      level: 10,
      stats: {
        strength: 30,
        agility: 15,
        defense: 20,
        health: 250,
        max_health: 250
      },
      xp_reward: 500,
      gold_reward: 400,
      difficulty: "hard"
    },
    rewards: {
      xp: 500,
      gold: 400,
      items: ["Po\xE7\xE3o de Cura Superior"],
      equipment: "Katana do Vento"
    },
    level_required: 10
  },
  // Capítulos 11-20 (Níveis 11-20)
  {
    id: 11,
    chapter: 11,
    title: "As Plan\xEDcies Infinitas",
    description: "Vastas plan\xEDcies onde o vento sopra eternamente",
    story_text: "As plan\xEDcies se estendem at\xE9 o horizonte. O vento sopra constantemente, carregando sussurros de batalhas antigas. Criaturas poderosas vagam por estas terras.",
    npc: {
      id: "story_centaur_1",
      name: "Centauro Guerreiro",
      level: 12,
      stats: {
        strength: 35,
        agility: 20,
        defense: 25,
        health: 200,
        max_health: 200
      },
      xp_reward: 400,
      gold_reward: 200,
      difficulty: "medium"
    },
    rewards: { xp: 400, gold: 200 },
    level_required: 12
  },
  {
    id: 12,
    chapter: 12,
    title: "A Montanha G\xE9lida",
    description: "Uma montanha coberta de gelo eterno",
    story_text: "Uma montanha imponente se ergue \xE0 frente, sua superf\xEDcie coberta de gelo eterno. O frio \xE9 intenso, mas voc\xEA deve escalar para alcan\xE7ar o que est\xE1 no topo.",
    npc: {
      id: "story_yeti_1",
      name: "Yeti da Montanha",
      level: 14,
      stats: {
        strength: 40,
        agility: 12,
        defense: 30,
        health: 250,
        max_health: 250
      },
      xp_reward: 500,
      gold_reward: 250,
      difficulty: "hard"
    },
    rewards: { xp: 500, gold: 250, items: ["Po\xE7\xE3o de Cura Superior"] },
    level_required: 14
  },
  {
    id: 13,
    chapter: 13,
    title: "O Vale dos Drag\xF5es",
    description: "Um vale onde drag\xF5es antigos descansam",
    story_text: "Um vale profundo onde drag\xF5es antigos fazem seus ninhos. O ar est\xE1 carregado de energia m\xE1gica. Voc\xEA deve passar por aqui, mas os drag\xF5es n\xE3o s\xE3o hospitaleiros.",
    npc: {
      id: "story_dragon_2",
      name: "Drag\xE3o Anci\xE3o",
      level: 16,
      stats: {
        strength: 45,
        agility: 18,
        defense: 35,
        health: 300,
        max_health: 300
      },
      xp_reward: 600,
      gold_reward: 300,
      difficulty: "hard"
    },
    rewards: { xp: 600, gold: 300 },
    level_required: 16
  },
  {
    id: 14,
    chapter: 14,
    title: "A Torre M\xE1gica",
    description: "Uma torre que toca as nuvens",
    story_text: "Uma torre de cristal se ergue at\xE9 as nuvens. Energia m\xE1gica pulsa atrav\xE9s de suas paredes. No topo, um mago poderoso aguarda para testar sua for\xE7a.",
    npc: {
      id: "story_mage_1",
      name: "Mago Arcano",
      level: 18,
      stats: {
        strength: 30,
        agility: 25,
        defense: 20,
        health: 280,
        max_health: 280
      },
      xp_reward: 700,
      gold_reward: 350,
      difficulty: "hard"
    },
    rewards: { xp: 700, gold: 350, items: ["Po\xE7\xE3o de Cura \xC9pica"] },
    level_required: 18
  },
  {
    id: 15,
    chapter: 15,
    title: "O Terceiro Chefe",
    description: "Enfrente o Lich Rei",
    story_text: "No topo da torre, o Lich Rei aguarda. Um ser de poder imenso que governou estas terras h\xE1 mil\xEAnios. Sua magia negra \xE9 devastadora, mas voc\xEA deve venc\xEA-lo.",
    npc: {
      id: "story_lich_1",
      name: "Lich Rei",
      level: 20,
      stats: {
        strength: 50,
        agility: 30,
        defense: 40,
        health: 500,
        max_health: 500
      },
      xp_reward: 1e3,
      gold_reward: 800,
      difficulty: "hard"
    },
    rewards: {
      xp: 1e3,
      gold: 800,
      items: ["Po\xE7\xE3o de Cura \xC9pica"],
      equipment: "Katana do Fogo"
    },
    level_required: 20
  },
  // Capítulos 16-25 (Níveis 21-30)
  {
    id: 16,
    chapter: 16,
    title: "O Reino Submerso",
    description: "Um reino perdido sob as ondas",
    story_text: "As \xE1guas se abrem revelando um reino antigo submerso. Pal\xE1cios de coral e criaturas marinhas m\xEDsticas habitam este lugar. Voc\xEA deve nadar atrav\xE9s dos perigos aqu\xE1ticos.",
    npc: {
      id: "story_leviathan_1",
      name: "Leviat\xE3 Menor",
      level: 22,
      stats: {
        strength: 55,
        agility: 20,
        defense: 45,
        health: 400,
        max_health: 400
      },
      xp_reward: 800,
      gold_reward: 400,
      difficulty: "hard"
    },
    rewards: { xp: 800, gold: 400 },
    level_required: 22
  },
  {
    id: 17,
    chapter: 17,
    title: "A Dimens\xE3o Paralela",
    description: "Um portal para outro mundo",
    story_text: "Um portal brilhante se abre diante de voc\xEA, levando a uma dimens\xE3o onde as leis da f\xEDsica s\xE3o diferentes. Criaturas estranhas habitam este lugar bizarro.",
    npc: {
      id: "story_void_1",
      name: "Entidade do Vazio",
      level: 25,
      stats: {
        strength: 60,
        agility: 35,
        defense: 30,
        health: 450,
        max_health: 450
      },
      xp_reward: 1e3,
      gold_reward: 500,
      difficulty: "hard"
    },
    rewards: { xp: 1e3, gold: 500, items: ["Po\xE7\xE3o de Cura Lend\xE1ria"] },
    level_required: 25
  },
  {
    id: 18,
    chapter: 18,
    title: "O Quarto Chefe",
    description: "Enfrente o Drag\xE3o Elemental",
    story_text: "Um drag\xE3o de quatro cabe\xE7as, cada uma representando um elemento diferente, aguarda no centro da dimens\xE3o. Fogo, \xE1gua, terra e ar se combinam em um poder devastador.",
    npc: {
      id: "story_elemental_dragon",
      name: "Drag\xE3o Elemental",
      level: 30,
      stats: {
        strength: 80,
        agility: 40,
        defense: 60,
        health: 800,
        max_health: 800
      },
      xp_reward: 2e3,
      gold_reward: 1500,
      difficulty: "hard"
    },
    rewards: {
      xp: 2e3,
      gold: 1500,
      items: ["Po\xE7\xE3o de Cura Lend\xE1ria"],
      equipment: "Katana da Sombra"
    },
    level_required: 30
  },
  // Capítulos 19-30 (Níveis 31-40)
  {
    id: 19,
    chapter: 19,
    title: "O C\xE9u Infinito",
    description: "Cidades flutuantes nas nuvens",
    story_text: "Cidades de cristal flutuam nas nuvens acima de voc\xEA. Seres alados habitam estes lugares celestiais. Voc\xEA deve voar atrav\xE9s dos c\xE9us para continuar sua jornada.",
    npc: {
      id: "story_angel_1",
      name: "Anjo Ca\xEDdo",
      level: 32,
      stats: {
        strength: 70,
        agility: 50,
        defense: 55,
        health: 600,
        max_health: 600
      },
      xp_reward: 1200,
      gold_reward: 600,
      difficulty: "hard"
    },
    rewards: { xp: 1200, gold: 600 },
    level_required: 32
  },
  {
    id: 20,
    chapter: 20,
    title: "O Quinto Chefe",
    description: "Enfrente o Arcanjo da Destrui\xE7\xE3o",
    story_text: "No mais alto dos c\xE9us, o Arcanjo da Destrui\xE7\xE3o aguarda. Suas asas brilham com poder divino, mas sua alma foi corrompida pela escurid\xE3o. Esta ser\xE1 sua batalha mais dif\xEDcil at\xE9 agora.",
    npc: {
      id: "story_archangel",
      name: "Arcanjo da Destrui\xE7\xE3o",
      level: 40,
      stats: {
        strength: 100,
        agility: 60,
        defense: 80,
        health: 1200,
        max_health: 1200
      },
      xp_reward: 3e3,
      gold_reward: 2500,
      difficulty: "hard"
    },
    rewards: {
      xp: 3e3,
      gold: 2500,
      items: ["Po\xE7\xE3o de Cura Divina"],
      equipment: "Katana Lend\xE1ria"
    },
    level_required: 40
  },
  // Capítulos 21-30 (Níveis 41-50)
  {
    id: 21,
    chapter: 21,
    title: "O Fim dos Tempos",
    description: "A batalha final se aproxima",
    story_text: "Voc\xEA chegou ao fim de sua jornada. O destino do universo est\xE1 em suas m\xE3os. O Senhor do Caos aguarda no cora\xE7\xE3o da realidade, pronto para destruir tudo que existe.",
    npc: {
      id: "story_chaos_lord",
      name: "Senhor do Caos",
      level: 50,
      stats: {
        strength: 150,
        agility: 80,
        defense: 120,
        health: 2e3,
        max_health: 2e3
      },
      xp_reward: 5e3,
      gold_reward: 5e3,
      difficulty: "hard"
    },
    rewards: {
      xp: 5e3,
      gold: 5e3,
      items: ["Po\xE7\xE3o de Cura Celestial"],
      equipment: "Katana Celestial"
    },
    level_required: 50
  }
];
const chapters_get = defineEventHandler(async (event) => {
  const db = getDatabase();
  try {
    let token = extractTokenFromHeader(getHeader(event, "authorization"));
    if (!token) {
      token = getCookie(event, "@mmo/ninja/token");
    }
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Token de autentica\xE7\xE3o n\xE3o fornecido"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        message: "Token inv\xE1lido"
      });
    }
    const characterId = getQuery(event).character_id;
    if (!characterId) {
      throw createError({
        statusCode: 400,
        message: "ID do personagem \xE9 obrigat\xF3rio"
      });
    }
    const character = db.prepare(
      `
      SELECT * FROM characters 
      WHERE id = ? AND user_id = ?
    `
    ).get(characterId, payload.id);
    if (!character) {
      throw createError({
        statusCode: 404,
        message: "Personagem n\xE3o encontrado"
      });
    }
    const storyProgress = db.prepare(
      `
      SELECT * FROM story_progress 
      WHERE character_id = ?
      ORDER BY chapter
    `
    ).all(characterId);
    const completedChapters = storyProgress.map((p) => p.chapter);
    const characterLevel = character.level;
    const allChapters = STORY_CHAPTERS.map((chapter) => {
      const isCompleted = completedChapters.includes(chapter.chapter);
      const isAvailable = chapter.level_required <= characterLevel && (completedChapters.includes(chapter.chapter - 1) || chapter.chapter === 1);
      const isLocked = !isAvailable && !isCompleted;
      return {
        ...chapter,
        is_completed: isCompleted,
        is_available: isAvailable,
        is_locked: isLocked,
        can_play: isAvailable && !isCompleted
      };
    });
    const response = {
      success: true,
      data: allChapters
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { chapters_get as default };
//# sourceMappingURL=chapters.get.mjs.map
