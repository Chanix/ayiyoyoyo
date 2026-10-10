---
layout: doc
---

# ayiyoyoyo.api.clipboard <Badge type="tip" text="Since 26.9.30.1" />

剪贴板支持（增强版）

向前端 JS 提供系统剪贴板读写能力，支持文本与图片。

图片以 base64 编码的 PNG 格式在 bridge 上传输。

## clear() <Badge type="tip" text="Since 26.9.30.1" /> {#clear}

清空剪贴板。

```javascript
await __A.clipboard.clear();
```

## getImage() <Badge type="tip" text="Since 26.9.30.1" /> {#getImage}

从剪贴板读取图片，返回 base64 编码的 PNG。

| 返回值 | 说明 |
|:---|:---|
| string | base64 编码的 PNG 图片数据；若剪贴板中无图片或读取失败，返回空字符串 |

```javascript
const b64 = await __A.clipboard.getImage();
if (b64) document.querySelector('#preview').src =
    `data:image/png;base64,${b64}`;
```

## getText() <Badge type="tip" text="Since 26.9.30.1" /> {#getText}

获取剪贴板中的文本。

| 返回值 | 说明 |
|:---|:---|
| string | 剪贴板文本；若剪贴板为空或读取失败，返回空字符串 |

```javascript
text = await __A.clipboard.getText();
```

## setImage(base64_data) <Badge type="tip" text="Since 26.9.30.1" /> {#setImage}

将 base64 编码的图片写入剪贴板。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| base64_data | string | base64 编码的图片数据（PNG/JPG 均可，内部会统一转为 RGBA 像素） |

```javascript
await __A.clipboard.setImage(base64String);
```

## setText(text) <Badge type="tip" text="Since 26.9.30.1" /> {#setText}

将文本写入剪贴板。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| text | string | 要复制的文本，默认空字符串 |

```javascript
await __A.clipboard.setText("this is a text");
```
