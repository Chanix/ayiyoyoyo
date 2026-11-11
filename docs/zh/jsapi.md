---
layout: doc
---

# JS 扩展对象概述

窗口装载完成后系统会新增对象 `window.ayiyoyoyo` 供 JavaScript 调用。
小应用通过其可以获得操作本地资源（例如读写本地文件，本地消息提醒）等增强功能。

`window.ayiyoyoyo` 成功创建后会触发事件 `ayiyoyoyoReady`。
该事件触发后就可以在 JavaScript 中使用该对象。否则将会出现错误，可以通过侦听事件来解决这个问题。

```javascript
window.addEventListener('ayiyoyoyoReady', function () {
    alert('ayiyoyoyo 已就绪。');
})
```

`ayiyoyoyoReady` 事件触发后，会继续触发onloaded事件，并调用执行小应用目录下的 js/mainwin_on_loaded.js（如果存在的话）。

## 属性

| 名称               | 类型   | 说明                 |
|--------------------|--------|----------------------|
| `api`              | object | JS 扩展对象          |
| `appchip_dir_data` | string | 小应用的数据保存目录 |
| `appchip_id`       | string | 小应用的标识         |
| `cwd`              | string | 工作目录             |
| `debug`            | bool   | 调试状态             |
| `dir_home`         | string | 用户主目录           |
| `dir_temp`         | string | 当前系统临时目录     |
| `pid`              | number | 当前进程号           |
| `platform`         | string | webview 平台         |
| `sep_env`          | string | 环境变量分隔符       |
| `sep_path`         | string | 目录路径分隔符       |
| `token`            | string | 令牌                 |

## api 调用与返回

为了方便使用，`ayiyoyoyo` 将扩展按功能分成了多个模块，公开于 `window.ayiyoyoyo.api` 下。 通过
`window.ayiyoyoyo.api.<模块名>.<函数名>` 这样的方式来进行调用。
所有扩展调用函数，返回值皆为 Promise，为了方便说明理解，文档中的返回值按普通方式来编写。

::: info 注意
关于异步编程（例如：callback, then, await, async...），
具体请参阅 [JavaScript 相关文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 。
:::

ayiyoyoyo 以宁缺毋滥的态度来增加模块和功能，现有扩展已满足大多数常见应用场景。

如果没有您需要的模块，可以 [在这里提出需求](https://github.com/Chanix/ayiyoyoyo/issues) 。
我们将定期整理，判断是否增加，并整理出优先顺序逐步完善。

- 现有 API 缺陷的修复，优先级提高
- 需求量大，多人提出的，优先级提高
- 项目贡献人员提出的，优先级提高

请原谅时间和精力有限，所有的需求都会尽量排期实现，但无法保证一定会被实现或何时实现。

::: warning 系统兼容性
由于操作系统的差异，某些模块和功能存在差异或仅被限定的操作系统支持。


我们会尽可能保证跨平台一致性，但依然需要开发者注意差异并**做好测试**。
:::

## 助记符

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
