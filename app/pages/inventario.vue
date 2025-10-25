<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Inventário
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Gerencie seus itens e consumíveis
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
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                {{ characterStore.currentCharacter.stats.health }}/{{
                  characterStore.currentCharacter.stats.max_health
                }}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Vida</p>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ characterStore.currentCharacter.xp }}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">XP</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-lg text-gray-600 dark:text-gray-400">
        Carregando inventário...
      </div>
    </div>

    <!-- Inventory Grid -->
    <div
      v-else-if="inventory.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      <Card
        v-for="item in inventory"
        :key="item.id"
        class="hover:shadow-lg transition-all duration-200"
        :class="getItemTypeColor(item.item_type)"
      >
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            <span>{{ item.item_name }}</span>
            <Badge :variant="getItemTypeVariant(item.item_type)">
              {{ getItemTypeLabel(item.item_type) }}
            </Badge>
          </CardTitle>
          <CardDescription> Quantidade: {{ item.quantity }} </CardDescription>
        </CardHeader>

        <CardContent class="space-y-4">
          <!-- Item Description -->
          <div
            v-if="item.description"
            class="text-sm text-gray-600 dark:text-gray-400"
          >
            {{ item.description }}
          </div>

          <!-- Item Stats -->
          <div
            v-if="item.stats && Object.keys(item.stats).length > 0"
            class="space-y-2"
          >
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              Efeitos:
            </h4>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div v-if="item.stats.damage" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Dano:</span>
                <span class="font-medium text-red-600 dark:text-red-400">
                  +{{ item.stats.damage }}
                </span>
              </div>
              <div v-if="item.stats.defense" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Defesa:</span>
                <span class="font-medium text-blue-600 dark:text-blue-400">
                  +{{ item.stats.defense }}
                </span>
              </div>
              <div v-if="item.stats.health_bonus" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Vida:</span>
                <span class="font-medium text-green-600 dark:text-green-400">
                  +{{ item.stats.health_bonus }}
                </span>
              </div>
            </div>
          </div>

          <!-- Use Button -->
          <Button
            v-if="
              item.item_type === 'potion' || item.item_type === 'consumable'
            "
            class="w-full"
            :disabled="loading"
            @click="useItem(item)"
          >
            {{ loading ? "Usando..." : "Usar" }}
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">🎒</div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Inventário vazio
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Complete batalhas e missões para ganhar itens!
      </p>
      <Button @click="navigateTo('/batalhas')" size="lg">
        Ir para Batalhas
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCharacterStore } from "~/stores/character";
import type { Item } from "~/types";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();

const loading = ref(false);
const inventory = ref<Item[]>([]);

const getItemTypeColor = (type: string) => {
  switch (type) {
    case "potion":
      return "border-green-200 hover:border-green-300";
    case "weapon":
      return "border-red-200 hover:border-red-300";
    case "armor":
      return "border-blue-200 hover:border-blue-300";
    case "consumable":
      return "border-yellow-200 hover:border-yellow-300";
    default:
      return "";
  }
};

const getItemTypeVariant = (type: string) => {
  switch (type) {
    case "potion":
      return "default";
    case "weapon":
      return "destructive";
    case "armor":
      return "secondary";
    case "consumable":
      return "outline";
    default:
      return "default";
  }
};

const getItemTypeLabel = (type: string) => {
  switch (type) {
    case "potion":
      return "Poção";
    case "weapon":
      return "Arma";
    case "armor":
      return "Armadura";
    case "consumable":
      return "Consumível";
    default:
      return "Item";
  }
};

const loadInventory = async () => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;

  try {
    const token = useCookie("token");
    const response = await $fetch(
      `/api/inventory/${characterStore.currentCharacter.id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    inventory.value = response.data || [];
  } catch (error) {
    console.error("Erro ao carregar inventário:", error);
  } finally {
    loading.value = false;
  }
};

const useItem = async (item: Item) => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;

  try {
    const token = useCookie("token");
    const response = await $fetch("/api/inventory/use", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: characterStore.currentCharacter.id,
        item_id: item.id,
      },
    });

    if (response.success) {
      // Atualizar inventário
      await loadInventory();

      // Atualizar personagem no store
      await characterStore.loadCharacters();

      // Mostrar mensagem de sucesso
      alert(response.data.effect);
    }
  } catch (error: any) {
    console.error("Erro ao usar item:", error);
    alert(error.data?.message || "Erro ao usar item");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0]);
    }
  }

  await loadInventory();
});
</script>
