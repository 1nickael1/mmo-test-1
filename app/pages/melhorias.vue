<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Melhorias
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Construa e melhore sua base espacial
      </p>
    </div>

    <!-- Resources Display -->
    <div v-if="resources.length > 0" class="flex justify-center">
      <Card class="w-full max-w-4xl">
        <CardContent class="p-4 md:p-6">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div
              v-for="resource in resources"
              :key="resource.resource_type"
              class="space-y-2"
            >
              <div class="text-2xl">
                {{ getResourceIcon(resource.resource_type) }}
              </div>
              <div
                class="text-lg font-bold"
                :class="getResourceColor(resource.resource_type)"
              >
                {{ resource.amount.toLocaleString() }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {{ resource.resource_type }}
              </div>
            </div>
          </div>

          <!-- Resource Sources Info -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold mb-4 text-center">
              Como Obter Recursos
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div class="text-center">
                <div class="text-2xl mb-2">🪙</div>
                <h4 class="font-semibold mb-2">Ouro</h4>
                <ul class="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Batalhas (sempre)</li>
                  <li>• Missões</li>
                  <li>• Modo história</li>
                </ul>
              </div>
              <div class="text-center">
                <div class="text-2xl mb-2">⚙️</div>
                <h4 class="font-semibold mb-2">Materiais</h4>
                <ul class="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>
                    •
                    <NuxtLink
                      to="/mineracao"
                      class="text-blue-600 hover:underline"
                      >Mineração</NuxtLink
                    >
                  </li>
                  <li>• Batalhas (40% chance)</li>
                  <li>• Missões especiais</li>
                </ul>
              </div>
              <div class="text-center">
                <div class="text-2xl mb-2">💎</div>
                <h4 class="font-semibold mb-2">Cristais</h4>
                <ul class="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>
                    •
                    <NuxtLink
                      to="/mineracao"
                      class="text-blue-600 hover:underline"
                      >Mineração</NuxtLink
                    >
                  </li>
                  <li>• Batalhas (10% chance)</li>
                  <li>• Missões de elite</li>
                  <li>• História avançada</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-lg text-gray-600 dark:text-gray-400">
        Carregando melhorias...
      </div>
    </div>

    <!-- Upgrades Content -->
    <div v-else class="space-y-8">
      <!-- Stat Upgrades -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Melhorias de Stats
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            v-for="upgrade in statUpgrades"
            :key="upgrade.id"
            class="hover:shadow-lg transition-all duration-200"
            :class="
              upgrade.can_afford && upgrade.can_upgrade
                ? 'cursor-pointer hover:scale-105'
                : 'opacity-60'
            "
            @click="
              upgrade.can_afford && upgrade.can_upgrade
                ? startUpgrade(upgrade.id)
                : null
            "
          >
            <CardHeader class="pb-2">
              <CardTitle class="text-lg flex items-center gap-2">
                <span class="text-blue-600 dark:text-blue-400">📈</span>
                {{ upgrade.name }}
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ upgrade.description }}
              </p>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Nível:</span>
                  <span class="font-medium"
                    >{{ upgrade.current_level }}/{{ upgrade.max_level }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Custo:</span>
                  <span class="font-medium"
                    >{{ upgrade.current_cost.gold }} 🪙</span
                  >
                </div>
                <div
                  v-if="upgrade.current_cost.materials > 0"
                  class="flex justify-between"
                >
                  <span class="text-gray-600 dark:text-gray-400"
                    >Materiais:</span
                  >
                  <span class="font-medium"
                    >{{ upgrade.current_cost.materials }} ⚙️</span
                  >
                </div>
              </div>

              <!-- Action Button -->
              <Button
                v-if="upgrade.can_afford && upgrade.can_upgrade"
                @click.stop="startUpgrade(upgrade.id)"
                :disabled="upgrading"
                class="w-full"
              >
                {{ upgrading ? "Melhorando..." : "Melhorar" }}
              </Button>
              <Button
                v-else-if="!upgrade.can_upgrade"
                disabled
                variant="outline"
                class="w-full"
              >
                Nível {{ getRequiredLevel(upgrade.id) }} Necessário
              </Button>
              <Button v-else disabled variant="outline" class="w-full">
                Recursos Insuficientes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Building Upgrades -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Melhorias de Base
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="upgrade in buildingUpgrades"
            :key="upgrade.id"
            class="hover:shadow-lg transition-all duration-200"
            :class="
              upgrade.can_afford && upgrade.can_upgrade
                ? 'cursor-pointer hover:scale-105'
                : 'opacity-60'
            "
            @click="
              upgrade.can_afford && upgrade.can_upgrade
                ? startUpgrade(upgrade.id)
                : null
            "
          >
            <CardHeader class="pb-2">
              <CardTitle class="text-lg flex items-center gap-2">
                <span class="text-green-600 dark:text-green-400">🏗️</span>
                {{ upgrade.name }}
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ upgrade.description }}
              </p>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Nível:</span>
                  <span class="font-medium"
                    >{{ upgrade.current_level }}/{{ upgrade.max_level }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Custo:</span>
                  <span class="font-medium"
                    >{{ upgrade.current_cost.gold }} 🪙</span
                  >
                </div>
                <div
                  v-if="upgrade.current_cost.materials > 0"
                  class="flex justify-between"
                >
                  <span class="text-gray-600 dark:text-gray-400"
                    >Materiais:</span
                  >
                  <span class="font-medium"
                    >{{ upgrade.current_cost.materials }} ⚙️</span
                  >
                </div>
                <div
                  v-if="upgrade.current_cost.crystals > 0"
                  class="flex justify-between"
                >
                  <span class="text-gray-600 dark:text-gray-400"
                    >Cristais:</span
                  >
                  <span class="font-medium"
                    >{{ upgrade.current_cost.crystals }} 💎</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Tempo:</span>
                  <span class="font-medium">{{
                    formatTime(upgrade.time_seconds || 0)
                  }}</span>
                </div>
              </div>

              <!-- Progress Indicator -->
              <div v-if="upgrade.time_remaining > 0" class="space-y-2">
                <div class="text-xs text-gray-600 dark:text-gray-400">
                  Tempo restante:
                  {{ formatTimeRemaining(upgrade.time_remaining) }}
                </div>
                <Progress :value="getProgressValue(upgrade)" class="h-2" />
              </div>

              <!-- Action Button -->
              <Button
                v-if="
                  upgrade.can_afford &&
                  upgrade.can_upgrade &&
                  upgrade.time_remaining <= 0
                "
                @click.stop="startUpgrade(upgrade.id)"
                :disabled="upgrading"
                class="w-full"
              >
                {{ upgrading ? "Iniciando..." : "Iniciar Construção" }}
              </Button>
              <Button
                v-else-if="upgrade.time_remaining > 0"
                disabled
                variant="outline"
                class="w-full"
              >
                Em Construção
              </Button>
              <Button
                v-else-if="!upgrade.can_upgrade"
                disabled
                variant="outline"
                class="w-full"
              >
                Nível {{ getRequiredLevel(upgrade.id) }} Necessário
              </Button>
              <Button v-else disabled variant="outline" class="w-full">
                Recursos Insuficientes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useCharacterStore } from "~/stores/character";
