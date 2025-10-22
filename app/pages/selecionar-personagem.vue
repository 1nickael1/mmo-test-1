<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Selecionar Personagem
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Escolha um personagem para jogar ou crie um novo
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="characterStore.loading" class="text-center py-8">
      <div class="text-lg text-gray-600 dark:text-gray-400">
        Carregando personagens...
      </div>
    </div>

    <!-- Characters Grid -->
    <div
      v-else-if="characterStore.characters.length > 0"
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <Card
        v-for="character in characterStore.characters"
        :key="character.id"
        class="hover:shadow-lg transition-all duration-200 cursor-pointer"
        :class="
          characterStore.currentCharacter?.id === character.id
            ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'hover:scale-105'
        "
        @click="selectCharacter(character)"
      >
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-xl">
              {{ character.name }}
            </CardTitle>
            <Badge
              :variant="character.class === 'ninja' ? 'default' : 'secondary'"
            >
              {{ character.class === "ninja" ? "🥷 Ninja" : "🚀 Guerreiro" }}
            </Badge>
          </div>
          <CardDescription>
            Criado em {{ formatDate(character.created_at) }}
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-4">
          <!-- Level and XP -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400"
              >Nível</span
            >
            <span class="text-lg font-bold text-blue-600 dark:text-blue-400">
              {{ character.level }}
            </span>
          </div>

          <div>
            <div
              class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1"
            >
              <span>XP: {{ character.xp }}</span>
              <span
                >{{ getXpForNextLevel(character.level) - character.xp }} para
                próximo</span
              >
            </div>
            <Progress :value="getXpProgress(character)" class="h-2" />
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Força:</span>
              <span class="font-medium">{{ character.stats.strength }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Agilidade:</span>
              <span class="font-medium">{{ character.stats.agility }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Defesa:</span>
              <span class="font-medium">{{ character.stats.defense }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Vida:</span>
              <span class="font-medium"
                >{{ character.stats.health }}/{{
                  character.stats.max_health
                }}</span
              >
            </div>
          </div>

          <!-- Action Button -->
          <Button
            class="w-full"
            :variant="
              characterStore.currentCharacter?.id === character.id
                ? 'default'
                : 'outline'
            "
            @click.stop="selectCharacter(character)"
          >
            {{
              characterStore.currentCharacter?.id === character.id
                ? "Selecionado"
                : "Selecionar"
            }}
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- No Characters State -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">🎮</div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Nenhum personagem encontrado
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Crie seu primeiro personagem para começar a aventura!
      </p>
      <Button @click="navigateTo('/criar-personagem')" size="lg">
        Criar Personagem
      </Button>
    </div>

    <!-- Create New Character Button -->
    <div v-if="characterStore.characters.length > 0" class="text-center">
      <Button
        @click="navigateTo('/criar-personagem')"
        variant="outline"
        size="lg"
      >
        + Criar Novo Personagem
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";
import { onMounted } from "vue";
import { useCharacterStore } from "~/stores/character";
import type { Character } from "~/types";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();

const selectCharacter = async (character: Character) => {
  characterStore.selectCharacter(character);
  await navigateTo("/home");
};

const getXpForNextLevel = (level: number): number => {
  return Math.floor(1000 * Math.pow(level, 1.5));
};

const getXpProgress = (character: Character): number => {
  const currentLevel = character.level;
  const currentLevelXp = Math.floor(1000 * Math.pow(currentLevel - 1, 1.5));
  const nextLevelXp = Math.floor(1000 * Math.pow(currentLevel, 1.5));
  const progress =
    ((character.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  return Math.max(0, Math.min(100, progress));
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};

onMounted(async () => {
  await characterStore.loadCharacters();
});
</script>
