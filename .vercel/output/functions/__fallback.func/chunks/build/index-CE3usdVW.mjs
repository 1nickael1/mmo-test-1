import { n as navigateTo } from './server.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Button-CSVd3JRx.mjs';
import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1$1, c as _sfc_main$4 } from './CardContent-B8C0zdGx.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" }, _attrs))}><div class="container mx-auto px-4 py-16"><div class="text-center mb-16"><h1 class="text-6xl font-bold text-white mb-6">Ninja Space RPG</h1><p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"> Uma aventura \xE9pica combinando elementos de ninjas e estrat\xE9gia espacial. Crie seu personagem, desenvolva habilidades e construa seu imp\xE9rio! </p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/login"),
        size: "lg",
        class: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Entrar `);
          } else {
            return [
              createTextVNode(" Entrar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/cadastro"),
        variant: "outline",
        size: "lg",
        class: "border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cadastrar `);
          } else {
            return [
              createTextVNode(" Cadastrar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { class: "bg-white/10 backdrop-blur-sm border-white/20" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$1$1), { class: "text-white text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u2694\uFE0F Batalhas \xC9picas`);
                      } else {
                        return [
                          createTextVNode("\u2694\uFE0F Batalhas \xC9picas")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$1$1), { class: "text-white text-center" }, {
                      default: withCtx(() => [
                        createTextVNode("\u2694\uFE0F Batalhas \xC9picas")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-gray-300 text-center"${_scopeId2}> Enfrente NPCs poderosos em batalhas turn-based. Ganhe XP, recursos e itens raros! </p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-gray-300 text-center" }, " Enfrente NPCs poderosos em batalhas turn-based. Ganhe XP, recursos e itens raros! ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$1$1), { class: "text-white text-center" }, {
                    default: withCtx(() => [
                      createTextVNode("\u2694\uFE0F Batalhas \xC9picas")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-gray-300 text-center" }, " Enfrente NPCs poderosos em batalhas turn-based. Ganhe XP, recursos e itens raros! ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), { class: "bg-white/10 backdrop-blur-sm border-white/20" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$1$1), { class: "text-white text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u{1F3D7}\uFE0F Constru\xE7\xE3o Estrat\xE9gica`);
                      } else {
                        return [
                          createTextVNode("\u{1F3D7}\uFE0F Constru\xE7\xE3o Estrat\xE9gica")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$1$1), { class: "text-white text-center" }, {
                      default: withCtx(() => [
                        createTextVNode("\u{1F3D7}\uFE0F Constru\xE7\xE3o Estrat\xE9gica")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-gray-300 text-center"${_scopeId2}> Construa e melhore sua base espacial. Gerencie recursos e desenvolva tecnologias avan\xE7adas! </p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-gray-300 text-center" }, " Construa e melhore sua base espacial. Gerencie recursos e desenvolva tecnologias avan\xE7adas! ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$1$1), { class: "text-white text-center" }, {
                    default: withCtx(() => [
                      createTextVNode("\u{1F3D7}\uFE0F Constru\xE7\xE3o Estrat\xE9gica")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-gray-300 text-center" }, " Construa e melhore sua base espacial. Gerencie recursos e desenvolva tecnologias avan\xE7adas! ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), { class: "bg-white/10 backdrop-blur-sm border-white/20" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$1$1), { class: "text-white text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u{1F3AF} Progress\xE3o de Personagem`);
                      } else {
                        return [
                          createTextVNode("\u{1F3AF} Progress\xE3o de Personagem")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$1$1), { class: "text-white text-center" }, {
                      default: withCtx(() => [
                        createTextVNode("\u{1F3AF} Progress\xE3o de Personagem")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-gray-300 text-center"${_scopeId2}> Desenvolva habilidades \xFAnicas, suba de n\xEDvel e torne-se o ninja espacial mais poderoso! </p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-gray-300 text-center" }, " Desenvolva habilidades \xFAnicas, suba de n\xEDvel e torne-se o ninja espacial mais poderoso! ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$1$1), { class: "text-white text-center" }, {
                    default: withCtx(() => [
                      createTextVNode("\u{1F3AF} Progress\xE3o de Personagem")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-gray-300 text-center" }, " Desenvolva habilidades \xFAnicas, suba de n\xEDvel e torne-se o ninja espacial mais poderoso! ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CE3usdVW.mjs.map
