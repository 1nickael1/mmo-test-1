import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineComponent, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, toRaw, computed, isRef, isReactive, toRef, hasInjectionContext, inject, ref, reactive, effectScope, getCurrentScope, onScopeDispose, watch, nextTick, toRefs, markRaw, defineAsyncComponent, unref, shallowReactive, Suspense, Fragment, useSSRContext, createApp, mergeProps, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, isReadonly, isShallow, useAttrs, watchEffect, openBlock, renderList, createBlock, normalizeStyle, normalizeClass, withCtx, renderSlot, createCommentVNode, createElementVNode, normalizeProps, createTextVNode, toDisplayString } from 'vue';
import { o as hasProtocol, p as isScriptProtocol, m as joinURL, w as withQuery, q as sanitizeStatusCode, t as getContext, $ as $fetch, v as createHooks, x as executeAsync, c as createError$1, y as toRouteMatcher, z as createRouter$1, A as defu } from '../nitro/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode, ssrRenderAttrs } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.19.3";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const __nuxt_page_meta$4 = {
  layout: false
};
const __nuxt_page_meta$3 = {
  layout: false
};
const __nuxt_page_meta$2 = {
  layout: false
};
const __nuxt_page_meta$1 = {
  layout: false
};
const __nuxt_page_meta = {
  layout: false
};
const _routes = [
  {
    name: "home",
    path: "/home",
    meta: { "middleware": "auth" },
    component: () => import('./home-lrswP4FR.mjs')
  },
  {
    name: "loja",
    path: "/loja",
    meta: { "middleware": "auth" },
    component: () => import('./loja-P0ICbdKg.mjs')
  },
  {
    name: "admin",
    path: "/admin",
    meta: __nuxt_page_meta$4 || {},
    component: () => import('./admin-D-wwyOjc.mjs')
  },
  {
    name: "index",
    path: "/",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./index-CE3usdVW.mjs')
  },
  {
    name: "login",
    path: "/login",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./login-BRWTNNl9.mjs')
  },
  {
    name: "missoes",
    path: "/missoes",
    meta: { "middleware": "auth" },
    component: () => import('./missoes-0QAfX9ID.mjs')
  },
  {
    name: "batalhas",
    path: "/batalhas",
    meta: { "middleware": "auth" },
    component: () => import('./batalhas-DSCo2P_p.mjs')
  },
  {
    name: "cadastro",
    path: "/cadastro",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./cadastro-MJ9uKLwB.mjs')
  },
  {
    name: "rankings",
    path: "/rankings",
    meta: { "middleware": "auth" },
    component: () => import('./rankings-KcE7_ojk.mjs')
  },
  {
    name: "melhorias",
    path: "/melhorias",
    meta: { "middleware": "auth" },
    component: () => import('./melhorias-BsQYJFvk.mjs')
  },
  {
    name: "mineracao",
    path: "/mineracao",
    component: () => import('./mineracao-B2v2mmFC.mjs')
  },
  {
    name: "inventario",
    path: "/inventario",
    meta: { "middleware": "auth" },
    component: () => import('./inventario-DRDBRsJg.mjs')
  },
  {
    name: "personagem",
    path: "/personagem",
    meta: { "middleware": "auth" },
    component: () => import('./personagem-CfTfOYeS.mjs')
  },
  {
    name: "habilidades",
    path: "/habilidades",
    meta: { "middleware": "auth" },
    component: () => import('./habilidades-b6_sG02W.mjs')
  },
  {
    name: "equipamentos",
    path: "/equipamentos",
    meta: { "middleware": "auth" },
    component: () => import('./equipamentos-DQ6svnrX.mjs')
  },
  {
    name: "modo-historia",
    path: "/modo-historia",
    meta: { "middleware": "auth" },
    component: () => import('./modo-historia-CuxLmbeS.mjs')
  },
  {
    name: "criar-personagem",
    path: "/criar-personagem",
    meta: { ...__nuxt_page_meta || {}, ...{ "middleware": "auth" } },
    component: () => import('./criar-personagem-D2xmKLcY.mjs')
  },
  {
    name: "selecionar-personagem",
    path: "/selecionar-personagem",
    component: () => import('./selecionar-personagem-DIjGWaa0.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => import('./auth-DEzccLoD.mjs')
};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      if (to.matched[to.matched.length - 1]?.components?.default === from.matched[from.matched.length - 1]?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0) {
        return nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && true) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (true)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = { deep: true };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (true)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = action(prop, key);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store) {
  {
    const rawStore = toRaw(store);
    const refs = {};
    for (const key in rawStore) {
      const value = rawStore[key];
      if (value.effect) {
        refs[key] = // ...
        computed({
          get: () => store[key],
          set(value2) {
            store[key] = value2;
          }
        });
      } else if (isRef(value) || isReactive(value)) {
        refs[key] = // ---
        toRef(store, key);
      }
    }
    return refs;
  }
}
const __nuxt_component_0 = defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_1$1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin$1,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  plugin,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4
];
const layouts = {
  default: defineAsyncComponent(() => import('./default-Dg6D57NF.mjs').then((m) => m.default || m))
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route?.meta.layoutTransition ?? appLayoutTransition;
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              isRenderingNewLayout: (name) => {
                return name !== previouslyRenderedLayout && name === layout.value;
              },
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
var qt = Object.defineProperty;
var Jt = (s, a, t) => a in s ? qt(s, a, { enumerable: true, configurable: true, writable: true, value: t }) : s[a] = t;
var x = (s, a, t) => Jt(s, typeof a != "symbol" ? a + "" : a, t);
let vt = 0;
class ae {
  constructor() {
    x(this, "subscribers");
    x(this, "toasts");
    x(this, "subscribe", (a) => (this.subscribers.push(a), () => {
      const t = this.subscribers.indexOf(a);
      this.subscribers.splice(t, 1);
    }));
    x(this, "publish", (a) => {
      this.subscribers.forEach((t) => t(a));
    });
    x(this, "addToast", (a) => {
      this.publish(a), this.toasts = [...this.toasts, a];
    });
    x(this, "create", (a) => {
      var P;
      const { message: t, ...n } = a, r = typeof a.id == "number" || a.id && ((P = a.id) == null ? void 0 : P.length) > 0 ? a.id : vt++, g = this.toasts.find((h2) => h2.id === r), T = a.dismissible === void 0 ? true : a.dismissible;
      return g ? this.toasts = this.toasts.map((h2) => h2.id === r ? (this.publish({ ...h2, ...a, id: r, title: t }), {
        ...h2,
        ...a,
        id: r,
        dismissible: T,
        title: t
      }) : h2) : this.addToast({ title: t, ...n, dismissible: T, id: r }), r;
    });
    x(this, "dismiss", (a) => (a || this.toasts.forEach((t) => {
      this.subscribers.forEach(
        (n) => n({ id: t.id, dismiss: true })
      );
    }), this.subscribers.forEach((t) => t({ id: a, dismiss: true })), a));
    x(this, "message", (a, t) => this.create({ ...t, message: a, type: "default" }));
    x(this, "error", (a, t) => this.create({ ...t, type: "error", message: a }));
    x(this, "success", (a, t) => this.create({ ...t, type: "success", message: a }));
    x(this, "info", (a, t) => this.create({ ...t, type: "info", message: a }));
    x(this, "warning", (a, t) => this.create({ ...t, type: "warning", message: a }));
    x(this, "loading", (a, t) => this.create({ ...t, type: "loading", message: a }));
    x(this, "promise", (a, t) => {
      if (!t)
        return;
      let n;
      t.loading !== void 0 && (n = this.create({
        ...t,
        promise: a,
        type: "loading",
        message: t.loading,
        description: typeof t.description != "function" ? t.description : void 0
      }));
      const r = a instanceof Promise ? a : a();
      let g = n !== void 0, T;
      const P = r.then(async (u) => {
        if (T = ["resolve", u], se(u) && !u.ok) {
          g = false;
          const m = typeof t.error == "function" ? await t.error(
            `HTTP error! status: ${u.status}`
          ) : t.error, y = typeof t.description == "function" ? (
            // @ts-expect-error
            await t.description(`HTTP error! status: ${u.status}`)
          ) : t.description;
          this.create({ id: n, type: "error", message: m, description: y });
        } else if (t.success !== void 0) {
          g = false;
          const m = typeof t.success == "function" ? await t.success(u) : t.success, y = typeof t.description == "function" ? await t.description(u) : t.description;
          this.create({ id: n, type: "success", message: m, description: y });
        }
      }).catch(async (u) => {
        if (T = ["reject", u], t.error !== void 0) {
          g = false;
          const m = typeof t.error == "function" ? await t.error(u) : t.error, y = typeof t.description == "function" ? await t.description(
            u
          ) : t.description;
          this.create({ id: n, type: "error", message: m, description: y });
        }
      }).finally(() => {
        var u;
        g && (this.dismiss(n), n = void 0), (u = t.finally) == null || u.call(t);
      }), h2 = () => new Promise(
        (u, m) => P.then(
          () => T[0] === "reject" ? m(T[1]) : u(T[1])
        ).catch(m)
      );
      return typeof n != "string" && typeof n != "number" ? { unwrap: h2 } : Object.assign(n, { unwrap: h2 });
    });
    x(this, "custom", (a, t) => {
      const n = (t == null ? void 0 : t.id) || vt++;
      return this.publish({ component: a, id: n, ...t }), n;
    });
    this.subscribers = [], this.toasts = [];
  }
}
const E = new ae();
function oe(s, a) {
  const t = (a == null ? void 0 : a.id) || vt++;
  return E.create({
    message: s,
    id: t,
    type: "default",
    ...a
  }), t;
}
const se = (s) => s && typeof s == "object" && "ok" in s && typeof s.ok == "boolean" && "status" in s && typeof s.status == "number", ne = oe, re = () => E.toasts, Ke = Object.assign(
  ne,
  {
    success: E.success,
    info: E.info,
    warning: E.warning,
    error: E.error,
    custom: E.custom,
    message: E.message,
    promise: E.promise,
    dismiss: E.dismiss,
    loading: E.loading
  },
  {
    getHistory: re
  }
);
function ut(s) {
  return s.label !== void 0;
}
function ie() {
  const s = ref(false);
  return watchEffect(() => {
    const a = () => {
      s.value = (void 0).hidden;
    };
    return (void 0).addEventListener("visibilitychange", a), () => (void 0).removeEventListener("visibilitychange", a);
  }), {
    isDocumentHidden: s
  };
}
const le = ["aria-live", "data-rich-colors", "data-styled", "data-mounted", "data-promise", "data-removed", "data-visible", "data-y-position", "data-x-position", "data-index", "data-front", "data-swiping", "data-dismissible", "data-type", "data-invert", "data-swipe-out", "data-expanded"], de = ["aria-label", "data-disabled"], Wt = 4e3, ue = 20, ce = 200, fe = /* @__PURE__ */ defineComponent({
  __name: "Toast",
  props: {
    toast: {},
    toasts: {},
    index: {},
    expanded: { type: Boolean },
    invert: { type: Boolean },
    heights: {},
    gap: {},
    position: {},
    visibleToasts: {},
    expandByDefault: { type: Boolean },
    closeButton: { type: Boolean },
    interacting: { type: Boolean },
    style: {},
    cancelButtonStyle: {},
    actionButtonStyle: {},
    duration: {},
    class: {},
    unstyled: { type: Boolean },
    descriptionClass: {},
    loadingIcon: {},
    classes: {},
    icons: {},
    closeButtonAriaLabel: {},
    pauseWhenPageIsHidden: { type: Boolean },
    cn: { type: Function },
    defaultRichColors: { type: Boolean }
  },
  emits: ["update:heights", "removeToast"],
  setup(s, { emit: a }) {
    const t = s, n = a, r = ref(false), g = ref(false), T = ref(false), P = ref(false), h2 = ref(false), u = ref(0), m = ref(0), y = ref(
      t.toast.duration || t.duration || Wt
    ), H = ref(null), B = ref(null), pt = computed(() => t.index === 0), ht = computed(() => t.index + 1 <= t.visibleToasts), I = computed(() => t.toast.type), Y = computed(() => t.toast.dismissible !== false), gt = computed(() => t.toast.class || ""), o = computed(() => t.descriptionClass || ""), i = t.toast.style || {}, l = computed(
      () => t.heights.findIndex((e) => e.toastId === t.toast.id) || 0
    ), k = computed(() => t.toast.closeButton ?? t.closeButton);
    computed(
      () => t.toast.duration || t.duration || Wt
    );
    const b = ref(0), z = ref(0), O = ref(null), G = computed(() => t.position.split("-")), Q = computed(() => G.value[0]), ot = computed(() => G.value[1]), st = computed(() => typeof t.toast.title != "string"), nt = computed(
      () => typeof t.toast.description != "string"
    ), rt = computed(() => t.heights.reduce((e, c, S) => S >= l.value ? e : e + c.height, 0)), it = ie(), lt = computed(() => t.toast.invert || t.invert), j = computed(() => I.value === "loading"), M = computed(() => l.value * t.gap + rt.value || 0);
    function V() {
      g.value = true, u.value = M.value;
      const e = t.heights.filter(
        (c) => c.toastId !== t.toast.id
      );
      n("update:heights", e), setTimeout(() => {
        n("removeToast", t.toast);
      }, ce);
    }
    function bt() {
      var e, c;
      if (j.value || !Y.value)
        return {};
      V(), (c = (e = t.toast).onDismiss) == null || c.call(e, t.toast);
    }
    function Xt(e) {
      j.value || !Y.value || (H.value = /* @__PURE__ */ new Date(), u.value = M.value, e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (T.value = true, O.value = { x: e.clientX, y: e.clientY }));
    }
    function Gt() {
      var C, $, w, q, J;
      if (P.value || !Y) return;
      O.value = null;
      const e = Number(
        ((C = B.value) == null ? void 0 : C.style.getPropertyValue("--swipe-amount").replace("px", "")) || 0
      ), c = (/* @__PURE__ */ new Date()).getTime() - (($ = H.value) == null ? void 0 : $.getTime()), S = Math.abs(e) / c;
      if (Math.abs(e) >= ue || S > 0.11) {
        u.value = M.value, (q = (w = t.toast).onDismiss) == null || q.call(w, t.toast), V(), P.value = true, h2.value = false;
        return;
      }
      (J = B.value) == null || J.style.setProperty("--swipe-amount", "0px"), T.value = false;
    }
    function Qt(e) {
      var $, w;
      if (!O.value || !Y.value) return;
      const c = e.clientY - O.value.y, S = (($ = (void 0).getSelection()) == null ? void 0 : $.toString().length) > 0, C = Q.value === "top" ? Math.min(0, c) : Math.max(0, c);
      Math.abs(C) > 0 && (h2.value = true), !S && ((w = B.value) == null || w.style.setProperty("--swipe-amount", `${C}px`));
    }
    return watchEffect((e) => {
      if (t.toast.promise && I.value === "loading" || t.toast.duration === 1 / 0 || t.toast.type === "loading")
        return;
      let c;
      const S = () => {
        if (z.value < b.value) {
          const $ = (/* @__PURE__ */ new Date()).getTime() - b.value;
          y.value = y.value - $;
        }
        z.value = (/* @__PURE__ */ new Date()).getTime();
      }, C = () => {
        y.value !== 1 / 0 && (b.value = (/* @__PURE__ */ new Date()).getTime(), c = setTimeout(() => {
          var $, w;
          (w = ($ = t.toast).onAutoClose) == null || w.call($, t.toast), V();
        }, y.value));
      };
      t.expanded || t.interacting || t.pauseWhenPageIsHidden && it ? S() : C(), e(() => {
        clearTimeout(c);
      });
    }), watch(
      () => t.toast.delete,
      () => {
        t.toast.delete && V();
      },
      {
        deep: true
      }
    ), (e, c) => {
      var S, C, $, w, q, J, wt, kt, xt, Tt, Bt, St, Ct, $t, Et, It, Pt, Dt, Ht, zt, Mt, Ot, At, Lt, Yt, Nt, Rt;
      return openBlock(), createElementBlock("li", {
        ref_key: "toastRef",
        ref: B,
        "aria-live": e.toast.important ? "assertive" : "polite",
        "aria-atomic": "true",
        role: "status",
        tabindex: "0",
        "data-sonner-toast": "true",
        class: normalizeClass(
          e.cn(
            t.class,
            gt.value,
            (S = e.classes) == null ? void 0 : S.toast,
            (C = e.toast.classes) == null ? void 0 : C.toast,
            // @ts-ignore
            ($ = e.classes) == null ? void 0 : $[I.value],
            // @ts-ignore
            (q = (w = e.toast) == null ? void 0 : w.classes) == null ? void 0 : q[I.value]
          )
        ),
        "data-rich-colors": e.toast.richColors ?? e.defaultRichColors,
        "data-styled": !(e.toast.component || (J = e.toast) != null && J.unstyled || e.unstyled),
        "data-mounted": r.value,
        "data-promise": !!e.toast.promise,
        "data-removed": g.value,
        "data-visible": ht.value,
        "data-y-position": Q.value,
        "data-x-position": ot.value,
        "data-index": e.index,
        "data-front": pt.value,
        "data-swiping": T.value,
        "data-dismissible": Y.value,
        "data-type": I.value,
        "data-invert": lt.value,
        "data-swipe-out": P.value,
        "data-expanded": !!(e.expanded || e.expandByDefault && r.value),
        style: normalizeStyle({
          "--index": e.index,
          "--toasts-before": e.index,
          "--z-index": e.toasts.length - e.index,
          "--offset": `${g.value ? u.value : M.value}px`,
          "--initial-height": e.expandByDefault ? "auto" : `${m.value}px`,
          ...e.style,
          ...unref(i)
        }),
        onPointerdown: Xt,
        onPointerup: Gt,
        onPointermove: Qt
      }, [
        k.value && !e.toast.component ? (openBlock(), createElementBlock("button", {
          key: 0,
          "aria-label": e.closeButtonAriaLabel || "Close toast",
          "data-disabled": j.value,
          "data-close-button": "true",
          class: normalizeClass(e.cn((wt = e.classes) == null ? void 0 : wt.closeButton, (xt = (kt = e.toast) == null ? void 0 : kt.classes) == null ? void 0 : xt.closeButton)),
          onClick: bt
        }, [
          (Tt = e.icons) != null && Tt.close ? (openBlock(), createBlock(resolveDynamicComponent((Bt = e.icons) == null ? void 0 : Bt.close), { key: 0 })) : renderSlot(e.$slots, "close-icon", { key: 1 })
        ], 10, de)) : createCommentVNode("", true),
        e.toast.component ? (openBlock(), createBlock(resolveDynamicComponent(e.toast.component), mergeProps({ key: 1 }, e.toast.componentProps, { onCloseToast: bt }), null, 16)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          I.value !== "default" || e.toast.icon || e.toast.promise ? (openBlock(), createElementBlock("div", {
            key: 0,
            "data-icon": "",
            class: normalizeClass(e.cn((St = e.classes) == null ? void 0 : St.icon, ($t = (Ct = e.toast) == null ? void 0 : Ct.classes) == null ? void 0 : $t.icon))
          }, [
            e.toast.icon ? (openBlock(), createBlock(resolveDynamicComponent(e.toast.icon), { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              I.value === "loading" ? renderSlot(e.$slots, "loading-icon", { key: 0 }) : I.value === "success" ? renderSlot(e.$slots, "success-icon", { key: 1 }) : I.value === "error" ? renderSlot(e.$slots, "error-icon", { key: 2 }) : I.value === "warning" ? renderSlot(e.$slots, "warning-icon", { key: 3 }) : I.value === "info" ? renderSlot(e.$slots, "info-icon", { key: 4 }) : createCommentVNode("", true)
            ], 64))
          ], 2)) : createCommentVNode("", true),
          createElementVNode("div", {
            "data-content": "",
            class: normalizeClass(e.cn((Et = e.classes) == null ? void 0 : Et.content, (Pt = (It = e.toast) == null ? void 0 : It.classes) == null ? void 0 : Pt.content))
          }, [
            createElementVNode("div", {
              "data-title": "",
              class: normalizeClass(e.cn((Dt = e.classes) == null ? void 0 : Dt.title, (Ht = e.toast.classes) == null ? void 0 : Ht.title))
            }, [
              st.value ? (openBlock(), createBlock(resolveDynamicComponent(e.toast.title), normalizeProps(mergeProps({ key: 0 }, e.toast.componentProps)), null, 16)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(e.toast.title), 1)
              ], 64))
            ], 2),
            e.toast.description ? (openBlock(), createElementBlock("div", {
              key: 0,
              "data-description": "",
              class: normalizeClass(
                e.cn(
                  e.descriptionClass,
                  o.value,
                  (zt = e.classes) == null ? void 0 : zt.description,
                  (Mt = e.toast.classes) == null ? void 0 : Mt.description
                )
              )
            }, [
              nt.value ? (openBlock(), createBlock(resolveDynamicComponent(e.toast.description), normalizeProps(mergeProps({ key: 0 }, e.toast.componentProps)), null, 16)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(e.toast.description), 1)
              ], 64))
            ], 2)) : createCommentVNode("", true)
          ], 2),
          e.toast.cancel ? (openBlock(), createElementBlock("button", {
            key: 1,
            style: normalizeStyle(e.toast.cancelButtonStyle || e.cancelButtonStyle),
            class: normalizeClass(e.cn((Ot = e.classes) == null ? void 0 : Ot.cancelButton, (At = e.toast.classes) == null ? void 0 : At.cancelButton)),
            "data-button": "",
            "data-cancel": "",
            onClick: c[0] || (c[0] = (Z) => {
              var _, tt;
              unref(ut)(e.toast.cancel) && Y.value && ((tt = (_ = e.toast.cancel).onClick) == null || tt.call(_, Z), V());
            })
          }, toDisplayString(unref(ut)(e.toast.cancel) ? (Lt = e.toast.cancel) == null ? void 0 : Lt.label : e.toast.cancel), 7)) : createCommentVNode("", true),
          e.toast.action ? (openBlock(), createElementBlock("button", {
            key: 2,
            style: normalizeStyle(e.toast.actionButtonStyle || e.actionButtonStyle),
            class: normalizeClass(e.cn((Yt = e.classes) == null ? void 0 : Yt.actionButton, (Nt = e.toast.classes) == null ? void 0 : Nt.actionButton)),
            "data-button": "",
            "data-action": "",
            onClick: c[1] || (c[1] = (Z) => {
              var _, tt;
              unref(ut)(e.toast.action) && (Z.defaultPrevented || ((tt = (_ = e.toast.action).onClick) == null || tt.call(_, Z), !Z.defaultPrevented && V()));
            })
          }, toDisplayString(unref(ut)(e.toast.action) ? (Rt = e.toast.action) == null ? void 0 : Rt.label : e.toast.action), 7)) : createCommentVNode("", true)
        ], 64))
      ], 46, le);
    };
  }
}), at = (s, a) => {
  const t = s.__vccOpts || s;
  for (const [n, r] of a)
    t[n] = r;
  return t;
}, pe = {}, he = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stoke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function ge(s, a) {
  return openBlock(), createElementBlock("svg", he, a[0] || (a[0] = [
    createElementVNode("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }, null, -1),
    createElementVNode("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    }, null, -1)
  ]));
}
const me = /* @__PURE__ */ at(pe, [["render", ge]]), ve = ["data-visible"], ye = { class: "sonner-spinner" }, be = /* @__PURE__ */ defineComponent({
  __name: "Loader",
  props: {
    visible: { type: Boolean }
  },
  setup(s) {
    const a = Array(12).fill(0);
    return (t, n) => (openBlock(), createElementBlock("div", {
      class: "sonner-loading-wrapper",
      "data-visible": t.visible
    }, [
      createElementVNode("div", ye, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(a), (r) => (openBlock(), createElementBlock("div", {
          key: `spinner-bar-${r}`,
          class: "sonner-loading-bar"
        }))), 128))
      ])
    ], 8, ve));
  }
}), we = {}, ke = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function xe(s, a) {
  return openBlock(), createElementBlock("svg", ke, a[0] || (a[0] = [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Te = /* @__PURE__ */ at(we, [["render", xe]]), Be = {}, Se = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Ce(s, a) {
  return openBlock(), createElementBlock("svg", Se, a[0] || (a[0] = [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const $e = /* @__PURE__ */ at(Be, [["render", Ce]]), Ee = {}, Ie = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Pe(s, a) {
  return openBlock(), createElementBlock("svg", Ie, a[0] || (a[0] = [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const De = /* @__PURE__ */ at(Ee, [["render", Pe]]), He = {}, ze = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Me(s, a) {
  return openBlock(), createElementBlock("svg", ze, a[0] || (a[0] = [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Oe = /* @__PURE__ */ at(He, [["render", Me]]), Ae = ["aria-label"], Le = ["dir", "data-theme", "data-rich-colors", "data-y-position", "data-x-position", "data-lifted"], Ye = 3, Ut = "32px", Ne = 356, Re = 14;
function je(...s) {
  return s.filter(Boolean).join(" ");
}
const Ve = /* @__PURE__ */ defineComponent({
  name: "Toaster",
  inheritAttrs: false,
  __name: "Toaster",
  props: {
    invert: { type: Boolean, default: false },
    theme: { default: "light" },
    position: { default: "bottom-right" },
    hotkey: { default: () => ["altKey", "KeyT"] },
    richColors: { type: Boolean, default: false },
    expand: { type: Boolean, default: false },
    duration: {},
    gap: { default: Re },
    visibleToasts: { default: Ye },
    closeButton: { type: Boolean, default: false },
    toastOptions: { default: () => ({}) },
    class: { default: "" },
    style: { default: () => ({}) },
    offset: { default: Ut },
    dir: { default: "auto" },
    icons: {},
    containerAriaLabel: { default: "Notifications" },
    pauseWhenPageIsHidden: { type: Boolean, default: false },
    cn: { type: Function, default: je }
  },
  setup(s) {
    const a = s;
    function t() {
      return "ltr";
    }
    const n = useAttrs(), r = ref([]), g = computed(() => (o, i) => r.value.filter(
      (l) => !l.position && i === 0 || l.position === o
    )), T = computed(() => {
      const o = r.value.filter((i) => i.position).map((i) => i.position);
      return o.length > 0 ? Array.from(new Set([a.position].concat(o))) : [a.position];
    }), P = ref([]), h2 = ref(false), u = ref(false), m = ref(
      a.theme !== "system" ? a.theme : "light"
    ), y = ref(null), H = ref(null), B = ref(false), pt = a.hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    function ht(o) {
      var i;
      (i = r.value.find((l) => l.id === o.id)) != null && i.delete || E.dismiss(o.id), r.value = r.value.filter(({ id: l }) => l !== o.id);
    }
    function I(o) {
      var i, l;
      B.value && !((l = (i = o.currentTarget) == null ? void 0 : i.contains) != null && l.call(i, o.relatedTarget)) && (B.value = false, H.value && (H.value.focus({ preventScroll: true }), H.value = null));
    }
    function Y(o) {
      o.target instanceof HTMLElement && o.target.dataset.dismissible === "false" || B.value || (B.value = true, H.value = o.relatedTarget);
    }
    function gt(o) {
      o.target && o.target instanceof HTMLElement && o.target.dataset.dismissible === "false" || (u.value = true);
    }
    return watchEffect((o) => {
      const i = E.subscribe((l) => {
        if (l.dismiss) {
          r.value = r.value.map(
            (k) => k.id === l.id ? { ...k, delete: true } : k
          );
          return;
        }
        nextTick(() => {
          const k = r.value.findIndex(
            (b) => b.id === l.id
          );
          k !== -1 ? r.value = [
            ...r.value.slice(0, k),
            { ...r.value[k], ...l },
            ...r.value.slice(k + 1)
          ] : r.value = [l, ...r.value];
        });
      });
      o(i);
    }), watch(
      () => a.theme,
      (o) => {
        if (o !== "system") {
          m.value = o;
          return;
        }
        if (o === "system" && ((void 0).matchMedia && (void 0).matchMedia("(prefers-color-scheme: dark)").matches ? m.value = "dark" : m.value = "light"), "undefined" > "u") return;
      }
    ), watchEffect(() => {
      y.value && H.value && (H.value.focus({ preventScroll: true }), H.value = null, B.value = false);
    }), watchEffect(() => {
      r.value.length <= 1 && (h2.value = false);
    }), watchEffect((o) => {
    }), (o, i) => (openBlock(), createElementBlock("section", {
      "aria-label": `${o.containerAriaLabel} ${unref(pt)}`,
      tabIndex: -1,
      "aria-live": "polite",
      "aria-relevant": "additions text",
      "aria-atomic": "false"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(T.value, (l, k) => {
        var b;
        return openBlock(), createElementBlock("ol", mergeProps({
          key: l,
          ref_for: true,
          ref_key: "listRef",
          ref: y,
          "data-sonner-toaster": "",
          class: a.class,
          dir: o.dir === "auto" ? t() : o.dir,
          tabIndex: -1,
          "data-theme": o.theme,
          "data-rich-colors": o.richColors,
          "data-y-position": l.split("-")[0],
          "data-x-position": l.split("-")[1],
          "data-lifted": h2.value && r.value.length > 1 && !o.expand,
          style: {
            "--front-toast-height": `${(b = P.value[0]) == null ? void 0 : b.height}px`,
            "--offset": typeof o.offset == "number" ? `${o.offset}px` : o.offset || Ut,
            "--width": `${Ne}px`,
            "--gap": `${o.gap}px`,
            ...o.style,
            ...unref(n).style
          }
        }, o.$attrs, {
          onBlur: I,
          onFocus: Y,
          onMouseenter: i[1] || (i[1] = () => h2.value = true),
          onMousemove: i[2] || (i[2] = () => h2.value = true),
          onMouseleave: i[3] || (i[3] = () => {
            u.value || (h2.value = false);
          }),
          onPointerdown: gt,
          onPointerup: i[4] || (i[4] = () => u.value = false)
        }), [
          (openBlock(true), createElementBlock(Fragment, null, renderList(g.value(l, k), (z, O) => {
            var G, Q, ot, st, nt, rt, it, lt, j;
            return openBlock(), createBlock(fe, {
              key: z.id,
              heights: P.value.filter((M) => M.position === z.position),
              icons: o.icons,
              index: O,
              toast: z,
              defaultRichColors: o.richColors,
              duration: ((G = o.toastOptions) == null ? void 0 : G.duration) ?? o.duration,
              class: normalizeClass(((Q = o.toastOptions) == null ? void 0 : Q.class) ?? ""),
              descriptionClass: (ot = o.toastOptions) == null ? void 0 : ot.descriptionClass,
              invert: o.invert,
              visibleToasts: o.visibleToasts,
              closeButton: ((st = o.toastOptions) == null ? void 0 : st.closeButton) ?? o.closeButton,
              interacting: u.value,
              position: l,
              style: normalizeStyle((nt = o.toastOptions) == null ? void 0 : nt.style),
              unstyled: (rt = o.toastOptions) == null ? void 0 : rt.unstyled,
              classes: (it = o.toastOptions) == null ? void 0 : it.classes,
              cancelButtonStyle: (lt = o.toastOptions) == null ? void 0 : lt.cancelButtonStyle,
              actionButtonStyle: (j = o.toastOptions) == null ? void 0 : j.actionButtonStyle,
              toasts: r.value.filter((M) => M.position === z.position),
              expandByDefault: o.expand,
              gap: o.gap,
              expanded: h2.value,
              pauseWhenPageIsHidden: o.pauseWhenPageIsHidden,
              cn: o.cn,
              "onUpdate:heights": i[0] || (i[0] = (M) => {
                P.value = M;
              }),
              onRemoveToast: ht
            }, {
              "close-icon": withCtx(() => [
                renderSlot(o.$slots, "close-icon", {}, () => [
                  createVNode(me)
                ])
              ]),
              "loading-icon": withCtx(() => [
                renderSlot(o.$slots, "loading-icon", {}, () => [
                  createVNode(be, {
                    visible: z.type === "loading"
                  }, null, 8, ["visible"])
                ])
              ]),
              "success-icon": withCtx(() => [
                renderSlot(o.$slots, "success-icon", {}, () => [
                  createVNode(Te)
                ])
              ]),
              "error-icon": withCtx(() => [
                renderSlot(o.$slots, "error-icon", {}, () => [
                  createVNode(Oe)
                ])
              ]),
              "warning-icon": withCtx(() => [
                renderSlot(o.$slots, "warning-icon", {}, () => [
                  createVNode(De)
                ])
              ]),
              "info-icon": withCtx(() => [
                renderSlot(o.$slots, "info-icon", {}, () => [
                  createVNode($e)
                ])
              ]),
              _: 2
            }, 1032, ["heights", "icons", "index", "toast", "defaultRichColors", "duration", "class", "descriptionClass", "invert", "visibleToasts", "closeButton", "interacting", "position", "style", "unstyled", "classes", "cancelButtonStyle", "actionButtonStyle", "toasts", "expandByDefault", "gap", "expanded", "pauseWhenPageIsHidden", "cn"]);
          }), 128))
        ], 16, Le);
      }), 128))
    ], 8, Ae));
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Sonner",
  __ssrInlineRender: true,
  props: {
    position: { default: "top-right" },
    toastOptions: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Ve), mergeProps({
        class: "toaster group",
        position: props.position,
        "toast-options": {
          duration: 4e3,
          classes: {
            toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
          }
        }
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sonner/Sonner.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtRouteAnnouncer = __nuxt_component_0;
  const _component_NuxtLayout = __nuxt_component_1;
  const _component_NuxtPage = __nuxt_component_2;
  const _component_Sonner = _sfc_main$3;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_NuxtRouteAnnouncer, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtLayout, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_Sonner, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-C1KEcMmt.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-FP8yCm6Q.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { Ke as K, _export_sfc as _, __nuxt_component_1$1 as a, useNuxtApp as b, useRuntimeConfig as c, defineNuxtRouteMiddleware as d, entry$1 as default, nuxtLinkDefaults as e, defineStore as f, navigateTo as n, resolveRouteObject as r, storeToRefs as s, tryUseNuxtApp as t, useRouter as u };
//# sourceMappingURL=server.mjs.map
