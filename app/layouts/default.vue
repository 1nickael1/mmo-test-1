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
              class="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              Ninja Space RPG
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <Button
            @click="toggleMobileMenu"
            variant="ghost"
            size="sm"
            class="md:hidden"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </Button>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-6">
            <a
              href="/home"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <a
              href="/personagem"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Personagem
            </a>
            <a
              href="/habilidades"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Habilidades
            </a>
            <a
              href="/batalhas"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Batalhas
            </a>
            <a
              href="/melhorias"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Melhorias
            </a>
            <a
              href="/modo-historia"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              História
            </a>
            <a
              href="/loja"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Loja
            </a>
            <a
              href="/equipamentos"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Equipamentos
            </a>
            <a
              href="/inventario"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Inventário
            </a>
            <a
              href="/mineracao"
              @click="handleNavigation"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Mineração
            </a>
          </nav>

          <!-- Desktop User Info & Actions -->
          <div class="hidden md:flex items-center space-x-4">
            <!-- Server Time -->
            <div class="flex items-center space-x-2 text-sm">
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
              class="flex items-center space-x-2 text-sm"
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

        <!-- Mobile Menu -->
        <div
          v-if="mobileMenuOpen"
          class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
        >
          <!-- Mobile Character Info -->
          <div
            v-if="characterStore.currentCharacter"
            class="flex items-center justify-between mb-4 px-2"
          >
            <div class="flex items-center space-x-2">
              <Badge variant="secondary">
                Nível {{ characterStore.currentCharacter.level }}
              </Badge>
              <span class="text-gray-600 dark:text-gray-300 text-sm">
                {{ characterStore.currentCharacter.name }}
              </span>
            </div>
            <Badge variant="outline" class="text-xs">
              🕐 {{ serverTime }}
            </Badge>
          </div>

          <!-- Mobile Navigation -->
          <nav class="grid grid-cols-2 gap-2">
            <a
              href="/home"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              🏠 Home
            </a>
            <a
              href="/personagem"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              👤 Personagem
            </a>
            <a
              href="/habilidades"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              ⚡ Habilidades
            </a>
            <a
              href="/batalhas"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              ⚔️ Batalhas
            </a>
            <a
              href="/melhorias"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              🏗️ Melhorias
            </a>
            <a
              href="/modo-historia"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              📖 História
            </a>
            <a
              href="/loja"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              🛒 Loja
            </a>
            <a
              href="/equipamentos"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              🛡️ Equipamentos
            </a>
            <a
              href="/inventario"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              🎒 Inventário
            </a>
            <a
              href="/mineracao"
              @click="handleMobileNavigation"
              class="flex items-center justify-center p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              ⛏️ Mineração
            </a>
            <Button
              @click="handleLogout"
              variant="outline"
              class="col-span-2 mt-2"
            >
              🚪 Sair
            </Button>
          </nav>
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
    <ClientOnly>
      <Sonner
        position="top-right"
        :toast-options="{
          duration: 4000,
          class: 'toast-notification',
        }"
      />
    </ClientOnly>
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
const mobileMenuOpen = ref(false);
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

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
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
