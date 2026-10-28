---
layout: doc
---

# ayiyoyoyo.api.appchip <Badge type="tip" text="Since 25.5.1.1" />

管理小应用，包括运行、安装、卸载、打包等。

::: warning 警告
本模块仅供 ayiyoyoyo 专用，如非必要请不要使用。
:::

## createBlank(config) <Badge type="tip" text="Since 25.10.28" /> {#createBlank}

创建新的小应用（从空白骨架开始）。

::: info 注意
与 createRemote / createLocalhost 对称，由基座生成最小骨架：
appchip.json + webroot/index.html + js/mainwin\_on\_loaded.js。
空白模板不抓取图标，返回结果 icon 恒为 False。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| config | object | 小应用配置，必须包含 id 和 name。 |

| 返回值 | 说明 |
|:---|:---|
| object | 创建结果，包含 ok / id / msg / path / icon。 |

```javascript
const res = await __A.appchip.createBlank({
    id: 'my-app',
    name: '我的应用',
    win_width: 1024,
    win_height: 768,
});
```

## createLocalhost(config, src_dir) <Badge type="tip" text="Since 25.5.1.1" /> {#createLocalhost}

创建新的小应用（包装本地网站）。

将指定的本地网站目录整体复制到新小应用的 webroot/ 下，入口固定为 index.html。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| config | object | 小应用配置，字段见下方 @example。 |
| src_dir | string | 本地网站目录的完整路径。 |

| 返回值 | 说明 |
|:---|:---|
| object | 创建结果，包含 ok / id / msg / path / icon。 |

```javascript
const res = await __A.appchip.createLocalhost({ name: '我的应用' }, 'path');
```

## createRemote(config) <Badge type="tip" text="Since 25.5.1.1" /> {#createRemote}

创建新的小应用（包装远程网站）。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| config | object | 小应用配置，字段见下方 @example。 |

| 返回值 | 说明 |
|:---|:---|
| object | 创建结果，包含 ok / id / msg / path / icon。 |

```javascript
const res = await __A.appchip.createRemote({
    name: '我的应用',
    url: 'https://example.com',
    win_width: 1280,
    win_height: 800,
});
```

## exist(appchip_id) <Badge type="tip" text="Since 25.5.1.1" /> {#exist}

判断指定小应用是否已安装。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | 小应用标识 |

| 返回值 | 说明 |
|:---|:---|
| boolean | 小应用是否存在。 |

```javascript
await __A.appchip.exist('default');
```

## getDirAppchip(appchip_id) <Badge type="tip" text="Since 25.5.1.1" /> {#getDirAppchip}

获取指定小应用的程序目录。

::: info 注意
仅按规范拼接路径，不检查指定小应用是否真实存在。
内置小应用无磁盘目录，返回 None。
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

| 返回值 | 说明 |
|:---|:---|
| object | 安装结果，包含 ok / id / msg。 |

```javascript
const res = await __A.appchip.installFromUrl('https://example.com/myapp.zip');
```

## installFromZip(zip_file) <Badge type="tip" text="Since 25.5.1.1" /> {#installFromZip}

从 zip 文件安装小应用（覆盖安装）。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| zip_file | string | zip 文件路径。 |

| 返回值 | 说明 |
|:---|:---|
| object | 安装结果，包含 ok / id / msg。 |

```javascript
const res = await __A.appchip.installFromZip('C:/downloads/myapp.zip');
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

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | 小应用标识。 |
| out_dir | string | 输出目录的完整路径。 |

| 返回值 | 说明 |
|:---|:---|
| object | 打包结果，包含 ok / id / msg / path / size / overwritten。 |

```javascript
const res = await __A.appchip.pack('myapp', 'C:/out');
```

## resetDirData(appchip_id) <Badge type="tip" text="Since 25.10.28" /> {#resetDirData}

清空指定小应用的数据目录内容，保留目录本身。

::: info 注意
数据目录对应 getDirData()，程序目录不受影响。
目录不存在视为成功。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |

| 返回值 | 说明 |
|:---|:---|
| object | 结果，包含 ok / id / msg。 |

```javascript
const res = await __A.appchip.resetData('myapp');
```

## resetDirWebview(appchip_id) <Badge type="tip" text="Since 25.10.28" /> {#resetDirWebview}

清空指定小应用的浏览器数据目录内容，保留目录本身。

::: info 注意
浏览器数据目录对应 getDirWebview()，程序目录与数据目录不受影响。
目录不存在视为成功。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |

| 返回值 | 说明 |
|:---|:---|
| object | 结果，包含 ok / id / msg。 |

```javascript
const res = await __A.appchip.resetWebview('myapp');
```

## run(appchip_id, params, in_debug_mode) <Badge type="tip" text="Since 25.5.1.1" /> {#run}

以独立进程运行指定小应用（不等待其结束）。

根据 in\_debug\_mode 选择生产版或 DEBUG 版（Kit）执行文件：
- in\_debug\_mode=True  → 启动同目录的 xxxKit 版本；
- in\_debug\_mode=False → 启动当前执行文件（生产版）；
- in\_debug\_mode=None  → 取 ayiyoyoyo.is\_debug（默认行为）。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |
| params | string | (可选) 附加命令行参数，按 shell 规则解析。默认为 ""。 |
| in_debug_mode | boolean | (可选) 是否以 DEBUG 模式运行。 |

| 返回值 | 说明 |
|:---|:---|
| number | 新运行小应用的进程号（PID）。 |

```javascript
const pid = await __A.appchip.run('myapp');
const pid2 = await __A.appchip.run('myapp', '--verbose', false);
const pid3 = await __A.appchip.run('myapp', '', true);
```

## runWait(appchip_id, params, in_debug_mode) <Badge type="tip" text="Since 25.5.1.1" /> {#runWait}

运行指定小应用并等待其执行完毕，返回运行结果。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |
| params | string | (可选) 附加命令行参数，按 shell 规则解析。默认为 ""。 |
| in_debug_mode | boolean | (可选) 是否以 DEBUG 模式运行。 |

| 返回值 | 说明 |
|:---|:---|
| object | 执行结果，包含 retcode / stdout / stderr。 |

```javascript
const result = await __A.appchip.runWait('default');
console.log(result.retcode, result.stdout, result.stderr);
```

## uninstall(appchip_id, purge) <Badge type="tip" text="Since 25.5.1.1" /> {#uninstall}

卸载指定小应用。

- 当 purge 为 True 时，删除小应用的程序包、数据目录与 Webview 数据目录；
- 当 purge 为 False 时，仅删除程序包，保留数据。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | 小应用标识。 |
| purge | boolean | (可选) 是否彻底删除所有相关数据。默认为 false。 |

| 返回值 | 说明 |
|:---|:---|
| object | 卸载结果，包含 ok / id / msg。 |

```javascript
await __A.appchip.uninstall('myapp');
await __A.appchip.uninstall('myapp', true);
```
