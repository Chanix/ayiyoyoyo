---
layout: doc
---

# 开发流程 {#workflow}

本篇介绍小应用从创建到分发的完整开发流程。

## 总览

```
创建 → 编写 → 调试 → 打包 → 分发
```

## 1. 创建小应用

推荐使用 **DevKit** 创建。DevKit 是开发者工具套件，会自动生成：

- 唯一的小应用标识（appchip id）
- `appchip.json` 配置文件
- 基本的目录结构
- 空的事件处理文件

打开 DevKit，选择「包装远程网站」或「包装本地网站」，按提示填写信息即可。

详见[快速开始](/zh/getting-started)。

## 2. 编写代码

小应用的内容都放在 `webroot/` 目录下。你可以：

- 写原生 HTML / CSS / JavaScript
- 用 Vue / React 等框架，构建后把产物放进 `webroot/`
- 直接包装已有的网站

入口由 `appchip.json` 的 `url` 字段决定。支持四种运行模式，详见[什么是小应用](/zh/appchip/what-is-appchip#运行模式)。

## 3. 调用扩展

在页面 JS 里，通过 `__A` 调用基座提供的扩展能力：

```javascript
// 调用 Python
const r = await __A.python.exec('__result__ = 1 + 1');
console.log(r.result);

// 读写剪贴板
const text = await __A.clipboard.get();
await __A.clipboard.set('Hello');
```

所有扩展方法都是异步的，需要 `await`。

详见 [JS 扩展与 API](/zh/jsapi)

## 4. 处理事件

小应用可以响应窗口事件。命名规则：`js/mainwin_on_<事件名>.js`

例如，页面加载完成时执行：

```javascript
// js/mainwin_on_loaded.js
console.log('mainwin_on_loaded');
```

这些脚本在事件触发时由框架注入页面执行，可以访问 `window`，直接操作 DOM。

支持的事件见[什么是小应用](/zh/appchip/what-is-appchip#js)。

## 5. 调试

用 **ayiyoyoyoKit.exe** 启动（不要用 `ayiyoyoyo.exe`），会进入调试模式：

- 自动打开浏览器开发者工具（DevTools）
- 打开一个终端窗口，显示运行日志、错误信息

调试方式和前端程序员开发 Web 应用完全一致：

- **查看日志**：在终端窗口里看
- **打开 DevTools**：启动时自动打开；也可以在小应用页面上右键，选「检查」
- **刷新页面**：在页面上右键，选「刷新」
- **重新启动小应用**：如果修改了 `appchip.json`，或者做了大面积代码改动，需要关闭窗口重新启动

## 6. 打包

用 DevKit 的「打包小应用」功能，把 `appchips/<id>/` 打包成 zip。

产物文件名固定为 `<appchip-id>.zip`。

详见[打包与分发](/zh/appchip/packaging)。

## 7. 分发

将 zip 分发出去，用户通过两种方式安装：

- **从文件安装**：用户选择本地 zip
- **从网址安装**：用户填入 zip 的 URL

## 下一步

- [调试方法](/zh/appchip/debugging) —— 更详细的调试技巧
- [打包与分发](/zh/appchip/packaging) —— 分发完整流程