import type { Resource } from "~/types";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();

const loading = ref(false);
const upgrading = ref(false);
const resources = ref<Resource[]>([]);
const upgrades = ref<any[]>([]);
const refreshInterval = ref<NodeJS.Timeout | null>(null);

const statUpgrades = computed(() =>
  upgrades.value.filter((u) => u.type === "stat")
);

const buildingUpgrades = computed(() =>
  upgrades.value.filter((u) => u.type === "building")
);

const getResourceIcon = (type: string) => {
  switch (type) {
    case "ouro":
      return "🪙";
    case "cristais":
      return "💎";
    case "materiais":
      return "⚙️";
    default:
      return "📦";
  }
};

const getResourceColor = (type: string) => {
  switch (type) {
    case "ouro":
      return "text-yellow-600 dark:text-yellow-400";
    case "cristais":
      return "text-blue-600 dark:text-blue-400";
    case "materiais":
      return "text-gray-600 dark:text-gray-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

const formatTime = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
};

const formatTimeRemaining = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  return formatTime(seconds);
};

const getProgressValue = (upgrade: any) => {
  if (!upgrade.time_remaining || !upgrade.time_seconds) return 0;
  const totalTime = upgrade.time_seconds * 1000;
  const elapsed = totalTime - upgrade.time_remaining;
  return (elapsed / totalTime) * 100;
};

