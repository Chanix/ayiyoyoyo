---
layout: doc
---

# 文件与目录 {#dirs-and-files}

ayiyoyoyo 是绿色软件，所有文件都在同一个目录下。备份和迁移只需要复制整个目录。

## 迁移与备份

1. 关闭 ayiyoyoyo
2. 复制整个顶层目录到新位置
3. 在新位置运行可执行文件

简单的剪切、复制即可。 **不需要安装，不需要注册表，不需要清理系统目录**。

## 清理

如果想清空数据，直接删除对应目录即可。若为必要目录下次运行会自动创建。

如果想彻底卸载 ayiyoyoyo，删除整个顶层目录即可。 **不留任何垃圾**。

## 详细说明

ayiyoyoyo 的大致目录结构如下：

```text
ayiyoyoyo/
    ├─ bin/        程序文件（可执行文件和支持文件）
    └─ data/       运行时数据
       ├─ appchips/  小应用本体
       ├─ data/      小应用的数据
       └─ wvdata/    小应用的 webview 数据
```

顶层目录用户可以放在任意位置，例如 `C:\ayiyoyoyo`。下面以 `ayiyoyoyo/` 代指这个顶层目录。

## bin/

存放程序本体和运行时支持文件。
不需要手动修改 `bin/` 下的任何东西。升级 ayiyoyoyo 只需将 `bin/` 覆盖替换即可。

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

## data/

存放所有运行时数据。这是开发者主要关注的目录。

### data/appchips/

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

具体说明见[什么是小应用](/zh/appchip/what-is-appchip)。

### data/data/

存放每个小应用的数据，每个小应用一个子目录。

```text
data/
    ├─ <appchip-id-1>/
    ├─ <appchip-id-2>/
    └─ ...
```

小应用可以在这里读写自己的数据文件。删除小应用时，可以选择是否同时删除这里的数据。

### data/wvdata/

存放每个小应用的 webview 数据，每个小应用一个子目录。

```text
wvdata/
    ├─ <appchip-id-1>/
    ├─ <appchip-id-2>/
    └─ ...
```

这里保存的是浏览器控件产生的数据，比如 cookies、localStorage、缓存等。每个小应用的数据互相隔离。
