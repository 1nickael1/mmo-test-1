import { _ as _sfc_main$3, c as _sfc_main$1, a as _sfc_main$2$1, b as _sfc_main$1$1 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$2 } from './Button-CSVd3JRx.mjs';
import { _ as _sfc_main$4 } from './index-D4e07kgT.mjs';
import { _ as _sfc_main$5 } from './CardDescription-DNTQjROL.mjs';
import { _ as _sfc_main$6 } from './Progress-D2Z_7baA.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, withModifiers, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import { u as useCookie } from './cookie-b4_mmrzk.mjs';
import { u as useCharacterManager } from './useCharacterManager-4e-hc2Oy.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import 'reka-ui';
import './index-B4_YPG6v.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "batalhas",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const loading = ref(false);
    const battleLoading = ref(false);
    const battleState = ref("selecting");
    const opponents = ref([]);
    const currentBattle = ref(null);
    const battleResult = ref(null);
    const battleTurn = ref("player");
    const battleMessage = ref("Escolha sua a\xE7\xE3o!");
    const availableSkills = ref([]);
    const skillCooldowns = ref({});
    const battleLog = ref([]);
    const getDifficultyColor = (difficulty) => {
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
    const getDifficultyVariant = (difficulty) => {
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
    const getDifficultyLabel = (difficulty) => {
      switch (difficulty) {
        case "easy":
          return "F\xE1cil";
        case "medium":
          return "M\xE9dio";
        case "hard":
          return "Dif\xEDcil";
        default:
          return "Desconhecido";
      }
    };
    const addBattleLog = (message) => {
      const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      battleLog.value.unshift(`[${timestamp}] ${message}`);
      if (battleLog.value.length > 20) {
        battleLog.value = battleLog.value.slice(0, 20);
      }
    };
    const saveBattleState = async () => {
      if (!currentBattle.value || !characterStore.currentCharacter) return;
      try {
        const token = useCookie("@mmo/ninja/token");
        await $fetch("/api/battles/save", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
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
              battleMessage: battleMessage.value
            }
          }
        });
      } catch (error) {
      }
    };
    const finishBattle = async () => {
      if (!characterStore.currentCharacter) return;
      try {
        const token = useCookie("@mmo/ninja/token");
        await $fetch("/api/battles/finish", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            character_id: characterStore.currentCharacter.id
          }
        });
      } catch (error) {
      }
    };
    const startBattle = async (opponent) => {
      if (!characterStore.currentCharacter) return;
      battleLoading.value = true;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch("/api/battles/start", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            character_id: characterStore.currentCharacter.id,
            opponent_id: opponent.id
          }
        });
        if (response.success) {
          currentBattle.value = response.data;
          battleState.value = "battling";
          battleTurn.value = "player";
          battleMessage.value = "Escolha sua a\xE7\xE3o!";
          battleLog.value = [];
          addBattleLog(`Batalha iniciada contra ${opponent.name}!`);
          startCooldownTimer();
          await saveBattleState();
        }
      } catch (error) {
      } finally {
        battleLoading.value = false;
      }
    };
    const playerAttack = async () => {
      if (!currentBattle.value) return;
      battleLoading.value = true;
      battleMessage.value = "Voc\xEA ataca!";
      const playerDamage = Math.max(
        1,
        currentBattle.value.character.stats.strength - currentBattle.value.opponent.stats.defense + Math.floor(Math.random() * 5)
      );
      currentBattle.value.opponent.stats.health = Math.max(
        0,
        currentBattle.value.opponent.stats.health - playerDamage
      );
      addBattleLog(
        `${currentBattle.value.character.name} ataca e causa ${playerDamage} de dano!`
      );
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      if (currentBattle.value.opponent.stats.health <= 0) {
        await resolveBattle("victory");
      } else {
        await saveBattleState();
        battleTurn.value = "enemy";
        battleMessage.value = `${currentBattle.value.opponent.name} ataca de volta!`;
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        await enemyAttack();
      }
      battleLoading.value = false;
    };
    const useSkill = async (skill) => {
      var _a;
      if (!currentBattle.value) return;
      battleLoading.value = true;
      battleMessage.value = `Voc\xEA usa ${skill.skill_name}!`;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch("/api/skills/use", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            character_id: currentBattle.value.character.id,
            skill_name: skill.skill_name
          }
        });
        if (response.success) {
          const skillDamage = response.data.damage;
          currentBattle.value.opponent.stats.health = Math.max(
            0,
            currentBattle.value.opponent.stats.health - skillDamage
          );
          skillCooldowns.value[skill.skill_name] = response.data.cooldown_seconds;
          battleMessage.value = `${skill.skill_name} causou ${skillDamage} de dano!`;
          addBattleLog(
            `${currentBattle.value.character.name} usa ${skill.skill_name} e causa ${skillDamage} de dano!`
          );
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          if (currentBattle.value.opponent.stats.health <= 0) {
            await resolveBattle("victory");
          } else {
            await saveBattleState();
            battleTurn.value = "enemy";
            battleMessage.value = `${currentBattle.value.opponent.name} ataca de volta!`;
            await new Promise((resolve) => setTimeout(resolve, 1e3));
            await enemyAttack();
          }
        }
      } catch (error) {
        battleMessage.value = ((_a = error.data) == null ? void 0 : _a.message) || "Erro ao usar habilidade";
      } finally {
        battleLoading.value = false;
      }
    };
    const isSkillOnCooldown = (skillName) => {
      return skillCooldowns.value[skillName] > 0;
    };
    const getSkillCooldownText = (skillName) => {
      const cooldown = skillCooldowns.value[skillName];
      return cooldown > 0 ? `${cooldown}s` : "";
    };
    const playerDefend = async () => {
      if (!currentBattle.value) return;
      battleLoading.value = true;
      battleMessage.value = "Voc\xEA se defende!";
      addBattleLog(`${currentBattle.value.character.name} se defende!`);
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      battleTurn.value = "enemy";
      battleMessage.value = `${currentBattle.value.opponent.name} ataca!`;
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      await enemyAttack(0.5);
      battleLoading.value = false;
    };
    const enemyAttack = async (defenseMultiplier = 1) => {
      if (!currentBattle.value) return;
      const enemyDamage = Math.max(
        1,
        Math.floor(
          (currentBattle.value.opponent.stats.strength - currentBattle.value.character.stats.defense + Math.floor(Math.random() * 5)) * defenseMultiplier
        )
      );
      currentBattle.value.character.stats.health = Math.max(
        0,
        currentBattle.value.character.stats.health - enemyDamage
      );
      addBattleLog(
        `${currentBattle.value.opponent.name} ataca e causa ${enemyDamage} de dano!`
      );
      if (currentBattle.value.character.stats.health <= 0) {
        await resolveBattle("defeat");
      } else {
        await saveBattleState();
        battleTurn.value = "player";
        battleMessage.value = "Escolha sua a\xE7\xE3o!";
      }
    };
    const resolveBattle = async (outcome) => {
      if (!currentBattle.value) return;
      try {
        const token = useCookie("@mmo/ninja/token");
        const isStoryBattle = currentBattle.value.battle_type === "story";
        const chapter = currentBattle.value.chapter;
        const response = await $fetch("/api/battles/resolve", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            character_id: currentBattle.value.character.id,
            opponent_id: currentBattle.value.opponent.id,
            outcome,
            character_health_remaining: currentBattle.value.character.stats.health,
            battle_type: isStoryBattle ? "story" : "normal",
            chapter
          }
        });
        if (response.success) {
          battleResult.value = response.data;
          battleState.value = "result";
          if (outcome === "victory") {
            addBattleLog(
              `\u{1F389} ${currentBattle.value.character.name} venceu a batalha!`
            );
            if (isStoryBattle && response.data.chapter_completed) {
              addBattleLog(`\u{1F4D6} Cap\xEDtulo ${chapter} completado!`);
            }
          } else {
            addBattleLog(`\u{1F480} ${currentBattle.value.character.name} foi derrotado!`);
          }
          await finishBattle();
          await characterStore.loadCharacters();
        }
      } catch (error) {
      }
    };
    const resetBattle = () => {
      battleState.value = "selecting";
      currentBattle.value = null;
      battleResult.value = null;
      battleTurn.value = "player";
      battleMessage.value = "Escolha sua a\xE7\xE3o!";
      skillCooldowns.value = {};
      battleLog.value = [];
      stopCooldownTimer();
    };
    let cooldownTimer = null;
    const startCooldownTimer = () => {
      if (cooldownTimer) clearInterval(cooldownTimer);
      cooldownTimer = setInterval();
    };
    const stopCooldownTimer = () => {
      if (cooldownTimer) {
        clearInterval(cooldownTimer);
        cooldownTimer = null;
      }
    };
    useCharacterManager();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_Card = _sfc_main$3;
      const _component_CardContent = _sfc_main$1;
      const _component_Button = _sfc_main$2;
      const _component_CardHeader = _sfc_main$2$1;
      const _component_CardTitle = _sfc_main$1$1;
      const _component_Badge = _sfc_main$4;
      const _component_CardDescription = _sfc_main$5;
      const _component_Progress = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Batalhas </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Enfrente oponentes e ganhe XP, recursos e gl\xF3ria! </p></div>`);
      if (unref(characterStore).currentCharacter) {
        _push(`<div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_Card, { class: "w-full max-w-2xl" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardContent, { class: "p-4 md:p-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"${_scopeId2}><div${_scopeId2}><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.name)}</h3><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}> N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</p></div><div${_scopeId2}><div class="text-2xl font-bold text-red-600 dark:text-red-400"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.stats.health)}/${ssrInterpolate(unref(characterStore).currentCharacter.stats.max_health)}</div><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>Vida</p></div><div${_scopeId2}><div class="text-2xl font-bold text-blue-600 dark:text-blue-400"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.xp)}</div><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>XP</p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-center" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, toDisplayString(unref(characterStore).currentCharacter.name), 1),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-2xl font-bold text-red-600 dark:text-red-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.health) + "/" + toDisplayString(unref(characterStore).currentCharacter.stats.max_health), 1),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Vida")
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, toDisplayString(unref(characterStore).currentCharacter.xp), 1),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "XP")
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardContent, { class: "p-4 md:p-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-center" }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, toDisplayString(unref(characterStore).currentCharacter.name), 1),
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "text-2xl font-bold text-red-600 dark:text-red-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.health) + "/" + toDisplayString(unref(characterStore).currentCharacter.stats.max_health), 1),
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Vida")
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, toDisplayString(unref(characterStore).currentCharacter.xp), 1),
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "XP")
                      ])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (battleState.value === "battling" && currentBattle.value) {
        _push(`<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100"> Batalha em Andamento </h3><p class="text-blue-700 dark:text-blue-300"> Voc\xEA est\xE1 em batalha contra ${ssrInterpolate(currentBattle.value.opponent.name)}</p></div>`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => {
            battleState.value = "selecting";
            currentBattle.value = null;
            finishBattle();
          },
          variant: "outline",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Abandonar Batalha `);
            } else {
              return [
                createTextVNode(" Abandonar Batalha ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (battleState.value === "selecting") {
        _push(`<div class="space-y-6"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"><!--[-->`);
        ssrRenderList(opponents.value, (opponent) => {
          _push(ssrRenderComponent(_component_Card, {
            key: opponent.id,
            class: ["hover:shadow-lg transition-all duration-200 cursor-pointer", getDifficultyColor(opponent.difficulty)],
            onClick: ($event) => startBattle(opponent)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_CardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center justify-between" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span${_scopeId3}>${ssrInterpolate(opponent.name)}</span>`);
                            _push4(ssrRenderComponent(_component_Badge, {
                              variant: getDifficultyVariant(opponent.difficulty)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(getDifficultyLabel(opponent.difficulty))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(getDifficultyLabel(opponent.difficulty)), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode("span", null, toDisplayString(opponent.name), 1),
                              createVNode(_component_Badge, {
                                variant: getDifficultyVariant(opponent.difficulty)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getDifficultyLabel(opponent.difficulty)), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_CardDescription, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` N\xEDvel ${ssrInterpolate(opponent.level)}`);
                          } else {
                            return [
                              createTextVNode(" N\xEDvel " + toDisplayString(opponent.level), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_CardTitle, { class: "flex items-center justify-between" }, {
                          default: withCtx(() => [
                            createVNode("span", null, toDisplayString(opponent.name), 1),
                            createVNode(_component_Badge, {
                              variant: getDifficultyVariant(opponent.difficulty)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getDifficultyLabel(opponent.difficulty)), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_CardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode(" N\xEDvel " + toDisplayString(opponent.level), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_CardContent, { class: "space-y-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>For\xE7a:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(opponent.stats.strength)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Agilidade:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(opponent.stats.agility)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Defesa:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(opponent.stats.defense)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Vida:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(opponent.stats.health)}</span></div></div><div class="border-t pt-3"${_scopeId2}><h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2"${_scopeId2}> Recompensas: </h4><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>XP:</span><span class="font-medium text-blue-600 dark:text-blue-400"${_scopeId2}>${ssrInterpolate(opponent.xp_reward)}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Ouro:</span><span class="font-medium text-yellow-600 dark:text-yellow-400"${_scopeId2}>${ssrInterpolate(opponent.gold_reward)}</span></div></div>`);
                      _push3(ssrRenderComponent(_component_Button, {
                        class: "w-full",
                        disabled: loading.value,
                        onClick: ($event) => startBattle(opponent)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(loading.value ? "Iniciando..." : "Batalhar")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(loading.value ? "Iniciando..." : "Batalhar"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(opponent.stats.strength), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(opponent.stats.agility), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(opponent.stats.defense), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(opponent.stats.health), 1)
                          ])
                        ]),
                        createVNode("div", { class: "border-t pt-3" }, [
                          createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white mb-2" }, " Recompensas: "),
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "XP:"),
                            createVNode("span", { class: "font-medium text-blue-600 dark:text-blue-400" }, toDisplayString(opponent.xp_reward), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Ouro:"),
                            createVNode("span", { class: "font-medium text-yellow-600 dark:text-yellow-400" }, toDisplayString(opponent.gold_reward), 1)
                          ])
                        ]),
                        createVNode(_component_Button, {
                          class: "w-full",
                          disabled: loading.value,
                          onClick: withModifiers(($event) => startBattle(opponent), ["stop"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(loading.value ? "Iniciando..." : "Batalhar"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_CardHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_CardTitle, { class: "flex items-center justify-between" }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(opponent.name), 1),
                          createVNode(_component_Badge, {
                            variant: getDifficultyVariant(opponent.difficulty)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getDifficultyLabel(opponent.difficulty)), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_CardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode(" N\xEDvel " + toDisplayString(opponent.level), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_CardContent, { class: "space-y-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(opponent.stats.strength), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(opponent.stats.agility), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(opponent.stats.defense), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(opponent.stats.health), 1)
                        ])
                      ]),
                      createVNode("div", { class: "border-t pt-3" }, [
                        createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white mb-2" }, " Recompensas: "),
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "XP:"),
                          createVNode("span", { class: "font-medium text-blue-600 dark:text-blue-400" }, toDisplayString(opponent.xp_reward), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Ouro:"),
                          createVNode("span", { class: "font-medium text-yellow-600 dark:text-yellow-400" }, toDisplayString(opponent.gold_reward), 1)
                        ])
                      ]),
                      createVNode(_component_Button, {
                        class: "w-full",
                        disabled: loading.value,
                        onClick: withModifiers(($event) => startBattle(opponent), ["stop"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(loading.value ? "Iniciando..." : "Batalhar"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else if (battleState.value === "battling") {
        _push(`<div class="space-y-6"><div class="text-center"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2"> Batalha em Andamento </h2><p class="text-gray-600 dark:text-gray-400">${ssrInterpolate((_a = currentBattle.value) == null ? void 0 : _a.character.name)} vs ${ssrInterpolate((_b = currentBattle.value) == null ? void 0 : _b.opponent.name)}</p></div>`);
        _push(ssrRenderComponent(_component_Card, { class: "max-w-4xl mx-auto" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardContent, { class: "p-4 md:p-8" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
                  if (_push3) {
                    _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"${_scopeId2}><div class="text-center"${_scopeId2}><h3 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4"${_scopeId2}>${ssrInterpolate((_a2 = currentBattle.value) == null ? void 0 : _a2.character.name)}</h3><div class="space-y-2"${_scopeId2}><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}> Vida: ${ssrInterpolate((_b2 = currentBattle.value) == null ? void 0 : _b2.character.stats.health)}/${ssrInterpolate((_c2 = currentBattle.value) == null ? void 0 : _c2.character.stats.max_health)}</div>`);
                    _push3(ssrRenderComponent(_component_Progress, {
                      "model-value": Math.min(
                        100,
                        (((_d2 = currentBattle.value) == null ? void 0 : _d2.character.stats.health) || 0) / (((_e = currentBattle.value) == null ? void 0 : _e.character.stats.max_health) || 1) * 100
                      ),
                      class: "h-3"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="text-xs text-gray-500 dark:text-gray-400 text-center"${_scopeId2}>${ssrInterpolate(Math.round(
                      (((_f = currentBattle.value) == null ? void 0 : _f.character.stats.health) || 0) / (((_g = currentBattle.value) == null ? void 0 : _g.character.stats.max_health) || 1) * 100
                    ))}% </div></div></div><div class="text-center"${_scopeId2}><h3 class="text-xl font-bold text-red-600 dark:text-red-400 mb-4"${_scopeId2}>${ssrInterpolate((_h = currentBattle.value) == null ? void 0 : _h.opponent.name)}</h3><div class="space-y-2"${_scopeId2}><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}> Vida: ${ssrInterpolate((_i = currentBattle.value) == null ? void 0 : _i.opponent.stats.health)}/${ssrInterpolate((_j = currentBattle.value) == null ? void 0 : _j.opponent.stats.max_health)}</div>`);
                    _push3(ssrRenderComponent(_component_Progress, {
                      "model-value": Math.min(
                        100,
                        (((_k = currentBattle.value) == null ? void 0 : _k.opponent.stats.health) || 0) / (((_l = currentBattle.value) == null ? void 0 : _l.opponent.stats.max_health) || 1) * 100
                      ),
                      class: "h-3"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="text-xs text-gray-500 dark:text-gray-400 text-center"${_scopeId2}>${ssrInterpolate(Math.round(
                      (((_m = currentBattle.value) == null ? void 0 : _m.opponent.stats.health) || 0) / (((_n = currentBattle.value) == null ? void 0 : _n.opponent.stats.max_health) || 1) * 100
                    ))}% </div></div></div></div><div class="mt-8 text-center"${_scopeId2}><div class="space-y-4"${_scopeId2}><div class="text-lg font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(battleMessage.value)}</div>`);
                    if (battleTurn.value === "player") {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_Button, {
                        onClick: playerAttack,
                        disabled: battleLoading.value,
                        class: "w-full sm:w-auto"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(battleLoading.value ? "Atacando..." : "Atacar")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(battleLoading.value ? "Atacando..." : "Atacar"), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_Button, {
                        onClick: playerDefend,
                        variant: "outline",
                        disabled: battleLoading.value,
                        class: "w-full sm:w-auto"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Defender `);
                          } else {
                            return [
                              createTextVNode(" Defender ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                      if (availableSkills.value.length > 0) {
                        _push3(`<div class="space-y-2"${_scopeId2}><h4 class="text-sm font-medium text-gray-900 dark:text-white text-center"${_scopeId2}> Habilidades: </h4><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center"${_scopeId2}><!--[-->`);
                        ssrRenderList(availableSkills.value, (skill) => {
                          _push3(ssrRenderComponent(_component_Button, {
                            key: skill.id,
                            onClick: ($event) => useSkill(skill),
                            variant: "secondary",
                            size: "sm",
                            class: "w-full",
                            disabled: battleLoading.value || isSkillOnCooldown(skill.skill_name)
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`<span class="truncate"${_scopeId3}>${ssrInterpolate(skill.skill_name)}</span>`);
                                if (isSkillOnCooldown(skill.skill_name)) {
                                  _push4(`<span class="ml-1 text-xs"${_scopeId3}> (${ssrInterpolate(getSkillCooldownText(skill.skill_name))}) </span>`);
                                } else {
                                  _push4(`<!---->`);
                                }
                              } else {
                                return [
                                  createVNode("span", { class: "truncate" }, toDisplayString(skill.skill_name), 1),
                                  isSkillOnCooldown(skill.skill_name) ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "ml-1 text-xs"
                                  }, " (" + toDisplayString(getSkillCooldownText(skill.skill_name)) + ") ", 1)) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        });
                        _push3(`<!--]--></div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else if (battleTurn.value === "enemy") {
                      _push3(`<div class="text-center"${_scopeId2}><div class="text-gray-600 dark:text-gray-400"${_scopeId2}>${ssrInterpolate((_o = currentBattle.value) == null ? void 0 : _o.opponent.name)} est\xE1 pensando... </div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                    if (battleLog.value.length > 0) {
                      _push3(`<div class="mt-4 md:mt-8"${_scopeId2}><h4 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-4 text-center"${_scopeId2}> Log da Batalha </h4><div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 md:p-4 max-h-32 md:max-h-48 overflow-y-auto"${_scopeId2}><div class="space-y-1 md:space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList(battleLog.value, (logEntry, index) => {
                        _push3(`<div class="text-xs md:text-sm text-gray-700 dark:text-gray-300"${_scopeId2}>${ssrInterpolate(logEntry)}</div>`);
                      });
                      _push3(`<!--]--></div></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("h3", { class: "text-xl font-bold text-blue-600 dark:text-blue-400 mb-4" }, toDisplayString((_p = currentBattle.value) == null ? void 0 : _p.character.name), 1),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Vida: " + toDisplayString((_q = currentBattle.value) == null ? void 0 : _q.character.stats.health) + "/" + toDisplayString((_r = currentBattle.value) == null ? void 0 : _r.character.stats.max_health), 1),
                            createVNode(_component_Progress, {
                              "model-value": Math.min(
                                100,
                                (((_s = currentBattle.value) == null ? void 0 : _s.character.stats.health) || 0) / (((_t = currentBattle.value) == null ? void 0 : _t.character.stats.max_health) || 1) * 100
                              ),
                              class: "h-3"
                            }, null, 8, ["model-value"]),
                            createVNode("div", { class: "text-xs text-gray-500 dark:text-gray-400 text-center" }, toDisplayString(Math.round(
                              (((_u = currentBattle.value) == null ? void 0 : _u.character.stats.health) || 0) / (((_v = currentBattle.value) == null ? void 0 : _v.character.stats.max_health) || 1) * 100
                            )) + "% ", 1)
                          ])
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("h3", { class: "text-xl font-bold text-red-600 dark:text-red-400 mb-4" }, toDisplayString((_w = currentBattle.value) == null ? void 0 : _w.opponent.name), 1),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Vida: " + toDisplayString((_x = currentBattle.value) == null ? void 0 : _x.opponent.stats.health) + "/" + toDisplayString((_y = currentBattle.value) == null ? void 0 : _y.opponent.stats.max_health), 1),
                            createVNode(_component_Progress, {
                              "model-value": Math.min(
                                100,
                                (((_z = currentBattle.value) == null ? void 0 : _z.opponent.stats.health) || 0) / (((_A = currentBattle.value) == null ? void 0 : _A.opponent.stats.max_health) || 1) * 100
                              ),
                              class: "h-3"
                            }, null, 8, ["model-value"]),
                            createVNode("div", { class: "text-xs text-gray-500 dark:text-gray-400 text-center" }, toDisplayString(Math.round(
                              (((_B = currentBattle.value) == null ? void 0 : _B.opponent.stats.health) || 0) / (((_C = currentBattle.value) == null ? void 0 : _C.opponent.stats.max_health) || 1) * 100
                            )) + "% ", 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 text-center" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "text-lg font-medium text-gray-900 dark:text-white" }, toDisplayString(battleMessage.value), 1),
                          battleTurn.value === "player" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-4"
                          }, [
                            createVNode("div", { class: "flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center" }, [
                              createVNode(_component_Button, {
                                onClick: playerAttack,
                                disabled: battleLoading.value,
                                class: "w-full sm:w-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(battleLoading.value ? "Atacando..." : "Atacar"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(_component_Button, {
                                onClick: playerDefend,
                                variant: "outline",
                                disabled: battleLoading.value,
                                class: "w-full sm:w-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Defender ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            availableSkills.value.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-2"
                            }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white text-center" }, " Habilidades: "),
                              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(availableSkills.value, (skill) => {
                                  return openBlock(), createBlock(_component_Button, {
                                    key: skill.id,
                                    onClick: ($event) => useSkill(skill),
                                    variant: "secondary",
                                    size: "sm",
                                    class: "w-full",
                                    disabled: battleLoading.value || isSkillOnCooldown(skill.skill_name)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "truncate" }, toDisplayString(skill.skill_name), 1),
                                      isSkillOnCooldown(skill.skill_name) ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "ml-1 text-xs"
                                      }, " (" + toDisplayString(getSkillCooldownText(skill.skill_name)) + ") ", 1)) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick", "disabled"]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true)
                          ])) : battleTurn.value === "enemy" ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center"
                          }, [
                            createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, toDisplayString((_D = currentBattle.value) == null ? void 0 : _D.opponent.name) + " est\xE1 pensando... ", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        battleLog.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-4 md:mt-8"
                        }, [
                          createVNode("h4", { class: "text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-4 text-center" }, " Log da Batalha "),
                          createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-3 md:p-4 max-h-32 md:max-h-48 overflow-y-auto" }, [
                            createVNode("div", { class: "space-y-1 md:space-y-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(battleLog.value, (logEntry, index) => {
                                return openBlock(), createBlock("div", {
                                  key: index,
                                  class: "text-xs md:text-sm text-gray-700 dark:text-gray-300"
                                }, toDisplayString(logEntry), 1);
                              }), 128))
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardContent, { class: "p-4 md:p-8" }, {
                  default: withCtx(() => {
                    var _a2, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
                    return [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("h3", { class: "text-xl font-bold text-blue-600 dark:text-blue-400 mb-4" }, toDisplayString((_a2 = currentBattle.value) == null ? void 0 : _a2.character.name), 1),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Vida: " + toDisplayString((_b2 = currentBattle.value) == null ? void 0 : _b2.character.stats.health) + "/" + toDisplayString((_c2 = currentBattle.value) == null ? void 0 : _c2.character.stats.max_health), 1),
                            createVNode(_component_Progress, {
                              "model-value": Math.min(
                                100,
                                (((_d2 = currentBattle.value) == null ? void 0 : _d2.character.stats.health) || 0) / (((_e = currentBattle.value) == null ? void 0 : _e.character.stats.max_health) || 1) * 100
                              ),
                              class: "h-3"
                            }, null, 8, ["model-value"]),
                            createVNode("div", { class: "text-xs text-gray-500 dark:text-gray-400 text-center" }, toDisplayString(Math.round(
                              (((_f = currentBattle.value) == null ? void 0 : _f.character.stats.health) || 0) / (((_g = currentBattle.value) == null ? void 0 : _g.character.stats.max_health) || 1) * 100
                            )) + "% ", 1)
                          ])
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("h3", { class: "text-xl font-bold text-red-600 dark:text-red-400 mb-4" }, toDisplayString((_h = currentBattle.value) == null ? void 0 : _h.opponent.name), 1),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Vida: " + toDisplayString((_i = currentBattle.value) == null ? void 0 : _i.opponent.stats.health) + "/" + toDisplayString((_j = currentBattle.value) == null ? void 0 : _j.opponent.stats.max_health), 1),
                            createVNode(_component_Progress, {
                              "model-value": Math.min(
                                100,
                                (((_k = currentBattle.value) == null ? void 0 : _k.opponent.stats.health) || 0) / (((_l = currentBattle.value) == null ? void 0 : _l.opponent.stats.max_health) || 1) * 100
                              ),
                              class: "h-3"
                            }, null, 8, ["model-value"]),
                            createVNode("div", { class: "text-xs text-gray-500 dark:text-gray-400 text-center" }, toDisplayString(Math.round(
                              (((_m = currentBattle.value) == null ? void 0 : _m.opponent.stats.health) || 0) / (((_n = currentBattle.value) == null ? void 0 : _n.opponent.stats.max_health) || 1) * 100
                            )) + "% ", 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 text-center" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "text-lg font-medium text-gray-900 dark:text-white" }, toDisplayString(battleMessage.value), 1),
                          battleTurn.value === "player" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-4"
                          }, [
                            createVNode("div", { class: "flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center" }, [
                              createVNode(_component_Button, {
                                onClick: playerAttack,
                                disabled: battleLoading.value,
                                class: "w-full sm:w-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(battleLoading.value ? "Atacando..." : "Atacar"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(_component_Button, {
                                onClick: playerDefend,
                                variant: "outline",
                                disabled: battleLoading.value,
                                class: "w-full sm:w-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Defender ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            availableSkills.value.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-2"
                            }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white text-center" }, " Habilidades: "),
                              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(availableSkills.value, (skill) => {
                                  return openBlock(), createBlock(_component_Button, {
                                    key: skill.id,
                                    onClick: ($event) => useSkill(skill),
                                    variant: "secondary",
                                    size: "sm",
                                    class: "w-full",
                                    disabled: battleLoading.value || isSkillOnCooldown(skill.skill_name)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "truncate" }, toDisplayString(skill.skill_name), 1),
                                      isSkillOnCooldown(skill.skill_name) ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "ml-1 text-xs"
                                      }, " (" + toDisplayString(getSkillCooldownText(skill.skill_name)) + ") ", 1)) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick", "disabled"]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true)
                          ])) : battleTurn.value === "enemy" ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center"
                          }, [
                            createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, toDisplayString((_o = currentBattle.value) == null ? void 0 : _o.opponent.name) + " est\xE1 pensando... ", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        battleLog.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-4 md:mt-8"
                        }, [
                          createVNode("h4", { class: "text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-4 text-center" }, " Log da Batalha "),
                          createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-3 md:p-4 max-h-32 md:max-h-48 overflow-y-auto" }, [
                            createVNode("div", { class: "space-y-1 md:space-y-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(battleLog.value, (logEntry, index) => {
                                return openBlock(), createBlock("div", {
                                  key: index,
                                  class: "text-xs md:text-sm text-gray-700 dark:text-gray-300"
                                }, toDisplayString(logEntry), 1);
                              }), 128))
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (battleState.value === "result") {
        _push(`<div class="space-y-6"><div class="text-center"><h2 class="${ssrRenderClass([
          ((_c = battleResult.value) == null ? void 0 : _c.outcome) === "victory" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
          "text-3xl font-bold mb-4"
        ])}">${ssrInterpolate(((_d = battleResult.value) == null ? void 0 : _d.outcome) === "victory" ? "\u{1F389} Vit\xF3ria!" : "\u{1F480} Derrota...")}</h2></div>`);
        _push(ssrRenderComponent(_component_Card, { class: "max-w-2xl mx-auto" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Resultado da Batalha`);
                        } else {
                          return [
                            createTextVNode("Resultado da Batalha")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "text-center" }, {
                        default: withCtx(() => [
                          createTextVNode("Resultado da Batalha")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CardContent, { class: "space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2, _c2, _d2;
                  if (_push3) {
                    if ((_a2 = battleResult.value) == null ? void 0 : _a2.rewards) {
                      _push3(`<div class="space-y-3"${_scopeId2}><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId2}> Recompensas: </h3><div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>XP Ganho:</span><span class="font-medium text-blue-600 dark:text-blue-400"${_scopeId2}> +${ssrInterpolate(battleResult.value.rewards.xp)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Ouro Ganho:</span><span class="font-medium text-yellow-600 dark:text-yellow-400"${_scopeId2}> +${ssrInterpolate(battleResult.value.rewards.gold)}</span></div>`);
                      if (battleResult.value.rewards.items) {
                        _push3(`<div class="col-span-2"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Itens:</span><span class="font-medium text-green-600 dark:text-green-400 ml-2"${_scopeId2}>${ssrInterpolate(battleResult.value.rewards.items.join(", "))}</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if ((_b2 = battleResult.value) == null ? void 0 : _b2.level_up) {
                      _push3(`<div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"${_scopeId2}><div class="text-2xl mb-2"${_scopeId2}>\u{1F389}</div><div class="text-lg font-bold text-blue-600 dark:text-blue-400"${_scopeId2}> Level Up! Agora voc\xEA \xE9 n\xEDvel ${ssrInterpolate(battleResult.value.new_level)}! </div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex gap-4 justify-center pt-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Button, { onClick: resetBattle }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Batalhar Novamente `);
                        } else {
                          return [
                            createTextVNode(" Batalhar Novamente ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Button, {
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/home"),
                      variant: "outline"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Voltar ao Home `);
                        } else {
                          return [
                            createTextVNode(" Voltar ao Home ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      ((_c2 = battleResult.value) == null ? void 0 : _c2.rewards) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Recompensas: "),
                        createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "XP Ganho:"),
                            createVNode("span", { class: "font-medium text-blue-600 dark:text-blue-400" }, " +" + toDisplayString(battleResult.value.rewards.xp), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Ouro Ganho:"),
                            createVNode("span", { class: "font-medium text-yellow-600 dark:text-yellow-400" }, " +" + toDisplayString(battleResult.value.rewards.gold), 1)
                          ]),
                          battleResult.value.rewards.items ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "col-span-2"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Itens:"),
                            createVNode("span", { class: "font-medium text-green-600 dark:text-green-400 ml-2" }, toDisplayString(battleResult.value.rewards.items.join(", ")), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])) : createCommentVNode("", true),
                      ((_d2 = battleResult.value) == null ? void 0 : _d2.level_up) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      }, [
                        createVNode("div", { class: "text-2xl mb-2" }, "\u{1F389}"),
                        createVNode("div", { class: "text-lg font-bold text-blue-600 dark:text-blue-400" }, " Level Up! Agora voc\xEA \xE9 n\xEDvel " + toDisplayString(battleResult.value.new_level) + "! ", 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex gap-4 justify-center pt-4" }, [
                        createVNode(_component_Button, { onClick: resetBattle }, {
                          default: withCtx(() => [
                            createTextVNode(" Batalhar Novamente ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Button, {
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/home"),
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Voltar ao Home ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_CardTitle, { class: "text-center" }, {
                      default: withCtx(() => [
                        createTextVNode("Resultado da Batalha")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CardContent, { class: "space-y-4" }, {
                  default: withCtx(() => {
                    var _a2, _b2;
                    return [
                      ((_a2 = battleResult.value) == null ? void 0 : _a2.rewards) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Recompensas: "),
                        createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "XP Ganho:"),
                            createVNode("span", { class: "font-medium text-blue-600 dark:text-blue-400" }, " +" + toDisplayString(battleResult.value.rewards.xp), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Ouro Ganho:"),
                            createVNode("span", { class: "font-medium text-yellow-600 dark:text-yellow-400" }, " +" + toDisplayString(battleResult.value.rewards.gold), 1)
                          ]),
                          battleResult.value.rewards.items ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "col-span-2"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Itens:"),
                            createVNode("span", { class: "font-medium text-green-600 dark:text-green-400 ml-2" }, toDisplayString(battleResult.value.rewards.items.join(", ")), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])) : createCommentVNode("", true),
                      ((_b2 = battleResult.value) == null ? void 0 : _b2.level_up) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      }, [
                        createVNode("div", { class: "text-2xl mb-2" }, "\u{1F389}"),
                        createVNode("div", { class: "text-lg font-bold text-blue-600 dark:text-blue-400" }, " Level Up! Agora voc\xEA \xE9 n\xEDvel " + toDisplayString(battleResult.value.new_level) + "! ", 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex gap-4 justify-center pt-4" }, [
                        createVNode(_component_Button, { onClick: resetBattle }, {
                          default: withCtx(() => [
                            createTextVNode(" Batalhar Novamente ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Button, {
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/home"),
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Voltar ao Home ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value && battleState.value === "selecting") {
        _push(`<div class="text-center py-8"><div class="text-lg text-gray-600 dark:text-gray-400"> Carregando oponentes... </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/batalhas.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=batalhas-DSCo2P_p.mjs.map
