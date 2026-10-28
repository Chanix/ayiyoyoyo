---
layout: doc
---

## localStorage IndexedDB Cookie
ayiyoyoyo 默认启动本地服务器时使用随机端口，浏览器内核（如 WebView2 或 WebKit）会认为这是一个全新的源（Origin）。

由于浏览器的安全策略，localStorage、IndexedDB 和 Cookie 基于「协议 + 域名 + 端口」进行隔离，这导致本地持久化数据在下一次启动时全部失效。

如何解决：
- 在 appchip.json 中通过 `port` 字段指定端口
- 放弃使用 localStorage、IndexedDB 和 Cookie
- 使用 ayiyoyoyo 内置的数据存储方案

## Vue
Vue Router 主要有 Hash, HTML5 / History , Memory / Abstract 三种路由模式

注意在 appchip.json 的 `url` 字段中输入正确的值。

例如：'/' 