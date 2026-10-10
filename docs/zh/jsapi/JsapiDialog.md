---
layout: doc
---

# ayiyoyoyo.api.dialog <Badge type="tip" text="Since 25.5.1.1" />

提供对原生系统对话框的支持

支持以下几种：
- 打开文件
- 保存文件
- 选择文件夹
- 确认框

参数中文件扩展名的定义：

类型1 (\*.ext11;\*.ext12;\*.ext13...) | 类型2 (\*.ext21;\*.ext22;\*.ext23...) ...

例如：
    文本文件 (\*.txt;\*.md) | 程序源码 (\*.c;\*.py;\*.java;\*.cpp)

## confirm(message, title) <Badge type="tip" text="Since 25.5.1.1" /> {#confirm}

确认对话框

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| title | string | (可选) 对话框标题，默认为 ''。 |
| message | string | (可选) 对话框内容，默认为 ''。 |

| 返回值 | 说明 |
|:---|:---|
| boolean | 选择 确认 返回 true，其他返回 false。 |

```javascript
await __A.dialog.confirm('真的确认下一步操作吗？', '请确认');
```

## openDir(directory, allow_multiple) <Badge type="tip" text="Since 25.5.1.1" /> {#openDir}

选择文件夹（目录）对话框

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| directory | string | (可选) 打开的目录路径，默认为 null。 |
| allow_multiple | boolean | (可选) 是否允许多选，默认为 false。 |

| 返回值 | 说明 |
|:---|:---|
| array \| null | 选择的所有文件列表，取消或其他退出返回 null。 |

```javascript
await __A.dialog.openDir();

await __A.dialog.openDir(null, true);

await __A.dialog.openDir('', false);
```

## openFile(directory, file_types_in_str, allow_multiple) <Badge type="tip" text="Since 25.5.1.1" /> {#openFile}

打开文件对话框

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| directory | string | (可选) 打开的目录路径，默认为 null。 |
| file_types_in_str | string | (可选) 文件扩展名，默认为 " (\*.\*)"。参见本模块文件扩展名定义说明。 |
| allow_multiple | boolean | (可选) 是否允许多选，默认为 false。 |

| 返回值 | 说明 |
|:---|:---|
| array \| null | 选择的所有文件列表，取消或其他退出返回 null。 |

```javascript
await __A.dialog.openFile();

await __A.dialog.openFile(null, '所有文件 (*.*) | 文档文件 (*.doc;*.md;*.txt) | 程序源码 (*.c;*.cpp;*.py;*.java)', true);
```

## saveFile(directory, file_types_in_str) <Badge type="tip" text="Since 25.5.1.1" /> {#saveFile}

另存为对话框

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| directory | string | (可选) 打开的目录路径，默认为 null。 |
| file_types_in_str | string | (可选) 文件扩展名，默认为 " (\*.\*)"。参见本模块文件扩展名定义说明。 |

| 返回值 | 说明 |
|:---|:---|
| array \| null | 选择的所有文件列表，取消或其他退出返回 null。 |

```javascript
await __A.dialog.saveFile();

await __A.dialog.openFile(null, '所有文件 (*.*) | 文档文件 (*.doc;*.md;*.txt) | 程序源码 (*.c;*.cpp;*.py;*.java)', true);
```
