---
layout: doc
---

# 理解四种运行模式 {#run-modes}

小应用的页面从哪来，由 `appchip.json` 的 `url`（或 `html`）字段决定。ayiyoyoyo 一共支持四种模式，它们在「页面来源」「是否需要起本地服务」「能用哪些浏览器能力」上差别很大，选错会白屏或者功能失效。

## 模式总览

| 模式 | 清单写法 | 页面来源 | 本地服务 | 典型场景 |
|:---|:---|:---|:---:|:---|
| 远程服务器 | `url: https://example.com/` | 远端网站 | 否 | 把网站变成桌面应用 |
| 本地服务器 | `url: /` 或 `index.html` | `webroot/` 目录 | **是** | Vue / React 构建产物、多文件网站 |
| 文件 | `url: file://index.html` | `webroot/` 下的单个文件 | 否 | 单文件、全内联的小工具 |
| 内联 | `html: <!DOCTYPE ...>` | 清单里的字符串 | 否 | 基座内置页面、极小应用 |

## 一、远程服务器模式

```json
{
  "url": "https://chat.deepseek.com/"
}
```

页面完全来自远端网站，ayiyoyoyo 只负责提供窗口和本地能力。

- 登录态、Cookie、IndexedDB 都保存在 `appdata/wvdata/<小应用id>/`，每个小应用一份，互不干扰 —— 同一个网站装两份就是两个互不相干的账号。
- 想给网站加功能，用 `js/mainwin_on_loaded.js` 注入脚本：DOM 操作、调用 `__A` 都可以。
- 不需要 `webroot/`。

这是最省事的模式，也是最常见的用法。

## 二、本地服务器模式

```json
{
  "url": "/"
}
```

基座会起一个本地 HTTP 服务（bottle），把 `webroot/` 目录服务出去，页面通过 `http://127.0.0.1:<端口>/` 访问。

`url` 支持子路径：

| 写法 | 实际加载 |
|:---|:---|
| `"/"` 或不写 | `webroot/index.html`（访问目录自动找默认文档） |
| `"index.html"` | `webroot/index.html` |
| `"sub/"` 或 `"sub/index.html"` | `webroot/sub/` 下的内容 |

**关键点：这里有真正的 HTTP 源（origin）**，所以现代前端产物需要的浏览器能力全部可用：

- `<script type="module" src="./assets/index-xxxx.js">`
- 动态 `import()`、代码分包
- `fetch('./data.json')` 读本地资源
- Web Worker、WASM
- Service Worker

**Vue / React / Svelte 等框架的构建产物，必须用这个模式。**

端口由 `port` 字段控制，默认 `0` 表示每次启动随机分配；`ssl` 字段控制是否使用 https。

::: warning 端口是随机的
每次启动端口都可能不同，意味着页面源（origin）会变。因此**任何绑定 origin 的浏览器存储都会失效**：

- `localStorage`、`sessionStorage`、`IndexedDB`、`Cookie`

需要持久化数据时，请统一使用 [`__A.storage`](/zh/jsapi/JsapiStorage)，它按小应用隔离、与端口无关。
:::

::: tip 单页应用（SPA）要用 hash 路由
本地服务器模式目前不会把未命中的路径回退到 `index.html`，所以：

- `vue-router` 用 `createWebHashHistory()`，不要用 `createWebHistory()`
- `react-router` 用 `HashRouter`，不要用 `BrowserRouter`

否则在二级路径上刷新会得到 404。
:::

## 三、文件模式

```json
{
  "url": "file://index.html"
}
```

`file://` 后面是相对于 `webroot/` 的路径，基座把它转换成 `file:///...` 直接加载，**不起任何本地服务**。

优点：启动更快、不占端口、没有服务进程。

代价是浏览器对 `file://` 源的限制。实测（Chromium / WebView2 同源内核）：

| 能力 | file:// 下 |
|:---|:---|
| 内联 `<script>` | ✅ 可用 |
| 内联 `<script type="module">` | ✅ 可用 |
| 外部 `<script type="module" src="./x.js">` | ❌ 不执行（源为 `null`，被拦截） |
| `fetch('./data.json')` | ❌ 失败 |
| `new Worker('./w.js')` | ❌ 拒绝（源为 `null`） |
| 通过 `__A` 调用本地能力 | ✅ 可用（走基座桥接，与页面源无关） |

所以**文件模式只适合「所有内容都在一个文件里」的小应用**：CSS、JS 全部内联，不引用任何外部文件。

::: danger file:// 下不要用浏览器存储
所有 `file://` 页面共享同一个 `null` 源，`localStorage` 既不可靠，也会在多个小应用之间串数据。持久化请用 `__A.storage`。
:::

## 四、内联模式

```json
{
  "html": "<!DOCTYPE HTML><html><body><h1>Hello</h1></body></html>"
}
```

直接把 HTML 字符串写在清单里，优先级高于 `url`。不需要 `webroot/` 目录，也不需要任何服务。

适合：基座自己的页面（小应用管理器、错误提示页）、内容很少且不需要改动的固定页面。

因为是写死在清单里的字符串，不适合放较大的前端代码 —— 代码一多，清单就没法维护了。

## 怎么选

按页面形态选，而不是按个人喜好：

| 你的产物 | 选哪个模式 |
|:---|:---|
| 一个网站，原样包装 | 远程服务器模式 |
| 一个网站，要注入增强 | 远程服务器模式 + `js/mainwin_on_loaded.js` |
| Vue / React / Svelte 的 `dist/` 产物 | 本地服务器模式 |
| 多个 JS / CSS 文件、有图片字体等静态资源 | 本地服务器模式 |
| 一个 HTML 文件，样式和脚本全内联 | 文件模式 |
| 一两行 HTML，固定内容 | 内联模式 |

## 三个跨模式的规则

无论选哪种模式，下面三条都成立：

1. **数据持久化统一用 [`__A.storage`](/zh/jsapi/JsapiStorage)**，不要依赖浏览器存储。
2. **JS 扩展对象 `__A` 在四种模式下行为完全一致** —— 注入发生在页面加载之后，与页面来自哪里无关。
3. **事件注入脚本（`js/mainwin_on_*.js`）在四种模式下都可用**，写法和时机完全相同。
