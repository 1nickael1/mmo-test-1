<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Bem-vindo, {{ characterStore.currentCharacter?.name }}!
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Nível {{ characterStore.currentCharacter?.level }} -
        {{
          characterStore.currentCharacter?.class === "ninja"
            ? "🥷 Ninja"
            : "🚀 Guerreiro Espacial"
        }}
      </p>
    </div>

    <!-- Character Stats Overview -->
    <div
      v-if="characterStore.currentCharacter"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
    >
      <!-- Level & XP -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle
            class="text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Nível e XP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Nível {{ characterStore.currentCharacter.level }}
          </div>
          <div class="mt-2">
            <div
              class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1"
            >
              <span>XP: {{ characterStore.currentCharacter.xp }}</span>
              <span>{{ xpForNextLevel }} para próximo nível</span>
            </div>
            <Progress :value="xpProgress" class="h-2" />
          </div>
        </CardContent>
      </Card>

      <!-- Health -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle
            class="text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Vida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">
            {{ characterStore.currentCharacter.stats.health }}/{{
              characterStore.currentCharacter.stats.max_health
            }}
          </div>
          <Progress :value="healthProgress" class="h-2 mt-2" />
        </CardContent>
      </Card>

      <!-- Strength -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle
            class="text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Força
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {{ characterStore.currentCharacter.stats.strength }}
          </div>
        </CardContent>
      </Card>

      <!-- Agility -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle
            class="text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Agilidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">
            {{ characterStore.currentCharacter.stats.agility }}
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Actions -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Battle Card -->
      <Card
        class="hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateTo('/batalhas')"
      >
        <CardHeader>
          <CardTitle class="flex items-center gap-2"> ⚔️ Batalhas </CardTitle>
          <CardDescription>
            Enfrente NPCs e ganhe XP e recursos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button class="w-full"> Ir para Batalhas </Button>
        </CardContent>
      </Card>

      <!-- Skills Card -->
      <Card
        class="hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateTo('/habilidades')"
      >
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            🎯 Habilidades
          </CardTitle>
          <CardDescription>
            Desenvolva novas habilidades e jutsus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button class="w-full"> Ver Habilidades </Button>
        </CardContent>
      </Card>

      <!-- Upgrades Card -->
      <Card
        class="hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateTo('/melhorias')"
      >
        <CardHeader>
          <CardTitle class="flex items-center gap-2"> 🏗️ Melhorias </CardTitle>
          <CardDescription>
            Construa e melhore sua base espacial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button class="w-full"> Ver Melhorias </Button>
        </CardContent>
      </Card>

      <!-- Story Mode Card -->
      <Card
        class="hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateTo('/modo-historia')"
      >
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            📖 Modo História
          </CardTitle>
          <CardDescription>
            Viva uma aventura épica através de capítulos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button class="w-full"> Jogar História </Button>
        </CardContent>
      </Card>

      <!-- Shop Card -->
      <Card
        class="hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateTo('/loja')"
      >
        <CardHeader>
          <CardTitle class="flex items-center gap-2"> 🏪 Loja </CardTitle>
          <CardDescription> Compre itens e equipamentos </CardDescription>
        </CardHeader>
        <CardContent>
          <Button class="w-full"> Ir para Loja </Button>
        </CardContent>
      </Card>

      <!-- Equipment Card -->
      <Card
        class="hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateTo('/equipamentos')"
      >
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            ⚔️ Equipamentos
          </CardTitle>
          <CardDescription> Gerencie seus equipamentos </CardDescription>
        </CardHeader>
        <CardContent>
          <Button class="w-full"> Ver Equipamentos </Button>
        </CardContent>
      </Card>

      <!-- Inventory Card -->
      <Card
        class="hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateTo('/inventario')"
      >
        <CardHeader>
          <CardTitle class="flex items-center gap-2"> 🎒 Inventário </CardTitle>
          <CardDescription> Gerencie seus itens e recursos </CardDescription>
        </CardHeader>
        <CardContent>
          <Button class="w-full"> Ver Inventário </Button>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Activity -->
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription> Suas últimas ações no jogo </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div
            class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div class="text-2xl">🎉</div>
            <div>
              <p class="font-medium">Personagem criado!</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ characterStore.currentCharacter?.name }} foi criado com
                sucesso
              </p>
            </div>
          </div>

          <div
            class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div class="text-2xl">⚡</div>
            <div>
              <p class="font-medium">Pronto para a aventura!</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Comece explorando as batalhas ou desenvolvendo habilidades
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCharacterStore } from "~/stores/character";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();
const { showSuccess, showError, showInfo, showWarning } = useToast();

// Função para testar notificações
const testNotifications = () => {
  showSuccess("✅ Notificação de sucesso funcionando!");
  setTimeout(() => showError("❌ Notificação de erro funcionando!"), 500);
  setTimeout(() => showInfo("ℹ️ Notificação de informação funcionando!"), 1000);
  setTimeout(() => showWarning("⚠️ Notificação de aviso funcionando!"), 1500);
};

// Computed properties para progresso
const xpForNextLevel = computed(() => {
  if (!characterStore.currentCharacter) return 0;
  const currentLevel = characterStore.currentCharacter.level;
  const xpNeeded = Math.floor(1000 * Math.pow(currentLevel, 1.5));
  return xpNeeded - characterStore.currentCharacter.xp;
});

const xpProgress = computed(() => {
  if (!characterStore.currentCharacter) return 0;
  const currentLevel = characterStore.currentCharacter.level;
  const currentLevelXp = Math.floor(1000 * Math.pow(currentLevel - 1, 1.5));
  const nextLevelXp = Math.floor(1000 * Math.pow(currentLevel, 1.5));
  const progress =
    ((characterStore.currentCharacter.xp - currentLevelXp) /
      (nextLevelXp - currentLevelXp)) *
    100;
  return Math.max(0, Math.min(100, progress));
});

const healthProgress = computed(() => {
  if (!characterStore.currentCharacter) return 0;
  return (
    (characterStore.currentCharacter.stats.health /
      characterStore.currentCharacter.stats.max_health) *
    100
  );
});

onMounted(async () => {
  // Garantir que sempre haja um personagem selecionado
  await characterStore.ensureCharacterSelected();

  // Se não há personagens, redirecionar para criação
  if (characterStore.characters.length === 0) {
    await navigateTo("/criar-personagem");
  }
});
</script>
