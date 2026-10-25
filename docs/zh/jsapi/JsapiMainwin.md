---
layout: doc
---

# ayiyoyoyo.api.mainwin <Badge type="tip" text="Since 25.5.1.1" />

提供对主窗口的操作，包括显示、隐藏、移动、缩放、标题、置顶等。

## getHeight() <Badge type="tip" text="Since 25.5.1.1" /> {#getHeight}

获取窗口高度。

| 返回值 | 说明 |
|:---|:---|
| number | 高度（像素）。 |

```javascript
const h = await __A.mainwin.getHeight();
```

## getOnTop() <Badge type="tip" text="Since 25.5.1.1" /> {#getOnTop}

获取窗口是否置顶。

| 返回值 | 说明 |
|:---|:---|
| boolean | 是否置顶。 |

```javascript
const onTop = await __A.mainwin.getOnTop();
```

## getState() <Badge type="tip" text="Since 25.5.1.1" /> {#getState}

获取窗口当前状态。

| 返回值 | 说明 |
|:---|:---|
| number | 窗口状态： -1 未知, 0 最小化, 1 普通, 2 最大化 |

```javascript
const state = await __A.mainwin.getState();
if (state === 2) console.log('窗口已最大化');
```

## getStatus() <Badge type="tip" text="Since 25.5.1.1" /> {#getStatus}

获取窗口的综合状态。

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| x | number | 窗口左上角 X 坐标 |
| y | number | 窗口左上角 Y 坐标 |
| width | number | 窗口宽度 |
| height | number | 窗口高度 |
| title | string | 窗口标题 |
| ontop | boolean | 是否置顶 |
| state | number | 窗口状态：： -1 未知, 0 最小化, 1 普通, 2 最大化 |

```javascript
const s = await __A.mainwin.getStatus();
console.log(s.x, s.y, s.width, s.height, s.state);
```

## getTitle() <Badge type="tip" text="Since 25.5.1.1" /> {#getTitle}

获取窗口标题。

| 返回值 | 说明 |
|:---|:---|
| string | 当前窗口标题。 |

```javascript
const title = await __A.mainwin.getTitle();
```

## getWidth() <Badge type="tip" text="Since 25.5.1.1" /> {#getWidth}

获取窗口宽度。

| 返回值 | 说明 |
|:---|:---|
| number | 宽度（像素）。 |

```javascript
const w = await __A.mainwin.getWidth();
```

## getX() <Badge type="tip" text="Since 25.5.1.1" /> {#getX}

获取窗口左上角 X 坐标。

| 返回值 | 说明 |
|:---|:---|
| number | X 坐标。 |

```javascript
const x = await __A.mainwin.getX();
```

## getY() <Badge type="tip" text="Since 25.5.1.1" /> {#getY}

获取窗口左上角 Y 坐标。

| 返回值 | 说明 |
|:---|:---|
| number | Y 坐标。 |

```javascript
const y = await __A.mainwin.getY();
```

## hide() <Badge type="tip" text="Since 25.5.1.1" /> {#hide}

隐藏主窗口。

```javascript
await __A.mainwin.hide();
```

## loadCss(css) <Badge type="tip" text="Since 25.5.1.1" /> {#loadCss}

注入 CSS。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| css | string | CSS 源码。 |

```javascript
await __A.mainwin.loadCss('body { background: #000; }');
```

## loadHtml(htmlcode) <Badge type="tip" text="Since 25.5.1.1" /> {#loadHtml}

加载 HTML 源码。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| htmlcode | string | HTML 源码。 |

```javascript
await __A.mainwin.loadHtml('<h1>Hello</h1>');
```

## loadUrl(url) <Badge type="tip" text="Since 25.5.1.1" /> {#loadUrl}

加载指定 URL。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| url | string | 目标 URL。 |

```javascript
await __A.mainwin.loadUrl('https://example.com');
```

## maximize() <Badge type="tip" text="Since 25.5.1.1" /> {#maximize}

最大化窗口。

```javascript
await __A.mainwin.maximize();
```

## minimize() <Badge type="tip" text="Since 25.5.1.1" /> {#minimize}

最小化窗口。

```javascript
await __A.mainwin.minimize();
```

## move(x, y) <Badge type="tip" text="Since 25.5.1.1" /> {#move}

移动窗口到指定坐标。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| x | number | X 坐标。 |
| y | number | Y 坐标。 |

```javascript
await __A.mainwin.move(100, 100);
```

## reload() <Badge type="tip" text="Since 25.5.1.1" /> {#reload}

刷新当前页面。

```javascript
await __A.mainwin.reload();
```

## resize(width, height) <Badge type="tip" text="Since 25.5.1.1" /> {#resize}

调整窗口尺寸。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| width | number | 新宽度。 |
| height | number | 新高度。 |

```javascript
await __A.mainwin.resize(800, 600);
```

## restore() <Badge type="tip" text="Since 25.5.1.1" /> {#restore}

从最大化 / 最小化状态恢复到普通状态。

```javascript
await __A.mainwin.restore();
```

## setOnTop(on_top) <Badge type="tip" text="Since 25.5.1.1" /> {#setOnTop}

设置窗口是否置顶。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| on_top | boolean | 是否置顶，默认 true。 |

```javascript
await __A.mainwin.setOnTop(true);
```

## setTitle(title) <Badge type="tip" text="Since 25.5.1.1" /> {#setTitle}

设置窗口标题。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| title | string | 新标题。 |

```javascript
await __A.mainwin.setTitle('我的应用');
```

## show() <Badge type="tip" text="Since 25.5.1.1" /> {#show}

显示主窗口。

```javascript
await __A.mainwin.show();
```

## toggleFullscreen() <Badge type="tip" text="Since 25.5.1.1" /> {#toggleFullscreen}

切换全屏状态。

```javascript
await __A.mainwin.toggleFullscreen();
```
