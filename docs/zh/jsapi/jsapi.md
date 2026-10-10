---
layout: doc
---

# JS 扩展对象概述 {#jsapi}

ayiyoyoyo 内置了扩展对象供 JavaScript 调用。因此，小应用可以获得在浏览器中运行时无法获得的功能（例如读写本地文件、调用 Python、发送系统通知）。

ayiyoyoyo 中所有的 JSAPI 皆考虑到跨平台，尽可能保证在主流操作系统下行为一致。但由于操作系统的差异，某些功能存在差异或仅在特定操作系统下支持。

::: tip 异步调用
所有 JSAPI 调用皆为异步调用，返回值皆为 Promise。

请使用异步编程（例如：callback、then、await、async...），具体请参阅 [JavaScript 相关文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)。
:::

## JS 调用与返回

ayiyoyoyo 会在浏览器组件窗口装载完成之后新增对象 `window.ayiyoyoyo`，之后触发事件 `ayiyoyoyoReady`。

该准备工作完成以后就可以在 JavaScript 中调用扩展对象功能。否则，即 `ayiyoyoyoReady` 事件触发之前，将会出现错误，可以通过侦听事件来解决。

```javascript
window.addEventListener('ayiyoyoyoReady', function () {
    alert('ayiyoyoyo 已就绪。');
})
```

为了方便使用，ayiyoyoyo 将扩展按功能分成了多个模块，公开于 `window.ayiyoyoyo.api` 下。通过 `window.ayiyoyoyo.api.<模块名>.<函数名>` 这样的方式来进行调用。

所有扩展调用函数，返回值皆为 Promise。为了方便说明理解，文档中的返回值按普通方式来编写。

为了简化写法，定义了三个预设变量：

```javascript
__C = window.ayiyoyoyo
__A = window.ayiyoyoyo.api
__T = window.ayiyoyoyo.token
```

例如下面几个是等价的调用：

```javascript
window.ayiyoyoyo.api.shell.open('C:/myapp');
ayiyoyoyo.api.shell.open('C:/myapp');
__A.shell.open('C:/myapp');
```

## 模块列表

| 模块 | 说明 |
|---|---|
| `__A.appchip` | 小应用管理 |
| `__A.clipboard` | 剪贴板 |
| `__A.dialog` | 对话框 |
| `__A.env` | 环境变量 |
| `__A.process` | 进程管理 |
| `__A.python` | Python 执行 |
| `__A.shell` | Shell 交互 |

每个模块的详细 API 见各自页面。

## 增加与完善

ayiyoyoyo 以宁缺毋滥的态度来增加 JSAPI，现有扩展已满足大多数常见应用场景。

如果没有您需要的模块，可以[在这里提出需求](https://github.com/Chanix/ayiyoyoyo/issues)。

我们会定期整理，判断是否增加，并整理出优先顺序逐步完善：

- 现有 API 缺陷的修复，优先级提高
- 需求量大、多人提出的，优先级提高
- 对项目有帮助的人员提出的，优先级提高
- 赞助者提出的，优先级提高

请原谅我们的时间和精力有限，所有的需求都会尽量排期实现，但无法保证一定会被实现或何时实现。

## 系统兼容性

ayiyoyoyo 以 Python 作为开发语言，本身是跨平台的，但是依然需要其他包的支持。

我们会尽量使用跨平台、一致性的 Python 包，但是很遗憾，仍然有些功能在平台上存在差异。

我们会尽量保证 JSAPI 在多个操作系统上的一致性，但是依然需要开发者注意差异并做好测试。