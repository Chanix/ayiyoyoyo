---
layout: doc
---

# 文件与目录 {#dirs-and-files}

ayiyoyoyo 是绿色软件，所有文件都在同一个目录下，大致结构如下：

```text
ayiyoyoyo/
    ├─ bin/        程序文件（可执行文件和支持文件）
    └─ appdata/    程序运行数据
       ├─ appchips/  小应用
       ├─ data/      小应用的数据
       └─ wvdata/    小应用的 webview 数据
```

顶层目录用户可以放在任意位置，例如 `C:\ayiyoyoyo`。文档中用 `ayiyoyoyo/` 代指这个顶层目录。

## ayiyoyoyo/bin/

存放程序本体和运行时支持文件。
若非明确，否则请勿手动修改该目录下的文件。升级 ayiyoyoyo 只需将 `ayiyoyoyo/bin/` 覆盖替换即可。

ayiyoyoyo 共有两个可执行文件，以 Windows 为例：

| 名称             | 说明                                             |
|------------------|--------------------------------------------------|
| ayiyoyoyo.exe    | 运行环境，供生产环境使用，需分发给最终用户。     |
| ayiyoyoyoKit.exe | 开发环境，供开发调试使用，具调试工具，无需分发。 |

**ayiyoyoyoKit = ayiyoyoyo + 调试工具**

两者功能特性一致，ayiyoyoyoKit 增加了一些调试工具：

- 打开终端窗口，显示运行日志、错误信息等底层调试信息
- 可以打开浏览器开发者工具（DevTools）
- 在小应用主窗口点击右键，会打开上下文菜单
- 支持浏览器的快捷键，例如 Ctrl + 上一页/下一页

## ayiyoyoyo/appdata/

存放所有运行时数据。

### ayiyoyoyo/appdata/appchips/

存放所有已安装的小应用，每个小应用一个子目录，目录名就是小应用的标识（appchip id）。

```text
appchips/
    ├─ default/             默认小应用（小应用管理器）
    ├─ <appchip-id-1>/
    ├─ <appchip-id-2>/
    └─ ...
```

每个小应用目录的内部结构：

```text
<appchip-id>/
    ├─ appchip.json     小应用配置
    ├─ appchip.ico      图标（可选）
    ├─ js/              事件处理脚本
    └─ webroot/         网站根目录（本地网站时使用）
```

参见 [什么是小应用](/zh/appchip/what-is-appchip) 。

### ayiyoyoyo/appdata/data/

存放每个小应用的数据，每个小应用一个子目录。参见 [什么是小应用](/zh/appchip/what-is-appchip) 。


```text
data/
    ├─ <appchip-id-1>/
    ├─ <appchip-id-2>/
    └─ ...
```

小应用可以在这里存放数据文件。

### ayiyoyoyo/appdata/wvdata/

存放每个小应用的 webview 数据，每个小应用一个子目录。

```text
wvdata/
    ├─ <appchip-id-1>/
    ├─ <appchip-id-2>/
    └─ ...
```

这里保存的是浏览器控件产生的数据，比如 cookies、localStorage、缓存等。

小应用的数据互相隔离。
