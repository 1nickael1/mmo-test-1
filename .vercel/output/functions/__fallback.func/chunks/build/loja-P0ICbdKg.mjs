import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './index-D4e07kgT.mjs';
import { _ as _sfc_main$1 } from './Button-CSVd3JRx.mjs';
import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1$1, c as _sfc_main$6 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$5 } from './CardDescription-DNTQjROL.mjs';
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
  __name: "loja",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const shopItems = ref([]);
    const loading = ref(false);
    const selectedCategory = ref("Todos");
    const currentGold = ref(0);
    const categories = computed(() => {
      const cats = ["Todos"];
      shopItems.value.forEach((item) => {
        if (!cats.includes(item.category)) {
          cats.push(item.category);
        }
      });
      return cats;
    });
    const filteredItems = computed(() => {
      if (selectedCategory.value === "Todos") {
        return shopItems.value;
      }
      return shopItems.value.filter(
        (item) => item.category === selectedCategory.value
      );
    });
    const loadCurrentGold = async () => {
      if (!characterStore.currentCharacter) return;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch("/api/resources", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          query: {
            character_id: characterStore.currentCharacter.id
          }
        });
        if (response.success) {
          const goldResource = response.data.find(
            (r) => r.resource_type === "ouro"
          );
          currentGold.value = goldResource ? goldResource.amount : 0;
        }
      } catch (error) {
      }
    };
    const buyItem = async (item) => {
      var _a;
      if (!characterStore.currentCharacter) return;
      loading.value = true;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch("/api/shop/buy", {
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
          currentGold.value = response.data.remaining_gold;
          alert(`${item.name} comprado com sucesso!`);
          await loadCurrentGold();
        }
      } catch (error) {
        alert(((_a = error.data) == null ? void 0 : _a.message) || "Erro ao comprar item");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Loja </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Compre itens e equipamentos para fortalecer seu personagem </p></div>`);
      if (unref(characterStore).currentCharacter) {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div><h2 class="text-lg md:text-xl font-semibold text-black dark:text-white">${ssrInterpolate(unref(characterStore).currentCharacter.name)}</h2><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</p></div><div class="flex items-center space-x-2"><span class="text-yellow-500">\u{1F4B0}</span><span class="font-semibold text-black dark:text-white text-lg">${ssrInterpolate(currentGold.value)}</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="text-center py-8"><div class="text-lg text-gray-600 dark:text-gray-400"> Carregando itens da loja... </div></div>`);
      } else if (shopItems.value.length > 0) {
        _push(`<div class="space-y-6"><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(categories.value, (category) => {
          _push(ssrRenderComponent(unref(_sfc_main$1), {
            key: category,
            onClick: ($event) => selectedCategory.value = category,
            variant: selectedCategory.value === category ? "default" : "outline",
            size: "sm",
            class: selectedCategory.value === category ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-500" : "text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(category)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(category), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"><!--[-->`);
        ssrRenderList(filteredItems.value, (item) => {
          _push(ssrRenderComponent(unref(_sfc_main$3), {
            key: item.id,
            class: ["hover:shadow-lg transition-all duration-200", !item.can_buy ? "opacity-60" : ""]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$1$1), { class: "text-lg text-gray-900 dark:text-white" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$4), {
                        variant: item.type === "potion" ? "default" : "secondary"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.type === "potion" ? "\u{1F9EA}" : "\u2694\uFE0F")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.type === "potion" ? "\u{1F9EA}" : "\u2694\uFE0F"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-gray-700 dark:text-white" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.description)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.description), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(unref(_sfc_main$1$1), { class: "text-lg text-gray-900 dark:text-white" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$4), {
                            variant: item.type === "potion" ? "default" : "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.type === "potion" ? "\u{1F9EA}" : "\u2694\uFE0F"), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant"])
                        ]),
                        createVNode(unref(_sfc_main$5), { class: "text-gray-700 dark:text-white" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.description), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (item.type === "equipment" && item.stats) {
                        _push3(`<div class="space-y-2"${_scopeId2}><h4 class="text-sm font-medium text-black dark:text-white"${_scopeId2}> B\xF4nus: </h4><div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}>`);
                        if (item.stats.strength) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>For\xE7a:</span><span class="font-medium text-red-600"${_scopeId2}>+${ssrInterpolate(item.stats.strength)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (item.stats.agility) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Agilidade:</span><span class="font-medium text-blue-600"${_scopeId2}>+${ssrInterpolate(item.stats.agility)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (item.stats.defense) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Defesa:</span><span class="font-medium text-green-600"${_scopeId2}>+${ssrInterpolate(item.stats.defense)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (item.stats.health) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Vida:</span><span class="font-medium text-purple-600"${_scopeId2}>+${ssrInterpolate(item.stats.health)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (item.stats.damage) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Dano:</span><span class="font-medium text-orange-600"${_scopeId2}>+${ssrInterpolate(item.stats.damage)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex items-center justify-between"${_scopeId2}><div class="flex items-center space-x-2"${_scopeId2}><span class="text-yellow-500"${_scopeId2}>\u{1F4B0}</span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(item.price)}</span></div><div class="text-sm text-gray-700 dark:text-gray-300"${_scopeId2}> Nv. ${ssrInterpolate(item.level_required)}</div></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$1), {
                        onClick: ($event) => buyItem(item),
                        disabled: loading.value || !item.can_buy || item.price > currentGold.value,
                        class: "w-full",
                        variant: !item.can_buy ? "secondary" : item.price > currentGold.value ? "destructive" : "default"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(!item.can_buy ? `N\xEDvel ${item.level_required} Necess\xE1rio` : item.price > currentGold.value ? "Ouro Insuficiente" : "Comprar")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(!item.can_buy ? `N\xEDvel ${item.level_required} Necess\xE1rio` : item.price > currentGold.value ? "Ouro Insuficiente" : "Comprar"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        item.type === "equipment" && item.stats ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          createVNode("h4", { class: "text-sm font-medium text-black dark:text-white" }, " B\xF4nus: "),
                          createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                            item.stats.strength ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                              createVNode("span", { class: "font-medium text-red-600" }, "+" + toDisplayString(item.stats.strength), 1)
                            ])) : createCommentVNode("", true),
                            item.stats.agility ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                              createVNode("span", { class: "font-medium text-blue-600" }, "+" + toDisplayString(item.stats.agility), 1)
                            ])) : createCommentVNode("", true),
                            item.stats.defense ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                              createVNode("span", { class: "font-medium text-green-600" }, "+" + toDisplayString(item.stats.defense), 1)
                            ])) : createCommentVNode("", true),
                            item.stats.health ? (openBlock(), createBlock("div", {
                              key: 3,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                              createVNode("span", { class: "font-medium text-purple-600" }, "+" + toDisplayString(item.stats.health), 1)
                            ])) : createCommentVNode("", true),
                            item.stats.damage ? (openBlock(), createBlock("div", {
                              key: 4,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Dano:"),
                              createVNode("span", { class: "font-medium text-orange-600" }, "+" + toDisplayString(item.stats.damage), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            createVNode("span", { class: "text-yellow-500" }, "\u{1F4B0}"),
                            createVNode("span", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(item.price), 1)
                          ]),
                          createVNode("div", { class: "text-sm text-gray-700 dark:text-gray-300" }, " Nv. " + toDisplayString(item.level_required), 1)
                        ]),
                        createVNode(unref(_sfc_main$1), {
                          onClick: ($event) => buyItem(item),
                          disabled: loading.value || !item.can_buy || item.price > currentGold.value,
                          class: "w-full",
                          variant: !item.can_buy ? "secondary" : item.price > currentGold.value ? "destructive" : "default"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(!item.can_buy ? `N\xEDvel ${item.level_required} Necess\xE1rio` : item.price > currentGold.value ? "Ouro Insuficiente" : "Comprar"), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "disabled", "variant"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(unref(_sfc_main$1$1), { class: "text-lg text-gray-900 dark:text-white" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$4), {
                          variant: item.type === "potion" ? "default" : "secondary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.type === "potion" ? "\u{1F9EA}" : "\u2694\uFE0F"), 1)
                          ]),
                          _: 2
                        }, 1032, ["variant"])
                      ]),
                      createVNode(unref(_sfc_main$5), { class: "text-gray-700 dark:text-white" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.description), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                    default: withCtx(() => [
                      item.type === "equipment" && item.stats ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2"
                      }, [
                        createVNode("h4", { class: "text-sm font-medium text-black dark:text-white" }, " B\xF4nus: "),
                        createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                          item.stats.strength ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                            createVNode("span", { class: "font-medium text-red-600" }, "+" + toDisplayString(item.stats.strength), 1)
                          ])) : createCommentVNode("", true),
                          item.stats.agility ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                            createVNode("span", { class: "font-medium text-blue-600" }, "+" + toDisplayString(item.stats.agility), 1)
                          ])) : createCommentVNode("", true),
                          item.stats.defense ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                            createVNode("span", { class: "font-medium text-green-600" }, "+" + toDisplayString(item.stats.defense), 1)
                          ])) : createCommentVNode("", true),
                          item.stats.health ? (openBlock(), createBlock("div", {
                            key: 3,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                            createVNode("span", { class: "font-medium text-purple-600" }, "+" + toDisplayString(item.stats.health), 1)
                          ])) : createCommentVNode("", true),
                          item.stats.damage ? (openBlock(), createBlock("div", {
                            key: 4,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Dano:"),
                            createVNode("span", { class: "font-medium text-orange-600" }, "+" + toDisplayString(item.stats.damage), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          createVNode("span", { class: "text-yellow-500" }, "\u{1F4B0}"),
                          createVNode("span", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(item.price), 1)
                        ]),
                        createVNode("div", { class: "text-sm text-gray-700 dark:text-gray-300" }, " Nv. " + toDisplayString(item.level_required), 1)
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        onClick: ($event) => buyItem(item),
                        disabled: loading.value || !item.can_buy || item.price > currentGold.value,
                        class: "w-full",
                        variant: !item.can_buy ? "secondary" : item.price > currentGold.value ? "destructive" : "default"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(!item.can_buy ? `N\xEDvel ${item.level_required} Necess\xE1rio` : item.price > currentGold.value ? "Ouro Insuficiente" : "Comprar"), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "disabled", "variant"])
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
      } else {
        _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F3EA}</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2"> Nenhum item dispon\xEDvel </h2><p class="text-gray-600 dark:text-gray-400"> Suba de n\xEDvel para desbloquear mais itens na loja! </p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/loja.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=loja-P0ICbdKg.mjs.map
