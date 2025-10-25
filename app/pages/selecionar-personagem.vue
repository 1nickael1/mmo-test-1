<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Selecionar Personagem
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Escolha qual personagem você quer usar
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-lg text-gray-600 dark:text-gray-400">
        Carregando personagens...
      </div>
    </div>

    <!-- Characters Grid -->
    <div v-else-if="characters.length > 0" class="space-y-6">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <Card
          v-for="character in characters"
          :key="character.id"
          class="hover:shadow-lg transition-all duration-200 cursor-pointer"
          :class="
            currentCharacter?.id === character.id
              ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'hover:scale-105'
          "
          @click="selectCharacter(character)"
        >
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-lg text-gray-900 dark:text-white">
                {{ character.name }}
              </CardTitle>
              <Badge
                :variant="character.class === 'ninja' ? 'default' : 'secondary'"
              >
                {{ character.class === "ninja" ? "🥷 Ninja" : "🚀 Guerreiro" }}
              </Badge>
            </div>
            <CardDescription class="text-gray-700 dark:text-white">
              Nível {{ character.level }} - {{ character.xp }} XP
            </CardDescription>
          </CardHeader>

          <CardContent class="space-y-4">
            <!-- Character Stats -->
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Força:</span>
                <span class="font-medium text-red-600 dark:text-red-400">
                  {{ character.stats.strength }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Agilidade:</span>
                <span class="font-medium text-blue-600 dark:text-blue-400">
                  {{ character.stats.agility }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Defesa:</span>
                <span class="font-medium text-green-600 dark:text-green-400">
                  {{ character.stats.defense }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Vida:</span>
                <span class="font-medium text-purple-600 dark:text-purple-400">
                  {{ character.stats.health }}/{{ character.stats.max_health }}
                </span>
              </div>
            </div>

            <!-- XP Progress -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400"
                  >Progresso XP:</span
                >
                <span class="font-medium">
                  {{ xpForNextLevel(character) }} para próximo nível
                </span>
              </div>
              <Progress :value="getXpProgress(character)" class="h-2" />
            </div>

            <!-- Character Status -->
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Criado em: {{ formatDate(character.created_at) }}
              </div>
              <div
                v-if="currentCharacter?.id === character.id"
                class="flex items-center gap-1"
              >
                <Badge variant="default" class="bg-green-600 text-white">
                  ✅ Ativo
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Create New Character Button -->
      <div class="text-center">
        <Button
          @click="createNewCharacter"
          variant="outline"
          size="lg"
          class="w-full sm:w-auto"
        >
          ➕ Criar Novo Personagem
        </Button>
      </div>
    </div>

    <!-- No Characters State -->
    <div v-else class="text-center py-12">
      <div class="space-y-4">
        <div class="text-6xl">🎮</div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Nenhum Personagem Encontrado
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Crie seu primeiro personagem para começar a aventura!
        </p>
        <Button @click="createNewCharacter" size="lg">
          🚀 Criar Primeiro Personagem
        </Button>
      </div>
    </div>

    <!-- Current Character Info -->
    <div
      v-if="currentCharacter"
      class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100">
            Personagem Atual
          </h3>
          <p class="text-blue-700 dark:text-blue-300">
            {{ currentCharacter.name }} - Nível {{ currentCharacter.level }}
          </p>
        </div>
        <Button
          @click="goToHome"
          variant="outline"
          size="sm"
          class="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-800"
        >
          Ir para Home
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from "~/stores/character";
import type { Character } from "~/types";

const characterStore = useCharacterStore();
const router = useRouter();

const { currentCharacter, characters, loading } = storeToRefs(characterStore);

// Carregar personagens ao montar o componente
onMounted(async () => {
  await characterStore.loadCharacters();
});

// Usar o composable de gerenciamento de personagem
const { switchCharacter } = useCharacterManager();

// Selecionar personagem
const selectCharacter = async (character: Character) => {
  // Trocar personagem usando o composable
  await switchCharacter(character);

  // Mostrar notificação de sucesso
  const { showSuccess } = useToast();
  showSuccess(`Personagem ${character.name} selecionado!`);

  // Redirecionar para home após um pequeno delay
  setTimeout(() => {
    router.push("/home");
  }, 1000);
};

// Criar novo personagem
const createNewCharacter = () => {
  router.push("/criar-personagem");
};

// Ir para home
const goToHome = () => {
  router.push("/home");
};

// Calcular XP necessário para próximo nível
const xpForNextLevel = (character: Character): number => {
  const xpNeeded = characterStore.getXpForLevel(character.level);
  return xpNeeded - character.xp;
};

// Calcular progresso de XP
const getXpProgress = (character: Character): number => {
  const currentLevelXp = characterStore.getXpForLevel(character.level - 1);
  const nextLevelXp = characterStore.getXpForLevel(character.level);
  const progress =
    ((character.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  return Math.max(0, Math.min(100, progress));
};

// Formatar data
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
</script>
