<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header
      class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
    >
      <div class="container mx-auto px-4">
        <!-- Primeira linha: Logo e Mobile Menu Button -->
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

          <!-- Desktop User Info & Actions (Primeira linha) -->
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
                  Tempo do Servidor
                </div>
              </div>
            </div>

            <!-- User Info -->
            <div v-if="user" class="flex items-center space-x-2 text-sm">
              <Badge variant="secondary"> 👤 {{ user.username }} </Badge>
            </div>

            <!-- Character Info -->
            <div
              v-if="characterStore.currentCharacter"
              class="flex items-center space-x-2 text-sm"
            >
              <Badge variant="outline">
                ⚔️ {{ characterStore.currentCharacter.name }}
              </Badge>
              <Badge variant="outline">
                📊 Nível {{ characterStore.currentCharacter.level }}
              </Badge>
            </div>

            <!-- Logout Button -->
            <Button
              v-if="user"
              @click="logout"
              variant="outline"
              size="sm"
              class="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 border-red-300 dark:border-red-600 font-semibold"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Sair
            </Button>
          </div>
        </div>

        <!-- Segunda linha: Navigation Menu (Desktop) -->
        <div
          class="hidden md:block border-t border-gray-200 dark:border-gray-700"
        >
          <NavigationMenu class="flex justify-center">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/home'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  🏠 Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/personagem'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  ⚔️ Personagem
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/batalhas'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  ⚔️ Batalhas
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/habilidades'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  🎯 Habilidades
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/melhorias'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  🔧 Melhorias
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/equipamentos'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  🛡️ Equipamentos
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/inventario'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  🎒 Inventário
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/loja'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  🛒 Loja
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/mineracao'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  ⛏️ Mineração
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/missoes'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  📋 Missões
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/modo-historia'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  📖 História
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/rankings'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  🏆 Rankings
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  :href="'/selecionar-personagem'"
                  class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  🔄 Trocar Personagem
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <!-- Mobile Menu (Segunda linha quando aberto) -->
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
        >
          <div class="space-y-2">
            <NuxtLink
              to="/home"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              🏠 Home
            </NuxtLink>
            <NuxtLink
              to="/personagem"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              ⚔️ Personagem
            </NuxtLink>
            <NuxtLink
              to="/batalhas"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              ⚔️ Batalhas
            </NuxtLink>
            <NuxtLink
              to="/habilidades"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              🎯 Habilidades
            </NuxtLink>
            <NuxtLink
              to="/melhorias"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              🔧 Melhorias
            </NuxtLink>
            <NuxtLink
              to="/equipamentos"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              🛡️ Equipamentos
            </NuxtLink>
            <NuxtLink
              to="/inventario"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              🎒 Inventário
            </NuxtLink>
            <NuxtLink
              to="/loja"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              🛒 Loja
            </NuxtLink>
            <NuxtLink
              to="/mineracao"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              ⛏️ Mineração
            </NuxtLink>
            <NuxtLink
              to="/missoes"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              📋 Missões
            </NuxtLink>
            <NuxtLink
              to="/modo-historia"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              📖 História
            </NuxtLink>
            <NuxtLink
              to="/rankings"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              🏆 Rankings
            </NuxtLink>
            <NuxtLink
              to="/selecionar-personagem"
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              @click="closeMobileMenu"
            >
              🔄 Trocar Personagem
            </NuxtLink>

            <!-- Mobile Logout Button -->
            <button
              v-if="user"
              @click="logout"
              class="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800"
            >
              <svg
                class="w-4 h-4 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer
      class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="container mx-auto px-4 py-6">
        <div class="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 Ninja Space RPG. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from "~/stores/character";

const characterStore = useCharacterStore();
const user = ref(null);
const isMobileMenuOpen = ref(false);
const serverTime = ref("");

// Função para alternar o menu mobile
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Função para fechar o menu mobile
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Função para fazer logout
const logout = async () => {
  const { logout } = useLogout();
  await logout();
  // Limpar dados do usuário após logout
  user.value = null;
};

// Carregar dados do usuário
const loadUser = async () => {
  try {
    const token = useCookie("@mmo/ninja/token");
    if (token.value) {
      const response = await $fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      user.value = response.data;
    }
  } catch (error) {
    console.warn("Erro ao carregar usuário:", error);
    user.value = null;
  }
};

// Atualizar tempo do servidor
const updateServerTime = () => {
  const now = new Date();
  serverTime.value = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Atualizar tempo a cada segundo
onMounted(async () => {
  await loadUser();
  updateServerTime();
  setInterval(updateServerTime, 1000);
});
</script>
