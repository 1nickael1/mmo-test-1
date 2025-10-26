import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$6 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$4 } from './index-D4e07kgT.mjs';
import { _ as _sfc_main$5 } from './CardDescription-DNTQjROL.mjs';
import { _ as _sfc_main$7 } from './Progress-D2Z_7baA.mjs';
import { _ as _sfc_main$8 } from './Button-CSVd3JRx.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import { u as useRouter, s as storeToRefs } from './server.mjs';
import { u as useCharacterManager } from './useCharacterManager-4e-hc2Oy.mjs';
import { u as useToast } from './useToast-DBrCK-1r.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import 'reka-ui';
import './index-B4_YPG6v.mjs';
import './cookie-b4_mmrzk.mjs';
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
  __name: "selecionar-personagem",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const router = useRouter();
    const { currentCharacter, characters, loading } = storeToRefs(characterStore);
    const { switchCharacter } = useCharacterManager();
    const selectCharacter = async (character) => {
      await switchCharacter(character);
      const { showSuccess } = useToast();
      showSuccess(`Personagem ${character.name} selecionado!`);
      setTimeout(() => {
        router.push("/home");
      }, 1e3);
    };
    const createNewCharacter = () => {
      router.push("/criar-personagem");
    };
    const goToHome = () => {
      router.push("/home");
    };
    const xpForNextLevel = (character) => {
      const xpNeeded = characterStore.getXpForLevel(character.level);
      return xpNeeded - character.xp;
    };
    const getXpProgress = (character) => {
      const currentLevelXp = characterStore.getXpForLevel(character.level - 1);
      const nextLevelXp = characterStore.getXpForLevel(character.level);
      const progress = (character.xp - currentLevelXp) / (nextLevelXp - currentLevelXp) * 100;
      return Math.max(0, Math.min(100, progress));
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = _sfc_main$3;
      const _component_CardHeader = _sfc_main$2;
      const _component_CardTitle = _sfc_main$1;
      const _component_Badge = _sfc_main$4;
      const _component_CardDescription = _sfc_main$5;
      const _component_CardContent = _sfc_main$6;
      const _component_Progress = _sfc_main$7;
      const _component_Button = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Selecionar Personagem </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Escolha qual personagem voc\xEA quer usar </p></div>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8"><div class="text-lg text-gray-600 dark:text-gray-400"> Carregando personagens... </div></div>`);
      } else if (unref(characters).length > 0) {
        _push(`<div class="space-y-6"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"><!--[-->`);
        ssrRenderList(unref(characters), (character) => {
          var _a;
          _push(ssrRenderComponent(_component_Card, {
            key: character.id,
            class: [
              "hover:shadow-lg transition-all duration-200 cursor-pointer",
              ((_a = unref(currentCharacter)) == null ? void 0 : _a.id) === character.id ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20" : "hover:scale-105"
            ],
            onClick: ($event) => selectCharacter(character)
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
                _push2(ssrRenderComponent(_component_CardContent, { class: "space-y-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a2, _b;
                    if (_push3) {
                      _push3(`<div class="grid grid-cols-2 gap-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>For\xE7a:</span><span class="font-medium text-red-600 dark:text-red-400"${_scopeId2}>${ssrInterpolate(character.stats.strength)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Agilidade:</span><span class="font-medium text-blue-600 dark:text-blue-400"${_scopeId2}>${ssrInterpolate(character.stats.agility)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Defesa:</span><span class="font-medium text-green-600 dark:text-green-400"${_scopeId2}>${ssrInterpolate(character.stats.defense)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Vida:</span><span class="font-medium text-purple-600 dark:text-purple-400"${_scopeId2}>${ssrInterpolate(character.stats.health)}/${ssrInterpolate(character.stats.max_health)}</span></div></div><div class="space-y-2"${_scopeId2}><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Progresso XP:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(xpForNextLevel(character))} para pr\xF3ximo n\xEDvel </span></div>`);
                      _push3(ssrRenderComponent(_component_Progress, {
                        value: getXpProgress(character),
                        class: "h-2"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="flex items-center justify-between"${_scopeId2}><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}> Criado em: ${ssrInterpolate(formatDate(character.created_at))}</div>`);
                      if (((_a2 = unref(currentCharacter)) == null ? void 0 : _a2.id) === character.id) {
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
                        createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                            createVNode("span", { class: "font-medium text-red-600 dark:text-red-400" }, toDisplayString(character.stats.strength), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                            createVNode("span", { class: "font-medium text-blue-600 dark:text-blue-400" }, toDisplayString(character.stats.agility), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                            createVNode("span", { class: "font-medium text-green-600 dark:text-green-400" }, toDisplayString(character.stats.defense), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                            createVNode("span", { class: "font-medium text-purple-600 dark:text-purple-400" }, toDisplayString(character.stats.health) + "/" + toDisplayString(character.stats.max_health), 1)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Progresso XP:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(xpForNextLevel(character)) + " para pr\xF3ximo n\xEDvel ", 1)
                          ]),
                          createVNode(_component_Progress, {
                            value: getXpProgress(character),
                            class: "h-2"
                          }, null, 8, ["value"])
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Criado em: " + toDisplayString(formatDate(character.created_at)), 1),
                          ((_b = unref(currentCharacter)) == null ? void 0 : _b.id) === character.id ? (openBlock(), createBlock("div", {
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
                  createVNode(_component_CardContent, { class: "space-y-4" }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "For\xE7a:"),
                            createVNode("span", { class: "font-medium text-red-600 dark:text-red-400" }, toDisplayString(character.stats.strength), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Agilidade:"),
                            createVNode("span", { class: "font-medium text-blue-600 dark:text-blue-400" }, toDisplayString(character.stats.agility), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Defesa:"),
                            createVNode("span", { class: "font-medium text-green-600 dark:text-green-400" }, toDisplayString(character.stats.defense), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Vida:"),
                            createVNode("span", { class: "font-medium text-purple-600 dark:text-purple-400" }, toDisplayString(character.stats.health) + "/" + toDisplayString(character.stats.max_health), 1)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Progresso XP:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(xpForNextLevel(character)) + " para pr\xF3ximo n\xEDvel ", 1)
                          ]),
                          createVNode(_component_Progress, {
                            value: getXpProgress(character),
                            class: "h-2"
                          }, null, 8, ["value"])
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Criado em: " + toDisplayString(formatDate(character.created_at)), 1),
                          ((_a2 = unref(currentCharacter)) == null ? void 0 : _a2.id) === character.id ? (openBlock(), createBlock("div", {
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
        _push(`<!--]--></div><div class="text-center">`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: createNewCharacter,
          variant: "outline",
          size: "lg",
          class: "w-full sm:w-auto"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u2795 Criar Novo Personagem `);
            } else {
              return [
                createTextVNode(" \u2795 Criar Novo Personagem ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="text-center py-12"><div class="space-y-4"><div class="text-6xl">\u{1F3AE}</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white"> Nenhum Personagem Encontrado </h2><p class="text-gray-600 dark:text-gray-400"> Crie seu primeiro personagem para come\xE7ar a aventura! </p>`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: createNewCharacter,
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
        _push(`</div></div>`);
      }
      if (unref(currentCharacter)) {
        _push(`<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100"> Personagem Atual </h3><p class="text-blue-700 dark:text-blue-300">${ssrInterpolate(unref(currentCharacter).name)} - N\xEDvel ${ssrInterpolate(unref(currentCharacter).level)}</p></div>`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: goToHome,
          variant: "outline",
          size: "sm",
          class: "border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Ir para Home `);
            } else {
              return [
                createTextVNode(" Ir para Home ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/selecionar-personagem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=selecionar-personagem-DIjGWaa0.mjs.map
