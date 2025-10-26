<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Loja
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Compre itens e equipamentos para fortalecer seu personagem
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
            class="text-lg md:text-xl font-semibold text-black dark:text-white"
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
        Carregando itens da loja...
      </div>
    </div>

    <!-- Shop Items -->
    <div v-else-if="shopItems.length > 0" class="space-y-6">
      <!-- Filter Tabs -->
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :variant="selectedCategory === category ? 'default' : 'outline'"
          size="sm"
          :class="
            selectedCategory === category
              ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-500'
              : 'text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
          "
        >
          {{ category }}
        </Button>
      </div>

      <!-- Items Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <Card
          v-for="item in filteredItems"
          :key="item.id"
          class="hover:shadow-lg transition-all duration-200"
          :class="!item.can_buy ? 'opacity-60' : ''"
        >
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-lg text-gray-900 dark:text-white">{{
                item.name
              }}</CardTitle>
              <Badge
                :variant="item.type === 'potion' ? 'default' : 'secondary'"
              >
                {{ item.type === "potion" ? "🧪" : "⚔️" }}
              </Badge>
            </div>
            <CardDescription class="text-gray-700 dark:text-white">{{
              item.description
            }}</CardDescription>
          </CardHeader>

          <CardContent class="space-y-4">
            <!-- Stats (for equipment) -->
            <div
              v-if="item.type === 'equipment' && item.stats"
              class="space-y-2"
            >
              <h4 class="text-sm font-medium text-black dark:text-white">
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

            <!-- Price and Level -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-yellow-500">💰</span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ item.price }}
                </span>
              </div>
              <div class="text-sm text-gray-700 dark:text-gray-300">
                Nv. {{ item.level_required }}
              </div>
            </div>

            <!-- Buy Button -->
            <Button
              @click="buyItem(item)"
              :disabled="loading || !item.can_buy || item.price > currentGold"
              class="w-full"
              :variant="
                !item.can_buy
                  ? 'secondary'
                  : item.price > currentGold
                  ? 'destructive'
                  : 'default'
              "
            >
              {{
                !item.can_buy
                  ? `Nível ${item.level_required} Necessário`
                  : item.price > currentGold
                  ? "Ouro Insuficiente"
                  : "Comprar"
              }}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- No Items State -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">🏪</div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Nenhum item disponível
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Suba de nível para desbloquear mais itens na loja!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useCharacterStore } from "~/stores/character";
import type { ShopItem } from "~/types";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();
const shopItems = ref<ShopItem[]>([]);
const loading = ref(false);
const selectedCategory = ref("Todos");
const currentGold = ref(0);

const categories = computed(() => {
  const cats = ["Todos"];
  shopItems.value.forEach((item) => {
    if (!cats.includes(item.category)) {
      cats.push(item.category);
    }
  });
  return cats;
});

const filteredItems = computed(() => {
  if (selectedCategory.value === "Todos") {
    return shopItems.value;
  }
  return shopItems.value.filter(
    (item) => item.category === selectedCategory.value
  );
});

const loadShopItems = async () => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;
  try {
    const token = useCookie("@mmo/ninja/token");
    const response = await $fetch("/api/shop/items", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      query: {
        level: characterStore.currentCharacter.level,
        class: characterStore.currentCharacter.class,
      },
    });

    if (response.success) {
      shopItems.value = response.data || [];
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

const buyItem = async (item: ShopItem) => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;
  try {
    const token = useCookie("@mmo/ninja/token");
    const response = await $fetch("/api/shop/buy", {
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
      // Atualizar ouro atual
      currentGold.value = response.data.remaining_gold;

      // Mostrar mensagem de sucesso
      alert(`${item.name} comprado com sucesso!`);

      // Recarregar dados se necessário
      await loadCurrentGold();
    }
  } catch (error: any) {
    alert(error.data?.message || "Erro ao comprar item");
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

  await loadShopItems();
  await loadCurrentGold();
});
</script>
