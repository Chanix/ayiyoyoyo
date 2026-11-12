---
layout: doc
---

# 调试方法 {#debugging}

ayiyoyoyo 提供了和 Web 开发一致的调试体验。

## 调试模式

调试功能只在 **ayiyoyoyoKit.exe** 下可用。用 `ayiyoyoyo.exe` 启动时是生产模式，不提供调试工具。

用 ayiyoyoyoKit 启动小应用，会自动打开：

- 一个终端窗口，显示运行日志、错误信息
- 浏览器开发者工具（DevTools）

## 终端窗口

终端窗口显示底层调试信息，包括：

- Python 侧的运行日志
- 错误堆栈
- 其他底层输出

## DevTools

DevTools 是调试前端代码的主要工具，和 Chrome 的开发者工具一致。

### 打开方式

- **自动打开**：用 ayiyoyoyoKit 启动时
- **手动打开**：在小应用页面上右键，选「检查」

### 常用功能

- **Console**：查看 `console.log`、执行 JS
- **Elements**：查看和修改 DOM
- **Network**：查看网络请求
- **Sources**：断点调试

更多技巧请参阅 [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools?hl=zh-cn)。

## 远程调试

在 `appchip.json` 里设置 `wv_remote_debugging_port`，可以开放一个远程调试端口：

```json
{
  "wv_remote_debugging_port": 9222
}
```

该字段**只在调试模式（ayiyoyoyoKit）下生效**。指定端口后，调试方法和调试普通 Web 应用完全一致。

这个功能适合：

- 编写自动化测试（Playwright、Selenium）
- 用外部工具连接调试

## 刷新与重启

- **刷新页面**：在页面上右键，选「刷新」
- **重新启动小应用**：修改 `appchip.json`，或做大面积代码改动后，关闭窗口重新启动

## 下一步

- [打包与分发](/zh/appchip/packaging) —— 分发完整流程