import { _ as _sfc_main$1 } from './index-D4e07kgT.mjs';
import { _ as _sfc_main$2 } from './Button-CSVd3JRx.mjs';
import { _ as _sfc_main$3, a as _sfc_main$2$1, b as _sfc_main$1$1, c as _sfc_main$5 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$4 } from './CardDescription-DNTQjROL.mjs';
import { _ as _sfc_main$6 } from './Progress-D2Z_7baA.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, ref, computed, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { u as useToast } from './useToast-DBrCK-1r.mjs';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
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
import './cookie-b4_mmrzk.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "personagem",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const { showSuccess } = useToast();
    const { getAuthHeaders } = characterStore;
    const loading = ref(true);
    const characterSkills = ref([]);
    const equippedItems = ref([]);
    const loadCharacterSkills = async () => {
      try {
        const { data } = await $fetch(
          `/api/skills/${characterStore.currentCharacter.id}`,
          {
            headers: getAuthHeaders()
          }
        );
        characterSkills.value = data || [];
      } catch (error) {
        console.error("Erro ao carregar habilidades:", error);
        characterSkills.value = [];
      }
    };
    const loadCharacterEquipment = async () => {
      try {
        const { data } = await $fetch(
          `/api/equipment/${characterStore.currentCharacter.id}`,
          {
            headers: getAuthHeaders()
          }
        );
        equippedItems.value = (data || []).filter((item) => item.equipped);
      } catch (error) {
        console.error("Erro ao carregar equipamentos:", error);
        equippedItems.value = [];
      }
    };
    const getRarityVariant = (rarity) => {
      switch (rarity == null ? void 0 : rarity.toLowerCase()) {
        case "comum":
          return "secondary";
        case "raro":
          return "default";
        case "\xE9pico":
          return "destructive";
        case "lend\xE1rio":
          return "outline";
        default:
          return "secondary";
      }
    };
    const { switchCharacter: switchCharacterManager } = useCharacterManager();
    const switchCharacter = async (character) => {
      await switchCharacterManager(character);
      await loadCharacterSkills();
      await loadCharacterEquipment();
      showSuccess(`Personagem ${character.name} selecionado!`);
    };
    const xpForNextLevel = computed(() => {
      if (!characterStore.currentCharacter) return 0;
      const currentLevel = characterStore.currentCharacter.level;
      const xpNeeded = Math.floor(1e3 * Math.pow(currentLevel, 1.5));
      return xpNeeded - characterStore.currentCharacter.xp;
    });
    const xpProgress = computed(() => {
      if (!characterStore.currentCharacter) return 0;
      const currentLevel = characterStore.currentCharacter.level;
      const currentLevelXp = Math.floor(1e3 * Math.pow(currentLevel - 1, 1.5));
      const nextLevelXp = Math.floor(1e3 * Math.pow(currentLevel, 1.5));
      const progress = (characterStore.currentCharacter.xp - currentLevelXp) / (nextLevelXp - currentLevelXp) * 100;
      return Math.max(0, Math.min(100, progress));
    });
    const healthProgress = computed(() => {
      if (!characterStore.currentCharacter) return 0;
      return characterStore.currentCharacter.stats.health / characterStore.currentCharacter.stats.max_health * 100;
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$1;
      const _component_Button = _sfc_main$2;
      const _component_Card = _sfc_main$3;
      const _component_CardHeader = _sfc_main$2$1;
      const _component_CardTitle = _sfc_main$1$1;
      const _component_CardDescription = _sfc_main$4;
      const _component_CardContent = _sfc_main$5;
      const _component_Progress = _sfc_main$6;
      if (unref(characterStore).currentCharacter && !unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">${ssrInterpolate(unref(characterStore).currentCharacter.name)}</h1><div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">`);
        _push(ssrRenderComponent(_component_Badge, {
          variant: unref(characterStore).currentCharacter.class === "ninja" ? "default" : "secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(characterStore).currentCharacter.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(characterStore).currentCharacter.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span>N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</span><span>${ssrInterpolate(unref(characterStore).currentCharacter.xp)} XP</span></div></div><div class="space-y-4"><div class="flex items-center justify-between"><h2 class="text-xl font-bold text-gray-900 dark:text-white"> Meus Personagens </h2>`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/criar-personagem"),
          variant: "outline",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u2795 Criar Novo `);
            } else {
              return [
                createTextVNode(" \u2795 Criar Novo ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(characterStore).characters.length > 0) {
          _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
          ssrRenderList(unref(characterStore).characters, (character) => {
            var _a;
            _push(ssrRenderComponent(_component_Card, {
              key: character.id,
              class: [
                "hover:shadow-lg transition-all duration-200 cursor-pointer",
                ((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.id) === character.id ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20" : "hover:scale-105"
              ],
              onClick: ($event) => switchCharacter(character)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_CardHeader, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_CardTitle, { class: "text-lg text-gray-900 dark:text-white" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(character.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(character.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_Badge, {
                          variant: character.class === "ninja" ? "default" : "secondary"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(character.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(character.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div>`);
                        _push3(ssrRenderComponent(_component_CardDescription, { class: "text-gray-700 dark:text-white" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` N\xEDvel ${ssrInterpolate(character.level)} - ${ssrInterpolate(character.xp)} XP `);
                            } else {
                              return [
                                createTextVNode(" N\xEDvel " + toDisplayString(character.level) + " - " + toDisplayString(character.xp) + " XP ", 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode(_component_CardTitle, { class: "text-lg text-gray-900 dark:text-white" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(character.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_Badge, {
                              variant: character.class === "ninja" ? "default" : "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(character.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro"), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"])
                          ]),
                          createVNode(_component_CardDescription, { class: "text-gray-700 dark:text-white" }, {
                            default: withCtx(() => [
                              createTextVNode(" N\xEDvel " + toDisplayString(character.level) + " - " + toDisplayString(character.xp) + " XP ", 1)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_CardContent, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      var _a2, _b;
                      if (_push3) {
                        _push3(`<div class="space-y-2"${_scopeId2}><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>For\xE7a:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(character.stats.strength)}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Agilidade:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(character.stats.agility)}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Defesa:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(character.stats.defense)}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Vida:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(character.stats.health)}/${ssrInterpolate(character.stats.max_health)}</span></div>`);
                        if (((_a2 = unref(characterStore).currentCharacter) == null ? void 0 : _a2.id) === character.id) {
                          _push3(`<div class="flex items-center gap-1"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_Badge, {
                            variant: "default",
                            class: "bg-green-600 text-white"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(` \u2705 Ativo `);
                              } else {
                                return [
                                  createTextVNode(" \u2705 Ativo ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(character.stats.strength), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(character.stats.agility), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(character.stats.defense), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(character.stats.health) + "/" + toDisplayString(character.stats.max_health), 1)
                            ]),
                            ((_b = unref(characterStore).currentCharacter) == null ? void 0 : _b.id) === character.id ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-1"
                            }, [
                              createVNode(_component_Badge, {
                                variant: "default",
                                class: "bg-green-600 text-white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u2705 Ativo ")
                                ]),
                                _: 1
                              })
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_CardHeader, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(_component_CardTitle, { class: "text-lg text-gray-900 dark:text-white" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(character.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_Badge, {
                            variant: character.class === "ninja" ? "default" : "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(character.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro"), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant"])
                        ]),
                        createVNode(_component_CardDescription, { class: "text-gray-700 dark:text-white" }, {
                          default: withCtx(() => [
                            createTextVNode(" N\xEDvel " + toDisplayString(character.level) + " - " + toDisplayString(character.xp) + " XP ", 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_CardContent, null, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(character.stats.strength), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(character.stats.agility), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(character.stats.defense), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(character.stats.health) + "/" + toDisplayString(character.stats.max_health), 1)
                            ]),
                            ((_a2 = unref(characterStore).currentCharacter) == null ? void 0 : _a2.id) === character.id ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-1"
                            }, [
                              createVNode(_component_Badge, {
                                variant: "default",
                                class: "bg-green-600 text-white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u2705 Ativo ")
                                ]),
                                _: 1
                              })
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-center py-8"><div class="text-6xl mb-4">\u{1F3AE}</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2"> Nenhum Personagem Encontrado </h3><p class="text-gray-600 dark:text-gray-400 mb-4"> Crie seu primeiro personagem para come\xE7ar a aventura! </p>`);
          _push(ssrRenderComponent(_component_Button, {
            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/criar-personagem"),
            size: "lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` \u{1F680} Criar Primeiro Personagem `);
              } else {
                return [
                  createTextVNode(" \u{1F680} Criar Primeiro Personagem ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">`);
        _push(ssrRenderComponent(_component_Card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` N\xEDvel e XP `);
                        } else {
                          return [
                            createTextVNode(" N\xEDvel e XP ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                        default: withCtx(() => [
                          createTextVNode(" N\xEDvel e XP ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"${_scopeId2}> N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</div><div class="space-y-2"${_scopeId2}><div class="flex justify-between text-sm text-gray-600 dark:text-gray-400"${_scopeId2}><span${_scopeId2}>XP Atual: ${ssrInterpolate(unref(characterStore).currentCharacter.xp)}</span><span${_scopeId2}>${ssrInterpolate(xpForNextLevel.value)} para pr\xF3ximo n\xEDvel</span></div>`);
                    _push3(ssrRenderComponent(_component_Progress, {
                      value: xpProgress.value,
                      class: "h-3"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2" }, " N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex justify-between text-sm text-gray-600 dark:text-gray-400" }, [
                          createVNode("span", null, "XP Atual: " + toDisplayString(unref(characterStore).currentCharacter.xp), 1),
                          createVNode("span", null, toDisplayString(xpForNextLevel.value) + " para pr\xF3ximo n\xEDvel", 1)
                        ]),
                        createVNode(_component_Progress, {
                          value: xpProgress.value,
                          class: "h-3"
                        }, null, 8, ["value"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardHeader, { class: "pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                      default: withCtx(() => [
                        createTextVNode(" N\xEDvel e XP ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2" }, " N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex justify-between text-sm text-gray-600 dark:text-gray-400" }, [
                        createVNode("span", null, "XP Atual: " + toDisplayString(unref(characterStore).currentCharacter.xp), 1),
                        createVNode("span", null, toDisplayString(xpForNextLevel.value) + " para pr\xF3ximo n\xEDvel", 1)
                      ]),
                      createVNode(_component_Progress, {
                        value: xpProgress.value,
                        class: "h-3"
                      }, null, 8, ["value"])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Vida `);
                        } else {
                          return [
                            createTextVNode(" Vida ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                        default: withCtx(() => [
                          createTextVNode(" Vida ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-3xl font-bold text-red-600 dark:text-red-400 mb-2"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.stats.health)}/${ssrInterpolate(unref(characterStore).currentCharacter.stats.max_health)}</div>`);
                    _push3(ssrRenderComponent(_component_Progress, {
                      value: healthProgress.value,
                      class: "h-3"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "text-3xl font-bold text-red-600 dark:text-red-400 mb-2" }, toDisplayString(unref(characterStore).currentCharacter.stats.health) + "/" + toDisplayString(unref(characterStore).currentCharacter.stats.max_health), 1),
                      createVNode(_component_Progress, {
                        value: healthProgress.value,
                        class: "h-3"
                      }, null, 8, ["value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardHeader, { class: "pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                      default: withCtx(() => [
                        createTextVNode(" Vida ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-3xl font-bold text-red-600 dark:text-red-400 mb-2" }, toDisplayString(unref(characterStore).currentCharacter.stats.health) + "/" + toDisplayString(unref(characterStore).currentCharacter.stats.max_health), 1),
                    createVNode(_component_Progress, {
                      value: healthProgress.value,
                      class: "h-3"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` For\xE7a `);
                        } else {
                          return [
                            createTextVNode(" For\xE7a ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                        default: withCtx(() => [
                          createTextVNode(" For\xE7a ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-3xl font-bold text-orange-600 dark:text-orange-400"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.stats.strength)}</div><p class="text-sm text-gray-600 dark:text-gray-400 mt-1"${_scopeId2}> Ataque f\xEDsico </p>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-3xl font-bold text-orange-600 dark:text-orange-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.strength), 1),
                      createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400 mt-1" }, " Ataque f\xEDsico ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardHeader, { class: "pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                      default: withCtx(() => [
                        createTextVNode(" For\xE7a ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-3xl font-bold text-orange-600 dark:text-orange-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.strength), 1),
                    createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400 mt-1" }, " Ataque f\xEDsico ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Agilidade `);
                        } else {
                          return [
                            createTextVNode(" Agilidade ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                        default: withCtx(() => [
                          createTextVNode(" Agilidade ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-3xl font-bold text-green-600 dark:text-green-400"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.stats.agility)}</div><p class="text-sm text-gray-600 dark:text-gray-400 mt-1"${_scopeId2}> Velocidade e esquiva </p>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-3xl font-bold text-green-600 dark:text-green-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.agility), 1),
                      createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400 mt-1" }, " Velocidade e esquiva ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardHeader, { class: "pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CardTitle, { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, {
                      default: withCtx(() => [
                        createTextVNode(" Agilidade ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-3xl font-bold text-green-600 dark:text-green-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.agility), 1),
                    createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400 mt-1" }, " Velocidade e esquiva ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="space-y-4"><div class="flex items-center justify-between"><h2 class="text-xl font-bold text-gray-900 dark:text-white"> \u{1F3AF} Habilidades Aprendidas </h2>`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/habilidades"),
          variant: "outline",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Ver Todas `);
            } else {
              return [
                createTextVNode(" Ver Todas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(characterSkills).length > 0) {
          _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
          ssrRenderList(unref(characterSkills).slice(0, 6), (skill) => {
            _push(ssrRenderComponent(_component_Card, {
              key: skill.id,
              class: "hover:shadow-lg transition-all duration-200"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<span class="text-blue-600 dark:text-blue-400"${_scopeId3}>\u{1F3AF}</span> ${ssrInterpolate(skill.name)}`);
                            } else {
                              return [
                                createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "\u{1F3AF}"),
                                createTextVNode(" " + toDisplayString(skill.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "\u{1F3AF}"),
                              createTextVNode(" " + toDisplayString(skill.name), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_CardContent, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="space-y-2"${_scopeId2}><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>N\xEDvel:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(skill.level)}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Dano:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(skill.damage)}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Cooldown:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(skill.cooldown)}s</span></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(skill.level), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Dano:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(skill.damage), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Cooldown:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(skill.cooldown) + "s", 1)
                            ])
                          ])
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
                            createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "\u{1F3AF}"),
                            createTextVNode(" " + toDisplayString(skill.name), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_CardContent, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(skill.level), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Dano:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(skill.damage), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Cooldown:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(skill.cooldown) + "s", 1)
                          ])
                        ])
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
        } else {
          _push(`<div class="text-center py-8"><div class="text-6xl mb-4">\u{1F3AF}</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2"> Nenhuma Habilidade Aprendida </h3><p class="text-gray-600 dark:text-gray-400 mb-4"> Aprenda suas primeiras habilidades para come\xE7ar a aventura! </p>`);
          _push(ssrRenderComponent(_component_Button, {
            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/habilidades"),
            size: "lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` \u{1F3AF} Aprender Habilidades `);
              } else {
                return [
                  createTextVNode(" \u{1F3AF} Aprender Habilidades ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="space-y-4"><div class="flex items-center justify-between"><h2 class="text-xl font-bold text-gray-900 dark:text-white"> \u{1F6E1}\uFE0F Equipamentos Atuais </h2>`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/equipamentos"),
          variant: "outline",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Gerenciar `);
            } else {
              return [
                createTextVNode(" Gerenciar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(equippedItems).length > 0) {
          _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
          ssrRenderList(unref(equippedItems), (item) => {
            _push(ssrRenderComponent(_component_Card, {
              key: item.id,
              class: "hover:shadow-lg transition-all duration-200 border-green-200 dark:border-green-800"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<span class="text-green-600 dark:text-green-400"${_scopeId3}>\u{1F6E1}\uFE0F</span> ${ssrInterpolate(item.name)}`);
                            } else {
                              return [
                                createVNode("span", { class: "text-green-600 dark:text-green-400" }, "\u{1F6E1}\uFE0F"),
                                createTextVNode(" " + toDisplayString(item.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-green-600 dark:text-green-400" }, "\u{1F6E1}\uFE0F"),
                              createTextVNode(" " + toDisplayString(item.name), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_CardContent, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="space-y-2"${_scopeId2}><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Tipo:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(item.equipment_type)}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Raridade:</span>`);
                        _push3(ssrRenderComponent(_component_Badge, {
                          variant: getRarityVariant(item.rarity)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(item.rarity)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(item.rarity), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>N\xEDvel:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(item.level_required)}</span></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Tipo:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(item.equipment_type), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Raridade:"),
                              createVNode(_component_Badge, {
                                variant: getRarityVariant(item.rarity)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.rarity), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant"])
                            ]),
                            createVNode("div", { class: "flex justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(item.level_required), 1)
                            ])
                          ])
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
                            createVNode("span", { class: "text-green-600 dark:text-green-400" }, "\u{1F6E1}\uFE0F"),
                            createTextVNode(" " + toDisplayString(item.name), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_CardContent, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Tipo:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(item.equipment_type), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Raridade:"),
                            createVNode(_component_Badge, {
                              variant: getRarityVariant(item.rarity)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.rarity), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"])
                          ]),
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(item.level_required), 1)
                          ])
                        ])
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
        } else {
          _push(`<div class="text-center py-8"><div class="text-6xl mb-4">\u{1F6E1}\uFE0F</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2"> Nenhum Equipamento </h3><p class="text-gray-600 dark:text-gray-400 mb-4"> Equipe-se com armas e armaduras para aumentar seu poder! </p>`);
          _push(ssrRenderComponent(_component_Button, {
            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/equipamentos"),
            size: "lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` \u{1F6E1}\uFE0F Equipar Itens `);
              } else {
                return [
                  createTextVNode(" \u{1F6E1}\uFE0F Equipar Itens ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="grid md:grid-cols-2 gap-6">`);
        _push(ssrRenderComponent(_component_Card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` \u{1F6E1}\uFE0F Defesa `);
                        } else {
                          return [
                            createTextVNode(" \u{1F6E1}\uFE0F Defesa ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createTextVNode(" \u{1F6E1}\uFE0F Defesa ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-2xl font-bold text-purple-600 dark:text-purple-400"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.stats.defense)}</div><p class="text-sm text-gray-600 dark:text-gray-400 mt-1"${_scopeId2}> Reduz dano recebido </p>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-2xl font-bold text-purple-600 dark:text-purple-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.defense), 1),
                      createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400 mt-1" }, " Reduz dano recebido ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F6E1}\uFE0F Defesa ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-2xl font-bold text-purple-600 dark:text-purple-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.defense), 1),
                    createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400 mt-1" }, " Reduz dano recebido ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` \u{1F4CA} Informa\xE7\xF5es `);
                        } else {
                          return [
                            createTextVNode(" \u{1F4CA} Informa\xE7\xF5es ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createTextVNode(" \u{1F4CA} Informa\xE7\xF5es ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CardContent, { class: "space-y-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Classe:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.class === "ninja" ? "Ninja" : "Guerreiro Espacial")}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Criado em:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(formatDate(unref(characterStore).currentCharacter.created_at))}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>\xDAltima atualiza\xE7\xE3o:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(formatDate(unref(characterStore).currentCharacter.updated_at))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Classe:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(unref(characterStore).currentCharacter.class === "ninja" ? "Ninja" : "Guerreiro Espacial"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Criado em:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(unref(characterStore).currentCharacter.created_at)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "\xDAltima atualiza\xE7\xE3o:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(unref(characterStore).currentCharacter.updated_at)), 1)
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
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F4CA} Informa\xE7\xF5es ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CardContent, { class: "space-y-2" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Classe:"),
                      createVNode("span", { class: "font-medium" }, toDisplayString(unref(characterStore).currentCharacter.class === "ninja" ? "Ninja" : "Guerreiro Espacial"), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Criado em:"),
                      createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(unref(characterStore).currentCharacter.created_at)), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "\xDAltima atualiza\xE7\xE3o:"),
                      createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(unref(characterStore).currentCharacter.updated_at)), 1)
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
        _push(ssrRenderComponent(_component_Card, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` \u{1F4D6} Descri\xE7\xE3o da Classe `);
                        } else {
                          return [
                            createTextVNode(" \u{1F4D6} Descri\xE7\xE3o da Classe ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createTextVNode(" \u{1F4D6} Descri\xE7\xE3o da Classe ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(characterStore).currentCharacter.class === "ninja") {
                      _push3(`<div class="space-y-3"${_scopeId2}><p class="text-gray-700 dark:text-gray-300"${_scopeId2}><strong${_scopeId2}>\u{1F977} Ninja:</strong> Especialista em combate furtivo e movimentos \xE1geis. Os ninjas s\xE3o mestres da agilidade e podem executar ataques r\xE1pidos e precisos. </p><div class="grid md:grid-cols-2 gap-4 text-sm"${_scopeId2}><div${_scopeId2}><h4 class="font-medium text-gray-900 dark:text-white mb-2"${_scopeId2}> Vantagens: </h4><ul class="space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}>\u2022 Alta agilidade para ataques r\xE1pidos</li><li${_scopeId2}>\u2022 Habilidades de stealth</li><li${_scopeId2}>\u2022 Movimento \xE1gil em combate</li></ul></div><div${_scopeId2}><h4 class="font-medium text-gray-900 dark:text-white mb-2"${_scopeId2}> Especialidades: </h4><ul class="space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}>\u2022 Jutsus de fogo e vento</li><li${_scopeId2}>\u2022 T\xE9cnicas de esquiva</li><li${_scopeId2}>\u2022 Ataques cr\xEDticos</li></ul></div></div></div>`);
                    } else {
                      _push3(`<div class="space-y-3"${_scopeId2}><p class="text-gray-700 dark:text-gray-300"${_scopeId2}><strong${_scopeId2}>\u{1F680} Guerreiro Espacial:</strong> Combatente robusto e resistente, especialista em tecnologia avan\xE7ada e combate direto. </p><div class="grid md:grid-cols-2 gap-4 text-sm"${_scopeId2}><div${_scopeId2}><h4 class="font-medium text-gray-900 dark:text-white mb-2"${_scopeId2}> Vantagens: </h4><ul class="space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}>\u2022 Alta for\xE7a e defesa</li><li${_scopeId2}>\u2022 Mais pontos de vida</li><li${_scopeId2}>\u2022 Tecnologia avan\xE7ada</li></ul></div><div${_scopeId2}><h4 class="font-medium text-gray-900 dark:text-white mb-2"${_scopeId2}> Especialidades: </h4><ul class="space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}>\u2022 Armas de energia</li><li${_scopeId2}>\u2022 Escudos defensivos</li><li${_scopeId2}>\u2022 Ataques devastadores</li></ul></div></div></div>`);
                    }
                  } else {
                    return [
                      unref(characterStore).currentCharacter.class === "ninja" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        createVNode("p", { class: "text-gray-700 dark:text-gray-300" }, [
                          createVNode("strong", null, "\u{1F977} Ninja:"),
                          createTextVNode(" Especialista em combate furtivo e movimentos \xE1geis. Os ninjas s\xE3o mestres da agilidade e podem executar ataques r\xE1pidos e precisos. ")
                        ]),
                        createVNode("div", { class: "grid md:grid-cols-2 gap-4 text-sm" }, [
                          createVNode("div", null, [
                            createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Vantagens: "),
                            createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                              createVNode("li", null, "\u2022 Alta agilidade para ataques r\xE1pidos"),
                              createVNode("li", null, "\u2022 Habilidades de stealth"),
                              createVNode("li", null, "\u2022 Movimento \xE1gil em combate")
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Especialidades: "),
                            createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                              createVNode("li", null, "\u2022 Jutsus de fogo e vento"),
                              createVNode("li", null, "\u2022 T\xE9cnicas de esquiva"),
                              createVNode("li", null, "\u2022 Ataques cr\xEDticos")
                            ])
                          ])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-3"
                      }, [
                        createVNode("p", { class: "text-gray-700 dark:text-gray-300" }, [
                          createVNode("strong", null, "\u{1F680} Guerreiro Espacial:"),
                          createTextVNode(" Combatente robusto e resistente, especialista em tecnologia avan\xE7ada e combate direto. ")
                        ]),
                        createVNode("div", { class: "grid md:grid-cols-2 gap-4 text-sm" }, [
                          createVNode("div", null, [
                            createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Vantagens: "),
                            createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                              createVNode("li", null, "\u2022 Alta for\xE7a e defesa"),
                              createVNode("li", null, "\u2022 Mais pontos de vida"),
                              createVNode("li", null, "\u2022 Tecnologia avan\xE7ada")
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Especialidades: "),
                            createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                              createVNode("li", null, "\u2022 Armas de energia"),
                              createVNode("li", null, "\u2022 Escudos defensivos"),
                              createVNode("li", null, "\u2022 Ataques devastadores")
                            ])
                          ])
                        ])
                      ]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F4D6} Descri\xE7\xE3o da Classe ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CardContent, null, {
                  default: withCtx(() => [
                    unref(characterStore).currentCharacter.class === "ninja" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      createVNode("p", { class: "text-gray-700 dark:text-gray-300" }, [
                        createVNode("strong", null, "\u{1F977} Ninja:"),
                        createTextVNode(" Especialista em combate furtivo e movimentos \xE1geis. Os ninjas s\xE3o mestres da agilidade e podem executar ataques r\xE1pidos e precisos. ")
                      ]),
                      createVNode("div", { class: "grid md:grid-cols-2 gap-4 text-sm" }, [
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Vantagens: "),
                          createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                            createVNode("li", null, "\u2022 Alta agilidade para ataques r\xE1pidos"),
                            createVNode("li", null, "\u2022 Habilidades de stealth"),
                            createVNode("li", null, "\u2022 Movimento \xE1gil em combate")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Especialidades: "),
                          createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                            createVNode("li", null, "\u2022 Jutsus de fogo e vento"),
                            createVNode("li", null, "\u2022 T\xE9cnicas de esquiva"),
                            createVNode("li", null, "\u2022 Ataques cr\xEDticos")
                          ])
                        ])
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-3"
                    }, [
                      createVNode("p", { class: "text-gray-700 dark:text-gray-300" }, [
                        createVNode("strong", null, "\u{1F680} Guerreiro Espacial:"),
                        createTextVNode(" Combatente robusto e resistente, especialista em tecnologia avan\xE7ada e combate direto. ")
                      ]),
                      createVNode("div", { class: "grid md:grid-cols-2 gap-4 text-sm" }, [
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Vantagens: "),
                          createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                            createVNode("li", null, "\u2022 Alta for\xE7a e defesa"),
                            createVNode("li", null, "\u2022 Mais pontos de vida"),
                            createVNode("li", null, "\u2022 Tecnologia avan\xE7ada")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Especialidades: "),
                          createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                            createVNode("li", null, "\u2022 Armas de energia"),
                            createVNode("li", null, "\u2022 Escudos defensivos"),
                            createVNode("li", null, "\u2022 Ataques devastadores")
                          ])
                        ])
                      ])
                    ]))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="grid md:grid-cols-3 gap-4">`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/batalhas"),
          class: "h-16 text-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u2694\uFE0F Ir para Batalhas `);
            } else {
              return [
                createTextVNode(" \u2694\uFE0F Ir para Batalhas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/habilidades"),
          variant: "outline",
          class: "h-16 text-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F3AF} Ver Habilidades `);
            } else {
              return [
                createTextVNode(" \u{1F3AF} Ver Habilidades ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/melhorias"),
          variant: "outline",
          class: "h-16 text-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F3D7}\uFE0F Ver Melhorias `);
            } else {
              return [
                createTextVNode(" \u{1F3D7}\uFE0F Ver Melhorias ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-12" }, _attrs))}><div class="text-6xl mb-4">\u23F3</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2"> Carregando personagens... </h2><p class="text-gray-600 dark:text-gray-400"> Aguarde enquanto carregamos seus personagens. </p></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-12" }, _attrs))}><div class="text-6xl mb-4">\u{1F464}</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2"> Nenhum personagem selecionado </h2><p class="text-gray-600 dark:text-gray-400 mb-6"> Selecione um personagem ou crie um novo para continuar. </p><div class="flex gap-4 justify-center">`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/selecionar-personagem")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Selecionar Personagem `);
            } else {
              return [
                createTextVNode(" Selecionar Personagem ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/criar-personagem"),
          variant: "outline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Criar Personagem `);
            } else {
              return [
                createTextVNode(" Criar Personagem ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/personagem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=personagem-CfTfOYeS.mjs.map
