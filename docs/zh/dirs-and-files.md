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

顶层目录可以放在任意位置，例如 `C:\ayiyoyoyo`。文档中用 `ayiyoyoyo/` 代指这个顶层目录。

## ayiyoyoyo/bin/

存放程序本体和运行时支持文件。升级只需覆盖替换 `ayiyoyoyo/bin/` 即可。

ayiyoyoyo 共有两个可执行文件，**ayiyoyoyoKit = ayiyoyoyo + 调试工具**。

::: code-group

```text [Windows]
ayiyoyoyo.exe
ayiyoyoyoKit.exe
```

```text [Linux]
ayiyoyoyo.bin
ayiyoyoyoKit.bin
```

```text [MacOS]
ayiyoyoyo.bin
ayiyoyoyoKit.bin
```

:::

两者功能特性一致，ayiyoyoyoKit 增加了一些调试工具：

- 在终端窗口，显示运行日志、错误信息等底层调试信息
- 可打开浏览器开发者工具（DevTools）
- 在小应用主窗口点击右键，会打开上下文菜单
- 支持浏览器的快捷键，例如 Ctrl + 上一页/下一页

## ayiyoyoyo/appdata/

存放所有运行时数据。

### ayiyoyoyo/appdata/appchips/

存放所有已安装的小应用，每个小应用一个子目录，目录名就是小应用的标识（appchip id）。

```text
appchips/
    ├─ __default__/         默认小应用（小应用管理器）
    ├─ <appchip-id-1>/
    ├─ <appchip-id-2>/
    └─ ...
```

### ayiyoyoyo/appdata/data/

存放每个小应用的数据，每个小应用一个子目录。

```text
data/
    ├─ <appchip-id-1>/
    ├─ <appchip-id-2>/
    └─ ...
```

### ayiyoyoyo/appdata/wvdata/

存放每个小应用的 webview 数据，每个小应用一个子目录。

```text
wvdata/
    ├─ <appchip-id-1>/
    ├─ <appchip-id-2>/
    └─ ...
```
