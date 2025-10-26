import { d as defineEventHandler, e as getQuery, c as createError } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const available_get = defineEventHandler(async (event) => {
  getDatabase();
  try {
    const query = getQuery(event);
    const characterClass = query.class;
    const characterLevel = parseInt(query.level) || 1;
    if (!characterClass) {
      throw createError({
        statusCode: 400,
        message: "Classe do personagem \xE9 obrigat\xF3ria"
      });
    }
    const skillsByClass = {
      ninja: {
        // Níveis 1-5: Habilidades Básicas
        1: [
          {
            name: "Kunai Throw",
            level: 1,
            damage: 25,
            cooldown: 30,
            description: "Lan\xE7a kunais precisos"
          },
          {
            name: "Shuriken Barrage",
            level: 2,
            damage: 35,
            cooldown: 45,
            description: "Barragem de shurikens"
          },
          {
            name: "Fire Jutsu",
            level: 3,
            damage: 40,
            cooldown: 60,
            description: "T\xE9cnica de fogo b\xE1sica"
          },
          {
            name: "Wind Jutsu",
            level: 4,
            damage: 40,
            cooldown: 60,
            description: "T\xE9cnica de vento b\xE1sica"
          },
          {
            name: "Water Jutsu",
            level: 5,
            damage: 40,
            cooldown: 60,
            description: "T\xE9cnica de \xE1gua b\xE1sica"
          }
        ],
        // Níveis 6-10: Habilidades Intermediárias
        6: [
          {
            name: "Earth Jutsu",
            level: 6,
            damage: 45,
            cooldown: 60,
            description: "T\xE9cnica de terra b\xE1sica"
          },
          {
            name: "Shadow Clone",
            level: 7,
            damage: 50,
            cooldown: 90,
            description: "Cria clones de sombra"
          },
          {
            name: "Lightning Jutsu",
            level: 8,
            damage: 55,
            cooldown: 75,
            description: "T\xE9cnica de raio b\xE1sica"
          },
          {
            name: "Fire Dragon",
            level: 9,
            damage: 60,
            cooldown: 90,
            description: "Drag\xE3o de fogo"
          },
          {
            name: "Wind Tornado",
            level: 10,
            damage: 60,
            cooldown: 90,
            description: "Tornado de vento"
          }
        ],
        // Níveis 11-20: Habilidades Avançadas
        11: [
          {
            name: "Water Prison",
            level: 11,
            damage: 65,
            cooldown: 90,
            description: "Pris\xE3o de \xE1gua"
          },
          {
            name: "Earth Spikes",
            level: 12,
            damage: 70,
            cooldown: 90,
            description: "Espinhos de terra"
          },
          {
            name: "Chidori",
            level: 13,
            damage: 80,
            cooldown: 120,
            description: "T\xE9cnica de raio avan\xE7ada"
          },
          {
            name: "Rasengan",
            level: 14,
            damage: 85,
            cooldown: 120,
            description: "Esfera espiral"
          },
          {
            name: "Ice Jutsu",
            level: 15,
            damage: 75,
            cooldown: 90,
            description: "T\xE9cnica de gelo"
          },
          {
            name: "Rock Armor",
            level: 16,
            damage: 0,
            cooldown: 180,
            description: "Armadura de pedra"
          },
          {
            name: "Fire Phoenix",
            level: 17,
            damage: 90,
            cooldown: 150,
            description: "F\xEAnix de fogo"
          },
          {
            name: "Tsunami",
            level: 18,
            damage: 95,
            cooldown: 150,
            description: "Tsunami devastador"
          },
          {
            name: "Earthquake",
            level: 19,
            damage: 100,
            cooldown: 150,
            description: "Terremoto"
          },
          {
            name: "Hurricane",
            level: 20,
            damage: 100,
            cooldown: 150,
            description: "Furac\xE3o"
          }
        ],
        // Níveis 21-30: Habilidades Épicas
        21: [
          {
            name: "Thunder Storm",
            level: 21,
            damage: 110,
            cooldown: 180,
            description: "Tempestade de raios"
          },
          {
            name: "Blizzard",
            level: 22,
            damage: 115,
            cooldown: 180,
            description: "Nevasca"
          },
          {
            name: "Meteor Strike",
            level: 23,
            damage: 120,
            cooldown: 200,
            description: "Ataque de meteoro"
          },
          {
            name: "Dimension Slash",
            level: 24,
            damage: 125,
            cooldown: 200,
            description: "Corte dimensional"
          },
          {
            name: "Chakra Mode",
            level: 25,
            damage: 0,
            cooldown: 300,
            description: "Modo chakra"
          },
          {
            name: "Resurrection",
            level: 26,
            damage: 0,
            cooldown: 600,
            description: "Ressurrei\xE7\xE3o"
          },
          {
            name: "Solar Flare",
            level: 27,
            damage: 130,
            cooldown: 240,
            description: "Clar\xE3o solar"
          },
          {
            name: "Ocean Depths",
            level: 28,
            damage: 135,
            cooldown: 240,
            description: "Profundezas oce\xE2nicas"
          },
          {
            name: "Mountain Crush",
            level: 29,
            damage: 140,
            cooldown: 240,
            description: "Esmagamento de montanha"
          },
          {
            name: "Sky Tornado",
            level: 30,
            damage: 140,
            cooldown: 240,
            description: "Tornado do c\xE9u"
          }
        ],
        // Níveis 31-40: Habilidades Lendárias
        31: [
          {
            name: "Lightning God",
            level: 31,
            damage: 150,
            cooldown: 300,
            description: "Deus do raio"
          },
          {
            name: "Ice Age",
            level: 32,
            damage: 155,
            cooldown: 300,
            description: "Era do gelo"
          },
          {
            name: "Planet Crush",
            level: 33,
            damage: 160,
            cooldown: 300,
            description: "Esmagamento planet\xE1rio"
          },
          {
            name: "Reality Warp",
            level: 34,
            damage: 165,
            cooldown: 300,
            description: "Distor\xE7\xE3o da realidade"
          },
          {
            name: "Sage Mode",
            level: 35,
            damage: 0,
            cooldown: 600,
            description: "Modo s\xE1bio"
          },
          {
            name: "Divine Intervention",
            level: 36,
            damage: 170,
            cooldown: 360,
            description: "Interven\xE7\xE3o divina"
          },
          {
            name: "Supernova",
            level: 37,
            damage: 175,
            cooldown: 360,
            description: "Supernova"
          },
          {
            name: "Cosmic Flood",
            level: 38,
            damage: 180,
            cooldown: 360,
            description: "Inunda\xE7\xE3o c\xF3smica"
          },
          {
            name: "Galaxy Crush",
            level: 39,
            damage: 185,
            cooldown: 360,
            description: "Esmagamento gal\xE1ctico"
          },
          {
            name: "Universal Storm",
            level: 40,
            damage: 190,
            cooldown: 360,
            description: "Tempestade universal"
          }
        ],
        // Níveis 41-50: Habilidades Míticas
        41: [
          {
            name: "God Thunder",
            level: 41,
            damage: 200,
            cooldown: 420,
            description: "Trov\xE3o divino"
          },
          {
            name: "Absolute Zero",
            level: 42,
            damage: 205,
            cooldown: 420,
            description: "Zero absoluto"
          },
          {
            name: "Black Hole",
            level: 43,
            damage: 210,
            cooldown: 420,
            description: "Buraco negro"
          },
          {
            name: "Dimension Collapse",
            level: 44,
            damage: 215,
            cooldown: 420,
            description: "Colapso dimensional"
          },
          {
            name: "Transcendence",
            level: 45,
            damage: 0,
            cooldown: 900,
            description: "Transcend\xEAncia"
          },
          {
            name: "Omnipotence",
            level: 46,
            damage: 220,
            cooldown: 480,
            description: "Onipot\xEAncia"
          },
          {
            name: "Big Bang",
            level: 47,
            damage: 225,
            cooldown: 480,
            description: "Big Bang"
          },
          {
            name: "Primordial Ocean",
            level: 48,
            damage: 230,
            cooldown: 480,
            description: "Oceano primordial"
          },
          {
            name: "World Tree",
            level: 49,
            damage: 235,
            cooldown: 480,
            description: "\xC1rvore do mundo"
          },
          {
            name: "Infinite Wind",
            level: 50,
            damage: 240,
            cooldown: 480,
            description: "Vento infinito"
          }
        ]
      },
      guerreiro_espacial: {
        // Níveis 1-5: Habilidades Básicas
        1: [
          {
            name: "Plasma Shot",
            level: 1,
            damage: 30,
            cooldown: 30,
            description: "Tiro de plasma"
          },
          {
            name: "Laser Beam",
            level: 2,
            damage: 40,
            cooldown: 45,
            description: "Feixe de laser"
          },
          {
            name: "Energy Shield",
            level: 3,
            damage: 0,
            cooldown: 60,
            description: "Escudo de energia"
          },
          {
            name: "Gravity Bomb",
            level: 4,
            damage: 45,
            cooldown: 60,
            description: "Bomba de gravidade"
          },
          {
            name: "Photon Blast",
            level: 5,
            damage: 50,
            cooldown: 60,
            description: "Explos\xE3o de f\xF3tons"
          }
        ],
        // Níveis 6-10: Habilidades Intermediárias
        6: [
          {
            name: "Magnetic Field",
            level: 6,
            damage: 55,
            cooldown: 60,
            description: "Campo magn\xE9tico"
          },
          {
            name: "Quantum Strike",
            level: 7,
            damage: 60,
            cooldown: 90,
            description: "Ataque qu\xE2ntico"
          },
          {
            name: "Warp Drive",
            level: 8,
            damage: 0,
            cooldown: 120,
            description: "Motor de dobra"
          },
          {
            name: "Solar Flare",
            level: 9,
            damage: 65,
            cooldown: 90,
            description: "Clar\xE3o solar"
          },
          {
            name: "Nebula Storm",
            level: 10,
            damage: 70,
            cooldown: 90,
            description: "Tempestade de nebulosa"
          }
        ],
        // Níveis 11-20: Habilidades Avançadas
        11: [
          {
            name: "Asteroid Field",
            level: 11,
            damage: 75,
            cooldown: 90,
            description: "Campo de asteroides"
          },
          {
            name: "Nova Blast",
            level: 12,
            damage: 80,
            cooldown: 90,
            description: "Explos\xE3o de nova"
          },
          {
            name: "Black Hole",
            level: 13,
            damage: 90,
            cooldown: 120,
            description: "Buraco negro"
          },
          {
            name: "Dark Matter",
            level: 14,
            damage: 95,
            cooldown: 120,
            description: "Mat\xE9ria escura"
          },
          {
            name: "Stellar Wind",
            level: 15,
            damage: 85,
            cooldown: 90,
            description: "Vento estelar"
          },
          {
            name: "Cosmic Ray",
            level: 16,
            damage: 100,
            cooldown: 90,
            description: "Raio c\xF3smico"
          },
          {
            name: "Supernova",
            level: 17,
            damage: 110,
            cooldown: 150,
            description: "Supernova"
          },
          {
            name: "Galactic Core",
            level: 18,
            damage: 115,
            cooldown: 150,
            description: "N\xFAcleo gal\xE1ctico"
          },
          {
            name: "Pulsar Beam",
            level: 19,
            damage: 120,
            cooldown: 150,
            description: "Feixe de pulsar"
          },
          {
            name: "Quasar Blast",
            level: 20,
            damage: 125,
            cooldown: 150,
            description: "Explos\xE3o de quasar"
          }
        ],
        // Níveis 21-30: Habilidades Épicas
        21: [
          {
            name: "White Dwarf",
            level: 21,
            damage: 130,
            cooldown: 180,
            description: "An\xE3 branca"
          },
          {
            name: "Red Giant",
            level: 22,
            damage: 135,
            cooldown: 180,
            description: "Gigante vermelha"
          },
          {
            name: "Neutron Star",
            level: 23,
            damage: 140,
            cooldown: 200,
            description: "Estrela de n\xEAutrons"
          },
          {
            name: "Wormhole",
            level: 24,
            damage: 0,
            cooldown: 300,
            description: "Buraco de minhoca"
          },
          {
            name: "Space-Time Rift",
            level: 25,
            damage: 145,
            cooldown: 200,
            description: "Fenda espa\xE7o-tempo"
          },
          {
            name: "Universal Constant",
            level: 26,
            damage: 0,
            cooldown: 600,
            description: "Constante universal"
          },
          {
            name: "Big Bang",
            level: 27,
            damage: 150,
            cooldown: 240,
            description: "Big Bang"
          },
          {
            name: "Dark Energy",
            level: 28,
            damage: 155,
            cooldown: 240,
            description: "Energia escura"
          },
          {
            name: "Multiverse",
            level: 29,
            damage: 160,
            cooldown: 240,
            description: "Multiverso"
          },
          {
            name: "String Theory",
            level: 30,
            damage: 165,
            cooldown: 240,
            description: "Teoria das cordas"
          }
        ],
        // Níveis 31-40: Habilidades Lendárias
        31: [
          {
            name: "Quantum Entanglement",
            level: 31,
            damage: 170,
            cooldown: 300,
            description: "Emaranhamento qu\xE2ntico"
          },
          {
            name: "Higgs Field",
            level: 32,
            damage: 175,
            cooldown: 300,
            description: "Campo de Higgs"
          },
          {
            name: "Planck Scale",
            level: 33,
            damage: 180,
            cooldown: 300,
            description: "Escala de Planck"
          },
          {
            name: "Inflation Field",
            level: 34,
            damage: 185,
            cooldown: 300,
            description: "Campo de infla\xE7\xE3o"
          },
          {
            name: "Vacuum Decay",
            level: 35,
            damage: 190,
            cooldown: 300,
            description: "Decaimento do v\xE1cuo"
          },
          {
            name: "Cosmic Consciousness",
            level: 36,
            damage: 0,
            cooldown: 600,
            description: "Consci\xEAncia c\xF3smica"
          },
          {
            name: "Universal Creation",
            level: 37,
            damage: 195,
            cooldown: 360,
            description: "Cria\xE7\xE3o universal"
          },
          {
            name: "Dimensional Mastery",
            level: 38,
            damage: 200,
            cooldown: 360,
            description: "Dom\xEDnio dimensional"
          },
          {
            name: "Reality Engine",
            level: 39,
            damage: 205,
            cooldown: 360,
            description: "Motor da realidade"
          },
          {
            name: "Existence Protocol",
            level: 40,
            damage: 210,
            cooldown: 360,
            description: "Protocolo de exist\xEAncia"
          }
        ],
        // Níveis 41-50: Habilidades Míticas
        41: [
          {
            name: "Infinite Loop",
            level: 41,
            damage: 215,
            cooldown: 420,
            description: "Loop infinito"
          },
          {
            name: "Zero Point",
            level: 42,
            damage: 220,
            cooldown: 420,
            description: "Ponto zero"
          },
          {
            name: "Absolute Reality",
            level: 43,
            damage: 225,
            cooldown: 420,
            description: "Realidade absoluta"
          },
          {
            name: "Omniverse",
            level: 44,
            damage: 230,
            cooldown: 420,
            description: "Omniverso"
          },
          {
            name: "Transcendent Being",
            level: 45,
            damage: 0,
            cooldown: 900,
            description: "Ser transcendente"
          },
          {
            name: "Universal Override",
            level: 46,
            damage: 235,
            cooldown: 480,
            description: "Sobrescrita universal"
          },
          {
            name: "Genesis Protocol",
            level: 47,
            damage: 240,
            cooldown: 480,
            description: "Protocolo de g\xEAnese"
          },
          {
            name: "Alpha Point",
            level: 48,
            damage: 245,
            cooldown: 480,
            description: "Ponto alfa"
          },
          {
            name: "Omega Sequence",
            level: 49,
            damage: 250,
            cooldown: 480,
            description: "Sequ\xEAncia \xF4mega"
          },
          {
            name: "Infinite Recursion",
            level: 50,
            damage: 255,
            cooldown: 480,
            description: "Recurs\xE3o infinita"
          }
        ]
      },
      mago_cosmico: {
        // Níveis 1-5: Habilidades Básicas
        1: [
          {
            name: "Bola de Fogo",
            level: 1,
            damage: 30,
            cooldown: 30,
            description: "Proj\xE9til de fogo m\xE1gico"
          },
          {
            name: "Raio de Gelo",
            level: 2,
            damage: 35,
            cooldown: 45,
            description: "Raio congelante"
          },
          {
            name: "Escudo M\xE1gico",
            level: 3,
            damage: 0,
            cooldown: 60,
            description: "Prote\xE7\xE3o arcana"
          },
          {
            name: "Teletransporte",
            level: 4,
            damage: 0,
            cooldown: 90,
            description: "Movimento instant\xE2neo"
          },
          {
            name: "Explos\xE3o Arcana",
            level: 5,
            damage: 50,
            cooldown: 60,
            description: "Explos\xE3o de energia m\xE1gica"
          }
        ],
        // Níveis 6-10: Habilidades Intermediárias
        6: [
          {
            name: "Meteoro",
            level: 6,
            damage: 60,
            cooldown: 90,
            description: "Chuva de meteoros"
          },
          {
            name: "Portal Dimensional",
            level: 7,
            damage: 0,
            cooldown: 120,
            description: "Abertura dimensional"
          },
          {
            name: "Tempestade de Raios",
            level: 8,
            damage: 70,
            cooldown: 90,
            description: "Tempestade el\xE9trica"
          },
          {
            name: "Nevasca",
            level: 9,
            damage: 65,
            cooldown: 90,
            description: "Tempestade de gelo"
          },
          {
            name: "Invoca\xE7\xE3o Elemental",
            level: 10,
            damage: 75,
            cooldown: 120,
            description: "Convocar elemental"
          }
        ],
        // Níveis 11-20: Habilidades Avançadas
        11: [
          {
            name: "Buraco Negro",
            level: 11,
            damage: 80,
            cooldown: 120,
            description: "Singularidade m\xE1gica"
          },
          {
            name: "Manipula\xE7\xE3o Temporal",
            level: 12,
            damage: 0,
            cooldown: 180,
            description: "Controle do tempo"
          },
          {
            name: "Explos\xE3o Solar",
            level: 13,
            damage: 90,
            cooldown: 150,
            description: "Poder do sol"
          },
          {
            name: "Distor\xE7\xE3o Espacial",
            level: 14,
            damage: 85,
            cooldown: 120,
            description: "Dobrar o espa\xE7o"
          },
          {
            name: "Invoca\xE7\xE3o C\xF3smica",
            level: 15,
            damage: 95,
            cooldown: 150,
            description: "Poder c\xF3smico"
          },
          {
            name: "Barreira Dimensional",
            level: 16,
            damage: 0,
            cooldown: 180,
            description: "Prote\xE7\xE3o dimensional"
          },
          {
            name: "Supernova",
            level: 17,
            damage: 100,
            cooldown: 180,
            description: "Explos\xE3o estelar"
          },
          {
            name: "Controle da Realidade",
            level: 18,
            damage: 105,
            cooldown: 200,
            description: "Manipular realidade"
          },
          {
            name: "Invoca\xE7\xE3o Divina",
            level: 19,
            damage: 110,
            cooldown: 200,
            description: "Poder divino"
          },
          {
            name: "Apocalipse M\xE1gico",
            level: 20,
            damage: 120,
            cooldown: 240,
            description: "Fim dos tempos"
          }
        ],
        // Níveis 21-30: Habilidades Épicas
        21: [
          {
            name: "Cria\xE7\xE3o Universal",
            level: 21,
            damage: 130,
            cooldown: 300,
            description: "Criar universo"
          },
          {
            name: "Destrui\xE7\xE3o C\xF3smica",
            level: 22,
            damage: 135,
            cooldown: 300,
            description: "Destruir cosmos"
          },
          {
            name: "Transcend\xEAncia",
            level: 23,
            damage: 0,
            cooldown: 600,
            description: "Transcender exist\xEAncia"
          },
          {
            name: "Onisci\xEAncia",
            level: 24,
            damage: 140,
            cooldown: 360,
            description: "Conhecimento absoluto"
          },
          {
            name: "Onipot\xEAncia",
            level: 25,
            damage: 0,
            cooldown: 900,
            description: "Poder absoluto"
          },
          {
            name: "Cria\xE7\xE3o de Vida",
            level: 26,
            damage: 0,
            cooldown: 600,
            description: "Dar vida"
          },
          {
            name: "Controle do Destino",
            level: 27,
            damage: 150,
            cooldown: 420,
            description: "Manipular destino"
          },
          {
            name: "Invoca\xE7\xE3o Primordial",
            level: 28,
            damage: 155,
            cooldown: 420,
            description: "Poder primordial"
          },
          {
            name: "Transcend\xEAncia C\xF3smica",
            level: 29,
            damage: 160,
            cooldown: 480,
            description: "Transcender cosmos"
          },
          {
            name: "Magia Infinita",
            level: 30,
            damage: 170,
            cooldown: 480,
            description: "Poder infinito"
          }
        ],
        // Níveis 31-40: Habilidades Lendárias
        31: [
          {
            name: "Cria\xE7\xE3o de Multiversos",
            level: 31,
            damage: 180,
            cooldown: 600,
            description: "Criar multiversos"
          },
          {
            name: "Destrui\xE7\xE3o de Realidades",
            level: 32,
            damage: 185,
            cooldown: 600,
            description: "Destruir realidades"
          },
          {
            name: "Controle Absoluto",
            level: 33,
            damage: 190,
            cooldown: 600,
            description: "Controle total"
          },
          {
            name: "Transcend\xEAncia Divina",
            level: 34,
            damage: 195,
            cooldown: 720,
            description: "Transcender divindade"
          },
          {
            name: "Magia Primordial",
            level: 35,
            damage: 0,
            cooldown: 1200,
            description: "Magia das origens"
          },
          {
            name: "Cria\xE7\xE3o de Deuses",
            level: 36,
            damage: 200,
            cooldown: 900,
            description: "Criar divindades"
          },
          {
            name: "Destrui\xE7\xE3o de Deuses",
            level: 37,
            damage: 205,
            cooldown: 900,
            description: "Destruir divindades"
          },
          {
            name: "Controle do Vazio",
            level: 38,
            damage: 210,
            cooldown: 900,
            description: "Controlar o nada"
          },
          {
            name: "Transcend\xEAncia Absoluta",
            level: 39,
            damage: 215,
            cooldown: 1080,
            description: "Transcender tudo"
          },
          {
            name: "Magia do Infinito",
            level: 40,
            damage: 220,
            cooldown: 1080,
            description: "Poder do infinito"
          }
        ],
        // Níveis 41-50: Habilidades Míticas
        41: [
          {
            name: "Cria\xE7\xE3o de Eternidade",
            level: 41,
            damage: 230,
            cooldown: 1200,
            description: "Criar eternidade"
          },
          {
            name: "Destrui\xE7\xE3o do Tempo",
            level: 42,
            damage: 235,
            cooldown: 1200,
            description: "Destruir tempo"
          },
          {
            name: "Controle do Infinito",
            level: 43,
            damage: 240,
            cooldown: 1200,
            description: "Controlar infinito"
          },
          {
            name: "Transcend\xEAncia Eterna",
            level: 44,
            damage: 245,
            cooldown: 1440,
            description: "Transcender eternamente"
          },
          {
            name: "Magia do Nada",
            level: 45,
            damage: 0,
            cooldown: 1800,
            description: "Poder do vazio"
          },
          {
            name: "Cria\xE7\xE3o do Imposs\xEDvel",
            level: 46,
            damage: 250,
            cooldown: 1500,
            description: "Criar imposs\xEDvel"
          },
          {
            name: "Destrui\xE7\xE3o do Imposs\xEDvel",
            level: 47,
            damage: 255,
            cooldown: 1500,
            description: "Destruir imposs\xEDvel"
          },
          {
            name: "Controle do Imposs\xEDvel",
            level: 48,
            damage: 260,
            cooldown: 1500,
            description: "Controlar imposs\xEDvel"
          },
          {
            name: "Transcend\xEAncia do Imposs\xEDvel",
            level: 49,
            damage: 265,
            cooldown: 1800,
            description: "Transcender imposs\xEDvel"
          },
          {
            name: "Magia Absoluta",
            level: 50,
            damage: 270,
            cooldown: 1800,
            description: "Poder absoluto final"
          }
        ]
      },
      arqueiro_estelar: {
        // Níveis 1-5: Habilidades Básicas
        1: [
          {
            name: "Flecha Precisa",
            level: 1,
            damage: 25,
            cooldown: 30,
            description: "Tiro certeiro"
          },
          {
            name: "Chuva de Flechas",
            level: 2,
            damage: 35,
            cooldown: 45,
            description: "M\xFAltiplos tiros"
          },
          {
            name: "Flecha Explosiva",
            level: 3,
            damage: 40,
            cooldown: 60,
            description: "Flecha que explode"
          },
          {
            name: "Tiro Penetrante",
            level: 4,
            damage: 45,
            cooldown: 60,
            description: "Atravessa armaduras"
          },
          {
            name: "Flecha de Fogo",
            level: 5,
            damage: 50,
            cooldown: 60,
            description: "Flecha flamejante"
          }
        ],
        // Níveis 6-10: Habilidades Intermediárias
        6: [
          {
            name: "Flecha de Gelo",
            level: 6,
            damage: 55,
            cooldown: 60,
            description: "Flecha congelante"
          },
          {
            name: "Tiro Triplo",
            level: 7,
            damage: 60,
            cooldown: 90,
            description: "Tr\xEAs flechas simult\xE2neas"
          },
          {
            name: "Flecha El\xE9trica",
            level: 8,
            damage: 65,
            cooldown: 75,
            description: "Flecha el\xE9trica"
          },
          {
            name: "Tiro Curvado",
            level: 9,
            damage: 70,
            cooldown: 90,
            description: "Flecha que curva"
          },
          {
            name: "Flecha C\xF3smica",
            level: 10,
            damage: 75,
            cooldown: 90,
            description: "Poder estelar"
          }
        ],
        // Níveis 11-20: Habilidades Avançadas
        11: [
          {
            name: "Flecha Dimensional",
            level: 11,
            damage: 80,
            cooldown: 90,
            description: "Atravessa dimens\xF5es"
          },
          {
            name: "Tiro Infinito",
            level: 12,
            damage: 85,
            cooldown: 90,
            description: "Flecha infinita"
          },
          {
            name: "Flecha do Tempo",
            level: 13,
            damage: 90,
            cooldown: 120,
            description: "Manipula tempo"
          },
          {
            name: "Tiro Estelar",
            level: 14,
            damage: 95,
            cooldown: 120,
            description: "Poder das estrelas"
          },
          {
            name: "Flecha Gal\xE1ctica",
            level: 15,
            damage: 100,
            cooldown: 90,
            description: "Poder gal\xE1ctico"
          },
          {
            name: "Tiro Qu\xE2ntico",
            level: 16,
            damage: 105,
            cooldown: 90,
            description: "Flecha qu\xE2ntica"
          },
          {
            name: "Flecha do Vazio",
            level: 17,
            damage: 110,
            cooldown: 150,
            description: "Poder do vazio"
          },
          {
            name: "Tiro Universal",
            level: 18,
            damage: 115,
            cooldown: 150,
            description: "Poder universal"
          },
          {
            name: "Flecha Primordial",
            level: 19,
            damage: 120,
            cooldown: 150,
            description: "Poder primordial"
          },
          {
            name: "Tiro Divino",
            level: 20,
            damage: 125,
            cooldown: 150,
            description: "Poder divino"
          }
        ],
        // Níveis 21-30: Habilidades Épicas
        21: [
          {
            name: "Flecha da Cria\xE7\xE3o",
            level: 21,
            damage: 130,
            cooldown: 180,
            description: "Criar com flecha"
          },
          {
            name: "Tiro da Destrui\xE7\xE3o",
            level: 22,
            damage: 135,
            cooldown: 180,
            description: "Destruir com tiro"
          },
          {
            name: "Flecha do Infinito",
            level: 23,
            damage: 140,
            cooldown: 200,
            description: "Poder infinito"
          },
          {
            name: "Tiro Transcendente",
            level: 24,
            damage: 145,
            cooldown: 200,
            description: "Transcender com tiro"
          },
          {
            name: "Flecha Absoluta",
            level: 25,
            damage: 0,
            cooldown: 300,
            description: "Poder absoluto"
          },
          {
            name: "Tiro da Realidade",
            level: 26,
            damage: 0,
            cooldown: 600,
            description: "Manipular realidade"
          },
          {
            name: "Flecha do Destino",
            level: 27,
            damage: 150,
            cooldown: 240,
            description: "Controlar destino"
          },
          {
            name: "Tiro C\xF3smico",
            level: 28,
            damage: 155,
            cooldown: 240,
            description: "Poder c\xF3smico"
          },
          {
            name: "Flecha Eterna",
            level: 29,
            damage: 160,
            cooldown: 240,
            description: "Poder eterno"
          },
          {
            name: "Tiro Imposs\xEDvel",
            level: 30,
            damage: 165,
            cooldown: 240,
            description: "Fazer imposs\xEDvel"
          }
        ],
        // Níveis 31-40: Habilidades Lendárias
        31: [
          {
            name: "Flecha Multiversal",
            level: 31,
            damage: 170,
            cooldown: 300,
            description: "Atravessar multiversos"
          },
          {
            name: "Tiro da Exist\xEAncia",
            level: 32,
            damage: 175,
            cooldown: 300,
            description: "Controlar exist\xEAncia"
          },
          {
            name: "Flecha do Nada",
            level: 33,
            damage: 180,
            cooldown: 300,
            description: "Poder do vazio"
          },
          {
            name: "Tiro Transcendental",
            level: 34,
            damage: 185,
            cooldown: 300,
            description: "Transcender tudo"
          },
          {
            name: "Flecha Primordial",
            level: 35,
            damage: 0,
            cooldown: 600,
            description: "Poder das origens"
          },
          {
            name: "Tiro da Divindade",
            level: 36,
            damage: 0,
            cooldown: 600,
            description: "Poder divino"
          },
          {
            name: "Flecha da Eternidade",
            level: 37,
            damage: 190,
            cooldown: 360,
            description: "Poder eterno"
          },
          {
            name: "Tiro do Infinito",
            level: 38,
            damage: 195,
            cooldown: 360,
            description: "Poder infinito"
          },
          {
            name: "Flecha Absoluta",
            level: 39,
            damage: 200,
            cooldown: 360,
            description: "Poder absoluto"
          },
          {
            name: "Tiro Final",
            level: 40,
            damage: 205,
            cooldown: 360,
            description: "\xDAltimo tiro"
          }
        ],
        // Níveis 41-50: Habilidades Míticas
        41: [
          {
            name: "Flecha da Cria\xE7\xE3o Final",
            level: 41,
            damage: 210,
            cooldown: 420,
            description: "Criar tudo"
          },
          {
            name: "Tiro da Destrui\xE7\xE3o Final",
            level: 42,
            damage: 215,
            cooldown: 420,
            description: "Destruir tudo"
          },
          {
            name: "Flecha do Controle Final",
            level: 43,
            damage: 220,
            cooldown: 420,
            description: "Controlar tudo"
          },
          {
            name: "Tiro da Transcend\xEAncia Final",
            level: 44,
            damage: 225,
            cooldown: 420,
            description: "Transcender tudo"
          },
          {
            name: "Flecha do Imposs\xEDvel",
            level: 45,
            damage: 0,
            cooldown: 900,
            description: "Fazer imposs\xEDvel"
          },
          {
            name: "Tiro da Realidade Final",
            level: 46,
            damage: 230,
            cooldown: 480,
            description: "Controlar realidade"
          },
          {
            name: "Flecha do Destino Final",
            level: 47,
            damage: 235,
            cooldown: 480,
            description: "Controlar destino"
          },
          {
            name: "Tiro da Exist\xEAncia Final",
            level: 48,
            damage: 240,
            cooldown: 480,
            description: "Controlar exist\xEAncia"
          },
          {
            name: "Flecha da Eternidade Final",
            level: 49,
            damage: 245,
            cooldown: 480,
            description: "Controlar eternidade"
          },
          {
            name: "Tiro Perfeito",
            level: 50,
            damage: 250,
            cooldown: 480,
            description: "Tiro perfeito"
          }
        ]
      },
      clerigo_divino: {
        // Níveis 1-5: Habilidades Básicas
        1: [
          {
            name: "Cura Menor",
            level: 1,
            damage: 0,
            cooldown: 30,
            description: "Cura b\xE1sica"
          },
          {
            name: "B\xEAn\xE7\xE3o Divina",
            level: 2,
            damage: 0,
            cooldown: 45,
            description: "B\xEAn\xE7\xE3o protetora"
          },
          {
            name: "Raio Sagrado",
            level: 3,
            damage: 40,
            cooldown: 60,
            description: "Ataque sagrado"
          },
          {
            name: "Escudo Divino",
            level: 4,
            damage: 0,
            cooldown: 60,
            description: "Prote\xE7\xE3o divina"
          },
          {
            name: "Cura Maior",
            level: 5,
            damage: 0,
            cooldown: 60,
            description: "Cura avan\xE7ada"
          }
        ],
        // Níveis 6-10: Habilidades Intermediárias
        6: [
          {
            name: "Purifica\xE7\xE3o",
            level: 6,
            damage: 0,
            cooldown: 60,
            description: "Limpar maldi\xE7\xF5es"
          },
          {
            name: "Invoca\xE7\xE3o Angelical",
            level: 7,
            damage: 60,
            cooldown: 90,
            description: "Chamar anjo"
          },
          {
            name: "Ressurrei\xE7\xE3o",
            level: 8,
            damage: 0,
            cooldown: 120,
            description: "Reviver aliado"
          },
          {
            name: "Julgamento Divino",
            level: 9,
            damage: 70,
            cooldown: 90,
            description: "Julgamento sagrado"
          },
          {
            name: "Cura em Massa",
            level: 10,
            damage: 0,
            cooldown: 90,
            description: "Curar todos"
          }
        ],
        // Níveis 11-20: Habilidades Avançadas
        11: [
          {
            name: "Prote\xE7\xE3o Celestial",
            level: 11,
            damage: 0,
            cooldown: 90,
            description: "Prote\xE7\xE3o dos c\xE9us"
          },
          {
            name: "Invoca\xE7\xE3o Divina",
            level: 12,
            damage: 80,
            cooldown: 90,
            description: "Chamar divindade"
          },
          {
            name: "Cura Milagrosa",
            level: 13,
            damage: 0,
            cooldown: 120,
            description: "Cura milagrosa"
          },
          {
            name: "Exorcismo",
            level: 14,
            damage: 90,
            cooldown: 120,
            description: "Expulsar dem\xF4nios"
          },
          {
            name: "B\xEAn\xE7\xE3o Eterna",
            level: 15,
            damage: 0,
            cooldown: 90,
            description: "B\xEAn\xE7\xE3o permanente"
          },
          {
            name: "Invoca\xE7\xE3o Arcanjo",
            level: 16,
            damage: 100,
            cooldown: 90,
            description: "Chamar arcanjo"
          },
          {
            name: "Cura Divina",
            level: 17,
            damage: 0,
            cooldown: 150,
            description: "Cura divina"
          },
          {
            name: "Julgamento Final",
            level: 18,
            damage: 110,
            cooldown: 150,
            description: "\xDAltimo julgamento"
          },
          {
            name: "Prote\xE7\xE3o Divina",
            level: 19,
            damage: 0,
            cooldown: 150,
            description: "Prote\xE7\xE3o divina"
          },
          {
            name: "Invoca\xE7\xE3o Suprema",
            level: 20,
            damage: 120,
            cooldown: 150,
            description: "Chamar supremo"
          }
        ],
        // Níveis 21-30: Habilidades Épicas
        21: [
          {
            name: "Cria\xE7\xE3o Divina",
            level: 21,
            damage: 130,
            cooldown: 180,
            description: "Criar divinamente"
          },
          {
            name: "Destrui\xE7\xE3o Sagrada",
            level: 22,
            damage: 135,
            cooldown: 180,
            description: "Destruir sagradamente"
          },
          {
            name: "Transcend\xEAncia Divina",
            level: 23,
            damage: 0,
            cooldown: 200,
            description: "Transcender divinamente"
          },
          {
            name: "Invoca\xE7\xE3o Primordial",
            level: 24,
            damage: 140,
            cooldown: 200,
            description: "Chamar primordial"
          },
          {
            name: "Poder Absoluto",
            level: 25,
            damage: 0,
            cooldown: 300,
            description: "Poder absoluto"
          },
          {
            name: "Cria\xE7\xE3o de Vida",
            level: 26,
            damage: 0,
            cooldown: 600,
            description: "Criar vida"
          },
          {
            name: "Destrui\xE7\xE3o de Morte",
            level: 27,
            damage: 145,
            cooldown: 240,
            description: "Destruir morte"
          },
          {
            name: "Transcend\xEAncia Eterna",
            level: 28,
            damage: 150,
            cooldown: 240,
            description: "Transcender eternamente"
          },
          {
            name: "Invoca\xE7\xE3o Infinita",
            level: 29,
            damage: 155,
            cooldown: 240,
            description: "Chamar infinitamente"
          },
          {
            name: "Poder Divino Final",
            level: 30,
            damage: 160,
            cooldown: 240,
            description: "Poder divino final"
          }
        ],
        // Níveis 31-40: Habilidades Lendárias
        31: [
          {
            name: "Cria\xE7\xE3o Universal",
            level: 31,
            damage: 165,
            cooldown: 300,
            description: "Criar universo"
          },
          {
            name: "Destrui\xE7\xE3o Universal",
            level: 32,
            damage: 170,
            cooldown: 300,
            description: "Destruir universo"
          },
          {
            name: "Transcend\xEAncia Universal",
            level: 33,
            damage: 175,
            cooldown: 300,
            description: "Transcender universo"
          },
          {
            name: "Invoca\xE7\xE3o Universal",
            level: 34,
            damage: 180,
            cooldown: 300,
            description: "Chamar universalmente"
          },
          {
            name: "Poder Primordial",
            level: 35,
            damage: 0,
            cooldown: 600,
            description: "Poder primordial"
          },
          {
            name: "Cria\xE7\xE3o de Deuses",
            level: 36,
            damage: 0,
            cooldown: 600,
            description: "Criar deuses"
          },
          {
            name: "Destrui\xE7\xE3o de Deuses",
            level: 37,
            damage: 185,
            cooldown: 360,
            description: "Destruir deuses"
          },
          {
            name: "Transcend\xEAncia de Deuses",
            level: 38,
            damage: 190,
            cooldown: 360,
            description: "Transcender deuses"
          },
          {
            name: "Invoca\xE7\xE3o de Deuses",
            level: 39,
            damage: 195,
            cooldown: 360,
            description: "Chamar deuses"
          },
          {
            name: "Poder Supremo",
            level: 40,
            damage: 200,
            cooldown: 360,
            description: "Poder supremo"
          }
        ],
        // Níveis 41-50: Habilidades Míticas
        41: [
          {
            name: "Cria\xE7\xE3o Absoluta",
            level: 41,
            damage: 205,
            cooldown: 420,
            description: "Criar absolutamente"
          },
          {
            name: "Destrui\xE7\xE3o Absoluta",
            level: 42,
            damage: 210,
            cooldown: 420,
            description: "Destruir absolutamente"
          },
          {
            name: "Transcend\xEAncia Absoluta",
            level: 43,
            damage: 215,
            cooldown: 420,
            description: "Transcender absolutamente"
          },
          {
            name: "Invoca\xE7\xE3o Absoluta",
            level: 44,
            damage: 220,
            cooldown: 420,
            description: "Chamar absolutamente"
          },
          {
            name: "Poder do Imposs\xEDvel",
            level: 45,
            damage: 0,
            cooldown: 900,
            description: "Poder imposs\xEDvel"
          },
          {
            name: "Cria\xE7\xE3o do Imposs\xEDvel",
            level: 46,
            damage: 225,
            cooldown: 480,
            description: "Criar imposs\xEDvel"
          },
          {
            name: "Destrui\xE7\xE3o do Imposs\xEDvel",
            level: 47,
            damage: 230,
            cooldown: 480,
            description: "Destruir imposs\xEDvel"
          },
          {
            name: "Transcend\xEAncia do Imposs\xEDvel",
            level: 48,
            damage: 235,
            cooldown: 480,
            description: "Transcender imposs\xEDvel"
          },
          {
            name: "Invoca\xE7\xE3o do Imposs\xEDvel",
            level: 49,
            damage: 240,
            cooldown: 480,
            description: "Chamar imposs\xEDvel"
          },
          {
            name: "Poder Divino Absoluto",
            level: 50,
            damage: 245,
            cooldown: 480,
            description: "Poder divino absoluto"
          }
        ]
      },
      assassino_sombrio: {
        // Níveis 1-5: Habilidades Básicas
        1: [
          {
            name: "Ataque Furtivo",
            level: 1,
            damage: 35,
            cooldown: 30,
            description: "Ataque sorrateiro"
          },
          {
            name: "Veneno Letal",
            level: 2,
            damage: 25,
            cooldown: 45,
            description: "Envenenar inimigo"
          },
          {
            name: "Invisibilidade",
            level: 3,
            damage: 0,
            cooldown: 60,
            description: "Ficar invis\xEDvel"
          },
          {
            name: "Ataque Cr\xEDtico",
            level: 4,
            damage: 50,
            cooldown: 60,
            description: "Golpe cr\xEDtico"
          },
          {
            name: "Sombra Mortal",
            level: 5,
            damage: 45,
            cooldown: 60,
            description: "Ataque das sombras"
          }
        ],
        // Níveis 6-10: Habilidades Intermediárias
        6: [
          {
            name: "Teleporte Sombrio",
            level: 6,
            damage: 0,
            cooldown: 60,
            description: "Teleporte sombrio"
          },
          {
            name: "Veneno Mortal",
            level: 7,
            damage: 30,
            cooldown: 90,
            description: "Veneno mortal"
          },
          {
            name: "Ataque Duplo",
            level: 8,
            damage: 60,
            cooldown: 75,
            description: "Dois ataques"
          },
          {
            name: "Sombra Assassina",
            level: 9,
            damage: 70,
            cooldown: 90,
            description: "Sombra letal"
          },
          {
            name: "Invisibilidade Total",
            level: 10,
            damage: 0,
            cooldown: 90,
            description: "Invisibilidade completa"
          }
        ],
        // Níveis 11-20: Habilidades Avançadas
        11: [
          {
            name: "Ataque Triplo",
            level: 11,
            damage: 80,
            cooldown: 90,
            description: "Tr\xEAs ataques"
          },
          {
            name: "Veneno C\xF3smico",
            level: 12,
            damage: 40,
            cooldown: 90,
            description: "Veneno c\xF3smico"
          },
          {
            name: "Sombra Dimensional",
            level: 13,
            damage: 90,
            cooldown: 120,
            description: "Sombra dimensional"
          },
          {
            name: "Ataque Qu\xE2ntico",
            level: 14,
            damage: 95,
            cooldown: 120,
            description: "Ataque qu\xE2ntico"
          },
          {
            name: "Invisibilidade C\xF3smica",
            level: 15,
            damage: 0,
            cooldown: 90,
            description: "Invisibilidade c\xF3smica"
          },
          {
            name: "Ataque Infinito",
            level: 16,
            damage: 100,
            cooldown: 90,
            description: "Ataque infinito"
          },
          {
            name: "Veneno Primordial",
            level: 17,
            damage: 50,
            cooldown: 150,
            description: "Veneno primordial"
          },
          {
            name: "Sombra Universal",
            level: 18,
            damage: 110,
            cooldown: 150,
            description: "Sombra universal"
          },
          {
            name: "Ataque Transcendente",
            level: 19,
            damage: 115,
            cooldown: 150,
            description: "Ataque transcendente"
          },
          {
            name: "Invisibilidade Absoluta",
            level: 20,
            damage: 0,
            cooldown: 150,
            description: "Invisibilidade absoluta"
          }
        ],
        // Níveis 21-30: Habilidades Épicas
        21: [
          {
            name: "Ataque da Morte",
            level: 21,
            damage: 120,
            cooldown: 180,
            description: "Ataque da morte"
          },
          {
            name: "Veneno da Eternidade",
            level: 22,
            damage: 60,
            cooldown: 180,
            description: "Veneno eterno"
          },
          {
            name: "Sombra da Destrui\xE7\xE3o",
            level: 23,
            damage: 125,
            cooldown: 200,
            description: "Sombra destrutiva"
          },
          {
            name: "Ataque do Vazio",
            level: 24,
            damage: 130,
            cooldown: 200,
            description: "Ataque do vazio"
          },
          {
            name: "Invisibilidade Eterna",
            level: 25,
            damage: 0,
            cooldown: 300,
            description: "Invisibilidade eterna"
          },
          {
            name: "Ataque da Realidade",
            level: 26,
            damage: 0,
            cooldown: 600,
            description: "Ataque da realidade"
          },
          {
            name: "Veneno do Destino",
            level: 27,
            damage: 70,
            cooldown: 240,
            description: "Veneno do destino"
          },
          {
            name: "Sombra C\xF3smica",
            level: 28,
            damage: 135,
            cooldown: 240,
            description: "Sombra c\xF3smica"
          },
          {
            name: "Ataque Primordial",
            level: 29,
            damage: 140,
            cooldown: 240,
            description: "Ataque primordial"
          },
          {
            name: "Invisibilidade Divina",
            level: 30,
            damage: 0,
            cooldown: 240,
            description: "Invisibilidade divina"
          }
        ],
        // Níveis 31-40: Habilidades Lendárias
        31: [
          {
            name: "Ataque Universal",
            level: 31,
            damage: 145,
            cooldown: 300,
            description: "Ataque universal"
          },
          {
            name: "Veneno Universal",
            level: 32,
            damage: 80,
            cooldown: 300,
            description: "Veneno universal"
          },
          {
            name: "Sombra Universal",
            level: 33,
            damage: 150,
            cooldown: 300,
            description: "Sombra universal"
          },
          {
            name: "Ataque Transcendental",
            level: 34,
            damage: 155,
            cooldown: 300,
            description: "Ataque transcendental"
          },
          {
            name: "Invisibilidade Primordial",
            level: 35,
            damage: 0,
            cooldown: 600,
            description: "Invisibilidade primordial"
          },
          {
            name: "Ataque Divino",
            level: 36,
            damage: 0,
            cooldown: 600,
            description: "Ataque divino"
          },
          {
            name: "Veneno da Eternidade",
            level: 37,
            damage: 90,
            cooldown: 360,
            description: "Veneno eterno"
          },
          {
            name: "Sombra da Eternidade",
            level: 38,
            damage: 160,
            cooldown: 360,
            description: "Sombra eterna"
          },
          {
            name: "Ataque da Eternidade",
            level: 39,
            damage: 165,
            cooldown: 360,
            description: "Ataque eterno"
          },
          {
            name: "Invisibilidade Suprema",
            level: 40,
            damage: 0,
            cooldown: 360,
            description: "Invisibilidade suprema"
          }
        ],
        // Níveis 41-50: Habilidades Míticas
        41: [
          {
            name: "Ataque Absoluto",
            level: 41,
            damage: 170,
            cooldown: 420,
            description: "Ataque absoluto"
          },
          {
            name: "Veneno Absoluto",
            level: 42,
            damage: 100,
            cooldown: 420,
            description: "Veneno absoluto"
          },
          {
            name: "Sombra Absoluta",
            level: 43,
            damage: 175,
            cooldown: 420,
            description: "Sombra absoluta"
          },
          {
            name: "Ataque do Imposs\xEDvel",
            level: 44,
            damage: 180,
            cooldown: 420,
            description: "Ataque imposs\xEDvel"
          },
          {
            name: "Invisibilidade Imposs\xEDvel",
            level: 45,
            damage: 0,
            cooldown: 900,
            description: "Invisibilidade imposs\xEDvel"
          },
          {
            name: "Ataque da Realidade Final",
            level: 46,
            damage: 185,
            cooldown: 480,
            description: "Ataque da realidade"
          },
          {
            name: "Veneno da Realidade Final",
            level: 47,
            damage: 110,
            cooldown: 480,
            description: "Veneno da realidade"
          },
          {
            name: "Sombra da Realidade Final",
            level: 48,
            damage: 190,
            cooldown: 480,
            description: "Sombra da realidade"
          },
          {
            name: "Ataque da Eternidade Final",
            level: 49,
            damage: 195,
            cooldown: 480,
            description: "Ataque da eternidade"
          },
          {
            name: "Assassinato Perfeito",
            level: 50,
            damage: 200,
            cooldown: 480,
            description: "Assassinato perfeito"
          }
        ]
      },
      paladino_cosmico: {
        // Níveis 1-5: Habilidades Básicas
        1: [
          {
            name: "Golpe Sagrado",
            level: 1,
            damage: 30,
            cooldown: 30,
            description: "Ataque sagrado"
          },
          {
            name: "Cura Divina",
            level: 2,
            damage: 0,
            cooldown: 45,
            description: "Cura divina"
          },
          {
            name: "Escudo Celestial",
            level: 3,
            damage: 0,
            cooldown: 60,
            description: "Prote\xE7\xE3o celestial"
          },
          {
            name: "B\xEAn\xE7\xE3o de For\xE7a",
            level: 4,
            damage: 0,
            cooldown: 60,
            description: "Aumentar for\xE7a"
          },
          {
            name: "Julgamento",
            level: 5,
            damage: 50,
            cooldown: 60,
            description: "Julgamento divino"
          }
        ],
        // Níveis 6-10: Habilidades Intermediárias
        6: [
          {
            name: "Invoca\xE7\xE3o Angelical",
            level: 6,
            damage: 60,
            cooldown: 60,
            description: "Chamar anjo"
          },
          {
            name: "Cura em Massa",
            level: 7,
            damage: 0,
            cooldown: 90,
            description: "Curar todos"
          },
          {
            name: "Prote\xE7\xE3o Divina",
            level: 8,
            damage: 0,
            cooldown: 120,
            description: "Prote\xE7\xE3o divina"
          },
          {
            name: "Golpe Celestial",
            level: 9,
            damage: 70,
            cooldown: 90,
            description: "Ataque celestial"
          },
          {
            name: "B\xEAn\xE7\xE3o Eterna",
            level: 10,
            damage: 0,
            cooldown: 90,
            description: "B\xEAn\xE7\xE3o permanente"
          }
        ],
        // Níveis 11-20: Habilidades Avançadas
        11: [
          {
            name: "Invoca\xE7\xE3o Arcanjo",
            level: 11,
            damage: 80,
            cooldown: 90,
            description: "Chamar arcanjo"
          },
          {
            name: "Cura Milagrosa",
            level: 12,
            damage: 0,
            cooldown: 90,
            description: "Cura milagrosa"
          },
          {
            name: "Escudo C\xF3smico",
            level: 13,
            damage: 0,
            cooldown: 120,
            description: "Prote\xE7\xE3o c\xF3smica"
          },
          {
            name: "Golpe C\xF3smico",
            level: 14,
            damage: 90,
            cooldown: 120,
            description: "Ataque c\xF3smico"
          },
          {
            name: "B\xEAn\xE7\xE3o C\xF3smica",
            level: 15,
            damage: 0,
            cooldown: 90,
            description: "B\xEAn\xE7\xE3o c\xF3smica"
          },
          {
            name: "Invoca\xE7\xE3o Divina",
            level: 16,
            damage: 100,
            cooldown: 90,
            description: "Chamar divindade"
          },
          {
            name: "Cura Universal",
            level: 17,
            damage: 0,
            cooldown: 150,
            description: "Cura universal"
          },
          {
            name: "Prote\xE7\xE3o Universal",
            level: 18,
            damage: 0,
            cooldown: 150,
            description: "Prote\xE7\xE3o universal"
          },
          {
            name: "Golpe Universal",
            level: 19,
            damage: 110,
            cooldown: 150,
            description: "Ataque universal"
          },
          {
            name: "B\xEAn\xE7\xE3o Universal",
            level: 20,
            damage: 0,
            cooldown: 150,
            description: "B\xEAn\xE7\xE3o universal"
          }
        ],
        // Níveis 21-30: Habilidades Épicas
        21: [
          {
            name: "Invoca\xE7\xE3o Primordial",
            level: 21,
            damage: 120,
            cooldown: 180,
            description: "Chamar primordial"
          },
          {
            name: "Cura Primordial",
            level: 22,
            damage: 0,
            cooldown: 180,
            description: "Cura primordial"
          },
          {
            name: "Escudo Primordial",
            level: 23,
            damage: 0,
            cooldown: 200,
            description: "Prote\xE7\xE3o primordial"
          },
          {
            name: "Golpe Primordial",
            level: 24,
            damage: 130,
            cooldown: 200,
            description: "Ataque primordial"
          },
          {
            name: "B\xEAn\xE7\xE3o Primordial",
            level: 25,
            damage: 0,
            cooldown: 300,
            description: "B\xEAn\xE7\xE3o primordial"
          },
          {
            name: "Invoca\xE7\xE3o Absoluta",
            level: 26,
            damage: 0,
            cooldown: 600,
            description: "Chamar absolutamente"
          },
          {
            name: "Cura Absoluta",
            level: 27,
            damage: 0,
            cooldown: 240,
            description: "Cura absoluta"
          },
          {
            name: "Prote\xE7\xE3o Absoluta",
            level: 28,
            damage: 0,
            cooldown: 240,
            description: "Prote\xE7\xE3o absoluta"
          },
          {
            name: "Golpe Absoluto",
            level: 29,
            damage: 140,
            cooldown: 240,
            description: "Ataque absoluto"
          },
          {
            name: "B\xEAn\xE7\xE3o Absoluta",
            level: 30,
            damage: 0,
            cooldown: 240,
            description: "B\xEAn\xE7\xE3o absoluta"
          }
        ],
        // Níveis 31-40: Habilidades Lendárias
        31: [
          {
            name: "Invoca\xE7\xE3o Universal",
            level: 31,
            damage: 150,
            cooldown: 300,
            description: "Chamar universalmente"
          },
          {
            name: "Cura Universal",
            level: 32,
            damage: 0,
            cooldown: 300,
            description: "Cura universal"
          },
          {
            name: "Prote\xE7\xE3o Universal",
            level: 33,
            damage: 0,
            cooldown: 300,
            description: "Prote\xE7\xE3o universal"
          },
          {
            name: "Golpe Universal",
            level: 34,
            damage: 160,
            cooldown: 300,
            description: "Ataque universal"
          },
          {
            name: "B\xEAn\xE7\xE3o Universal",
            level: 35,
            damage: 0,
            cooldown: 600,
            description: "B\xEAn\xE7\xE3o universal"
          },
          {
            name: "Invoca\xE7\xE3o de Deuses",
            level: 36,
            damage: 0,
            cooldown: 600,
            description: "Chamar deuses"
          },
          {
            name: "Cura de Deuses",
            level: 37,
            damage: 0,
            cooldown: 360,
            description: "Cura de deuses"
          },
          {
            name: "Prote\xE7\xE3o de Deuses",
            level: 38,
            damage: 0,
            cooldown: 360,
            description: "Prote\xE7\xE3o de deuses"
          },
          {
            name: "Golpe de Deuses",
            level: 39,
            damage: 170,
            cooldown: 360,
            description: "Ataque de deuses"
          },
          {
            name: "B\xEAn\xE7\xE3o de Deuses",
            level: 40,
            damage: 0,
            cooldown: 360,
            description: "B\xEAn\xE7\xE3o de deuses"
          }
        ],
        // Níveis 41-50: Habilidades Míticas
        41: [
          {
            name: "Invoca\xE7\xE3o Absoluta",
            level: 41,
            damage: 180,
            cooldown: 420,
            description: "Chamar absolutamente"
          },
          {
            name: "Cura Absoluta",
            level: 42,
            damage: 0,
            cooldown: 420,
            description: "Cura absoluta"
          },
          {
            name: "Prote\xE7\xE3o Absoluta",
            level: 43,
            damage: 0,
            cooldown: 420,
            description: "Prote\xE7\xE3o absoluta"
          },
          {
            name: "Golpe Absoluto",
            level: 44,
            damage: 190,
            cooldown: 420,
            description: "Ataque absoluto"
          },
          {
            name: "B\xEAn\xE7\xE3o Absoluta",
            level: 45,
            damage: 0,
            cooldown: 900,
            description: "B\xEAn\xE7\xE3o absoluta"
          },
          {
            name: "Invoca\xE7\xE3o do Imposs\xEDvel",
            level: 46,
            damage: 200,
            cooldown: 480,
            description: "Chamar imposs\xEDvel"
          },
          {
            name: "Cura do Imposs\xEDvel",
            level: 47,
            damage: 0,
            cooldown: 480,
            description: "Cura imposs\xEDvel"
          },
          {
            name: "Prote\xE7\xE3o do Imposs\xEDvel",
            level: 48,
            damage: 0,
            cooldown: 480,
            description: "Prote\xE7\xE3o imposs\xEDvel"
          },
          {
            name: "Golpe do Imposs\xEDvel",
            level: 49,
            damage: 210,
            cooldown: 480,
            description: "Ataque imposs\xEDvel"
          },
          {
            name: "Paladino Perfeito",
            level: 50,
            damage: 220,
            cooldown: 480,
            description: "Paladino perfeito"
          }
        ]
      }
    };
    const calculateCooldown = (level) => {
      return Math.max(1, Math.round(level / 50 * 30));
    };
    const getXpForLevel = (level) => {
      return level * 100;
    };
    const availableSkills = [];
    const classSkills = skillsByClass[characterClass];
    const maxLevel = Math.min(characterLevel + 5, 50);
    for (let level = 1; level <= maxLevel; level++) {
      if (classSkills[level]) {
        const skillsAtLevel = classSkills[level];
        skillsAtLevel.forEach((skill) => {
          availableSkills.push({
            ...skill,
            level_required: skill.level,
            cost: skill.level * 100,
            // 100 ouro por nível
            cooldown_seconds: calculateCooldown(skill.level),
            xp_required: getXpForLevel(skill.level),
            can_learn: characterLevel >= skill.level,
            description: skill.description
          });
        });
      }
    }
    const response = {
      success: true,
      data: availableSkills
    };
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro interno do servidor"
    });
  }
});

export { available_get as default };
//# sourceMappingURL=available.get.mjs.map
