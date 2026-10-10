---
layout: doc
---

# 快速开始 {#getting-started}

ayiyoyoyo 是个跨平台的绿色软件，无需安装即可使用。

本篇带你从下载到分发，跑通小应用的完整流程。

一般来说，小应用的开发需要以下几个阶段：

1. 下载与安装
2. 开发调试
3. 分发至用户

## 下载与安装

ayiyoyoyo 是绿色软件，下载后直接解压即可使用。

- 下载完成后，将文件解压到您希望存放的地方（例如 `C:\ayiyoyoyo`）。
  - 存放的文件夹名称请使用 ANSI 字符（英文字母 + 数字），以免带来不必要的问题。

下载地址：[GitHub Releases](https://github.com/Chanix/ayiyoyoyo/releases)

## 环境依赖

ayiyoyoyo 已经考虑到了环境依赖，理论上无需配置即可独立运行。

如果运行出现问题，您可以对照下面的环境要求，检查是否满足。同时也请通知我们，这让我们有可能做得更好。

### Windows

需要 Windows 10 及以上操作系统，依赖系统自带的 WebView2。

正常情况下都有，少数精简版可能没有。详情请参阅：[分发应用和 WebView2 运行时](https://learn.microsoft.com/zh-cn/microsoft-edge/webview2/concepts/distribution?tabs=dotnetcsharp)。

### Linux

需要系统内置 WebKit2 2.22 或以上版本的 GTK。您可能需要安装对应的软件包。

*Linux 各发行版使用不同的包管理工具，具体请参阅相关文档。*

## 开发与调试

ayiyoyoyo 共有两个可执行文件，以 Windows 为例：

| 名称 | 说明 |
|---|---|
| ayiyoyoyo.exe | 运行环境，供生产环境使用，需分发给最终用户。 |
| ayiyoyoyoKit.exe | 开发环境，供开发调试使用，具调试工具，无需分发。 |

两者功能特性一致，ayiyoyoyoKit 增加了一些调试工具：

- 会打开终端窗口，显示运行日志、错误信息等底层调试信息
- 可以打开浏览器开发者工具（DevTools）
- 在小应用主窗口点击右键，会打开上下文菜单
- 支持浏览器的快捷键，例如 Ctrl + 上一页/下一页

**ayiyoyoyoKit = ayiyoyoyo + 调试工具**

ayiyoyoyo 的小应用运行于系统浏览器控件之上，本质上就是个 WebApp，支持所有前端开发框架，以同样的方式开发调试即可。

开发时请按照约定存储文件，详见[文件与目录结构](/zh/dirs-and-files)。

开发调试时最常用的就是开发者工具（DevTools），也可以使用您惯用的其他工具。若需进一步自动化调试流程，建议结合浏览器开发工具的自定义配置或专用测试工具（如 Puppeteer、Selenium）。

更多使用 DevTools 进行调试的方法和技巧，请参阅 [DevTools 文档](https://developer.chrome.com/docs/devtools?hl=zh-cn)。

在使用 EdgeChromium 时，可以启用远程调试，编写 Playwright 测试。更多请参阅 [Playwright](https://playwright.dev/)。
## 创建第一个小应用

ayiyoyoyo 默认只带「小应用管理器」，用来安装、运行、卸载其他小应用。

要开发自己的小应用，先安装 DevKit——它是开发者工具套件，可以创建新小应用、打包小应用。

### 安装 DevKit

在「小应用管理器」里：

1. 找到「安装小应用」区域
2. 在「从网址」输入框填入 DevKit 的 zip 网址
3. 点击「安装」

DevKit 的 zip 网址：
https://github.com/Chanix/ayiyoyoyo-devkit/releases/latest/download/ayiyoyoyo-devkit.zip


安装完成后，DevKit 会出现在「已安装」列表里，点击卡片即可运行。

### 用 DevKit 创建小应用

打开 DevKit，选择「包装远程网站」：

1. 填应用名称，比如「我的第一个应用」
2. 填远程网址，比如 `https://example.com`
3. 其余保持默认
4. 点「创建」

创建完成后，结果页会显示：

- **小应用标识**——系统自动生成的唯一 ID
- **安装位置**——小应用在 `appchips/` 下的目录
- **图标**——如果从网站成功抓取到 favicon，会显示「已获取」

点「运行」→ 立刻打开新窗口，加载你指定的网站。

点「打开目录」→ 在文件管理器中打开小应用目录，可以查看生成的文件。

恭喜，你完成了第一个小应用。

## 分发至用户

将必要的文件和目录分发给最终用户即可：

1. `ayiyoyoyo.exe`
2. `appchips` 目录（其中包含您的小应用子文件夹）
3. 其他项目需要的文件和目录

简单地把上述文件（文件夹）分发给最终用户，然后让用户运行 ayiyoyoyo 即可。

建议分发方式：

- 分发给用户 ayiyoyoyo 基座
- 小应用打包成 zip，从文件安装；或者提供网址，从网址安装

分发小应用有两种方式：

- **从文件安装**：把小应用打包成 zip 发给用户，用户在「小应用管理器」里选择本地 zip 安装。
- **从网址安装**：把小应用 zip 放到服务器，用户填网址，一键安装。

前者适合内部分享，后者适合公开发布。

运行时会打开默认小应用 `default`，显示所有已安装的小应用，用户点选运行即可。

如果希望指定默认运行的小应用，可以：

- 将指定的小应用改名为 `default`
- 指定命令行参数 `--appchip`

## 独立应用

上面的分发方式已足够满足日常需求，尤其在最终用户已经拥有 ayiyoyoyo 的基础上，日常分发和修改只需要分发小应用即可。

但在某些情况下，最终用户可能需要独立的应用程序包。这需要额外的定制裁剪和编译工作，请联系作者完成。

更进一步，可以将已编译的程序通过 NSIS 等工具生成软件安装包。

## 下一步

- [ayiyoyoyo 是什么？](/zh/what-is-ayiyoyoyo) —— 理解基座 + 小应用模型
- [开发流程](/zh/appchip/workflow) —— 完整的开发到分发链路
- [示例](/zh/examples/) —— 更多可运行的小应用
- 
