---
layout: doc
---

# ayiyoyoyo.api.shell <Badge type="tip" text="Since 26.10.9" />

系统 Shell 交互。

## open(target) <Badge type="tip" text="Since 26.10.9" /> {#open}

用系统默认方式打开路径或 URL。

根据目标类型，交给操作系统的默认处理方式：
- 目录：在文件管理器中打开
- 文件：用注册的默认程序打开
- URL：用默认浏览器打开

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| target | string | 本地路径或 URL。 |

| 返回值 | 说明 |
|:---|:---|
| object | 操作结果，包含： |
|  | ok (bool): 是否成功发起打开动作 |
|  | msg (str): 结果描述 |

```javascript
await __A.shell.open('C:/myapp');              // 打开目录
await __A.shell.open('C:/doc.pdf');            // 打开文件
await __A.shell.open('https://example.com');   // 打开网页
```
