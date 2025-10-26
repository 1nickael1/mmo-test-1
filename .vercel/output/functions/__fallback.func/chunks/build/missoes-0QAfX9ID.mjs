import { _ as _sfc_main$3, c as _sfc_main$1, a as _sfc_main$2$1, b as _sfc_main$1$1 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$2 } from './index-D4e07kgT.mjs';
import { _ as _sfc_main$4 } from './Button-CSVd3JRx.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import { u as useCookie } from './cookie-b4_mmrzk.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "missoes",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const claiming = ref(false);
    const starting = ref(false);
    const loading = ref(false);
    const missions = ref([]);
    const dailyMissions = ref([
      {
        id: "daily_battle_1",
        title: "Guerreiro Destemido",
        description: "Ven\xE7a 3 batalhas contra oponentes",
        progress: 0,
        target: 3,
        completed: false,
        rewards: { xp: 200, gold: 100, materials: 5 }
      },
      {
        id: "daily_skill_1",
        title: "Aprendiz S\xE1bio",
        description: "Aprenda 1 nova habilidade",
        progress: 0,
        target: 1,
        completed: false,
        rewards: { xp: 150, gold: 75, crystals: 2 }
      },
      {
        id: "daily_upgrade_1",
        title: "Construtor",
        description: "Complete 1 melhoria de base",
        progress: 0,
        target: 1,
        completed: false,
        rewards: { xp: 300, gold: 200, materials: 10 }
      }
    ]);
    const claimDailyMission = async (missionId) => {
      claiming.value = true;
      try {
        const mission = dailyMissions.value.find((m) => m.id === missionId);
        if (mission) {
          mission.completed = true;
          if (characterStore.currentCharacter) {
            await characterStore.addXp(
              characterStore.currentCharacter.id,
              mission.rewards.xp
            );
          }
        }
      } catch (error) {
      } finally {
        claiming.value = false;
      }
    };
    const startStoryMission = async (missionId) => {
      if (!characterStore.currentCharacter) return;
      starting.value = true;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch("/api/missions/complete", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            character_id: characterStore.currentCharacter.id,
            mission_id: missionId
          }
        });
        if (response.success) {
          const completedMission = missions.value.find((m) => m.id === missionId);
          if (completedMission) {
            completedMission.completed = true;
          }
          await characterStore.loadCharacters();
        }
      } catch (error) {
      } finally {
        starting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = _sfc_main$3;
      const _component_CardContent = _sfc_main$1;
      const _component_Badge = _sfc_main$2;
      const _component_CardHeader = _sfc_main$2$1;
      const _component_CardTitle = _sfc_main$1$1;
      const _component_Button = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Miss\xF5es </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Complete miss\xF5es para ganhar recompensas especiais </p></div>`);
      if (unref(characterStore).currentCharacter) {
        _push(`<div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_Card, { class: "w-full max-w-md" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardContent, { class: "p-4 md:p-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-center"${_scopeId2}><h2 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.name)}</h2><div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Badge, {
                      variant: unref(characterStore).currentCharacter.class === "ninja" ? "default" : "secondary"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(characterStore).currentCharacter.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(characterStore).currentCharacter.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</span></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h2", { class: "text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2" }, toDisplayString(unref(characterStore).currentCharacter.name), 1),
                        createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400" }, [
                          createVNode(_component_Badge, {
                            variant: unref(characterStore).currentCharacter.class === "ninja" ? "default" : "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(characterStore).currentCharacter.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro"), 1)
                            ]),
                            _: 1
                          }, 8, ["variant"]),
                          createVNode("span", null, "N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1)
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
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h2", { class: "text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2" }, toDisplayString(unref(characterStore).currentCharacter.name), 1),
                      createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400" }, [
                        createVNode(_component_Badge, {
                          variant: unref(characterStore).currentCharacter.class === "ninja" ? "default" : "secondary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(characterStore).currentCharacter.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro"), 1)
                          ]),
                          _: 1
                        }, 8, ["variant"]),
                        createVNode("span", null, "N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1)
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
      _push(`<div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Miss\xF5es Di\xE1rias </h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(dailyMissions.value, (mission) => {
        _push(ssrRenderComponent(_component_Card, {
          key: mission.id,
          class: "hover:shadow-lg transition-shadow"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(mission.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(mission.title), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(mission.title), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CardContent, { class: "space-y-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(mission.description)}</p><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Progresso:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(mission.progress)}/${ssrInterpolate(mission.target)}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Recompensas:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(mission.rewards.xp)} XP, ${ssrInterpolate(mission.rewards.gold)} \u{1FA99} `);
                    if (mission.rewards.materials) {
                      _push3(`<span${_scopeId2}>, ${ssrInterpolate(mission.rewards.materials)} \u2699\uFE0F</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</span></div>`);
                    if (mission.completed) {
                      _push3(ssrRenderComponent(_component_Button, {
                        disabled: "",
                        variant: "success",
                        class: "w-full"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` \u2705 Conclu\xEDda `);
                          } else {
                            return [
                              createTextVNode(" \u2705 Conclu\xEDda ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else if (mission.progress >= mission.target) {
                      _push3(ssrRenderComponent(_component_Button, {
                        onClick: ($event) => claimDailyMission(mission.id),
                        disabled: claiming.value,
                        class: "w-full"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(claiming.value ? "Resgatando..." : "Resgatar Recompensa")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(claiming.value ? "Resgatando..." : "Resgatar Recompensa"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_component_Button, {
                        disabled: "",
                        variant: "outline",
                        class: "w-full"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Em Progresso `);
                          } else {
                            return [
                              createTextVNode(" Em Progresso ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(mission.description), 1),
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Progresso:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(mission.progress) + "/" + toDisplayString(mission.target), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Recompensas:"),
                        createVNode("span", { class: "font-medium" }, [
                          createTextVNode(toDisplayString(mission.rewards.xp) + " XP, " + toDisplayString(mission.rewards.gold) + " \u{1FA99} ", 1),
                          mission.rewards.materials ? (openBlock(), createBlock("span", { key: 0 }, ", " + toDisplayString(mission.rewards.materials) + " \u2699\uFE0F", 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      mission.completed ? (openBlock(), createBlock(_component_Button, {
                        key: 0,
                        disabled: "",
                        variant: "success",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" \u2705 Conclu\xEDda ")
                        ]),
                        _: 1
                      })) : mission.progress >= mission.target ? (openBlock(), createBlock(_component_Button, {
                        key: 1,
                        onClick: ($event) => claimDailyMission(mission.id),
                        disabled: claiming.value,
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(claiming.value ? "Resgatando..." : "Resgatar Recompensa"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"])) : (openBlock(), createBlock(_component_Button, {
                        key: 2,
                        disabled: "",
                        variant: "outline",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Em Progresso ")
                        ]),
                        _: 1
                      }))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardHeader, { class: "pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(mission.title), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(_component_CardContent, { class: "space-y-3" }, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(mission.description), 1),
                    createVNode("div", { class: "flex justify-between text-sm" }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Progresso:"),
                      createVNode("span", { class: "font-medium" }, toDisplayString(mission.progress) + "/" + toDisplayString(mission.target), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between text-sm" }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Recompensas:"),
                      createVNode("span", { class: "font-medium" }, [
                        createTextVNode(toDisplayString(mission.rewards.xp) + " XP, " + toDisplayString(mission.rewards.gold) + " \u{1FA99} ", 1),
                        mission.rewards.materials ? (openBlock(), createBlock("span", { key: 0 }, ", " + toDisplayString(mission.rewards.materials) + " \u2699\uFE0F", 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    mission.completed ? (openBlock(), createBlock(_component_Button, {
                      key: 0,
                      disabled: "",
                      variant: "success",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u2705 Conclu\xEDda ")
                      ]),
                      _: 1
                    })) : mission.progress >= mission.target ? (openBlock(), createBlock(_component_Button, {
                      key: 1,
                      onClick: ($event) => claimDailyMission(mission.id),
                      disabled: claiming.value,
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(claiming.value ? "Resgatando..." : "Resgatar Recompensa"), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled"])) : (openBlock(), createBlock(_component_Button, {
                      key: 2,
                      disabled: "",
                      variant: "outline",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Em Progresso ")
                      ]),
                      _: 1
                    }))
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Miss\xF5es da Hist\xF3ria </h2>`);
      if (loading.value) {
        _push(`<div class="text-center py-8"><p class="text-gray-500 dark:text-gray-400">Carregando miss\xF5es...</p></div>`);
      } else {
        _push(`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(missions.value, (mission) => {
          _push(ssrRenderComponent(_component_Card, {
            key: mission.id,
            class: {
              "hover:shadow-lg transition-shadow cursor-pointer": mission.available && !mission.completed,
              "opacity-60 cursor-not-allowed": !mission.available || mission.completed
            },
            onClick: ($event) => mission.available && !mission.completed ? startStoryMission(mission.id) : null
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` \u{1F4D6} ${ssrInterpolate(mission.title)}`);
                          } else {
                            return [
                              createTextVNode(" \u{1F4D6} " + toDisplayString(mission.title), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createTextVNode(" \u{1F4D6} " + toDisplayString(mission.title), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_CardContent, { class: "space-y-3" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(mission.description)}</p><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Requisitos:</span><span class="font-medium"${_scopeId2}>N\xEDvel ${ssrInterpolate(mission.required_level)}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Recompensas:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(mission.rewards.xp)} XP, ${ssrInterpolate(mission.rewards.gold)} \u{1FA99} `);
                      if (mission.rewards.materials) {
                        _push3(`<span${_scopeId2}>, ${ssrInterpolate(mission.rewards.materials)} \u2699\uFE0F</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (mission.rewards.crystals) {
                        _push3(`<span${_scopeId2}>, ${ssrInterpolate(mission.rewards.crystals)} \u{1F48E}</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</span></div>`);
                      if (mission.completed) {
                        _push3(ssrRenderComponent(_component_Button, {
                          disabled: "",
                          variant: "success",
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` \u2705 Conclu\xEDda `);
                            } else {
                              return [
                                createTextVNode(" \u2705 Conclu\xEDda ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else if (mission.available) {
                        _push3(ssrRenderComponent(_component_Button, {
                          onClick: ($event) => startStoryMission(mission.id),
                          disabled: starting.value,
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(starting.value ? "Iniciando..." : "Iniciar Miss\xE3o")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(starting.value ? "Iniciando..." : "Iniciar Miss\xE3o"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(ssrRenderComponent(_component_Button, {
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Bloqueada `);
                            } else {
                              return [
                                createTextVNode(" Bloqueada ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      }
                    } else {
                      return [
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(mission.description), 1),
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Requisitos:"),
                          createVNode("span", { class: "font-medium" }, "N\xEDvel " + toDisplayString(mission.required_level), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Recompensas:"),
                          createVNode("span", { class: "font-medium" }, [
                            createTextVNode(toDisplayString(mission.rewards.xp) + " XP, " + toDisplayString(mission.rewards.gold) + " \u{1FA99} ", 1),
                            mission.rewards.materials ? (openBlock(), createBlock("span", { key: 0 }, ", " + toDisplayString(mission.rewards.materials) + " \u2699\uFE0F", 1)) : createCommentVNode("", true),
                            mission.rewards.crystals ? (openBlock(), createBlock("span", { key: 1 }, ", " + toDisplayString(mission.rewards.crystals) + " \u{1F48E}", 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        mission.completed ? (openBlock(), createBlock(_component_Button, {
                          key: 0,
                          disabled: "",
                          variant: "success",
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" \u2705 Conclu\xEDda ")
                          ]),
                          _: 1
                        })) : mission.available ? (openBlock(), createBlock(_component_Button, {
                          key: 1,
                          onClick: ($event) => startStoryMission(mission.id),
                          disabled: starting.value,
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(starting.value ? "Iniciando..." : "Iniciar Miss\xE3o"), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"])) : (openBlock(), createBlock(_component_Button, {
                          key: 2,
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Bloqueada ")
                          ]),
                          _: 1
                        }))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_CardHeader, { class: "pb-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createTextVNode(" \u{1F4D6} " + toDisplayString(mission.title), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_CardContent, { class: "space-y-3" }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(mission.description), 1),
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Requisitos:"),
                        createVNode("span", { class: "font-medium" }, "N\xEDvel " + toDisplayString(mission.required_level), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Recompensas:"),
                        createVNode("span", { class: "font-medium" }, [
                          createTextVNode(toDisplayString(mission.rewards.xp) + " XP, " + toDisplayString(mission.rewards.gold) + " \u{1FA99} ", 1),
                          mission.rewards.materials ? (openBlock(), createBlock("span", { key: 0 }, ", " + toDisplayString(mission.rewards.materials) + " \u2699\uFE0F", 1)) : createCommentVNode("", true),
                          mission.rewards.crystals ? (openBlock(), createBlock("span", { key: 1 }, ", " + toDisplayString(mission.rewards.crystals) + " \u{1F48E}", 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      mission.completed ? (openBlock(), createBlock(_component_Button, {
                        key: 0,
                        disabled: "",
                        variant: "success",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" \u2705 Conclu\xEDda ")
                        ]),
                        _: 1
                      })) : mission.available ? (openBlock(), createBlock(_component_Button, {
                        key: 1,
                        onClick: ($event) => startStoryMission(mission.id),
                        disabled: starting.value,
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(starting.value ? "Iniciando..." : "Iniciar Miss\xE3o"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"])) : (openBlock(), createBlock(_component_Button, {
                        key: 2,
                        disabled: "",
                        variant: "outline",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Bloqueada ")
                        ]),
                        _: 1
                      }))
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/missoes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=missoes-0QAfX9ID.mjs.map