const getRequiredLevel = (upgradeId: string) => {
  const id = parseInt(upgradeId);
  // Mapear IDs para níveis necessários
  const levelMap: Record<number, number> = {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
    9: 5,
    10: 5,
    11: 6,
    12: 6,
    13: 7,
    14: 7,
    15: 8,
    16: 8,
    17: 9,
    18: 9,
    19: 10,
    20: 10,
    21: 11,
    22: 11,
    23: 12,
    24: 12,
    25: 13,
    26: 13,
    27: 14,
    28: 14,
    29: 15,
    30: 15,
    31: 16,
    32: 16,
    33: 17,
    34: 17,
    35: 18,
    36: 18,
    37: 19,
    38: 19,
    39: 20,
    40: 20,
    41: 21,
    42: 21,
    43: 22,
    44: 22,
    45: 23,
    46: 23,
    47: 24,
    48: 24,
    49: 25,
    50: 25,
    51: 26,
    52: 26,
    53: 27,
    54: 27,
    55: 28,
    56: 28,
    57: 29,
    58: 29,
    59: 30,
    60: 30,
    61: 31,
    62: 31,
    63: 32,
    64: 32,
    65: 33,
    66: 33,
    67: 34,
    68: 34,
    69: 35,
    70: 35,
    71: 36,
    72: 36,
    73: 37,
    74: 37,
    75: 38,
    76: 38,
    77: 39,
    78: 39,
    79: 40,
    80: 40,
    81: 41,
    82: 41,
    83: 42,
    84: 42,
    85: 43,
    86: 43,
    87: 44,
    88: 44,
    89: 45,
    90: 45,
    91: 46,
    92: 46,
    93: 47,
    94: 47,
    95: 48,
    96: 48,
    97: 49,
    98: 49,
    99: 50,
    100: 50,
  };
  return levelMap[id] || 1;
};

// Função para atualizar contadores de tempo em tempo real
const updateTimers = () => {
  upgrades.value = upgrades.value.map((upgrade) => {
    if (upgrade.time_remaining > 0) {
      // Reduzir 1 segundo do tempo restante
      const newTimeRemaining = Math.max(0, upgrade.time_remaining - 1000);

      // Se o tempo acabou, marcar como concluído
      if (newTimeRemaining === 0) {
        return {
          ...upgrade,
          time_remaining: 0,
          can_upgrade: true,
          current_level: upgrade.current_level + 1,
        };
      }

      return {
        ...upgrade,
        time_remaining: newTimeRemaining,
      };
    }
    return upgrade;
  });
};

const loadData = async () => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;

  try {
    // Carregar recursos
    const resourcesResponse = await $fetch(
      `/api/resources/${characterStore.currentCharacter.id}`
    );
    resources.value = resourcesResponse.data || [];

    // Carregar melhorias disponíveis
    const upgradesResponse = await $fetch(
      `/api/upgrades/available?level=${characterStore.currentCharacter.level}&characterId=${characterStore.currentCharacter.id}`
    );
    const allUpgrades = upgradesResponse.data || [];

    // Calcular se pode pagar cada melhoria
    const goldResource = resources.value.find(
      (r) => r.resource_type === "ouro"
    );
    const materialsResource = resources.value.find(
      (r) => r.resource_type === "materiais"
    );
    const crystalsResource = resources.value.find(
      (r) => r.resource_type === "cristais"
    );

    const currentGold = goldResource?.amount || 0;
    const currentMaterials = materialsResource?.amount || 0;
    const currentCrystals = crystalsResource?.amount || 0;

    upgrades.value = allUpgrades.map((upgrade) => ({
      ...upgrade,
      can_afford:
        currentGold >= (upgrade.current_cost?.gold || 0) &&
        currentMaterials >= (upgrade.current_cost?.materials || 0) &&
        currentCrystals >= (upgrade.current_cost?.crystals || 0),
    }));
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  } finally {
    loading.value = false;
  }
};

const startUpgrade = async (upgradeId: string) => {
  if (!characterStore.currentCharacter) return;

  upgrading.value = true;

  try {
    const response = await $fetch("/api/upgrades/start", {
      method: "POST",
      body: {
        character_id: characterStore.currentCharacter.id,
        upgrade_id: upgradeId,
      },
    });

    if (response.success) {
      // Recarregar dados
      await loadData();
      // Atualizar personagem no store
      await characterStore.loadCharacters();
    }
  } catch (error: any) {
    console.error("Erro ao iniciar melhoria:", error);
    // Aqui você pode adicionar um toast de erro
  } finally {
    upgrading.value = false;
  }
};

const completeUpgrade = async (upgradeId: string) => {
  if (!characterStore.currentCharacter) return;

  upgrading.value = true;

  try {
    const response = await $fetch("/api/upgrades/complete", {
      method: "POST",
      body: {
        character_id: characterStore.currentCharacter.id,
        upgrade_id: upgradeId,
      },
    });

    if (response.success) {
      // Recarregar dados
      await loadData();
      // Atualizar personagem no store
      await characterStore.loadCharacters();
    }
  } catch (error: any) {
    console.error("Erro ao completar melhoria:", error);
    // Aqui você pode adicionar um toast de erro
  } finally {
    upgrading.value = false;
  }
};

onMounted(async () => {
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0]);
    }
  }

  await loadData();

  // Atualizar contadores de tempo a cada segundo
  refreshInterval.value = setInterval(updateTimers, 1000);
});

onUnmounted(() => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value);
  }
});
</script>
