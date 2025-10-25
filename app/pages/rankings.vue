<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Rankings
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Veja os melhores jogadores da galáxia
      </p>
    </div>

    <!-- Ranking Categories -->
    <div class="flex justify-center">
      <Tabs v-model="activeTab" class="w-full max-w-4xl">
        <TabsList class="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="level">Nível</TabsTrigger>
          <TabsTrigger value="battles">Batalhas</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <!-- Level Ranking -->
        <TabsContent value="level" class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                🏆 Ranking por Nível
              </CardTitle>
              <CardDescription> Os jogadores com maior nível </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div
                  v-for="(player, index) in levelRanking"
                  :key="player.id"
                  class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg"
                  :class="
                    index < 3
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
                      : 'bg-gray-50 dark:bg-gray-800'
                  "
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      :class="getRankColor(index)"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="text-2xl">
                      {{ getRankIcon(index) }}
                    </div>
                  </div>

                  <div class="flex-1">
                    <div class="font-semibold text-gray-900 dark:text-white">
                      {{ player.name }}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{
                        player.class === "ninja"
                          ? "🥷 Ninja"
                          : "🚀 Guerreiro Espacial"
                      }}
                    </div>
                  </div>

                  <div class="text-right">
                    <div
                      class="font-bold text-lg text-blue-600 dark:text-blue-400"
                    >
                      Nível {{ player.level }}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{ player.xp.toLocaleString() }} XP
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Battles Ranking -->
        <TabsContent value="battles" class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                ⚔️ Ranking de Batalhas
              </CardTitle>
              <CardDescription> Os guerreiros mais vitoriosos </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div
                  v-for="(player, index) in battleRanking"
                  :key="player.id"
                  class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg"
                  :class="
                    index < 3
                      ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20'
                      : 'bg-gray-50 dark:bg-gray-800'
                  "
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      :class="getRankColor(index)"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="text-2xl">
                      {{ getRankIcon(index) }}
                    </div>
                  </div>

                  <div class="flex-1">
                    <div class="font-semibold text-gray-900 dark:text-white">
                      {{ player.name }}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{
                        player.class === "ninja"
                          ? "🥷 Ninja"
                          : "🚀 Guerreiro Espacial"
                      }}
                    </div>
                  </div>

                  <div class="text-right">
                    <div
                      class="font-bold text-lg text-red-600 dark:text-red-400"
                    >
                      {{ player.battles_won }} vitórias
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{ player.total_battles }} batalhas
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Skills Ranking -->
        <TabsContent value="skills" class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                🎯 Ranking de Habilidades
              </CardTitle>
              <CardDescription> Os mestres das artes ninja </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div
                  v-for="(player, index) in skillRanking"
                  :key="player.id"
                  class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg"
                  :class="
                    index < 3
                      ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'
                      : 'bg-gray-50 dark:bg-gray-800'
                  "
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      :class="getRankColor(index)"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="text-2xl">
                      {{ getRankIcon(index) }}
                    </div>
                  </div>

                  <div class="flex-1">
                    <div class="font-semibold text-gray-900 dark:text-white">
                      {{ player.name }}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{
                        player.class === "ninja"
                          ? "🥷 Ninja"
                          : "🚀 Guerreiro Espacial"
                      }}
                    </div>
                  </div>

                  <div class="text-right">
                    <div
                      class="font-bold text-lg text-purple-600 dark:text-purple-400"
                    >
                      {{ player.skills_learned }} habilidades
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Nível {{ player.level }}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Resources Ranking -->
        <TabsContent value="resources" class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                💰 Ranking de Recursos
              </CardTitle>
              <CardDescription> Os mais ricos da galáxia </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div
                  v-for="(player, index) in resourceRanking"
                  :key="player.id"
                  class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg"
                  :class="
                    index < 3
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                      : 'bg-gray-50 dark:bg-gray-800'
                  "
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      :class="getRankColor(index)"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="text-2xl">
                      {{ getRankIcon(index) }}
                    </div>
                  </div>

                  <div class="flex-1">
                    <div class="font-semibold text-gray-900 dark:text-white">
                      {{ player.name }}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{
                        player.class === "ninja"
                          ? "🥷 Ninja"
                          : "🚀 Guerreiro Espacial"
                      }}
                    </div>
                  </div>

                  <div class="text-right">
                    <div
                      class="font-bold text-lg text-green-600 dark:text-green-400"
                    >
                      {{ player.total_resources.toLocaleString() }} 🪙
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{ player.gold.toLocaleString() }} ouro
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

    <!-- Your Position -->
    <Card v-if="characterStore.currentCharacter" class="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle class="text-center">Sua Posição</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-center space-y-4">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ characterStore.currentCharacter.name }}
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div class="font-semibold text-blue-600 dark:text-blue-400">
                Nível {{ characterStore.currentCharacter.level }}
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                Posição: #{{ getPlayerRank("level") }}
              </div>
            </div>
            <div>
              <div class="font-semibold text-red-600 dark:text-red-400">
                {{ getPlayerBattles() }} vitórias
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                Posição: #{{ getPlayerRank("battles") }}
              </div>
            </div>
            <div>
              <div class="font-semibold text-purple-600 dark:text-purple-400">
                {{ getPlayerSkills() }} habilidades
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                Posição: #{{ getPlayerRank("skills") }}
              </div>
            </div>
            <div>
              <div class="font-semibold text-green-600 dark:text-green-400">
                {{ getPlayerResources() }} 🪙
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                Posição: #{{ getPlayerRank("resources") }}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCharacterStore } from "~/stores/character";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();

