<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Modo História
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Viva uma aventura épica através de capítulos desafiadores
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
          <p class="text-gray-700 dark:text-white text-sm md:text-base">
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
        Carregando capítulos...
      </div>
    </div>

    <!-- Story Chapters -->
    <div v-else class="space-y-6">
      <h2 class="text-2xl font-bold text-black dark:text-white mb-4">
        Capítulos da História ({{ storyChapters.length }})
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <Card
          v-for="chapter in storyChapters"
          :key="chapter.id"
          class="transition-all duration-200"
          :class="[
            chapter.can_play ? 'hover:shadow-lg cursor-pointer' : 'opacity-60',
            chapter.is_completed
              ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20'
              : '',
            chapter.is_locked
              ? 'ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20'
              : '',
          ]"
          @click="chapter.can_play ? selectChapter(chapter) : null"
        >
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-lg text-gray-900 dark:text-white">{{
                chapter.title
              }}</CardTitle>
              <div class="flex items-center space-x-2">
                <Badge
                  :variant="getChapterBadgeVariant(chapter)"
                  class="text-gray-900 dark:text-white"
                >
                  Cap. {{ chapter.chapter }}
                </Badge>
                <!-- Status Indicators -->
                <Badge
                  v-if="chapter.is_completed"
                  variant="default"
                  class="bg-green-600 text-white"
                >
                  ✅ Completo
                </Badge>
                <Badge v-else-if="chapter.is_locked" variant="destructive">
                  🔒 Nv. {{ chapter.level_required }}
                </Badge>
                <Badge v-else variant="secondary"> ▶️ Disponível </Badge>
              </div>
            </div>
            <CardDescription class="text-gray-700 dark:text-white">
              {{ chapter.description }}
            </CardDescription>
          </CardHeader>

          <CardContent class="space-y-4">
            <!-- NPC Info -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                Oponente: {{ chapter.npc.name }}
              </h4>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Nível:</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{
                    chapter.npc.level
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Vida:</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{
                    chapter.npc.stats.health
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Força:</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{
                    chapter.npc.stats.strength
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Defesa:</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{
                    chapter.npc.stats.defense
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Rewards -->
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                Recompensas:
              </h4>
              <div class="flex items-center space-x-4 text-sm">
                <div class="flex items-center space-x-1">
                  <span class="text-blue-500">⭐</span>
                  <span class="text-gray-900 dark:text-white"
                    >{{ chapter.rewards.xp }} XP</span
                  >
                </div>
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-500">💰</span>
                  <span class="text-gray-900 dark:text-white"
                    >{{ chapter.rewards.gold }} Ouro</span
                  >
                </div>
                <div
                  v-if="chapter.rewards.items?.length"
                  class="flex items-center space-x-1"
                >
                  <span class="text-green-500">🎁</span>
                  <span class="text-gray-900 dark:text-white"
                    >{{ chapter.rewards.items.length }} Itens</span
                  >
                </div>
                <div
                  v-if="chapter.rewards.equipment"
                  class="flex items-center space-x-1"
                >
                  <span class="text-purple-500">⚔️</span>
                  <span class="text-gray-900 dark:text-white">Equipamento</span>
                </div>
              </div>
            </div>

            <!-- Level Requirement -->
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-900 dark:text-white">
                Nível necessário: {{ chapter.level_required }}
              </div>
              <Button
                :disabled="!chapter.can_play"
                size="sm"
                :class="
                  chapter.is_completed
                    ? 'bg-green-600 text-white'
                    : chapter.is_locked
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white'
                "
                :variant="
                  chapter.is_completed
                    ? 'secondary'
                    : chapter.is_locked
                    ? 'destructive'
                    : 'default'
                "
              >
                {{
                  chapter.is_completed
                    ? "✅ Completo"
                    : chapter.is_locked
                    ? `🔒 Nv. ${chapter.level_required}`
                    : "▶️ Iniciar Batalha"
                }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Chapter Detail Modal -->
    <div
      v-if="selectedChapter"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="selectedChapter = null"
    >
      <Card class="w-full max-w-2xl max-h-[90vh] overflow-y-auto" @click.stop>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-2xl text-gray-900 dark:text-white">{{
              selectedChapter.title
            }}</CardTitle>
            <Button @click="selectedChapter = null" variant="ghost" size="sm">
              ✕
            </Button>
          </div>
          <CardDescription class="text-gray-700 dark:text-white">{{
            selectedChapter.description
          }}</CardDescription>
        </CardHeader>

        <CardContent class="space-y-6">
          <!-- Story Text -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ selectedChapter.story_text }}
            </p>
          </div>

          <!-- Battle Button -->
          <div class="text-center">
            <Button
              @click="startChapterBattle(selectedChapter)"
              :disabled="
                selectedChapter.level_required >
                (characterStore.currentCharacter?.level || 0)
              "
              size="lg"
              class="w-full"
            >
              {{
                selectedChapter.level_required >
                (characterStore.currentCharacter?.level || 0)
                  ? "Nível Insuficiente"
                  : "Iniciar Batalha"
              }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
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
import type { StoryChapter } from "~/types";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();
const storyChapters = ref<StoryChapter[]>([]);
const loading = ref(false);
const selectedChapter = ref<StoryChapter | null>(null);
const currentGold = ref(0);

const getChapterBadgeVariant = (chapter: any) => {
  if (chapter.is_completed) {
    return "default"; // Completed chapters
  } else if (chapter.is_locked) {
    return "destructive"; // Locked chapters
  } else if (chapter.chapter % 5 === 0) {
    return "destructive"; // Boss chapters
  } else if (chapter.chapter % 3 === 0) {
    return "default"; // Important chapters
  } else {
    return "secondary"; // Regular chapters
  }
};

const loadStoryChapters = async () => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;
  try {
    const token = useCookie("@mmo/ninja/token");
    const response = await $fetch("/api/story/chapters", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      query: {
        character_id: characterStore.currentCharacter.id,
      },
    });

    if (response.success) {
      // Usar os dados da API que já incluem o status correto
      storyChapters.value = response.data || [];
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

    if (response.success && response.data) {
      const goldResource = response.data.find(
        (r: any) => r.resource_type === "ouro"
      );
      currentGold.value = goldResource ? goldResource.amount : 0;
    }
  } catch (error) {}
};

const selectChapter = (chapter: StoryChapter) => {
  selectedChapter.value = chapter;
};

const startChapterBattle = async (chapter: StoryChapter) => {
  if (!characterStore.currentCharacter) return;

  try {
    const token = useCookie("@mmo/ninja/token");

    // Iniciar batalha real do capítulo
    const battleResponse = await $fetch("/api/story/start-battle", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: characterStore.currentCharacter.id,
        chapter: chapter.chapter,
      },
    });

    if (battleResponse.success && battleResponse.data) {
      // Redirecionar para a página de batalhas
      await navigateTo("/batalhas");
    }
  } catch (error: any) {
    alert(error.data?.message || "Erro ao iniciar batalha do capítulo");
  }

  selectedChapter.value = null;
};

onMounted(async () => {
  // Carregar personagem se não estiver carregado
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0] as any);
    }
  }

  await loadStoryChapters();
  await loadCurrentGold();
});
</script>
