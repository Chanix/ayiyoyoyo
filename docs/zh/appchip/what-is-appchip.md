---
layout: doc
---

# 什么是小应用 {#what-is-appchip}

小应用（Appchip）是 ayiyoyoyo 上的运行单元，每个小应用是一个独立的应用。

## 小应用的构成

一个小应用就是一个目录，包含以下文件：

```
<appchip-id>/
├─ appchip.json     小应用配置
├─ appchip.ico      图标（可选）
├─ js/              事件处理脚本
└─ webroot/         网站根目录（本地网站时使用）
```

### appchip.json

小应用的配置文件，定义小应用的元信息和窗口行为。

```json
{
  "id": "a3f17f3a9c2e8b1d4f6a9c2e5a8b7f3a9c2e",
  "name": "我的应用",
  "version": "1.0.0",
  "description": "",
  "author": "",
  "url": "index.html",
  "win_title": "我的应用",
  "win_width": 1024,
  "win_height": 768,
  "win_hidden": false,
  "win_confirm_close": false,
  "win_on_top": false,
  "win_resizable": true,
  "win_fullscreen": false
}
```

字段说明：

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 小应用唯一标识，36 字符 |
| `name` | string | 应用名称，显示在小应用管理器 |
| `version` | string | 版本号 |
| `description` | string | 应用描述 |
| `author` | string | 作者 |
| `url` | string | 入口地址（本地路径或远程 URL） |
| `html` | string | 内联 HTML 源码，与 `url` 互斥 |
| `win_title` | string | 窗口标题 |
| `win_width` | number | 窗口宽度 |
| `win_height` | number | 窗口高度 |
| `win_hidden` | bool | 启动时是否隐藏窗口 |
| `win_confirm_close` | bool | 关闭时是否弹确认框 |
| `win_on_top` | bool | 窗口是否置顶 |
| `win_resizable` | bool | 窗口是否可调整大小 |
| `win_fullscreen` | bool | 是否全屏启动 |

### js/

存放事件处理脚本。

命名规则：`mainwin_on_<事件名>.js`

当对应事件触发时，框架会读取这个文件并通过 `exec_js` 注入页面执行。

支持的事件：

| 事件 | 文件名 | 触发时机 |
|---|---|---|
| loaded | `mainwin_on_loaded.js` | 页面加载完成 |
| shown | `mainwin_on_shown.js` | 窗口显示 |
| maximized | `mainwin_on_maximized.js` | 窗口最大化 |
| minimized | `mainwin_on_minimized.js` | 窗口最小化 |
| restored | `mainwin_on_restored.js` | 从最大化/最小化恢复 |
| moved | `mainwin_on_moved.js` | 窗口移动 |
| resized | `mainwin_on_resized.js` | 窗口缩放 |

事件脚本可以访问页面的 `window`，因此可以直接操作 DOM、调用 `__A` 扩展。

### webroot/

网站根目录，存放前端资源（HTML / CSS / JS / 图片等）。

- **包装本地网站**时：`webroot/` 里是网站文件，`url` 通常是 `index.html`
- **包装远程网站**时：没有 `webroot/`，`url` 直接是远程地址

### appchip.ico

小应用图标，可选。放在 `appchip.json` 同目录下即可，无需在配置里声明。



### 各模式下 `__A` 的可用性

四种运行模式下，`__A` 扩展对象的行为**完全一致**，均可调用基座提供的全部 API。

这意味着「增强」是普遍的——无论你的小应用是包装远程网站、本地网站，还是纯 HTML，都能获得同样的本地能力。

## 小应用的生命周期

1. **创建**：通过 DevKit 或手动创建目录和配置
2. **运行**：在小应用管理器中点击卡片，或命令行 `--appchip <id>` 启动
3. **调试**：用 ayiyoyoyoKit 打开 DevTools
4. **打包**：通过 DevKit 打包成 zip
5. **分发**：用户从文件或网址安装
6. **卸载**：从小应用管理器删除，可选保留数据