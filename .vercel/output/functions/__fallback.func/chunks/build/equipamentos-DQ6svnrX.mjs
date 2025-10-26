import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { n as navigateTo } from './server.mjs';
import { u as useCookie } from './cookie-b4_mmrzk.mjs';
import { _ as _sfc_main$4 } from './index-D4e07kgT.mjs';
import { _ as _sfc_main$6 } from './Button-CSVd3JRx.mjs';
import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$5 } from './CardContent-B8C0zdGx.mjs';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
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
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "equipamentos",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const equipment = ref([]);
    const loading = ref(false);
    const selectedType = ref("Todos");
    const currentGold = ref(0);
    const equipmentTypes = computed(() => {
      const types = ["Todos"];
      equipment.value.forEach((item) => {
        if (!types.includes(item.equipment_type)) {
          types.push(item.equipment_type);
        }
      });
      return types;
    });
    const filteredEquipment = computed(() => {
      const unequippedItems = equipment.value.filter((item) => !item.equipped);
      if (selectedType.value === "Todos") {
        return unequippedItems;
      }
      return unequippedItems.filter(
        (item) => item.equipment_type === selectedType.value
      );
    });
    const equippedItems = computed(() => {
      return equipment.value.filter((item) => item.equipped);
    });
    const emptySlots = computed(() => {
      const equippedTypes = equippedItems.value.map((item) => item.equipment_type);
      const allTypes = ["weapon", "armor", "accessory"];
      return allTypes.filter((type) => !equippedTypes.includes(type));
    });
    const getTypeIcon = (type) => {
      switch (type) {
        case "weapon":
          return "\u2694\uFE0F";
        case "armor":
          return "\u{1F6E1}\uFE0F";
        case "accessory":
          return "\u{1F48D}";
        default:
          return "\u2753";
      }
    };
    const getTypeName = (type) => {
      switch (type) {
        case "weapon":
          return "Arma";
        case "armor":
          return "Armadura";
        case "accessory":
          return "Acess\xF3rio";
        default:
          return "Desconhecido";
      }
    };
    const getTypeBadgeVariant = (type) => {
      switch (type) {
        case "weapon":
          return "destructive";
        case "armor":
          return "default";
        case "accessory":
          return "secondary";
        default:
          return "outline";
      }
    };
    const loadEquipment = async () => {
      if (!characterStore.currentCharacter) return;
      loading.value = true;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch(
          `/api/equipment/${characterStore.currentCharacter.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          }
        );
        if (response.success) {
          equipment.value = response.data || [];
        }
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };
    const toggleEquipment = async (item) => {
      var _a;
      if (!characterStore.currentCharacter) return;
      loading.value = true;
      try {
        const token = useCookie("@mmo/ninja/token");
        const response = await $fetch("/api/equipment/equip", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            character_id: characterStore.currentCharacter.id,
            equipment_id: item.id
          }
        });
        if (response.success) {
          const index = equipment.value.findIndex((eq) => eq.id === item.id);
          if (index !== -1) {
            equipment.value[index].equipped = response.data.equipped;
          }
          alert(response.message);
          await loadEquipment();
        }
      } catch (error) {
        alert(((_a = error.data) == null ? void 0 : _a.message) || "Erro ao equipar/desequipar item");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Equipamentos </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Gerencie seus equipamentos e aumente seu poder </p></div>`);
      if (unref(characterStore).currentCharacter) {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div><h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">${ssrInterpolate(unref(characterStore).currentCharacter.name)}</h2><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</p></div><div class="flex items-center space-x-2"><span class="text-yellow-500">\u{1F4B0}</span><span class="font-semibold text-black dark:text-white text-lg">${ssrInterpolate(currentGold.value)}</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="text-center py-8"><div class="text-lg text-gray-600 dark:text-gray-400"> Carregando equipamentos... </div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (equipment.value.length > 0) {
        _push(`<div class="mb-8"><h2 class="text-2xl font-bold text-black dark:text-white mb-4"> Equipamentos Atuais </h2><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(equippedItems.value, (equippedItem) => {
          _push(ssrRenderComponent(unref(_sfc_main$3), {
            key: equippedItem.id,
            class: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$1), { class: "text-lg text-green-800 dark:text-green-200" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(equippedItem.equipment_name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(equippedItem.equipment_name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$4), {
                        variant: "default",
                        class: "bg-green-600 text-white"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(getTypeIcon(equippedItem.equipment_type))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(getTypeIcon(equippedItem.equipment_type)), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(unref(_sfc_main$1), { class: "text-lg text-green-800 dark:text-green-200" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(equippedItem.equipment_name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$4), {
                            variant: "default",
                            class: "bg-green-600 text-white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getTypeIcon(equippedItem.equipment_type)), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (equippedItem.stats) {
                        _push3(`<div class="space-y-2"${_scopeId2}><div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}>`);
                        if (equippedItem.stats.strength) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>For\xE7a:</span><span class="font-medium text-red-600"${_scopeId2}>+${ssrInterpolate(equippedItem.stats.strength)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (equippedItem.stats.agility) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Agilidade:</span><span class="font-medium text-blue-600"${_scopeId2}>+${ssrInterpolate(equippedItem.stats.agility)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (equippedItem.stats.defense) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Defesa:</span><span class="font-medium text-green-600"${_scopeId2}>+${ssrInterpolate(equippedItem.stats.defense)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (equippedItem.stats.health) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Vida:</span><span class="font-medium text-purple-600"${_scopeId2}>+${ssrInterpolate(equippedItem.stats.health)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (equippedItem.stats.damage) {
                          _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Dano:</span><span class="font-medium text-orange-600"${_scopeId2}>+${ssrInterpolate(equippedItem.stats.damage)}</span></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="mt-3"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$4), {
                        variant: "secondary",
                        class: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Equipado `);
                          } else {
                            return [
                              createTextVNode(" Equipado ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        equippedItem.stats ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                            equippedItem.stats.strength ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                              createVNode("span", { class: "font-medium text-red-600" }, "+" + toDisplayString(equippedItem.stats.strength), 1)
                            ])) : createCommentVNode("", true),
                            equippedItem.stats.agility ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                              createVNode("span", { class: "font-medium text-blue-600" }, "+" + toDisplayString(equippedItem.stats.agility), 1)
                            ])) : createCommentVNode("", true),
                            equippedItem.stats.defense ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                              createVNode("span", { class: "font-medium text-green-600" }, "+" + toDisplayString(equippedItem.stats.defense), 1)
                            ])) : createCommentVNode("", true),
                            equippedItem.stats.health ? (openBlock(), createBlock("div", {
                              key: 3,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                              createVNode("span", { class: "font-medium text-purple-600" }, "+" + toDisplayString(equippedItem.stats.health), 1)
                            ])) : createCommentVNode("", true),
                            equippedItem.stats.damage ? (openBlock(), createBlock("div", {
                              key: 4,
                              class: "flex justify-between"
                            }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Dano:"),
                              createVNode("span", { class: "font-medium text-orange-600" }, "+" + toDisplayString(equippedItem.stats.damage), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-3" }, [
                          createVNode(unref(_sfc_main$4), {
                            variant: "secondary",
                            class: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Equipado ")
                            ]),
                            _: 1
                          })
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$2), { class: "pb-2" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(unref(_sfc_main$1), { class: "text-lg text-green-800 dark:text-green-200" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(equippedItem.equipment_name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$4), {
                          variant: "default",
                          class: "bg-green-600 text-white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getTypeIcon(equippedItem.equipment_type)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      equippedItem.stats ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2"
                      }, [
                        createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                          equippedItem.stats.strength ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                            createVNode("span", { class: "font-medium text-red-600" }, "+" + toDisplayString(equippedItem.stats.strength), 1)
                          ])) : createCommentVNode("", true),
                          equippedItem.stats.agility ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                            createVNode("span", { class: "font-medium text-blue-600" }, "+" + toDisplayString(equippedItem.stats.agility), 1)
                          ])) : createCommentVNode("", true),
                          equippedItem.stats.defense ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                            createVNode("span", { class: "font-medium text-green-600" }, "+" + toDisplayString(equippedItem.stats.defense), 1)
                          ])) : createCommentVNode("", true),
                          equippedItem.stats.health ? (openBlock(), createBlock("div", {
                            key: 3,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                            createVNode("span", { class: "font-medium text-purple-600" }, "+" + toDisplayString(equippedItem.stats.health), 1)
                          ])) : createCommentVNode("", true),
                          equippedItem.stats.damage ? (openBlock(), createBlock("div", {
                            key: 4,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Dano:"),
                            createVNode("span", { class: "font-medium text-orange-600" }, "+" + toDisplayString(equippedItem.stats.damage), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-3" }, [
                        createVNode(unref(_sfc_main$4), {
                          variant: "secondary",
                          class: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Equipado ")
                          ]),
                          _: 1
                        })
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
        _push(`<!--]--><!--[-->`);
        ssrRenderList(emptySlots.value, (emptySlot) => {
          _push(ssrRenderComponent(unref(_sfc_main$3), {
            key: emptySlot,
            class: "bg-gray-50 dark:bg-gray-800 border-dashed border-2 border-gray-300 dark:border-gray-600"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "flex flex-col items-center justify-center py-8 text-center" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="text-4xl mb-2 opacity-50"${_scopeId2}>${ssrInterpolate(getTypeIcon(emptySlot))}</div><p class="text-gray-500 dark:text-gray-400 text-sm"${_scopeId2}>${ssrInterpolate(getTypeName(emptySlot))} n\xE3o equipado </p>`);
                    } else {
                      return [
                        createVNode("div", { class: "text-4xl mb-2 opacity-50" }, toDisplayString(getTypeIcon(emptySlot)), 1),
                        createVNode("p", { class: "text-gray-500 dark:text-gray-400 text-sm" }, toDisplayString(getTypeName(emptySlot)) + " n\xE3o equipado ", 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$5), { class: "flex flex-col items-center justify-center py-8 text-center" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-4xl mb-2 opacity-50" }, toDisplayString(getTypeIcon(emptySlot)), 1),
                      createVNode("p", { class: "text-gray-500 dark:text-gray-400 text-sm" }, toDisplayString(getTypeName(emptySlot)) + " n\xE3o equipado ", 1)
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
        _push(`<!---->`);
      }
      _push(`<div class="space-y-6"><h2 class="text-2xl font-bold text-black dark:text-white mb-4"> Equipamentos Dispon\xEDveis </h2><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(equipmentTypes.value, (type) => {
        _push(ssrRenderComponent(unref(_sfc_main$6), {
          key: type,
          onClick: ($event) => selectedType.value = type,
          variant: selectedType.value === type ? "default" : "outline",
          size: "sm",
          class: selectedType.value === type ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-500" : "text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(type)}`);
            } else {
              return [
                createTextVNode(toDisplayString(type), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (filteredEquipment.value.length > 0) {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"><!--[-->`);
        ssrRenderList(filteredEquipment.value, (item) => {
          _push(ssrRenderComponent(unref(_sfc_main$3), {
            key: item.id,
            class: [
              "hover:shadow-lg transition-all duration-200",
              item.equipped ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20" : ""
            ]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$1), { class: "text-lg text-gray-900 dark:text-white" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.equipment_name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.equipment_name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<div class="flex items-center space-x-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$4), {
                        variant: item.equipped ? "default" : "secondary"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.equipped ? "Equipado" : "Invent\xE1rio")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.equipped ? "Equipado" : "Invent\xE1rio"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$4), {
                        variant: getTypeBadgeVariant(item.equipment_type)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(getTypeIcon(item.equipment_type))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(getTypeIcon(item.equipment_type)), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(unref(_sfc_main$1), { class: "text-lg text-gray-900 dark:text-white" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.equipment_name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            createVNode(unref(_sfc_main$4), {
                              variant: item.equipped ? "default" : "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.equipped ? "Equipado" : "Invent\xE1rio"), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"]),
                            createVNode(unref(_sfc_main$4), {
                              variant: getTypeBadgeVariant(item.equipment_type)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getTypeIcon(item.equipment_type)), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (item.stats) {
                        _push3(`<div class="space-y-2"${_scopeId2}><h4 class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId2}> B\xF4nus: </h4><div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}>`);
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
                      _push3(ssrRenderComponent(unref(_sfc_main$6), {
                        onClick: ($event) => toggleEquipment(item),
                        disabled: loading.value,
                        class: "w-full",
                        variant: item.equipped ? "destructive" : "default"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.equipped ? "Desequipar" : "Equipar")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.equipped ? "Desequipar" : "Equipar"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        item.stats ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white" }, " B\xF4nus: "),
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
                        createVNode(unref(_sfc_main$6), {
                          onClick: ($event) => toggleEquipment(item),
                          disabled: loading.value,
                          class: "w-full",
                          variant: item.equipped ? "destructive" : "default"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.equipped ? "Desequipar" : "Equipar"), 1)
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
                        createVNode(unref(_sfc_main$1), { class: "text-lg text-gray-900 dark:text-white" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.equipment_name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          createVNode(unref(_sfc_main$4), {
                            variant: item.equipped ? "default" : "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.equipped ? "Equipado" : "Invent\xE1rio"), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant"]),
                          createVNode(unref(_sfc_main$4), {
                            variant: getTypeBadgeVariant(item.equipment_type)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getTypeIcon(item.equipment_type)), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant"])
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                    default: withCtx(() => [
                      item.stats ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2"
                      }, [
                        createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white" }, " B\xF4nus: "),
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
                      createVNode(unref(_sfc_main$6), {
                        onClick: ($event) => toggleEquipment(item),
                        disabled: loading.value,
                        class: "w-full",
                        variant: item.equipped ? "destructive" : "default"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.equipped ? "Desequipar" : "Equipar"), 1)
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
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F4E6}</div><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2"> Nenhum equipamento dispon\xEDvel para equipar </h3><p class="text-gray-600 dark:text-gray-400 mb-6"> Todos os seus equipamentos j\xE1 est\xE3o equipados! Compre mais equipamentos na loja. </p>`);
        _push(ssrRenderComponent(unref(_sfc_main$6), {
          onClick: ($event) => unref(navigateTo)("/loja"),
          variant: "default"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Ir para Loja `);
            } else {
              return [
                createTextVNode(" Ir para Loja ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/equipamentos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=equipamentos-DQ6svnrX.mjs.map
