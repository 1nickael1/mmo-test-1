import { _ as _sfc_main$3, c as _sfc_main$1, a as _sfc_main$2$1, b as _sfc_main$1$1 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$2 } from './index-D4e07kgT.mjs';
import { _ as _sfc_main$4 } from './Button-CSVd3JRx.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import { u as useCharacterManager } from './useCharacterManager-4e-hc2Oy.mjs';
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
import './cookie-b4_mmrzk.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "habilidades",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const loading = ref(false);
    const learning = ref(false);
    const learnedSkills = ref([]);
    const availableSkills = ref([]);
    const skillDescriptions = {
      "Kunai Throw": "Ataque \xE0 dist\xE2ncia com kunais afiadas",
      "Fire Jutsu": "T\xE9cnica de fogo que queima o oponente",
      "Wind Jutsu": "T\xE9cnica de vento que corta como l\xE2mina",
      "Shadow Clone": "Cria clones ilus\xF3rios para confundir o inimigo",
      Chidori: "Ataque el\xE9trico devastador com mil p\xE1ssaros",
      Rasengan: "Esfera de energia concentrada e rotativa",
      "Plasma Shot": "Disparo de plasma energ\xE9tico de alta pot\xEAncia",
      "Energy Shield": "Escudo de energia que absorve dano",
      "Gravity Bomb": "Bomba de gravidade que comprime o espa\xE7o",
      "Quantum Strike": "Ataque qu\xE2ntico que transcende a realidade",
      "Nova Blast": "Explos\xE3o estelar de poder devastador",
      "Black Hole": "Cria um buraco negro tempor\xE1rio no campo de batalha"
    };
    const getSkillDescription = (skillName) => {
      return skillDescriptions[skillName] || "Habilidade especial";
    };
    const loadSkills = async () => {
      if (!characterStore.currentCharacter) return;
      loading.value = true;
      try {
        const learnedResponse = await $fetch(
          `/api/skills/${characterStore.currentCharacter.id}`
        );
        learnedSkills.value = learnedResponse.data || [];
        const availableResponse = await $fetch(
          `/api/skills/available?class=${characterStore.currentCharacter.class}&level=${characterStore.currentCharacter.level}`
        );
        const allSkills = availableResponse.data || [];
        const learnedSkillNames = learnedSkills.value.map(
          (skill) => skill.skill_name
        );
        availableSkills.value = allSkills.map((skill) => {
          var _a, _b;
          const hasLevel = (((_a = characterStore.currentCharacter) == null ? void 0 : _a.level) || 0) >= skill.level_required;
          const hasXp = (((_b = characterStore.currentCharacter) == null ? void 0 : _b.xp) || 0) >= skill.xp_required;
          const isLearned = learnedSkillNames.includes(skill.name);
          return {
            ...skill,
            learned: isLearned,
            can_learn: hasLevel && hasXp && !isLearned
          };
        });
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };
    const learnSkill = async (skillName) => {
      if (!characterStore.currentCharacter) return;
      learning.value = true;
      try {
        const response = await $fetch("/api/skills/learn", {
          method: "POST",
          body: {
            character_id: characterStore.currentCharacter.id,
            skill_name: skillName
          }
        });
        if (response.success) {
          await loadSkills();
          await characterStore.loadCharacters();
        }
      } catch (error) {
      } finally {
        learning.value = false;
      }
    };
    useCharacterManager();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = _sfc_main$3;
      const _component_CardContent = _sfc_main$1;
      const _component_Badge = _sfc_main$2;
      const _component_CardHeader = _sfc_main$2$1;
      const _component_CardTitle = _sfc_main$1$1;
      const _component_Button = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Habilidades </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Desenvolva novas t\xE9cnicas e jutsus para seu personagem </p></div>`);
      if (unref(characterStore).currentCharacter) {
        _push(`<div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_Card, { class: "w-full max-w-md" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardContent, { class: "p-4 md:p-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-center"${_scopeId2}><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.name)}</h2><div class="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4"${_scopeId2}>`);
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
                    _push3(`<span${_scopeId2}>N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</span><span${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.xp)} XP</span></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, toDisplayString(unref(characterStore).currentCharacter.name), 1),
                        createVNode("div", { class: "flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4" }, [
                          createVNode(_component_Badge, {
                            variant: unref(characterStore).currentCharacter.class === "ninja" ? "default" : "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(characterStore).currentCharacter.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro"), 1)
                            ]),
                            _: 1
                          }, 8, ["variant"]),
                          createVNode("span", null, "N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1),
                          createVNode("span", null, toDisplayString(unref(characterStore).currentCharacter.xp) + " XP", 1)
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
                      createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, toDisplayString(unref(characterStore).currentCharacter.name), 1),
                      createVNode("div", { class: "flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4" }, [
                        createVNode(_component_Badge, {
                          variant: unref(characterStore).currentCharacter.class === "ninja" ? "default" : "secondary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(characterStore).currentCharacter.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro"), 1)
                          ]),
                          _: 1
                        }, 8, ["variant"]),
                        createVNode("span", null, "N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1),
                        createVNode("span", null, toDisplayString(unref(characterStore).currentCharacter.xp) + " XP", 1)
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
        _push(`<div class="text-center py-8"><div class="text-lg text-gray-600 dark:text-gray-400"> Carregando habilidades... </div></div>`);
      } else {
        _push(`<div class="space-y-8">`);
        if (learnedSkills.value.length > 0) {
          _push(`<div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Habilidades Aprendidas </h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
          ssrRenderList(learnedSkills.value, (skill) => {
            _push(ssrRenderComponent(_component_Card, {
              key: skill.id,
              class: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<span class="text-green-600 dark:text-green-400"${_scopeId3}>\u2705</span> ${ssrInterpolate(skill.skill_name)}`);
                            } else {
                              return [
                                createVNode("span", { class: "text-green-600 dark:text-green-400" }, "\u2705"),
                                createTextVNode(" " + toDisplayString(skill.skill_name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-green-600 dark:text-green-400" }, "\u2705"),
                              createTextVNode(" " + toDisplayString(skill.skill_name), 1)
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
                        _push3(`<div class="space-y-2"${_scopeId2}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(skill.description || getSkillDescription(skill.skill_name))}</p><div class="flex items-center justify-between text-sm"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>N\xEDvel:</span>`);
                        _push3(ssrRenderComponent(_component_Badge, { variant: "secondary" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(skill.level)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(skill.level), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(skill.description || getSkillDescription(skill.skill_name)), 1),
                            createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                              createVNode(_component_Badge, { variant: "secondary" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(skill.level), 1)
                                ]),
                                _: 2
                              }, 1024)
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
                            createVNode("span", { class: "text-green-600 dark:text-green-400" }, "\u2705"),
                            createTextVNode(" " + toDisplayString(skill.skill_name), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_CardContent, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(skill.description || getSkillDescription(skill.skill_name)), 1),
                          createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel:"),
                            createVNode(_component_Badge, { variant: "secondary" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(skill.level), 1)
                              ]),
                              _: 2
                            }, 1024)
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
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Habilidades Dispon\xEDveis </h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(availableSkills.value, (skill) => {
          _push(ssrRenderComponent(_component_Card, {
            key: skill.name,
            class: [
              "transition-all duration-200",
              skill.can_learn ? "hover:shadow-lg cursor-pointer" : "opacity-60"
            ],
            onClick: ($event) => skill.can_learn ? learnSkill(skill.name) : null
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_CardTitle, { class: "text-lg flex items-center gap-2" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (skill.learned) {
                              _push4(`<span class="text-green-600 dark:text-green-400"${_scopeId3}>\u2705</span>`);
                            } else if (skill.can_learn) {
                              _push4(`<span class="text-blue-600 dark:text-blue-400"${_scopeId3}>\u{1F3AF}</span>`);
                            } else {
                              _push4(`<span class="text-gray-400"${_scopeId3}>\u{1F512}</span>`);
                            }
                            _push4(` ${ssrInterpolate(skill.name)}`);
                          } else {
                            return [
                              skill.learned ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-green-600 dark:text-green-400"
                              }, "\u2705")) : skill.can_learn ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-blue-600 dark:text-blue-400"
                              }, "\u{1F3AF}")) : (openBlock(), createBlock("span", {
                                key: 2,
                                class: "text-gray-400"
                              }, "\u{1F512}")),
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
                            skill.learned ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-green-600 dark:text-green-400"
                            }, "\u2705")) : skill.can_learn ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-blue-600 dark:text-blue-400"
                            }, "\u{1F3AF}")) : (openBlock(), createBlock("span", {
                              key: 2,
                              class: "text-gray-400"
                            }, "\u{1F512}")),
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
                    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
                    if (_push3) {
                      _push3(`<div class="space-y-3"${_scopeId2}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(skill.description)}</p><div class="space-y-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Custo:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(skill.cost)} \u{1FA99}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>XP necess\xE1rio:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(skill.xp_required)} XP</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>N\xEDvel necess\xE1rio:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(skill.level_required)}</span></div></div><div class="space-y-1 text-xs"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><span class="${ssrRenderClass(
                        (((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.level) || 0) >= skill.level_required ? "text-green-600" : "text-red-600"
                      )}"${_scopeId2}>${ssrInterpolate((((_b = unref(characterStore).currentCharacter) == null ? void 0 : _b.level) || 0) >= skill.level_required ? "\u2705" : "\u274C")}</span><span class="${ssrRenderClass(
                        (((_c = unref(characterStore).currentCharacter) == null ? void 0 : _c.level) || 0) >= skill.level_required ? "text-green-600" : "text-red-600"
                      )}"${_scopeId2}> N\xEDvel ${ssrInterpolate(skill.level_required)}</span></div><div class="flex items-center gap-2"${_scopeId2}><span class="${ssrRenderClass(
                        (((_d = unref(characterStore).currentCharacter) == null ? void 0 : _d.xp) || 0) >= skill.xp_required ? "text-green-600" : "text-red-600"
                      )}"${_scopeId2}>${ssrInterpolate((((_e = unref(characterStore).currentCharacter) == null ? void 0 : _e.xp) || 0) >= skill.xp_required ? "\u2705" : "\u274C")}</span><span class="${ssrRenderClass(
                        (((_f = unref(characterStore).currentCharacter) == null ? void 0 : _f.xp) || 0) >= skill.xp_required ? "text-green-600" : "text-red-600"
                      )}"${_scopeId2}>${ssrInterpolate(skill.xp_required)} XP </span></div></div>`);
                      if (skill.can_learn) {
                        _push3(ssrRenderComponent(_component_Button, {
                          onClick: ($event) => learnSkill(skill.name),
                          disabled: learning.value,
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(learning.value ? "Aprendendo..." : "Aprender")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(learning.value ? "Aprendendo..." : "Aprender"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else if (skill.learned) {
                        _push3(ssrRenderComponent(_component_Button, {
                          disabled: "",
                          variant: "outline",
                          class: "w-full"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` J\xE1 Aprendida `);
                            } else {
                              return [
                                createTextVNode(" J\xE1 Aprendida ")
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
                              _push4(` Requisitos n\xE3o atendidos `);
                            } else {
                              return [
                                createTextVNode(" Requisitos n\xE3o atendidos ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      }
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(skill.description), 1),
                          createVNode("div", { class: "space-y-2 text-sm" }, [
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Custo:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(skill.cost) + " \u{1FA99}", 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "XP necess\xE1rio:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(skill.xp_required) + " XP", 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel necess\xE1rio:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(skill.level_required), 1)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-1 text-xs" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", {
                                class: (((_g = unref(characterStore).currentCharacter) == null ? void 0 : _g.level) || 0) >= skill.level_required ? "text-green-600" : "text-red-600"
                              }, toDisplayString((((_h = unref(characterStore).currentCharacter) == null ? void 0 : _h.level) || 0) >= skill.level_required ? "\u2705" : "\u274C"), 3),
                              createVNode("span", {
                                class: (((_i = unref(characterStore).currentCharacter) == null ? void 0 : _i.level) || 0) >= skill.level_required ? "text-green-600" : "text-red-600"
                              }, " N\xEDvel " + toDisplayString(skill.level_required), 3)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", {
                                class: (((_j = unref(characterStore).currentCharacter) == null ? void 0 : _j.xp) || 0) >= skill.xp_required ? "text-green-600" : "text-red-600"
                              }, toDisplayString((((_k = unref(characterStore).currentCharacter) == null ? void 0 : _k.xp) || 0) >= skill.xp_required ? "\u2705" : "\u274C"), 3),
                              createVNode("span", {
                                class: (((_l = unref(characterStore).currentCharacter) == null ? void 0 : _l.xp) || 0) >= skill.xp_required ? "text-green-600" : "text-red-600"
                              }, toDisplayString(skill.xp_required) + " XP ", 3)
                            ])
                          ]),
                          skill.can_learn ? (openBlock(), createBlock(_component_Button, {
                            key: 0,
                            onClick: withModifiers(($event) => learnSkill(skill.name), ["stop"]),
                            disabled: learning.value,
                            class: "w-full"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(learning.value ? "Aprendendo..." : "Aprender"), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"])) : skill.learned ? (openBlock(), createBlock(_component_Button, {
                            key: 1,
                            disabled: "",
                            variant: "outline",
                            class: "w-full"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" J\xE1 Aprendida ")
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(_component_Button, {
                            key: 2,
                            disabled: "",
                            variant: "outline",
                            class: "w-full"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Requisitos n\xE3o atendidos ")
                            ]),
                            _: 1
                          }))
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
                          skill.learned ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-green-600 dark:text-green-400"
                          }, "\u2705")) : skill.can_learn ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-blue-600 dark:text-blue-400"
                          }, "\u{1F3AF}")) : (openBlock(), createBlock("span", {
                            key: 2,
                            class: "text-gray-400"
                          }, "\u{1F512}")),
                          createTextVNode(" " + toDisplayString(skill.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_CardContent, null, {
                    default: withCtx(() => {
                      var _a, _b, _c, _d, _e, _f;
                      return [
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(skill.description), 1),
                          createVNode("div", { class: "space-y-2 text-sm" }, [
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Custo:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(skill.cost) + " \u{1FA99}", 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "XP necess\xE1rio:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(skill.xp_required) + " XP", 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "N\xEDvel necess\xE1rio:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(skill.level_required), 1)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-1 text-xs" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", {
                                class: (((_a = unref(characterStore).currentCharacter) == null ? void 0 : _a.level) || 0) >= skill.level_required ? "text-green-600" : "text-red-600"
                              }, toDisplayString((((_b = unref(characterStore).currentCharacter) == null ? void 0 : _b.level) || 0) >= skill.level_required ? "\u2705" : "\u274C"), 3),
                              createVNode("span", {
                                class: (((_c = unref(characterStore).currentCharacter) == null ? void 0 : _c.level) || 0) >= skill.level_required ? "text-green-600" : "text-red-600"
                              }, " N\xEDvel " + toDisplayString(skill.level_required), 3)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", {
                                class: (((_d = unref(characterStore).currentCharacter) == null ? void 0 : _d.xp) || 0) >= skill.xp_required ? "text-green-600" : "text-red-600"
                              }, toDisplayString((((_e = unref(characterStore).currentCharacter) == null ? void 0 : _e.xp) || 0) >= skill.xp_required ? "\u2705" : "\u274C"), 3),
                              createVNode("span", {
                                class: (((_f = unref(characterStore).currentCharacter) == null ? void 0 : _f.xp) || 0) >= skill.xp_required ? "text-green-600" : "text-red-600"
                              }, toDisplayString(skill.xp_required) + " XP ", 3)
                            ])
                          ]),
                          skill.can_learn ? (openBlock(), createBlock(_component_Button, {
                            key: 0,
                            onClick: withModifiers(($event) => learnSkill(skill.name), ["stop"]),
                            disabled: learning.value,
                            class: "w-full"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(learning.value ? "Aprendendo..." : "Aprender"), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"])) : skill.learned ? (openBlock(), createBlock(_component_Button, {
                            key: 1,
                            disabled: "",
                            variant: "outline",
                            class: "w-full"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" J\xE1 Aprendida ")
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(_component_Button, {
                            key: 2,
                            disabled: "",
                            variant: "outline",
                            class: "w-full"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Requisitos n\xE3o atendidos ")
                            ]),
                            _: 1
                          }))
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
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/habilidades.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=habilidades-b6_sG02W.mjs.map
