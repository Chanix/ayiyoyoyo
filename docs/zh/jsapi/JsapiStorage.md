---
layout: doc
---

# ayiyoyoyo.api.storage <Badge type="tip" text="Since 26.12.12.1" />

小应用级 key-value 存储。

本模块目的为快速平替 localStorage，实现简单的 KV 存储。

- 本模块接口与 localStorage 一一对应，但为异步调用；
- 不提供 storage 事件，多窗口并发写以最后写入者为准；
- 数据存放于 appdata/data/<appchip\_id>/\_storage.json；

## clear() <Badge type="tip" text="Since 26.12.12.1" /> {#clear}

清空全部键值对，立即写入磁盘。

```javascript
await __A.storage.clear();
```

## getItem(key) <Badge type="tip" text="Since 26.12.12.1" /> {#getItem}

读取指定键的值。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| key | string | 键。 |

| 返回值 | 说明 |
|:---|:---|
| string \| null | 值；键不存在返回 null。 |

```javascript
const v = await __A.storage.getItem('theme');
```

## key(index) <Badge type="tip" text="Since 26.12.12.1" /> {#key}

按插入顺序返回指定索引的键。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| index | number | 索引，从 0 开始。 |

| 返回值 | 说明 |
|:---|:---|
| string \| null | 键；越界返回 null。 |

```javascript
const k = await __A.storage.key(0);
```

## length() <Badge type="tip" text="Since 26.12.12.1" /> {#length}

获取键的数量。

::: info 注意
localStorage 的 length 是属性，这里由于 jsapi 为异步调用，做成方法。
:::

| 返回值 | 说明 |
|:---|:---|
| number | 键的数量。 |

```javascript
const n = await __A.storage.length();
```

## removeItem(key) <Badge type="tip" text="Since 26.12.12.1" /> {#removeItem}

删除指定键，立即写入磁盘。

::: info 注意
键不存在视为成功。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| key | string | 键。 |

```javascript
await __A.storage.removeItem('theme');
```

## setItem(key, value) <Badge type="tip" text="Since 26.12.12.1" /> {#setItem}

设置键值对，立即写入磁盘。

::: info 注意
value 会被 str() 转成字符串存储。存结构请先 JSON.stringify。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| key | string | 键。 |
| value |  | 值，任意类型，按 str() 转换。 |

```javascript
await __A.storage.setItem('theme', 'dark');
await __A.storage.setItem('count', 42);       // 存为 '42'
await __A.storage.setItem('user', JSON.stringify({name: '张三'}));
```
