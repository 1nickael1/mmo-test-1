import { defineComponent, unref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { c as cn } from './utils-H80jjgLf.mjs';
import { ProgressRoot, ProgressIndicator } from 'reka-ui';
import { r as reactiveOmit } from './index-B4_YPG6v.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Progress",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: 0 },
    max: {},
    getValueLabel: {},
    getValueText: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ProgressRoot), mergeProps(unref(delegatedProps), {
        class: unref(cn)(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(ProgressIndicator), {
              class: "h-full w-full flex-1 bg-primary transition-all",
              style: `transform: translateX(-${100 - ((_a = props.modelValue) != null ? _a : 0)}%);`
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ProgressIndicator), {
                class: "h-full w-full flex-1 bg-primary transition-all",
                style: `transform: translateX(-${100 - ((_b = props.modelValue) != null ? _b : 0)}%);`
              }, null, 8, ["style"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/progress/Progress.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Progress-D2Z_7baA.mjs.map
