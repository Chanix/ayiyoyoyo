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
ayiyoyoyo --appchip myapp
```

**应用场景**：

- 把 ayiyoyoyo 定制成独立应用时，指定固定的入口小应用
- 开发调试时，直接启动目标小应用，省去从小应用管理器点选

### --help

显示帮助信息。

```shell
ayiyoyoyo --help
```

## 从源码运行

如果你是从源码运行，参数需要加上解释器前缀：

```shell
uv run python src/mainKit.py --appchip myapp
```

或：

```shell
python src/mainKit.py --appchip myapp
```

<!-- 下一步（待相关页面创建后启用）

## 下一步

- [文件与目录结构](/zh/dirs-and-files) —— 了解数据存放位置
- [开发流程](/zh/appchip/workflow) —— 完整的开发到分发链路

-->