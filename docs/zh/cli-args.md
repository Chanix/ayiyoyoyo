---
layout: doc
---

# 命令行参数 {#cli-args}

ayiyoyoyo 支持通过命令行参数控制启动行为。

## 参数一览

| 参数 | 说明 |
|:---|:---|
| `--appchip` | 指定运行的小应用，默认为 `default` |
| `--help` | 显示帮助信息 |

## 参数详解

### --appchip

指定启动时运行的小应用。不指定时，会运行 `default` 小应用——即「小应用管理器」，显示所有已安装的小应用列表。

```shell
ayiyoyoyo --appchip my_appchip
```

### --help

显示帮助信息。

```shell
ayiyoyoyo --help
```
