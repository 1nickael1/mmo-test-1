<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Equipamentos
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Gerencie seus equipamentos e aumente seu poder
      </p>
    </div>

    <!-- Character Info -->
    <div
      v-if="characterStore.currentCharacter"
      class="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow"
    >
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h2
            class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white"
          >
            {{ characterStore.currentCharacter.name }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Nível {{ characterStore.currentCharacter.level }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-yellow-500">💰</span>
          <span class="font-semibold text-black dark:text-white text-lg">
            {{ currentGold }}
          </span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-lg text-gray-600 dark:text-gray-400">
        Carregando equipamentos...
      </div>
    </div>

    <!-- Currently Equipped -->
    <div v-if="equipment.length > 0" class="mb-8">
      <h2 class="text-2xl font-bold text-black dark:text-white mb-4">
        Equipamentos Atuais
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card
          v-for="equippedItem in equippedItems"
          :key="equippedItem.id"
          class="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
        >
          <CardHeader class="pb-2">
            <div class="flex items-center justify-between">
              <CardTitle class="text-lg text-green-800 dark:text-green-200">
                {{ equippedItem.equipment_name }}
              </CardTitle>
              <Badge variant="default" class="bg-green-600 text-white">
                {{ getTypeIcon(equippedItem.equipment_type) }}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div v-if="equippedItem.stats" class="space-y-2">
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div
                  v-if="equippedItem.stats.strength"
                  class="flex justify-between"
                >
                  <span class="text-gray-600 dark:text-gray-400">Força:</span>
                  <span class="font-medium text-red-600"
                    >+{{ equippedItem.stats.strength }}</span
                  >
                </div>
                <div
                  v-if="equippedItem.stats.agility"
                  class="flex justify-between"
                >
                  <span class="text-gray-600 dark:text-gray-400"
                    >Agilidade:</span
                  >
                  <span class="font-medium text-blue-600"
                    >+{{ equippedItem.stats.agility }}</span
                  >
                </div>
                <div
                  v-if="equippedItem.stats.defense"
                  class="flex justify-between"
                >
                  <span class="text-gray-600 dark:text-gray-400">Defesa:</span>
                  <span class="font-medium text-green-600"
                    >+{{ equippedItem.stats.defense }}</span
                  >
                </div>
                <div
                  v-if="equippedItem.stats.health"
                  class="flex justify-between"
                >
                  <span class="text-gray-600 dark:text-gray-400">Vida:</span>
                  <span class="font-medium text-purple-600"
                    >+{{ equippedItem.stats.health }}</span
                  >
                </div>
                <div
                  v-if="equippedItem.stats.damage"
                  class="flex justify-between"
                >
                  <span class="text-gray-600 dark:text-gray-400">Dano:</span>
                  <span class="font-medium text-orange-600"
                    >+{{ equippedItem.stats.damage }}</span
                  >
                </div>
              </div>
            </div>
            <div class="mt-3">
              <Badge
                variant="secondary"
                class="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              >
                Equipado
              </Badge>
            </div>
          </CardContent>
        </Card>

        <!-- Empty slots for unequipped types -->
        <Card
          v-for="emptySlot in emptySlots"
          :key="emptySlot"
          class="bg-gray-50 dark:bg-gray-800 border-dashed border-2 border-gray-300 dark:border-gray-600"
        >
          <CardContent
            class="flex flex-col items-center justify-center py-8 text-center"
          >
            <div class="text-4xl mb-2 opacity-50">
              {{ getTypeIcon(emptySlot) }}
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              {{ getTypeName(emptySlot) }} não equipado
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Equipment Grid -->
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-black dark:text-white mb-4">
        Equipamentos Disponíveis
      </h2>
      <!-- Filter Tabs -->
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="type in equipmentTypes"
          :key="type"
          @click="selectedType = type"
          :variant="selectedType === type ? 'default' : 'outline'"
          size="sm"
          :class="
            selectedType === type
              ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-500'
              : 'text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
          "
        >
          {{ type }}
        </Button>
      </div>

      <!-- Equipment Cards -->
      <div
        v-if="filteredEquipment.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <Card
          v-for="item in filteredEquipment"
          :key="item.id"
          class="hover:shadow-lg transition-all duration-200"
          :class="
            item.equipped
              ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20'
              : ''
          "
        >
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-lg text-gray-900 dark:text-white">{{
                item.equipment_name
              }}</CardTitle>
              <div class="flex items-center space-x-2">
                <Badge :variant="item.equipped ? 'default' : 'secondary'">
                  {{ item.equipped ? "Equipado" : "Inventário" }}
                </Badge>
                <Badge :variant="getTypeBadgeVariant(item.equipment_type)">
                  {{ getTypeIcon(item.equipment_type) }}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent class="space-y-4">
            <!-- Stats -->
            <div v-if="item.stats" class="space-y-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                Bônus:
              </h4>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div v-if="item.stats.strength" class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Força:</span>
                  <span class="font-medium text-red-600"
                    >+{{ item.stats.strength }}</span
                  >
                </div>
                <div v-if="item.stats.agility" class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400"
                    >Agilidade:</span
                  >
                  <span class="font-medium text-blue-600"
                    >+{{ item.stats.agility }}</span
                  >
                </div>
                <div v-if="item.stats.defense" class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Defesa:</span>
                  <span class="font-medium text-green-600"
                    >+{{ item.stats.defense }}</span
                  >
                </div>
                <div v-if="item.stats.health" class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Vida:</span>
                  <span class="font-medium text-purple-600"
                    >+{{ item.stats.health }}</span
                  >
                </div>
                <div v-if="item.stats.damage" class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Dano:</span>
                  <span class="font-medium text-orange-600"
                    >+{{ item.stats.damage }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Equip/Unequip Button -->
            <Button
              @click="toggleEquipment(item)"
              :disabled="loading"
              class="w-full"
              :variant="item.equipped ? 'destructive' : 'default'"
            >
              {{ item.equipped ? "Desequipar" : "Equipar" }}
            </Button>
          </CardContent>
        </Card>
      </div>

      <!-- No Available Equipment Message -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">📦</div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Nenhum equipamento disponível para equipar
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Todos os seus equipamentos já estão equipados! Compre mais
          equipamentos na loja.
        </p>
        <Button @click="navigateTo('/loja')" variant="default">
          Ir para Loja
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";
import { computed, onMounted, ref } from "vue";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useCharacterStore } from "~/stores/character";
import type { Equipment } from "~/types";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();
const equipment = ref<Equipment[]>([]);
const loading = ref(false);
const selectedType = ref("Todos");
const currentGold = ref(0);

