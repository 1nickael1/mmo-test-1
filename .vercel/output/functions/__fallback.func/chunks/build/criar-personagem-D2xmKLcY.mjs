import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$5 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$4 } from './CardDescription-DNTQjROL.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$6 } from './Input-CpuHzAlq.mjs';
import { _ as _sfc_main$7 } from './Button-CSVd3JRx.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import { n as navigateTo } from './server.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
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
  __name: "criar-personagem",
  __ssrInlineRender: true,
  setup(__props) {
    const characterStore = useCharacterStore();
    const form = ref({
      name: "",
      class: "ninja"
    });
    const loading = ref(false);
    const handleCreateCharacter = async () => {
      loading.value = true;
      try {
        const character = await characterStore.createCharacter(form.value);
        if (character) {
          await navigateTo("/home");
        }
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = _sfc_main$3;
      const _component_CardHeader = _sfc_main$2;
      const _component_CardTitle = _sfc_main$1;
      const _component_CardDescription = _sfc_main$4;
      const _component_CardContent = _sfc_main$5;
      const _component_Label = _sfc_main$1$1;
      const _component_Input = _sfc_main$6;
      const _component_Button = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Card, { class: "w-full max-w-2xl bg-white/10 backdrop-blur-sm border-white/20" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "text-3xl font-bold text-white text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Criar Personagem `);
                      } else {
                        return [
                          createTextVNode(" Criar Personagem ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, { class: "text-gray-300 text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Escolha o nome e classe do seu personagem ninja espacial `);
                      } else {
                        return [
                          createTextVNode(" Escolha o nome e classe do seu personagem ninja espacial ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "text-3xl font-bold text-white text-center" }, {
                      default: withCtx(() => [
                        createTextVNode(" Criar Personagem ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, { class: "text-gray-300 text-center" }, {
                      default: withCtx(() => [
                        createTextVNode(" Escolha o nome e classe do seu personagem ninja espacial ")
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
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "name",
                    class: "text-white text-lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nome do Personagem`);
                      } else {
                        return [
                          createTextVNode("Nome do Personagem")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Input, {
                    id: "name",
                    modelValue: form.value.name,
                    "onUpdate:modelValue": ($event) => form.value.name = $event,
                    type: "text",
                    placeholder: "Digite o nome do seu personagem",
                    required: "",
                    class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300 h-12 text-lg"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Label, { class: "text-white text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Escolha sua Classe`);
                      } else {
                        return [
                          createTextVNode("Escolha sua Classe")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Card, {
                    class: [
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      form.value.class === "ninja" ? "ring-2 ring-blue-400 bg-blue-500/20" : "bg-white/10 hover:bg-white/20"
                    ],
                    onClick: ($event) => form.value.class = "ninja"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardContent, { class: "p-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-center"${_scopeId4}><div class="text-4xl mb-3"${_scopeId4}>\u{1F977}</div><h3 class="text-xl font-bold text-white mb-2"${_scopeId4}>Ninja</h3><p class="text-gray-300 text-sm mb-4"${_scopeId4}> \xC1gil e furtivo, especialista em ataques r\xE1pidos e habilidades de stealth. </p><div class="space-y-1 text-sm text-gray-300"${_scopeId4}><div${_scopeId4}>\u26A1 Agilidade: 12</div><div${_scopeId4}>\u{1F4AA} For\xE7a: 8</div><div${_scopeId4}>\u{1F6E1}\uFE0F Defesa: 6</div><div${_scopeId4}>\u2764\uFE0F Vida: 80</div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F977}"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, "Ninja"),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " \xC1gil e furtivo, especialista em ataques r\xE1pidos e habilidades de stealth. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u26A1 Agilidade: 12"),
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 8"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 6"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 80")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardContent, { class: "p-6" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center" }, [
                                createVNode("div", { class: "text-4xl mb-3" }, "\u{1F977}"),
                                createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, "Ninja"),
                                createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " \xC1gil e furtivo, especialista em ataques r\xE1pidos e habilidades de stealth. "),
                                createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                  createVNode("div", null, "\u26A1 Agilidade: 12"),
                                  createVNode("div", null, "\u{1F4AA} For\xE7a: 8"),
                                  createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 6"),
                                  createVNode("div", null, "\u2764\uFE0F Vida: 80")
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Card, {
                    class: [
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      form.value.class === "guerreiro_espacial" ? "ring-2 ring-red-400 bg-red-500/20" : "bg-white/10 hover:bg-white/20"
                    ],
                    onClick: ($event) => form.value.class = "guerreiro_espacial"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardContent, { class: "p-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-center"${_scopeId4}><div class="text-4xl mb-3"${_scopeId4}>\u{1F680}</div><h3 class="text-xl font-bold text-white mb-2"${_scopeId4}> Guerreiro Espacial </h3><p class="text-gray-300 text-sm mb-4"${_scopeId4}> Poderoso e resistente, especialista em combate direto e tecnologia avan\xE7ada. </p><div class="space-y-1 text-sm text-gray-300"${_scopeId4}><div${_scopeId4}>\u{1F4AA} For\xE7a: 12</div><div${_scopeId4}>\u{1F6E1}\uFE0F Defesa: 10</div><div${_scopeId4}>\u26A1 Agilidade: 6</div><div${_scopeId4}>\u2764\uFE0F Vida: 100</div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F680}"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Guerreiro Espacial "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Poderoso e resistente, especialista em combate direto e tecnologia avan\xE7ada. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 12"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 10"),
                                    createVNode("div", null, "\u26A1 Agilidade: 6"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 100")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardContent, { class: "p-6" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center" }, [
                                createVNode("div", { class: "text-4xl mb-3" }, "\u{1F680}"),
                                createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Guerreiro Espacial "),
                                createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Poderoso e resistente, especialista em combate direto e tecnologia avan\xE7ada. "),
                                createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                  createVNode("div", null, "\u{1F4AA} For\xE7a: 12"),
                                  createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 10"),
                                  createVNode("div", null, "\u26A1 Agilidade: 6"),
                                  createVNode("div", null, "\u2764\uFE0F Vida: 100")
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Card, {
                    class: [
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      form.value.class === "mago_cosmico" ? "ring-2 ring-purple-400 bg-purple-500/20" : "bg-white/10 hover:bg-white/20"
                    ],
                    onClick: ($event) => form.value.class = "mago_cosmico"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardContent, { class: "p-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-center"${_scopeId4}><div class="text-4xl mb-3"${_scopeId4}>\u{1F52E}</div><h3 class="text-xl font-bold text-white mb-2"${_scopeId4}> Mago C\xF3smico </h3><p class="text-gray-300 text-sm mb-4"${_scopeId4}> Mestre das artes arcanas, manipula energia c\xF3smica e magia elemental. </p><div class="space-y-1 text-sm text-gray-300"${_scopeId4}><div${_scopeId4}>\u{1F52E} Magia: 15</div><div${_scopeId4}>\u{1F4AA} For\xE7a: 5</div><div${_scopeId4}>\u{1F6E1}\uFE0F Defesa: 4</div><div${_scopeId4}>\u2764\uFE0F Vida: 70</div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F52E}"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Mago C\xF3smico "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Mestre das artes arcanas, manipula energia c\xF3smica e magia elemental. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u{1F52E} Magia: 15"),
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 5"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 4"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 70")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardContent, { class: "p-6" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center" }, [
                                createVNode("div", { class: "text-4xl mb-3" }, "\u{1F52E}"),
                                createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Mago C\xF3smico "),
                                createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Mestre das artes arcanas, manipula energia c\xF3smica e magia elemental. "),
                                createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                  createVNode("div", null, "\u{1F52E} Magia: 15"),
                                  createVNode("div", null, "\u{1F4AA} For\xE7a: 5"),
                                  createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 4"),
                                  createVNode("div", null, "\u2764\uFE0F Vida: 70")
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Card, {
                    class: [
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      form.value.class === "arqueiro_estelar" ? "ring-2 ring-green-400 bg-green-500/20" : "bg-white/10 hover:bg-white/20"
                    ],
                    onClick: ($event) => form.value.class = "arqueiro_estelar"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardContent, { class: "p-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-center"${_scopeId4}><div class="text-4xl mb-3"${_scopeId4}>\u{1F3F9}</div><h3 class="text-xl font-bold text-white mb-2"${_scopeId4}> Arqueiro Estelar </h3><p class="text-gray-300 text-sm mb-4"${_scopeId4}> Precis\xE3o letal \xE0 dist\xE2ncia, especialista em arcos energ\xE9ticos e flechas c\xF3smicas. </p><div class="space-y-1 text-sm text-gray-300"${_scopeId4}><div${_scopeId4}>\u{1F3AF} Precis\xE3o: 14</div><div${_scopeId4}>\u26A1 Agilidade: 10</div><div${_scopeId4}>\u{1F6E1}\uFE0F Defesa: 5</div><div${_scopeId4}>\u2764\uFE0F Vida: 75</div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F3F9}"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Arqueiro Estelar "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Precis\xE3o letal \xE0 dist\xE2ncia, especialista em arcos energ\xE9ticos e flechas c\xF3smicas. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u{1F3AF} Precis\xE3o: 14"),
                                    createVNode("div", null, "\u26A1 Agilidade: 10"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 5"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 75")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardContent, { class: "p-6" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center" }, [
                                createVNode("div", { class: "text-4xl mb-3" }, "\u{1F3F9}"),
                                createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Arqueiro Estelar "),
                                createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Precis\xE3o letal \xE0 dist\xE2ncia, especialista em arcos energ\xE9ticos e flechas c\xF3smicas. "),
                                createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                  createVNode("div", null, "\u{1F3AF} Precis\xE3o: 14"),
                                  createVNode("div", null, "\u26A1 Agilidade: 10"),
                                  createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 5"),
                                  createVNode("div", null, "\u2764\uFE0F Vida: 75")
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Card, {
                    class: [
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      form.value.class === "clerigo_divino" ? "ring-2 ring-yellow-400 bg-yellow-500/20" : "bg-white/10 hover:bg-white/20"
                    ],
                    onClick: ($event) => form.value.class = "clerigo_divino"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardContent, { class: "p-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-center"${_scopeId4}><div class="text-4xl mb-3"${_scopeId4}>\u2728</div><h3 class="text-xl font-bold text-white mb-2"${_scopeId4}> Cl\xE9rigo Divino </h3><p class="text-gray-300 text-sm mb-4"${_scopeId4}> Canalizador de poder divino, especialista em cura e magia sagrada. </p><div class="space-y-1 text-sm text-gray-300"${_scopeId4}><div${_scopeId4}>\u2728 Sabedoria: 13</div><div${_scopeId4}>\u{1F6E1}\uFE0F Defesa: 8</div><div${_scopeId4}>\u{1F4AA} For\xE7a: 6</div><div${_scopeId4}>\u2764\uFE0F Vida: 90</div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u2728"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Cl\xE9rigo Divino "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Canalizador de poder divino, especialista em cura e magia sagrada. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u2728 Sabedoria: 13"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 8"),
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 6"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 90")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardContent, { class: "p-6" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center" }, [
                                createVNode("div", { class: "text-4xl mb-3" }, "\u2728"),
                                createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Cl\xE9rigo Divino "),
                                createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Canalizador de poder divino, especialista em cura e magia sagrada. "),
                                createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                  createVNode("div", null, "\u2728 Sabedoria: 13"),
                                  createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 8"),
                                  createVNode("div", null, "\u{1F4AA} For\xE7a: 6"),
                                  createVNode("div", null, "\u2764\uFE0F Vida: 90")
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Card, {
                    class: [
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      form.value.class === "assassino_sombrio" ? "ring-2 ring-gray-400 bg-gray-500/20" : "bg-white/10 hover:bg-white/20"
                    ],
                    onClick: ($event) => form.value.class = "assassino_sombrio"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardContent, { class: "p-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-center"${_scopeId4}><div class="text-4xl mb-3"${_scopeId4}>\u{1F5E1}\uFE0F</div><h3 class="text-xl font-bold text-white mb-2"${_scopeId4}> Assassino Sombrio </h3><p class="text-gray-300 text-sm mb-4"${_scopeId4}> Mestre da furtividade, especialista em ataques cr\xEDticos e venenos letais. </p><div class="space-y-1 text-sm text-gray-300"${_scopeId4}><div${_scopeId4}>\u26A1 Agilidade: 13</div><div${_scopeId4}>\u{1F480} Cr\xEDtico: 12</div><div${_scopeId4}>\u{1F6E1}\uFE0F Defesa: 4</div><div${_scopeId4}>\u2764\uFE0F Vida: 65</div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F5E1}\uFE0F"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Assassino Sombrio "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Mestre da furtividade, especialista em ataques cr\xEDticos e venenos letais. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u26A1 Agilidade: 13"),
                                    createVNode("div", null, "\u{1F480} Cr\xEDtico: 12"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 4"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 65")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardContent, { class: "p-6" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center" }, [
                                createVNode("div", { class: "text-4xl mb-3" }, "\u{1F5E1}\uFE0F"),
                                createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Assassino Sombrio "),
                                createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Mestre da furtividade, especialista em ataques cr\xEDticos e venenos letais. "),
                                createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                  createVNode("div", null, "\u26A1 Agilidade: 13"),
                                  createVNode("div", null, "\u{1F480} Cr\xEDtico: 12"),
                                  createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 4"),
                                  createVNode("div", null, "\u2764\uFE0F Vida: 65")
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Card, {
                    class: [
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      form.value.class === "paladino_cosmico" ? "ring-2 ring-cyan-400 bg-cyan-500/20" : "bg-white/10 hover:bg-white/20"
                    ],
                    onClick: ($event) => form.value.class = "paladino_cosmico"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CardContent, { class: "p-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-center"${_scopeId4}><div class="text-4xl mb-3"${_scopeId4}>\u2694\uFE0F</div><h3 class="text-xl font-bold text-white mb-2"${_scopeId4}> Paladino C\xF3smico </h3><p class="text-gray-300 text-sm mb-4"${_scopeId4}> Guerreiro sagrado, combina for\xE7a f\xEDsica com poder divino e prote\xE7\xE3o celestial. </p><div class="space-y-1 text-sm text-gray-300"${_scopeId4}><div${_scopeId4}>\u{1F4AA} For\xE7a: 11</div><div${_scopeId4}>\u2728 Sabedoria: 9</div><div${_scopeId4}>\u{1F6E1}\uFE0F Defesa: 12</div><div${_scopeId4}>\u2764\uFE0F Vida: 110</div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u2694\uFE0F"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Paladino C\xF3smico "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Guerreiro sagrado, combina for\xE7a f\xEDsica com poder divino e prote\xE7\xE3o celestial. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 11"),
                                    createVNode("div", null, "\u2728 Sabedoria: 9"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 12"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 110")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CardContent, { class: "p-6" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-center" }, [
                                createVNode("div", { class: "text-4xl mb-3" }, "\u2694\uFE0F"),
                                createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Paladino C\xF3smico "),
                                createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Guerreiro sagrado, combina for\xE7a f\xEDsica com poder divino e prote\xE7\xE3o celestial. "),
                                createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                  createVNode("div", null, "\u{1F4AA} For\xE7a: 11"),
                                  createVNode("div", null, "\u2728 Sabedoria: 9"),
                                  createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 12"),
                                  createVNode("div", null, "\u2764\uFE0F Vida: 110")
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "submit",
                    disabled: loading.value || !form.value.name || !form.value.class,
                    class: "w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg disabled:opacity-50"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(loading.value ? "Criando Personagem..." : "Criar Personagem")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(loading.value ? "Criando Personagem..." : "Criar Personagem"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(handleCreateCharacter, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_Label, {
                          for: "name",
                          class: "text-white text-lg"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Nome do Personagem")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          id: "name",
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          type: "text",
                          placeholder: "Digite o nome do seu personagem",
                          required: "",
                          class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300 h-12 text-lg"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode(_component_Label, { class: "text-white text-lg" }, {
                          default: withCtx(() => [
                            createTextVNode("Escolha sua Classe")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, [
                          createVNode(_component_Card, {
                            class: [
                              "cursor-pointer transition-all duration-200 hover:scale-105",
                              form.value.class === "ninja" ? "ring-2 ring-blue-400 bg-blue-500/20" : "bg-white/10 hover:bg-white/20"
                            ],
                            onClick: ($event) => form.value.class = "ninja"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardContent, { class: "p-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode("div", { class: "text-4xl mb-3" }, "\u{1F977}"),
                                    createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, "Ninja"),
                                    createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " \xC1gil e furtivo, especialista em ataques r\xE1pidos e habilidades de stealth. "),
                                    createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                      createVNode("div", null, "\u26A1 Agilidade: 12"),
                                      createVNode("div", null, "\u{1F4AA} For\xE7a: 8"),
                                      createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 6"),
                                      createVNode("div", null, "\u2764\uFE0F Vida: 80")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"]),
                          createVNode(_component_Card, {
                            class: [
                              "cursor-pointer transition-all duration-200 hover:scale-105",
                              form.value.class === "guerreiro_espacial" ? "ring-2 ring-red-400 bg-red-500/20" : "bg-white/10 hover:bg-white/20"
                            ],
                            onClick: ($event) => form.value.class = "guerreiro_espacial"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardContent, { class: "p-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode("div", { class: "text-4xl mb-3" }, "\u{1F680}"),
                                    createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Guerreiro Espacial "),
                                    createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Poderoso e resistente, especialista em combate direto e tecnologia avan\xE7ada. "),
                                    createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                      createVNode("div", null, "\u{1F4AA} For\xE7a: 12"),
                                      createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 10"),
                                      createVNode("div", null, "\u26A1 Agilidade: 6"),
                                      createVNode("div", null, "\u2764\uFE0F Vida: 100")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"]),
                          createVNode(_component_Card, {
                            class: [
                              "cursor-pointer transition-all duration-200 hover:scale-105",
                              form.value.class === "mago_cosmico" ? "ring-2 ring-purple-400 bg-purple-500/20" : "bg-white/10 hover:bg-white/20"
                            ],
                            onClick: ($event) => form.value.class = "mago_cosmico"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardContent, { class: "p-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode("div", { class: "text-4xl mb-3" }, "\u{1F52E}"),
                                    createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Mago C\xF3smico "),
                                    createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Mestre das artes arcanas, manipula energia c\xF3smica e magia elemental. "),
                                    createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                      createVNode("div", null, "\u{1F52E} Magia: 15"),
                                      createVNode("div", null, "\u{1F4AA} For\xE7a: 5"),
                                      createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 4"),
                                      createVNode("div", null, "\u2764\uFE0F Vida: 70")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"]),
                          createVNode(_component_Card, {
                            class: [
                              "cursor-pointer transition-all duration-200 hover:scale-105",
                              form.value.class === "arqueiro_estelar" ? "ring-2 ring-green-400 bg-green-500/20" : "bg-white/10 hover:bg-white/20"
                            ],
                            onClick: ($event) => form.value.class = "arqueiro_estelar"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardContent, { class: "p-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode("div", { class: "text-4xl mb-3" }, "\u{1F3F9}"),
                                    createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Arqueiro Estelar "),
                                    createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Precis\xE3o letal \xE0 dist\xE2ncia, especialista em arcos energ\xE9ticos e flechas c\xF3smicas. "),
                                    createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                      createVNode("div", null, "\u{1F3AF} Precis\xE3o: 14"),
                                      createVNode("div", null, "\u26A1 Agilidade: 10"),
                                      createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 5"),
                                      createVNode("div", null, "\u2764\uFE0F Vida: 75")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"]),
                          createVNode(_component_Card, {
                            class: [
                              "cursor-pointer transition-all duration-200 hover:scale-105",
                              form.value.class === "clerigo_divino" ? "ring-2 ring-yellow-400 bg-yellow-500/20" : "bg-white/10 hover:bg-white/20"
                            ],
                            onClick: ($event) => form.value.class = "clerigo_divino"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardContent, { class: "p-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode("div", { class: "text-4xl mb-3" }, "\u2728"),
                                    createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Cl\xE9rigo Divino "),
                                    createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Canalizador de poder divino, especialista em cura e magia sagrada. "),
                                    createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                      createVNode("div", null, "\u2728 Sabedoria: 13"),
                                      createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 8"),
                                      createVNode("div", null, "\u{1F4AA} For\xE7a: 6"),
                                      createVNode("div", null, "\u2764\uFE0F Vida: 90")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"]),
                          createVNode(_component_Card, {
                            class: [
                              "cursor-pointer transition-all duration-200 hover:scale-105",
                              form.value.class === "assassino_sombrio" ? "ring-2 ring-gray-400 bg-gray-500/20" : "bg-white/10 hover:bg-white/20"
                            ],
                            onClick: ($event) => form.value.class = "assassino_sombrio"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardContent, { class: "p-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode("div", { class: "text-4xl mb-3" }, "\u{1F5E1}\uFE0F"),
                                    createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Assassino Sombrio "),
                                    createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Mestre da furtividade, especialista em ataques cr\xEDticos e venenos letais. "),
                                    createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                      createVNode("div", null, "\u26A1 Agilidade: 13"),
                                      createVNode("div", null, "\u{1F480} Cr\xEDtico: 12"),
                                      createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 4"),
                                      createVNode("div", null, "\u2764\uFE0F Vida: 65")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"]),
                          createVNode(_component_Card, {
                            class: [
                              "cursor-pointer transition-all duration-200 hover:scale-105",
                              form.value.class === "paladino_cosmico" ? "ring-2 ring-cyan-400 bg-cyan-500/20" : "bg-white/10 hover:bg-white/20"
                            ],
                            onClick: ($event) => form.value.class = "paladino_cosmico"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardContent, { class: "p-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode("div", { class: "text-4xl mb-3" }, "\u2694\uFE0F"),
                                    createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Paladino C\xF3smico "),
                                    createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Guerreiro sagrado, combina for\xE7a f\xEDsica com poder divino e prote\xE7\xE3o celestial. "),
                                    createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                      createVNode("div", null, "\u{1F4AA} For\xE7a: 11"),
                                      createVNode("div", null, "\u2728 Sabedoria: 9"),
                                      createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 12"),
                                      createVNode("div", null, "\u2764\uFE0F Vida: 110")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class", "onClick"])
                        ])
                      ]),
                      createVNode(_component_Button, {
                        type: "submit",
                        disabled: loading.value || !form.value.name || !form.value.class,
                        class: "w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg disabled:opacity-50"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(loading.value ? "Criando Personagem..." : "Criar Personagem"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_CardTitle, { class: "text-3xl font-bold text-white text-center" }, {
                    default: withCtx(() => [
                      createTextVNode(" Criar Personagem ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, { class: "text-gray-300 text-center" }, {
                    default: withCtx(() => [
                      createTextVNode(" Escolha o nome e classe do seu personagem ninja espacial ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(handleCreateCharacter, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_Label, {
                        for: "name",
                        class: "text-white text-lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Nome do Personagem")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Input, {
                        id: "name",
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        type: "text",
                        placeholder: "Digite o nome do seu personagem",
                        required: "",
                        class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300 h-12 text-lg"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode(_component_Label, { class: "text-white text-lg" }, {
                        default: withCtx(() => [
                          createTextVNode("Escolha sua Classe")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, [
                        createVNode(_component_Card, {
                          class: [
                            "cursor-pointer transition-all duration-200 hover:scale-105",
                            form.value.class === "ninja" ? "ring-2 ring-blue-400 bg-blue-500/20" : "bg-white/10 hover:bg-white/20"
                          ],
                          onClick: ($event) => form.value.class = "ninja"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardContent, { class: "p-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F977}"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, "Ninja"),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " \xC1gil e furtivo, especialista em ataques r\xE1pidos e habilidades de stealth. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u26A1 Agilidade: 12"),
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 8"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 6"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 80")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(_component_Card, {
                          class: [
                            "cursor-pointer transition-all duration-200 hover:scale-105",
                            form.value.class === "guerreiro_espacial" ? "ring-2 ring-red-400 bg-red-500/20" : "bg-white/10 hover:bg-white/20"
                          ],
                          onClick: ($event) => form.value.class = "guerreiro_espacial"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardContent, { class: "p-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F680}"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Guerreiro Espacial "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Poderoso e resistente, especialista em combate direto e tecnologia avan\xE7ada. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 12"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 10"),
                                    createVNode("div", null, "\u26A1 Agilidade: 6"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 100")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(_component_Card, {
                          class: [
                            "cursor-pointer transition-all duration-200 hover:scale-105",
                            form.value.class === "mago_cosmico" ? "ring-2 ring-purple-400 bg-purple-500/20" : "bg-white/10 hover:bg-white/20"
                          ],
                          onClick: ($event) => form.value.class = "mago_cosmico"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardContent, { class: "p-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F52E}"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Mago C\xF3smico "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Mestre das artes arcanas, manipula energia c\xF3smica e magia elemental. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u{1F52E} Magia: 15"),
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 5"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 4"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 70")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(_component_Card, {
                          class: [
                            "cursor-pointer transition-all duration-200 hover:scale-105",
                            form.value.class === "arqueiro_estelar" ? "ring-2 ring-green-400 bg-green-500/20" : "bg-white/10 hover:bg-white/20"
                          ],
                          onClick: ($event) => form.value.class = "arqueiro_estelar"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardContent, { class: "p-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F3F9}"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Arqueiro Estelar "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Precis\xE3o letal \xE0 dist\xE2ncia, especialista em arcos energ\xE9ticos e flechas c\xF3smicas. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u{1F3AF} Precis\xE3o: 14"),
                                    createVNode("div", null, "\u26A1 Agilidade: 10"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 5"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 75")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(_component_Card, {
                          class: [
                            "cursor-pointer transition-all duration-200 hover:scale-105",
                            form.value.class === "clerigo_divino" ? "ring-2 ring-yellow-400 bg-yellow-500/20" : "bg-white/10 hover:bg-white/20"
                          ],
                          onClick: ($event) => form.value.class = "clerigo_divino"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardContent, { class: "p-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u2728"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Cl\xE9rigo Divino "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Canalizador de poder divino, especialista em cura e magia sagrada. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u2728 Sabedoria: 13"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 8"),
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 6"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 90")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(_component_Card, {
                          class: [
                            "cursor-pointer transition-all duration-200 hover:scale-105",
                            form.value.class === "assassino_sombrio" ? "ring-2 ring-gray-400 bg-gray-500/20" : "bg-white/10 hover:bg-white/20"
                          ],
                          onClick: ($event) => form.value.class = "assassino_sombrio"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardContent, { class: "p-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u{1F5E1}\uFE0F"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Assassino Sombrio "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Mestre da furtividade, especialista em ataques cr\xEDticos e venenos letais. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u26A1 Agilidade: 13"),
                                    createVNode("div", null, "\u{1F480} Cr\xEDtico: 12"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 4"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 65")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        createVNode(_component_Card, {
                          class: [
                            "cursor-pointer transition-all duration-200 hover:scale-105",
                            form.value.class === "paladino_cosmico" ? "ring-2 ring-cyan-400 bg-cyan-500/20" : "bg-white/10 hover:bg-white/20"
                          ],
                          onClick: ($event) => form.value.class = "paladino_cosmico"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardContent, { class: "p-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("div", { class: "text-4xl mb-3" }, "\u2694\uFE0F"),
                                  createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, " Paladino C\xF3smico "),
                                  createVNode("p", { class: "text-gray-300 text-sm mb-4" }, " Guerreiro sagrado, combina for\xE7a f\xEDsica com poder divino e prote\xE7\xE3o celestial. "),
                                  createVNode("div", { class: "space-y-1 text-sm text-gray-300" }, [
                                    createVNode("div", null, "\u{1F4AA} For\xE7a: 11"),
                                    createVNode("div", null, "\u2728 Sabedoria: 9"),
                                    createVNode("div", null, "\u{1F6E1}\uFE0F Defesa: 12"),
                                    createVNode("div", null, "\u2764\uFE0F Vida: 110")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"])
                      ])
                    ]),
                    createVNode(_component_Button, {
                      type: "submit",
                      disabled: loading.value || !form.value.name || !form.value.class,
                      class: "w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg disabled:opacity-50"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(loading.value ? "Criando Personagem..." : "Criar Personagem"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ], 32)
                ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/criar-personagem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=criar-personagem-D2xmKLcY.mjs.map
