import { _ as _sfc_main$3, c as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$1$1 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$4 } from './Button-CSVd3JRx.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createTextVNode, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "mineracao",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const resources = ref([]);
    const mining = ref(false);
    const lastMiningResult = ref(null);
    const loadResources = async () => {
      if (!characterStore.currentCharacter) return;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch(
          `/api/resources/${characterStore.currentCharacter.id}`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          }
        );
        resources.value = response.data || [];
      } catch (error) {
      }
    };
    const startMining = async (miningType) => {
      if (!characterStore.currentCharacter || mining.value) return;
      mining.value = true;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch("/api/mining/start", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            character_id: characterStore.currentCharacter.id,
            mining_type: miningType
          }
        });
        if (response.success) {
          lastMiningResult.value = response.data;
          await loadResources();
        }
      } catch (error) {
      } finally {
        mining.value = false;
      }
    };
    const getResourceAmount = (type) => {
      const resource = resources.value.find((r) => r.resource_type === type);
      return resource ? resource.amount : 0;
    };
    const getResourceIcon = (type) => {
      const icons = {
        ouro: "\u{1FA99}",
        materiais: "\u2699\uFE0F",
        cristais: "\u{1F48E}"
      };
      return icons[type] || "\u2753";
    };
    const getResourceColor = (type) => {
      const colors = {
        ouro: "text-yellow-600 dark:text-yellow-400",
        materiais: "text-gray-600 dark:text-gray-400",
        cristais: "text-purple-600 dark:text-purple-400"
      };
      return colors[type] || "text-gray-600 dark:text-gray-400";
    };
    const getExpectedMaterials = () => {
      var _a;
      const level = ((_a = characterStore.currentCharacter) == null ? void 0 : _a.level) || 1;
      const baseAmount = Math.floor(level / 5) + 1;
      return `${baseAmount}-${baseAmount + 2}`;
    };
    const getExpectedCrystals = () => {
      var _a;
      const level = ((_a = characterStore.currentCharacter) == null ? void 0 : _a.level) || 1;
      const baseAmount = Math.floor(level / 10) + 1;
      return `${baseAmount}-${baseAmount + 1}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = _sfc_main$3;
      const _component_CardContent = _sfc_main$1;
      const _component_CardHeader = _sfc_main$2;
      const _component_CardTitle = _sfc_main$1$1;
      const _component_Button = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Minera\xE7\xE3o </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Colete materiais e cristais para suas melhorias </p></div>`);
      if (unref(characterStore).currentCharacter) {
        _push(`<div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_Card, { class: "w-full max-w-2xl" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardContent, { class: "p-4 md:p-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"${_scopeId2}><div${_scopeId2}><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.name)}</h3><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}> N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</p></div><div${_scopeId2}><div class="text-2xl font-bold text-blue-600 dark:text-blue-400"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.xp)}</div><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>XP</p></div><div${_scopeId2}><div class="text-2xl font-bold text-green-600 dark:text-green-400"${_scopeId2}>${ssrInterpolate(getResourceAmount("ouro"))}</div><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>Ouro</p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-center" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, toDisplayString(unref(characterStore).currentCharacter.name), 1),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, toDisplayString(unref(characterStore).currentCharacter.xp), 1),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "XP")
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "text-2xl font-bold text-green-600 dark:text-green-400" }, toDisplayString(getResourceAmount("ouro")), 1),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Ouro")
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
                        createVNode("div", { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, toDisplayString(unref(characterStore).currentCharacter.xp), 1),
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "XP")
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "text-2xl font-bold text-green-600 dark:text-green-400" }, toDisplayString(getResourceAmount("ouro")), 1),
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Ouro")
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
      if (resources.value.length > 0) {
        _push(`<div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_Card, { class: "w-full max-w-2xl" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardContent, { class: "p-4 md:p-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"${_scopeId2}><!--[-->`);
                    ssrRenderList(resources.value, (resource) => {
                      _push3(`<div class="space-y-2"${_scopeId2}><div class="text-2xl"${_scopeId2}>${ssrInterpolate(getResourceIcon(resource.resource_type))}</div><div class="${ssrRenderClass([getResourceColor(resource.resource_type), "text-lg font-bold"])}"${_scopeId2}>${ssrInterpolate(resource.amount.toLocaleString())}</div><div class="text-sm text-gray-600 dark:text-gray-400 capitalize"${_scopeId2}>${ssrInterpolate(resource.resource_type)}</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-center" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(resources.value, (resource) => {
                          return openBlock(), createBlock("div", {
                            key: resource.resource_type,
                            class: "space-y-2"
                          }, [
                            createVNode("div", { class: "text-2xl" }, toDisplayString(getResourceIcon(resource.resource_type)), 1),
                            createVNode("div", {
                              class: ["text-lg font-bold", getResourceColor(resource.resource_type)]
                            }, toDisplayString(resource.amount.toLocaleString()), 3),
                            createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400 capitalize" }, toDisplayString(resource.resource_type), 1)
                          ]);
                        }), 128))
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
                      (openBlock(true), createBlock(Fragment, null, renderList(resources.value, (resource) => {
                        return openBlock(), createBlock("div", {
                          key: resource.resource_type,
                          class: "space-y-2"
                        }, [
                          createVNode("div", { class: "text-2xl" }, toDisplayString(getResourceIcon(resource.resource_type)), 1),
                          createVNode("div", {
                            class: ["text-lg font-bold", getResourceColor(resource.resource_type)]
                          }, toDisplayString(resource.amount.toLocaleString()), 3),
                          createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400 capitalize" }, toDisplayString(resource.resource_type), 1)
                        ]);
                      }), 128))
                    ])
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">`);
      _push(ssrRenderComponent(_component_Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-2xl"${_scopeId3}>\u2699\uFE0F</span> Minera\xE7\xE3o de Materiais `);
                      } else {
                        return [
                          createVNode("span", { class: "text-2xl" }, "\u2699\uFE0F"),
                          createTextVNode(" Minera\xE7\xE3o de Materiais ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-2xl" }, "\u2699\uFE0F"),
                        createTextVNode(" Minera\xE7\xE3o de Materiais ")
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
                var _a, _b;
                if (_push3) {
                  _push3(`<p class="text-gray-600 dark:text-gray-400"${_scopeId2}> Colete materiais essenciais para melhorias de base e equipamentos. </p><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"${_scopeId2}><h4 class="font-semibold mb-2"${_scopeId2}>Recompensas Esperadas:</h4><ul class="text-sm space-y-1"${_scopeId2}><li${_scopeId2}>\u2022 Materiais: ${ssrInterpolate(getExpectedMaterials())} unidades</li><li${_scopeId2}> \u2022 Baseado no n\xEDvel: ${ssrInterpolate(((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.level) || 1)}</li><li${_scopeId2}>\u2022 Chance de b\xF4nus: 50%</li></ul></div><div class="space-y-2"${_scopeId2}><h4 class="font-semibold"${_scopeId2}>Como Obter Materiais:</h4><ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}>\u2022 Minera\xE7\xE3o (esta p\xE1gina)</li><li${_scopeId2}>\u2022 Batalhas (40% de chance)</li><li${_scopeId2}>\u2022 Miss\xF5es especiais</li></ul></div>`);
                  _push3(ssrRenderComponent(_component_Button, {
                    onClick: ($event) => startMining("materials"),
                    disabled: mining.value,
                    class: "w-full",
                    size: "lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (mining.value) {
                          _push4(`<span${_scopeId3}>Minerando...</span>`);
                        } else {
                          _push4(`<span${_scopeId3}>Iniciar Minera\xE7\xE3o de Materiais</span>`);
                        }
                      } else {
                        return [
                          mining.value ? (openBlock(), createBlock("span", { key: 0 }, "Minerando...")) : (openBlock(), createBlock("span", { key: 1 }, "Iniciar Minera\xE7\xE3o de Materiais"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " Colete materiais essenciais para melhorias de base e equipamentos. "),
                    createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg" }, [
                      createVNode("h4", { class: "font-semibold mb-2" }, "Recompensas Esperadas:"),
                      createVNode("ul", { class: "text-sm space-y-1" }, [
                        createVNode("li", null, "\u2022 Materiais: " + toDisplayString(getExpectedMaterials()) + " unidades", 1),
                        createVNode("li", null, " \u2022 Baseado no n\xEDvel: " + toDisplayString(((_b = unref(characterStore).currentCharacter) == null ? void 0 : _b.level) || 1), 1),
                        createVNode("li", null, "\u2022 Chance de b\xF4nus: 50%")
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("h4", { class: "font-semibold" }, "Como Obter Materiais:"),
                      createVNode("ul", { class: "text-sm space-y-1 text-gray-600 dark:text-gray-400" }, [
                        createVNode("li", null, "\u2022 Minera\xE7\xE3o (esta p\xE1gina)"),
                        createVNode("li", null, "\u2022 Batalhas (40% de chance)"),
                        createVNode("li", null, "\u2022 Miss\xF5es especiais")
                      ])
                    ]),
                    createVNode(_component_Button, {
                      onClick: ($event) => startMining("materials"),
                      disabled: mining.value,
                      class: "w-full",
                      size: "lg"
                    }, {
                      default: withCtx(() => [
                        mining.value ? (openBlock(), createBlock("span", { key: 0 }, "Minerando...")) : (openBlock(), createBlock("span", { key: 1 }, "Iniciar Minera\xE7\xE3o de Materiais"))
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled"])
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
                      createVNode("span", { class: "text-2xl" }, "\u2699\uFE0F"),
                      createTextVNode(" Minera\xE7\xE3o de Materiais ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, { class: "space-y-4" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " Colete materiais essenciais para melhorias de base e equipamentos. "),
                    createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg" }, [
                      createVNode("h4", { class: "font-semibold mb-2" }, "Recompensas Esperadas:"),
                      createVNode("ul", { class: "text-sm space-y-1" }, [
                        createVNode("li", null, "\u2022 Materiais: " + toDisplayString(getExpectedMaterials()) + " unidades", 1),
                        createVNode("li", null, " \u2022 Baseado no n\xEDvel: " + toDisplayString(((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.level) || 1), 1),
                        createVNode("li", null, "\u2022 Chance de b\xF4nus: 50%")
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("h4", { class: "font-semibold" }, "Como Obter Materiais:"),
                      createVNode("ul", { class: "text-sm space-y-1 text-gray-600 dark:text-gray-400" }, [
                        createVNode("li", null, "\u2022 Minera\xE7\xE3o (esta p\xE1gina)"),
                        createVNode("li", null, "\u2022 Batalhas (40% de chance)"),
                        createVNode("li", null, "\u2022 Miss\xF5es especiais")
                      ])
                    ]),
                    createVNode(_component_Button, {
                      onClick: ($event) => startMining("materials"),
                      disabled: mining.value,
                      class: "w-full",
                      size: "lg"
                    }, {
                      default: withCtx(() => [
                        mining.value ? (openBlock(), createBlock("span", { key: 0 }, "Minerando...")) : (openBlock(), createBlock("span", { key: 1 }, "Iniciar Minera\xE7\xE3o de Materiais"))
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled"])
                  ];
                }),
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
                        _push4(`<span class="text-2xl"${_scopeId3}>\u{1F48E}</span> Minera\xE7\xE3o de Cristais `);
                      } else {
                        return [
                          createVNode("span", { class: "text-2xl" }, "\u{1F48E}"),
                          createTextVNode(" Minera\xE7\xE3o de Cristais ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-2xl" }, "\u{1F48E}"),
                        createTextVNode(" Minera\xE7\xE3o de Cristais ")
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
                var _a, _b;
                if (_push3) {
                  _push3(`<p class="text-gray-600 dark:text-gray-400"${_scopeId2}> Colete cristais raros para melhorias avan\xE7adas e constru\xE7\xF5es especiais. </p><div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"${_scopeId2}><h4 class="font-semibold mb-2"${_scopeId2}>Recompensas Esperadas:</h4><ul class="text-sm space-y-1"${_scopeId2}><li${_scopeId2}>\u2022 Cristais: ${ssrInterpolate(getExpectedCrystals())} unidades</li><li${_scopeId2}> \u2022 Baseado no n\xEDvel: ${ssrInterpolate(((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.level) || 1)}</li><li${_scopeId2}>\u2022 Chance de b\xF4nus: 50%</li></ul></div><div class="space-y-2"${_scopeId2}><h4 class="font-semibold"${_scopeId2}>Como Obter Cristais:</h4><ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}>\u2022 Minera\xE7\xE3o (esta p\xE1gina)</li><li${_scopeId2}>\u2022 Batalhas (10% de chance)</li><li${_scopeId2}>\u2022 Miss\xF5es de elite</li><li${_scopeId2}>\u2022 Modo hist\xF3ria (cap\xEDtulos avan\xE7ados)</li></ul></div>`);
                  _push3(ssrRenderComponent(_component_Button, {
                    onClick: ($event) => startMining("crystals"),
                    disabled: mining.value,
                    class: "w-full",
                    size: "lg",
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (mining.value) {
                          _push4(`<span${_scopeId3}>Minerando...</span>`);
                        } else {
                          _push4(`<span${_scopeId3}>Iniciar Minera\xE7\xE3o de Cristais</span>`);
                        }
                      } else {
                        return [
                          mining.value ? (openBlock(), createBlock("span", { key: 0 }, "Minerando...")) : (openBlock(), createBlock("span", { key: 1 }, "Iniciar Minera\xE7\xE3o de Cristais"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " Colete cristais raros para melhorias avan\xE7adas e constru\xE7\xF5es especiais. "),
                    createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg" }, [
                      createVNode("h4", { class: "font-semibold mb-2" }, "Recompensas Esperadas:"),
                      createVNode("ul", { class: "text-sm space-y-1" }, [
                        createVNode("li", null, "\u2022 Cristais: " + toDisplayString(getExpectedCrystals()) + " unidades", 1),
                        createVNode("li", null, " \u2022 Baseado no n\xEDvel: " + toDisplayString(((_b = unref(characterStore).currentCharacter) == null ? void 0 : _b.level) || 1), 1),
                        createVNode("li", null, "\u2022 Chance de b\xF4nus: 50%")
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("h4", { class: "font-semibold" }, "Como Obter Cristais:"),
                      createVNode("ul", { class: "text-sm space-y-1 text-gray-600 dark:text-gray-400" }, [
                        createVNode("li", null, "\u2022 Minera\xE7\xE3o (esta p\xE1gina)"),
                        createVNode("li", null, "\u2022 Batalhas (10% de chance)"),
                        createVNode("li", null, "\u2022 Miss\xF5es de elite"),
                        createVNode("li", null, "\u2022 Modo hist\xF3ria (cap\xEDtulos avan\xE7ados)")
                      ])
                    ]),
                    createVNode(_component_Button, {
                      onClick: ($event) => startMining("crystals"),
                      disabled: mining.value,
                      class: "w-full",
                      size: "lg",
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        mining.value ? (openBlock(), createBlock("span", { key: 0 }, "Minerando...")) : (openBlock(), createBlock("span", { key: 1 }, "Iniciar Minera\xE7\xE3o de Cristais"))
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled"])
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
                      createVNode("span", { class: "text-2xl" }, "\u{1F48E}"),
                      createTextVNode(" Minera\xE7\xE3o de Cristais ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, { class: "space-y-4" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " Colete cristais raros para melhorias avan\xE7adas e constru\xE7\xF5es especiais. "),
                    createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg" }, [
                      createVNode("h4", { class: "font-semibold mb-2" }, "Recompensas Esperadas:"),
                      createVNode("ul", { class: "text-sm space-y-1" }, [
                        createVNode("li", null, "\u2022 Cristais: " + toDisplayString(getExpectedCrystals()) + " unidades", 1),
                        createVNode("li", null, " \u2022 Baseado no n\xEDvel: " + toDisplayString(((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.level) || 1), 1),
                        createVNode("li", null, "\u2022 Chance de b\xF4nus: 50%")
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("h4", { class: "font-semibold" }, "Como Obter Cristais:"),
                      createVNode("ul", { class: "text-sm space-y-1 text-gray-600 dark:text-gray-400" }, [
                        createVNode("li", null, "\u2022 Minera\xE7\xE3o (esta p\xE1gina)"),
                        createVNode("li", null, "\u2022 Batalhas (10% de chance)"),
                        createVNode("li", null, "\u2022 Miss\xF5es de elite"),
                        createVNode("li", null, "\u2022 Modo hist\xF3ria (cap\xEDtulos avan\xE7ados)")
                      ])
                    ]),
                    createVNode(_component_Button, {
                      onClick: ($event) => startMining("crystals"),
                      disabled: mining.value,
                      class: "w-full",
                      size: "lg",
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        mining.value ? (openBlock(), createBlock("span", { key: 0 }, "Minerando...")) : (openBlock(), createBlock("span", { key: 1 }, "Iniciar Minera\xE7\xE3o de Cristais"))
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled"])
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
      if (lastMiningResult.value) {
        _push(`<div class="max-w-2xl mx-auto">`);
        _push(ssrRenderComponent(_component_Card, { class: "border-green-200 dark:border-green-800" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardContent, { class: "p-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-center space-y-4"${_scopeId2}><div class="text-4xl"${_scopeId2}>\u{1F389}</div><h3 class="text-xl font-semibold text-green-600 dark:text-green-400"${_scopeId2}> Minera\xE7\xE3o Conclu\xEDda! </h3><div class="space-y-2"${_scopeId2}><p class="text-gray-600 dark:text-gray-400"${_scopeId2}> Voc\xEA minerou ${ssrInterpolate(lastMiningResult.value.mining_type)}: </p><div class="flex justify-center gap-4"${_scopeId2}>`);
                    if (lastMiningResult.value.rewards.materials) {
                      _push3(`<div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg"${_scopeId2}><span class="text-xl"${_scopeId2}>\u2699\uFE0F</span><span class="font-semibold"${_scopeId2}> +${ssrInterpolate(lastMiningResult.value.rewards.materials)} Materiais </span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (lastMiningResult.value.rewards.crystals) {
                      _push3(`<div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg"${_scopeId2}><span class="text-xl"${_scopeId2}>\u{1F48E}</span><span class="font-semibold"${_scopeId2}> +${ssrInterpolate(lastMiningResult.value.rewards.crystals)} Cristais </span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                    _push3(ssrRenderComponent(_component_Button, {
                      onClick: ($event) => lastMiningResult.value = null,
                      variant: "outline",
                      size: "sm"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Fechar `);
                        } else {
                          return [
                            createTextVNode(" Fechar ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-center space-y-4" }, [
                        createVNode("div", { class: "text-4xl" }, "\u{1F389}"),
                        createVNode("h3", { class: "text-xl font-semibold text-green-600 dark:text-green-400" }, " Minera\xE7\xE3o Conclu\xEDda! "),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " Voc\xEA minerou " + toDisplayString(lastMiningResult.value.mining_type) + ": ", 1),
                          createVNode("div", { class: "flex justify-center gap-4" }, [
                            lastMiningResult.value.rewards.materials ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg"
                            }, [
                              createVNode("span", { class: "text-xl" }, "\u2699\uFE0F"),
                              createVNode("span", { class: "font-semibold" }, " +" + toDisplayString(lastMiningResult.value.rewards.materials) + " Materiais ", 1)
                            ])) : createCommentVNode("", true),
                            lastMiningResult.value.rewards.crystals ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg"
                            }, [
                              createVNode("span", { class: "text-xl" }, "\u{1F48E}"),
                              createVNode("span", { class: "font-semibold" }, " +" + toDisplayString(lastMiningResult.value.rewards.crystals) + " Cristais ", 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode(_component_Button, {
                          onClick: ($event) => lastMiningResult.value = null,
                          variant: "outline",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Fechar ")
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
                createVNode(_component_CardContent, { class: "p-6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-center space-y-4" }, [
                      createVNode("div", { class: "text-4xl" }, "\u{1F389}"),
                      createVNode("h3", { class: "text-xl font-semibold text-green-600 dark:text-green-400" }, " Minera\xE7\xE3o Conclu\xEDda! "),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " Voc\xEA minerou " + toDisplayString(lastMiningResult.value.mining_type) + ": ", 1),
                        createVNode("div", { class: "flex justify-center gap-4" }, [
                          lastMiningResult.value.rewards.materials ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg"
                          }, [
                            createVNode("span", { class: "text-xl" }, "\u2699\uFE0F"),
                            createVNode("span", { class: "font-semibold" }, " +" + toDisplayString(lastMiningResult.value.rewards.materials) + " Materiais ", 1)
                          ])) : createCommentVNode("", true),
                          lastMiningResult.value.rewards.crystals ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg"
                          }, [
                            createVNode("span", { class: "text-xl" }, "\u{1F48E}"),
                            createVNode("span", { class: "font-semibold" }, " +" + toDisplayString(lastMiningResult.value.rewards.crystals) + " Cristais ", 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode(_component_Button, {
                        onClick: ($event) => lastMiningResult.value = null,
                        variant: "outline",
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Fechar ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
      _push(`<div class="max-w-4xl mx-auto">`);
      _push(ssrRenderComponent(_component_Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u{1F4A1} Dicas de Minera\xE7\xE3o`);
                      } else {
                        return [
                          createTextVNode("\u{1F4A1} Dicas de Minera\xE7\xE3o")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("\u{1F4A1} Dicas de Minera\xE7\xE3o")
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
                  _push3(`<div class="grid md:grid-cols-2 gap-6"${_scopeId2}><div${_scopeId2}><h4 class="font-semibold mb-2"${_scopeId2}>Materiais:</h4><ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}>\u2022 Usados para melhorias b\xE1sicas</li><li${_scopeId2}>\u2022 Necess\xE1rios para constru\xE7\xF5es</li><li${_scopeId2}>\u2022 Mais f\xE1ceis de obter</li><li${_scopeId2}>\u2022 Quantidade aumenta com o n\xEDvel</li></ul></div><div${_scopeId2}><h4 class="font-semibold mb-2"${_scopeId2}>Cristais:</h4><ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}>\u2022 Usados para melhorias avan\xE7adas</li><li${_scopeId2}>\u2022 Necess\xE1rios para constru\xE7\xF5es especiais</li><li${_scopeId2}>\u2022 Mais raros e valiosos</li><li${_scopeId2}>\u2022 Quantidade limitada mesmo em n\xEDveis altos</li></ul></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-semibold mb-2" }, "Materiais:"),
                        createVNode("ul", { class: "text-sm space-y-1 text-gray-600 dark:text-gray-400" }, [
                          createVNode("li", null, "\u2022 Usados para melhorias b\xE1sicas"),
                          createVNode("li", null, "\u2022 Necess\xE1rios para constru\xE7\xF5es"),
                          createVNode("li", null, "\u2022 Mais f\xE1ceis de obter"),
                          createVNode("li", null, "\u2022 Quantidade aumenta com o n\xEDvel")
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-semibold mb-2" }, "Cristais:"),
                        createVNode("ul", { class: "text-sm space-y-1 text-gray-600 dark:text-gray-400" }, [
                          createVNode("li", null, "\u2022 Usados para melhorias avan\xE7adas"),
                          createVNode("li", null, "\u2022 Necess\xE1rios para constru\xE7\xF5es especiais"),
                          createVNode("li", null, "\u2022 Mais raros e valiosos"),
                          createVNode("li", null, "\u2022 Quantidade limitada mesmo em n\xEDveis altos")
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
                      createTextVNode("\u{1F4A1} Dicas de Minera\xE7\xE3o")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid md:grid-cols-2 gap-6" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-semibold mb-2" }, "Materiais:"),
                      createVNode("ul", { class: "text-sm space-y-1 text-gray-600 dark:text-gray-400" }, [
                        createVNode("li", null, "\u2022 Usados para melhorias b\xE1sicas"),
                        createVNode("li", null, "\u2022 Necess\xE1rios para constru\xE7\xF5es"),
                        createVNode("li", null, "\u2022 Mais f\xE1ceis de obter"),
                        createVNode("li", null, "\u2022 Quantidade aumenta com o n\xEDvel")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-semibold mb-2" }, "Cristais:"),
                      createVNode("ul", { class: "text-sm space-y-1 text-gray-600 dark:text-gray-400" }, [
                        createVNode("li", null, "\u2022 Usados para melhorias avan\xE7adas"),
                        createVNode("li", null, "\u2022 Necess\xE1rios para constru\xE7\xF5es especiais"),
                        createVNode("li", null, "\u2022 Mais raros e valiosos"),
                        createVNode("li", null, "\u2022 Quantidade limitada mesmo em n\xEDveis altos")
                      ])
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mineracao.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=mineracao-B2v2mmFC.mjs.map
