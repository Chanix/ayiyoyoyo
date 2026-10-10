---
layout: doc
---

# ayiyoyoyo.api.env <Badge type="tip" text="Since 25.5.1.1" />

提供对操作系统环境变量的读写能力。

## get(name, default) <Badge type="tip" text="Since 25.5.1.1" /> {#get}

读取环境变量。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| name | string | 变量名。 |
| default | any | (可选) 变量不存在时的默认值。默认为 null。 |

| 返回值 | 说明 |
|:---|:---|
| string \| null | 变量值，或 default。 |

```javascript
const v = await __A.env.get('PATH');
const v2 = await __A.env.get('NOT_EXIST', 'fallback');
```

## getsep() <Badge type="tip" text="Since 25.5.1.1" /> {#getsep}

获取当前平台的环境变量路径分隔符。

| 返回值 | 说明 |
|:---|:---|
| string | ';'（Windows）或 ':'（Linux/macOS）。 |

```javascript
const sep = await __A.env.getsep();
```

## items() <Badge type="tip" text="Since 25.5.1.1" /> {#items}

获取全部环境变量（键值对）。

| 返回值 | 说明 |
|:---|:---|
| object | 环境变量的键值对字典。 |

```javascript
const all = await __A.env.items();
```

## keys() <Badge type="tip" text="Since 25.5.1.1" /> {#keys}

获取全部环境变量的键。

| 返回值 | 说明 |
|:---|:---|
| array | 环境变量名列表。 |

```javascript
const names = await __A.env.keys();
```

## pop(name, default) <Badge type="tip" text="Since 25.5.1.1" /> {#pop}

删除环境变量并返回其原值。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| name | string | 变量名。 |
| default | any | (可选) 变量不存在时返回的默认值。默认为 null。 |

| 返回值 | 说明 |
|:---|:---|
| string \| null | 被删除变量的原值，或 default。 |

```javascript
const old = await __A.env.pop('MY_VAR');
```

## set(name, value) <Badge type="tip" text="Since 25.5.1.1" /> {#set}

设置环境变量。value 为 None 时等价于删除该变量。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| name | string | 变量名。 |
| value | any | (可选) 变量值。默认为 null（删除该变量）。 |

```javascript
await __A.env.set('MY_VAR', 'hello');
await __A.env.set('MY_VAR');           // 删除 MY_VAR
```

## unset(name) <Badge type="tip" text="Since 25.5.1.1" /> {#unset}

删除环境变量。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| name | string | 变量名。 |

```javascript
await __A.env.unset('MY_VAR');
```

## values() <Badge type="tip" text="Since 25.5.1.1" /> {#values}

获取全部环境变量的值。

| 返回值 | 说明 |
|:---|:---|
| array | 环境变量值列表。 |

```javascript
const vals = await __A.env.values();
```
