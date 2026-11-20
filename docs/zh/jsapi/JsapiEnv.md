---
layout: doc
---

# ayiyoyoyo.api.env <Badge type="tip" text="Since 26.11.11.1" />

提供对环境变量的读写能力。

::: info 注意
作用域为当前进程及其拉起的子进程（如 \_\_A.process 启动的程序）；
修改不会持久化到操作系统（Windows 注册表 / Linux shell 配置），进程退出即失效。
Windows 上变量名不区分大小写，写入后统一以大写存储；Linux 上区分大小写。
非字符串值一律经 str() 转换后写入（注意：JS 的 true 会变成 'True' 而非 'true'）。
:::
::: danger 危险
items()/values() 会导出全部环境变量（可能包含密钥等敏感信息）；
set() 可修改 PATH 等变量，影响子进程行为。使用风险自担。
:::

## get(name, default) <Badge type="tip" text="Since 26.11.11.1" /> {#get}

读取环境变量。

::: info 注意
default 非 None 时会被 str() 转换后返回（如传 42 得到 '42'）。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| name | string | 变量名。 |
| default | any | (可选) 变量不存在时的默认值。默认为 null。 |

| 返回值 | 说明 |
|:---|:---|
| string \| null | 变量值（str），或 str(default)；default 为 null 时返回 null。 |

```javascript
const v = await __A.env.get('PATH');
const v2 = await __A.env.get('NOT_EXIST', 'fallback');
```

## has(name) <Badge type="tip" text="Since 26.12.12.1" /> {#has}

判断环境变量是否存在。

::: info 注意
Windows 上按不区分大小写匹配；空字符串值也算存在。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| name | string | 变量名。 |

| 返回值 | 说明 |
|:---|:---|
| boolean | 存在返回 true，否则 false。 |

```javascript
if (await __A.env.has('PATH')) { /* ... */ }
```

## items() <Badge type="tip" text="Since 26.11.11.1" /> {#items}

获取全部环境变量（键值对）快照。

::: danger 危险
导出全部环境变量，可能包含密钥等敏感信息。使用风险自担。
:::

| 返回值 | 说明 |
|:---|:---|
| dict[str, str] | 环境变量的键值对字典。Windows 上键为大写形态。 |

```javascript
const all = await __A.env.items();
```

## keys() <Badge type="tip" text="Since 26.11.11.1" /> {#keys}

获取全部环境变量的键快照。

| 返回值 | 说明 |
|:---|:---|
| array | 环境变量名列表。Windows 上为大写形态。 |

```javascript
const names = await __A.env.keys();
```

## pop(name, default) <Badge type="tip" text="Since 26.11.11.1" /> {#pop}

删除环境变量并返回其原值。

::: info 注意
default 非 None 时会被 str() 转换后返回。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| name | string | 变量名。 |
| default | any | (可选) 变量不存在时返回的默认值。默认为 null。 |

| 返回值 | 说明 |
|:---|:---|
| string \| null | 被删除变量的原值（str），或 str(default)；default 为 null 时返回 null。 |

```javascript
const old = await __A.env.pop('MY_VAR');
```

## set(name, value) <Badge type="tip" text="Since 26.11.11.1" /> {#set}

设置环境变量。value 为 None 时等价于删除该变量。

::: info 注意
非 None 的 value 会被 str() 转换为字符串后写入（true → 'True'）。
仅作用于当前进程及其子进程，不持久化到系统。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| name | string | 变量名。不能为空，不能包含 '=' 或空字符。 |
| value | any | (可选) 变量值。默认为 null（删除该变量）。 |

| 返回值 | 说明 |
|:---|:---|
| null | 无返回值。 |

```javascript
await __A.env.set('MY_VAR', 'hello');
await __A.env.set('MY_VAR', 42);       // 写入 '42'
await __A.env.set('MY_VAR');           // 删除 MY_VAR
```

## unset(name) <Badge type="tip" text="Since 26.11.11.1" /> {#unset}

删除环境变量。变量不存在时静默成功。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| name | string | 变量名。 |

| 返回值 | 说明 |
|:---|:---|
| null | 无返回值。 |

```javascript
await __A.env.unset('MY_VAR');
```

## update(mapping) <Badge type="tip" text="Since 26.12.12.1" /> {#update}

批量设置环境变量。

::: info 注意
与 set 语义一致：值经 str() 转换；值为 None 的键会被删除。
整批在本模块锁内顺序执行；非法变量名会抛错（此前已写入的键不回滚）。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| mapping | dict[str, any] | 变量名到值的映射。 |

| 返回值 | 说明 |
|:---|:---|
| null | 无返回值。 |

```javascript
await __A.env.update({ MY_VAR: 'hello', OTHER: 42, TO_REMOVE: null });
```

## values() <Badge type="tip" text="Since 26.11.11.1" /> {#values}

获取全部环境变量的值快照。

::: danger 危险
导出全部环境变量值，可能包含密钥等敏感信息。使用风险自担。
:::

| 返回值 | 说明 |
|:---|:---|
| array | 环境变量值列表。 |

```javascript
const vals = await __A.env.values();
```
