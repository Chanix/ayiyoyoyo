---
layout: doc
---

# 快速开始 {#getting-started}

## 下载与安装

ayiyoyoyo 是绿色软件，下载后直接解压即可使用。

- 下载后解压到您希望存放的地方（例：`C:\ayiyoyoyo`， `/home/user/ayiyoyoyo`）。
- 目录名称请使用 ANSI 字符（英文字母 + 数字），以免带来不必要的问题。

[//]: # (下载地址：[GitHub Releases]&#40;https://github.com/Chanix/ayiyoyoyo/releases&#41;)

ayiyoyoyo 已经考虑到了环境依赖，理论上无需配置即可独立运行。

如果运行出现问题，您可以对照下面的环境要求，检查是否满足。同时也请通知我们，这让我们能做得更好。

#### Windows

需要 Windows 10 及以上操作系统，依赖系统自带的 WebView2。

[//]: # (正常情况下都有，少数精简版可能没有。详情请参阅：[分发应用和 WebView2 运行时]&#40;https://learn.microsoft.com/zh-cn/microsoft-edge/webview2/concepts/distribution?tabs=dotnetcsharp&#41;。)

#### Linux

需要系统内置 WebKit2 2.22 或以上版本的 GTK。您可能需要安装对应的软件包。

*Linux 各发行版使用不同的包管理工具，具体请参阅相关文档。*
```
sudo apt install python3-gi python3-gi-cairo gir1.2-gtk-3.0 gir1.2-webkit2-4.1
```

## 启动并运行
打开 `ayiyoyoyo/bin/` 目录，双击 ayiyoyoyo 可执行文件即可运行。

运行后会打开“小应用管理器”，显示已安装的小应用。

- 点击小应用图标即可运行该小应用。
- 可以通过小应用卡片右上方的操作进行相关操作，例如 删除，以调试模式运行等。
- 可以通过 + 按钮 来安装新的小应用。安装小应用有两种方式，可以从本地分发包(.zip)文件安装，也可以输入小应用安装链接从网络安装。

ayiyoyoyo 随下载包提供数个实用小应用。可按照实际需要进行增删。

:::tip 提示
除了图形界面启动外，还可以通过命令行启动，参见 [命令行参数](cli-args) 。
:::
