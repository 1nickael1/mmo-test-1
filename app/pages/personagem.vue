<template>
  <div v-if="characterStore.currentCharacter" class="space-y-8">
    <!-- Character Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {{ characterStore.currentCharacter.name }}
      </h1>
      <div
        class="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400"
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

    <!-- Character Stats -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
import { computed } from "vue";
import { useCharacterStore } from "~/stores/character";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();

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