const equipmentTypes = computed(() => {
  const types = ["Todos"];
  equipment.value.forEach((item) => {
    if (!types.includes(item.equipment_type)) {
      types.push(item.equipment_type);
    }
  });
  return types;
});

const filteredEquipment = computed(() => {
  // Filtrar apenas equipamentos não equipados
  const unequippedItems = equipment.value.filter((item) => !item.equipped);

  if (selectedType.value === "Todos") {
    return unequippedItems;
  }
  return unequippedItems.filter(
    (item) => item.equipment_type === selectedType.value
  );
});

// Computed properties for equipped items display
const equippedItems = computed(() => {
  return equipment.value.filter((item) => item.equipped);
});

const emptySlots = computed(() => {
  const equippedTypes = equippedItems.value.map((item) => item.equipment_type);
  const allTypes = ["weapon", "armor", "accessory"];
  return allTypes.filter((type) => !equippedTypes.includes(type));
});

// Helper methods for display
const getTypeIcon = (type: string) => {
  switch (type) {
    case "weapon":
      return "⚔️";
    case "armor":
      return "🛡️";
    case "accessory":
      return "💍";
    default:
      return "❓";
  }
};

const getTypeName = (type: string) => {
  switch (type) {
    case "weapon":
      return "Arma";
    case "armor":
      return "Armadura";
    case "accessory":
      return "Acessório";
    default:
      return "Desconhecido";
  }
};

const getTypeBadgeVariant = (type: string) => {
  switch (type) {
    case "weapon":
      return "destructive";
    case "armor":
      return "default";
    case "accessory":
      return "secondary";
    default:
      return "outline";
  }
};

const loadEquipment = async () => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;
  try {
    const token = useCookie("@mmo/ninja/token");
    const response = await $fetch(
      `/api/equipment/${characterStore.currentCharacter.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (response.success) {
      equipment.value = response.data || [];
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const loadCurrentGold = async () => {
  if (!characterStore.currentCharacter) return;

  try {
    const token = useCookie("@mmo/ninja/token");
    const response = await $fetch("/api/resources", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      query: {
        character_id: characterStore.currentCharacter.id,
      },
    });

    if (response.success) {
      const goldResource = response.data.find(
        (r: any) => r.resource_type === "ouro"
      );
      currentGold.value = goldResource ? goldResource.amount : 0;
    }
  } catch (error) {}
};

const toggleEquipment = async (item: Equipment) => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;
  try {
    const token = useCookie("@mmo/ninja/token");
    const response = await $fetch("/api/equipment/equip", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: characterStore.currentCharacter.id,
        equipment_id: item.id,
      },
    });

    if (response.success) {
      // Atualizar estado local
      const index = equipment.value.findIndex((eq) => eq.id === item.id);
      if (index !== -1) {
        equipment.value[index].equipped = response.data.equipped;
      }

      // Mostrar mensagem de sucesso
      alert(response.message);

      // Recarregar equipamentos para garantir sincronização
      await loadEquipment();
    }
  } catch (error: any) {
    alert(error.data?.message || "Erro ao equipar/desequipar item");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  // Carregar personagem se não estiver carregado
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0] as any);
    }
  }

  await loadEquipment();
  await loadCurrentGold();
});
</script>
