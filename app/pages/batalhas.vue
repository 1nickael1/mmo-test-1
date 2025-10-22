<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Batalhas
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Enfrente oponentes e ganhe XP, recursos e glória!
      </p>
    </div>

    <!-- Character Status -->
    <div v-if="characterStore.currentCharacter" class="flex justify-center">
      <Card class="w-full max-w-2xl">
        <CardContent class="p-6">
          <div class="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ characterStore.currentCharacter.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Nível {{ characterStore.currentCharacter.level }}
              </p>
            </div>
            <div>
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                {{ characterStore.currentCharacter.stats.health }}/{{
                  characterStore.currentCharacter.stats.max_health
                }}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Vida</p>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ characterStore.currentCharacter.xp }}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">XP</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Active Battle Alert -->
    <div
      v-if="battleState === 'battling' && currentBattle"
      class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100">
            Batalha em Andamento
          </h3>
          <p class="text-blue-700 dark:text-blue-300">
            Você está em batalha contra {{ currentBattle.opponent.name }}
          </p>
        </div>
        <Button
          @click="
            battleState = 'selecting';
            currentBattle = null;
            finishBattle();
          "
          variant="outline"
          size="sm"
        >
          Abandonar Batalha
        </Button>
      </div>
    </div>

    <!-- Battle State -->
    <div v-if="battleState === 'selecting'" class="space-y-6">
      <!-- Opponents Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="opponent in opponents"
          :key="opponent.id"
          class="hover:shadow-lg transition-all duration-200 cursor-pointer"
          :class="getDifficultyColor(opponent.difficulty)"
          @click="startBattle(opponent)"
        >
          <CardHeader>
            <CardTitle class="flex items-center justify-between">
              <span>{{ opponent.name }}</span>
              <Badge :variant="getDifficultyVariant(opponent.difficulty)">
                {{ getDifficultyLabel(opponent.difficulty) }}
              </Badge>
            </CardTitle>
            <CardDescription> Nível {{ opponent.level }} </CardDescription>
          </CardHeader>

          <CardContent class="space-y-4">
            <!-- Opponent Stats -->
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Força:</span>
                <span class="font-medium">{{ opponent.stats.strength }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Agilidade:</span>
                <span class="font-medium">{{ opponent.stats.agility }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Defesa:</span>
                <span class="font-medium">{{ opponent.stats.defense }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Vida:</span>
                <span class="font-medium">{{ opponent.stats.health }}</span>
              </div>
            </div>

            <!-- Rewards -->
            <div class="border-t pt-3">
              <h4
                class="text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                Recompensas:
              </h4>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">XP:</span>
                <span class="font-medium text-blue-600 dark:text-blue-400">{{
                  opponent.xp_reward
                }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Ouro:</span>
                <span
                  class="font-medium text-yellow-600 dark:text-yellow-400"
                  >{{ opponent.gold_reward }}</span
                >
              </div>
            </div>

            <!-- Battle Button -->
            <Button
              class="w-full"
              :disabled="loading"
              @click.stop="startBattle(opponent)"
            >
              {{ loading ? "Iniciando..." : "Batalhar" }}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Battle in Progress -->
    <div v-else-if="battleState === 'battling'" class="space-y-6">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Batalha em Andamento
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          {{ currentBattle?.character.name }} vs
          {{ currentBattle?.opponent.name }}
        </p>
      </div>

      <!-- Battle Arena -->
      <Card class="max-w-4xl mx-auto">
        <CardContent class="p-8">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Character -->
            <div class="text-center">
              <h3
                class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4"
              >
                {{ currentBattle?.character.name }}
              </h3>
              <div class="space-y-2">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Vida: {{ currentBattle?.character.stats.health }}/{{
                    currentBattle?.character.stats.max_health
                  }}
                </div>
                <Progress
                  :value="
                    ((currentBattle?.character.stats.health || 0) /
                      (currentBattle?.character.stats.max_health || 1)) *
                    100
                  "
                  class="h-3"
                />
              </div>
            </div>

            <!-- Opponent -->
            <div class="text-center">
              <h3 class="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                {{ currentBattle?.opponent.name }}
              </h3>
              <div class="space-y-2">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Vida: {{ currentBattle?.opponent.stats.health }}/{{
                    currentBattle?.opponent.stats.max_health
                  }}
                </div>
                <Progress
                  :value="
                    ((currentBattle?.opponent.stats.health || 0) /
                      (currentBattle?.opponent.stats.max_health || 1)) *
                    100
                  "
                  class="h-3"
                />
              </div>
            </div>
          </div>

          <!-- Battle Actions -->
          <div class="mt-8 text-center">
            <div class="space-y-4">
              <div class="text-lg font-medium text-gray-900 dark:text-white">
                {{ battleMessage }}
              </div>

              <div v-if="battleTurn === 'player'" class="space-y-4">
                <!-- Basic Actions -->
                <div class="flex gap-4 justify-center">
                  <Button @click="playerAttack" :disabled="battleLoading">
                    {{ battleLoading ? "Atacando..." : "Atacar" }}
                  </Button>
                  <Button
                    @click="playerDefend"
                    variant="outline"
                    :disabled="battleLoading"
                  >
                    Defender
                  </Button>
                </div>

                <!-- Skills -->
                <div v-if="availableSkills.length > 0" class="space-y-2">
                  <h4
                    class="text-sm font-medium text-gray-900 dark:text-white text-center"
                  >
                    Habilidades:
                  </h4>
                  <div class="flex flex-wrap gap-2 justify-center">
                    <Button
                      v-for="skill in availableSkills"
                      :key="skill.id"
                      @click="useSkill(skill)"
                      variant="secondary"
                      size="sm"
                      :disabled="
                        battleLoading || isSkillOnCooldown(skill.skill_name)
                      "
                    >
                      {{ skill.skill_name }}
                      <span
                        v-if="isSkillOnCooldown(skill.skill_name)"
                        class="ml-1 text-xs"
                      >
                        ({{ getSkillCooldownText(skill.skill_name) }})
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              <div v-else-if="battleTurn === 'enemy'" class="text-center">
                <div class="text-gray-600 dark:text-gray-400">
                  {{ currentBattle?.opponent.name }} está pensando...
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Battle Result -->
    <div v-else-if="battleState === 'result'" class="space-y-6">
      <div class="text-center">
        <h2
          class="text-3xl font-bold mb-4"
          :class="
            battleResult?.outcome === 'victory'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          "
        >
          {{
            battleResult?.outcome === "victory"
              ? "🎉 Vitória!"
              : "💀 Derrota..."
          }}
        </h2>
      </div>

      <Card class="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle class="text-center">Resultado da Batalha</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Rewards -->
          <div v-if="battleResult?.rewards" class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Recompensas:
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">XP Ganho:</span>
                <span class="font-medium text-blue-600 dark:text-blue-400">
                  +{{ battleResult.rewards.xp }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400"
                  >Ouro Ganho:</span
                >
                <span class="font-medium text-yellow-600 dark:text-yellow-400">
                  +{{ battleResult.rewards.gold }}
                </span>
              </div>
              <div v-if="battleResult.rewards.items" class="col-span-2">
                <span class="text-gray-600 dark:text-gray-400">Itens:</span>
                <span
                  class="font-medium text-green-600 dark:text-green-400 ml-2"
                >
                  {{ battleResult.rewards.items.join(", ") }}
                </span>
              </div>
            </div>
          </div>

          <!-- Level Up -->
          <div
            v-if="battleResult?.level_up"
            class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          >
            <div class="text-2xl mb-2">🎉</div>
            <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
              Level Up! Agora você é nível {{ battleResult.new_level }}!
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 justify-center pt-4">
            <Button @click="resetBattle"> Batalhar Novamente </Button>
            <Button @click="navigateTo('/home')" variant="outline">
              Voltar ao Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Loading State -->
    <div v-if="loading && battleState === 'selecting'" class="text-center py-8">
      <div class="text-lg text-gray-600 dark:text-gray-400">
        Carregando oponentes...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCharacterStore } from "~/stores/character";
import type { NPC } from "~/types";

definePageMeta({
  middleware: "auth",
});

const characterStore = useCharacterStore();

const loading = ref(false);
const battleLoading = ref(false);
const battleState = ref<"selecting" | "battling" | "result">("selecting");
const opponents = ref<NPC[]>([]);
const currentBattle = ref<any>(null);
const battleResult = ref<any>(null);
const battleTurn = ref<"player" | "enemy">("player");
const battleMessage = ref("Escolha sua ação!");
const availableSkills = ref<any[]>([]);
const skillCooldowns = ref<Record<string, number>>({});

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "border-green-200 hover:border-green-300";
    case "medium":
      return "border-yellow-200 hover:border-yellow-300";
    case "hard":
      return "border-red-200 hover:border-red-300";
    default:
      return "";
  }
};

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "default";
    case "medium":
      return "secondary";
    case "hard":
      return "destructive";
    default:
      return "default";
  }
};

