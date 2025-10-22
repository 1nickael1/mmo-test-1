<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Melhorias
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Construa e melhore sua base espacial
      </p>
    </div>

    <!-- Resources Display -->
    <div v-if="resources.length > 0" class="flex justify-center">
      <Card class="w-full max-w-4xl">
        <CardContent class="p-6">
          <div class="grid grid-cols-3 gap-4 text-center">
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
            <div class="grid md:grid-cols-3 gap-4 text-sm">
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
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                Nível Máximo
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
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                Nível Máximo
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

const loadData = async () => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;

  try {
    // Carregar recursos
    const resourcesResponse = await $fetch(
      `/api/resources/${characterStore.currentCharacter.id}`
    );
    resources.value = resourcesResponse.data || [];

    // Carregar melhorias
    const upgradesResponse = await $fetch(
      `/api/upgrades/${characterStore.currentCharacter.id}`
    );
    upgrades.value = upgradesResponse.data || [];
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

onMounted(async () => {
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0]);
    }
  }

  await loadData();

  // Atualizar dados a cada 30 segundos para mostrar progresso
  refreshInterval.value = setInterval(loadData, 30000);
});

onUnmounted(() => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value);
  }
});
</script>
