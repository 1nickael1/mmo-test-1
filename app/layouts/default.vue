<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header
      class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/home"
              class="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              Ninja Space RPG
            </NuxtLink>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink
              to="/home"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/personagem"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Personagem
            </NuxtLink>
            <NuxtLink
              to="/habilidades"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Habilidades
            </NuxtLink>
            <NuxtLink
              to="/batalhas"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Batalhas
            </NuxtLink>
            <NuxtLink
              to="/modo-historia"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              História
            </NuxtLink>
            <NuxtLink
              to="/loja"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Loja
            </NuxtLink>
            <NuxtLink
              to="/equipamentos"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Equipamentos
            </NuxtLink>
            <NuxtLink
              to="/inventario"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Inventário
            </NuxtLink>
            <NuxtLink
              to="/mineracao"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Mineração
            </NuxtLink>
          </nav>

          <!-- User Info & Actions -->
          <div class="flex items-center space-x-4">
            <!-- Server Time -->
            <div class="hidden md:flex items-center space-x-2 text-sm">
              <div class="relative group">
                <Badge variant="outline" class="cursor-help">
                  🕐 {{ serverTime }}
                </Badge>
                <div
                  class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
                >
                  Próxima cura em: {{ timeToNextHeal }}
                  <div
                    class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Character Info -->
            <div
              v-if="characterStore.currentCharacter"
              class="hidden sm:flex items-center space-x-2 text-sm"
            >
              <Badge variant="secondary">
                Nível {{ characterStore.currentCharacter.level }}
              </Badge>
              <span class="text-gray-600 dark:text-gray-300">
                {{ characterStore.currentCharacter.name }}
              </span>
            </div>

            <!-- Logout Button -->
            <Button @click="handleLogout" variant="outline" size="sm">
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer
      class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto"
    >
      <div class="container mx-auto px-4 py-6">
        <div class="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 Ninja Space RPG. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>

    <!-- Toast Notifications -->
    <Sonner />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useHealthRegeneration } from "~/composables/useHealthRegeneration";
import { useCharacterStore } from "~/stores/character";

const characterStore = useCharacterStore();
const { startHealthRegeneration, stopHealthRegeneration, lastHealTime } =
  useHealthRegeneration();
const serverTime = ref("");
const timeToNextHeal = ref("");
let timeInterval: NodeJS.Timeout | null = null;

const updateServerTime = () => {
  const now = new Date();
  serverTime.value = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Calcular tempo até próxima cura
  const currentTime = now.getTime();
  const timeSinceLastHeal = currentTime - lastHealTime.value;
  const timeUntilNextHeal = 15000 - (timeSinceLastHeal % 15000);

  const seconds = Math.ceil(timeUntilNextHeal / 1000);
  timeToNextHeal.value = `${seconds}s`;
};

const handleLogout = async () => {
  try {
    await $fetch("/api/auth/logout", {
      method: "POST",
    });
    await navigateTo("/login");
  } catch (error) {
    console.error("Erro no logout:", error);
  }
};

onMounted(async () => {
  updateServerTime();
  timeInterval = setInterval(updateServerTime, 1000);

  // Carregar personagem se não estiver carregado
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0]);
    }
  }

  // Iniciar regeneração de vida se há um personagem
  if (characterStore.currentCharacter) {
    startHealthRegeneration();
  }
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
  stopHealthRegeneration();
});
</script>
