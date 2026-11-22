---
layout: doc
---

# ayiyoyoyo.api.runtime <Badge type="tip" text="Since 26.11.11.1" />

运行时信息与控制。

提供当前应用运行时的控制、动态资源信息和系统查询。

平台判断等静态信息请用 window.ayiyoyoyo：
    window.ayiyoyoyo.osType       'windows' / 'linux' / 'macos' / 'other'
    window.ayiyoyoyo.osArch       'x86\_64' / 'arm64' / 'x86' / 其他
    window.ayiyoyoyo.appVersion   基座版本
    window.ayiyoyoyo.pythonVersion Python 版本
    window.ayiyoyoyo.pid          当前进程 PID

本模块只提供运行时控制、动态资源信息和系统查询。
所有返回 psutil 对象的方法均由 @jsonify 序列化。

## exit(retcode) <Badge type="tip" text="Since 26.11.11.1" /> {#exit}

退出当前应用。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| retcode | number | (可选) 进程退出码，默认为 0。 |

```javascript
await __A.runtime.exit();
await __A.runtime.exit(1);
```

## getBootTime() <Badge type="tip" text="Since 26.12.12.1" /> {#getBootTime}

获取系统启动时间戳（Unix 时间）。

```javascript
const ts = await __A.runtime.getBootTime();
```

## getCpuCount(logical) <Badge type="tip" text="Since 26.12.12.1" /> {#getCpuCount}

获取 CPU 核心数。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| logical | boolean | (可选) true 返回逻辑核心数，false 返回物理核心数。默认 true。 |

| 返回值 | 说明 |
|:---|:---|
| number \| null | 核心数；拿不到时为 null。 |

```javascript
const n = await __A.runtime.getCpuCount();
const physical = await __A.runtime.getCpuCount(false);
```

## getCpuFreq(percpu) <Badge type="tip" text="Since 26.12.12.1" /> {#getCpuFreq}

获取 CPU 频率。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| percpu | boolean | (可选) true 返回每个核心，false 返回总计。默认 false。 |

```javascript
const f = await __A.runtime.getCpuFreq();
```

## getCpuPercent(percpu) <Badge type="tip" text="Since 26.12.12.1" /> {#getCpuPercent}

获取 CPU 使用率百分比（瞬时，非阻塞）。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| percpu | boolean | (可选) true 返回每个核心的列表，false 返回总使用率。默认 false。 |

| 返回值 | 说明 |
|:---|:---|
| number \| array | 使用率百分比。 |

```javascript
const p = await __A.runtime.getCpuPercent();
const per = await __A.runtime.getCpuPercent(true);
```

## getCpuStats() <Badge type="tip" text="Since 26.12.12.1" /> {#getCpuStats}

获取 CPU 统计信息（上下文切换、中断等）。

```javascript
const s = await __A.runtime.getCpuStats();
```

## getCpuTimes(percpu) <Badge type="tip" text="Since 26.12.12.1" /> {#getCpuTimes}

获取 CPU 时间统计。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| percpu | boolean | (可选) true 返回每个核心，false 返回总计。默认 false。 |

```javascript
const t = await __A.runtime.getCpuTimes();
```

## getCpuTimesPercent(percpu) <Badge type="tip" text="Since 26.12.12.1" /> {#getCpuTimesPercent}

获取 CPU 时间占比统计（瞬时）。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| percpu | boolean | (可选) true 返回每个核心，false 返回总计。默认 false。 |

```javascript
const t = await __A.runtime.getCpuTimesPercent();
```

## getDiskIoCounters(perDisk, nowrap) <Badge type="tip" text="Since 26.12.12.1" /> {#getDiskIoCounters}

获取磁盘 IO 统计。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| perDisk | boolean | (可选) true 返回每个磁盘，false 返回总计。默认 false。 |
| nowrap | boolean | (可选) 是否把计数器字段包装成 namedtuple。默认 true。 |

```javascript
const io = await __A.runtime.getDiskIoCounters();
```

## getDiskPartitions(allDisk) <Badge type="tip" text="Since 26.12.12.1" /> {#getDiskPartitions}

