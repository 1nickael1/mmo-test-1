import { _ as _sfc_main$3, c as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$1$1 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$4 } from './index-D4e07kgT.mjs';
import { _ as _sfc_main$5 } from './CardDescription-DNTQjROL.mjs';
import { _ as _sfc_main$6 } from './Button-CSVd3JRx.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import { u as useCookie } from './cookie-b4_mmrzk.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "inventario",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const loading = ref(false);
    const inventory = ref([]);
    const getItemTypeColor = (type) => {
      switch (type) {
        case "potion":
          return "border-green-200 hover:border-green-300";
        case "weapon":
          return "border-red-200 hover:border-red-300";
        case "armor":
          return "border-blue-200 hover:border-blue-300";
        case "consumable":
          return "border-yellow-200 hover:border-yellow-300";
        default:
          return "";
      }
    };
    const getItemTypeVariant = (type) => {
      switch (type) {
        case "potion":
          return "default";
        case "weapon":
          return "destructive";
        case "armor":
          return "secondary";
        case "consumable":
          return "outline";
        default:
          return "default";
      }
    };
    const getItemTypeLabel = (type) => {
      switch (type) {
        case "potion":
          return "Po\xE7\xE3o";
        case "weapon":
          return "Arma";
        case "armor":
          return "Armadura";
        case "consumable":
          return "Consum\xEDvel";
        default:
          return "Item";
      }
    };
    const loadInventory = async () => {
      if (!characterStore.currentCharacter) return;
      loading.value = true;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch(
          `/api/inventory/${characterStore.currentCharacter.id}`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          }
        );
        inventory.value = response.data || [];
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };
    const useItem = async (item) => {
      var _a;
      if (!characterStore.currentCharacter) return;
      loading.value = true;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch("/api/inventory/use", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            character_id: characterStore.currentCharacter.id,
            item_id: item.id
          }
        });
        if (response.success) {
          await loadInventory();
          await characterStore.loadCharacters();
          alert(response.data.effect);
        }
      } catch (error) {
        alert(((_a = error.data) == null ? void 0 : _a.message) || "Erro ao usar item");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = _sfc_main$3;
      const _component_CardContent = _sfc_main$1;
      const _component_CardHeader = _sfc_main$2;
      const _component_CardTitle = _sfc_main$1$1;
      const _component_Badge = _sfc_main$4;
      const _component_CardDescription = _sfc_main$5;
      const _component_Button = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Invent\xE1rio </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Gerencie seus itens e consum\xEDveis </p></div>`);
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
      if (loading.value) {
        _push(`<div class="text-center py-8"><div class="text-lg text-gray-600 dark:text-gray-400"> Carregando invent\xE1rio... </div></div>`);
      } else if (inventory.value.length > 0) {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"><!--[-->`);
        ssrRenderList(inventory.value, (item) => {
          _push(ssrRenderComponent(_component_Card, {
            key: item.id,
            class: ["hover:shadow-lg transition-all duration-200", getItemTypeColor(item.item_type)]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_CardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_CardTitle, { class: "flex items-center justify-between" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span${_scopeId3}>${ssrInterpolate(item.item_name)}</span>`);
                            _push4(ssrRenderComponent(_component_Badge, {
                              variant: getItemTypeVariant(item.item_type)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(getItemTypeLabel(item.item_type))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(getItemTypeLabel(item.item_type)), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode("span", null, toDisplayString(item.item_name), 1),
                              createVNode(_component_Badge, {
                                variant: getItemTypeVariant(item.item_type)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getItemTypeLabel(item.item_type)), 1)
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
                            _push4(` Quantidade: ${ssrInterpolate(item.quantity)}`);
                          } else {
                            return [
                              createTextVNode(" Quantidade: " + toDisplayString(item.quantity), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_CardTitle, { class: "flex items-center justify-between" }, {
                          default: withCtx(() => [
                            createVNode("span", null, toDisplayString(item.item_name), 1),
                            createVNode(_component_Badge, {
                              variant: getItemTypeVariant(item.item_type)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getItemTypeLabel(item.item_type)), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_CardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode(" Quantidade: " + toDisplayString(item.quantity), 1)
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
                      if (item.description) {
                        _push3(`<div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(item.description)}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (item.stats && Object.keys(item.stats).length > 0) {
                        _push3(`<div class="space-y-2"${_scopeId2}><h4 class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId2}> Efeitos: </h4><div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}>`);
                        if (item.stats.damage) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Dano:</span><span class="font-medium text-red-600 dark:text-red-400"${_scopeId2}> +${ssrInterpolate(item.stats.damage)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (item.stats.defense) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Defesa:</span><span class="font-medium text-blue-600 dark:text-blue-400"${_scopeId2}> +${ssrInterpolate(item.stats.defense)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (item.stats.health_bonus) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Vida:</span><span class="font-medium text-green-600 dark:text-green-400"${_scopeId2}> +${ssrInterpolate(item.stats.health_bonus)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (item.item_type === "potion" || item.item_type === "consumable") {
                        _push3(ssrRenderComponent(_component_Button, {
                          class: "w-full",
                          disabled: loading.value,
                          onClick: ($event) => useItem(item)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(loading.value ? "Usando..." : "Usar")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(loading.value ? "Usando..." : "Usar"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        item.description ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm text-gray-600 dark:text-gray-400"
                        }, toDisplayString(item.description), 1)) : createCommentVNode("", true),
                        item.stats && Object.keys(item.stats).length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white" }, " Efeitos: "),
                          createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                            item.stats.damage ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Dano:"),
                              createVNode("span", { class: "font-medium text-red-600 dark:text-red-400" }, " +" + toDisplayString(item.stats.damage), 1)
                            ])) : createCommentVNode("", true),
                            item.stats.defense ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                              createVNode("span", { class: "font-medium text-blue-600 dark:text-blue-400" }, " +" + toDisplayString(item.stats.defense), 1)
                            ])) : createCommentVNode("", true),
                            item.stats.health_bonus ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                              createVNode("span", { class: "font-medium text-green-600 dark:text-green-400" }, " +" + toDisplayString(item.stats.health_bonus), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])) : createCommentVNode("", true),
                        item.item_type === "potion" || item.item_type === "consumable" ? (openBlock(), createBlock(_component_Button, {
                          key: 2,
                          class: "w-full",
                          disabled: loading.value,
                          onClick: ($event) => useItem(item)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(loading.value ? "Usando..." : "Usar"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])) : createCommentVNode("", true)
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
                          createVNode("span", null, toDisplayString(item.item_name), 1),
                          createVNode(_component_Badge, {
                            variant: getItemTypeVariant(item.item_type)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getItemTypeLabel(item.item_type)), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_CardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode(" Quantidade: " + toDisplayString(item.quantity), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_CardContent, { class: "space-y-4" }, {
                    default: withCtx(() => [
                      item.description ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-sm text-gray-600 dark:text-gray-400"
                      }, toDisplayString(item.description), 1)) : createCommentVNode("", true),
                      item.stats && Object.keys(item.stats).length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white" }, " Efeitos: "),
                        createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                          item.stats.damage ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Dano:"),
                            createVNode("span", { class: "font-medium text-red-600 dark:text-red-400" }, " +" + toDisplayString(item.stats.damage), 1)
                          ])) : createCommentVNode("", true),
                          item.stats.defense ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                            createVNode("span", { class: "font-medium text-blue-600 dark:text-blue-400" }, " +" + toDisplayString(item.stats.defense), 1)
                          ])) : createCommentVNode("", true),
                          item.stats.health_bonus ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                            createVNode("span", { class: "font-medium text-green-600 dark:text-green-400" }, " +" + toDisplayString(item.stats.health_bonus), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])) : createCommentVNode("", true),
                      item.item_type === "potion" || item.item_type === "consumable" ? (openBlock(), createBlock(_component_Button, {
                        key: 2,
                        class: "w-full",
                        disabled: loading.value,
                        onClick: ($event) => useItem(item)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(loading.value ? "Usando..." : "Usar"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"])) : createCommentVNode("", true)
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
        _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F392}</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2"> Invent\xE1rio vazio </h2><p class="text-gray-600 dark:text-gray-400 mb-6"> Complete batalhas e miss\xF5es para ganhar itens! </p>`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/batalhas"),
          size: "lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Ir para Batalhas `);
            } else {
              return [
                createTextVNode(" Ir para Batalhas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/inventario.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=inventario-DRDBRsJg.mjs.map
