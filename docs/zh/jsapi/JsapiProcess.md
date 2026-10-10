---
layout: doc
---

# ayiyoyoyo.api.process <Badge type="tip" text="Since 26.10.10" />

进程管理与操作。

提供运行外部程序、查询和控制系统进程的能力。

::: info 注意
涉及进程终止的接口（kill / terminate / suspend）具有破坏性，
调用方需自行确认目标进程。所有方法返回统一结构，失败时
返回 ok=False 而非抛异常。
:::
::: danger 危险
通过本模块可以终止任意进程，使用风险自担。
:::

## execute(bin_name, params) <Badge type="tip" text="Since 26.10.10" /> {#execute}

运行指定可执行文件（不等待），返回进程号。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| bin_name | string | 可执行文件路径或命令名。 |
| params | string | (可选) 附加命令行参数，按 shell 规则解析。默认为 ""。 |

| 返回值 | 说明 |
|:---|:---|
| object | 运行结果，包含： |
|  | - ok (bool): 是否成功 |
|  | - pid (int \| null): 进程号 |
|  | - msg (str): 结果描述 |

```javascript
const res = await __A.process.execute('notepad.exe');
if (res.ok) console.log('pid:', res.pid);
```

## executeWait(bin_name, params) <Badge type="tip" text="Since 26.10.10" /> {#executeWait}

运行指定可执行文件并等待其结束，返回执行结果。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| bin_name | string | 可执行文件路径或命令名。 |
| params | string | (可选) 附加命令行参数，按 shell 规则解析。默认为 ""。 |

| 返回值 | 说明 |
|:---|:---|
| object | 执行结果，包含： |
|  | - ok (bool): 是否成功执行（不代表退出码为 0） |
|  | - retcode (int \| null): 进程返回码 |
|  | - stdout (str): 标准输出 |
|  | - stderr (str): 标准错误 |
|  | - msg (str): 结果描述 |

```javascript
const res = await __A.process.executeWait('python', '--version');
console.log(res.retcode, res.stdout, res.stderr);
```

## exists(pid) <Badge type="tip" text="Since 26.10.10" /> {#exists}

检查指定进程是否存在。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| pid | number | 进程号。 |

| 返回值 | 说明 |
|:---|:---|
| boolean | 进程是否存在。 |

```javascript
const alive = await __A.process.exists(1234);
```

## getInformation(pid) <Badge type="tip" text="Since 26.10.10" /> {#getInformation}

获取指定进程的详细信息。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| pid | number | 进程号。 |

| 返回值 | 说明 |
|:---|:---|
| object | 进程信息，包含： |
|  | - ok (bool): 是否成功 |
|  | - info (dict \| null): 进程信息字典（psutil 的 as\_dict 结果） |
|  | - msg (str): 结果描述 |

```javascript
const res = await __A.process.getInformation(1234);
if (res.ok) console.log(res.info.name, res.info.cpu_percent);
```

## kill(pid) <Badge type="tip" text="Since 26.10.10" /> {#kill}

强制终止指定进程。

::: info 注意
UNIX 下发送 SIGKILL；Windows 下使用 TerminateProcess。
:::
::: danger 危险
进程会被立即终止，不给机会保存数据。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| pid | number | 进程号。 |

| 返回值 | 说明 |
|:---|:---|
| object | 操作结果，包含： |
|  | - ok (bool): 是否成功 |
|  | - msg (str): 结果描述 |

```javascript
const res = await __A.process.kill(1234);
```

## list() <Badge type="tip" text="Since 26.10.10" /> {#list}

获取当前所有进程的 PID 列表。

| 返回值 | 说明 |
|:---|:---|
| array | 进程号列表。 |

```javascript
const pids = await __A.process.list();
```

## resume(pid) <Badge type="tip" text="Since 26.10.10" /> {#resume}

恢复指定进程。

::: info 注意
UNIX 下发送 SIGCONT；Windows 下恢复所有线程。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| pid | number | 进程号。 |

| 返回值 | 说明 |
|:---|:---|
| object | 操作结果，包含： |
|  | - ok (bool): 是否成功 |
|  | - msg (str): 结果描述 |

```javascript
const res = await __A.process.resume(1234);
```

## sendSignal(pid, signal) <Badge type="tip" text="Since 26.10.10" /> {#sendSignal}

向指定进程发送信号。

::: info 注意
UNIX 下等价于 os.kill(pid, sig)；
Windows 下仅支持 SIGTERM、CTRL\_C\_EVENT、CTRL\_BREAK\_EVENT，
其中 SIGTERM 被当作 kill() 的别名。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| pid | number | 进程号。 |
| signal | number | 信号值（见 signal 模块常量）。 |

| 返回值 | 说明 |
|:---|:---|
| object | 操作结果，包含： |
|  | - ok (bool): 是否成功 |
|  | - msg (str): 结果描述 |

```javascript
const res = await __A.process.sendSignal(1234, 15);  // SIGTERM
```

## suspend(pid) <Badge type="tip" text="Since 26.10.10" /> {#suspend}

挂起指定进程。

::: info 注意
UNIX 下发送 SIGSTOP；Windows 下挂起所有线程。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| pid | number | 进程号。 |

| 返回值 | 说明 |
|:---|:---|
| object | 操作结果，包含： |
|  | - ok (bool): 是否成功 |
|  | - msg (str): 结果描述 |

```javascript
const res = await __A.process.suspend(1234);
```

## terminate(pid) <Badge type="tip" text="Since 26.10.10" /> {#terminate}

终止指定进程。

::: info 注意
UNIX 下发送 SIGTERM；Windows 下等价于 kill()。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| pid | number | 进程号。 |

| 返回值 | 说明 |
|:---|:---|
| object | 操作结果，包含： |
|  | - ok (bool): 是否成功 |
|  | - msg (str): 结果描述 |

```javascript
const res = await __A.process.terminate(1234);
```