const activeTab = ref("level");

// Rankings simulados
const levelRanking = ref([
  { id: 1, name: "NarutoUzumaki", class: "ninja", level: 15, xp: 45000 },
  { id: 2, name: "SasukeUchiha", class: "ninja", level: 14, xp: 42000 },
  {
    id: 3,
    name: "SpaceWarrior99",
    class: "guerreiro_espacial",
    level: 13,
    xp: 38000,
  },
  { id: 4, name: "NinjaMaster", class: "ninja", level: 12, xp: 35000 },
  {
    id: 5,
    name: "GalaxyHero",
    class: "guerreiro_espacial",
    level: 11,
    xp: 32000,
  },
  { id: 6, name: "ShadowStrike", class: "ninja", level: 10, xp: 28000 },
  {
    id: 7,
    name: "CosmicGuardian",
    class: "guerreiro_espacial",
    level: 9,
    xp: 25000,
  },
  { id: 8, name: "WindJutsu", class: "ninja", level: 8, xp: 22000 },
  {
    id: 9,
    name: "StarFighter",
    class: "guerreiro_espacial",
    level: 7,
    xp: 18000,
  },
  { id: 10, name: "FireNinja", class: "ninja", level: 6, xp: 15000 },
]);

const battleRanking = ref([
  {
    id: 1,
    name: "NarutoUzumaki",
    class: "ninja",
    battles_won: 127,
    total_battles: 135,
  },
  {
    id: 2,
    name: "SasukeUchiha",
    class: "ninja",
    battles_won: 115,
    total_battles: 120,
  },
  {
    id: 3,
    name: "SpaceWarrior99",
    class: "guerreiro_espacial",
    battles_won: 98,
    total_battles: 105,
  },
  {
    id: 4,
    name: "NinjaMaster",
    class: "ninja",
    battles_won: 87,
    total_battles: 95,
  },
  {
    id: 5,
    name: "GalaxyHero",
    class: "guerreiro_espacial",
    battles_won: 76,
    total_battles: 85,
  },
  {
    id: 6,
    name: "ShadowStrike",
    class: "ninja",
    battles_won: 65,
    total_battles: 72,
  },
  {
    id: 7,
    name: "CosmicGuardian",
    class: "guerreiro_espacial",
    battles_won: 54,
    total_battles: 60,
  },
  {
    id: 8,
    name: "WindJutsu",
    class: "ninja",
    battles_won: 43,
    total_battles: 48,
  },
  {
    id: 9,
    name: "StarFighter",
    class: "guerreiro_espacial",
    battles_won: 32,
    total_battles: 38,
  },
  {
    id: 10,
    name: "FireNinja",
    class: "ninja",
    battles_won: 21,
    total_battles: 25,
  },
]);