获取磁盘分区列表。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| allDisk | boolean | (可选) true 包含伪文件系统（tmpfs 等），false 只含物理磁盘。默认 false。 |

```javascript
const parts = await __A.runtime.getDiskPartitions();
```

## getDiskUsage(path) <Badge type="tip" text="Since 26.12.12.1" /> {#getDiskUsage}

获取指定路径所在磁盘的使用情况。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | (可选) 路径。为 null 时用基座数据目录。 |

```javascript
const u = await __A.runtime.getDiskUsage();
const u2 = await __A.runtime.getDiskUsage('/home');
```

## getLoadAvg() <Badge type="tip" text="Since 26.12.12.1" /> {#getLoadAvg}

获取系统平均负载（1/5/15 分钟）。

| 返回值 | 说明 |
|:---|:---|
| array | (1min, 5min, 15min)；部分平台不支持时返回 null。 |

```javascript
const [a, b, c] = await __A.runtime.getLoadAvg();
```

## getNetConnections(kind) <Badge type="tip" text="Since 26.12.12.1" /> {#getNetConnections}

获取当前网络连接。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| kind | string | (可选) 'inet' / 'inet4' / 'inet6' / 'tcp' / 'udp' / 'all' 等。默认 'inet'。 |

```javascript
const conns = await __A.runtime.getNetConnections();
```

## getNetIfAddrs() <Badge type="tip" text="Since 26.12.12.1" /> {#getNetIfAddrs}

获取网卡地址列表。

```javascript
const addrs = await __A.runtime.getNetIfAddrs();
```

## getNetIfStats() <Badge type="tip" text="Since 26.12.12.1" /> {#getNetIfStats}

获取网卡状态（是否 up、速率等）。

```javascript
const stats = await __A.runtime.getNetIfStats();
```

## getNetIoCounters(perNic, nowrap) <Badge type="tip" text="Since 26.12.12.1" /> {#getNetIoCounters}

获取网络 IO 统计。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| perNic | boolean | (可选) true 返回每个网卡，false 返回总计。默认 false。 |
| nowrap | boolean | (可选) 是否把计数器字段包装成 namedtuple。默认 true。 |

```javascript
const io = await __A.runtime.getNetIoCounters();
```

## getSensorsBattery() <Badge type="tip" text="Since 26.12.12.1" /> {#getSensorsBattery}

获取电池信息。无电池或平台不支持时返回空 dict。

```javascript
const b = await __A.runtime.getSensorsBattery();
if (b.percent !== undefined) console.log(b.percent);
```

## getSensorsFans() <Badge type="tip" text="Since 26.12.12.1" /> {#getSensorsFans}

获取风扇转速。平台/硬件不支持时返回空 dict。

```javascript
const fans = await __A.runtime.getSensorsFans();
```

## getSensorsTemperatures(fahrenheit) <Badge type="tip" text="Since 26.12.12.1" /> {#getSensorsTemperatures}

获取温度传感器数据。平台/硬件不支持时返回空 dict。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| fahrenheit | boolean | (可选) true 返回华氏度。默认 false。 |

```javascript
const temps = await __A.runtime.getSensorsTemperatures();
```

## getSwapMemory() <Badge type="tip" text="Since 26.12.12.1" /> {#getSwapMemory}

获取交换分区信息。

```javascript
const s = await __A.runtime.getSwapMemory();
```

## getUsers() <Badge type="tip" text="Since 26.12.12.1" /> {#getUsers}

获取当前登录用户列表。

```javascript
const users = await __A.runtime.getUsers();
```

## getVirtualMemory() <Badge type="tip" text="Since 26.12.12.1" /> {#getVirtualMemory}

获取虚拟内存信息。

```javascript
const m = await __A.runtime.getVirtualMemory();
console.log(m.percent);
```

## noop() <Badge type="tip" text="Since 26.11.11.1" /> {#noop}

空操作。

不执行任何逻辑，直接返回。主要用途：

- 验证 jsapi 是否正确注册、bridge 是否连通。
- 作为最小调用的，测量一次 bridge 往返的耗时。

```javascript
await __A.runtime.noop();
```
