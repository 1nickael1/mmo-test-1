import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './index-D4e07kgT.mjs';
import { _ as _sfc_main$7 } from './Button-CSVd3JRx.mjs';
import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$6 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$5 } from './CardDescription-DNTQjROL.mjs';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import { u as useCookie } from './cookie-b4_mmrzk.mjs';
import { n as navigateTo } from './server.mjs';
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
  __name: "modo-historia",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const storyChapters = ref([]);
    const loading = ref(false);
    const selectedChapter = ref(null);
    const currentGold = ref(0);
    const getChapterBadgeVariant = (chapter) => {
      if (chapter.is_completed) {
        return "default";
      } else if (chapter.is_locked) {
        return "destructive";
      } else if (chapter.chapter % 5 === 0) {
        return "destructive";
      } else if (chapter.chapter % 3 === 0) {
        return "default";
      } else {
        return "secondary";
      }
    };
    const selectChapter = (chapter) => {
      selectedChapter.value = chapter;
    };
    const startChapterBattle = async (chapter) => {
      var _a;
      if (!characterStore.currentCharacter) return;
      try {
        const token = useCookie("@mmo/ninja/token");
        const battleResponse = await $fetch("/api/story/start-battle", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: {
            character_id: characterStore.currentCharacter.id,
            chapter: chapter.chapter
          }
        });
        if (battleResponse.success && battleResponse.data) {
          await navigateTo("/batalhas");
        }
      } catch (error) {
        alert(((_a = error.data) == null ? void 0 : _a.message) || "Erro ao iniciar batalha do cap\xEDtulo");
      }
      selectedChapter.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Modo Hist\xF3ria </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Viva uma aventura \xE9pica atrav\xE9s de cap\xEDtulos desafiadores </p></div>`);
      if (unref(characterStore).currentCharacter) {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div><h2 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">${ssrInterpolate(unref(characterStore).currentCharacter.name)}</h2><p class="text-gray-700 dark:text-white text-sm md:text-base"> N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</p></div><div class="flex items-center space-x-2"><span class="text-yellow-500">\u{1F4B0}</span><span class="font-semibold text-black dark:text-white text-lg">${ssrInterpolate(currentGold.value)}</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="text-center py-8"><div class="text-lg text-gray-600 dark:text-gray-400"> Carregando cap\xEDtulos... </div></div>`);
      } else {
        _push(`<div class="space-y-6"><h2 class="text-2xl font-bold text-black dark:text-white mb-4"> Cap\xEDtulos da Hist\xF3ria (${ssrInterpolate(storyChapters.value.length)}) </h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"><!--[-->`);
        ssrRenderList(storyChapters.value, (chapter) => {
          _push(ssrRenderComponent(unref(_sfc_main$3), {
            key: chapter.id,
            class: ["transition-all duration-200", [
              chapter.can_play ? "hover:shadow-lg cursor-pointer" : "opacity-60",
              chapter.is_completed ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20" : "",
              chapter.is_locked ? "ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20" : ""
            ]],
            onClick: ($event) => chapter.can_play ? selectChapter(chapter) : null
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
                            _push4(`${ssrInterpolate(chapter.title)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(chapter.title), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<div class="flex items-center space-x-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$4), {
                        variant: getChapterBadgeVariant(chapter),
                        class: "text-gray-900 dark:text-white"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Cap. ${ssrInterpolate(chapter.chapter)}`);
                          } else {
                            return [
                              createTextVNode(" Cap. " + toDisplayString(chapter.chapter), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      if (chapter.is_completed) {
                        _push3(ssrRenderComponent(unref(_sfc_main$4), {
                          variant: "default",
                          class: "bg-green-600 text-white"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` \u2705 Completo `);
                            } else {
                              return [
                                createTextVNode(" \u2705 Completo ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else if (chapter.is_locked) {
                        _push3(ssrRenderComponent(unref(_sfc_main$4), { variant: "destructive" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` \u{1F512} Nv. ${ssrInterpolate(chapter.level_required)}`);
                            } else {
                              return [
                                createTextVNode(" \u{1F512} Nv. " + toDisplayString(chapter.level_required), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(ssrRenderComponent(unref(_sfc_main$4), { variant: "secondary" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` \u25B6\uFE0F Dispon\xEDvel `);
                            } else {
                              return [
                                createTextVNode(" \u25B6\uFE0F Dispon\xEDvel ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      }
                      _push3(`</div></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-gray-700 dark:text-white" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(chapter.description)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(chapter.description), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(unref(_sfc_main$1), { class: "text-lg text-gray-900 dark:text-white" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(chapter.title), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            createVNode(unref(_sfc_main$4), {
                              variant: getChapterBadgeVariant(chapter),
                              class: "text-gray-900 dark:text-white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cap. " + toDisplayString(chapter.chapter), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"]),
                            chapter.is_completed ? (openBlock(), createBlock(unref(_sfc_main$4), {
                              key: 0,
                              variant: "default",
                              class: "bg-green-600 text-white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u2705 Completo ")
                              ]),
                              _: 1
                            })) : chapter.is_locked ? (openBlock(), createBlock(unref(_sfc_main$4), {
                              key: 1,
                              variant: "destructive"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u{1F512} Nv. " + toDisplayString(chapter.level_required), 1)
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$4), {
                              key: 2,
                              variant: "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u25B6\uFE0F Dispon\xEDvel ")
                              ]),
                              _: 1
                            }))
                          ])
                        ]),
                        createVNode(unref(_sfc_main$5), { class: "text-gray-700 dark:text-white" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(chapter.description), 1)
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
                    var _a, _b;
                    if (_push3) {
                      _push3(`<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"${_scopeId2}><h4 class="font-medium text-gray-900 dark:text-white mb-2"${_scopeId2}> Oponente: ${ssrInterpolate(chapter.npc.name)}</h4><div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>N\xEDvel:</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(chapter.npc.level)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Vida:</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(chapter.npc.stats.health)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>For\xE7a:</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(chapter.npc.stats.strength)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Defesa:</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(chapter.npc.stats.defense)}</span></div></div></div><div class="space-y-2"${_scopeId2}><h4 class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId2}> Recompensas: </h4><div class="flex items-center space-x-4 text-sm"${_scopeId2}><div class="flex items-center space-x-1"${_scopeId2}><span class="text-blue-500"${_scopeId2}>\u2B50</span><span class="text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(chapter.rewards.xp)} XP</span></div><div class="flex items-center space-x-1"${_scopeId2}><span class="text-yellow-500"${_scopeId2}>\u{1F4B0}</span><span class="text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(chapter.rewards.gold)} Ouro</span></div>`);
                      if ((_a = chapter.rewards.items) == null ? void 0 : _a.length) {
                        _push3(`<div class="flex items-center space-x-1"${_scopeId2}><span class="text-green-500"${_scopeId2}>\u{1F381}</span><span class="text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(chapter.rewards.items.length)} Itens</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (chapter.rewards.equipment) {
                        _push3(`<div class="flex items-center space-x-1"${_scopeId2}><span class="text-purple-500"${_scopeId2}>\u2694\uFE0F</span><span class="text-gray-900 dark:text-white"${_scopeId2}>Equipamento</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></div><div class="flex items-center justify-between"${_scopeId2}><div class="text-sm text-gray-900 dark:text-white"${_scopeId2}> N\xEDvel necess\xE1rio: ${ssrInterpolate(chapter.level_required)}</div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$7), {
                        disabled: !chapter.can_play,
                        size: "sm",
                        class: chapter.is_completed ? "bg-green-600 text-white" : chapter.is_locked ? "bg-red-600 text-white" : "bg-blue-600 text-white",
                        variant: chapter.is_completed ? "secondary" : chapter.is_locked ? "destructive" : "default"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(chapter.is_completed ? "\u2705 Completo" : chapter.is_locked ? `\u{1F512} Nv. ${chapter.level_required}` : "\u25B6\uFE0F Iniciar Batalha")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(chapter.is_completed ? "\u2705 Completo" : chapter.is_locked ? `\u{1F512} Nv. ${chapter.level_required}` : "\u25B6\uFE0F Iniciar Batalha"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4" }, [
                          createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Oponente: " + toDisplayString(chapter.npc.name), 1),
                          createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                              createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(chapter.npc.level), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                              createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(chapter.npc.stats.health), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                              createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(chapter.npc.stats.strength), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                              createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(chapter.npc.stats.defense), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white" }, " Recompensas: "),
                          createVNode("div", { class: "flex items-center space-x-4 text-sm" }, [
                            createVNode("div", { class: "flex items-center space-x-1" }, [
                              createVNode("span", { class: "text-blue-500" }, "\u2B50"),
                              createVNode("span", { class: "text-gray-900 dark:text-white" }, toDisplayString(chapter.rewards.xp) + " XP", 1)
                            ]),
                            createVNode("div", { class: "flex items-center space-x-1" }, [
                              createVNode("span", { class: "text-yellow-500" }, "\u{1F4B0}"),
                              createVNode("span", { class: "text-gray-900 dark:text-white" }, toDisplayString(chapter.rewards.gold) + " Ouro", 1)
                            ]),
                            ((_b = chapter.rewards.items) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center space-x-1"
                            }, [
                              createVNode("span", { class: "text-green-500" }, "\u{1F381}"),
                              createVNode("span", { class: "text-gray-900 dark:text-white" }, toDisplayString(chapter.rewards.items.length) + " Itens", 1)
                            ])) : createCommentVNode("", true),
                            chapter.rewards.equipment ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex items-center space-x-1"
                            }, [
                              createVNode("span", { class: "text-purple-500" }, "\u2694\uFE0F"),
                              createVNode("span", { class: "text-gray-900 dark:text-white" }, "Equipamento")
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "text-sm text-gray-900 dark:text-white" }, " N\xEDvel necess\xE1rio: " + toDisplayString(chapter.level_required), 1),
                          createVNode(unref(_sfc_main$7), {
                            disabled: !chapter.can_play,
                            size: "sm",
                            class: chapter.is_completed ? "bg-green-600 text-white" : chapter.is_locked ? "bg-red-600 text-white" : "bg-blue-600 text-white",
                            variant: chapter.is_completed ? "secondary" : chapter.is_locked ? "destructive" : "default"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(chapter.is_completed ? "\u2705 Completo" : chapter.is_locked ? `\u{1F512} Nv. ${chapter.level_required}` : "\u25B6\uFE0F Iniciar Batalha"), 1)
                            ]),
                            _: 2
                          }, 1032, ["disabled", "class", "variant"])
                        ])
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
                            createTextVNode(toDisplayString(chapter.title), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          createVNode(unref(_sfc_main$4), {
                            variant: getChapterBadgeVariant(chapter),
                            class: "text-gray-900 dark:text-white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cap. " + toDisplayString(chapter.chapter), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant"]),
                          chapter.is_completed ? (openBlock(), createBlock(unref(_sfc_main$4), {
                            key: 0,
                            variant: "default",
                            class: "bg-green-600 text-white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u2705 Completo ")
                            ]),
                            _: 1
                          })) : chapter.is_locked ? (openBlock(), createBlock(unref(_sfc_main$4), {
                            key: 1,
                            variant: "destructive"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u{1F512} Nv. " + toDisplayString(chapter.level_required), 1)
                            ]),
                            _: 2
                          }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$4), {
                            key: 2,
                            variant: "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u25B6\uFE0F Dispon\xEDvel ")
                            ]),
                            _: 1
                          }))
                        ])
                      ]),
                      createVNode(unref(_sfc_main$5), { class: "text-gray-700 dark:text-white" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(chapter.description), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode("div", { class: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4" }, [
                          createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Oponente: " + toDisplayString(chapter.npc.name), 1),
                          createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                              createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(chapter.npc.level), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                              createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(chapter.npc.stats.health), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                              createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(chapter.npc.stats.strength), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                              createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(chapter.npc.stats.defense), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("h4", { class: "text-sm font-medium text-gray-900 dark:text-white" }, " Recompensas: "),
                          createVNode("div", { class: "flex items-center space-x-4 text-sm" }, [
                            createVNode("div", { class: "flex items-center space-x-1" }, [
                              createVNode("span", { class: "text-blue-500" }, "\u2B50"),
                              createVNode("span", { class: "text-gray-900 dark:text-white" }, toDisplayString(chapter.rewards.xp) + " XP", 1)
                            ]),
                            createVNode("div", { class: "flex items-center space-x-1" }, [
                              createVNode("span", { class: "text-yellow-500" }, "\u{1F4B0}"),
                              createVNode("span", { class: "text-gray-900 dark:text-white" }, toDisplayString(chapter.rewards.gold) + " Ouro", 1)
                            ]),
                            ((_a = chapter.rewards.items) == null ? void 0 : _a.length) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center space-x-1"
                            }, [
                              createVNode("span", { class: "text-green-500" }, "\u{1F381}"),
                              createVNode("span", { class: "text-gray-900 dark:text-white" }, toDisplayString(chapter.rewards.items.length) + " Itens", 1)
                            ])) : createCommentVNode("", true),
                            chapter.rewards.equipment ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex items-center space-x-1"
                            }, [
                              createVNode("span", { class: "text-purple-500" }, "\u2694\uFE0F"),
                              createVNode("span", { class: "text-gray-900 dark:text-white" }, "Equipamento")
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "text-sm text-gray-900 dark:text-white" }, " N\xEDvel necess\xE1rio: " + toDisplayString(chapter.level_required), 1),
                          createVNode(unref(_sfc_main$7), {
                            disabled: !chapter.can_play,
                            size: "sm",
                            class: chapter.is_completed ? "bg-green-600 text-white" : chapter.is_locked ? "bg-red-600 text-white" : "bg-blue-600 text-white",
                            variant: chapter.is_completed ? "secondary" : chapter.is_locked ? "destructive" : "default"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(chapter.is_completed ? "\u2705 Completo" : chapter.is_locked ? `\u{1F512} Nv. ${chapter.level_required}` : "\u25B6\uFE0F Iniciar Batalha"), 1)
                            ]),
                            _: 2
                          }, 1032, ["disabled", "class", "variant"])
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
        _push(`<!--]--></div></div>`);
      }
      if (selectedChapter.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">`);
        _push(ssrRenderComponent(unref(_sfc_main$3), {
          class: "w-full max-w-2xl max-h-[90vh] overflow-y-auto",
          onClick: () => {
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1), { class: "text-2xl text-gray-900 dark:text-white" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(selectedChapter.value.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(selectedChapter.value.title), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      onClick: ($event) => selectedChapter.value = null,
                      variant: "ghost",
                      size: "sm"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` \u2715 `);
                        } else {
                          return [
                            createTextVNode(" \u2715 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-gray-700 dark:text-white" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(selectedChapter.value.description)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(selectedChapter.value.description), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(unref(_sfc_main$1), { class: "text-2xl text-gray-900 dark:text-white" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(selectedChapter.value.title), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          onClick: ($event) => selectedChapter.value = null,
                          variant: "ghost",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" \u2715 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode(unref(_sfc_main$5), { class: "text-gray-700 dark:text-white" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(selectedChapter.value.description), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(`<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"${_scopeId2}><p class="text-gray-700 dark:text-gray-300 leading-relaxed"${_scopeId2}>${ssrInterpolate(selectedChapter.value.story_text)}</p></div><div class="text-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      onClick: ($event) => startChapterBattle(selectedChapter.value),
                      disabled: selectedChapter.value.level_required > (((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.level) || 0),
                      size: "lg",
                      class: "w-full"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b2;
                        if (_push4) {
                          _push4(`${ssrInterpolate(selectedChapter.value.level_required > (((_a2 = unref(characterStore).currentCharacter) == null ? void 0 : _a2.level) || 0) ? "N\xEDvel Insuficiente" : "Iniciar Batalha")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(selectedChapter.value.level_required > (((_b2 = unref(characterStore).currentCharacter) == null ? void 0 : _b2.level) || 0) ? "N\xEDvel Insuficiente" : "Iniciar Batalha"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4" }, [
                        createVNode("p", { class: "text-gray-700 dark:text-gray-300 leading-relaxed" }, toDisplayString(selectedChapter.value.story_text), 1)
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode(unref(_sfc_main$7), {
                          onClick: ($event) => startChapterBattle(selectedChapter.value),
                          disabled: selectedChapter.value.level_required > (((_b = unref(characterStore).currentCharacter) == null ? void 0 : _b.level) || 0),
                          size: "lg",
                          class: "w-full"
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString(selectedChapter.value.level_required > (((_a2 = unref(characterStore).currentCharacter) == null ? void 0 : _a2.level) || 0) ? "N\xEDvel Insuficiente" : "Iniciar Batalha"), 1)
                            ];
                          }),
                          _: 1
                        }, 8, ["onClick", "disabled"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode(unref(_sfc_main$1), { class: "text-2xl text-gray-900 dark:text-white" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(selectedChapter.value.title), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        onClick: ($event) => selectedChapter.value = null,
                        variant: "ghost",
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" \u2715 ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    createVNode(unref(_sfc_main$5), { class: "text-gray-700 dark:text-white" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(selectedChapter.value.description), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$6), { class: "space-y-6" }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode("div", { class: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4" }, [
                        createVNode("p", { class: "text-gray-700 dark:text-gray-300 leading-relaxed" }, toDisplayString(selectedChapter.value.story_text), 1)
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode(unref(_sfc_main$7), {
                          onClick: ($event) => startChapterBattle(selectedChapter.value),
                          disabled: selectedChapter.value.level_required > (((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.level) || 0),
                          size: "lg",
                          class: "w-full"
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString(selectedChapter.value.level_required > (((_a2 = unref(characterStore).currentCharacter) == null ? void 0 : _a2.level) || 0) ? "N\xEDvel Insuficiente" : "Iniciar Batalha"), 1)
                            ];
                          }),
                          _: 1
                        }, 8, ["onClick", "disabled"])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/modo-historia.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=modo-historia-CuxLmbeS.mjs.map
