---
layout: doc
---

# ayiyoyoyo.api.http <Badge type="tip" text="Since 26.12.12.1" />

通用 HTTP 请求，返回结构化响应。

设计要点：
- request 同步阻塞到拿到响应，返回 {ok, status, headers, text, json, error}。
- ok=True 表示请求完成并拿到响应（不代表 status 是 2xx）。
- ok=False 表示连接失败、超时、DNS/SSL 错误等“没拿到响应”的情况。
- 在 Python 侧发请求，绕开内联 HTML 模式下前端 fetch 的 CORS/Origin 限制。
- 零新依赖，基于 urllib。
- 不支持进度和取消；大文件传输请用 JsapiDownload。

## request(method, url, headers, body, timeout) <Badge type="tip" text="Since 26.12.12.1" /> {#request}

发起一次 HTTP 请求，阻塞到拿到响应。

::: info 注意
- method 支持 GET/POST/PUT/DELETE/PATCH/HEAD 等，大小写不敏感。
- body 为字符串时按 UTF-8 编码发送；未指定 Content-Type 时默认 text/plain。
- 重定向由 urllib 默认跟随。
- 响应头键名统一转小写。
- 响应 Content-Type 含 application/json 时，尝试解析到 json 字段。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| method | string | HTTP 方法，如 'GET'、'POST'。 |
| url | string | 请求地址，仅支持 http/https。 |
| headers | object | (可选) 请求头。键值会转成字符串。 |
| body | string | (可选) 请求体文本。为 null 时不发送 body。 |
| timeout | number | (可选) 连接与读取超时（秒），默认 30。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 请求是否完成并拿到响应 |
| status | number \| null | HTTP 状态码，失败时为 null |
| headers | object | 响应头，键名小写 |
| text | string \| null | 响应体文本，失败时为 null |
| json | any \| null | 响应体为 JSON 且解析成功时的结果 |
| error | string | 错误信息，成功时为空串 |

```javascript
const res = await __A.http.request('GET', 'https://api.example.com/users');
if (res.ok && res.status === 200) console.log(res.json);

const res2 = await __A.http.request('POST', 'https://api.example.com/users',
    { 'Content-Type': 'application/json' },
    JSON.stringify({ name: 'Alice' }));
```
