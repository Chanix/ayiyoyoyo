---
layout: doc
---

# JS 扩展对象概述

系统内置了扩展对象 `ayiyoyoyo` 供 JavaScript 调用。因此小应用可以获得在浏览器中运行时无法获得的功能（例如读写本地文件，本地消息提醒）。

::: info 注意
大部分 JSAPI 调用为异步调用模式，返回值为 Promise。部分支持同步调用的会在文档中特别标注。

关于异步编程（例如：callback, then, await, async...），
具体请参阅 [JavaScript 相关文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 。
:::

## JS 调用与返回

浏览器组件窗口装载完成之后会新增对象： `window.ayiyoyoyo`，之后触发事件 `ayiyoyoyoReady`。
该事件触发后就可以在 JavaScript 中调用扩展对象功能。否则，即 `ayiyoyoyoReady` 事件触发之前，将会出现错误，可以通过侦听事件来解决这个问题。
`ayiyoyoyoReady` 事件后，触发onloaded事件，调用执行小应用目录下的 js/mainwin_on_loaded.js（如果存在的话）。

```javascript
window.addEventListener('ayiyoyoyoReady', function () {
    alert('ayiyoyoyo 已就绪。');
})
```

为了方便使用，ayiyoyoyo 将扩展按功能分成了多个模块，公开于 `window.ayiyoyoyo.api` 下。 通过
`window.ayiyoyoyo.api.<模块名>.<函数名>` 这样的方式来进行调用。
所有扩展调用函数，返回值皆为 Promise，为了方便说明理解，文档中的返回值按普通方式来编写。

为了简化写法（偷懒少打几次键盘），定义了一些预设变量：

```javascript
__C = window.ayiyoyoyo
__A = window.ayiyoyoyo.api
__T = window.ayiyoyoyo.token
```

例如下面几个是等价的调用：

```javascript
window.ayiyoyoyo.api.runtime.exit();
ayiyoyoyo.api.runtime.exit();
__A.runtime.exit();
```

## 增加与完善

ayiyoyoyo 以宁缺毋滥的态度来增加 JSAPI，现有扩展已满足大多数常见应用场景。

如果没有您需要的模块，可以 [在这里提出需求](https://github.com/Chanix/ayiyoyoyo/issues) 。
我们将定期整理，判断是否增加，并整理出优先顺序逐步完善。

- 现有 API 缺陷的修复，优先级提高
- 需求量大，多人提出的，优先级提高
- 对项目有帮助的人员提出的，优先级提高
- 赞助者提出的，优先级提高

请原谅我们的时间和精力有限，所有的需求都会尽量排期实现，但无法保证一定会被实现或何时实现。

## 系统兼容性

所有的 JSAPI 皆最大可能的保证在主流操作系统下行为一致。但由于操作系统的差异，某些功能存在差异或仅被限定的操作系统支持。
我们会尽量的保证jsapi在多个操作系统上的一致性，但是依然需要开发者注意差异并**做好测试**。