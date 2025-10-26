const getClassItemsExpanded = (level, characterClass) => {
  var _a;
  const classItemsByLevel = {
    ninja: {
      1: [
        {
          id: "shuriken_basico",
          name: "Shuriken B\xE1sico",
          type: "equipment",
          price: 80,
          level_required: 1,
          stats: { agility: 8, damage: 12 },
          description: "Arma de arremesso ninja b\xE1sica",
          category: "Armas Ninja"
        },
        {
          id: "uniforme_ninja",
          name: "Uniforme Ninja",
          type: "equipment",
          price: 120,
          level_required: 1,
          stats: { agility: 10, stealth: 5 },
          description: "Roupa tradicional ninja para furtividade",
          category: "Armaduras Ninja"
        }
      ],
      2: [
        {
          id: "kunai_basico",
          name: "Kunai B\xE1sico",
          type: "equipment",
          price: 150,
          level_required: 2,
          stats: { agility: 12, damage: 15 },
          description: "Kunai ninja b\xE1sico para combate",
          category: "Armas Ninja"
        }
      ],
      3: [
        {
          id: "kunai_avancado",
          name: "Kunai Avan\xE7ado",
          type: "equipment",
          price: 250,
          level_required: 3,
          stats: { agility: 15, damage: 18 },
          description: "Kunai ninja mais afiado e letal",
          category: "Armas Ninja"
        }
      ],
      4: [
        {
          id: "armadura_ninja_escura",
          name: "Armadura Ninja Escura",
          type: "equipment",
          price: 300,
          level_required: 4,
          stats: { agility: 15, stealth: 10 },
          description: "Armadura ninja que favorece furtividade",
          category: "Armaduras Ninja"
        }
      ],
      5: [
        {
          id: "mascara_ninja",
          name: "M\xE1scara Ninja",
          type: "equipment",
          price: 400,
          level_required: 5,
          stats: { stealth: 15, intimidation: 10 },
          description: "M\xE1scara que aumenta furtividade e intimida\xE7\xE3o",
          category: "Acess\xF3rios Ninja"
        }
      ],
      6: [
        {
          id: "shuriken_duplo",
          name: "Shuriken Duplo",
          type: "equipment",
          price: 500,
          level_required: 6,
          stats: { agility: 18, damage: 22 },
          description: "Shuriken especial que causa dano duplo",
          category: "Armas Ninja"
        }
      ],
      7: [
        {
          id: "uniforme_sombrio",
          name: "Uniforme Sombrio",
          type: "equipment",
          price: 600,
          level_required: 7,
          stats: { agility: 20, stealth: 15 },
          description: "Uniforme ninja das sombras",
          category: "Armaduras Ninja"
        }
      ],
      8: [
        {
          id: "kunai_veneno",
          name: "Kunai do Veneno",
          type: "equipment",
          price: 800,
          level_required: 8,
          stats: { agility: 22, damage: 25, poison: 10 },
          description: "Kunai envenenado para ataques furtivos",
          category: "Armas Ninja"
        }
      ],
      9: [
        {
          id: "mascara_demonio",
          name: "M\xE1scara do Dem\xF4nio",
          type: "equipment",
          price: 1e3,
          level_required: 9,
          stats: { stealth: 20, intimidation: 15 },
          description: "M\xE1scara que inspira terror nos inimigos",
          category: "Acess\xF3rios Ninja"
        }
      ],
      10: [
        {
          id: "shuriken_triplo",
          name: "Shuriken Triplo",
          type: "equipment",
          price: 1200,
          level_required: 10,
          stats: { agility: 25, damage: 30 },
          description: "Shuriken mestre que atinge m\xFAltiplos alvos",
          category: "Armas Ninja"
        }
      ],
      15: [
        {
          id: "katana_ninja",
          name: "Katana Ninja",
          type: "equipment",
          price: 5e3,
          level_required: 15,
          stats: { agility: 30, damage: 40, stealth: 10 },
          description: "Katana tradicional dos ninjas",
          category: "Armas Ninja"
        }
      ],
      20: [
        {
          id: "armadura_ninja_mestre",
          name: "Armadura Ninja Mestre",
          type: "equipment",
          price: 8e3,
          level_required: 20,
          stats: { agility: 35, stealth: 25, defense: 15 },
          description: "Armadura de um ninja mestre",
          category: "Armaduras Ninja"
        }
      ],
      25: [
        {
          id: "kunai_mestre",
          name: "Kunai do Mestre",
          type: "equipment",
          price: 25e3,
          level_required: 25,
          stats: { agility: 45, damage: 60, stealth: 20 },
          description: "Kunai lend\xE1rio de um ninja mestre",
          category: "Armas Ninja"
        }
      ],
      30: [
        {
          id: "uniforme_lendario",
          name: "Uniforme Lend\xE1rio",
          type: "equipment",
          price: 4e4,
          level_required: 30,
          stats: { agility: 50, stealth: 35, defense: 25 },
          description: "Uniforme de um ninja lend\xE1rio",
          category: "Armaduras Ninja"
        }
      ],
      35: [
        {
          id: "katana_lendaria",
          name: "Katana Lend\xE1ria",
          type: "equipment",
          price: 1e5,
          level_required: 35,
          stats: { agility: 70, damage: 100, stealth: 30 },
          description: "Katana de poder lend\xE1rio",
          category: "Armas Ninja"
        }
      ],
      40: [
        {
          id: "armadura_divina",
          name: "Armadura Divina",
          type: "equipment",
          price: 15e4,
          level_required: 40,
          stats: { agility: 80, stealth: 50, defense: 40 },
          description: "Armadura aben\xE7oada pelos deuses",
          category: "Armaduras Ninja"
        }
      ],
      45: [
        {
          id: "kunai_celestial",
          name: "Kunai Celestial",
          type: "equipment",
          price: 5e5,
          level_required: 45,
          stats: { agility: 100, damage: 200, stealth: 60 },
          description: "Kunai de poder celestial",
          category: "Armas Ninja"
        }
      ],
      50: [
        {
          id: "uniforme_celestial",
          name: "Uniforme Celestial",
          type: "equipment",
          price: 1e6,
          level_required: 50,
          stats: { agility: 120, stealth: 80, defense: 60 },
          description: "Uniforme de poder celestial supremo",
          category: "Armaduras Ninja"
        }
      ]
    },
    guerreiro_espacial: {
      1: [
        {
          id: "rifle_plasma",
          name: "Rifle de Plasma",
          type: "equipment",
          price: 150,
          level_required: 1,
          stats: { strength: 12, damage: 20 },
          description: "Arma de energia para combate espacial",
          category: "Armas Espaciais"
        },
        {
          id: "armadura_espacial_basica",
          name: "Armadura Espacial B\xE1sica",
          type: "equipment",
          price: 200,
          level_required: 1,
          stats: { defense: 15, radiation_resistance: 20 },
          description: "Prote\xE7\xE3o b\xE1sica contra ambiente espacial",
          category: "Armaduras Espaciais"
        }
      ],
      2: [
        {
          id: "pistola_laser",
          name: "Pistola Laser",
          type: "equipment",
          price: 180,
          level_required: 2,
          stats: { strength: 15, damage: 22 },
          description: "Arma laser port\xE1til",
          category: "Armas Espaciais"
        }
      ],
      3: [
        {
          id: "escudo_energia",
          name: "Escudo de Energia",
          type: "equipment",
          price: 350,
          level_required: 3,
          stats: { defense: 25, energy_shield: 50 },
          description: "Escudo de energia para prote\xE7\xE3o avan\xE7ada",
          category: "Armaduras Espaciais"
        }
      ],
      4: [
        {
          id: "rifle_quantico",
          name: "Rifle Qu\xE2ntico",
          type: "equipment",
          price: 400,
          level_required: 4,
          stats: { strength: 18, damage: 28 },
          description: "Rifle com tecnologia qu\xE2ntica",
          category: "Armas Espaciais"
        }
      ],
      5: [
        {
          id: "jetpack",
          name: "Jetpack",
          type: "equipment",
          price: 600,
          level_required: 5,
          stats: { mobility: 30, flight: true },
          description: "Permite voo em ambientes de baixa gravidade",
          category: "Acess\xF3rios Espaciais"
        }
      ],
      6: [
        {
          id: "armadura_quantica",
          name: "Armadura Qu\xE2ntica",
          type: "equipment",
          price: 700,
          level_required: 6,
          stats: { defense: 30, radiation_resistance: 40 },
          description: "Armadura com tecnologia qu\xE2ntica",
          category: "Armaduras Espaciais"
        }
      ],
      7: [
        {
          id: "canhao_plasma",
          name: "Canh\xE3o de Plasma",
          type: "equipment",
          price: 900,
          level_required: 7,
          stats: { strength: 25, damage: 35 },
          description: "Canh\xE3o de plasma de alta pot\xEAncia",
          category: "Armas Espaciais"
        }
      ],
      8: [
        {
          id: "capacete_espacial",
          name: "Capacete Espacial",
          type: "equipment",
          price: 1e3,
          level_required: 8,
          stats: { defense: 20, radiation_resistance: 30 },
          description: "Capacete com prote\xE7\xE3o espacial",
          category: "Acess\xF3rios Espaciais"
        }
      ],
      9: [
        {
          id: "rifle_antimateria",
          name: "Rifle de Antimat\xE9ria",
          type: "equipment",
          price: 1200,
          level_required: 9,
          stats: { strength: 30, damage: 45 },
          description: "Rifle que usa antimat\xE9ria",
          category: "Armas Espaciais"
        }
      ],
      10: [
        {
          id: "armadura_antimateria",
          name: "Armadura de Antimat\xE9ria",
          type: "equipment",
          price: 1500,
          level_required: 10,
          stats: { defense: 40, radiation_resistance: 60 },
          description: "Armadura que absorve antimat\xE9ria",
          category: "Armaduras Espaciais"
        }
      ],
      15: [
        {
          id: "canhao_quantico",
          name: "Canh\xE3o Qu\xE2ntico",
          type: "equipment",
          price: 5e3,
          level_required: 15,
          stats: { strength: 50, damage: 70 },
          description: "Canh\xE3o de tecnologia qu\xE2ntica avan\xE7ada",
          category: "Armas Espaciais"
        }
      ],
      20: [
        {
          id: "armadura_quantica_avancada",
          name: "Armadura Qu\xE2ntica Avan\xE7ada",
          type: "equipment",
          price: 8e3,
          level_required: 20,
          stats: { defense: 60, radiation_resistance: 80 },
          description: "Armadura qu\xE2ntica de \xFAltima gera\xE7\xE3o",
          category: "Armaduras Espaciais"
        }
      ],
      25: [
        {
          id: "rifle_dimensional",
          name: "Rifle Dimensional",
          type: "equipment",
          price: 25e3,
          level_required: 25,
          stats: { strength: 80, damage: 120 },
          description: "Rifle que atravessa dimens\xF5es",
          category: "Armas Espaciais"
        }
      ],
      30: [
        {
          id: "armadura_dimensional",
          name: "Armadura Dimensional",
          type: "equipment",
          price: 4e4,
          level_required: 30,
          stats: { defense: 100, radiation_resistance: 120 },
          description: "Armadura que protege contra ataques dimensionais",
          category: "Armaduras Espaciais"
        }
      ],
      35: [
        {
          id: "canhao_celestial",
          name: "Canh\xE3o Celestial",
          type: "equipment",
          price: 1e5,
          level_required: 35,
          stats: { strength: 120, damage: 200 },
          description: "Canh\xE3o de poder celestial",
          category: "Armas Espaciais"
        }
      ],
      40: [
        {
          id: "armadura_celestial",
          name: "Armadura Celestial",
          type: "equipment",
          price: 15e4,
          level_required: 40,
          stats: { defense: 150, radiation_resistance: 200 },
          description: "Armadura aben\xE7oada pelos deuses",
          category: "Armaduras Espaciais"
        }
      ],
      45: [
        {
          id: "rifle_universal",
          name: "Rifle Universal",
          type: "equipment",
          price: 5e5,
          level_required: 45,
          stats: { strength: 200, damage: 300 },
          description: "Rifle de poder universal",
          category: "Armas Espaciais"
        }
      ],
      50: [
        {
          id: "armadura_universal",
          name: "Armadura Universal",
          type: "equipment",
          price: 1e6,
          level_required: 50,
          stats: { defense: 250, radiation_resistance: 300 },
          description: "Armadura de poder universal supremo",
          category: "Armaduras Espaciais"
        }
      ]
    },
    mago_elemental: {
      1: [
        {
          id: "cajado_elemental",
          name: "Cajado Elemental",
          type: "equipment",
          price: 100,
          level_required: 1,
          stats: { intelligence: 15, magic_power: 20 },
          description: "Cajado que amplifica magias elementais",
          category: "Armas M\xE1gicas"
        },
        {
          id: "tunica_mago",
          name: "T\xFAnica de Mago",
          type: "equipment",
          price: 130,
          level_required: 1,
          stats: { intelligence: 12, mana: 30 },
          description: "T\xFAnica que aumenta poder m\xE1gico",
          category: "Armaduras M\xE1gicas"
        }
      ],
      2: [
        {
          id: "varinha_fogo",
          name: "Varinha do Fogo",
          type: "equipment",
          price: 160,
          level_required: 2,
          stats: { intelligence: 18, magic_power: 25 },
          description: "Varinha especializada em magias de fogo",
          category: "Armas M\xE1gicas"
        }
      ],
      3: [
        {
          id: "orb_elemental",
          name: "Orbe Elemental",
          type: "equipment",
          price: 300,
          level_required: 3,
          stats: { magic_power: 25, elemental_mastery: 15 },
          description: "Orbe que controla elementos da natureza",
          category: "Acess\xF3rios M\xE1gicos"
        }
      ],
      4: [
        {
          id: "tunica_elemental",
          name: "T\xFAnica Elemental",
          type: "equipment",
          price: 350,
          level_required: 4,
          stats: { intelligence: 20, magic_power: 30 },
          description: "T\xFAnica que amplifica magias elementais",
          category: "Armaduras M\xE1gicas"
        }
      ],
      5: [
        {
          id: "grimorio_antigo",
          name: "Grim\xF3rio Antigo",
          type: "equipment",
          price: 500,
          level_required: 5,
          stats: { intelligence: 20, spell_knowledge: 25 },
          description: "Livro de magias antigas e poderosas",
          category: "Acess\xF3rios M\xE1gicos"
        }
      ],
      6: [
        {
          id: "cajado_agua",
          name: "Cajado da \xC1gua",
          type: "equipment",
          price: 600,
          level_required: 6,
          stats: { intelligence: 25, magic_power: 35 },
          description: "Cajado especializado em magias de \xE1gua",
          category: "Armas M\xE1gicas"
        }
      ],
      7: [
        {
          id: "orb_fogo",
          name: "Orbe do Fogo",
          type: "equipment",
          price: 700,
          level_required: 7,
          stats: { magic_power: 30, fire_mastery: 20 },
          description: "Orbe que controla o elemento fogo",
          category: "Acess\xF3rios M\xE1gicos"
        }
      ],
      8: [
        {
          id: "tunica_arcana",
          name: "T\xFAnica Arcana",
          type: "equipment",
          price: 800,
          level_required: 8,
          stats: { intelligence: 30, magic_power: 40 },
          description: "T\xFAnica com poder arcano",
          category: "Armaduras M\xE1gicas"
        }
      ],
      9: [
        {
          id: "cajado_terra",
          name: "Cajado da Terra",
          type: "equipment",
          price: 900,
          level_required: 9,
          stats: { intelligence: 35, magic_power: 45 },
          description: "Cajado especializado em magias de terra",
          category: "Armas M\xE1gicas"
        }
      ],
      10: [
        {
          id: "orb_ar",
          name: "Orbe do Ar",
          type: "equipment",
          price: 1e3,
          level_required: 10,
          stats: { magic_power: 40, air_mastery: 25 },
          description: "Orbe que controla o elemento ar",
          category: "Acess\xF3rios M\xE1gicos"
        }
      ],
      15: [
        {
          id: "cajado_elemental_mestre",
          name: "Cajado Elemental Mestre",
          type: "equipment",
          price: 5e3,
          level_required: 15,
          stats: { intelligence: 50, magic_power: 70 },
          description: "Cajado de um mestre elemental",
          category: "Armas M\xE1gicas"
        }
      ],
      20: [
        {
          id: "tunica_elemental_mestre",
          name: "T\xFAnica Elemental Mestre",
          type: "equipment",
          price: 8e3,
          level_required: 20,
          stats: { intelligence: 60, magic_power: 80 },
          description: "T\xFAnica de um mestre elemental",
          category: "Armaduras M\xE1gicas"
        }
      ],
      25: [
        {
          id: "orb_elemental_lendario",
          name: "Orbe Elemental Lend\xE1rio",
          type: "equipment",
          price: 25e3,
          level_required: 25,
          stats: { magic_power: 100, elemental_mastery: 60 },
          description: "Orbe lend\xE1rio que controla todos os elementos",
          category: "Acess\xF3rios M\xE1gicos"
        }
      ],
      30: [
        {
          id: "cajado_elemental_lendario",
          name: "Cajado Elemental Lend\xE1rio",
          type: "equipment",
          price: 4e4,
          level_required: 30,
          stats: { intelligence: 80, magic_power: 120 },
          description: "Cajado lend\xE1rio de poder elemental",
          category: "Armas M\xE1gicas"
        }
      ],
      35: [
        {
          id: "tunica_elemental_lendaria",
          name: "T\xFAnica Elemental Lend\xE1ria",
          type: "equipment",
          price: 1e5,
          level_required: 35,
          stats: { intelligence: 100, magic_power: 150 },
          description: "T\xFAnica lend\xE1ria de poder elemental",
          category: "Armaduras M\xE1gicas"
        }
      ],
      40: [
        {
          id: "orb_elemental_divino",
          name: "Orbe Elemental Divino",
          type: "equipment",
          price: 15e4,
          level_required: 40,
          stats: { magic_power: 200, elemental_mastery: 100 },
          description: "Orbe divino que controla todos os elementos",
          category: "Acess\xF3rios M\xE1gicos"
        }
      ],
      45: [
        {
          id: "cajado_elemental_celestial",
          name: "Cajado Elemental Celestial",
          type: "equipment",
          price: 5e5,
          level_required: 45,
          stats: { intelligence: 150, magic_power: 250 },
          description: "Cajado celestial de poder elemental",
          category: "Armas M\xE1gicas"
        }
      ],
      50: [
        {
          id: "tunica_elemental_celestial",
          name: "T\xFAnica Elemental Celestial",
          type: "equipment",
          price: 1e6,
          level_required: 50,
          stats: { intelligence: 200, magic_power: 300 },
          description: "T\xFAnica celestial de poder elemental supremo",
          category: "Armaduras M\xE1gicas"
        }
      ]
    },
    arqueiro_elfo: {
      1: [
        {
          id: "arco_elfico",
          name: "Arco \xC9lfico",
          type: "equipment",
          price: 90,
          level_required: 1,
          stats: { agility: 12, accuracy: 15 },
          description: "Arco tradicional \xE9lfico de alta precis\xE3o",
          category: "Armas \xC9lficas"
        },
        {
          id: "armadura_elfica",
          name: "Armadura \xC9lfica",
          type: "equipment",
          price: 140,
          level_required: 1,
          stats: { agility: 10, nature_resistance: 15 },
          description: "Armadura leve e \xE1gil dos elfos",
          category: "Armaduras \xC9lficas"
        }
      ],
      2: [
        {
          id: "flechas_elficas",
          name: "Flechas \xC9lficas",
          type: "equipment",
          price: 120,
          level_required: 2,
          stats: { accuracy: 18, damage: 8 },
          description: "Flechas \xE9lficas de alta precis\xE3o",
          category: "Muni\xE7\xF5es \xC9lficas"
        }
      ],
      3: [
        {
          id: "flechas_magicas",
          name: "Flechas M\xE1gicas",
          type: "equipment",
          price: 280,
          level_required: 3,
          stats: { damage: 20, magic_damage: 15 },
          description: "Flechas imbu\xEDdas com magia natural",
          category: "Muni\xE7\xF5es \xC9lficas"
        }
      ],
      4: [
        {
          id: "arco_natureza",
          name: "Arco da Natureza",
          type: "equipment",
          price: 320,
          level_required: 4,
          stats: { agility: 18, accuracy: 20 },
          description: "Arco que canaliza poder da natureza",
          category: "Armas \xC9lficas"
        }
      ],
      5: [
        {
          id: "capacete_elfico",
          name: "Capacete \xC9lfico",
          type: "equipment",
          price: 450,
          level_required: 5,
          stats: { accuracy: 20, perception: 15 },
          description: "Capacete que aumenta precis\xE3o e percep\xE7\xE3o",
          category: "Acess\xF3rios \xC9lficos"
        }
      ],
      6: [
        {
          id: "armadura_natureza",
          name: "Armadura da Natureza",
          type: "equipment",
          price: 500,
          level_required: 6,
          stats: { agility: 20, nature_resistance: 25 },
          description: "Armadura que protege contra elementos naturais",
          category: "Armaduras \xC9lficas"
        }
      ],
      7: [
        {
          id: "arco_lua",
          name: "Arco da Lua",
          type: "equipment",
          price: 600,
          level_required: 7,
          stats: { agility: 25, accuracy: 25 },
          description: "Arco que canaliza poder lunar",
          category: "Armas \xC9lficas"
        }
      ],
      8: [
        {
          id: "flechas_lunares",
          name: "Flechas Lunares",
          type: "equipment",
          price: 700,
          level_required: 8,
          stats: { damage: 25, magic_damage: 20 },
          description: "Flechas imbu\xEDdas com poder lunar",
          category: "Muni\xE7\xF5es \xC9lficas"
        }
      ],
      9: [
        {
          id: "armadura_lunar",
          name: "Armadura Lunar",
          type: "equipment",
          price: 800,
          level_required: 9,
          stats: { agility: 30, nature_resistance: 30 },
          description: "Armadura que brilha como a lua",
          category: "Armaduras \xC9lficas"
        }
      ],
      10: [
        {
          id: "arco_sol",
          name: "Arco do Sol",
          type: "equipment",
          price: 1e3,
          level_required: 10,
          stats: { agility: 35, accuracy: 30 },
          description: "Arco que canaliza poder solar",
          category: "Armas \xC9lficas"
        }
      ],
      15: [
        {
          id: "arco_elemental",
          name: "Arco Elemental",
          type: "equipment",
          price: 5e3,
          level_required: 15,
          stats: { agility: 50, accuracy: 40 },
          description: "Arco que canaliza elementos da natureza",
          category: "Armas \xC9lficas"
        }
      ],
      20: [
        {
          id: "armadura_elemental",
          name: "Armadura Elemental",
          type: "equipment",
          price: 8e3,
          level_required: 20,
          stats: { agility: 60, nature_resistance: 50 },
          description: "Armadura que protege contra todos os elementos",
          category: "Armaduras \xC9lficas"
        }
      ],
      25: [
        {
          id: "arco_lendario",
          name: "Arco Lend\xE1rio",
          type: "equipment",
          price: 25e3,
          level_required: 25,
          stats: { agility: 80, accuracy: 60 },
          description: "Arco lend\xE1rio dos elfos antigos",
          category: "Armas \xC9lficas"
        }
      ],
      30: [
        {
          id: "armadura_lendaria",
          name: "Armadura Lend\xE1ria",
          type: "equipment",
          price: 4e4,
          level_required: 30,
          stats: { agility: 100, nature_resistance: 80 },
          description: "Armadura lend\xE1ria dos elfos antigos",
          category: "Armaduras \xC9lficas"
        }
      ],
      35: [
        {
          id: "arco_divino",
          name: "Arco Divino",
          type: "equipment",
          price: 1e5,
          level_required: 35,
          stats: { agility: 120, accuracy: 80 },
          description: "Arco aben\xE7oado pelos deuses",
          category: "Armas \xC9lficas"
        }
      ],
      40: [
        {
          id: "armadura_divina",
          name: "Armadura Divina",
          type: "equipment",
          price: 15e4,
          level_required: 40,
          stats: { agility: 150, nature_resistance: 120 },
          description: "Armadura aben\xE7oada pelos deuses",
          category: "Armaduras \xC9lficas"
        }
      ],
      45: [
        {
          id: "arco_celestial",
          name: "Arco Celestial",
          type: "equipment",
          price: 5e5,
          level_required: 45,
          stats: { agility: 200, accuracy: 120 },
          description: "Arco de poder celestial",
          category: "Armas \xC9lficas"
        }
      ],
      50: [
        {
          id: "armadura_celestial",
          name: "Armadura Celestial",
          type: "equipment",
          price: 1e6,
          level_required: 50,
          stats: { agility: 250, nature_resistance: 200 },
          description: "Armadura de poder celestial supremo",
          category: "Armaduras \xC9lficas"
        }
      ]
    },
    paladino_sagrado: {
      1: [
        {
          id: "espada_sagrada",
          name: "Espada Sagrada",
          type: "equipment",
          price: 110,
          level_required: 1,
          stats: { strength: 10, holy_damage: 15 },
          description: "Espada aben\xE7oada com poder divino",
          category: "Armas Sagradas"
        },
        {
          id: "armadura_sagrada",
          name: "Armadura Sagrada",
          type: "equipment",
          price: 160,
          level_required: 1,
          stats: { defense: 12, holy_resistance: 20 },
          description: "Armadura aben\xE7oada pelos deuses",
          category: "Armaduras Sagradas"
        }
      ],
      2: [
        {
          id: "escudo_basico",
          name: "Escudo B\xE1sico",
          type: "equipment",
          price: 140,
          level_required: 2,
          stats: { defense: 15, holy_protection: 10 },
          description: "Escudo b\xE1sico de prote\xE7\xE3o",
          category: "Armaduras Sagradas"
        }
      ],
      3: [
        {
          id: "escudo_sagrado",
          name: "Escudo Sagrado",
          type: "equipment",
          price: 320,
          level_required: 3,
          stats: { defense: 20, holy_protection: 25 },
          description: "Escudo que protege contra o mal",
          category: "Armaduras Sagradas"
        }
      ],
      4: [
        {
          id: "espada_justica",
          name: "Espada da Justi\xE7a",
          type: "equipment",
          price: 360,
          level_required: 4,
          stats: { strength: 15, holy_damage: 20 },
          description: "Espada que canaliza justi\xE7a divina",
          category: "Armas Sagradas"
        }
      ],
      5: [
        {
          id: "amuleto_divino",
          name: "Amuleto Divino",
          type: "equipment",
          price: 550,
          level_required: 5,
          stats: { holy_power: 30, healing: 20 },
          description: "Amuleto que amplifica poderes divinos",
          category: "Acess\xF3rios Sagrados"
        }
      ],
      6: [
        {
          id: "armadura_justica",
          name: "Armadura da Justi\xE7a",
          type: "equipment",
          price: 600,
          level_required: 6,
          stats: { defense: 25, holy_resistance: 30 },
          description: "Armadura que protege contra o mal",
          category: "Armaduras Sagradas"
        }
      ],
      7: [
        {
          id: "espada_luz",
          name: "Espada da Luz",
          type: "equipment",
          price: 700,
          level_required: 7,
          stats: { strength: 20, holy_damage: 25 },
          description: "Espada que brilha com luz divina",
          category: "Armas Sagradas"
        }
      ],
      8: [
        {
          id: "escudo_luz",
          name: "Escudo da Luz",
          type: "equipment",
          price: 800,
          level_required: 8,
          stats: { defense: 30, holy_protection: 35 },
          description: "Escudo que brilha com luz divina",
          category: "Armaduras Sagradas"
        }
      ],
      9: [
        {
          id: "armadura_luz",
          name: "Armadura da Luz",
          type: "equipment",
          price: 900,
          level_required: 9,
          stats: { defense: 35, holy_resistance: 40 },
          description: "Armadura que brilha com luz divina",
          category: "Armaduras Sagradas"
        }
      ],
      10: [
        {
          id: "espada_redencao",
          name: "Espada da Reden\xE7\xE3o",
          type: "equipment",
          price: 1100,
          level_required: 10,
          stats: { strength: 25, holy_damage: 30 },
          description: "Espada que oferece reden\xE7\xE3o aos pecadores",
          category: "Armas Sagradas"
        }
      ],
      15: [
        {
          id: "espada_elemental_sagrada",
          name: "Espada Elemental Sagrada",
          type: "equipment",
          price: 5e3,
          level_required: 15,
          stats: { strength: 40, holy_damage: 50 },
          description: "Espada que canaliza elementos sagrados",
          category: "Armas Sagradas"
        }
      ],
      20: [
        {
          id: "armadura_elemental_sagrada",
          name: "Armadura Elemental Sagrada",
          type: "equipment",
          price: 8e3,
          level_required: 20,
          stats: { defense: 60, holy_resistance: 80 },
          description: "Armadura que protege contra elementos sagrados",
          category: "Armaduras Sagradas"
        }
      ],
      25: [
        {
          id: "espada_lendaria_sagrada",
          name: "Espada Lend\xE1ria Sagrada",
          type: "equipment",
          price: 25e3,
          level_required: 25,
          stats: { strength: 70, holy_damage: 100 },
          description: "Espada lend\xE1ria de poder sagrado",
          category: "Armas Sagradas"
        }
      ],
      30: [
        {
          id: "armadura_lendaria_sagrada",
          name: "Armadura Lend\xE1ria Sagrada",
          type: "equipment",
          price: 4e4,
          level_required: 30,
          stats: { defense: 100, holy_resistance: 120 },
          description: "Armadura lend\xE1ria de poder sagrado",
          category: "Armaduras Sagradas"
        }
      ],
      35: [
        {
          id: "espada_divina_suprema",
          name: "Espada Divina Suprema",
          type: "equipment",
          price: 1e5,
          level_required: 35,
          stats: { strength: 120, holy_damage: 200 },
          description: "Espada divina de poder supremo",
          category: "Armas Sagradas"
        }
      ],
      40: [
        {
          id: "armadura_divina_suprema",
          name: "Armadura Divina Suprema",
          type: "equipment",
          price: 15e4,
          level_required: 40,
          stats: { defense: 150, holy_resistance: 200 },
          description: "Armadura divina de poder supremo",
          category: "Armaduras Sagradas"
        }
      ],
      45: [
        {
          id: "espada_celestial_suprema",
          name: "Espada Celestial Suprema",
          type: "equipment",
          price: 5e5,
          level_required: 45,
          stats: { strength: 200, holy_damage: 300 },
          description: "Espada celestial de poder supremo",
          category: "Armas Sagradas"
        }
      ],
      50: [
        {
          id: "armadura_celestial_suprema",
          name: "Armadura Celestial Suprema",
          type: "equipment",
          price: 1e6,
          level_required: 50,
          stats: { defense: 250, holy_resistance: 300 },
          description: "Armadura celestial de poder supremo",
          category: "Armaduras Sagradas"
        }
      ]
    },
    ladrao_sombrio: {
      1: [
        {
          id: "adaga_sombria",
          name: "Adaga Sombria",
          type: "equipment",
          price: 85,
          level_required: 1,
          stats: { agility: 10, stealth: 12 },
          description: "Adaga afiada para ataques furtivos",
          category: "Armas Sombrias"
        },
        {
          id: "armadura_sombria",
          name: "Armadura Sombria",
          type: "equipment",
          price: 125,
          level_required: 1,
          stats: { stealth: 15, agility: 8 },
          description: "Armadura que favorece furtividade",
          category: "Armaduras Sombrias"
        }
      ],
      2: [
        {
          id: "adaga_veneno",
          name: "Adaga do Veneno",
          type: "equipment",
          price: 130,
          level_required: 2,
          stats: { agility: 12, stealth: 15, poison: 8 },
          description: "Adaga envenenada para ataques furtivos",
          category: "Armas Sombrias"
        }
      ],
      3: [
        {
          id: "luvas_sombrias",
          name: "Luvas Sombrias",
          type: "equipment",
          price: 270,
          level_required: 3,
          stats: { stealth: 20, lockpicking: 15 },
          description: "Luvas que aumentam habilidades furtivas",
          category: "Acess\xF3rios Sombrios"
        }
      ],
      4: [
        {
          id: "armadura_sombra",
          name: "Armadura da Sombra",
          type: "equipment",
          price: 300,
          level_required: 4,
          stats: { stealth: 20, agility: 12 },
          description: "Armadura que se mistura com as sombras",
          category: "Armaduras Sombrias"
        }
      ],
      5: [
        {
          id: "capuz_sombrio",
          name: "Capuz Sombrio",
          type: "equipment",
          price: 420,
          level_required: 5,
          stats: { stealth: 25, intimidation: 20 },
          description: "Capuz que oculta a identidade",
          category: "Acess\xF3rios Sombrios"
        }
      ],
      6: [
        {
          id: "adaga_silenciosa",
          name: "Adaga Silenciosa",
          type: "equipment",
          price: 500,
          level_required: 6,
          stats: { agility: 18, stealth: 25 },
          description: "Adaga que n\xE3o faz barulho ao cortar",
          category: "Armas Sombrias"
        }
      ],
      7: [
        {
          id: "armadura_furtiva",
          name: "Armadura Furtiva",
          type: "equipment",
          price: 600,
          level_required: 7,
          stats: { stealth: 30, agility: 18 },
          description: "Armadura que favorece furtividade m\xE1xima",
          category: "Armaduras Sombrias"
        }
      ],
      8: [
        {
          id: "adaga_sombra",
          name: "Adaga da Sombra",
          type: "equipment",
          price: 700,
          level_required: 8,
          stats: { agility: 22, stealth: 30, shadow_damage: 15 },
          description: "Adaga que canaliza poder das sombras",
          category: "Armas Sombrias"
        }
      ],
      9: [
        {
          id: "luvas_sombra",
          name: "Luvas da Sombra",
          type: "equipment",
          price: 800,
          level_required: 9,
          stats: { stealth: 35, lockpicking: 25 },
          description: "Luvas que canalizam poder das sombras",
          category: "Acess\xF3rios Sombrios"
        }
      ],
      10: [
        {
          id: "adaga_mestre",
          name: "Adaga do Mestre",
          type: "equipment",
          price: 1e3,
          level_required: 10,
          stats: { agility: 30, stealth: 35 },
          description: "Adaga de um mestre das sombras",
          category: "Armas Sombrias"
        }
      ],
      15: [
        {
          id: "adaga_elemental_sombria",
          name: "Adaga Elemental Sombria",
          type: "equipment",
          price: 5e3,
          level_required: 15,
          stats: { agility: 50, stealth: 60 },
          description: "Adaga que canaliza elementos sombrios",
          category: "Armas Sombrias"
        }
      ],
      20: [
        {
          id: "armadura_elemental_sombria",
          name: "Armadura Elemental Sombria",
          type: "equipment",
          price: 8e3,
          level_required: 20,
          stats: { stealth: 80, agility: 60 },
          description: "Armadura que canaliza elementos sombrios",
          category: "Armaduras Sombrias"
        }
      ],
      25: [
        {
          id: "adaga_lendaria_sombria",
          name: "Adaga Lend\xE1ria Sombria",
          type: "equipment",
          price: 25e3,
          level_required: 25,
          stats: { agility: 80, stealth: 100 },
          description: "Adaga lend\xE1ria de poder sombrio",
          category: "Armas Sombrias"
        }
      ],
      30: [
        {
          id: "armadura_lendaria_sombria",
          name: "Armadura Lend\xE1ria Sombria",
          type: "equipment",
          price: 4e4,
          level_required: 30,
          stats: { stealth: 120, agility: 100 },
          description: "Armadura lend\xE1ria de poder sombrio",
          category: "Armaduras Sombrias"
        }
      ],
      35: [
        {
          id: "adaga_divina_sombria",
          name: "Adaga Divina Sombria",
          type: "equipment",
          price: 1e5,
          level_required: 35,
          stats: { agility: 150, stealth: 200 },
          description: "Adaga divina de poder sombrio",
          category: "Armas Sombrias"
        }
      ],
      40: [
        {
          id: "armadura_divina_sombria",
          name: "Armadura Divina Sombria",
          type: "equipment",
          price: 15e4,
          level_required: 40,
          stats: { stealth: 250, agility: 200 },
          description: "Armadura divina de poder sombrio",
          category: "Armaduras Sombrias"
        }
      ],
      45: [
        {
          id: "adaga_celestial_sombria",
          name: "Adaga Celestial Sombria",
          type: "equipment",
          price: 5e5,
          level_required: 45,
          stats: { agility: 300, stealth: 400 },
          description: "Adaga celestial de poder sombrio",
          category: "Armas Sombrias"
        }
      ],
      50: [
        {
          id: "armadura_celestial_sombria",
          name: "Armadura Celestial Sombria",
          type: "equipment",
          price: 1e6,
          level_required: 50,
          stats: { stealth: 500, agility: 400 },
          description: "Armadura celestial de poder sombrio supremo",
          category: "Armaduras Sombrias"
        }
      ]
    }
  };
  return ((_a = classItemsByLevel[characterClass]) == null ? void 0 : _a[level]) || [];
};

