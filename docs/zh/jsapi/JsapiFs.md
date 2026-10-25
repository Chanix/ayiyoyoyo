---
layout: doc
---

# ayiyoyoyo.api.fs <Badge type="tip" text="Since 25.5.1.1" />

文件系统操作。

提供读写文本、二进制、目录操作等能力，以当前用户权限运行。

## basename(path) <Badge type="tip" text="Since 25.5.1.1" /> {#basename}

获取路径的文件名部分。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| name | string | 文件名 |

```javascript
const res = await __A.fs.basename('C:/a/b.txt');  // res.name === 'b.txt'
```

## copy(src, dst, overwrite) <Badge type="tip" text="Since 25.5.1.1" /> {#copy}

复制文件或目录。

::: info 注意
文件用 shutil.copy2（保留元数据）；目录用 shutil.copytree。
默认 overwrite=False，目标已存在则失败。
目录 overwrite=True 时先删目标目录再复制（不合并）。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| src | string | 源路径。 |
| dst | string | 目标路径。 |
| overwrite | boolean | (可选) 目标已存在时是否覆盖。默认 false。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |

```javascript
await __A.fs.copy('C:/a.txt', 'C:/a.bak');
await __A.fs.copy('C:/dir', 'C:/dir2', true);
```

## dirname(path) <Badge type="tip" text="Since 25.5.1.1" /> {#dirname}

获取路径的父目录部分。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| dir | string | 父目录 |

```javascript
const res = await __A.fs.dirname('C:/a/b.txt');  // res.dir === 'C:/a'
```

## exists(path) <Badge type="tip" text="Since 25.5.1.1" /> {#exists}

判断路径是否存在。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 查询本身是否成功 |
| msg | string | 结果描述 |
| exists | boolean | 是否存在 |

```javascript
const res = await __A.fs.exists('C:/a.txt');
if (res.exists) console.log('存在');
```

## isDir(path) <Badge type="tip" text="Since 25.5.1.1" /> {#isDir}

判断路径是否为目录。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| is_dir | boolean | 是否为目录 |

```javascript
const res = await __A.fs.isDir('C:/dir');
```

## isFile(path) <Badge type="tip" text="Since 25.5.1.1" /> {#isFile}

判断路径是否为文件。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| is_file | boolean | 是否为文件 |

```javascript
const res = await __A.fs.isFile('C:/a.txt');
```

## join(parts) <Badge type="tip" text="Since 25.5.1.1" /> {#join}

拼接路径。

::: info 注意
用系统分隔符拼接，自动处理多余的分隔符。
:::

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| path | string \| null | 拼接结果 |

```javascript
const res = await __A.fs.join('C:/a', 'b', 'c.txt');
// res.path === 'C:/a/b/c.txt'（Windows 下为 C:\a\b\c.txt）
```

## listDir(path) <Badge type="tip" text="Since 25.5.1.1" /> {#listDir}

列出目录内容（不递归）。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 目录路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| entries | array \| null | 条目列表，每项含： |
| name | string | 名称 |
| path | string | 完整路径 |
|  |  | is_file (bool) |
|  |  | is_dir (bool) |
| size | number | 字节数（目录为 0） |
| mtime | number | 修改时间戳 |

```javascript
const res = await __A.fs.listDir('C:/dir');
if (res.ok) for (const e of res.entries) console.log(e.name, e.is_dir);
```

## mkdirs(path) <Badge type="tip" text="Since 25.5.1.1" /> {#mkdirs}

递归创建目录（含所有需要的父目录）。

::: info 注意
目录已存在时不报错。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 目录路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| created | boolean | 是否本次新建（已存在为 false） |

```javascript
await __A.fs.mkdirs('C:/a/b/c');
```

## readBase64(path) <Badge type="tip" text="Since 25.5.1.1" /> {#readBase64}

读取二进制文件并返回 base64。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 文件路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| base64 | string \| null | base64 内容（成功时） |
| size | number \| null | 字节数（成功时） |

```javascript
const res = await __A.fs.readBase64('C:/a.png');
if (res.ok) img.src = 'data:image/png;base64,' + res.base64;
```

## readText(path, encoding) <Badge type="tip" text="Since 25.5.1.1" /> {#readText}

读取文本文件。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 文件路径。 |
| encoding | string | (可选) 编码，默认 'utf-8-sig'。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| text | string \| null | 文件内容（成功时） |

```javascript
const res = await __A.fs.readText('C:/a.txt');
if (res.ok) console.log(res.text);
```

## remove(path) <Badge type="tip" text="Since 25.5.1.1" /> {#remove}

删除文件或空目录。

::: info 注意
路径不存在时视为已删除，返回成功。
目录非空时会失败，请用 rmtree。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |

```javascript
await __A.fs.remove('C:/a.txt');
```

## rename(src, dst) <Badge type="tip" text="Since 25.5.1.1" /> {#rename}

重命名或移动文件/目录。

::: info 注意
目标已存在时覆盖（文件/空目录），非空目录会失败。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| src | string | 源路径。 |
| dst | string | 目标路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |

```javascript
await __A.fs.rename('C:/a.txt', 'C:/b.txt');
```

## rmtree(path) <Badge type="tip" text="Since 25.5.1.1" /> {#rmtree}

递归删除目录及其内容。

::: info 注意
路径不存在时视为已删除，返回成功。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 目录路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |

```javascript
await __A.fs.rmtree('C:/dir');
```

## stat(path) <Badge type="tip" text="Since 25.5.1.1" /> {#stat}

获取路径的元信息。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 路径。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| info | object \| null | 元信息，含 size / mtime / ctime / is\_file / is\_dir / mode |

```javascript
const res = await __A.fs.stat('C:/a.txt');
if (res.ok) console.log(res.info.size);
```

## writeBase64(path, b64, mkdir) <Badge type="tip" text="Since 25.5.1.1" /> {#writeBase64}

将 base64 写入二进制文件（原子写）。

::: info 注意
默认 mkdir=False，父目录不存在则报错。
兼容 data URL 前缀（data:image/png;base64,xxx）。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 文件路径。 |
| b64 | string | base64 字符串。 |
| mkdir | boolean | (可选) 父目录不存在时是否自动创建。默认 false。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| size | number \| null | 写入字节数（成功时） |

```javascript
await __A.fs.writeBase64('C:/a.png', base64Str);
```

## writeText(path, text, encoding, mkdir) <Badge type="tip" text="Since 25.5.1.1" /> {#writeText}

写入文本文件（原子写：临时文件 + 替换）。

::: info 注意
默认 mkdir=False，父目录不存在则报错。
写入统一用 utf-8，不写 BOM。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| path | string | 文件路径。 |
| text | string | 文本内容。 |
| encoding | string | (可选) 编码，默认 'utf-8'。 |
| mkdir | boolean | (可选) 父目录不存在时是否自动创建。默认 false。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |
| size | number \| null | 写入字节数（成功时） |

```javascript
const res = await __A.fs.writeText('C:/a.txt', 'hello');
const res2 = await __A.fs.writeText('C:/new/dir/a.txt', 'hi', 'utf-8', true);
```
