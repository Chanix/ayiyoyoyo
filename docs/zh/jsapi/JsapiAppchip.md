---
layout: doc
---

# ayiyoyoyo.api.appchip <Badge type="tip" text="Since 25.5.1.1" />

管理小应用，包括运行、安装、卸载、打包等。

::: warning 警告
本模块仅供 ayiyoyoyo 内部小应用专用，其他小应用请不要使用本模块。
:::

## createLocalhost(config, src_dir) <Badge type="tip" text="Since 25.5.1.1" /> {#createLocalhost}

创建新的小应用（包装本地网站）。

将指定的本地网站目录整体复制到新小应用的 webroot/ 下，
入口固定为 index.html。

要求：
- src\_dir 必须存在且为目录；
- src\_dir 根目录下必须有 index.html；
- 不做文件排除，整目录复制，由用户自行保证目录干净。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| config | object | 小应用配置，包含： |
| src_dir | string | 本地网站目录的完整路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| id | string \| null | 生成的小应用标识 |
| msg | string | 结果描述 |
| path | string \| null | 小应用目录的完整路径 |
| icon | boolean | 是否成功获取图标 |

```javascript
const res = await __A.appchip.createLocalhost({ name: '我的应用' }, 'path');
if (res.ok) console.log('created:', res.id, res.path, res.icon);
```

## createRemote(config) <Badge type="tip" text="Since 25.5.1.1" /> {#createRemote}

创建新的小应用（包装远程网站）。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| config | object | 小应用配置，包含： |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| id | string \| null | 生成的小应用标识 |
| msg | string | 结果描述 |
| path | string \| null | 小应用目录的完整路径 |
| icon | boolean | 是否成功获取网站图标 |

```javascript
const res = await __A.appchip.createRemote({
    name: '我的应用',
    url: 'https://example.com',
    win_width: 1280,
    win_height: 800,
});
if (res.ok) console.log('created:', res.id, res.path, res.icon);
```

## exist(appchip_id) <Badge type="tip" text="Since 25.5.1.1" /> {#exist}

判断指定小应用是否已安装。

::: info 注意
内置小应用（BUILTIN\_APPCHIPS）永远存在，返回 True。
（当前 \_is\_builtin\_appchip 为占位实现，恒 False，故暂按磁盘目录判断。）
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | 小应用标识 |

| 返回值 | 说明 |
|:---|:---|
| boolean | 小应用是否存在（内置应用或程序目录为有效目录）。 |

```javascript
await __A.appchip.exist('default');
```

## getDirAppchip(appchip_id) <Badge type="tip" text="Since 25.5.1.1" /> {#getDirAppchip}

获取指定小应用的程序目录。

::: info 注意
仅按规范拼接路径，不检查指定小应用是否真实存在。
内置小应用无磁盘目录，返回 None。
（当前 \_is\_builtin\_appchip 为占位实现，恒 False，故暂不返回 None。）
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |

| 返回值 | 说明 |
|:---|:---|
| string \| null | 小应用程序目录的绝对路径；内置小应用返回 null。 |

```javascript
const dir = await __A.appchip.getDirAppchip('default');
const currentDir = await __A.appchip.getDirAppchip(); // 默认为当前小应用
```

## getDirData(appchip_id) <Badge type="tip" text="Since 25.5.1.1" /> {#getDirData}

获取指定小应用的数据目录。

::: info 注意
仅按规范拼接路径，不检查指定小应用是否真实存在。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |

| 返回值 | 说明 |
|:---|:---|
| string | 小应用数据目录的绝对路径。 |

```javascript
await __A.appchip.getDirData();
await __A.appchip.getDirData('default');
```

## getDirWebview(appchip_id) <Badge type="tip" text="Since 25.5.1.1" /> {#getDirWebview}

获取指定小应用的浏览器控件数据目录。

::: info 注意
仅按规范拼接路径，不检查指定小应用是否真实存在。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |

| 返回值 | 说明 |
|:---|:---|
| string | 小应用浏览器控件数据目录的绝对路径。 |

```javascript
await __A.appchip.getDirWebview();
await __A.appchip.getDirWebview('default');
```

## installFromUrl(url) <Badge type="tip" text="Since 25.5.1.1" /> {#installFromUrl}

从指定网址下载 zip 并安装小应用。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| url | string | zip 文件的下载地址。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| id | string \| null | 小应用标识（失败时可能为 null） |
| msg | string | 结果描述 |

```javascript
const res = await __A.appchip.installFromUrl('https://example.com/myapp.zip');
if (res.ok) console.log('installed:', res.id);
else console.error(res.msg);
```

## installFromZip(zip_file) <Badge type="tip" text="Since 25.5.1.1" /> {#installFromZip}

从 zip 文件安装小应用（覆盖安装）。

