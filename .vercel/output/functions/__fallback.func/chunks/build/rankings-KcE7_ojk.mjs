import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, unref, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, TabsRoot, TabsList, useForwardProps, TabsTrigger, TabsContent } from 'reka-ui';
import { c as cn } from './utils-H80jjgLf.mjs';
import { r as reactiveOmit } from './index-B4_YPG6v.mjs';
import { _ as _sfc_main$3$1, a as _sfc_main$2$1, b as _sfc_main$1$1, c as _sfc_main$6 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$5 } from './CardDescription-DNTQjROL.mjs';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import 'clsx';
import 'tailwind-merge';
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

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    orientation: {},
    dir: {},
    activationMode: {},
    modelValue: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsRoot), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/Tabs.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TabsList",
  __ssrInlineRender: true,
  props: {
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsList), mergeProps(unref(delegatedProps), {
        class: unref(cn)(
          "inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsList.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TabsTrigger",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsTrigger), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="truncate"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "truncate" }, [
                renderSlot(_ctx.$slots, "default")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsTrigger.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TabsContent",
  __ssrInlineRender: true,
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsContent), mergeProps({
        class: unref(cn)(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          props.class
        )
      }, unref(delegatedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsContent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "rankings",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const activeTab = ref("level");
    const levelRanking = ref([
      { id: 1, name: "NarutoUzumaki", class: "ninja", level: 15, xp: 45e3 },
      { id: 2, name: "SasukeUchiha", class: "ninja", level: 14, xp: 42e3 },
      {
        id: 3,
        name: "SpaceWarrior99",
        class: "guerreiro_espacial",
        level: 13,
        xp: 38e3
      },
      { id: 4, name: "NinjaMaster", class: "ninja", level: 12, xp: 35e3 },
      {
        id: 5,
        name: "GalaxyHero",
        class: "guerreiro_espacial",
        level: 11,
        xp: 32e3
      },
      { id: 6, name: "ShadowStrike", class: "ninja", level: 10, xp: 28e3 },
      {
        id: 7,
        name: "CosmicGuardian",
        class: "guerreiro_espacial",
        level: 9,
        xp: 25e3
      },
      { id: 8, name: "WindJutsu", class: "ninja", level: 8, xp: 22e3 },
      {
        id: 9,
        name: "StarFighter",
        class: "guerreiro_espacial",
        level: 7,
        xp: 18e3
      },
      { id: 10, name: "FireNinja", class: "ninja", level: 6, xp: 15e3 }
    ]);
    const battleRanking = ref([
      {
        id: 1,
        name: "NarutoUzumaki",
        class: "ninja",
        battles_won: 127,
        total_battles: 135
      },
      {
        id: 2,
        name: "SasukeUchiha",
        class: "ninja",
        battles_won: 115,
        total_battles: 120
      },
      {
        id: 3,
        name: "SpaceWarrior99",
        class: "guerreiro_espacial",
        battles_won: 98,
        total_battles: 105
      },
      {
        id: 4,
        name: "NinjaMaster",
        class: "ninja",
        battles_won: 87,
        total_battles: 95
      },
      {
        id: 5,
        name: "GalaxyHero",
        class: "guerreiro_espacial",
        battles_won: 76,
        total_battles: 85
      },
      {
        id: 6,
        name: "ShadowStrike",
        class: "ninja",
        battles_won: 65,
        total_battles: 72
      },
      {
        id: 7,
        name: "CosmicGuardian",
        class: "guerreiro_espacial",
        battles_won: 54,
        total_battles: 60
      },
      {
        id: 8,
        name: "WindJutsu",
        class: "ninja",
        battles_won: 43,
        total_battles: 48
      },
      {
        id: 9,
        name: "StarFighter",
        class: "guerreiro_espacial",
        battles_won: 32,
        total_battles: 38
      },
      {
        id: 10,
        name: "FireNinja",
        class: "ninja",
        battles_won: 21,
        total_battles: 25
      }
    ]);
    const skillRanking = ref([
      {
        id: 1,
        name: "NarutoUzumaki",
        class: "ninja",
        skills_learned: 8,
        level: 15
      },
      { id: 2, name: "SasukeUchiha", class: "ninja", skills_learned: 7, level: 14 },
      {
        id: 3,
        name: "SpaceWarrior99",
        class: "guerreiro_espacial",
        skills_learned: 6,
        level: 13
      },
      { id: 4, name: "NinjaMaster", class: "ninja", skills_learned: 5, level: 12 },
      {
        id: 5,
        name: "GalaxyHero",
        class: "guerreiro_espacial",
        skills_learned: 4,
        level: 11
      },
      { id: 6, name: "ShadowStrike", class: "ninja", skills_learned: 3, level: 10 },
      {
        id: 7,
        name: "CosmicGuardian",
        class: "guerreiro_espacial",
        skills_learned: 3,
        level: 9
      },
      { id: 8, name: "WindJutsu", class: "ninja", skills_learned: 2, level: 8 },
      {
        id: 9,
        name: "StarFighter",
        class: "guerreiro_espacial",
        skills_learned: 2,
        level: 7
      },
      { id: 10, name: "FireNinja", class: "ninja", skills_learned: 1, level: 6 }
    ]);
    const resourceRanking = ref([
      {
        id: 1,
        name: "NarutoUzumaki",
        class: "ninja",
        total_resources: 125e3,
        gold: 85e3
      },
      {
        id: 2,
        name: "SasukeUchiha",
        class: "ninja",
        total_resources: 98e3,
        gold: 65e3
      },
      {
        id: 3,
        name: "SpaceWarrior99",
        class: "guerreiro_espacial",
        total_resources: 87e3,
        gold: 58e3
      },
      {
        id: 4,
        name: "NinjaMaster",
        class: "ninja",
        total_resources: 72e3,
        gold: 48e3
      },
      {
        id: 5,
        name: "GalaxyHero",
        class: "guerreiro_espacial",
        total_resources: 65e3,
        gold: 42e3
      },
      {
        id: 6,
        name: "ShadowStrike",
        class: "ninja",
        total_resources: 54e3,
        gold: 35e3
      },
      {
        id: 7,
        name: "CosmicGuardian",
        class: "guerreiro_espacial",
        total_resources: 43e3,
        gold: 28e3
      },
      {
        id: 8,
        name: "WindJutsu",
        class: "ninja",
        total_resources: 32e3,
        gold: 21e3
      },
      {
        id: 9,
        name: "StarFighter",
        class: "guerreiro_espacial",
        total_resources: 21e3,
        gold: 14e3
      },
      {
        id: 10,
        name: "FireNinja",
        class: "ninja",
        total_resources: 15e3,
        gold: 1e4
      }
    ]);
    const getRankColor = (index) => {
      switch (index) {
        case 0:
          return "bg-yellow-500 text-white";
        case 1:
          return "bg-gray-400 text-white";
        case 2:
          return "bg-orange-600 text-white";
        default:
          return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      }
    };
    const getRankIcon = (index) => {
      switch (index) {
        case 0:
          return "\u{1F947}";
        case 1:
          return "\u{1F948}";
        case 2:
          return "\u{1F949}";
        default:
          return "\u{1F3C5}";
      }
    };
    const getPlayerRank = (type) => {
      if (!characterStore.currentCharacter) return "N/A";
      const player = characterStore.currentCharacter;
      switch (type) {
        case "level":
          return levelRanking.value.findIndex((p) => p.level <= player.level) + 1 || levelRanking.value.length + 1;
        case "battles":
          return battleRanking.value.findIndex((p) => p.battles_won <= 0) + 1 || battleRanking.value.length + 1;
        case "skills":
          return skillRanking.value.findIndex((p) => p.skills_learned <= 0) + 1 || skillRanking.value.length + 1;
        case "resources":
          return resourceRanking.value.findIndex((p) => p.total_resources <= 1e3) + 1 || resourceRanking.value.length + 1;
        default:
          return "N/A";
      }
    };
    const getPlayerBattles = () => {
      return characterStore.currentCharacter ? Math.floor(characterStore.currentCharacter.level * 2.5) : 0;
    };
    const getPlayerSkills = () => {
      return characterStore.currentCharacter ? Math.min(6, Math.floor(characterStore.currentCharacter.level / 2)) : 0;
    };
    const getPlayerResources = () => {
      return characterStore.currentCharacter ? characterStore.currentCharacter.level * 1e3 : 0;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tabs = _sfc_main$4;
      const _component_TabsList = _sfc_main$3;
      const _component_TabsTrigger = _sfc_main$2;
      const _component_TabsContent = _sfc_main$1;
      const _component_Card = _sfc_main$3$1;
      const _component_CardHeader = _sfc_main$2$1;
      const _component_CardTitle = _sfc_main$1$1;
      const _component_CardDescription = _sfc_main$5;
      const _component_CardContent = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"> Rankings </h1><p class="text-gray-600 dark:text-gray-400 text-sm md:text-base"> Veja os melhores jogadores da gal\xE1xia </p></div><div class="flex justify-center">`);
      _push(ssrRenderComponent(_component_Tabs, {
        modelValue: activeTab.value,
        "onUpdate:modelValue": ($event) => activeTab.value = $event,
        class: "w-full max-w-4xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TabsList, { class: "grid w-full grid-cols-2 sm:grid-cols-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_TabsTrigger, { value: "level" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`N\xEDvel`);
                      } else {
                        return [
                          createTextVNode("N\xEDvel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TabsTrigger, { value: "battles" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Batalhas`);
                      } else {
                        return [
                          createTextVNode("Batalhas")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TabsTrigger, { value: "skills" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Habilidades`);
                      } else {
                        return [
                          createTextVNode("Habilidades")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TabsTrigger, { value: "resources" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Recursos`);
                      } else {
                        return [
                          createTextVNode("Recursos")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_TabsTrigger, { value: "level" }, {
                      default: withCtx(() => [
                        createTextVNode("N\xEDvel")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsTrigger, { value: "battles" }, {
                      default: withCtx(() => [
                        createTextVNode("Batalhas")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsTrigger, { value: "skills" }, {
                      default: withCtx(() => [
                        createTextVNode("Habilidades")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsTrigger, { value: "resources" }, {
                      default: withCtx(() => [
                        createTextVNode("Recursos")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TabsContent, {
              value: "level",
              class: "space-y-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Card, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` \u{1F3C6} Ranking por N\xEDvel `);
                                  } else {
                                    return [
                                      createTextVNode(" \u{1F3C6} Ranking por N\xEDvel ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Os jogadores com maior n\xEDvel `);
                                  } else {
                                    return [
                                      createTextVNode(" Os jogadores com maior n\xEDvel ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" \u{1F3C6} Ranking por N\xEDvel ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Os jogadores com maior n\xEDvel ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_CardContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="space-y-3"${_scopeId4}><!--[-->`);
                              ssrRenderList(levelRanking.value, (player, index) => {
                                _push5(`<div class="${ssrRenderClass([
                                  index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20" : "bg-gray-50 dark:bg-gray-800",
                                  "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg"
                                ])}"${_scopeId4}><div class="flex items-center gap-3"${_scopeId4}><div class="${ssrRenderClass([getRankColor(index), "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"])}"${_scopeId4}>${ssrInterpolate(index + 1)}</div><div class="text-2xl"${_scopeId4}>${ssrInterpolate(getRankIcon(index))}</div></div><div class="flex-1"${_scopeId4}><div class="font-semibold text-gray-900 dark:text-white"${_scopeId4}>${ssrInterpolate(player.name)}</div><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId4}>${ssrInterpolate(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial")}</div></div><div class="text-right"${_scopeId4}><div class="font-bold text-lg text-blue-600 dark:text-blue-400"${_scopeId4}> N\xEDvel ${ssrInterpolate(player.level)}</div><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId4}>${ssrInterpolate(player.xp.toLocaleString())} XP </div></div></div>`);
                              });
                              _push5(`<!--]--></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "space-y-3" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(levelRanking.value, (player, index) => {
                                    return openBlock(), createBlock("div", {
                                      key: player.id,
                                      class: [
                                        "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                        index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20" : "bg-gray-50 dark:bg-gray-800"
                                      ]
                                    }, [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("div", {
                                          class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                        }, toDisplayString(index + 1), 3),
                                        createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                      ]),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                      ]),
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode("div", { class: "font-bold text-lg text-blue-600 dark:text-blue-400" }, " N\xEDvel " + toDisplayString(player.level), 1),
                                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.xp.toLocaleString()) + " XP ", 1)
                                      ])
                                    ], 2);
                                  }), 128))
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u{1F3C6} Ranking por N\xEDvel ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Os jogadores com maior n\xEDvel ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CardContent, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-3" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(levelRanking.value, (player, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: player.id,
                                    class: [
                                      "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                      index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20" : "bg-gray-50 dark:bg-gray-800"
                                    ]
                                  }, [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("div", {
                                        class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                      }, toDisplayString(index + 1), 3),
                                      createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                    ]),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                      createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                    ]),
                                    createVNode("div", { class: "text-right" }, [
                                      createVNode("div", { class: "font-bold text-lg text-blue-600 dark:text-blue-400" }, " N\xEDvel " + toDisplayString(player.level), 1),
                                      createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.xp.toLocaleString()) + " XP ", 1)
                                    ])
                                  ], 2);
                                }), 128))
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Card, null, {
                      default: withCtx(() => [
                        createVNode(_component_CardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" \u{1F3C6} Ranking por N\xEDvel ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" Os jogadores com maior n\xEDvel ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_CardContent, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(levelRanking.value, (player, index) => {
                                return openBlock(), createBlock("div", {
                                  key: player.id,
                                  class: [
                                    "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                    index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20" : "bg-gray-50 dark:bg-gray-800"
                                  ]
                                }, [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("div", {
                                      class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                    }, toDisplayString(index + 1), 3),
                                    createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                  ]),
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                    createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                  ]),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("div", { class: "font-bold text-lg text-blue-600 dark:text-blue-400" }, " N\xEDvel " + toDisplayString(player.level), 1),
                                    createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.xp.toLocaleString()) + " XP ", 1)
                                  ])
                                ], 2);
                              }), 128))
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TabsContent, {
              value: "battles",
              class: "space-y-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Card, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` \u2694\uFE0F Ranking de Batalhas `);
                                  } else {
                                    return [
                                      createTextVNode(" \u2694\uFE0F Ranking de Batalhas ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Os guerreiros mais vitoriosos `);
                                  } else {
                                    return [
                                      createTextVNode(" Os guerreiros mais vitoriosos ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" \u2694\uFE0F Ranking de Batalhas ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Os guerreiros mais vitoriosos ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_CardContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="space-y-3"${_scopeId4}><!--[-->`);
                              ssrRenderList(battleRanking.value, (player, index) => {
                                _push5(`<div class="${ssrRenderClass([
                                  index < 3 ? "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" : "bg-gray-50 dark:bg-gray-800",
                                  "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg"
                                ])}"${_scopeId4}><div class="flex items-center gap-3"${_scopeId4}><div class="${ssrRenderClass([getRankColor(index), "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"])}"${_scopeId4}>${ssrInterpolate(index + 1)}</div><div class="text-2xl"${_scopeId4}>${ssrInterpolate(getRankIcon(index))}</div></div><div class="flex-1"${_scopeId4}><div class="font-semibold text-gray-900 dark:text-white"${_scopeId4}>${ssrInterpolate(player.name)}</div><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId4}>${ssrInterpolate(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial")}</div></div><div class="text-right"${_scopeId4}><div class="font-bold text-lg text-red-600 dark:text-red-400"${_scopeId4}>${ssrInterpolate(player.battles_won)} vit\xF3rias </div><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId4}>${ssrInterpolate(player.total_battles)} batalhas </div></div></div>`);
                              });
                              _push5(`<!--]--></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "space-y-3" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(battleRanking.value, (player, index) => {
                                    return openBlock(), createBlock("div", {
                                      key: player.id,
                                      class: [
                                        "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                        index < 3 ? "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" : "bg-gray-50 dark:bg-gray-800"
                                      ]
                                    }, [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("div", {
                                          class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                        }, toDisplayString(index + 1), 3),
                                        createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                      ]),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                      ]),
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode("div", { class: "font-bold text-lg text-red-600 dark:text-red-400" }, toDisplayString(player.battles_won) + " vit\xF3rias ", 1),
                                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.total_battles) + " batalhas ", 1)
                                      ])
                                    ], 2);
                                  }), 128))
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u2694\uFE0F Ranking de Batalhas ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Os guerreiros mais vitoriosos ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CardContent, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-3" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(battleRanking.value, (player, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: player.id,
                                    class: [
                                      "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                      index < 3 ? "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" : "bg-gray-50 dark:bg-gray-800"
                                    ]
                                  }, [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("div", {
                                        class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                      }, toDisplayString(index + 1), 3),
                                      createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                    ]),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                      createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                    ]),
                                    createVNode("div", { class: "text-right" }, [
                                      createVNode("div", { class: "font-bold text-lg text-red-600 dark:text-red-400" }, toDisplayString(player.battles_won) + " vit\xF3rias ", 1),
                                      createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.total_battles) + " batalhas ", 1)
                                    ])
                                  ], 2);
                                }), 128))
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Card, null, {
                      default: withCtx(() => [
                        createVNode(_component_CardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" \u2694\uFE0F Ranking de Batalhas ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" Os guerreiros mais vitoriosos ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_CardContent, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(battleRanking.value, (player, index) => {
                                return openBlock(), createBlock("div", {
                                  key: player.id,
                                  class: [
                                    "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                    index < 3 ? "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" : "bg-gray-50 dark:bg-gray-800"
                                  ]
                                }, [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("div", {
                                      class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                    }, toDisplayString(index + 1), 3),
                                    createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                  ]),
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                    createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                  ]),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("div", { class: "font-bold text-lg text-red-600 dark:text-red-400" }, toDisplayString(player.battles_won) + " vit\xF3rias ", 1),
                                    createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.total_battles) + " batalhas ", 1)
                                  ])
                                ], 2);
                              }), 128))
                            ])
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TabsContent, {
              value: "skills",
              class: "space-y-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Card, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` \u{1F3AF} Ranking de Habilidades `);
                                  } else {
                                    return [
                                      createTextVNode(" \u{1F3AF} Ranking de Habilidades ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Os mestres das artes ninja `);
                                  } else {
                                    return [
                                      createTextVNode(" Os mestres das artes ninja ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" \u{1F3AF} Ranking de Habilidades ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Os mestres das artes ninja ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_CardContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="space-y-3"${_scopeId4}><!--[-->`);
                              ssrRenderList(skillRanking.value, (player, index) => {
                                _push5(`<div class="${ssrRenderClass([
                                  index < 3 ? "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20" : "bg-gray-50 dark:bg-gray-800",
                                  "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg"
                                ])}"${_scopeId4}><div class="flex items-center gap-3"${_scopeId4}><div class="${ssrRenderClass([getRankColor(index), "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"])}"${_scopeId4}>${ssrInterpolate(index + 1)}</div><div class="text-2xl"${_scopeId4}>${ssrInterpolate(getRankIcon(index))}</div></div><div class="flex-1"${_scopeId4}><div class="font-semibold text-gray-900 dark:text-white"${_scopeId4}>${ssrInterpolate(player.name)}</div><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId4}>${ssrInterpolate(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial")}</div></div><div class="text-right"${_scopeId4}><div class="font-bold text-lg text-purple-600 dark:text-purple-400"${_scopeId4}>${ssrInterpolate(player.skills_learned)} habilidades </div><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId4}> N\xEDvel ${ssrInterpolate(player.level)}</div></div></div>`);
                              });
                              _push5(`<!--]--></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "space-y-3" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(skillRanking.value, (player, index) => {
                                    return openBlock(), createBlock("div", {
                                      key: player.id,
                                      class: [
                                        "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                        index < 3 ? "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20" : "bg-gray-50 dark:bg-gray-800"
                                      ]
                                    }, [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("div", {
                                          class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                        }, toDisplayString(index + 1), 3),
                                        createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                      ]),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                      ]),
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode("div", { class: "font-bold text-lg text-purple-600 dark:text-purple-400" }, toDisplayString(player.skills_learned) + " habilidades ", 1),
                                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " N\xEDvel " + toDisplayString(player.level), 1)
                                      ])
                                    ], 2);
                                  }), 128))
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u{1F3AF} Ranking de Habilidades ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Os mestres das artes ninja ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CardContent, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-3" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(skillRanking.value, (player, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: player.id,
                                    class: [
                                      "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                      index < 3 ? "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20" : "bg-gray-50 dark:bg-gray-800"
                                    ]
                                  }, [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("div", {
                                        class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                      }, toDisplayString(index + 1), 3),
                                      createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                    ]),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                      createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                    ]),
                                    createVNode("div", { class: "text-right" }, [
                                      createVNode("div", { class: "font-bold text-lg text-purple-600 dark:text-purple-400" }, toDisplayString(player.skills_learned) + " habilidades ", 1),
                                      createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " N\xEDvel " + toDisplayString(player.level), 1)
                                    ])
                                  ], 2);
                                }), 128))
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Card, null, {
                      default: withCtx(() => [
                        createVNode(_component_CardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" \u{1F3AF} Ranking de Habilidades ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" Os mestres das artes ninja ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_CardContent, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(skillRanking.value, (player, index) => {
                                return openBlock(), createBlock("div", {
                                  key: player.id,
                                  class: [
                                    "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                    index < 3 ? "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20" : "bg-gray-50 dark:bg-gray-800"
                                  ]
                                }, [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("div", {
                                      class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                    }, toDisplayString(index + 1), 3),
                                    createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                  ]),
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                    createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                  ]),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("div", { class: "font-bold text-lg text-purple-600 dark:text-purple-400" }, toDisplayString(player.skills_learned) + " habilidades ", 1),
                                    createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " N\xEDvel " + toDisplayString(player.level), 1)
                                  ])
                                ], 2);
                              }), 128))
                            ])
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TabsContent, {
              value: "resources",
              class: "space-y-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Card, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` \u{1F4B0} Ranking de Recursos `);
                                  } else {
                                    return [
                                      createTextVNode(" \u{1F4B0} Ranking de Recursos ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Os mais ricos da gal\xE1xia `);
                                  } else {
                                    return [
                                      createTextVNode(" Os mais ricos da gal\xE1xia ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" \u{1F4B0} Ranking de Recursos ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Os mais ricos da gal\xE1xia ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_CardContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="space-y-3"${_scopeId4}><!--[-->`);
                              ssrRenderList(resourceRanking.value, (player, index) => {
                                _push5(`<div class="${ssrRenderClass([
                                  index < 3 ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" : "bg-gray-50 dark:bg-gray-800",
                                  "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg"
                                ])}"${_scopeId4}><div class="flex items-center gap-3"${_scopeId4}><div class="${ssrRenderClass([getRankColor(index), "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"])}"${_scopeId4}>${ssrInterpolate(index + 1)}</div><div class="text-2xl"${_scopeId4}>${ssrInterpolate(getRankIcon(index))}</div></div><div class="flex-1"${_scopeId4}><div class="font-semibold text-gray-900 dark:text-white"${_scopeId4}>${ssrInterpolate(player.name)}</div><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId4}>${ssrInterpolate(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial")}</div></div><div class="text-right"${_scopeId4}><div class="font-bold text-lg text-green-600 dark:text-green-400"${_scopeId4}>${ssrInterpolate(player.total_resources.toLocaleString())} \u{1FA99} </div><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId4}>${ssrInterpolate(player.gold.toLocaleString())} ouro </div></div></div>`);
                              });
                              _push5(`<!--]--></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "space-y-3" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(resourceRanking.value, (player, index) => {
                                    return openBlock(), createBlock("div", {
                                      key: player.id,
                                      class: [
                                        "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                        index < 3 ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" : "bg-gray-50 dark:bg-gray-800"
                                      ]
                                    }, [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("div", {
                                          class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                        }, toDisplayString(index + 1), 3),
                                        createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                      ]),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                      ]),
                                      createVNode("div", { class: "text-right" }, [
                                        createVNode("div", { class: "font-bold text-lg text-green-600 dark:text-green-400" }, toDisplayString(player.total_resources.toLocaleString()) + " \u{1FA99} ", 1),
                                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.gold.toLocaleString()) + " ouro ", 1)
                                      ])
                                    ], 2);
                                  }), 128))
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u{1F4B0} Ranking de Recursos ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Os mais ricos da gal\xE1xia ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CardContent, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-3" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(resourceRanking.value, (player, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: player.id,
                                    class: [
                                      "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                      index < 3 ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" : "bg-gray-50 dark:bg-gray-800"
                                    ]
                                  }, [
                                    createVNode("div", { class: "flex items-center gap-3" }, [
                                      createVNode("div", {
                                        class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                      }, toDisplayString(index + 1), 3),
                                      createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                    ]),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                      createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                    ]),
                                    createVNode("div", { class: "text-right" }, [
                                      createVNode("div", { class: "font-bold text-lg text-green-600 dark:text-green-400" }, toDisplayString(player.total_resources.toLocaleString()) + " \u{1FA99} ", 1),
                                      createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.gold.toLocaleString()) + " ouro ", 1)
                                    ])
                                  ], 2);
                                }), 128))
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Card, null, {
                      default: withCtx(() => [
                        createVNode(_component_CardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" \u{1F4B0} Ranking de Recursos ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" Os mais ricos da gal\xE1xia ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_CardContent, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(resourceRanking.value, (player, index) => {
                                return openBlock(), createBlock("div", {
                                  key: player.id,
                                  class: [
                                    "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                    index < 3 ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" : "bg-gray-50 dark:bg-gray-800"
                                  ]
                                }, [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode("div", {
                                      class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                    }, toDisplayString(index + 1), 3),
                                    createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                  ]),
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                    createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                  ]),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("div", { class: "font-bold text-lg text-green-600 dark:text-green-400" }, toDisplayString(player.total_resources.toLocaleString()) + " \u{1FA99} ", 1),
                                    createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.gold.toLocaleString()) + " ouro ", 1)
                                  ])
                                ], 2);
                              }), 128))
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TabsList, { class: "grid w-full grid-cols-2 sm:grid-cols-4" }, {
                default: withCtx(() => [
                  createVNode(_component_TabsTrigger, { value: "level" }, {
                    default: withCtx(() => [
                      createTextVNode("N\xEDvel")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TabsTrigger, { value: "battles" }, {
                    default: withCtx(() => [
                      createTextVNode("Batalhas")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TabsTrigger, { value: "skills" }, {
                    default: withCtx(() => [
                      createTextVNode("Habilidades")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TabsTrigger, { value: "resources" }, {
                    default: withCtx(() => [
                      createTextVNode("Recursos")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_TabsContent, {
                value: "level",
                class: "space-y-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Card, null, {
                    default: withCtx(() => [
                      createVNode(_component_CardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" \u{1F3C6} Ranking por N\xEDvel ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" Os jogadores com maior n\xEDvel ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CardContent, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(levelRanking.value, (player, index) => {
                              return openBlock(), createBlock("div", {
                                key: player.id,
                                class: [
                                  "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                  index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20" : "bg-gray-50 dark:bg-gray-800"
                                ]
                              }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("div", {
                                    class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                  }, toDisplayString(index + 1), 3),
                                  createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                  createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                ]),
                                createVNode("div", { class: "text-right" }, [
                                  createVNode("div", { class: "font-bold text-lg text-blue-600 dark:text-blue-400" }, " N\xEDvel " + toDisplayString(player.level), 1),
                                  createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.xp.toLocaleString()) + " XP ", 1)
                                ])
                              ], 2);
                            }), 128))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_TabsContent, {
                value: "battles",
                class: "space-y-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Card, null, {
                    default: withCtx(() => [
                      createVNode(_component_CardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" \u2694\uFE0F Ranking de Batalhas ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" Os guerreiros mais vitoriosos ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CardContent, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(battleRanking.value, (player, index) => {
                              return openBlock(), createBlock("div", {
                                key: player.id,
                                class: [
                                  "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                  index < 3 ? "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" : "bg-gray-50 dark:bg-gray-800"
                                ]
                              }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("div", {
                                    class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                  }, toDisplayString(index + 1), 3),
                                  createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                  createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                ]),
                                createVNode("div", { class: "text-right" }, [
                                  createVNode("div", { class: "font-bold text-lg text-red-600 dark:text-red-400" }, toDisplayString(player.battles_won) + " vit\xF3rias ", 1),
                                  createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.total_battles) + " batalhas ", 1)
                                ])
                              ], 2);
                            }), 128))
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_TabsContent, {
                value: "skills",
                class: "space-y-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Card, null, {
                    default: withCtx(() => [
                      createVNode(_component_CardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" \u{1F3AF} Ranking de Habilidades ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" Os mestres das artes ninja ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CardContent, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(skillRanking.value, (player, index) => {
                              return openBlock(), createBlock("div", {
                                key: player.id,
                                class: [
                                  "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                  index < 3 ? "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20" : "bg-gray-50 dark:bg-gray-800"
                                ]
                              }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("div", {
                                    class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                  }, toDisplayString(index + 1), 3),
                                  createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                  createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                ]),
                                createVNode("div", { class: "text-right" }, [
                                  createVNode("div", { class: "font-bold text-lg text-purple-600 dark:text-purple-400" }, toDisplayString(player.skills_learned) + " habilidades ", 1),
                                  createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " N\xEDvel " + toDisplayString(player.level), 1)
                                ])
                              ], 2);
                            }), 128))
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_TabsContent, {
                value: "resources",
                class: "space-y-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Card, null, {
                    default: withCtx(() => [
                      createVNode(_component_CardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_CardTitle, { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" \u{1F4B0} Ranking de Recursos ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" Os mais ricos da gal\xE1xia ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CardContent, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(resourceRanking.value, (player, index) => {
                              return openBlock(), createBlock("div", {
                                key: player.id,
                                class: [
                                  "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg",
                                  index < 3 ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" : "bg-gray-50 dark:bg-gray-800"
                                ]
                              }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("div", {
                                    class: ["w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", getRankColor(index)]
                                  }, toDisplayString(index + 1), 3),
                                  createVNode("div", { class: "text-2xl" }, toDisplayString(getRankIcon(index)), 1)
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("div", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(player.name), 1),
                                  createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.class === "ninja" ? "\u{1F977} Ninja" : "\u{1F680} Guerreiro Espacial"), 1)
                                ]),
                                createVNode("div", { class: "text-right" }, [
                                  createVNode("div", { class: "font-bold text-lg text-green-600 dark:text-green-400" }, toDisplayString(player.total_resources.toLocaleString()) + " \u{1FA99} ", 1),
                                  createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(player.gold.toLocaleString()) + " ouro ", 1)
                                ])
                              ], 2);
                            }), 128))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(characterStore).currentCharacter) {
        _push(ssrRenderComponent(_component_Card, { class: "max-w-2xl mx-auto" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CardTitle, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Sua Posi\xE7\xE3o`);
                        } else {
                          return [
                            createTextVNode("Sua Posi\xE7\xE3o")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CardTitle, { class: "text-center" }, {
                        default: withCtx(() => [
                          createTextVNode("Sua Posi\xE7\xE3o")
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
                    _push3(`<div class="text-center space-y-4"${_scopeId2}><div class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(unref(characterStore).currentCharacter.name)}</div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"${_scopeId2}><div${_scopeId2}><div class="font-semibold text-blue-600 dark:text-blue-400"${_scopeId2}> N\xEDvel ${ssrInterpolate(unref(characterStore).currentCharacter.level)}</div><div class="text-gray-600 dark:text-gray-400"${_scopeId2}> Posi\xE7\xE3o: #${ssrInterpolate(getPlayerRank("level"))}</div></div><div${_scopeId2}><div class="font-semibold text-red-600 dark:text-red-400"${_scopeId2}>${ssrInterpolate(getPlayerBattles())} vit\xF3rias </div><div class="text-gray-600 dark:text-gray-400"${_scopeId2}> Posi\xE7\xE3o: #${ssrInterpolate(getPlayerRank("battles"))}</div></div><div${_scopeId2}><div class="font-semibold text-purple-600 dark:text-purple-400"${_scopeId2}>${ssrInterpolate(getPlayerSkills())} habilidades </div><div class="text-gray-600 dark:text-gray-400"${_scopeId2}> Posi\xE7\xE3o: #${ssrInterpolate(getPlayerRank("skills"))}</div></div><div${_scopeId2}><div class="font-semibold text-green-600 dark:text-green-400"${_scopeId2}>${ssrInterpolate(getPlayerResources())} \u{1FA99} </div><div class="text-gray-600 dark:text-gray-400"${_scopeId2}> Posi\xE7\xE3o: #${ssrInterpolate(getPlayerRank("resources"))}</div></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-center space-y-4" }, [
                        createVNode("div", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(characterStore).currentCharacter.name), 1),
                        createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "font-semibold text-blue-600 dark:text-blue-400" }, " N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1),
                            createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, " Posi\xE7\xE3o: #" + toDisplayString(getPlayerRank("level")), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "font-semibold text-red-600 dark:text-red-400" }, toDisplayString(getPlayerBattles()) + " vit\xF3rias ", 1),
                            createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, " Posi\xE7\xE3o: #" + toDisplayString(getPlayerRank("battles")), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "font-semibold text-purple-600 dark:text-purple-400" }, toDisplayString(getPlayerSkills()) + " habilidades ", 1),
                            createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, " Posi\xE7\xE3o: #" + toDisplayString(getPlayerRank("skills")), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "font-semibold text-green-600 dark:text-green-400" }, toDisplayString(getPlayerResources()) + " \u{1FA99} ", 1),
                            createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, " Posi\xE7\xE3o: #" + toDisplayString(getPlayerRank("resources")), 1)
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
                    createVNode(_component_CardTitle, { class: "text-center" }, {
                      default: withCtx(() => [
                        createTextVNode("Sua Posi\xE7\xE3o")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-center space-y-4" }, [
                      createVNode("div", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(characterStore).currentCharacter.name), 1),
                      createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold text-blue-600 dark:text-blue-400" }, " N\xEDvel " + toDisplayString(unref(characterStore).currentCharacter.level), 1),
                          createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, " Posi\xE7\xE3o: #" + toDisplayString(getPlayerRank("level")), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold text-red-600 dark:text-red-400" }, toDisplayString(getPlayerBattles()) + " vit\xF3rias ", 1),
                          createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, " Posi\xE7\xE3o: #" + toDisplayString(getPlayerRank("battles")), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold text-purple-600 dark:text-purple-400" }, toDisplayString(getPlayerSkills()) + " habilidades ", 1),
                          createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, " Posi\xE7\xE3o: #" + toDisplayString(getPlayerRank("skills")), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "font-semibold text-green-600 dark:text-green-400" }, toDisplayString(getPlayerResources()) + " \u{1FA99} ", 1),
                          createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, " Posi\xE7\xE3o: #" + toDisplayString(getPlayerRank("resources")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rankings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=rankings-KcE7_ojk.mjs.map
