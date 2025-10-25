<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1
        class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Habilidades
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
        Desenvolva novas técnicas e jutsus para seu personagem
      </p>
    </div>

    <!-- Character Info -->
    <div v-if="characterStore.currentCharacter" class="flex justify-center">
      <Card class="w-full max-w-md">
        <CardContent class="p-4 md:p-6">
          <div class="text-center">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ characterStore.currentCharacter.name }}
            </h2>
            <div
              class="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4"
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
                    : "🚀 Guerreiro"
                }}
              </Badge>
              <span>Nível {{ characterStore.currentCharacter.level }}</span>
              <span>{{ characterStore.currentCharacter.xp }} XP</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-lg text-gray-600 dark:text-gray-400">
        Carregando habilidades...
      </div>
    </div>

    <!-- Skills Content -->
    <div v-else class="space-y-8">
      <!-- Learned Skills -->
      <div v-if="learnedSkills.length > 0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Habilidades Aprendidas
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="skill in learnedSkills"
            :key="skill.id"
            class="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
          >
            <CardHeader class="pb-2">
              <CardTitle class="text-lg flex items-center gap-2">
                <span class="text-green-600 dark:text-green-400">✅</span>
                {{ skill.skill_name }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-2">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{
                    skill.description || getSkillDescription(skill.skill_name)
                  }}
                </p>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">Nível:</span>
                  <Badge variant="secondary">{{ skill.level }}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Available Skills -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Habilidades Disponíveis
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="skill in availableSkills"
            :key="skill.name"
            class="transition-all duration-200"
            :class="
              skill.can_learn ? 'hover:shadow-lg cursor-pointer' : 'opacity-60'
            "
            @click="skill.can_learn ? learnSkill(skill.name) : null"
          >
            <CardHeader class="pb-2">
              <CardTitle class="text-lg flex items-center gap-2">
                <span
                  v-if="skill.learned"
                  class="text-green-600 dark:text-green-400"
                  >✅</span
                >
                <span
                  v-else-if="skill.can_learn"
                  class="text-blue-600 dark:text-blue-400"
                  >🎯</span
                >
                <span v-else class="text-gray-400">🔒</span>
                {{ skill.name }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ skill.description }}
                </p>

                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Custo:</span>
                    <span class="font-medium">{{ skill.cost }} 🪙</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400"
                      >XP necessário:</span
                    >
                    <span class="font-medium">{{ skill.xp_required }} XP</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400"
                      >Nível necessário:</span
                    >
                    <span class="font-medium">{{ skill.level_required }}</span>
                  </div>
                </div>

                <!-- Requirements Status -->
                <div class="space-y-1 text-xs">
                  <div class="flex items-center gap-2">
                    <span
                      :class="
                        (characterStore.currentCharacter?.level || 0) >=
                        skill.level_required
                          ? 'text-green-600'
                          : 'text-red-600'
                      "
                    >
                      {{
                        (characterStore.currentCharacter?.level || 0) >=
                        skill.level_required
                          ? "✅"
                          : "❌"
                      }}
                    </span>
                    <span
                      :class="
                        (characterStore.currentCharacter?.level || 0) >=
                        skill.level_required
                          ? 'text-green-600'
                          : 'text-red-600'
                      "
                    >
                      Nível {{ skill.level_required }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span
                      :class="
                        (characterStore.currentCharacter?.xp || 0) >=
                        skill.xp_required
                          ? 'text-green-600'
                          : 'text-red-600'
                      "
                    >
                      {{
                        (characterStore.currentCharacter?.xp || 0) >=
                        skill.xp_required
                          ? "✅"
                          : "❌"
                      }}
                    </span>
                    <span
                      :class="
                        (characterStore.currentCharacter?.xp || 0) >=
                        skill.xp_required
                          ? 'text-green-600'
                          : 'text-red-600'
                      "
                    >
                      {{ skill.xp_required }} XP
                    </span>
                  </div>
                </div>

                <!-- Action Button -->
                <Button
                  v-if="skill.can_learn"
                  @click.stop="learnSkill(skill.name)"
                  :disabled="learning"
                  class="w-full"
                >
                  {{ learning ? "Aprendendo..." : "Aprender" }}
                </Button>
                <Button
                  v-else-if="skill.learned"
                  disabled
                  variant="outline"
                  class="w-full"
                >
                  Já Aprendida
                </Button>
                <Button v-else disabled variant="outline" class="w-full">
                  Requisitos não atendidos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCharacterStore } from "~/stores/character";
