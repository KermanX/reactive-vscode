---
outline: 'deep'
---

# Why <ReactiveVscode />

VSCode extensions are powerful tools to enhance your development experience. But developing a VSCode extension is not easy. This library is created to help you develop a VSCode extension with Vue's reactivity system.

## The Problems

Developing a VSCode extension is not easy. The official APIs are kind of primitive, which has several problems:

### Hard to watch states

The official API is event-based, which means you have to listen to events to watch the state. This produces a lot of redundant code, and not familiar to Vue developers.

### The Disposables

Disposables are everywhere in a VSCode extension. You have to store all of them to `context.subscriptions`, or dispose them manually.

### When to Initialize

Views in a VSCode extension are created lazily. If you want to access a view instance, you have to store it, and even listen to a event which is fired when the view is created.

### Want to use Vue

Vue's reactivity system is powerful. It's much easier to watch states and update views with Vue's reactivity system. But VSCode APIs are not designed to work with Vue.

## The solution

[Vue's Reactivity API](https://vuejs.org/api/reactivity-core.html) is all you need. This library wraps most of the VSCode APIs into [Vue Composables](https://vuejs.org/guide/reusability/composables.html). You can use them as you use Vue Reactivity API, which is familiar to Vue developers.

With the help of this library, you can develop a VSCode extension just like developing a Vue 3 web application. You can use Vue's reactivity system to watch states, and implement views as Vue composables.

### Result

Here is an example which shows how this library can help you develop a VSCode extension. The following extension decorates the active text editor depending on a configuration.

::: code-group

<<< ../examples/editor-decoration/1.ts [<ReactiveVscode2 />]

<<< ../examples/editor-decoration/2.ts [Original VSCode API]

:::

As you can see, after using <ReactiveVscode />, the code is much cleaner and easier to understand. With composables like `reactive::useActiveTextEditor` provided by this library, you can use Vue's reactivity API like `vue::watchEffect(https://vuejs.org/api/reactivity-core.html#watcheffect)` smoothly when developing a VSCode extension.

More examples [here](../examples/){target="_blank"}.

## FAQ

### Why use `npm::@vue/runtime-core` internally?

This library is built on top of `npm::@vue/reactivity`, and ported some code from `npm::@vue/runtime-core` (See [the `./packages/core/src/reactivity` directory](https://github.com/KermanX/reactive-vscode/blob/main/packages/core/src/reactivity)).

The size of the minimal extension built with this library is about 12KB.

### Use Vue in Webview?

This library is **not** designed for using Vue in a webview. If you want to use Vue in a webview, you can use the CDN version of Vue or bundler plugins like `npm::@tomjs/vite-plugin-vscode`.