const getDifficultyLabel = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "Fácil";
    case "medium":
      return "Médio";
    case "hard":
      return "Difícil";
    default:
      return "Desconhecido";
  }
};

const loadOpponents = async () => {
  if (!characterStore.currentCharacter) return;

  loading.value = true;

  try {
    const token = useCookie("token");
    const response = await $fetch(
      `/api/battles/opponents?character_id=${characterStore.currentCharacter.id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    opponents.value = response.data || [];
  } catch (error) {
    console.error("Erro ao carregar oponentes:", error);
  } finally {
    loading.value = false;
  }
};

const loadSkills = async () => {
  if (!characterStore.currentCharacter) return;

  try {
    const token = useCookie("token");
    const response = await $fetch(
      `/api/skills/${characterStore.currentCharacter.id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    availableSkills.value = response.data || [];
  } catch (error) {
    console.error("Erro ao carregar habilidades:", error);
  }
};

const saveBattleState = async () => {
  if (!currentBattle.value || !characterStore.currentCharacter) return;

  try {
    const token = useCookie("token");
    await $fetch("/api/battles/save", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: characterStore.currentCharacter.id,
        battle_type: "normal",
        opponent_data: currentBattle.value.opponent,
        character_health: currentBattle.value.character.stats.health,
        opponent_health: currentBattle.value.opponent.stats.health,
        battle_turn: 1,
        battle_data: {
          skillCooldowns: skillCooldowns.value,
          battleMessage: battleMessage.value,
        },
      },
    });
  } catch (error) {
    console.error("Erro ao salvar batalha:", error);
  }
};

