<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Mineração
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Colete materiais e cristais para suas melhorias
      </p>
    </div>

    <!-- Character Status -->
    <div v-if="characterStore.currentCharacter" class="flex justify-center">
      <Card class="w-full max-w-2xl">
        <CardContent class="p-4 md:p-6">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ characterStore.currentCharacter.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Nível {{ characterStore.currentCharacter.level }}
              </p>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ characterStore.currentCharacter.xp }}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">XP</p>
            </div>
            <div>
              <div
                class="text-2xl font-bold text-green-600 dark:text-green-400"
              >
                {{ getResourceAmount("ouro") }}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Ouro</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Resources Display -->
    <div v-if="resources.length > 0" class="flex justify-center">
      <Card class="w-full max-w-2xl">
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
        </CardContent>
      </Card>
    </div>

    <!-- Mining Options -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto"
    >
      <!-- Materials Mining -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <span class="text-2xl">⚙️</span>
            Mineração de Materiais
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            Colete materiais essenciais para melhorias de base e equipamentos.
          </p>

          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Recompensas Esperadas:</h4>
            <ul class="text-sm space-y-1">
              <li>• Materiais: {{ getExpectedMaterials() }} unidades</li>
              <li>
                • Baseado no nível:
                {{ characterStore.currentCharacter?.level || 1 }}
              </li>
              <li>• Chance de bônus: 50%</li>
            </ul>
          </div>

          <div class="space-y-2">
            <h4 class="font-semibold">Como Obter Materiais:</h4>
            <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Mineração (esta página)</li>
              <li>• Batalhas (40% de chance)</li>
              <li>• Missões especiais</li>
            </ul>
          </div>

          <Button
            @click="startMining('materials')"
            :disabled="mining"
            class="w-full"
            size="lg"
          >
            <span v-if="mining">Minerando...</span>
            <span v-else>Iniciar Mineração de Materiais</span>
          </Button>
        </CardContent>
      </Card>

      <!-- Crystals Mining -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <span class="text-2xl">💎</span>
            Mineração de Cristais
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            Colete cristais raros para melhorias avançadas e construções
            especiais.
          </p>

          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Recompensas Esperadas:</h4>
            <ul class="text-sm space-y-1">
              <li>• Cristais: {{ getExpectedCrystals() }} unidades</li>
              <li>
                • Baseado no nível:
                {{ characterStore.currentCharacter?.level || 1 }}
              </li>
              <li>• Chance de bônus: 50%</li>
            </ul>
          </div>

          <div class="space-y-2">
            <h4 class="font-semibold">Como Obter Cristais:</h4>
            <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Mineração (esta página)</li>
              <li>• Batalhas (10% de chance)</li>
              <li>• Missões de elite</li>
              <li>• Modo história (capítulos avançados)</li>
            </ul>
          </div>

          <Button
            @click="startMining('crystals')"
            :disabled="mining"
            class="w-full"
            size="lg"
            variant="outline"
          >
            <span v-if="mining">Minerando...</span>
            <span v-else>Iniciar Mineração de Cristais</span>
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- Mining Results -->
    <div v-if="lastMiningResult" class="max-w-2xl mx-auto">
      <Card class="border-green-200 dark:border-green-800">
        <CardContent class="p-6">
          <div class="text-center space-y-4">
            <div class="text-4xl">🎉</div>
            <h3
              class="text-xl font-semibold text-green-600 dark:text-green-400"
            >
              Mineração Concluída!
            </h3>
            <div class="space-y-2">
              <p class="text-gray-600 dark:text-gray-400">
                Você minerou {{ lastMiningResult.mining_type }}:
              </p>
              <div class="flex justify-center gap-4">
                <div
                  v-if="lastMiningResult.rewards.materials"
                  class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg"
                >
                  <span class="text-xl">⚙️</span>
                  <span class="font-semibold">
                    +{{ lastMiningResult.rewards.materials }} Materiais
                  </span>
                </div>
                <div
                  v-if="lastMiningResult.rewards.crystals"
                  class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg"
                >
                  <span class="text-xl">💎</span>
                  <span class="font-semibold">
                    +{{ lastMiningResult.rewards.crystals }} Cristais
                  </span>
                </div>
              </div>
            </div>
            <Button
              @click="lastMiningResult = null"
              variant="outline"
              size="sm"
            >
              Fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Tips -->
    <div class="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>💡 Dicas de Mineração</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-2">Materiais:</h4>
              <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Usados para melhorias básicas</li>
                <li>• Necessários para construções</li>
                <li>• Mais fáceis de obter</li>
                <li>• Quantidade aumenta com o nível</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Cristais:</h4>
              <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Usados para melhorias avançadas</li>
                <li>• Necessários para construções especiais</li>
                <li>• Mais raros e valiosos</li>
                <li>• Quantidade limitada mesmo em níveis altos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCharacterStore } from "~/stores/character";
import type { Resource } from "~/types";

const characterStore = useCharacterStore();

const resources = ref<Resource[]>([]);
const mining = ref(false);
const lastMiningResult = ref<any>(null);

const loadResources = async () => {
  if (!characterStore.currentCharacter) return;

  try {
    const token = useCookie("token");
    const response = await $fetch(
      `/api/resources/${characterStore.currentCharacter.id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    resources.value = response.data || [];
  } catch (error) {
    }
};

const startMining = async (miningType: "materials" | "crystals") => {
  if (!characterStore.currentCharacter || mining.value) return;

  mining.value = true;

  try {
    const token = useCookie("token");
    const response = await $fetch("/api/mining/start", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: characterStore.currentCharacter.id,
        mining_type: miningType,
      },
    });

    if (response.success) {
      lastMiningResult.value = response.data;
      await loadResources(); // Recarregar recursos
    }
  } catch (error: any) {
    } finally {
    mining.value = false;
  }
};

const getResourceAmount = (type: string) => {
  const resource = resources.value.find((r) => r.resource_type === type);
  return resource ? resource.amount : 0;
};

const getResourceIcon = (type: string) => {
  const icons: Record<string, string> = {
    ouro: "🪙",
    materiais: "⚙️",
    cristais: "💎",
  };
  return icons[type] || "❓";
};

const getResourceColor = (type: string) => {
  const colors: Record<string, string> = {
    ouro: "text-yellow-600 dark:text-yellow-400",
    materiais: "text-gray-600 dark:text-gray-400",
    cristais: "text-purple-600 dark:text-purple-400",
  };
  return colors[type] || "text-gray-600 dark:text-gray-400";
};

const getExpectedMaterials = () => {
  const level = characterStore.currentCharacter?.level || 1;
  const baseAmount = Math.floor(level / 5) + 1;
  return `${baseAmount}-${baseAmount + 2}`;
};

const getExpectedCrystals = () => {
  const level = characterStore.currentCharacter?.level || 1;
  const baseAmount = Math.floor(level / 10) + 1;
  return `${baseAmount}-${baseAmount + 1}`;
};

onMounted(async () => {
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0]);
    }
  }

  await loadResources();
});
</script>