const skillRanking = ref([
  {
    id: 1,
    name: "NarutoUzumaki",
    class: "ninja",
    skills_learned: 8,
    level: 15,
  },
  { id: 2, name: "SasukeUchiha", class: "ninja", skills_learned: 7, level: 14 },
  {
    id: 3,
    name: "SpaceWarrior99",
    class: "guerreiro_espacial",
    skills_learned: 6,
    level: 13,
  },
  { id: 4, name: "NinjaMaster", class: "ninja", skills_learned: 5, level: 12 },
  {
    id: 5,
    name: "GalaxyHero",
    class: "guerreiro_espacial",
    skills_learned: 4,
    level: 11,
  },
  { id: 6, name: "ShadowStrike", class: "ninja", skills_learned: 3, level: 10 },
  {
    id: 7,
    name: "CosmicGuardian",
    class: "guerreiro_espacial",
    skills_learned: 3,
    level: 9,
  },
  { id: 8, name: "WindJutsu", class: "ninja", skills_learned: 2, level: 8 },
  {
    id: 9,
    name: "StarFighter",
    class: "guerreiro_espacial",
    skills_learned: 2,
    level: 7,
  },
  { id: 10, name: "FireNinja", class: "ninja", skills_learned: 1, level: 6 },
]);

const resourceRanking = ref([
  {
    id: 1,
    name: "NarutoUzumaki",
    class: "ninja",
    total_resources: 125000,
    gold: 85000,
  },
  {
    id: 2,
    name: "SasukeUchiha",
    class: "ninja",
    total_resources: 98000,
    gold: 65000,
  },
  {
    id: 3,
    name: "SpaceWarrior99",
    class: "guerreiro_espacial",
    total_resources: 87000,
    gold: 58000,
  },
  {
    id: 4,
    name: "NinjaMaster",
    class: "ninja",
    total_resources: 72000,
    gold: 48000,
  },
  {
    id: 5,
    name: "GalaxyHero",
    class: "guerreiro_espacial",
    total_resources: 65000,
    gold: 42000,
  },
  {
    id: 6,
    name: "ShadowStrike",
    class: "ninja",
    total_resources: 54000,
    gold: 35000,
  },
  {
    id: 7,
    name: "CosmicGuardian",
    class: "guerreiro_espacial",
    total_resources: 43000,
    gold: 28000,
  },
  {
    id: 8,
    name: "WindJutsu",
    class: "ninja",
    total_resources: 32000,
    gold: 21000,
  },
  {
    id: 9,
    name: "StarFighter",
    class: "guerreiro_espacial",
    total_resources: 21000,
    gold: 14000,
  },
  {
    id: 10,
    name: "FireNinja",
    class: "ninja",
    total_resources: 15000,
    gold: 10000,
  },
]);

const getRankColor = (index: number) => {
  switch (index) {
    case 0:
      return "bg-yellow-500 text-white";
    case 1:
      return "bg-gray-400 text-white";
    case 2:
      return "bg-orange-600 text-white";
    default:
      return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

const getRankIcon = (index: number) => {
  switch (index) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return "🏅";
  }
};

const getPlayerRank = (type: string) => {
  if (!characterStore.currentCharacter) return "N/A";

  const player = characterStore.currentCharacter;

  switch (type) {
    case "level":
      return (
        levelRanking.value.findIndex((p) => p.level <= player.level) + 1 ||
        levelRanking.value.length + 1
      );
    case "battles":
      return (
        battleRanking.value.findIndex((p) => p.battles_won <= 0) + 1 ||
        battleRanking.value.length + 1
      );
    case "skills":
      return (
        skillRanking.value.findIndex((p) => p.skills_learned <= 0) + 1 ||
        skillRanking.value.length + 1
      );
    case "resources":
      return (
        resourceRanking.value.findIndex((p) => p.total_resources <= 1000) + 1 ||
        resourceRanking.value.length + 1
      );
    default:
      return "N/A";
  }
};

const getPlayerBattles = () => {
  // Simular número de batalhas baseado no nível
  return characterStore.currentCharacter
    ? Math.floor(characterStore.currentCharacter.level * 2.5)
    : 0;
};

const getPlayerSkills = () => {
  // Simular número de habilidades baseado no nível
  return characterStore.currentCharacter
    ? Math.min(6, Math.floor(characterStore.currentCharacter.level / 2))
    : 0;
};

const getPlayerResources = () => {
  // Simular recursos baseado no nível
  return characterStore.currentCharacter
    ? characterStore.currentCharacter.level * 1000
    : 0;
};

onMounted(async () => {
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0]);
    }
  }
});
</script>