const loadActiveBattle = async () => {
  if (!characterStore.currentCharacter) return;

  try {
    const token = useCookie("token");
    const response = await $fetch(
      `/api/battles/active?character_id=${characterStore.currentCharacter.id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (response.success && response.data) {
      const activeBattle = response.data;

      // Restaurar estado da batalha
      currentBattle.value = {
        character: {
          ...characterStore.currentCharacter,
          stats: {
            ...characterStore.currentCharacter.stats,
            health: activeBattle.character_health,
          },
        },
        opponent: {
          ...activeBattle.opponent_data,
          stats: {
            ...activeBattle.opponent_data.stats,
            health: activeBattle.opponent_health,
          },
        },
        battle_id: `restored_${activeBattle.id}`,
      };

      // Restaurar dados da batalha
      if (activeBattle.battle_data) {
        skillCooldowns.value = activeBattle.battle_data.skillCooldowns || {};
        battleMessage.value = activeBattle.battle_data.battleMessage || "";
      }

      battleState.value = "battling";
      startCooldownTimer();
    }
  } catch (error) {
    console.error("Erro ao carregar batalha ativa:", error);
  }
};

const finishBattle = async () => {
  if (!characterStore.currentCharacter) return;

  try {
    const token = useCookie("token");
    await $fetch("/api/battles/finish", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: characterStore.currentCharacter.id,
      },
    });
  } catch (error) {
    console.error("Erro ao finalizar batalha:", error);
  }
};

const startBattle = async (opponent: NPC) => {
  if (!characterStore.currentCharacter) return;

  battleLoading.value = true;

  try {
    const token = useCookie("token");
    const response = await $fetch("/api/battles/start", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: characterStore.currentCharacter.id,
        opponent_id: opponent.id,
      },
    });

    if (response.success) {
      currentBattle.value = response.data;
      battleState.value = "battling";
      battleTurn.value = "player";
      battleMessage.value = "Escolha sua ação!";
      startCooldownTimer();

      // Salvar estado da batalha
      await saveBattleState();
    }
  } catch (error) {
    console.error("Erro ao iniciar batalha:", error);
  } finally {
    battleLoading.value = false;
  }
};

const playerAttack = async () => {
  if (!currentBattle.value) return;

  battleLoading.value = true;
  battleMessage.value = "Você ataca!";

  // Simular ataque do jogador
  const playerDamage = Math.max(
    1,
    currentBattle.value.character.stats.strength -
      currentBattle.value.opponent.stats.defense +
      Math.floor(Math.random() * 5)
  );
  currentBattle.value.opponent.stats.health = Math.max(
    0,
    currentBattle.value.opponent.stats.health - playerDamage
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (currentBattle.value.opponent.stats.health <= 0) {
    // Vitória
    await resolveBattle("victory");
  } else {
    // Salvar estado após ataque do jogador
    await saveBattleState();

    // Turno do inimigo
    battleTurn.value = "enemy";
    battleMessage.value = `${currentBattle.value.opponent.name} ataca de volta!`;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await enemyAttack();
  }

  battleLoading.value = false;
};

const useSkill = async (skill: any) => {
  if (!currentBattle.value) return;

  battleLoading.value = true;
  battleMessage.value = `Você usa ${skill.skill_name}!`;

  try {
    const token = useCookie("token");
    const response = await $fetch("/api/skills/use", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: currentBattle.value.character.id,
        skill_name: skill.skill_name,
      },
    });

    if (response.success) {
      const skillDamage = response.data.damage;
      currentBattle.value.opponent.stats.health = Math.max(
        0,
        currentBattle.value.opponent.stats.health - skillDamage
      );

      // Definir cooldown
      skillCooldowns.value[skill.skill_name] = response.data.cooldown_seconds;

      battleMessage.value = `${skill.skill_name} causou ${skillDamage} de dano!`;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (currentBattle.value.opponent.stats.health <= 0) {
        // Vitória
        await resolveBattle("victory");
      } else {
        // Salvar estado após usar habilidade
        await saveBattleState();

        // Turno do inimigo
        battleTurn.value = "enemy";
        battleMessage.value = `${currentBattle.value.opponent.name} ataca de volta!`;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await enemyAttack();
      }
    }
  } catch (error: any) {
    console.error("Erro ao usar habilidade:", error);
    battleMessage.value = error.data?.message || "Erro ao usar habilidade";
  } finally {
    battleLoading.value = false;
  }
};

const isSkillOnCooldown = (skillName: string) => {
  return skillCooldowns.value[skillName] > 0;
};

const getSkillCooldownText = (skillName: string) => {
  const cooldown = skillCooldowns.value[skillName];
  return cooldown > 0 ? `${cooldown}s` : "";
};

const playerDefend = async () => {
  if (!currentBattle.value) return;

  battleLoading.value = true;
  battleMessage.value = "Você se defende!";

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Turno do inimigo com defesa reduzida
  battleTurn.value = "enemy";
  battleMessage.value = `${currentBattle.value.opponent.name} ataca!`;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await enemyAttack(0.5); // 50% de redução de dano

  battleLoading.value = false;
};

const enemyAttack = async (defenseMultiplier = 1) => {
  if (!currentBattle.value) return;

  const enemyDamage = Math.max(
    1,
    Math.floor(
      (currentBattle.value.opponent.stats.strength -
        currentBattle.value.character.stats.defense +
        Math.floor(Math.random() * 5)) *
        defenseMultiplier
    )
  );
  currentBattle.value.character.stats.health = Math.max(
    0,
    currentBattle.value.character.stats.health - enemyDamage
  );

  if (currentBattle.value.character.stats.health <= 0) {
    // Derrota
    await resolveBattle("defeat");
  } else {
    // Salvar estado após ataque do inimigo
    await saveBattleState();

    // Volta para o jogador
    battleTurn.value = "player";
    battleMessage.value = "Escolha sua ação!";
  }
};

const resolveBattle = async (outcome: "victory" | "defeat") => {
  if (!currentBattle.value) return;

  try {
    const token = useCookie("token");
    const response = await $fetch("/api/battles/resolve", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        character_id: currentBattle.value.character.id,
        opponent_id: currentBattle.value.opponent.id,
        outcome,
        character_health_remaining: currentBattle.value.character.stats.health,
      },
    });

    if (response.success) {
      battleResult.value = response.data;
      battleState.value = "result";

      // Finalizar batalha ativa
      await finishBattle();

      // Atualizar personagem no store
      await characterStore.loadCharacters();
    }
  } catch (error) {
    console.error("Erro ao resolver batalha:", error);
  }
};

const resetBattle = () => {
  battleState.value = "selecting";
  currentBattle.value = null;
  battleResult.value = null;
  battleTurn.value = "player";
  battleMessage.value = "Escolha sua ação!";
  skillCooldowns.value = {};
  stopCooldownTimer();
};

// Timer para reduzir cooldowns
let cooldownTimer: NodeJS.Timeout | null = null;

const startCooldownTimer = () => {
  if (cooldownTimer) clearInterval(cooldownTimer);

  cooldownTimer = setInterval(() => {
    Object.keys(skillCooldowns.value).forEach((skillName) => {
      if (skillCooldowns.value[skillName] > 0) {
        skillCooldowns.value[skillName]--;
        if (skillCooldowns.value[skillName] <= 0) {
          delete skillCooldowns.value[skillName];
        }
      }
    });
  }, 1000);
};

const stopCooldownTimer = () => {
  if (cooldownTimer) {
    clearInterval(cooldownTimer);
    cooldownTimer = null;
  }
};

onMounted(async () => {
  if (!characterStore.currentCharacter) {
    await characterStore.loadCharacters();
    if (characterStore.characters.length > 0) {
      characterStore.selectCharacter(characterStore.characters[0]);
    }
  }

  // Carregar batalha ativa primeiro
  await loadActiveBattle();

  // Se não há batalha ativa, carregar oponentes e habilidades
  if (battleState.value === "selecting") {
    await Promise.all([loadOpponents(), loadSkills()]);
  }
});
</script>
