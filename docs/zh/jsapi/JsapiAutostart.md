---
layout: doc
---

# ayiyoyoyo.api.autostart <Badge type="tip" text="Since 25.5.1.1" />

开机自启动管理。

为指定小应用设置、取消、查询开机自启动。

支持：
- Windows：启动目录下的 .lnk 快捷方式
- Linux：\~/.config/autostart/ 下的 .desktop 文件
- macOS：\~/Library/LaunchAgents/ 下的 plist

## disable(appchip_id) <Badge type="tip" text="Since 25.5.1.1" /> {#disable}

取消指定小应用的开机自启动。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |

| 返回值 | 说明 |
|:---|:---|
| boolean | 是否取消成功。 |

```javascript
await __A.autostart.disable();
await __A.autostart.disable('myapp');
```

## enable(appchip_id) <Badge type="tip" text="Since 25.5.1.1" /> {#enable}

设置指定小应用开机自启动。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |

| 返回值 | 说明 |
|:---|:---|
| boolean | 是否设置成功。 |

```javascript
await __A.autostart.enable();
await __A.autostart.enable('myapp');
```

## isEnabled(appchip_id) <Badge type="tip" text="Since 25.5.1.1" /> {#isEnabled}

查询指定小应用是否已设置开机自启动。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| appchip_id | string | (可选) 小应用标识。默认为 null（即当前小应用）。 |

| 返回值 | 说明 |
|:---|:---|
| boolean | 是否已设置。 |

```javascript
const on = await __A.autostart.isEnabled();
```
