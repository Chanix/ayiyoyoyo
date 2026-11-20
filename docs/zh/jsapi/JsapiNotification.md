---
layout: doc
---

# ayiyoyoyo.api.notification <Badge type="tip" text="Since 26.12.12.1" />

桌面通知。

接口覆盖全功能（urgency / icon / sound / actions / timeout），
当前平台不支持的特性由 getCapabilities() 报告，notify 会降级处理。

设计要点：
- 接口是契约，后端可替换。未来换 desktop-notifier / win11toast 只改后端。
- 通知是“尽力而为”的能力。ok=True 表示已提交给系统通知服务，
  不代表用户一定看到（系统免打扰、权限拒绝等无法感知）。
- actions 当前所有后端都不支持，notify 会忽略该参数，getCapabilities 报 false。
- Windows 当前用 NotifyIcon 气泡通知，不是通知中心 Toast。

## getCapabilities() <Badge type="tip" text="Since 26.12.12.1" /> {#getCapabilities}

获取当前后端的通知能力。

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| backend | string | 'linux' / 'macos' / 'windows' / '' |
| urgency | boolean | 是否支持 low/normal/critical |
| icon | boolean | 是否支持自定义图标 |
| sound | boolean | 是否支持通知声音 |
| actions | boolean | 是否支持动作按钮 |
| timeout | boolean | 是否支持自定义显示时长 |

```javascript
const caps = await __A.notification.getCapabilities();
if (caps.sound) { /* 可以播放声音 */ }
```

## isAvailable() <Badge type="tip" text="Since 26.12.12.1" /> {#isAvailable}

当前环境是否支持桌面通知。

```javascript
const ok = await __A.notification.isAvailable();
```

## notify(title, body, urgency, icon, sound, actions, timeout) <Badge type="tip" text="Since 26.12.12.1" /> {#notify}

发送一条桌面通知，立即返回，不阻塞等待用户交互。

::: info 注意
- ok=True 表示已提交给系统通知服务，不代表用户一定看到。
- 当前后端不支持的特性会被降级忽略，不导致整体失败。
  例如 actions 在当前所有后端都不支持，传入也会被忽略。
- urgency 取值 low / normal / critical，非法值按 normal 处理。
- icon 为图标路径，仅 Linux 后端支持；其他平台忽略。
- sound 在 Linux 当前后端不支持，忽略；macOS/Windows 播放默认提示音。
- timeout 为建议显示秒数，仅 Linux 后端支持。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| title | string | 通知标题，必填。 |
| body | string | (可选) 通知正文。 |
| urgency | string | (可选) 优先级 low / normal / critical。默认 normal。 |
| icon | string | (可选) 图标路径，仅 Linux 支持。 |
| sound | boolean | (可选) 是否播放提示音。默认 false。 |
| actions | array | (可选) 动作按钮列表。当前后端均不支持，忽略。 |
| timeout | number | (可选) 建议显示秒数，仅 Linux 支持。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否已提交给系统通知服务 |
| backend | string | 实际使用的后端 |
| error | string | 错误信息，成功时为空串 |

```javascript
await __A.notification.notify('下载完成', '文件已保存到 Downloads');
await __A.notification.notify('警告', '磁盘空间不足',
    'critical', '', true);
```
