import { _ as _sfc_main$7 } from './Button-CSVd3JRx.mjs';
import { a as __nuxt_component_1$1 } from './server.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$8 } from './Input-CpuHzAlq.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, unref, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogClose, useForwardProps, DialogTitle, DialogDescription } from 'reka-ui';
import { c as cn } from './utils-H80jjgLf.mjs';
import { X } from 'lucide-vue-next';
import { r as reactiveOmit } from './index-B4_YPG6v.mjs';
import { u as useToast } from './useToast-DBrCK-1r.mjs';
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
import 'clsx';
import 'tailwind-merge';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Dialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(forwarded), _attrs), {
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/Dialog.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DialogContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(DialogContent), mergeProps(unref(forwarded), {
              class: unref(cn)(
                "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                        _push4(`<span class="sr-only"${_scopeId3}>Close</span>`);
                      } else {
                        return [
                          createVNode(unref(X), { class: "w-4 h-4" }),
                          createVNode("span", { class: "sr-only" }, "Close")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, {
                      default: withCtx(() => [
                        createVNode(unref(X), { class: "w-4 h-4" }),
                        createVNode("span", { class: "sr-only" }, "Close")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
              createVNode(unref(DialogContent), mergeProps(unref(forwarded), {
                class: unref(cn)(
                  "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, {
                    default: withCtx(() => [
                      createVNode(unref(X), { class: "w-4 h-4" }),
                      createVNode("span", { class: "sr-only" }, "Close")
                    ]),
                    _: 1
                  })
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogContent.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DialogHeader",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("flex flex-col gap-y-1.5 text-center sm:text-left", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DialogTitle",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTitle), mergeProps(unref(forwardedProps), {
        class: unref(cn)("text-lg font-semibold leading-none tracking-tight", props.class)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogTitle.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DialogDescription",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogDescription), mergeProps(unref(forwardedProps), {
        class: unref(cn)("text-sm text-muted-foreground", props.class)
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogDescription.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DialogFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/DialogFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const { showSuccess, showError } = useToast();
    const isAuthenticated = ref(null);
    const loading = ref(false);
    const characters = ref([]);
    const showCharacterEditor = ref(false);
    const selectedCharacter = ref(null);
    ref({
      username: "",
      password: ""
    });
    const editForm = ref({
      level: 1,
      xp: 0,
      stats: {
        health: 100,
        max_health: 100,
        strength: 10,
        agility: 10,
        defense: 10
      }
    });
    const logout = () => {
      isAuthenticated.value = false;
      characters.value = [];
      showCharacterEditor.value = false;
      selectedCharacter.value = null;
      (void 0).cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };
    const loadCharacters = async () => {
      var _a;
      loading.value = true;
      try {
        const response = await $fetch("/api/admin/characters");
        if (response.success) {
          characters.value = response.data.characters;
        }
      } catch (error) {
        showError(((_a = error.data) == null ? void 0 : _a.message) || "Erro ao carregar personagens");
      } finally {
        loading.value = false;
      }
    };
    const updateCharacter = async () => {
      var _a;
      if (!selectedCharacter.value) return;
      loading.value = true;
      try {
        const response = await $fetch("/api/admin/update-character", {
          method: "POST",
          body: {
            character_id: selectedCharacter.value.id,
            ...editForm.value
          }
        });
        if (response.success) {
          showSuccess("Personagem atualizado com sucesso!");
          showCharacterEditor.value = false;
          await loadCharacters();
        }
      } catch (error) {
        showError(((_a = error.data) == null ? void 0 : _a.message) || "Erro ao atualizar personagem");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$7;
      const _component_ClientOnly = __nuxt_component_1$1;
      const _component_Label = _sfc_main$1$1;
      const _component_Input = _sfc_main$8;
      const _component_Dialog = _sfc_main$6;
      const _component_DialogContent = _sfc_main$5;
      const _component_DialogHeader = _sfc_main$4;
      const _component_DialogTitle = _sfc_main$3;
      const _component_DialogDescription = _sfc_main$2;
      const _component_DialogFooter = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 dark:bg-gray-900" }, _attrs))}><header class="bg-white dark:bg-gray-800 shadow"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center py-6"><div class="flex items-center"><h1 class="text-3xl font-bold text-gray-900 dark:text-white"> Dashboard Administrativo </h1></div><div class="flex items-center space-x-4"><span class="text-sm text-gray-500 dark:text-gray-400"> Logado como: <span class="font-semibold text-red-600">root</span></span>`);
      _push(ssrRenderComponent(_component_Button, {
        onClick: logout,
        variant: "outline",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sair `);
          } else {
            return [
              createTextVNode(" Sair ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header><main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"><div class="px-4 py-6 sm:px-0">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></main>`);
      _push(ssrRenderComponent(_component_Dialog, {
        open: showCharacterEditor.value,
        "onUpdate:open": ($event) => showCharacterEditor.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Editar Personagem`);
                            } else {
                              return [
                                createTextVNode("Editar Personagem")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(` Modifique os atributos do personagem ${ssrInterpolate((_a = selectedCharacter.value) == null ? void 0 : _a.name)}`);
                            } else {
                              return [
                                createTextVNode(" Modifique os atributos do personagem " + toDisplayString((_b = selectedCharacter.value) == null ? void 0 : _b.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Editar Personagem")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, null, {
                            default: withCtx(() => {
                              var _a;
                              return [
                                createTextVNode(" Modifique os atributos do personagem " + toDisplayString((_a = selectedCharacter.value) == null ? void 0 : _a.name), 1)
                              ];
                            }),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (selectedCharacter.value) {
                    _push3(`<div class="space-y-4"${_scopeId2}><div class="grid grid-cols-2 gap-4"${_scopeId2}><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Label, { for: "level" }, {
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
                    _push3(ssrRenderComponent(_component_Input, {
                      id: "level",
                      modelValue: editForm.value.level,
                      "onUpdate:modelValue": ($event) => editForm.value.level = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "1",
                      max: "50"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Label, { for: "xp" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`XP`);
                        } else {
                          return [
                            createTextVNode("XP")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, {
                      id: "xp",
                      modelValue: editForm.value.xp,
                      "onUpdate:modelValue": ($event) => editForm.value.xp = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "0"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div><div class="grid grid-cols-2 gap-4"${_scopeId2}><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Label, { for: "health" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Vida`);
                        } else {
                          return [
                            createTextVNode("Vida")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, {
                      id: "health",
                      modelValue: editForm.value.stats.health,
                      "onUpdate:modelValue": ($event) => editForm.value.stats.health = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Label, { for: "max_health" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Vida M\xE1xima`);
                        } else {
                          return [
                            createTextVNode("Vida M\xE1xima")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, {
                      id: "max_health",
                      modelValue: editForm.value.stats.max_health,
                      "onUpdate:modelValue": ($event) => editForm.value.stats.max_health = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div><div class="grid grid-cols-3 gap-4"${_scopeId2}><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Label, { for: "strength" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`For\xE7a`);
                        } else {
                          return [
                            createTextVNode("For\xE7a")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, {
                      id: "strength",
                      modelValue: editForm.value.stats.strength,
                      "onUpdate:modelValue": ($event) => editForm.value.stats.strength = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Label, { for: "agility" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Agilidade`);
                        } else {
                          return [
                            createTextVNode("Agilidade")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, {
                      id: "agility",
                      modelValue: editForm.value.stats.agility,
                      "onUpdate:modelValue": ($event) => editForm.value.stats.agility = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Label, { for: "defense" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Defesa`);
                        } else {
                          return [
                            createTextVNode("Defesa")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Input, {
                      id: "defense",
                      modelValue: editForm.value.stats.defense,
                      "onUpdate:modelValue": ($event) => editForm.value.stats.defense = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_DialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Button, {
                          variant: "outline",
                          onClick: ($event) => showCharacterEditor.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Cancelar `);
                            } else {
                              return [
                                createTextVNode(" Cancelar ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Button, {
                          onClick: updateCharacter,
                          disabled: loading.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(loading.value ? "Salvando..." : "Salvar")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(loading.value ? "Salvando..." : "Salvar"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Button, {
                            variant: "outline",
                            onClick: ($event) => showCharacterEditor.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancelar ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_Button, {
                            onClick: updateCharacter,
                            disabled: loading.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(loading.value ? "Salvando..." : "Salvar"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Editar Personagem")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, null, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(" Modifique os atributos do personagem " + toDisplayString((_a = selectedCharacter.value) == null ? void 0 : _a.name), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    selectedCharacter.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode(_component_Label, { for: "level" }, {
                            default: withCtx(() => [
                              createTextVNode("N\xEDvel")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, {
                            id: "level",
                            modelValue: editForm.value.level,
                            "onUpdate:modelValue": ($event) => editForm.value.level = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "1",
                            max: "50"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_Label, { for: "xp" }, {
                            default: withCtx(() => [
                              createTextVNode("XP")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, {
                            id: "xp",
                            modelValue: editForm.value.xp,
                            "onUpdate:modelValue": ($event) => editForm.value.xp = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode(_component_Label, { for: "health" }, {
                            default: withCtx(() => [
                              createTextVNode("Vida")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, {
                            id: "health",
                            modelValue: editForm.value.stats.health,
                            "onUpdate:modelValue": ($event) => editForm.value.stats.health = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_Label, { for: "max_health" }, {
                            default: withCtx(() => [
                              createTextVNode("Vida M\xE1xima")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, {
                            id: "max_health",
                            modelValue: editForm.value.stats.max_health,
                            "onUpdate:modelValue": ($event) => editForm.value.stats.max_health = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                        createVNode("div", null, [
                          createVNode(_component_Label, { for: "strength" }, {
                            default: withCtx(() => [
                              createTextVNode("For\xE7a")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, {
                            id: "strength",
                            modelValue: editForm.value.stats.strength,
                            "onUpdate:modelValue": ($event) => editForm.value.stats.strength = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_Label, { for: "agility" }, {
                            default: withCtx(() => [
                              createTextVNode("Agilidade")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, {
                            id: "agility",
                            modelValue: editForm.value.stats.agility,
                            "onUpdate:modelValue": ($event) => editForm.value.stats.agility = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_Label, { for: "defense" }, {
                            default: withCtx(() => [
                              createTextVNode("Defesa")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Input, {
                            id: "defense",
                            modelValue: editForm.value.stats.defense,
                            "onUpdate:modelValue": ($event) => editForm.value.stats.defense = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode(_component_DialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          variant: "outline",
                          onClick: ($event) => showCharacterEditor.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancelar ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_Button, {
                          onClick: updateCharacter,
                          disabled: loading.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(loading.value ? "Salvando..." : "Salvar"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, null, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Editar Personagem")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription, null, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(" Modifique os atributos do personagem " + toDisplayString((_a = selectedCharacter.value) == null ? void 0 : _a.name), 1)
                          ];
                        }),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  selectedCharacter.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode(_component_Label, { for: "level" }, {
                          default: withCtx(() => [
                            createTextVNode("N\xEDvel")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          id: "level",
                          modelValue: editForm.value.level,
                          "onUpdate:modelValue": ($event) => editForm.value.level = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "1",
                          max: "50"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_Label, { for: "xp" }, {
                          default: withCtx(() => [
                            createTextVNode("XP")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          id: "xp",
                          modelValue: editForm.value.xp,
                          "onUpdate:modelValue": ($event) => editForm.value.xp = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode(_component_Label, { for: "health" }, {
                          default: withCtx(() => [
                            createTextVNode("Vida")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          id: "health",
                          modelValue: editForm.value.stats.health,
                          "onUpdate:modelValue": ($event) => editForm.value.stats.health = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_Label, { for: "max_health" }, {
                          default: withCtx(() => [
                            createTextVNode("Vida M\xE1xima")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          id: "max_health",
                          modelValue: editForm.value.stats.max_health,
                          "onUpdate:modelValue": ($event) => editForm.value.stats.max_health = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                      createVNode("div", null, [
                        createVNode(_component_Label, { for: "strength" }, {
                          default: withCtx(() => [
                            createTextVNode("For\xE7a")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          id: "strength",
                          modelValue: editForm.value.stats.strength,
                          "onUpdate:modelValue": ($event) => editForm.value.stats.strength = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_Label, { for: "agility" }, {
                          default: withCtx(() => [
                            createTextVNode("Agilidade")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          id: "agility",
                          modelValue: editForm.value.stats.agility,
                          "onUpdate:modelValue": ($event) => editForm.value.stats.agility = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_Label, { for: "defense" }, {
                          default: withCtx(() => [
                            createTextVNode("Defesa")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Input, {
                          id: "defense",
                          modelValue: editForm.value.stats.defense,
                          "onUpdate:modelValue": ($event) => editForm.value.stats.defense = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode(_component_DialogFooter, null, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        variant: "outline",
                        onClick: ($event) => showCharacterEditor.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancelar ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_Button, {
                        onClick: updateCharacter,
                        disabled: loading.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(loading.value ? "Salvando..." : "Salvar"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-D-wwyOjc.mjs.map
