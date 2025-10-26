import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$4 } from './CardContent-B8C0zdGx.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$5 } from './Input-CpuHzAlq.mjs';
import { _ as _sfc_main$6 } from './Button-CSVd3JRx.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BM3wg2Wn.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, unref, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { n as navigateTo } from './server.mjs';
import { u as useToast } from './useToast-DBrCK-1r.mjs';
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
  __name: "cadastro",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    const loading = ref(false);
    const { showError } = useToast();
    const handleRegister = async () => {
      if (form.value.password !== form.value.confirmPassword) {
        showError("As senhas n\xE3o coincidem.");
        return;
      }
      loading.value = true;
      try {
        const requestBody = {
          username: form.value.username,
          email: form.value.email,
          password: form.value.password
        };
        const response = await $fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        });
        if (response && response.success && response.data) {
          await navigateTo("/criar-personagem");
        }
      } catch (error) {
        showError("Dados inv\xE1lidos. Verifique as informa\xE7\xF5es fornecidas.");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = _sfc_main$3;
      const _component_CardHeader = _sfc_main$2;
      const _component_CardTitle = _sfc_main$1;
      const _component_CardContent = _sfc_main$4;
      const _component_Label = _sfc_main$1$1;
      const _component_Button = _sfc_main$6;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4" }, _attrs))}><div class="max-w-md w-full space-y-8 p-4 md:p-8"><div class="text-center"><h1 class="text-2xl md:text-4xl font-bold text-white mb-2"> Ninja Space RPG </h1><p class="text-gray-300 text-sm md:text-base"> Crie sua conta e comece sua aventura </p></div>`);
      _push(ssrRenderComponent(_component_Card, { class: "bg-white/10 backdrop-blur-sm border-white/20" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "text-white text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cadastro`);
                      } else {
                        return [
                          createTextVNode("Cadastro")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "text-white text-center" }, {
                      default: withCtx(() => [
                        createTextVNode("Cadastro")
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
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "username",
                    class: "text-white"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nome de Usu\xE1rio`);
                      } else {
                        return [
                          createTextVNode("Nome de Usu\xE1rio")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "username",
                    modelValue: form.value.username,
                    "onUpdate:modelValue": ($event) => form.value.username = $event,
                    type: "text",
                    placeholder: "Seu nome de usu\xE1rio",
                    required: "",
                    class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "email",
                    class: "text-white"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email`);
                      } else {
                        return [
                          createTextVNode("Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "email",
                    modelValue: form.value.email,
                    "onUpdate:modelValue": ($event) => form.value.email = $event,
                    type: "email",
                    placeholder: "seu@email.com",
                    required: "",
                    class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "password",
                    class: "text-white"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Senha`);
                      } else {
                        return [
                          createTextVNode("Senha")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "password",
                    modelValue: form.value.password,
                    "onUpdate:modelValue": ($event) => form.value.password = $event,
                    type: "password",
                    placeholder: "Sua senha",
                    required: "",
                    class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Label, {
                    for: "confirmPassword",
                    class: "text-white"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Confirmar Senha`);
                      } else {
                        return [
                          createTextVNode("Confirmar Senha")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "confirmPassword",
                    modelValue: form.value.confirmPassword,
                    "onUpdate:modelValue": ($event) => form.value.confirmPassword = $event,
                    type: "password",
                    placeholder: "Confirme sua senha",
                    required: "",
                    class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "submit",
                    disabled: loading.value || form.value.password !== form.value.confirmPassword,
                    class: "w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(loading.value ? "Criando conta..." : "Criar Conta")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(loading.value ? "Criando conta..." : "Criar Conta"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form><div class="mt-6 text-center"${_scopeId2}><p class="text-gray-300"${_scopeId2}> J\xE1 tem uma conta? `);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/login",
                    class: "text-blue-400 hover:text-blue-300 font-medium"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Fa\xE7a login aqui `);
                      } else {
                        return [
                          createTextVNode(" Fa\xE7a login aqui ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</p></div>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(handleRegister, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_Label, {
                          for: "username",
                          class: "text-white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Nome de Usu\xE1rio")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "username",
                          modelValue: form.value.username,
                          "onUpdate:modelValue": ($event) => form.value.username = $event,
                          type: "text",
                          placeholder: "Seu nome de usu\xE1rio",
                          required: "",
                          class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_Label, {
                          for: "email",
                          class: "text-white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "email",
                          modelValue: form.value.email,
                          "onUpdate:modelValue": ($event) => form.value.email = $event,
                          type: "email",
                          placeholder: "seu@email.com",
                          required: "",
                          class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_Label, {
                          for: "password",
                          class: "text-white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Senha")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "password",
                          modelValue: form.value.password,
                          "onUpdate:modelValue": ($event) => form.value.password = $event,
                          type: "password",
                          placeholder: "Sua senha",
                          required: "",
                          class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_Label, {
                          for: "confirmPassword",
                          class: "text-white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Confirmar Senha")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "confirmPassword",
                          modelValue: form.value.confirmPassword,
                          "onUpdate:modelValue": ($event) => form.value.confirmPassword = $event,
                          type: "password",
                          placeholder: "Confirme sua senha",
                          required: "",
                          class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_Button, {
                        type: "submit",
                        disabled: loading.value || form.value.password !== form.value.confirmPassword,
                        class: "w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(loading.value ? "Criando conta..." : "Criar Conta"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ], 32),
                    createVNode("div", { class: "mt-6 text-center" }, [
                      createVNode("p", { class: "text-gray-300" }, [
                        createTextVNode(" J\xE1 tem uma conta? "),
                        createVNode(_component_NuxtLink, {
                          to: "/login",
                          class: "text-blue-400 hover:text-blue-300 font-medium"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Fa\xE7a login aqui ")
                          ]),
                          _: 1
                        })
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
                  createVNode(_component_CardTitle, { class: "text-white text-center" }, {
                    default: withCtx(() => [
                      createTextVNode("Cadastro")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(handleRegister, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_Label, {
                        for: "username",
                        class: "text-white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Nome de Usu\xE1rio")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        id: "username",
                        modelValue: form.value.username,
                        "onUpdate:modelValue": ($event) => form.value.username = $event,
                        type: "text",
                        placeholder: "Seu nome de usu\xE1rio",
                        required: "",
                        class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_Label, {
                        for: "email",
                        class: "text-white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Email")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        id: "email",
                        modelValue: form.value.email,
                        "onUpdate:modelValue": ($event) => form.value.email = $event,
                        type: "email",
                        placeholder: "seu@email.com",
                        required: "",
                        class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_Label, {
                        for: "password",
                        class: "text-white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Senha")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        id: "password",
                        modelValue: form.value.password,
                        "onUpdate:modelValue": ($event) => form.value.password = $event,
                        type: "password",
                        placeholder: "Sua senha",
                        required: "",
                        class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_Label, {
                        for: "confirmPassword",
                        class: "text-white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Confirmar Senha")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), {
                        id: "confirmPassword",
                        modelValue: form.value.confirmPassword,
                        "onUpdate:modelValue": ($event) => form.value.confirmPassword = $event,
                        type: "password",
                        placeholder: "Confirme sua senha",
                        required: "",
                        class: "bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_Button, {
                      type: "submit",
                      disabled: loading.value || form.value.password !== form.value.confirmPassword,
                      class: "w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(loading.value ? "Criando conta..." : "Criar Conta"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ], 32),
                  createVNode("div", { class: "mt-6 text-center" }, [
                    createVNode("p", { class: "text-gray-300" }, [
                      createTextVNode(" J\xE1 tem uma conta? "),
                      createVNode(_component_NuxtLink, {
                        to: "/login",
                        class: "text-blue-400 hover:text-blue-300 font-medium"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Fa\xE7a login aqui ")
                        ]),
                        _: 1
                      })
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cadastro.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cadastro-MJ9uKLwB.mjs.map
