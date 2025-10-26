<template>
  <div v-if="characterStore.currentCharacter && !loading" class="space-y-8">
    <!-- Character Header -->
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        {{ characterStore.currentCharacter.name }}
      </h1>
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-400 text-sm md:text-base"
      >
        <Badge
          :variant="
            characterStore.currentCharacter.class === 'ninja'
              ? 'default'
              : 'secondary'
          "
        >
          {{
            characterStore.currentCharacter.class === "ninja"
              ? "🥷 Ninja"
              : "🚀 Guerreiro Espacial"
          }}
        </Badge>
        <span>Nível {{ characterStore.currentCharacter.level }}</span>
        <span>{{ characterStore.currentCharacter.xp }} XP</span>
      </div>
    </div>

    <!-- My Characters Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          Meus Personagens
        </h2>
        <Button
          @click="navigateTo('/criar-personagem')"
          variant="outline"
          size="sm"
        >
          ➕ Criar Novo
        </Button>
      </div>

      <!-- Characters Grid -->
      <div
        v-if="characterStore.characters.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
          @click="switchCharacter(character)"
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
          <CardContent>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Força:</span>
                <span class="font-medium">{{ character.stats.strength }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Agilidade:</span>
                <span class="font-medium">{{ character.stats.agility }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Defesa:</span>
                <span class="font-medium">{{ character.stats.defense }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Vida:</span>
                <span class="font-medium"
                  >{{ character.stats.health }}/{{
                    character.stats.max_health
                  }}</span
                >
              </div>
              <div
                v-if="characterStore.currentCharacter?.id === character.id"
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

      <!-- No Characters State -->
      <div v-else class="text-center py-8">
        <div class="text-6xl mb-4">🎮</div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Nenhum Personagem Encontrado
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Crie seu primeiro personagem para começar a aventura!
        </p>
        <Button @click="navigateTo('/criar-personagem')" size="lg">
          🚀 Criar Primeiro Personagem
        </Button>
      </div>
    </div>

    <!-- Character Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Nível {{ characterStore.currentCharacter.level }}
          </div>
          <div class="space-y-2">
            <div
              class="flex justify-between text-sm text-gray-600 dark:text-gray-400"
            >
              <span>XP Atual: {{ characterStore.currentCharacter.xp }}</span>
              <span>{{ xpForNextLevel }} para próximo nível</span>
            </div>
            <Progress :value="xpProgress" class="h-3" />
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
          <div class="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            {{ characterStore.currentCharacter.stats.health }}/{{
              characterStore.currentCharacter.stats.max_health
            }}
          </div>
          <Progress :value="healthProgress" class="h-3" />
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
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {{ characterStore.currentCharacter.stats.strength }}
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Ataque físico
          </p>
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
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">
            {{ characterStore.currentCharacter.stats.agility }}
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Velocidade e esquiva
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Skills Summary -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          🎯 Habilidades Aprendidas
        </h2>
        <Button @click="navigateTo('/habilidades')" variant="outline" size="sm">
          Ver Todas
        </Button>
      </div>

      <div
        v-if="characterSkills.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <Card
          v-for="skill in characterSkills.slice(0, 6)"
          :key="skill.id"
          class="hover:shadow-lg transition-all duration-200"
        >
          <CardHeader class="pb-2">
            <CardTitle class="text-lg flex items-center gap-2">
              <span class="text-blue-600 dark:text-blue-400">🎯</span>
              {{ skill.name }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Nível:</span>
                <span class="font-medium">{{ skill.level }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Dano:</span>
                <span class="font-medium">{{ skill.damage }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Cooldown:</span>
                <span class="font-medium">{{ skill.cooldown }}s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div v-else class="text-center py-8">
        <div class="text-6xl mb-4">🎯</div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Nenhuma Habilidade Aprendida
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Aprenda suas primeiras habilidades para começar a aventura!
        </p>
        <Button @click="navigateTo('/habilidades')" size="lg">
          🎯 Aprender Habilidades
        </Button>
      </div>
    </div>

    <!-- Equipment Summary -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          🛡️ Equipamentos Atuais
        </h2>
        <Button
          @click="navigateTo('/equipamentos')"
          variant="outline"
          size="sm"
        >
          Gerenciar
        </Button>
      </div>

      <div
        v-if="equippedItems.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <Card
          v-for="item in equippedItems"
          :key="item.id"
          class="hover:shadow-lg transition-all duration-200 border-green-200 dark:border-green-800"
        >
          <CardHeader class="pb-2">
            <CardTitle class="text-lg flex items-center gap-2">
              <span class="text-green-600 dark:text-green-400">🛡️</span>
              {{ item.name }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Tipo:</span>
                <span class="font-medium">{{ item.equipment_type }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Raridade:</span>
                <Badge :variant="getRarityVariant(item.rarity)">
                  {{ item.rarity }}
                </Badge>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Nível:</span>
                <span class="font-medium">{{ item.level_required }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div v-else class="text-center py-8">
        <div class="text-6xl mb-4">🛡️</div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Nenhum Equipamento
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Equipe-se com armas e armaduras para aumentar seu poder!
        </p>
        <Button @click="navigateTo('/equipamentos')" size="lg">
          🛡️ Equipar Itens
        </Button>
      </div>
    </div>

    <!-- Additional Stats -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Defense -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"> 🛡️ Defesa </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {{ characterStore.currentCharacter.stats.defense }}
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Reduz dano recebido
          </p>
        </CardContent>
      </Card>

      <!-- Character Info -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            📊 Informações
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Classe:</span>
            <span class="font-medium">
              {{
                characterStore.currentCharacter.class === "ninja"
                  ? "Ninja"
                  : "Guerreiro Espacial"
              }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Criado em:</span>
            <span class="font-medium">{{
              formatDate(characterStore.currentCharacter.created_at)
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400"
              >Última atualização:</span
            >
            <span class="font-medium">{{
              formatDate(characterStore.currentCharacter.updated_at)
            }}</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Character Description -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          📖 Descrição da Classe
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          v-if="characterStore.currentCharacter.class === 'ninja'"
          class="space-y-3"
        >
          <p class="text-gray-700 dark:text-gray-300">
            <strong>🥷 Ninja:</strong> Especialista em combate furtivo e
            movimentos ágeis. Os ninjas são mestres da agilidade e podem
            executar ataques rápidos e precisos.
          </p>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                Vantagens:
              </h4>
              <ul class="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Alta agilidade para ataques rápidos</li>
                <li>• Habilidades de stealth</li>
                <li>• Movimento ágil em combate</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                Especialidades:
              </h4>
              <ul class="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Jutsus de fogo e vento</li>
                <li>• Técnicas de esquiva</li>
                <li>• Ataques críticos</li>
              </ul>
            </div>
          </div>
        </div>

        <div v-else class="space-y-3">
          <p class="text-gray-700 dark:text-gray-300">
            <strong>🚀 Guerreiro Espacial:</strong> Combatente robusto e
            resistente, especialista em tecnologia avançada e combate direto.
          </p>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                Vantagens:
              </h4>
              <ul class="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Alta força e defesa</li>
                <li>• Mais pontos de vida</li>
                <li>• Tecnologia avançada</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                Especialidades:
              </h4>
              <ul class="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Armas de energia</li>
                <li>• Escudos defensivos</li>
                <li>• Ataques devastadores</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Quick Actions -->
    <div class="grid md:grid-cols-3 gap-4">
      <Button @click="navigateTo('/batalhas')" class="h-16 text-lg">
        ⚔️ Ir para Batalhas
      </Button>
      <Button
        @click="navigateTo('/habilidades')"
        variant="outline"
        class="h-16 text-lg"
      >
        🎯 Ver Habilidades
      </Button>
      <Button
        @click="navigateTo('/melhorias')"
        variant="outline"
        class="h-16 text-lg"
      >
        🏗️ Ver Melhorias
      </Button>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else-if="loading" class="text-center py-12">
    <div class="text-6xl mb-4">⏳</div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      Carregando personagens...
    </h2>
    <p class="text-gray-600 dark:text-gray-400">
      Aguarde enquanto carregamos seus personagens.
    </p>
  </div>

  <!-- No Character Selected -->
  <div v-else class="text-center py-12">
    <div class="text-6xl mb-4">👤</div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      Nenhum personagem selecionado
    </h2>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Selecione um personagem ou crie um novo para continuar.
    </p>
    <div class="flex gap-4 justify-center">
      <Button @click="navigateTo('/selecionar-personagem')">
        Selecionar Personagem
      </Button>
      <Button @click="navigateTo('/criar-personagem')" variant="outline">
        Criar Personagem
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useToast } from "~/composables/useToast";
import { useCharacterStore } from "~/stores/character";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();
const { showSuccess } = useToast();

// Importar função getAuthHeaders do store
const { getAuthHeaders } = characterStore;

// Estado de loading
const loading = ref(true);

// Dados das habilidades e equipamentos
const characterSkills = ref([]);
const equippedItems = ref([]);

// Carregar personagens ao montar o componente
onMounted(async () => {
  loading.value = true;

  try {
    await characterStore.loadCharacters();

    // Garantir que sempre há um personagem selecionado
    await characterStore.ensureCharacterSelected();

    // Carregar habilidades e equipamentos do personagem atual
    if (characterStore.currentCharacter) {
      await loadCharacterSkills();
      await loadCharacterEquipment();
    }
  } catch (error) {
    console.error("Erro ao carregar personagens:", error);
  } finally {
    loading.value = false;
  }
});

// Carregar habilidades do personagem
const loadCharacterSkills = async () => {
  try {
    const { data } = await $fetch(
      `/api/skills/${characterStore.currentCharacter.id}`,
      {
        headers: getAuthHeaders(),
      }
    );
    characterSkills.value = data || [];
  } catch (error) {
    console.error("Erro ao carregar habilidades:", error);
    characterSkills.value = [];
  }
};

// Carregar equipamentos do personagem
const loadCharacterEquipment = async () => {
  try {
    const { data } = await $fetch(
      `/api/equipment/${characterStore.currentCharacter.id}`,
      {
        headers: getAuthHeaders(),
      }
    );
    // Filtrar apenas itens equipados
    equippedItems.value = (data || []).filter((item: any) => item.equipped);
  } catch (error) {
    console.error("Erro ao carregar equipamentos:", error);
    equippedItems.value = [];
  }
};

// Função para obter variante de raridade
const getRarityVariant = (rarity: string) => {
  switch (rarity?.toLowerCase()) {
    case "comum":
      return "secondary";
    case "raro":
      return "default";
    case "épico":
      return "destructive";
    case "lendário":
      return "outline";
    default:
      return "secondary";
  }
};

// Usar o composable de gerenciamento de personagem
const { switchCharacter: switchCharacterManager } = useCharacterManager();

// Trocar personagem
const switchCharacter = async (character: any) => {
  // Trocar personagem usando o composable
  await switchCharacterManager(character);

  // Recarregar habilidades e equipamentos do novo personagem
  await loadCharacterSkills();
  await loadCharacterEquipment();

  // Mostrar notificação de sucesso
  showSuccess(`Personagem ${character.name} selecionado!`);
};

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

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