import type { Skill } from "~/types";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();

const loading = ref(false);
const learning = ref(false);
const learnedSkills = ref<Skill[]>([]);
const availableSkills = ref<any[]>([]);

// Descriptions for skills
const skillDescriptions: Record<string, string> = {
  "Kunai Throw": "Ataque à distância com kunais afiadas",
  "Fire Jutsu": "Técnica de fogo que queima o oponente",
  "Wind Jutsu": "Técnica de vento que corta como lâmina",
  "Shadow Clone": "Cria clones ilusórios para confundir o inimigo",
  Chidori: "Ataque elétrico devastador com mil pássaros",
  Rasengan: "Esfera de energia concentrada e rotativa",
  "Plasma Shot": "Disparo de plasma energético de alta potência",
  "Energy Shield": "Escudo de energia que absorve dano",
  "Gravity Bomb": "Bomba de gravidade que comprime o espaço",
  "Quantum Strike": "Ataque quântico que transcende a realidade",
  "Nova Blast": "Explosão estelar de poder devastador",
  "Black Hole": "Cria um buraco negro temporário no campo de batalha",
};

const getSkillDescription = (skillName: string): string => {
  return skillDescriptions[skillName] || "Habilidade especial";
};

const loadSkills = async () => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;

  try {
    // Carregar habilidades aprendidas
    const learnedResponse = await $fetch(
      `/api/skills/${characterStore.currentCharacter.id}`
    );
    learnedSkills.value = learnedResponse.data || [];

    // Carregar habilidades disponíveis
    const availableResponse = await $fetch(
      `/api/skills/available?class=${characterStore.currentCharacter.class}&level=${characterStore.currentCharacter.level}`
    );
    const allSkills = availableResponse.data || [];

    // Marcar habilidades já aprendidas
    const learnedSkillNames = learnedSkills.value.map(
      (skill) => skill.skill_name
    );
    availableSkills.value = allSkills.map((skill) => {
      const hasLevel =
        (characterStore.currentCharacter?.level || 0) >= skill.level_required;
      const hasXp =
        (characterStore.currentCharacter?.xp || 0) >= skill.xp_required;
      const isLearned = learnedSkillNames.includes(skill.name);

      return {
        ...skill,
        learned: isLearned,
        can_learn: hasLevel && hasXp && !isLearned,
      };
    });
  } catch (error) {
    } finally {
    loading.value = false;
  }
};

const learnSkill = async (skillName: string) => {
  if (!characterStore.currentCharacter) return;

  learning.value = true;

  try {
    const response = await $fetch("/api/skills/learn", {
      method: "POST",
      body: {
        character_id: characterStore.currentCharacter.id,
        skill_name: skillName,
      },
    });

    if (response.success) {
      // Recarregar habilidades
      await loadSkills();
      // Atualizar personagem no store
      await characterStore.loadCharacters();
    }
  } catch (error: any) {
    // Aqui você pode adicionar um toast de erro
  } finally {
    learning.value = false;
  }
};

// Usar o composable de gerenciamento de personagem
const { ensureCharacterSelected, onCharacterChange } = useCharacterManager();

onMounted(async () => {
  // Garantir que há um personagem selecionado
  await ensureCharacterSelected();

  await loadSkills();

  // Escutar mudanças de personagem
  onCharacterChange(async (character) => {
    await loadSkills();
  });
});
</script>
