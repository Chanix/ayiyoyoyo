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
    ├─ appchip.ico      Window 图标（可选）
    ├─ appchip.png      Linux  图标（可选）
    ├─ appchip.icns     MacOS  图标（可选）
    ├─ js/              事件处理脚本
    └─ webroot/         网站根目录（本地使用）
```

### appchip.json

小应用的配置文件，定义小应用的元信息和配置参数。格式如下：

```
{
  "id": "a3f17f3a9c2e8b1d4f6a9c2e5a8b7f3a9c2e",
  "name": "我的应用",
  ... ...
}
```

字段说明：

| 字段                                | 类型   | 默认值           | 说明                       |
|-------------------------------------|--------|------------------|----------------------------|
| `id`                                | string |                  | 小应用唯一标识，36 字符    |
| `name`                              | string | $id              | 小应用的名称               |
| `version`                           | string | "0.0.0.1"        | 版本号                     |
| `description`                       | string | ""               | 小应用描述                 |
| `author`                            | string | ""               | 作者                       |
| `url`                               | string | "/"              | 入口地址                   |
| `html`                              | string | null             | HTML 代码，优先于 `url`    |
| `win_title`                         | string | "$name $version" | 窗口标题                   |
| `win_width`                         | number | 800              | 窗口宽度                   |
| `win_height`                        | number | 600              | 窗口高度                   |
| `win_hidden`                        | bool   | false            | 启动时隐藏窗口             |
| `win_confirm_close`                 | bool   | false            | 关闭时弹确认框             |
| `win_on_top`                        | bool   | false            | 窗口置顶                   |
| `win_resizable`                     | bool   | true             | 窗口可调整大小             |
| `win_fullscreen`                    | bool   | false            | 全屏启动                   |
| `wv_open_external_links_in_browser` | bool   | true             | 用浏览器打开外部链接       |
| `wv_allow_downloads`                | bool   | false            | 允许下载                   |
| `wv_allow_file_urls`                | bool   | true             | 允许文件链接               |
| `wv_open_devtools_in_debug`         | bool   | true             | 调试模式下自动打开调试窗口 |
| `wv_remote_debugging_port`          | int    | null             | 远程调试端口               |
| `wv_drag_region_direct_target_only` | bool   | false            | 拖拽区域匹配模式           |
| `wv_webview2_runtime_path`          | string | null             | webview2 组件路径          |
| `port`                              | int    | 0                | 本地服务使用的端口号       |
| `ssl`                               | bool   | false            | 本地服务使用 ssl           |
| `user_agent`                        | string | null             | 指定 UserAgent             |

::: danger 注意
小应用标识请使用工具生成，以免造成重复。以 `ayiyoyoyo` 或者 `_` 开头的为保留用途，请勿使用。
:::

### js/

存放事件处理脚本。

命名规则：`mainwin_on_<事件名>.js`

当对应事件触发时，框架会读取这个文件并通过 `exec_js` 注入页面执行。

支持的事件：

| 事件      | 文件名                    | 触发时机                    |
|-----------|---------------------------|-----------------------------|
| loaded    | `mainwin_on_loaded.js`    | 主窗口加载完成后            |
| shown     | `mainwin_on_shown.js`     | 主窗口显示后                |
| maximized | `mainwin_on_maximized.js` | 主窗口最大化后              |
| minimized | `mainwin_on_minimized.js` | 主窗口最小化后              |
| restored  | `mainwin_on_restored.js`  | 主窗口从最大化/最小化恢复后 |
| moved     | `mainwin_on_moved.js`     | 主窗口移动后                |
| resized   | `mainwin_on_resized.js`   | 主窗口缩放后                |

事件脚本可以访问页面的 `window`，因此可以直接操作 DOM、调用 `__A` 扩展。

::: tip 提示
moved 和 resized 事件做了防抖处理。

如果需要对无法控制源代码的网页进行注入，在 loaded 事件中写就可以了。
:::

### webroot/

网站根目录，存放前端资源（HTML / CSS / JS / 图片等）。

- **包装本地网站**时：`webroot/` 里是网站文件，`url` 通常是 `index.html`
- **包装远程网站**时：没有 `webroot/`，`url` 直接是远程地址

### appchip.ico

小应用图标，可选。放在 `appchip.json` 同目录下即可，无需在配置里声明。

### 各模式下 `__A` 的可用性

四种运行模式下，`__A` 扩展对象的行为 **完全一致**，均可调用基座提供的全部 API。

这意味着「增强」是普遍的——无论你的小应用是包装远程网站、本地网站，还是纯 HTML，都能获得同样的本地能力。

## 小应用的生命周期

1. **创建**：通过 DevKit 或手动创建目录和配置
2. **运行**：在小应用管理器中点击卡片，或命令行 `--appchip <id>` 启动
3. **调试**：用 ayiyoyoyoKit 打开 DevTools
4. **打包**：通过 DevKit 打包成 zip
5. **分发**：用户从文件或网址安装
6. **卸载**：从小应用管理器删除，可选保留数据