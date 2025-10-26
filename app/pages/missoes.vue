<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Missões
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Complete missões para ganhar recompensas especiais
      </p>
    </div>

    <!-- Character Info -->
    <div v-if="characterStore.currentCharacter" class="flex justify-center">
      <Card class="w-full max-w-md">
        <CardContent class="p-4 md:p-6">
          <div class="text-center">
            <h2
              class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {{ characterStore.currentCharacter.name }}
            </h2>
            <div
              class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400"
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          v-for="mission in dailyMissions"
          :key="mission.id"
          class="hover:shadow-lg transition-shadow"
        >
          <CardHeader class="pb-2">
            <CardTitle class="text-lg flex items-center gap-2">
              {{ mission.title }}
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ mission.description }}
            </p>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Progresso:</span>
              <span class="font-medium"
                >{{ mission.progress }}/{{ mission.target }}</span
              >
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Recompensas:</span>
              <span class="font-medium">
                {{ mission.rewards.xp }} XP, {{ mission.rewards.gold }} 🪙
                <span v-if="mission.rewards.materials"
                  >, {{ mission.rewards.materials }} ⚙️</span
                >
              </span>
            </div>
            <Button
              v-if="mission.completed"
              disabled
              variant="success"
              class="w-full"
            >
              ✅ Concluída
            </Button>
            <Button
              v-else-if="mission.progress >= mission.target"
              @click="claimDailyMission(mission.id)"
              :disabled="claiming"
              class="w-full"
            >
              {{ claiming ? "Resgatando..." : "Resgatar Recompensa" }}
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
      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">Carregando missões...</p>
      </div>
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          v-for="mission in missions"
          :key="mission.id"
          :class="{
            'hover:shadow-lg transition-shadow cursor-pointer':
              mission.available && !mission.completed,
            'opacity-60 cursor-not-allowed':
              !mission.available || mission.completed,
          }"
          @click="
            mission.available && !mission.completed
              ? startStoryMission(mission.id)
              : null
          "
        >
          <CardHeader class="pb-2">
            <CardTitle class="text-lg flex items-center gap-2">
              📖 {{ mission.title }}
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ mission.description }}
            </p>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Requisitos:</span>
              <span class="font-medium"
                >Nível {{ mission.required_level }}</span
              >
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Recompensas:</span>
              <span class="font-medium">
                {{ mission.rewards.xp }} XP, {{ mission.rewards.gold }} 🪙
                <span v-if="mission.rewards.materials"
                  >, {{ mission.rewards.materials }} ⚙️</span
                >
                <span v-if="mission.rewards.crystals"
                  >, {{ mission.rewards.crystals }} 💎</span
                >
              </span>
            </div>
            <Button
              v-if="mission.completed"
              disabled
              variant="success"
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
const loading = ref(false);
const missions = ref<any[]>([]);

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

const claimDailyMission = async (missionId: string) => {
  claiming.value = true;
  try {
    // Lógica para resgatar recompensa da missão diária
    const mission = dailyMissions.value.find((m) => m.id === missionId);
    if (mission) {
      mission.completed = true;
      // Adicionar XP e ouro ao personagem (simulado)
      if (characterStore.currentCharacter) {
        await characterStore.addXp(
          characterStore.currentCharacter.id,
          mission.rewards.xp
        );
        // Lógica para adicionar ouro e materiais
      }
    }
    // Notificação de sucesso
  } catch (error) {
    // Notificação de erro
  } finally {
    claiming.value = false;
  }
};

const startStoryMission = async (missionId: string) => {
  if (!characterStore.currentCharacter) return;

  starting.value = true;
  try {
    const token = useCookie("@mmo/ninja/token");
    const response = await $fetch("/api/missions/complete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: characterStore.currentCharacter.id,
        mission_id: missionId,
      },
    });

    if (response.success) {
      // Atualizar estado da missão
      const completedMission = missions.value.find((m) => m.id === missionId);
      if (completedMission) {
        completedMission.completed = true;
      }
      // Atualizar personagem no store (XP, etc.)
      await characterStore.loadCharacters();
      // Notificação de sucesso
    }
  } catch (error) {
    // Notificação de erro
  } finally {
    starting.value = false;
  }
};

const loadMissions = async () => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;
  try {
    const token = useCookie("@mmo/ninja/token");
    const response = await $fetch(
      `/api/missions?level=${characterStore.currentCharacter.level}&class=${characterStore.currentCharacter.class}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (response.success) {
      missions.value = response.data || [];
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const updateMissionProgress = () => {
  if (!characterStore.currentCharacter) return;

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
};

onMounted(async () => {
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0]);
    }
  }

  await loadMissions();
  updateMissionProgress();
});
</script>
