---
layout: doc
---

# ayiyoyoyo.api.tray <Badge type="tip" text="Since 26.12.12.1" />

系统托盘。

每个小应用独立持有自己的托盘，按 appchip\_id 隔离，互不干扰。
同一小应用同一时刻只有一个托盘；remove 后需要重新 create。

左键单击（Windows 上双击亦然）托盘图标会执行菜单里的默认项；
菜单未指定 default 时，基座自动补一个「显示主窗口」。

配合 appchip.json 的 win\_close\_to\_tray 使用：关闭窗口时隐藏到托盘，
进程继续运行，用户从托盘恢复窗口或退出。必须先 create() 出托盘，
否则关窗时没有入口能找回窗口，基座会按正常关闭处理。

当前仅 Windows 后端可用；其他平台 isAvailable 返回 False，各方法返回
“不支持”。接口按全功能固定，后端可替换。

事件回传通过 pollEvents 轮询（建议 500ms）。
菜单点击事件结构：{type: 'menu\_click', itemId, timestamp(毫秒)}。

## create(options) <Badge type="tip" text="Since 26.12.12.1" /> {#create}

为当前小应用创建托盘。已存在则更新图标和菜单。

::: info 注意
- options.iconBase64 可选：base64 编码的 PNG（兼容 data URL 前缀），
  建议 32×32；缺省时尝试使用小应用自身的图标。
- options.menu 是菜单项数组，schema 见 updateMenu。
- 菜单里没有 default 项时，基座会自动补一个「显示主窗口」。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| options | object | {iconBase64?, title?, menu?} |

| 返回值 | 说明 |
|:---|:---|
| object | {ok, error} |

```javascript
await __A.tray.create({
    title: '我的应用',
    menu: [{id: 'show', label: '显示窗口'}, {id: 'quit', label: '退出'}],
});
```

## getCapabilities() <Badge type="tip" text="Since 26.12.12.1" /> {#getCapabilities}

获取当前后端的托盘能力。

::: info 注意
click 表示“左键单击会触发菜单默认项”，没有独立的双击事件；
Windows 上双击的第一下同样会触发默认项。
:::

| 返回值 | 说明 |
|:---|:---|
| object | {tray, menu, icon, click, backend} |

```javascript
const caps = await __A.tray.getCapabilities();
if (caps.menu) { /* 可以设置右键菜单 */ }
```

## isAvailable() <Badge type="tip" text="Since 26.12.12.1" /> {#isAvailable}

当前平台是否支持系统托盘。

| 返回值 | 说明 |
|:---|:---|
| boolean | 支持返回 true，否则 false。 |

```javascript
const ok = await __A.tray.isAvailable();
```

## pollEvents() <Badge type="tip" text="Since 26.12.12.1" /> {#pollEvents}

取出当前小应用托盘自上次调用以来的所有事件，并清空队列。

::: info 注意
事件结构：{type: 'menu\_click', itemId, timestamp(毫秒)}。
建议前端每 500ms 轮询一次。
:::

| 返回值 | 说明 |
|:---|:---|
| array | 事件数组；没有事件时返回空数组。 |

```javascript
setInterval(async () => {
    const events = await __A.tray.pollEvents();
    for (const e of events) {
        if (e.type === 'menu_click' && e.itemId === 'quit') {
            await __A.runtime.exit();
        }
    }
}, 500);
```

## remove() <Badge type="tip" text="Since 26.12.12.1" /> {#remove}

移除当前小应用的托盘。remove 后需要重新 create。

| 返回值 | 说明 |
|:---|:---|
| object | {ok, error} |

```javascript
await __A.tray.remove();
```

## setIcon(iconBase64) <Badge type="tip" text="Since 26.12.12.1" /> {#setIcon}

更换当前小应用的托盘图标。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| iconBase64 | string | base64 编码的 PNG，兼容 data URL 前缀。 |

| 返回值 | 说明 |
|:---|:---|
| object | {ok, error} |

```javascript
await __A.tray.setIcon('data:image/png;base64,...');
```

## updateMenu(items) <Badge type="tip" text="Since 26.12.12.1" /> {#updateMenu}

更新当前小应用的托盘菜单。

::: info 注意
菜单项 schema：
{id, label, enabled=True, checked=False, default=False,
 type: 'normal'|'checkbox'|'separator', submenu: \[\]}
checkbox 的 checked 在重建菜单时生效，点击本身不会自动切换。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| items | array | 菜单项数组。 |

| 返回值 | 说明 |
|:---|:---|
| object | {ok, error} |

```javascript
await __A.tray.updateMenu([
    {id: 'show', label: '显示窗口'},
    {type: 'separator'},
    {id: 'quit', label: '退出'},
]);
```
