import { _ as _sfc_main$3, c as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$1$1 } from './CardContent-B8C0zdGx.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BM3wg2Wn.mjs';
import { _ as _sfc_main$4 } from './Button-CSVd3JRx.mjs';
import { _ as _sfc_main$5 } from './Progress-D2Z_7baA.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import { u as useCharacterManager } from './useCharacterManager-4e-hc2Oy.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'class-variance-authority';
import 'reka-ui';
import './index-B4_YPG6v.mjs';
import './cookie-b4_mmrzk.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "melhorias",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const loading = ref(false);
    const upgrading = ref(false);
    const resources = ref([]);
    const upgrades = ref([]);
    ref(null);
    const statUpgrades = computed(
      () => upgrades.value.filter((u) => u.type === "stat")
    );
    const buildingUpgrades = computed(
      () => upgrades.value.filter((u) => u.type === "building")
    );
    const getResourceIcon = (type) => {
      switch (type) {
        case "ouro":
          return "\u{1FA99}";
        case "cristais":
          return "\u{1F48E}";
        case "materiais":
          return "\u2699\uFE0F";
        default:
          return "\u{1F4E6}";
      }
    };
    const getResourceColor = (type) => {
      switch (type) {
        case "ouro":
          return "text-yellow-600 dark:text-yellow-400";
        case "cristais":
          return "text-blue-600 dark:text-blue-400";
        case "materiais":
          return "text-gray-600 dark:text-gray-400";
        default:
          return "text-gray-600 dark:text-gray-400";
      }
    };
    const formatTime = (seconds) => {
      if (seconds < 60) return `${seconds}s`;
      if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
      return `${Math.floor(seconds / 3600)}h ${Math.floor(seconds % 3600 / 60)}m`;
    };
    const formatTimeRemaining = (milliseconds) => {
      const seconds = Math.floor(milliseconds / 1e3);
      return formatTime(seconds);
    };
    const getProgressValue = (upgrade) => {
      if (!upgrade.time_remaining || !upgrade.time_seconds) return 0;
      const totalTime = upgrade.time_seconds * 1e3;
      const elapsed = totalTime - upgrade.time_remaining;
      return elapsed / totalTime * 100;
    };
    const getRequiredLevel = (upgradeId) => {
      const id = parseInt(upgradeId);
      const upgrade = upgrades.value.find((u) => parseInt(u.id) === id);
      return (upgrade == null ? void 0 : upgrade.level) || 1;
    };
    const loadData = async () => {
      if (!characterStore.currentCharacter) return;
      loading.value = true;
      try {
        const resourcesResponse = await $fetch(
          `/api/resources/${characterStore.currentCharacter.id}`
        );
        resources.value = resourcesResponse.data || [];
        const upgradesResponse = await $fetch(
          `/api/upgrades/available?level=${characterStore.currentCharacter.level}&characterId=${characterStore.currentCharacter.id}`
        );
        const allUpgrades = upgradesResponse.data || [];
        const goldResource = resources.value.find(
          (r) => r.resource_type === "ouro"
        );
        const materialsResource = resources.value.find(
          (r) => r.resource_type === "materiais"
        );
        const crystalsResource = resources.value.find(
          (r) => r.resource_type === "cristais"
        );
        const currentGold = (goldResource == null ? void 0 : goldResource.amount) || 0;
        const currentMaterials = (materialsResource == null ? void 0 : materialsResource.amount) || 0;
        const currentCrystals = (crystalsResource == null ? void 0 : crystalsResource.amount) || 0;
        upgrades.value = allUpgrades.map((upgrade) => {
          var _a, _b, _c;
          return {
            ...upgrade,
            can_afford: currentGold >= (((_a = upgrade.current_cost) == null ? void 0 : _a.gold) || 0) && currentMaterials >= (((_b = upgrade.current_cost) == null ? void 0 : _b.materials) || 0) && currentCrystals >= (((_c = upgrade.current_cost) == null ? void 0 : _c.crystals) || 0)
          };
        });
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };
    const startUpgrade = async (upgradeId) => {
      if (!characterStore.currentCharacter) return;
      upgrading.value = true;
      try {
        const response = await $fetch("/api/upgrades/start", {
          method: "POST",
          body: {
            character_id: characterStore.currentCharacter.id,
            upgrade_id: upgradeId
          }
        });
        if (response.success) {
          await loadData();
          await characterStore.loadCharacters();
        }
      } catch (error) {
      } finally {
        upgrading.value = false;
      }
    };
    useCharacterManager();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = _sfc_main$3;
      const _component_CardContent = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CardHeader = _sfc_main$2;
      const _component_CardTitle = _sfc_main$1$1;
      const _component_Button = _sfc_main$4;
      const _component_Progress = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Melhorias </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Construa e melhore sua base espacial </p></div>`);
      if (resources.value.length > 0) {
        _push(`<div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_Card, { class: "w-full max-w-4xl" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardContent, { class: "p-4 md:p-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"${_scopeId2}><!--[-->`);
                    ssrRenderList(resources.value, (resource) => {
                      _push3(`<div class="space-y-2"${_scopeId2}><div class="text-2xl"${_scopeId2}>${ssrInterpolate(getResourceIcon(resource.resource_type))}</div><div class="${ssrRenderClass([getResourceColor(resource.resource_type), "text-lg font-bold"])}"${_scopeId2}>${ssrInterpolate(resource.amount.toLocaleString())}</div><div class="text-sm text-gray-600 dark:text-gray-400 capitalize"${_scopeId2}>${ssrInterpolate(resource.resource_type)}</div></div>`);
                    });
                    _push3(`<!--]--></div><div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"${_scopeId2}><h3 class="text-lg font-semibold mb-4 text-center"${_scopeId2}> Como Obter Recursos </h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm"${_scopeId2}><div class="text-center"${_scopeId2}><div class="text-2xl mb-2"${_scopeId2}>\u{1FA99}</div><h4 class="font-semibold mb-2"${_scopeId2}>Ouro</h4><ul class="space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}>\u2022 Batalhas (sempre)</li><li${_scopeId2}>\u2022 Miss\xF5es</li><li${_scopeId2}>\u2022 Modo hist\xF3ria</li></ul></div><div class="text-center"${_scopeId2}><div class="text-2xl mb-2"${_scopeId2}>\u2699\uFE0F</div><h4 class="font-semibold mb-2"${_scopeId2}>Materiais</h4><ul class="space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}> \u2022 `);
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: "/mineracao",
                      class: "text-blue-600 hover:underline"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Minera\xE7\xE3o`);
                        } else {
                          return [
                            createTextVNode("Minera\xE7\xE3o")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</li><li${_scopeId2}>\u2022 Batalhas (40% chance)</li><li${_scopeId2}>\u2022 Miss\xF5es especiais</li></ul></div><div class="text-center"${_scopeId2}><div class="text-2xl mb-2"${_scopeId2}>\u{1F48E}</div><h4 class="font-semibold mb-2"${_scopeId2}>Cristais</h4><ul class="space-y-1 text-gray-600 dark:text-gray-400"${_scopeId2}><li${_scopeId2}> \u2022 `);
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: "/mineracao",
                      class: "text-blue-600 hover:underline"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Minera\xE7\xE3o`);
                        } else {
                          return [
                            createTextVNode("Minera\xE7\xE3o")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</li><li${_scopeId2}>\u2022 Batalhas (10% chance)</li><li${_scopeId2}>\u2022 Miss\xF5es de elite</li><li${_scopeId2}>\u2022 Hist\xF3ria avan\xE7ada</li></ul></div></div></div>`);
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
                      ]),
                      createVNode("div", { class: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-700" }, [
                        createVNode("h3", { class: "text-lg font-semibold mb-4 text-center" }, " Como Obter Recursos "),
                        createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm" }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-2xl mb-2" }, "\u{1FA99}"),
                            createVNode("h4", { class: "font-semibold mb-2" }, "Ouro"),
                            createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                              createVNode("li", null, "\u2022 Batalhas (sempre)"),
                              createVNode("li", null, "\u2022 Miss\xF5es"),
                              createVNode("li", null, "\u2022 Modo hist\xF3ria")
                            ])
                          ]),
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-2xl mb-2" }, "\u2699\uFE0F"),
                            createVNode("h4", { class: "font-semibold mb-2" }, "Materiais"),
                            createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                              createVNode("li", null, [
                                createTextVNode(" \u2022 "),
                                createVNode(_component_NuxtLink, {
                                  to: "/mineracao",
                                  class: "text-blue-600 hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Minera\xE7\xE3o")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("li", null, "\u2022 Batalhas (40% chance)"),
                              createVNode("li", null, "\u2022 Miss\xF5es especiais")
                            ])
                          ]),
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-2xl mb-2" }, "\u{1F48E}"),
                            createVNode("h4", { class: "font-semibold mb-2" }, "Cristais"),
                            createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                              createVNode("li", null, [
                                createTextVNode(" \u2022 "),
                                createVNode(_component_NuxtLink, {
                                  to: "/mineracao",
                                  class: "text-blue-600 hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Minera\xE7\xE3o")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("li", null, "\u2022 Batalhas (10% chance)"),
                              createVNode("li", null, "\u2022 Miss\xF5es de elite"),
                              createVNode("li", null, "\u2022 Hist\xF3ria avan\xE7ada")
                            ])
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
                    ]),
                    createVNode("div", { class: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-700" }, [
                      createVNode("h3", { class: "text-lg font-semibold mb-4 text-center" }, " Como Obter Recursos "),
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, "\u{1FA99}"),
                          createVNode("h4", { class: "font-semibold mb-2" }, "Ouro"),
                          createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                            createVNode("li", null, "\u2022 Batalhas (sempre)"),
                            createVNode("li", null, "\u2022 Miss\xF5es"),
                            createVNode("li", null, "\u2022 Modo hist\xF3ria")
                          ])
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, "\u2699\uFE0F"),
                          createVNode("h4", { class: "font-semibold mb-2" }, "Materiais"),
                          createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                            createVNode("li", null, [
                              createTextVNode(" \u2022 "),
                              createVNode(_component_NuxtLink, {
                                to: "/mineracao",
                                class: "text-blue-600 hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Minera\xE7\xE3o")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("li", null, "\u2022 Batalhas (40% chance)"),
                            createVNode("li", null, "\u2022 Miss\xF5es especiais")
                          ])
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, "\u{1F48E}"),
                          createVNode("h4", { class: "font-semibold mb-2" }, "Cristais"),
                          createVNode("ul", { class: "space-y-1 text-gray-600 dark:text-gray-400" }, [
                            createVNode("li", null, [
                              createTextVNode(" \u2022 "),
                              createVNode(_component_NuxtLink, {
                                to: "/mineracao",
                                class: "text-blue-600 hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Minera\xE7\xE3o")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("li", null, "\u2022 Batalhas (10% chance)"),
                            createVNode("li", null, "\u2022 Miss\xF5es de elite"),
                            createVNode("li", null, "\u2022 Hist\xF3ria avan\xE7ada")
                          ])
                        ])
                      ])
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
      if (loading.value) {
        _push(`<div class="text-center py-8"><div class="text-lg text-gray-600 dark:text-gray-400"> Carregando melhorias... </div></div>`);
      } else {
        _push(`<div class="space-y-8"><div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Melhorias de Stats </h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(statUpgrades.value, (upgrade) => {
          _push(ssrRenderComponent(_component_Card, {
            key: upgrade.id,
            class: [
              "hover:shadow-lg transition-all duration-200",
              upgrade.can_afford && upgrade.can_upgrade ? "cursor-pointer hover:scale-105" : "opacity-60"
            ],
            onClick: ($event) => upgrade.can_afford && upgrade.can_upgrade ? startUpgrade(upgrade.id) : null
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="text-blue-600 dark:text-blue-400"${_scopeId3}>\u{1F4C8}</span> ${ssrInterpolate(upgrade.name)}`);
                          } else {
                            return [
                              createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "\u{1F4C8}"),
                              createTextVNode(" " + toDisplayString(upgrade.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "\u{1F4C8}"),
                            createTextVNode(" " + toDisplayString(upgrade.name), 1)
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
                      _push3(`<p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(upgrade.description)}</p><div class="space-y-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>N\xEDvel:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(upgrade.current_level)}/${ssrInterpolate(upgrade.max_level)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Custo:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(upgrade.current_cost.gold)} \u{1FA99}</span></div>`);
                      if (upgrade.current_cost.materials > 0) {
                        _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Materiais:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(upgrade.current_cost.materials)} \u2699\uFE0F</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      if (upgrade.can_afford && upgrade.can_upgrade) {
                        _push3(ssrRenderComponent(_component_Button, {
                          onClick: ($event) => startUpgrade(upgrade.id),
                          disabled: upgrading.value,
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(upgrading.value ? "Melhorando..." : "Melhorar")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(upgrading.value ? "Melhorando..." : "Melhorar"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else if (!upgrade.can_upgrade) {
                        _push3(ssrRenderComponent(_component_Button, {
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` N\xEDvel ${ssrInterpolate(getRequiredLevel(upgrade.id))} Necess\xE1rio `);
                            } else {
                              return [
                                createTextVNode(" N\xEDvel " + toDisplayString(getRequiredLevel(upgrade.id)) + " Necess\xE1rio ", 1)
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
                              _push4(` Recursos Insuficientes `);
                            } else {
                              return [
                                createTextVNode(" Recursos Insuficientes ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      }
                    } else {
                      return [
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(upgrade.description), 1),
                        createVNode("div", { class: "space-y-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_level) + "/" + toDisplayString(upgrade.max_level), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Custo:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.gold) + " \u{1FA99}", 1)
                          ]),
                          upgrade.current_cost.materials > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Materiais:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.materials) + " \u2699\uFE0F", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        upgrade.can_afford && upgrade.can_upgrade ? (openBlock(), createBlock(_component_Button, {
                          key: 0,
                          onClick: withModifiers(($event) => startUpgrade(upgrade.id), ["stop"]),
                          disabled: upgrading.value,
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(upgrading.value ? "Melhorando..." : "Melhorar"), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"])) : !upgrade.can_upgrade ? (openBlock(), createBlock(_component_Button, {
                          key: 1,
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" N\xEDvel " + toDisplayString(getRequiredLevel(upgrade.id)) + " Necess\xE1rio ", 1)
                          ]),
                          _: 2
                        }, 1024)) : (openBlock(), createBlock(_component_Button, {
                          key: 2,
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Recursos Insuficientes ")
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
                          createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "\u{1F4C8}"),
                          createTextVNode(" " + toDisplayString(upgrade.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_CardContent, { class: "space-y-3" }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(upgrade.description), 1),
                      createVNode("div", { class: "space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_level) + "/" + toDisplayString(upgrade.max_level), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Custo:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.gold) + " \u{1FA99}", 1)
                        ]),
                        upgrade.current_cost.materials > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between"
                        }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Materiais:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.materials) + " \u2699\uFE0F", 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      upgrade.can_afford && upgrade.can_upgrade ? (openBlock(), createBlock(_component_Button, {
                        key: 0,
                        onClick: withModifiers(($event) => startUpgrade(upgrade.id), ["stop"]),
                        disabled: upgrading.value,
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(upgrading.value ? "Melhorando..." : "Melhorar"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"])) : !upgrade.can_upgrade ? (openBlock(), createBlock(_component_Button, {
                        key: 1,
                        disabled: "",
                        variant: "outline",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" N\xEDvel " + toDisplayString(getRequiredLevel(upgrade.id)) + " Necess\xE1rio ", 1)
                        ]),
                        _: 2
                      }, 1024)) : (openBlock(), createBlock(_component_Button, {
                        key: 2,
                        disabled: "",
                        variant: "outline",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Recursos Insuficientes ")
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
        _push(`<!--]--></div></div><div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Melhorias de Base </h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(buildingUpgrades.value, (upgrade) => {
          _push(ssrRenderComponent(_component_Card, {
            key: upgrade.id,
            class: [
              "hover:shadow-lg transition-all duration-200",
              upgrade.can_afford && upgrade.can_upgrade ? "cursor-pointer hover:scale-105" : "opacity-60"
            ],
            onClick: ($event) => upgrade.can_afford && upgrade.can_upgrade ? startUpgrade(upgrade.id) : null
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="text-green-600 dark:text-green-400"${_scopeId3}>\u{1F3D7}\uFE0F</span> ${ssrInterpolate(upgrade.name)}`);
                          } else {
                            return [
                              createVNode("span", { class: "text-green-600 dark:text-green-400" }, "\u{1F3D7}\uFE0F"),
                              createTextVNode(" " + toDisplayString(upgrade.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-green-600 dark:text-green-400" }, "\u{1F3D7}\uFE0F"),
                            createTextVNode(" " + toDisplayString(upgrade.name), 1)
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
                      _push3(`<p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(upgrade.description)}</p><div class="space-y-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>N\xEDvel:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(upgrade.current_level)}/${ssrInterpolate(upgrade.max_level)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Custo:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(upgrade.current_cost.gold)} \u{1FA99}</span></div>`);
                      if (upgrade.current_cost.materials > 0) {
                        _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Materiais:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(upgrade.current_cost.materials)} \u2699\uFE0F</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (upgrade.current_cost.crystals > 0) {
                        _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Cristais:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(upgrade.current_cost.crystals)} \u{1F48E}</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Tempo:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(formatTime(upgrade.time_seconds || 0))}</span></div></div>`);
                      if (upgrade.time_remaining > 0) {
                        _push3(`<div class="space-y-2"${_scopeId2}><div class="text-xs text-gray-600 dark:text-gray-400"${_scopeId2}> Tempo restante: ${ssrInterpolate(formatTimeRemaining(upgrade.time_remaining))}</div>`);
                        _push3(ssrRenderComponent(_component_Progress, {
                          value: getProgressValue(upgrade),
                          class: "h-2"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (upgrade.can_afford && upgrade.can_upgrade && upgrade.time_remaining <= 0) {
                        _push3(ssrRenderComponent(_component_Button, {
                          onClick: ($event) => startUpgrade(upgrade.id),
                          disabled: upgrading.value,
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(upgrading.value ? "Iniciando..." : "Iniciar Constru\xE7\xE3o")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(upgrading.value ? "Iniciando..." : "Iniciar Constru\xE7\xE3o"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else if (upgrade.time_remaining > 0) {
                        _push3(ssrRenderComponent(_component_Button, {
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Em Constru\xE7\xE3o `);
                            } else {
                              return [
                                createTextVNode(" Em Constru\xE7\xE3o ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else if (!upgrade.can_upgrade) {
                        _push3(ssrRenderComponent(_component_Button, {
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` N\xEDvel ${ssrInterpolate(getRequiredLevel(upgrade.id))} Necess\xE1rio `);
                            } else {
                              return [
                                createTextVNode(" N\xEDvel " + toDisplayString(getRequiredLevel(upgrade.id)) + " Necess\xE1rio ", 1)
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
                              _push4(` Recursos Insuficientes `);
                            } else {
                              return [
                                createTextVNode(" Recursos Insuficientes ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      }
                    } else {
                      return [
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(upgrade.description), 1),
                        createVNode("div", { class: "space-y-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_level) + "/" + toDisplayString(upgrade.max_level), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Custo:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.gold) + " \u{1FA99}", 1)
                          ]),
                          upgrade.current_cost.materials > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Materiais:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.materials) + " \u2699\uFE0F", 1)
                          ])) : createCommentVNode("", true),
                          upgrade.current_cost.crystals > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Cristais:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.crystals) + " \u{1F48E}", 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Tempo:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatTime(upgrade.time_seconds || 0)), 1)
                          ])
                        ]),
                        upgrade.time_remaining > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          createVNode("div", { class: "text-xs text-gray-600 dark:text-gray-400" }, " Tempo restante: " + toDisplayString(formatTimeRemaining(upgrade.time_remaining)), 1),
                          createVNode(_component_Progress, {
                            value: getProgressValue(upgrade),
                            class: "h-2"
                          }, null, 8, ["value"])
                        ])) : createCommentVNode("", true),
                        upgrade.can_afford && upgrade.can_upgrade && upgrade.time_remaining <= 0 ? (openBlock(), createBlock(_component_Button, {
                          key: 1,
                          onClick: withModifiers(($event) => startUpgrade(upgrade.id), ["stop"]),
                          disabled: upgrading.value,
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(upgrading.value ? "Iniciando..." : "Iniciar Constru\xE7\xE3o"), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"])) : upgrade.time_remaining > 0 ? (openBlock(), createBlock(_component_Button, {
                          key: 2,
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Em Constru\xE7\xE3o ")
                          ]),
                          _: 1
                        })) : !upgrade.can_upgrade ? (openBlock(), createBlock(_component_Button, {
                          key: 3,
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" N\xEDvel " + toDisplayString(getRequiredLevel(upgrade.id)) + " Necess\xE1rio ", 1)
                          ]),
                          _: 2
                        }, 1024)) : (openBlock(), createBlock(_component_Button, {
                          key: 4,
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Recursos Insuficientes ")
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
                          createVNode("span", { class: "text-green-600 dark:text-green-400" }, "\u{1F3D7}\uFE0F"),
                          createTextVNode(" " + toDisplayString(upgrade.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_CardContent, { class: "space-y-3" }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(upgrade.description), 1),
                      createVNode("div", { class: "space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_level) + "/" + toDisplayString(upgrade.max_level), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Custo:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.gold) + " \u{1FA99}", 1)
                        ]),
                        upgrade.current_cost.materials > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between"
                        }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Materiais:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.materials) + " \u2699\uFE0F", 1)
                        ])) : createCommentVNode("", true),
                        upgrade.current_cost.crystals > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between"
                        }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Cristais:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(upgrade.current_cost.crystals) + " \u{1F48E}", 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Tempo:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatTime(upgrade.time_seconds || 0)), 1)
                        ])
                      ]),
                      upgrade.time_remaining > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2"
                      }, [
                        createVNode("div", { class: "text-xs text-gray-600 dark:text-gray-400" }, " Tempo restante: " + toDisplayString(formatTimeRemaining(upgrade.time_remaining)), 1),
                        createVNode(_component_Progress, {
                          value: getProgressValue(upgrade),
                          class: "h-2"
                        }, null, 8, ["value"])
                      ])) : createCommentVNode("", true),
                      upgrade.can_afford && upgrade.can_upgrade && upgrade.time_remaining <= 0 ? (openBlock(), createBlock(_component_Button, {
                        key: 1,
                        onClick: withModifiers(($event) => startUpgrade(upgrade.id), ["stop"]),
                        disabled: upgrading.value,
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(upgrading.value ? "Iniciando..." : "Iniciar Constru\xE7\xE3o"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"])) : upgrade.time_remaining > 0 ? (openBlock(), createBlock(_component_Button, {
                        key: 2,
                        disabled: "",
                        variant: "outline",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Em Constru\xE7\xE3o ")
                        ]),
                        _: 1
                      })) : !upgrade.can_upgrade ? (openBlock(), createBlock(_component_Button, {
                        key: 3,
                        disabled: "",
                        variant: "outline",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" N\xEDvel " + toDisplayString(getRequiredLevel(upgrade.id)) + " Necess\xE1rio ", 1)
                        ]),
                        _: 2
                      }, 1024)) : (openBlock(), createBlock(_component_Button, {
                        key: 4,
                        disabled: "",
                        variant: "outline",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Recursos Insuficientes ")
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
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/melhorias.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=melhorias-BsQYJFvk.mjs.map