const getBaseItems = (level) => {
  const baseItemsByLevel = {
    // Níveis 1-10: Itens básicos
    1: [
      {
        id: "pocao_vida_basica",
        name: "Po\xE7\xE3o de Vida B\xE1sica",
        type: "potion",
        price: 25,
        level_required: 1,
        description: "Restaura 50 pontos de vida",
        category: "Consum\xEDveis"
      },
      {
        id: "espada_basica",
        name: "Espada B\xE1sica",
        type: "equipment",
        price: 100,
        level_required: 1,
        stats: { strength: 5, damage: 10 },
        description: "Espada simples para iniciantes",
        category: "Armas"
      }
    ],
    2: [
      {
        id: "armadura_basica",
        name: "Armadura B\xE1sica",
        type: "equipment",
        price: 150,
        level_required: 2,
        stats: { defense: 8, health: 20 },
        description: "Armadura simples de prote\xE7\xE3o",
        category: "Armaduras"
      }
    ],
    3: [
      {
        id: "pocao_vida_media",
        name: "Po\xE7\xE3o de Vida M\xE9dia",
        type: "potion",
        price: 75,
        level_required: 3,
        description: "Restaura 100 pontos de vida",
        category: "Consum\xEDveis"
      }
    ],
    4: [
      {
        id: "espada_ferro",
        name: "Espada de Ferro",
        type: "equipment",
        price: 300,
        level_required: 4,
        stats: { strength: 8, damage: 15 },
        description: "Espada de ferro mais resistente",
        category: "Armas"
      }
    ],
    5: [
      {
        id: "armadura_ferro",
        name: "Armadura de Ferro",
        type: "equipment",
        price: 400,
        level_required: 5,
        stats: { defense: 12, health: 30 },
        description: "Armadura de ferro resistente",
        category: "Armaduras"
      }
    ],
    // Níveis 6-10: Itens intermediários
    6: [
      {
        id: "pocao_vida_avancada",
        name: "Po\xE7\xE3o de Vida Avan\xE7ada",
        type: "potion",
        price: 150,
        level_required: 6,
        description: "Restaura 200 pontos de vida",
        category: "Consum\xEDveis"
      }
    ],
    7: [
      {
        id: "espada_aco",
        name: "Espada de A\xE7o",
        type: "equipment",
        price: 600,
        level_required: 7,
        stats: { strength: 12, damage: 20 },
        description: "Espada de a\xE7o afiada",
        category: "Armas"
      }
    ],
    8: [
      {
        id: "armadura_aco",
        name: "Armadura de A\xE7o",
        type: "equipment",
        price: 800,
        level_required: 8,
        stats: { defense: 18, health: 50 },
        description: "Armadura de a\xE7o resistente",
        category: "Armaduras"
      }
    ],
    9: [
      {
        id: "anel_forca",
        name: "Anel de For\xE7a",
        type: "equipment",
        price: 1e3,
        level_required: 9,
        stats: { strength: 15 },
        description: "Anel que aumenta a for\xE7a",
        category: "Acess\xF3rios"
      }
    ],
    10: [
      {
        id: "botas_velocidade",
        name: "Botas de Velocidade",
        type: "equipment",
        price: 1200,
        level_required: 10,
        stats: { agility: 15 },
        description: "Botas que aumentam a agilidade",
        category: "Acess\xF3rios"
      }
    ],
    // Níveis 11-20: Itens avançados
    15: [
      {
        id: "espada_magica",
        name: "Espada M\xE1gica",
        type: "equipment",
        price: 5e3,
        level_required: 15,
        stats: { strength: 20, damage: 35 },
        description: "Espada imbu\xEDda com magia",
        category: "Armas"
      }
    ],
    20: [
      {
        id: "armadura_magica",
        name: "Armadura M\xE1gica",
        type: "equipment",
        price: 8e3,
        level_required: 20,
        stats: { defense: 30, health: 100 },
        description: "Armadura protegida por magia",
        category: "Armaduras"
      }
    ],
    // Níveis 21-30: Itens épicos
    25: [
      {
        id: "espada_epica",
        name: "Espada \xC9pica",
        type: "equipment",
        price: 25e3,
        level_required: 25,
        stats: { strength: 35, damage: 60 },
        description: "Espada de poder \xE9pico",
        category: "Armas"
      }
    ],
    30: [
      {
        id: "armadura_epica",
        name: "Armadura \xC9pica",
        type: "equipment",
        price: 4e4,
        level_required: 30,
        stats: { defense: 50, health: 200 },
        description: "Armadura de poder \xE9pico",
        category: "Armaduras"
      }
    ],
    // Níveis 31-40: Itens lendários
    35: [
      {
        id: "espada_lendaria",
        name: "Espada Lend\xE1ria",
        type: "equipment",
        price: 1e5,
        level_required: 35,
        stats: { strength: 60, damage: 100 },
        description: "Espada de poder lend\xE1rio",
        category: "Armas"
      }
    ],
    40: [
      {
        id: "armadura_lendaria",
        name: "Armadura Lend\xE1ria",
        type: "equipment",
        price: 15e4,
        level_required: 40,
        stats: { defense: 80, health: 400 },
        description: "Armadura de poder lend\xE1rio",
        category: "Armaduras"
      }
    ],
    // Níveis 11-20: Itens avançados
    11: [
      {
        id: "pocao_vida_superior",
        name: "Po\xE7\xE3o de Vida Superior",
        type: "potion",
        price: 300,
        level_required: 11,
        description: "Restaura 300 pontos de vida",
        category: "Consum\xEDveis"
      }
    ],
    12: [
      {
        id: "espada_avancada",
        name: "Espada Avan\xE7ada",
        type: "equipment",
        price: 1500,
        level_required: 12,
        stats: { strength: 18, damage: 25 },
        description: "Espada de tecnologia avan\xE7ada",
        category: "Armas"
      }
    ],
    13: [
      {
        id: "armadura_avancada",
        name: "Armadura Avan\xE7ada",
        type: "equipment",
        price: 2e3,
        level_required: 13,
        stats: { defense: 25, health: 80 },
        description: "Armadura com tecnologia avan\xE7ada",
        category: "Armaduras"
      }
    ],
    14: [
      {
        id: "anel_poder",
        name: "Anel de Poder",
        type: "equipment",
        price: 2500,
        level_required: 14,
        stats: { strength: 20, magic_power: 15 },
        description: "Anel que aumenta poder f\xEDsico e m\xE1gico",
        category: "Acess\xF3rios"
      }
    ],
    16: [
      {
        id: "armadura_magica",
        name: "Armadura M\xE1gica",
        type: "equipment",
        price: 6e3,
        level_required: 16,
        stats: { defense: 35, health: 120 },
        description: "Armadura protegida por magia",
        category: "Armaduras"
      }
    ],
    17: [
      {
        id: "botas_magicas",
        name: "Botas M\xE1gicas",
        type: "equipment",
        price: 3500,
        level_required: 17,
        stats: { agility: 25, magic_power: 10 },
        description: "Botas que aumentam agilidade e poder m\xE1gico",
        category: "Acess\xF3rios"
      }
    ],
    18: [
      {
        id: "luvas_poder",
        name: "Luvas de Poder",
        type: "equipment",
        price: 4e3,
        level_required: 18,
        stats: { strength: 25, damage: 15 },
        description: "Luvas que aumentam for\xE7a e dano",
        category: "Acess\xF3rios"
      }
    ],
    19: [
      {
        id: "capacete_sabedoria",
        name: "Capacete da Sabedoria",
        type: "equipment",
        price: 4500,
        level_required: 19,
        stats: { intelligence: 30, magic_power: 20 },
        description: "Capacete que aumenta intelig\xEAncia e poder m\xE1gico",
        category: "Acess\xF3rios"
      }
    ],
    // Níveis 21-30: Itens épicos
    21: [
      {
        id: "pocao_vida_epica",
        name: "Po\xE7\xE3o de Vida \xC9pica",
        type: "potion",
        price: 800,
        level_required: 21,
        description: "Restaura 500 pontos de vida",
        category: "Consum\xEDveis"
      }
    ],
    22: [
      {
        id: "espada_epica_inicial",
        name: "Espada \xC9pica Inicial",
        type: "equipment",
        price: 12e3,
        level_required: 22,
        stats: { strength: 30, damage: 45 },
        description: "Primeira espada de poder \xE9pico",
        category: "Armas"
      }
    ],
    23: [
      {
        id: "armadura_epica_inicial",
        name: "Armadura \xC9pica Inicial",
        type: "equipment",
        price: 15e3,
        level_required: 23,
        stats: { defense: 40, health: 150 },
        description: "Primeira armadura de poder \xE9pico",
        category: "Armaduras"
      }
    ],
    24: [
      {
        id: "anel_epico",
        name: "Anel \xC9pico",
        type: "equipment",
        price: 1e4,
        level_required: 24,
        stats: { strength: 35, magic_power: 25 },
        description: "Anel de poder \xE9pico",
        category: "Acess\xF3rios"
      }
    ],
    26: [
      {
        id: "armadura_epica",
        name: "Armadura \xC9pica",
        type: "equipment",
        price: 3e4,
        level_required: 26,
        stats: { defense: 45, health: 180 },
        description: "Armadura de poder \xE9pico",
        category: "Armaduras"
      }
    ],
    27: [
      {
        id: "botas_epicas",
        name: "Botas \xC9picas",
        type: "equipment",
        price: 18e3,
        level_required: 27,
        stats: { agility: 40, magic_power: 20 },
        description: "Botas de poder \xE9pico",
        category: "Acess\xF3rios"
      }
    ],
    28: [
      {
        id: "luvas_epicas",
        name: "Luvas \xC9picas",
        type: "equipment",
        price: 2e4,
        level_required: 28,
        stats: { strength: 40, damage: 25 },
        description: "Luvas de poder \xE9pico",
        category: "Acess\xF3rios"
      }
    ],
    29: [
      {
        id: "capacete_epico",
        name: "Capacete \xC9pico",
        type: "equipment",
        price: 22e3,
        level_required: 29,
        stats: { intelligence: 45, magic_power: 30 },
        description: "Capacete de poder \xE9pico",
        category: "Acess\xF3rios"
      }
    ],
    // Níveis 31-40: Itens lendários
    31: [
      {
        id: "pocao_vida_lendaria",
        name: "Po\xE7\xE3o de Vida Lend\xE1ria",
        type: "potion",
        price: 2e3,
        level_required: 31,
        description: "Restaura 800 pontos de vida",
        category: "Consum\xEDveis"
      }
    ],
    32: [
      {
        id: "espada_lendaria_inicial",
        name: "Espada Lend\xE1ria Inicial",
        type: "equipment",
        price: 6e4,
        level_required: 32,
        stats: { strength: 50, damage: 80 },
        description: "Primeira espada de poder lend\xE1rio",
        category: "Armas"
      }
    ],
    33: [
      {
        id: "armadura_lendaria_inicial",
        name: "Armadura Lend\xE1ria Inicial",
        type: "equipment",
        price: 75e3,
        level_required: 33,
        stats: { defense: 60, health: 250 },
        description: "Primeira armadura de poder lend\xE1rio",
        category: "Armaduras"
      }
    ],
    34: [
      {
        id: "anel_lendario",
        name: "Anel Lend\xE1rio",
        type: "equipment",
        price: 5e4,
        level_required: 34,
        stats: { strength: 55, magic_power: 40 },
        description: "Anel de poder lend\xE1rio",
        category: "Acess\xF3rios"
      }
    ],
    36: [
      {
        id: "armadura_lendaria",
        name: "Armadura Lend\xE1ria",
        type: "equipment",
        price: 12e4,
        level_required: 36,
        stats: { defense: 70, health: 300 },
        description: "Armadura de poder lend\xE1rio",
        category: "Armaduras"
      }
    ],
    37: [
      {
        id: "botas_lendarias",
        name: "Botas Lend\xE1rias",
        type: "equipment",
        price: 8e4,
        level_required: 37,
        stats: { agility: 60, magic_power: 30 },
        description: "Botas de poder lend\xE1rio",
        category: "Acess\xF3rios"
      }
    ],
    38: [
      {
        id: "luvas_lendarias",
        name: "Luvas Lend\xE1rias",
        type: "equipment",
        price: 9e4,
        level_required: 38,
        stats: { strength: 65, damage: 35 },
        description: "Luvas de poder lend\xE1rio",
        category: "Acess\xF3rios"
      }
    ],
    39: [
      {
        id: "capacete_lendario",
        name: "Capacete Lend\xE1rio",
        type: "equipment",
        price: 95e3,
        level_required: 39,
        stats: { intelligence: 70, magic_power: 45 },
        description: "Capacete de poder lend\xE1rio",
        category: "Acess\xF3rios"
      }
    ],
    // Níveis 41-50: Itens míticos
    41: [
      {
        id: "pocao_vida_mistica",
        name: "Po\xE7\xE3o de Vida M\xEDstica",
        type: "potion",
        price: 5e3,
        level_required: 41,
        description: "Restaura 1200 pontos de vida",
        category: "Consum\xEDveis"
      }
    ],
    42: [
      {
        id: "espada_mistica_inicial",
        name: "Espada M\xEDstica Inicial",
        type: "equipment",
        price: 3e5,
        level_required: 42,
        stats: { strength: 80, damage: 150 },
        description: "Primeira espada de poder m\xEDstico",
        category: "Armas"
      }
    ],
    43: [
      {
        id: "armadura_mistica_inicial",
        name: "Armadura M\xEDstica Inicial",
        type: "equipment",
        price: 4e5,
        level_required: 43,
        stats: { defense: 100, health: 500 },
        description: "Primeira armadura de poder m\xEDstico",
        category: "Armaduras"
      }
    ],
    44: [
      {
        id: "anel_mistico",
        name: "Anel M\xEDstico",
        type: "equipment",
        price: 25e4,
        level_required: 44,
        stats: { strength: 85, magic_power: 70 },
        description: "Anel de poder m\xEDstico",
        category: "Acess\xF3rios"
      }
    ],
    45: [
      {
        id: "espada_mistica",
        name: "Espada M\xEDstica",
        type: "equipment",
        price: 5e5,
        level_required: 45,
        stats: { strength: 100, damage: 200 },
        description: "Espada de poder m\xEDstico",
        category: "Armas"
      }
    ],
    46: [
      {
        id: "armadura_mistica",
        name: "Armadura M\xEDstica",
        type: "equipment",
        price: 6e5,
        level_required: 46,
        stats: { defense: 120, health: 600 },
        description: "Armadura de poder m\xEDstico",
        category: "Armaduras"
      }
    ],
    47: [
      {
        id: "botas_misticas",
        name: "Botas M\xEDsticas",
        type: "equipment",
        price: 4e5,
        level_required: 47,
        stats: { agility: 90, magic_power: 60 },
        description: "Botas de poder m\xEDstico",
        category: "Acess\xF3rios"
      }
    ],
    48: [
      {
        id: "luvas_misticas",
        name: "Luvas M\xEDsticas",
        type: "equipment",
        price: 45e4,
        level_required: 48,
        stats: { strength: 95, damage: 50 },
        description: "Luvas de poder m\xEDstico",
        category: "Acess\xF3rios"
      }
    ],
    49: [
      {
        id: "capacete_mistico",
        name: "Capacete M\xEDstico",
        type: "equipment",
        price: 48e4,
        level_required: 49,
        stats: { intelligence: 100, magic_power: 80 },
        description: "Capacete de poder m\xEDstico",
        category: "Acess\xF3rios"
      }
    ],
    50: [
      {
        id: "armadura_mistica",
        name: "Armadura M\xEDstica",
        type: "equipment",
        price: 1e6,
        level_required: 50,
        stats: { defense: 150, health: 800 },
        description: "Armadura de poder m\xEDstico supremo",
        category: "Armaduras"
      }
    ]
  };
  return baseItemsByLevel[level] || [];
};
const getClassItems = (level, characterClass) => {
  return getClassItemsExpanded(level, characterClass);
};
const getClassSpecificItems = (level, characterClass) => {
  const allItems = [];
  for (let i = 1; i <= level; i++) {
    const baseItems = getBaseItems(i);
    allItems.push(...baseItems);
  }
  for (let i = 1; i <= level; i++) {
    const classItems = getClassItems(i, characterClass);
    allItems.push(...classItems);
  }
  return allItems;
};
const findShopItemById = (itemId, level, characterClass) => {
  const allItems = getClassSpecificItems(level, characterClass);
  return allItems.find((item) => item.id === itemId);
};

export { findShopItemById as f, getClassSpecificItems as g };
//# sourceMappingURL=shopItems.mjs.map
