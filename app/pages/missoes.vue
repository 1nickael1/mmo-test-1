<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Missões
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Complete missões para ganhar recompensas especiais
      </p>
    </div>

    <!-- Character Info -->
    <div v-if="characterStore.currentCharacter" class="flex justify-center">
      <Card class="w-full max-w-md">
        <CardContent class="p-6">
          <div class="text-center">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ characterStore.currentCharacter.name }}
            </h2>
            <div
              class="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400"
            >
              <Badge
                :variant="
                  characterStore.currentCharacter.class === 'ninja'
                    ? 'default'
                    : 'secondary'
                "
              >
                {{
                  characterStore.currentCharacter.class === "ninja"
                    ? "🥷 Ninja"
                    : "🚀 Guerreiro"
                }}
              </Badge>
              <span>Nível {{ characterStore.currentCharacter.level }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Daily Missions -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Missões Diárias
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          v-for="mission in dailyMissions"
          :key="mission.id"
          class="hover:shadow-lg transition-all duration-200"
          :class="
            mission.completed
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : ''
          "
        >
          <CardHeader class="pb-2">
            <CardTitle class="text-lg flex items-center gap-2">
              <span class="text-blue-600 dark:text-blue-400">📋</span>
              {{ mission.title }}
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ mission.description }}
            </p>

            <!-- Progress -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Progresso:</span>
                <span class="font-medium"
                  >{{ mission.progress }}/{{ mission.target }}</span
                >
              </div>
              <Progress
                :value="(mission.progress / mission.target) * 100"
                class="h-2"
              />
            </div>

            <!-- Rewards -->
            <div class="space-y-2 text-sm">
              <h4 class="font-medium text-gray-900 dark:text-white">
                Recompensas:
              </h4>
              <div class="flex flex-wrap gap-2">
                <Badge v-if="mission.rewards.xp > 0" variant="secondary">
                  {{ mission.rewards.xp }} XP
                </Badge>
                <Badge v-if="mission.rewards.gold > 0" variant="outline">
                  {{ mission.rewards.gold }} 🪙
                </Badge>
                <Badge v-if="mission.rewards.materials > 0" variant="outline">
                  {{ mission.rewards.materials }} ⚙️
                </Badge>
                <Badge v-if="mission.rewards.crystals > 0" variant="outline">
                  {{ mission.rewards.crystals }} 💎
                </Badge>
              </div>
            </div>

            <!-- Action Button -->
            <Button
              v-if="mission.completed"
              disabled
              variant="outline"
              class="w-full"
            >
              ✅ Concluída
            </Button>
            <Button
              v-else-if="mission.progress >= mission.target"
              @click="claimReward(mission.id)"
              :disabled="claiming"
              class="w-full"
            >
              {{ claiming ? "Reivindicando..." : "Reivindicar Recompensa" }}
            </Button>
            <Button v-else disabled variant="outline" class="w-full">
              Em Progresso
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Story Missions -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Missões da História
      </h2>
      <div class="grid md:grid-cols-2 gap-4">
        <Card
          v-for="mission in storyMissions"
          :key="mission.id"
          class="hover:shadow-lg transition-all duration-200"
          :class="
            mission.completed
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : ''
          "
        >
          <CardHeader class="pb-2">
            <CardTitle class="text-lg flex items-center gap-2">
              <span class="text-purple-600 dark:text-purple-400">📖</span>
              {{ mission.title }}
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ mission.description }}
            </p>

            <!-- Requirements -->
            <div v-if="mission.requirements" class="space-y-2 text-sm">
              <h4 class="font-medium text-gray-900 dark:text-white">
                Requisitos:
              </h4>
              <ul class="space-y-1">
                <li
                  v-for="req in mission.requirements"
                  :key="req"
                  class="flex items-center gap-2"
                >
                  <span class="text-green-600">✅</span>
                  <span class="text-gray-600 dark:text-gray-400">{{
                    req
                  }}</span>
                </li>
              </ul>
            </div>

            <!-- Rewards -->
            <div class="space-y-2 text-sm">
              <h4 class="font-medium text-gray-900 dark:text-white">
                Recompensas:
              </h4>
              <div class="flex flex-wrap gap-2">
                <Badge v-if="mission.rewards.xp > 0" variant="secondary">
                  {{ mission.rewards.xp }} XP
                </Badge>
                <Badge v-if="mission.rewards.gold > 0" variant="outline">
                  {{ mission.rewards.gold }} 🪙
                </Badge>
                <Badge v-if="mission.rewards.items" variant="outline">
                  {{ mission.rewards.items.join(", ") }}
                </Badge>
              </div>
            </div>

            <!-- Action Button -->
            <Button
              v-if="mission.completed"
              disabled
              variant="outline"
              class="w-full"
            >
              ✅ Concluída
            </Button>
            <Button
              v-else-if="mission.available"
              @click="startStoryMission(mission.id)"
              :disabled="starting"
              class="w-full"
            >
              {{ starting ? "Iniciando..." : "Iniciar Missão" }}
            </Button>
            <Button v-else disabled variant="outline" class="w-full">
              Bloqueada
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCharacterStore } from "~/stores/character";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();

