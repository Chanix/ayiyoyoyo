---
layout: doc
---

# 文件与目录结构 {#dirs-and-files}

ayiyoyoyo 是绿色软件，所有文件都在同一个目录下。备份和迁移只需要复制整个目录。

## 顶层结构

解压后，你会看到这样的目录结构：

```
ayiyoyoyo/
├─ bin/        程序文件（可执行文件和支持文件）
└─ data/       运行时数据
   ├─ appchips/  小应用本体
   ├─ data/      小应用的数据
   └─ wvdata/    小应用的 webview 数据
```

顶层目录名不固定，用户可以放在任意位置，例如 `C:/ayiyoyoyo`。下面以 `ayiyoyoyo/` 代指这个顶层目录。

## bin/

存放程序本体和运行时支持文件。这些是 Nuitka 编译产物的集合。

- **ayiyoyoyo.exe**：生产环境可执行文件，分发给用户
- **ayiyoyoyoKit.exe**：开发环境可执行文件，带调试工具
- 其他：DLL、Python 运行时、依赖库、资源文件等

一般不需要手动修改 `bin/` 下的任何东西。

## data/

存放所有运行时数据。这是开发者主要关注的目录。

### appchips/

存放所有已安装的小应用，每个小应用一个子目录，目录名就是小应用的标识（appchip id）。

```
appchips/
├─ default/             默认小应用（小应用管理器）
├─ <appchip-id-1>/
├─ <appchip-id-2>/
└─ ...
```

每个小应用目录的内部结构：

```
<appchip-id>/
├─ appchip.json     小应用配置
├─ appchip.ico      图标（可选）
├─ js/              事件处理脚本
└─ webroot/         网站根目录（本地网站时使用）
```

具体说明见[什么是小应用](/zh/appchip/what-is-appchip)。

### data/

存放每个小应用的数据，每个小应用一个子目录。

```
data/
├─ <appchip-id-1>/
├─ <appchip-id-2>/
└─ ...
```

小应用可以在这里读写自己的数据文件。删除小应用时，可以选择是否同时删除这里的数据。

### wvdata/

存放每个小应用的 webview 数据，每个小应用一个子目录。

```
wvdata/
├─ <appchip-id-1>/
├─ <appchip-id-2>/
└─ ...
```

这里保存的是浏览器控件产生的数据，比如 cookies、localStorage、缓存等。每个小应用的数据互相隔离。

## 迁移与备份

由于所有数据都在同一个顶层目录下，迁移和备份非常简单：

1. 关闭 ayiyoyoyo
2. 复制整个顶层目录到新位置
3. 在新位置运行可执行文件

不需要安装，不需要注册表，不需要清理系统目录。

## 清理

如果想清空所有数据，直接删除 `data/` 目录即可。下次启动会重新创建。

如果想彻底卸载，删除整个顶层目录即可。

<!-- 下一步（待相关页面创建后启用）

## 下一步

- [什么是小应用](/zh/appchip/what-is-appchip) —— 了解小应用的构成
- [开发流程](/zh/appchip/workflow) —— 完整的开发到分发链路

-->