---
layout: doc
---

# ayiyoyoyo.api.python <Badge type="tip" text="Since 25.5.1.1" />

Python 支持

向前端 JS 提供执行 Python 源码/文件的能力。

约束与限制：
- 脚本之间环境相互隔离，每次执行新建命名空间；
- 不向脚本注入宿主对象，脚本无法访问应用本体；
- 脚本可自由 import 任意已安装的 PyPI 包；
- 通过约定 \_\_result\_\_ 向 JS 回传结果。

返回结构（所有方法统一）：
\`\`\`
{'ok': True,  'result': <\_\_result\_\_>, 'error': '', 'traceback': '', 'stdout': '...'}
{'ok': False, 'result': None, 'error': '...', 'traceback': '...', 'stdout': '...'}
\`\`\`

::: info 注意
\_\_result\_\_ 会经过 Python → JavaScript 转换，仅支持部分类型：
|   Python   | JavaScript     |
|:------:|:-------|
| bool | boolean |
| int / float | number |
| str | string |
| list / tuple | Array |
| dict | Object |
:::
::: danger 危险
通过本模块可以获得 python 的强大能力，使用风险自担。
:::

## exec(pysrc) <Badge type="tip" text="Since 25.5.1.1" /> {#exec}

执行一段 Python 源码，返回结构化结果。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| pysrc | string | python 源代码 |

| 返回值 | 说明 |
|:---|:---|
| dict[str, any] | 参见上面的 \_\_返回结构\_\_ |

```javascript
await __A.python.exec("__result__ = 12345");
```

## execFile(py_filepath) <Badge type="tip" text="Since 25.5.1.1" /> {#execFile}

执行指定的 python 文件。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| py_filepath | string | python 文件完整路径 |

| 返回值 | 说明 |
|:---|:---|
| dict[str, any] | 参见上面的 \_\_返回结构\_\_ |

```javascript
await __A.python.execFile("plugins/hello.py");
```
