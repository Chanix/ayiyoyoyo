---
layout: doc
---

# ayiyoyoyo.api.download <Badge type="tip" text="Since 26.12.12.1" />

下载文件，提供同步结果、可轮询的进度，以及取消能力。

设计要点：
- download 阻塞到下载结束，返回 {ok, path, size, error}，前端直接 await。
- download 在 bridge 工作线程执行，不碰任何 GUI，线程安全。
- progress() 只读一个加锁的字典，可在 download 阻塞期间被并发调用。
- cancel() 设置取消标志，下载线程在下一轮读循环检查后中断。
- 同一时刻只维护一份“当前下载进度”，不支持并发下载（第一版）。
- 支持 Referer 和 User-Agent，应对需要防盗链的站点。
- 文件名来源优先级：显式 file\_name > Content-Disposition > URL 路径。
- overwrite=True（默认）时覆盖同名文件；overwrite=False 时自动加 (1)、(2) 后缀。

## cancel() <Badge type="tip" text="Since 26.12.12.1" /> {#cancel}

请求取消当前下载。

只是设置取消标志，实际中断发生在下载线程的下一次读循环检查。
read() 本身阻塞在 socket 上，最多等一个分块读取时间或超时。

| 返回值 | 说明 |
|:---|:---|
| object | {ok: bool, msg: str} |

```javascript
await __A.download.cancel();
```

## download(url, file_name, save_dir, referer, user_agent, overwrite) <Badge type="tip" text="Since 26.12.12.1" /> {#download}

同步下载文件，阻塞到结束才返回。

::: info 注意
文件名来源优先级：显式 file\_name > Content-Disposition > URL 路径。
保存目录由 save\_dir 决定，为空时用当前工作目录。
下载过程中先写临时文件，确定最终文件名后再原子重命名。
overwrite=True（默认）时覆盖同名文件；overwrite=False 时自动加 (1)、(2) 后缀。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| url | string | 下载地址，仅支持 http/https。 |
| file_name | string | (可选) 文件名或绝对路径。为空时由服务器或 URL 决定。 |
| save_dir | string | (可选) 保存目录。为空时用当前工作目录。 |
| referer | string | (可选) Referer 头，为空时不发送。 |
| user_agent | string | (可选) User-Agent 头，为空时用内置浏览器 UA。 |
| overwrite | boolean | (可选) 目标文件已存在时是否覆盖。默认为 true。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| path | string \| null | 实际保存的绝对路径，失败时为 null |
| size | number \| null | 文件字节数，失败时为 null |
| error | string | 错误信息，成功时为空串；取消时为 'Cancelled by user.' |

```javascript
const res = await __A.download.download(
    'https://example.com/a.zip', '', '/home/user/Downloads',
    'https://example.com/page.html');
// 不覆盖同名文件
const res2 = await __A.download.download(
    'https://example.com/a.zip', '', '/home/user/Downloads',
    '', '', false);
```

## progress() <Badge type="tip" text="Since 26.12.12.1" /> {#progress}

获取当前下载进度。

可在 download 阻塞期间被并发调用。返回值是快照。

| 返回值 | 说明 |
|:---|:---|
| object | state / downloaded / total / speed / error / path |

```javascript
const p = await __A.download.progress();
if (p.total) bar.value = p.downloaded / p.total * 100;
```