安装流程：
1. 读取 zip 中的 appchip.json，校验字段与 id 格式；
2. 解压到临时目录（原子化，避免半成品）；
3. 校验通过后清空旧程序目录，整体 move；
4. 创建数据目录与 Webview 数据目录（已存在则保留）。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| zip_file | string | zip 文件路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| id | string \| null | 小应用标识（失败时可能为 null） |
| msg | string | 结果描述 |

```javascript
const res = await __A.appchip.installFromZip('C:/downloads/myapp.zip');
if (res.ok) console.log('installed:', res.id);
else console.error(res.msg);
```

## isKitAvailable() <Badge type="tip" text="Since 25.5.1.1" /> {#isKitAvailable}

判断同目录下是否存在 DEBUG 版（Kit）执行文件。

| 返回值 | 说明 |
|:---|:---|
| boolean | Kit 版是否可用。 |

```javascript
const ok = await __A.appchip.isKitAvailable();
```

## list() <Badge type="tip" text="Since 25.5.1.1" /> {#list}

获取所有已安装的小应用列表（不包含以 '\_' 开头的小应用）。

| 返回值 | 说明 |
|:---|:---|
| array | 按小应用 ID 升序排列的对象列表。 |

```javascript
// 获取所有已安装的小应用列表（包括默认小应用）
const all_appchips = await __A.appchip.list();
```

## pack(appchip_id, out_dir) <Badge type="tip" text="Since 25.5.1.1" /> {#pack}

将已安装的小应用打包为可分发的 zip。

输出文件名固定为 <appchip\_id>.zip，放在指定目录下。
如果目标文件已存在，直接覆盖。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | 小应用标识。 |
| out_dir | string | 输出目录的完整路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| id | string \| null | 小应用标识 |
| msg | string | 结果描述 |
| path | string \| null | 生成的 zip 完整路径 |
| size | number \| null | 生成的 zip 大小（字节） |
| overwritten | boolean | 是否覆盖了已存在的文件 |

```javascript
const res = await __A.appchip.pack('myapp', 'C:/out');
if (res.ok) console.log('packed:', res.path, res.size, res.overwritten);
```

## run(appchip_id, params, in_debug_mode) <Badge type="tip" text="Since 25.5.1.1" /> {#run}

以独立进程运行指定小应用（不等待其结束）。

根据 in\_debug\_mode 选择生产版或 DEBUG 版（Kit）执行文件：
- in\_debug\_mode=True  → 启动同目录的 xxxKit 版本；
- in\_debug\_mode=False → 启动当前执行文件（生产版）；
- in\_debug\_mode=None  → 取 ayiyoyoyo.is\_debug（默认行为）。

::: info 注意
若当前已经是 Kit 版（文件名以 'Kit' 结尾），无论 in\_debug\_mode 为何，
都直接启动自身，避免拼出 xxxKitKit。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |
| params | string | (可选) 附加命令行参数，按 shell 规则解析。默认为 ""。 |
| in_debug_mode | boolean | (可选) 是否以 DEBUG 模式运行。 |

| 返回值 | 说明 |
|:---|:---|
| number | 新运行小应用的进程号（PID）。 |

```javascript
// 跟随当前环境（默认）
const pid = await __A.appchip.run('myapp');

// 强制走生产版
const pid2 = await __A.appchip.run('myapp', '--verbose', false);

// 强制走 DEBUG（Kit）版
const pid3 = await __A.appchip.run('myapp', '', true);
```

## runWait(appchip_id, params, in_debug_mode) <Badge type="tip" text="Since 25.5.1.1" /> {#runWait}

运行指定小应用并等待其执行完毕，返回运行结果。

参数语义与 run 完全一致，in\_debug\_mode 决定生产版 / Kit 版。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |
| params | string | (可选) 附加命令行参数，按 shell 规则解析。默认为 ""。 |
| in_debug_mode | boolean | (可选) 是否以 DEBUG 模式运行。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| retcode | number | 进程返回码 |
| stdout | string | 标准输出 |
| stderr | string | 标准错误 |

```javascript
const result = await __A.appchip.runWait('default');
console.log(result.retcode, result.stdout, result.stderr);

// 强制走 DEBUG 版
const r2 = await __A.appchip.runWait('myapp', '', true);
```

## uninstall(appchip_id, purge) <Badge type="tip" text="Since 25.5.1.1" /> {#uninstall}

卸载指定小应用。

- 当 purge 为 True 时，删除小应用的程序包、数据目录与 Webview 数据目录；
- 当 purge 为 False 时，仅删除程序包，保留数据，便于重新安装后继续使用。

::: info 注意
保留标识（\_\_default\_\_）不允许卸载。内置小应用待 \_is\_builtin\_appchip 落地后同样禁止。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | 小应用标识。 |
| purge | boolean | (可选) 是否彻底删除所有相关数据。默认为 false。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| id | string \| null | 小应用标识 |
| msg | string | 结果描述 |

```javascript
await __A.appchip.uninstall('myapp');           // 保留数据
await __A.appchip.uninstall('myapp', true);     // 彻底删除
```