const claiming = ref(false);
const starting = ref(false);

// Missões diárias (simuladas)
const dailyMissions = ref([
  {
    id: "daily_battle_1",
    title: "Guerreiro Destemido",
    description: "Vença 3 batalhas contra oponentes",
    progress: 0,
    target: 3,
    completed: false,
    rewards: { xp: 200, gold: 100, materials: 5 },
  },
  {
    id: "daily_skill_1",
    title: "Aprendiz Sábio",
    description: "Aprenda 1 nova habilidade",
    progress: 0,
    target: 1,
    completed: false,
    rewards: { xp: 150, gold: 75, crystals: 2 },
  },
  {
    id: "daily_upgrade_1",
    title: "Construtor",
    description: "Complete 1 melhoria de base",
    progress: 0,
    target: 1,
    completed: false,
    rewards: { xp: 300, gold: 200, materials: 10 },
  },
]);

// Missões da história (simuladas)
const storyMissions = ref([
  {
    id: "story_1",
    title: "Primeiros Passos",
    description:
      "Complete seu primeiro treinamento e torne-se um verdadeiro ninja espacial.",
    completed: false,
    available: true,
    requirements: ["Nível 2", "Aprender 2 habilidades"],
    rewards: { xp: 500, gold: 300, items: ["Espada de Energia"] },
  },
  {
    id: "story_2",
    title: "Ameaça Espacial",
    description: "Derrote o Lorde das Sombras e proteja a galáxia.",
    completed: false,
    available: false,
    requirements: ["Nível 5", "Derrotar 10 oponentes"],
    rewards: { xp: 1000, gold: 500, items: ["Armadura Espacial"] },
  },
  {
    id: "story_3",
    title: "Mestre das Artes",
    description:
      "Domine todas as técnicas ninja e torne-se um verdadeiro mestre.",
    completed: false,
    available: false,
    requirements: ["Nível 8", "Aprender todas as habilidades"],
    rewards: { xp: 2000, gold: 1000, items: ["Cristal do Poder"] },
  },
]);

const claimReward = async (missionId: string) => {
  claiming.value = true;

  try {
    // Simular reivindicação de recompensa
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mission = dailyMissions.value.find((m) => m.id === missionId);
    if (mission) {
      mission.completed = true;
      // Aqui você adicionaria a lógica para dar as recompensas ao jogador
    }
  } catch (error) {
    console.error("Erro ao reivindicar recompensa:", error);
  } finally {
    claiming.value = false;
  }
};

const startStoryMission = async (missionId: string) => {
  starting.value = true;

  try {
    // Simular início de missão
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mission = storyMissions.value.find((m) => m.id === missionId);
    if (mission) {
      mission.available = false;
      // Aqui você adicionaria a lógica para iniciar a missão
    }
  } catch (error) {
    console.error("Erro ao iniciar missão:", error);
  } finally {
    starting.value = false;
  }
};

onMounted(async () => {
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0]);
    }
  }

  // Simular progresso das missões baseado no personagem
  if (characterStore.currentCharacter) {
    // Atualizar missões baseado no progresso do personagem
    const character = characterStore.currentCharacter;

    // Missão de batalhas (simular progresso)
    const battleMission = dailyMissions.value.find(
      (m) => m.id === "daily_battle_1"
    );
    if (battleMission) {
      battleMission.progress = Math.min(3, Math.floor(character.level / 2));
    }

    // Missão de habilidades (simular progresso)
    const skillMission = dailyMissions.value.find(
      (m) => m.id === "daily_skill_1"
    );
    if (skillMission) {
      skillMission.progress = character.level >= 3 ? 1 : 0;
    }

    // Missão de melhorias (simular progresso)
    const upgradeMission = dailyMissions.value.find(
      (m) => m.id === "daily_upgrade_1"
    );
    if (upgradeMission) {
      upgradeMission.progress = character.level >= 4 ? 1 : 0;
    }

    // Atualizar disponibilidade das missões da história
    const story1 = storyMissions.value.find((m) => m.id === "story_1");
    if (story1) {
      story1.available = character.level >= 2;
    }

    const story2 = storyMissions.value.find((m) => m.id === "story_2");
    if (story2) {
      story2.available = character.level >= 5;
    }

    const story3 = storyMissions.value.find((m) => m.id === "story_3");
    if (story3) {
      story3.available = character.level >= 8;
    }
  }
});
</script>
