<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard Administrativo
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Logado como: <span class="font-semibold text-red-600">root</span>
            </span>
            <Button @click="logout" variant="outline" size="sm"> Sair </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <ClientOnly>
          <!-- Loading State -->
          <div v-if="isAuthenticated === null" class="text-center">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"
            ></div>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Verificando autenticação...
            </p>
          </div>

          <!-- Login Form (se não estiver logado) -->
          <div v-else-if="isAuthenticated === false" class="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle class="text-center">Login Administrativo</CardTitle>
                <CardDescription class="text-center">
                  Acesso restrito para administradores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form @submit.prevent="login" class="space-y-4">
                  <div>
                    <Label for="username">Usuário</Label>
                    <Input
                      id="username"
                      v-model="loginForm.username"
                      type="text"
                      placeholder="root"
                      required
                    />
                  </div>
                  <div>
                    <Label for="password">Senha</Label>
                    <Input
                      id="password"
                      v-model="loginForm.password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" class="w-full" :disabled="loading">
                    {{ loading ? "Entrando..." : "Entrar" }}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <!-- Dashboard Content (se estiver logado) -->
          <div v-else class="space-y-6">
            <!-- Characters Section -->
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Personagens</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os personagens do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <!-- Character List -->
                  <div v-if="characters.length > 0" class="space-y-3">
                    <div
                      v-for="character in characters"
                      :key="character.id"
                      class="border rounded-lg p-4 bg-white dark:bg-gray-800"
                    >
                      <div class="flex justify-between items-start">
                        <div>
                          <h3
                            class="text-lg font-semibold text-gray-900 dark:text-white"
                          >
                            {{ character.name }}
                          </h3>
                          <p class="text-sm text-gray-500 dark:text-gray-400">
                            Classe: {{ character.class }} | Nível:
                            {{ character.level }} | XP: {{ character.xp }}
                          </p>
                          <p class="text-sm text-gray-500 dark:text-gray-400">
                            Usuário: {{ character.user_username }} ({{
                              character.user_email
                            }})
                          </p>
                        </div>
                        <div class="flex space-x-2">
                          <Button
                            @click="resetSkillsCooldown(character.id)"
                            variant="outline"
                            size="sm"
                            :disabled="loading"
                          >
                            Reset Cooldowns
                          </Button>
                          <Button
                            @click="openCharacterEditor(character)"
                            variant="outline"
                            size="sm"
                          >
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else-if="!loading"
                    class="text-center text-gray-500 dark:text-gray-400"
                  >
                    Nenhum personagem encontrado
                  </div>
                  <div v-if="loading" class="text-center">
                    Carregando personagens...
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ClientOnly>
      </div>
    </main>

    <!-- Character Editor Dialog -->
    <Dialog v-model:open="showCharacterEditor">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Personagem</DialogTitle>
          <DialogDescription>
            Modifique os atributos do personagem {{ selectedCharacter?.name }}
          </DialogDescription>
        </DialogHeader>
        <div v-if="selectedCharacter" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="level">Nível</Label>
              <Input
                id="level"
                v-model.number="editForm.level"
                type="number"
                min="1"
                max="50"
              />
            </div>
            <div>
              <Label for="xp">XP</Label>
              <Input
                id="xp"
                v-model.number="editForm.xp"
                type="number"
                min="0"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="health">Vida</Label>
              <Input
                id="health"
                v-model.number="editForm.stats.health"
                type="number"
                min="1"
              />
            </div>
            <div>
              <Label for="max_health">Vida Máxima</Label>
              <Input
                id="max_health"
                v-model.number="editForm.stats.max_health"
                type="number"
                min="1"
              />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <Label for="strength">Força</Label>
              <Input
                id="strength"
                v-model.number="editForm.stats.strength"
                type="number"
                min="1"
              />
            </div>
            <div>
              <Label for="agility">Agilidade</Label>
              <Input
                id="agility"
                v-model.number="editForm.stats.agility"
                type="number"
                min="1"
              />
            </div>
            <div>
              <Label for="defense">Defesa</Label>
              <Input
                id="defense"
                v-model.number="editForm.stats.defense"
                type="number"
                min="1"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showCharacterEditor = false">
            Cancelar
          </Button>
          <Button @click="updateCharacter" :disabled="loading">
            {{ loading ? "Salvando..." : "Salvar" }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "~/composables/useToast";

// Meta
definePageMeta({
  layout: false,
});

const { showSuccess, showError } = useToast();

// State
const isAuthenticated = ref<boolean | null>(null); // null = verificando, true = logado, false = não logado
const loading = ref(false);
const characters = ref<any[]>([]);
const showCharacterEditor = ref(false);
const selectedCharacter = ref<any>(null);

// Forms
const loginForm = ref({
  username: "",
  password: "",
});

const editForm = ref({
  level: 1,
  xp: 0,
  stats: {
    health: 100,
    max_health: 100,
    strength: 10,
    agility: 10,
    defense: 10,
  },
});

// Methods
const login = async () => {
  loading.value = true;
  try {
    const response = await $fetch("/api/admin/login", {
      method: "POST",
      body: loginForm.value,
    });

    if (response.success) {
      isAuthenticated.value = true;
      showSuccess("Login realizado com sucesso!");
      await loadCharacters();
    }
  } catch (error: any) {
    showError(error.data?.message || "Erro ao fazer login");
  } finally {
    loading.value = false;
  }
};

const logout = () => {
  isAuthenticated.value = false;
  characters.value = [];
  showCharacterEditor.value = false;
  selectedCharacter.value = null;
  // Limpar cookie
  document.cookie =
    "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const loadCharacters = async () => {
  loading.value = true;
  try {
    const response = await $fetch("/api/admin/characters");
    if (response.success) {
      characters.value = response.data.characters;
    }
  } catch (error: any) {
    showError(error.data?.message || "Erro ao carregar personagens");
  } finally {
    loading.value = false;
  }
};

const resetSkillsCooldown = async (characterId: number) => {
  loading.value = true;
  try {
    const response = await $fetch("/api/admin/reset-skills-cooldowns", {
      method: "POST",
      body: { character_id: characterId },
    });

    if (response.success) {
      showSuccess(`Cooldowns resetados para ${response.data.character_name}`);
    }
  } catch (error: any) {
    showError(error.data?.message || "Erro ao resetar cooldowns");
  } finally {
    loading.value = false;
  }
};

const openCharacterEditor = (character: any) => {
  selectedCharacter.value = character;
  editForm.value = {
    level: character.level,
    xp: character.xp,
    stats: {
      health: character.stats?.health || 100,
      max_health: character.stats?.max_health || 100,
      strength: character.stats?.strength || 10,
      agility: character.stats?.agility || 10,
      defense: character.stats?.defense || 10,
    },
  };
  showCharacterEditor.value = true;
};

const updateCharacter = async () => {
  if (!selectedCharacter.value) return;

  loading.value = true;
  try {
    const response = await $fetch("/api/admin/update-character", {
      method: "POST",
      body: {
        character_id: selectedCharacter.value.id,
        ...editForm.value,
      },
    });

    if (response.success) {
      showSuccess("Personagem atualizado com sucesso!");
      showCharacterEditor.value = false;
      await loadCharacters();
    }
  } catch (error: any) {
    showError(error.data?.message || "Erro ao atualizar personagem");
  } finally {
    loading.value = false;
  }
};

// Check authentication on mount
onMounted(async () => {
  // Só executar no cliente
  if (process.client) {
    // Verificar se já está autenticado verificando o cookie admin_token
    const adminToken = useCookie("admin_token");

    if (adminToken.value) {
      try {
        // Testar se o token é válido fazendo uma requisição simples
        const response = await $fetch("/api/admin/characters", {
          headers: {
            Authorization: `Bearer ${adminToken.value}`,
          },
        });

        if (response.success) {
          characters.value = response.data.characters;
          isAuthenticated.value = true;
        } else {
          isAuthenticated.value = false;
          adminToken.value = null;
        }
      } catch (error) {
        // Token inválido ou expirado
        isAuthenticated.value = false;
        adminToken.value = null;
      }
    } else {
      isAuthenticated.value = false;
    }
  }
});
</script>
