import { d as defineEventHandler, e as getQuery, c as createError } from '../../../nitro/nitro.mjs';
import { d as db } from '../../../_/databaseAdapter.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@vercel/postgres';

const available_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const characterLevel = parseInt(query.level) || 1;
    const characterId = parseInt(query.characterId) || 1;
    const characterClass = query.class || "ninja";
    const getClassSpecificUpgrades = (level, characterClass2) => {
      const baseUpgrades = getBaseUpgrades(level);
      const classUpgrades = getClassUpgrades(level, characterClass2);
      return [...baseUpgrades, ...classUpgrades];
    };
    const getBaseUpgrades = (level) => {
      const baseUpgradesByLevel = {
        // NÍVEIS 1-5: Melhorias Básicas
        1: [
          {
            id: 1,
            character_id: 0,
            type: "stat",
            upgrade_type: "stat",
            upgrade_name: "Treinamento de For\xE7a",
            name: "Treinamento de For\xE7a",
            description: "Aumenta permanentemente a for\xE7a do personagem (+5 por n\xEDvel)",
            level: 1,
            max_level: 10,
            cost: { gold: 100, time_seconds: 30 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 2,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Armaz\xE9m de Recursos",
            name: "Armaz\xE9m de Recursos",
            description: "Aumenta a capacidade de armazenamento de recursos (+1000 por n\xEDvel)",
            level: 1,
            max_level: 5,
            cost: { gold: 150, time_seconds: 60 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        2: [
          {
            id: 3,
            character_id: 0,
            type: "stat",
            upgrade_type: "stat",
            upgrade_name: "Treinamento de Agilidade",
            name: "Treinamento de Agilidade",
            description: "Aumenta permanentemente a agilidade do personagem (+3 por n\xEDvel)",
            level: 1,
            max_level: 10,
            cost: { gold: 200, time_seconds: 45 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 4,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Quartel de Treinamento",
            name: "Quartel de Treinamento",
            description: "Reduz o tempo de treinamento de habilidades em 10% por n\xEDvel",
            level: 1,
            max_level: 5,
            cost: { gold: 250, time_seconds: 90 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        3: [
          {
            id: 5,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de Pesquisa",
            name: "Laborat\xF3rio de Pesquisa",
            description: "Permite pesquisar novas tecnologias e melhorias",
            level: 1,
            max_level: 5,
            cost: { gold: 300, time_seconds: 90 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 6,
            character_id: 0,
            type: "stat",
            upgrade_type: "stat",
            upgrade_name: "Treinamento de Resist\xEAncia",
            name: "Treinamento de Resist\xEAncia",
            description: "Aumenta permanentemente a resist\xEAncia do personagem (+4 por n\xEDvel)",
            level: 1,
            max_level: 10,
            cost: { gold: 350, time_seconds: 60 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        4: [
          {
            id: 7,
            character_id: 0,
            type: "stat",
            upgrade_type: "stat",
            upgrade_name: "Treinamento de Defesa",
            name: "Treinamento de Defesa",
            description: "Aumenta permanentemente a defesa do personagem (+6 por n\xEDvel)",
            level: 1,
            max_level: 10,
            cost: { gold: 400, time_seconds: 60 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 8,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Oficina de Equipamentos",
            name: "Oficina de Equipamentos",
            description: "Permite criar e melhorar equipamentos (+1 slot por n\xEDvel)",
            level: 1,
            max_level: 5,
            cost: { gold: 500, time_seconds: 120 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        5: [
          {
            id: 9,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Comando",
            name: "Centro de Comando",
            description: "Aumenta a efici\xEAncia de todas as opera\xE7\xF5es (+5% por n\xEDvel)",
            level: 1,
            max_level: 5,
            cost: { gold: 600, time_seconds: 150 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 10,
            character_id: 0,
            type: "stat",
            upgrade_type: "stat",
            upgrade_name: "Treinamento de Intelig\xEAncia",
            name: "Treinamento de Intelig\xEAncia",
            description: "Aumenta permanentemente a intelig\xEAncia do personagem (+2 por n\xEDvel)",
            level: 1,
            max_level: 10,
            cost: { gold: 700, time_seconds: 75 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        // NÍVEIS 6-10: Melhorias Intermediárias
        6: [
          {
            id: 11,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Campo de Treinamento",
            name: "Campo de Treinamento",
            description: "Aumenta a experi\xEAncia ganha em batalhas (+15% por n\xEDvel)",
            level: 1,
            max_level: 5,
            cost: { gold: 750, time_seconds: 180 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 12,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Mina de Recursos",
            name: "Mina de Recursos",
            description: "Gera recursos automaticamente (+50 ouro/hora por n\xEDvel)",
            level: 1,
            max_level: 5,
            cost: { gold: 800, time_seconds: 200 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        7: [
          {
            id: 13,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "C\xE2mara de Medita\xE7\xE3o",
            name: "C\xE2mara de Medita\xE7\xE3o",
            description: "Regenera energia mais rapidamente (+20% por n\xEDvel)",
            level: 1,
            max_level: 5,
            cost: { gold: 1e3, time_seconds: 240 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 14,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Biblioteca de Conhecimento",
            name: "Biblioteca de Conhecimento",
            description: "Reduz custo de habilidades em 10% por n\xEDvel",
            level: 1,
            max_level: 5,
            cost: { gold: 1200, time_seconds: 300 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        8: [
          {
            id: 15,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Escudo de Energia",
            name: "Escudo de Energia",
            description: "Protege a base de ataques (+1000 HP por n\xEDvel)",
            level: 1,
            max_level: 5,
            cost: { gold: 1250, time_seconds: 300 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 16,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "F\xE1brica de Materiais",
            name: "F\xE1brica de Materiais",
            description: "Produz materiais automaticamente (+10/hora por n\xEDvel)",
            level: 1,
            max_level: 5,
            cost: { gold: 1500, materials: 5, time_seconds: 360 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        9: [
          {
            id: 17,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Pesquisa de Tecnologia",
            name: "Pesquisa de Tecnologia",
            description: "Desbloqueia novas tecnologias e melhorias",
            level: 1,
            max_level: 5,
            cost: { gold: 1500, time_seconds: 360 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 18,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Refinaria de Cristais",
            name: "Refinaria de Cristais",
            description: "Produz cristais automaticamente (+2/hora por n\xEDvel)",
            level: 1,
            max_level: 5,
            cost: { gold: 1800, time_seconds: 420 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        10: [
          {
            id: 19,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Portal de Teletransporte",
            name: "Portal de Teletransporte",
            description: "Permite viagem instant\xE2nea entre locais",
            level: 1,
            max_level: 3,
            cost: { gold: 2e3, time_seconds: 480 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 20,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Torre de Comunica\xE7\xE3o",
            name: "Torre de Comunica\xE7\xE3o",
            description: "Aumenta alcance de habilidades em 25% por n\xEDvel",
            level: 1,
            max_level: 5,
            cost: { gold: 2200, time_seconds: 540 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        // NÍVEIS 11-15: Melhorias Avançadas
        11: [
          {
            id: 21,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Hangar Espacial",
            name: "Hangar Espacial",
            description: "Permite construir naves espaciais",
            level: 1,
            max_level: 3,
            cost: { gold: 3e3, time_seconds: 600 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 22,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Defesa",
            name: "Sistema de Defesa",
            description: "Defende automaticamente contra invas\xF5es",
            level: 1,
            max_level: 5,
            cost: { gold: 3500, time_seconds: 720 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        12: [
          {
            id: 23,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Clonagem",
            name: "Centro de Clonagem",
            description: "Permite criar clones para miss\xF5es paralelas",
            level: 1,
            max_level: 3,
            cost: { gold: 4e3, time_seconds: 900 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 24,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de Gen\xE9tica",
            name: "Laborat\xF3rio de Gen\xE9tica",
            description: "Melhora permanentemente os stats base",
            level: 1,
            max_level: 5,
            cost: { gold: 4500, time_seconds: 1080 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        13: [
          {
            id: 25,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "F\xE1brica de Nanobots",
            name: "F\xE1brica de Nanobots",
            description: "Cria nanobots para reparos autom\xE1ticos",
            level: 1,
            max_level: 5,
            cost: { gold: 5e3, time_seconds: 1200 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 26,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de IA",
            name: "Sistema de IA",
            description: "Automatiza opera\xE7\xF5es da base",
            level: 1,
            max_level: 5,
            cost: { gold: 5500, time_seconds: 1440 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        14: [
          {
            id: 27,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Portal Dimensional",
            name: "Portal Dimensional",
            description: "Acessa dimens\xF5es paralelas",
            level: 1,
            max_level: 3,
            cost: { gold: 6e3, time_seconds: 1800 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 28,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Pesquisa Temporal",
            name: "Centro de Pesquisa Temporal",
            description: "Manipula o tempo para acelerar processos",
            level: 1,
            max_level: 5,
            cost: { gold: 7e3, time_seconds: 2160 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        15: [
          {
            id: 29,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Base Estelar",
            name: "Base Estelar",
            description: "Esta\xE7\xE3o espacial completa com todas as facilidades",
            level: 1,
            max_level: 3,
            cost: { gold: 8e3, time_seconds: 3600 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 30,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Energia Solar",
            name: "Sistema de Energia Solar",
            description: "Gera energia infinita do sol",
            level: 1,
            max_level: 5,
            cost: { gold: 9e3, time_seconds: 4320 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        // NÍVEIS 16-20: Melhorias Épicas
        16: [
          {
            id: 31,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Col\xF4nia Espacial",
            name: "Col\xF4nia Espacial",
            description: "Estabelece uma col\xF4nia em outro planeta",
            level: 1,
            max_level: 3,
            cost: { gold: 1e4, time_seconds: 7200 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 32,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Minera\xE7\xE3o Autom\xE1tica",
            name: "Sistema de Minera\xE7\xE3o Autom\xE1tica",
            description: "Minera recursos automaticamente em asteroides",
            level: 1,
            max_level: 5,
            cost: { gold: 12e3, time_seconds: 8640 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        17: [
          {
            id: 33,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de F\xEDsica Qu\xE2ntica",
            name: "Laborat\xF3rio de F\xEDsica Qu\xE2ntica",
            description: "Desenvolve tecnologias qu\xE2nticas avan\xE7adas",
            level: 1,
            max_level: 5,
            cost: { gold: 15e3, time_seconds: 10800 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 34,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Teletransporte Qu\xE2ntico",
            name: "Sistema de Teletransporte Qu\xE2ntico",
            description: "Teletransporte instant\xE2neo para qualquer lugar",
            level: 1,
            max_level: 3,
            cost: { gold: 18e3, time_seconds: 12960 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        18: [
          {
            id: 35,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "F\xE1brica de Mat\xE9ria",
            name: "F\xE1brica de Mat\xE9ria",
            description: "Cria mat\xE9ria do nada usando energia",
            level: 1,
            max_level: 5,
            cost: { gold: 2e4, time_seconds: 14400 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 36,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Controle Clim\xE1tico",
            name: "Centro de Controle Clim\xE1tico",
            description: "Controla o clima de planetas inteiros",
            level: 1,
            max_level: 5,
            cost: { gold: 25e3, time_seconds: 17280 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        19: [
          {
            id: 37,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Vida Artificial",
            name: "Sistema de Vida Artificial",
            description: "Cria formas de vida sint\xE9ticas",
            level: 1,
            max_level: 5,
            cost: { gold: 3e4, time_seconds: 21600 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 38,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de Manipula\xE7\xE3o Gen\xE9tica",
            name: "Laborat\xF3rio de Manipula\xE7\xE3o Gen\xE9tica",
            description: "Modifica DNA para criar super-humanos",
            level: 1,
            max_level: 5,
            cost: { gold: 35e3, time_seconds: 25920 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        20: [
          {
            id: 39,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Manipulador de Gravidade",
            name: "Manipulador de Gravidade",
            description: "Controla a gravidade em grandes \xE1reas",
            level: 1,
            max_level: 5,
            cost: { gold: 4e4, time_seconds: 28800 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 40,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Energia Escura",
            name: "Sistema de Energia Escura",
            description: "Harvesta energia escura do universo",
            level: 1,
            max_level: 5,
            cost: { gold: 5e4, time_seconds: 34560 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        // NÍVEIS 21-25: Melhorias Lendárias
        21: [
          {
            id: 41,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Portal Interdimensional",
            name: "Portal Interdimensional",
            description: "Acessa dimens\xF5es paralelas e universos alternativos",
            level: 1,
            max_level: 3,
            cost: { gold: 6e4, time_seconds: 43200 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 42,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Manipula\xE7\xE3o Temporal",
            name: "Sistema de Manipula\xE7\xE3o Temporal",
            description: "Controla o fluxo do tempo",
            level: 1,
            max_level: 5,
            cost: { gold: 75e3, time_seconds: 51840 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        22: [
          {
            id: 43,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "F\xE1brica de Estrelas",
            name: "F\xE1brica de Estrelas",
            description: "Cria estrelas artificiais",
            level: 1,
            max_level: 3,
            cost: { gold: 9e4, time_seconds: 60480 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 44,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Controle de Buracos Negros",
            name: "Sistema de Controle de Buracos Negros",
            description: "Manipula buracos negros para energia",
            level: 1,
            max_level: 5,
            cost: { gold: 12e4, time_seconds: 69120 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        23: [
          {
            id: 45,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de F\xEDsica Multidimensional",
            name: "Laborat\xF3rio de F\xEDsica Multidimensional",
            description: "Estuda as leis da f\xEDsica em m\xFAltiplas dimens\xF5es",
            level: 1,
            max_level: 5,
            cost: { gold: 15e4, time_seconds: 77760 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 46,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Cria\xE7\xE3o de Universos",
            name: "Sistema de Cria\xE7\xE3o de Universos",
            description: "Cria universos de bolso",
            level: 1,
            max_level: 3,
            cost: { gold: 18e4, time_seconds: 86400 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        24: [
          {
            id: 47,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Manipula\xE7\xE3o da Realidade",
            name: "Centro de Manipula\xE7\xE3o da Realidade",
            description: "Altera as leis fundamentais da realidade",
            level: 1,
            max_level: 5,
            cost: { gold: 2e5, time_seconds: 95040 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 48,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia",
            name: "Sistema de Transcend\xEAncia",
            description: "Permite transcender limita\xE7\xF5es f\xEDsicas",
            level: 1,
            max_level: 5,
            cost: { gold: 25e4, time_seconds: 103680 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        25: [
          {
            id: 49,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Portal do Multiverso",
            name: "Portal do Multiverso",
            description: "Acessa todos os universos do multiverso",
            level: 1,
            max_level: 3,
            cost: { gold: 3e5, time_seconds: 120960 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 50,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Consci\xEAncia Coletiva",
            name: "Sistema de Consci\xEAncia Coletiva",
            description: "Conecta todas as mentes do universo",
            level: 1,
            max_level: 5,
            cost: { gold: 35e4, time_seconds: 129600 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        // NÍVEIS 26-30: Melhorias Míticas
        26: [
          {
            id: 51,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de F\xEDsica Transcendental",
            name: "Laborat\xF3rio de F\xEDsica Transcendental",
            description: "Estuda f\xEDsica al\xE9m da compreens\xE3o mortal",
            level: 1,
            max_level: 5,
            cost: { gold: 4e5, time_seconds: 138240 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 52,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Manipula\xE7\xE3o de Destino",
            name: "Sistema de Manipula\xE7\xE3o de Destino",
            description: "Altera o destino de seres vivos",
            level: 1,
            max_level: 5,
            cost: { gold: 5e5, time_seconds: 155520 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        27: [
          {
            id: 53,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "F\xE1brica de Deuses",
            name: "F\xE1brica de Deuses",
            description: "Cria entidades divinas artificiais",
            level: 1,
            max_level: 3,
            cost: { gold: 6e5, time_seconds: 172800 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 54,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Controle de Leis Universais",
            name: "Sistema de Controle de Leis Universais",
            description: "Modifica as leis fundamentais do universo",
            level: 1,
            max_level: 5,
            cost: { gold: 75e4, time_seconds: 190080 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        28: [
          {
            id: 55,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Ascens\xE3o Divina",
            name: "Centro de Ascens\xE3o Divina",
            description: "Permite ascender a n\xEDveis divinos",
            level: 1,
            max_level: 5,
            cost: { gold: 9e5, time_seconds: 207360 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 56,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Cria\xE7\xE3o de Realidades",
            name: "Sistema de Cria\xE7\xE3o de Realidades",
            description: "Cria realidades completamente novas",
            level: 1,
            max_level: 5,
            cost: { gold: 12e5, time_seconds: 224640 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        29: [
          {
            id: 57,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de Onisci\xEAncia",
            name: "Laborat\xF3rio de Onisci\xEAncia",
            description: "Alcan\xE7a conhecimento absoluto",
            level: 1,
            max_level: 5,
            cost: { gold: 15e5, time_seconds: 241920 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 58,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Onipot\xEAncia",
            name: "Sistema de Onipot\xEAncia",
            description: "Alcan\xE7a poder absoluto",
            level: 1,
            max_level: 5,
            cost: { gold: 18e5, time_seconds: 259200 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        30: [
          {
            id: 59,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Motor da Realidade",
            name: "Motor da Realidade",
            description: "Controla a pr\xF3pria estrutura da realidade",
            level: 1,
            max_level: 3,
            cost: { gold: 2e6, time_seconds: 276480 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 60,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Onipresen\xE7a",
            name: "Sistema de Onipresen\xE7a",
            description: "Existe em todos os lugares simultaneamente",
            level: 1,
            max_level: 5,
            cost: { gold: 25e5, time_seconds: 293760 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        // NÍVEIS 31-35: Melhorias Transcendentais
        31: [
          {
            id: 61,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Transcend\xEAncia Universal",
            name: "Centro de Transcend\xEAncia Universal",
            description: "Transcende todas as limita\xE7\xF5es universais",
            level: 1,
            max_level: 5,
            cost: { gold: 3e6, time_seconds: 311040 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 62,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Manipula\xE7\xE3o de Conceitos",
            name: "Sistema de Manipula\xE7\xE3o de Conceitos",
            description: "Manipula conceitos abstratos como mat\xE9ria",
            level: 1,
            max_level: 5,
            cost: { gold: 35e5, time_seconds: 328320 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        32: [
          {
            id: 63,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "F\xE1brica de Multiversos",
            name: "F\xE1brica de Multiversos",
            description: "Cria multiversos inteiros",
            level: 1,
            max_level: 3,
            cost: { gold: 4e6, time_seconds: 345600 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 64,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Controle de Narrativa",
            name: "Sistema de Controle de Narrativa",
            description: "Controla a pr\xF3pria narrativa da exist\xEAncia",
            level: 1,
            max_level: 5,
            cost: { gold: 5e6, time_seconds: 362880 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        33: [
          {
            id: 65,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de Metaf\xEDsica",
            name: "Laborat\xF3rio de Metaf\xEDsica",
            description: "Estuda a natureza fundamental da exist\xEAncia",
            level: 1,
            max_level: 5,
            cost: { gold: 6e6, time_seconds: 380160 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 66,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia de Limites",
            name: "Sistema de Transcend\xEAncia de Limites",
            description: "Transcende todos os limites conceb\xEDveis",
            level: 1,
            max_level: 5,
            cost: { gold: 75e5, time_seconds: 397440 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        34: [
          {
            id: 67,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Manipula\xE7\xE3o de Infinito",
            name: "Centro de Manipula\xE7\xE3o de Infinito",
            description: "Manipula o conceito de infinito",
            level: 1,
            max_level: 5,
            cost: { gold: 9e6, time_seconds: 414720 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 68,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Cria\xE7\xE3o de Paradoxos",
            name: "Sistema de Cria\xE7\xE3o de Paradoxos",
            description: "Cria e resolve paradoxos l\xF3gicos",
            level: 1,
            max_level: 5,
            cost: { gold: 12e6, time_seconds: 432e3 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        35: [
          {
            id: 69,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Protocolo de G\xEAnese",
            name: "Protocolo de G\xEAnese",
            description: "Cria a pr\xF3pria exist\xEAncia do zero",
            level: 1,
            max_level: 3,
            cost: { gold: 15e6, time_seconds: 449280 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 70,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia Absoluta",
            name: "Sistema de Transcend\xEAncia Absoluta",
            description: "Transcende a pr\xF3pria transcend\xEAncia",
            level: 1,
            max_level: 5,
            cost: { gold: 18e6, time_seconds: 466560 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        // NÍVEIS 36-40: Melhorias Divinas
        36: [
          {
            id: 71,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Templo da Divindade",
            name: "Templo da Divindade",
            description: "Ascende a n\xEDveis divinos supremos",
            level: 1,
            max_level: 5,
            cost: { gold: 2e7, time_seconds: 483840 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 72,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Manipula\xE7\xE3o de Deuses",
            name: "Sistema de Manipula\xE7\xE3o de Deuses",
            description: "Controla entidades divinas",
            level: 1,
            max_level: 5,
            cost: { gold: 25e6, time_seconds: 501120 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        37: [
          {
            id: 73,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de Cosmologia",
            name: "Laborat\xF3rio de Cosmologia",
            description: "Estuda a estrutura do cosmos",
            level: 1,
            max_level: 5,
            cost: { gold: 3e7, time_seconds: 518400 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 74,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Cria\xE7\xE3o de Deuses",
            name: "Sistema de Cria\xE7\xE3o de Deuses",
            description: "Cria divindades personalizadas",
            level: 1,
            max_level: 5,
            cost: { gold: 35e6, time_seconds: 535680 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        38: [
          {
            id: 75,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Controle de Destino Universal",
            name: "Centro de Controle de Destino Universal",
            description: "Controla o destino de todo o universo",
            level: 1,
            max_level: 5,
            cost: { gold: 4e7, time_seconds: 552960 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 76,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia Divina",
            name: "Sistema de Transcend\xEAncia Divina",
            description: "Transcende a pr\xF3pria divindade",
            level: 1,
            max_level: 5,
            cost: { gold: 5e7, time_seconds: 570240 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        39: [
          {
            id: 77,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "F\xE1brica de Realidades Divinas",
            name: "F\xE1brica de Realidades Divinas",
            description: "Cria realidades governadas por divindades",
            level: 1,
            max_level: 5,
            cost: { gold: 6e7, time_seconds: 587520 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 78,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Onipot\xEAncia Divina",
            name: "Sistema de Onipot\xEAncia Divina",
            description: "Alcan\xE7a poder divino absoluto",
            level: 1,
            max_level: 5,
            cost: { gold: 75e6, time_seconds: 604800 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        40: [
          {
            id: 79,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Dom\xEDnio da Cria\xE7\xE3o",
            name: "Dom\xEDnio da Cria\xE7\xE3o",
            description: "Controla o ato da cria\xE7\xE3o em si",
            level: 1,
            max_level: 3,
            cost: { gold: 9e7, time_seconds: 622080 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 80,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia da Exist\xEAncia",
            name: "Sistema de Transcend\xEAncia da Exist\xEAncia",
            description: "Transcende a pr\xF3pria exist\xEAncia",
            level: 1,
            max_level: 5,
            cost: { gold: 12e7, time_seconds: 639360 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        // NÍVEIS 41-45: Melhorias Supremas
        41: [
          {
            id: 81,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Manipula\xE7\xE3o de Conceitos Absolutos",
            name: "Centro de Manipula\xE7\xE3o de Conceitos Absolutos",
            description: "Manipula conceitos que transcendem a compreens\xE3o",
            level: 1,
            max_level: 5,
            cost: { gold: 15e7, time_seconds: 656640 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 82,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Cria\xE7\xE3o de Infinitos",
            name: "Sistema de Cria\xE7\xE3o de Infinitos",
            description: "Cria infinitos personalizados",
            level: 1,
            max_level: 5,
            cost: { gold: 18e7, time_seconds: 673920 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        42: [
          {
            id: 83,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de Metaf\xEDsica Transcendental",
            name: "Laborat\xF3rio de Metaf\xEDsica Transcendental",
            description: "Estuda metaf\xEDsica al\xE9m da metaf\xEDsica",
            level: 1,
            max_level: 5,
            cost: { gold: 2e8, time_seconds: 691200 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 84,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia de Transcend\xEAncia",
            name: "Sistema de Transcend\xEAncia de Transcend\xEAncia",
            description: "Transcende a pr\xF3pria transcend\xEAncia",
            level: 1,
            max_level: 5,
            cost: { gold: 25e7, time_seconds: 708480 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        43: [
          {
            id: 85,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "F\xE1brica de Paradoxos L\xF3gicos",
            name: "F\xE1brica de Paradoxos L\xF3gicos",
            description: "Cria paradoxos que desafiam a l\xF3gica",
            level: 1,
            max_level: 5,
            cost: { gold: 3e8, time_seconds: 725760 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 86,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Manipula\xE7\xE3o de Impossibilidades",
            name: "Sistema de Manipula\xE7\xE3o de Impossibilidades",
            description: "Torna o imposs\xEDvel poss\xEDvel",
            level: 1,
            max_level: 5,
            cost: { gold: 35e7, time_seconds: 743040 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        44: [
          {
            id: 87,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Controle de Narrativa Universal",
            name: "Centro de Controle de Narrativa Universal",
            description: "Controla a narrativa de toda a exist\xEAncia",
            level: 1,
            max_level: 5,
            cost: { gold: 4e8, time_seconds: 760320 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 88,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia de Limites Absolutos",
            name: "Sistema de Transcend\xEAncia de Limites Absolutos",
            description: "Transcende limites que n\xE3o podem ser transcendidos",
            level: 1,
            max_level: 5,
            cost: { gold: 5e8, time_seconds: 777600 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        45: [
          {
            id: 89,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Entidade da Transcend\xEAncia",
            name: "Entidade da Transcend\xEAncia",
            description: "Torna-se uma entidade que transcende tudo",
            level: 1,
            max_level: 3,
            cost: { gold: 6e8, time_seconds: 794880 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 90,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Onipot\xEAncia Transcendental",
            name: "Sistema de Onipot\xEAncia Transcendental",
            description: "Alcan\xE7a poder que transcende a onipot\xEAncia",
            level: 1,
            max_level: 5,
            cost: { gold: 75e7, time_seconds: 812160 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        // NÍVEIS 46-50: Melhorias Absolutas
        46: [
          {
            id: 91,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Manipula\xE7\xE3o de Absolutos",
            name: "Centro de Manipula\xE7\xE3o de Absolutos",
            description: "Manipula conceitos absolutos",
            level: 1,
            max_level: 5,
            cost: { gold: 9e8, time_seconds: 829440 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 92,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Cria\xE7\xE3o de Absolutos",
            name: "Sistema de Cria\xE7\xE3o de Absolutos",
            description: "Cria novos absolutos",
            level: 1,
            max_level: 5,
            cost: { gold: 12e8, time_seconds: 846720 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        47: [
          {
            id: 93,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Laborat\xF3rio de Transcend\xEAncia Absoluta",
            name: "Laborat\xF3rio de Transcend\xEAncia Absoluta",
            description: "Estuda transcend\xEAncia al\xE9m da compreens\xE3o",
            level: 1,
            max_level: 5,
            cost: { gold: 15e8, time_seconds: 864e3 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 94,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia de Absolutos",
            name: "Sistema de Transcend\xEAncia de Absolutos",
            description: "Transcende conceitos absolutos",
            level: 1,
            max_level: 5,
            cost: { gold: 18e8, time_seconds: 881280 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        48: [
          {
            id: 95,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "F\xE1brica de Realidades Absolutas",
            name: "F\xE1brica de Realidades Absolutas",
            description: "Cria realidades que transcendem a realidade",
            level: 1,
            max_level: 5,
            cost: { gold: 2e9, time_seconds: 898560 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 96,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Manipula\xE7\xE3o de Transcend\xEAncia",
            name: "Sistema de Manipula\xE7\xE3o de Transcend\xEAncia",
            description: "Manipula a pr\xF3pria transcend\xEAncia",
            level: 1,
            max_level: 5,
            cost: { gold: 25e8, time_seconds: 915840 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        49: [
          {
            id: 97,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Centro de Controle de Transcend\xEAncia Universal",
            name: "Centro de Controle de Transcend\xEAncia Universal",
            description: "Controla toda a transcend\xEAncia do universo",
            level: 1,
            max_level: 5,
            cost: { gold: 3e9, time_seconds: 933120 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 98,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia de Transcend\xEAncia Absoluta",
            name: "Sistema de Transcend\xEAncia de Transcend\xEAncia Absoluta",
            description: "Transcende a transcend\xEAncia absoluta",
            level: 1,
            max_level: 5,
            cost: { gold: 35e8, time_seconds: 950400 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ],
        50: [
          {
            id: 99,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Onipot\xEAncia Absoluta",
            name: "Onipot\xEAncia Absoluta",
            description: "Alcan\xE7a poder absoluto que transcende todos os absolutos",
            level: 1,
            max_level: 1,
            cost: { gold: 5e9, time_seconds: 1e6 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 100,
            character_id: 0,
            type: "building",
            upgrade_type: "building",
            upgrade_name: "Sistema de Transcend\xEAncia Final",
            name: "Sistema de Transcend\xEAncia Final",
            description: "Transcende tudo que pode ser transcendido e o que n\xE3o pode",
            level: 1,
            max_level: 1,
            cost: { gold: 1e10, time_seconds: 2e6 },
            is_completed: false,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ]
      };
      return baseUpgradesByLevel[level] || [];
    };
    const getClassUpgrades = (level, characterClass2) => {
      var _a;
      const classUpgradesByLevel = {
        ninja: {
          1: [
            {
              id: 1001,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Treinamento de Ninjutsu",
              name: "Treinamento de Ninjutsu",
              description: "Aumenta a efici\xEAncia de habilidades ninja (+10% por n\xEDvel)",
              level: 1,
              max_level: 10,
              cost: { gold: 200, time_seconds: 60 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          3: [
            {
              id: 1002,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Dojo Secreto",
              name: "Dojo Secreto",
              description: "Permite aprender t\xE9cnicas ninja avan\xE7adas",
              level: 1,
              max_level: 5,
              cost: { gold: 500, time_seconds: 120 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          5: [
            {
              id: 1003,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Arsenal de Shurikens",
              name: "Arsenal de Shurikens",
              description: "Aumenta dano de ataques \xE0 dist\xE2ncia (+15% por n\xEDvel)",
              level: 1,
              max_level: 5,
              cost: { gold: 800, time_seconds: 180 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]
        },
        guerreiro_espacial: {
          1: [
            {
              id: 2001,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Treinamento de Combate Espacial",
              name: "Treinamento de Combate Espacial",
              description: "Aumenta resist\xEAncia em ambientes espaciais (+20% por n\xEDvel)",
              level: 1,
              max_level: 10,
              cost: { gold: 250, time_seconds: 90 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          3: [
            {
              id: 2002,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Esta\xE7\xE3o Espacial",
              name: "Esta\xE7\xE3o Espacial",
              description: "Base espacial para opera\xE7\xF5es avan\xE7adas",
              level: 1,
              max_level: 5,
              cost: { gold: 600, time_seconds: 150 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          5: [
            {
              id: 2003,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Armadura Espacial",
              name: "Armadura Espacial",
              description: "Prote\xE7\xE3o avan\xE7ada contra radia\xE7\xE3o e v\xE1cuo (+25% por n\xEDvel)",
              level: 1,
              max_level: 5,
              cost: { gold: 1e3, time_seconds: 240 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]
        },
        mago_elemental: {
          1: [
            {
              id: 3001,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "C\xEDrculo M\xE1gico",
              name: "C\xEDrculo M\xE1gico",
              description: "Aumenta poder das magias elementais (+12% por n\xEDvel)",
              level: 1,
              max_level: 10,
              cost: { gold: 180, time_seconds: 45 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          3: [
            {
              id: 3002,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Torre de Magia",
              name: "Torre de Magia",
              description: "Centro de pesquisa e pr\xE1tica m\xE1gica",
              level: 1,
              max_level: 5,
              cost: { gold: 450, time_seconds: 100 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          5: [
            {
              id: 3003,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Cristal de Poder",
              name: "Cristal de Poder",
              description: "Amplifica energia m\xE1gica (+18% por n\xEDvel)",
              level: 1,
              max_level: 5,
              cost: { gold: 750, time_seconds: 120 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]
        },
        arqueiro_elfo: {
          1: [
            {
              id: 4001,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Treinamento de Precis\xE3o",
              name: "Treinamento de Precis\xE3o",
              description: "Aumenta precis\xE3o e alcance de ataques (+15% por n\xEDvel)",
              level: 1,
              max_level: 10,
              cost: { gold: 220, time_seconds: 75 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          3: [
            {
              id: 4002,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Torre de Observa\xE7\xE3o",
              name: "Torre de Observa\xE7\xE3o",
              description: "Permite detectar inimigos a longa dist\xE2ncia",
              level: 1,
              max_level: 5,
              cost: { gold: 500, time_seconds: 110 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          5: [
            {
              id: 4003,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Arsenal de Flechas M\xE1gicas",
              name: "Arsenal de Flechas M\xE1gicas",
              description: "Flechas com propriedades especiais (+20% por n\xEDvel)",
              level: 1,
              max_level: 5,
              cost: { gold: 850, time_seconds: 160 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]
        },
        paladino_sagrado: {
          1: [
            {
              id: 5001,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Treinamento Divino",
              name: "Treinamento Divino",
              description: "Aumenta poder de cura e prote\xE7\xE3o (+14% por n\xEDvel)",
              level: 1,
              max_level: 10,
              cost: { gold: 200, time_seconds: 60 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          3: [
            {
              id: 5002,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Templo Sagrado",
              name: "Templo Sagrado",
              description: "Centro de poder divino e b\xEAn\xE7\xE3os",
              level: 1,
              max_level: 5,
              cost: { gold: 550, time_seconds: 130 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          5: [
            {
              id: 5003,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Escudo Sagrado",
              name: "Escudo Sagrado",
              description: "Prote\xE7\xE3o divina contra mal (+22% por n\xEDvel)",
              level: 1,
              max_level: 5,
              cost: { gold: 900, time_seconds: 200 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]
        },
        ladrao_sombrio: {
          1: [
            {
              id: 6001,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Treinamento de Furtividade",
              name: "Treinamento de Furtividade",
              description: "Aumenta chance de cr\xEDtico e evas\xE3o (+16% por n\xEDvel)",
              level: 1,
              max_level: 10,
              cost: { gold: 190, time_seconds: 50 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          3: [
            {
              id: 6002,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Guilda das Sombras",
              name: "Guilda das Sombras",
              description: "Rede de contatos e informa\xE7\xF5es secretas",
              level: 1,
              max_level: 5,
              cost: { gold: 480, time_seconds: 90 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ],
          5: [
            {
              id: 6003,
              character_id: 0,
              type: "class_specific",
              upgrade_type: "class_specific",
              upgrade_name: "Arsenal de Venenos",
              name: "Arsenal de Venenos",
              description: "Armas envenenadas para ataques furtivos (+24% por n\xEDvel)",
              level: 1,
              max_level: 5,
              cost: { gold: 800, time_seconds: 140 },
              is_completed: false,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]
        }
      };
      return ((_a = classUpgradesByLevel[characterClass2]) == null ? void 0 : _a[level]) || [];
    };
    const existingUpgrades = db.prepare("SELECT * FROM upgrades WHERE character_id = ?").all(characterId);
    const resources = db.prepare(
      "SELECT resource_type, amount FROM resources WHERE character_id = ?"
    ).all(characterId);
    const resourceMap = resources.reduce((acc, resource) => {
      acc[resource.resource_type] = resource.amount;
      return acc;
    }, {});
    const upgradeMap = existingUpgrades.reduce((acc, upgrade) => {
      acc[upgrade.upgrade_name] = upgrade;
      return acc;
    }, {});
    const availableUpgrades = [];
    for (let level = 1; level <= characterLevel; level++) {
      const upgradesForLevel = getClassSpecificUpgrades(
        level,
        characterClass
      ).map((upgrade) => {
        const existing = upgradeMap[upgrade.upgrade_name];
        const currentLevel = existing ? existing.level : 0;
        const isCompleted = existing ? existing.is_completed : false;
        const isInProgress = existing && !existing.is_completed;
        let timeRemaining = 0;
        if (isInProgress && existing.started_at) {
          const startTime = new Date(existing.started_at);
          const endTime = new Date(
            startTime.getTime() + upgrade.cost.time_seconds * 1e3
          );
          timeRemaining = Math.max(0, endTime.getTime() - Date.now());
        }
        const canAffordGold = (resourceMap.ouro || 0) >= (upgrade.cost.gold || 0);
        const canAffordMaterials = (resourceMap.materiais || 0) >= (upgrade.cost.materials || 0);
        const canAffordCrystals = (resourceMap.cristais || 0) >= (upgrade.cost.crystals || 0);
        const canAfford = canAffordGold && canAffordMaterials && canAffordCrystals;
        return {
          ...upgrade,
          id: upgrade.id.toString(),
          name: upgrade.upgrade_name,
          type: upgrade.upgrade_type,
          description: upgrade.description,
          current_level: currentLevel,
          max_level: upgrade.max_level,
          current_cost: upgrade.cost,
          can_afford: canAfford,
          can_upgrade: !isInProgress && currentLevel < upgrade.max_level && canAfford,
          time_seconds: upgrade.cost.time_seconds,
          time_remaining: timeRemaining,
          is_completed: isCompleted,
          is_in_progress: isInProgress
        };
      });
      availableUpgrades.push(...upgradesForLevel);
    }
    for (let level = characterLevel + 1; level <= Math.min(characterLevel + 5, 50); level++) {
      const upgradesForLevel = getClassSpecificUpgrades(
        level,
        characterClass
      ).map((upgrade) => {
        const existing = upgradeMap[upgrade.upgrade_name];
        const currentLevel = existing ? existing.level : 0;
        const isCompleted = existing ? existing.is_completed : false;
        const isInProgress = existing && !existing.is_completed;
        let timeRemaining = 0;
        if (isInProgress && existing.started_at) {
          const startTime = new Date(existing.started_at);
          const endTime = new Date(
            startTime.getTime() + upgrade.cost.time_seconds * 1e3
          );
          timeRemaining = Math.max(0, endTime.getTime() - Date.now());
        }
        const canAffordGold = (resourceMap.ouro || 0) >= (upgrade.cost.gold || 0);
        const canAffordMaterials = (resourceMap.materiais || 0) >= (upgrade.cost.materials || 0);
        const canAffordCrystals = (resourceMap.cristais || 0) >= (upgrade.cost.crystals || 0);
        const canAfford = canAffordGold && canAffordMaterials && canAffordCrystals;
        return {
          ...upgrade,
          id: upgrade.id.toString(),
          name: upgrade.upgrade_name,
          type: upgrade.upgrade_type,
          description: upgrade.description,
          current_level: currentLevel,
          max_level: upgrade.max_level,
          current_cost: upgrade.cost,
          can_afford: canAfford,
          can_upgrade: false,
          // Não pode fazer upgrade ainda (nível insuficiente)
          time_seconds: upgrade.cost.time_seconds,
          time_remaining: timeRemaining,
          is_completed: isCompleted,
          is_in_progress: isInProgress
        };
      });
      availableUpgrades.push(...upgradesForLevel);
    }
    const response = {
      success: true,
      data: availableUpgrades
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
