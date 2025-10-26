import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$4 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$5 } from './Progress-D2Z_7baA.mjs';
import { _ as _sfc_main$6 } from './CardDescription-DNTQjROL.mjs';
import { _ as _sfc_main$7 } from './Button-CSVd3JRx.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import './index-B4_YPG6v.mjs';
import 'class-variance-authority';
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
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
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
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_Card = _sfc_main$3;
      const _component_CardHeader = _sfc_main$2;
      const _component_CardTitle = _sfc_main$1;
      const _component_CardContent = _sfc_main$4;
      const _component_Progress = _sfc_main$5;
      const _component_CardDescription = _sfc_main$6;
      const _component_Button = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Bem-vindo, ${ssrInterpolate((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.name)}! </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> N\xEDvel ${ssrInterpolate((_b = unref(characterStore).currentCharacter) == null ? void 0 : _b.level)} - ${ssrInterpolate(((_c = unref(characterStore).currentCharacter) == null ? void 0 : _c.class) === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial")}</p></div>`);
      if (unref(characterStore).currentCharacter) {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">`);
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
                    _push3(`<div class="text-2xl font-bold text-blue-600 dark:text-blue-400"${_scopeId2}> N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</div><div class="mt-2"${_scopeId2}><div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1"${_scopeId2}><span${_scopeId2}>XP: ${ssrInterpolate(unref(characterStore).currentCharacter.xp)}</span><span${_scopeId2}>${ssrInterpolate(xpForNextLevel.value)} para pr\xF3ximo n\xEDvel</span></div>`);
                    _push3(ssrRenderComponent(_component_Progress, {
                      value: xpProgress.value,
                      class: "h-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, " N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1),
                      createVNode("div", { class: "mt-2" }, [
                        createVNode("div", { class: "flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1" }, [
                          createVNode("span", null, "XP: " + toDisplayString(unref(characterStore).currentCharacter.xp), 1),
                          createVNode("span", null, toDisplayString(xpForNextLevel.value) + " para pr\xF3ximo n\xEDvel", 1)
                        ]),
                        createVNode(_component_Progress, {
                          value: xpProgress.value,
                          class: "h-2"
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
                    createVNode("div", { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, " N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1),
                    createVNode("div", { class: "mt-2" }, [
                      createVNode("div", { class: "flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1" }, [
                        createVNode("span", null, "XP: " + toDisplayString(unref(characterStore).currentCharacter.xp), 1),
                        createVNode("span", null, toDisplayString(xpForNextLevel.value) + " para pr\xF3ximo n\xEDvel", 1)
                      ]),
                      createVNode(_component_Progress, {
                        value: xpProgress.value,
                        class: "h-2"
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
                    _push3(`<div class="text-2xl font-bold text-red-600 dark:text-red-400"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.stats.health)}/${ssrInterpolate(unref(characterStore).currentCharacter.stats.max_health)}</div>`);
                    _push3(ssrRenderComponent(_component_Progress, {
                      value: healthProgress.value,
                      class: "h-2 mt-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "text-2xl font-bold text-red-600 dark:text-red-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.health) + "/" + toDisplayString(unref(characterStore).currentCharacter.stats.max_health), 1),
                      createVNode(_component_Progress, {
                        value: healthProgress.value,
                        class: "h-2 mt-2"
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
                    createVNode("div", { class: "text-2xl font-bold text-red-600 dark:text-red-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.health) + "/" + toDisplayString(unref(characterStore).currentCharacter.stats.max_health), 1),
                    createVNode(_component_Progress, {
                      value: healthProgress.value,
                      class: "h-2 mt-2"
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
                    _push3(`<div class="text-2xl font-bold text-orange-600 dark:text-orange-400"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.stats.strength)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-2xl font-bold text-orange-600 dark:text-orange-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.strength), 1)
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
                    createVNode("div", { class: "text-2xl font-bold text-orange-600 dark:text-orange-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.strength), 1)
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
                    _push3(`<div class="text-2xl font-bold text-green-600 dark:text-green-400"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.stats.agility)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-2xl font-bold text-green-600 dark:text-green-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.agility), 1)
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
                    createVNode("div", { class: "text-2xl font-bold text-green-600 dark:text-green-400" }, toDisplayString(unref(characterStore).currentCharacter.stats.agility), 1)
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
      _push(`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(_component_Card, {
        class: "hover:shadow-lg transition-shadow cursor-pointer",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/batalhas")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u2694\uFE0F Batalhas `);
                      } else {
                        return [
                          createTextVNode(" \u2694\uFE0F Batalhas ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Enfrente NPCs e ganhe XP e recursos `);
                      } else {
                        return [
                          createTextVNode(" Enfrente NPCs e ganhe XP e recursos ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u2694\uFE0F Batalhas ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Enfrente NPCs e ganhe XP e recursos ")
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
                  _push3(ssrRenderComponent(_component_Button, { class: "w-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ir para Batalhas `);
                      } else {
                        return [
                          createTextVNode(" Ir para Batalhas ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { class: "w-full" }, {
                      default: withCtx(() => [
                        createTextVNode(" Ir para Batalhas ")
                      ]),
                      _: 1
                    })
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
                      createTextVNode(" \u2694\uFE0F Batalhas ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Enfrente NPCs e ganhe XP e recursos ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, { class: "w-full" }, {
                    default: withCtx(() => [
                      createTextVNode(" Ir para Batalhas ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Card, {
        class: "hover:shadow-lg transition-shadow cursor-pointer",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/habilidades")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u{1F3AF} Habilidades `);
                      } else {
                        return [
                          createTextVNode(" \u{1F3AF} Habilidades ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Desenvolva novas habilidades e jutsus `);
                      } else {
                        return [
                          createTextVNode(" Desenvolva novas habilidades e jutsus ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F3AF} Habilidades ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Desenvolva novas habilidades e jutsus ")
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
                  _push3(ssrRenderComponent(_component_Button, { class: "w-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ver Habilidades `);
                      } else {
                        return [
                          createTextVNode(" Ver Habilidades ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { class: "w-full" }, {
                      default: withCtx(() => [
                        createTextVNode(" Ver Habilidades ")
                      ]),
                      _: 1
                    })
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
                      createTextVNode(" \u{1F3AF} Habilidades ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Desenvolva novas habilidades e jutsus ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, { class: "w-full" }, {
                    default: withCtx(() => [
                      createTextVNode(" Ver Habilidades ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Card, {
        class: "hover:shadow-lg transition-shadow cursor-pointer",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/melhorias")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u{1F3D7}\uFE0F Melhorias `);
                      } else {
                        return [
                          createTextVNode(" \u{1F3D7}\uFE0F Melhorias ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Construa e melhore sua base espacial `);
                      } else {
                        return [
                          createTextVNode(" Construa e melhore sua base espacial ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F3D7}\uFE0F Melhorias ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Construa e melhore sua base espacial ")
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
                  _push3(ssrRenderComponent(_component_Button, { class: "w-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ver Melhorias `);
                      } else {
                        return [
                          createTextVNode(" Ver Melhorias ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { class: "w-full" }, {
                      default: withCtx(() => [
                        createTextVNode(" Ver Melhorias ")
                      ]),
                      _: 1
                    })
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
                      createTextVNode(" \u{1F3D7}\uFE0F Melhorias ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Construa e melhore sua base espacial ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, { class: "w-full" }, {
                    default: withCtx(() => [
                      createTextVNode(" Ver Melhorias ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Card, {
        class: "hover:shadow-lg transition-shadow cursor-pointer",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/modo-historia")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u{1F4D6} Modo Hist\xF3ria `);
                      } else {
                        return [
                          createTextVNode(" \u{1F4D6} Modo Hist\xF3ria ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Viva uma aventura \xE9pica atrav\xE9s de cap\xEDtulos `);
                      } else {
                        return [
                          createTextVNode(" Viva uma aventura \xE9pica atrav\xE9s de cap\xEDtulos ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F4D6} Modo Hist\xF3ria ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Viva uma aventura \xE9pica atrav\xE9s de cap\xEDtulos ")
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
                  _push3(ssrRenderComponent(_component_Button, { class: "w-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Jogar Hist\xF3ria `);
                      } else {
                        return [
                          createTextVNode(" Jogar Hist\xF3ria ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { class: "w-full" }, {
                      default: withCtx(() => [
                        createTextVNode(" Jogar Hist\xF3ria ")
                      ]),
                      _: 1
                    })
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
                      createTextVNode(" \u{1F4D6} Modo Hist\xF3ria ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Viva uma aventura \xE9pica atrav\xE9s de cap\xEDtulos ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, { class: "w-full" }, {
                    default: withCtx(() => [
                      createTextVNode(" Jogar Hist\xF3ria ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Card, {
        class: "hover:shadow-lg transition-shadow cursor-pointer",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/loja")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u{1F3EA} Loja `);
                      } else {
                        return [
                          createTextVNode(" \u{1F3EA} Loja ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Compre itens e equipamentos `);
                      } else {
                        return [
                          createTextVNode(" Compre itens e equipamentos ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F3EA} Loja ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Compre itens e equipamentos ")
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
                  _push3(ssrRenderComponent(_component_Button, { class: "w-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ir para Loja `);
                      } else {
                        return [
                          createTextVNode(" Ir para Loja ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { class: "w-full" }, {
                      default: withCtx(() => [
                        createTextVNode(" Ir para Loja ")
                      ]),
                      _: 1
                    })
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
                      createTextVNode(" \u{1F3EA} Loja ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Compre itens e equipamentos ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, { class: "w-full" }, {
                    default: withCtx(() => [
                      createTextVNode(" Ir para Loja ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Card, {
        class: "hover:shadow-lg transition-shadow cursor-pointer",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/equipamentos")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u2694\uFE0F Equipamentos `);
                      } else {
                        return [
                          createTextVNode(" \u2694\uFE0F Equipamentos ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Gerencie seus equipamentos `);
                      } else {
                        return [
                          createTextVNode(" Gerencie seus equipamentos ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u2694\uFE0F Equipamentos ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Gerencie seus equipamentos ")
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
                  _push3(ssrRenderComponent(_component_Button, { class: "w-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ver Equipamentos `);
                      } else {
                        return [
                          createTextVNode(" Ver Equipamentos ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { class: "w-full" }, {
                      default: withCtx(() => [
                        createTextVNode(" Ver Equipamentos ")
                      ]),
                      _: 1
                    })
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
                      createTextVNode(" \u2694\uFE0F Equipamentos ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Gerencie seus equipamentos ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, { class: "w-full" }, {
                    default: withCtx(() => [
                      createTextVNode(" Ver Equipamentos ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Card, {
        class: "hover:shadow-lg transition-shadow cursor-pointer",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/inventario")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u{1F392} Invent\xE1rio `);
                      } else {
                        return [
                          createTextVNode(" \u{1F392} Invent\xE1rio ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Gerencie seus itens e recursos `);
                      } else {
                        return [
                          createTextVNode(" Gerencie seus itens e recursos ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F392} Invent\xE1rio ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Gerencie seus itens e recursos ")
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
                  _push3(ssrRenderComponent(_component_Button, { class: "w-full" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ver Invent\xE1rio `);
                      } else {
                        return [
                          createTextVNode(" Ver Invent\xE1rio ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, { class: "w-full" }, {
                      default: withCtx(() => [
                        createTextVNode(" Ver Invent\xE1rio ")
                      ]),
                      _: 1
                    })
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
                      createTextVNode(" \u{1F392} Invent\xE1rio ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Gerencie seus itens e recursos ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_Button, { class: "w-full" }, {
                    default: withCtx(() => [
                      createTextVNode(" Ver Invent\xE1rio ")
                    ]),
                    _: 1
                  })
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
                  _push3(ssrRenderComponent(_component_CardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Atividade Recente`);
                      } else {
                        return [
                          createTextVNode("Atividade Recente")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Suas \xFAltimas a\xE7\xF5es no jogo `);
                      } else {
                        return [
                          createTextVNode(" Suas \xFAltimas a\xE7\xF5es no jogo ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Atividade Recente")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Suas \xFAltimas a\xE7\xF5es no jogo ")
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
                var _a2, _b2;
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}><div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId2}><div class="text-2xl"${_scopeId2}>\u{1F389}</div><div${_scopeId2}><p class="font-medium"${_scopeId2}>Personagem criado!</p><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>${ssrInterpolate((_a2 = unref(characterStore).currentCharacter) == null ? void 0 : _a2.name)} foi criado com sucesso </p></div></div><div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId2}><div class="text-2xl"${_scopeId2}>\u26A1</div><div${_scopeId2}><p class="font-medium"${_scopeId2}>Pronto para a aventura!</p><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}> Comece explorando as batalhas ou desenvolvendo habilidades </p></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                        createVNode("div", { class: "text-2xl" }, "\u{1F389}"),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-medium" }, "Personagem criado!"),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString((_b2 = unref(characterStore).currentCharacter) == null ? void 0 : _b2.name) + " foi criado com sucesso ", 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                        createVNode("div", { class: "text-2xl" }, "\u26A1"),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-medium" }, "Pronto para a aventura!"),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Comece explorando as batalhas ou desenvolvendo habilidades ")
                        ])
                      ])
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
                  createVNode(_component_CardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Atividade Recente")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Suas \xFAltimas a\xE7\xF5es no jogo ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                        createVNode("div", { class: "text-2xl" }, "\u{1F389}"),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-medium" }, "Personagem criado!"),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString((_a2 = unref(characterStore).currentCharacter) == null ? void 0 : _a2.name) + " foi criado com sucesso ", 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                        createVNode("div", { class: "text-2xl" }, "\u26A1"),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-medium" }, "Pronto para a aventura!"),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Comece explorando as batalhas ou desenvolvendo habilidades ")
                        ])
                      ])
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=home-lrswP4FR.mjs.map
