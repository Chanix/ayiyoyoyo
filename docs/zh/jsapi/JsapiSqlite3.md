---
layout: doc
---

# ayiyoyoyo.api.sqlite3 <Badge type="tip" text="Since 25.5.1.1" />

SQLite 数据库操作。

提供对 SQLite 数据库的连接、查询、执行、事务控制等能力。

连接以整数 ID 标识，前端保存这个 ID 即可在后续调用中使用。
所有方法返回结构化结果，失败时通过 ok 字段区分，不抛异常。

::: info 注意
遵循 SQL 标准事务模型：execute 默认不提交，需要显式调用 commit
才会落盘。如果希望单条 SQL 执行后立即提交，可传 auto\_commit=True。
:::

## begin(conn_id) <Badge type="tip" text="Since 25.5.1.1" /> {#begin}

显式开始事务。

::: info 注意
SQLite 在默认模式下会自动开启事务，通常不需要手动调用。
此方法用于明确表达事务边界。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |

| 返回值 | 说明 |
|:---|:---|
| object | 操作结果。 |

```javascript
await __A.sqlite3.begin(connId);
```

## close(conn_id) <Badge type="tip" text="Since 25.5.1.1" /> {#close}

关闭指定连接。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| msg | string | 结果描述 |

```javascript
await __A.sqlite3.close(connId);
```

## closeAll() <Badge type="tip" text="Since 25.5.1.1" /> {#closeAll}

关闭所有连接。

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否全部成功 |
| msg | string | 结果描述 |

```javascript
await __A.sqlite3.closeAll();
```

## commit(conn_id) <Badge type="tip" text="Since 25.5.1.1" /> {#commit}

提交事务。

::: info 注意
提交的是「所有未提交的操作」，不是单条 SQL。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |

| 返回值 | 说明 |
|:---|:---|
| object | 操作结果。 |

```javascript
await __A.sqlite3.commit(connId);
```

## connect(database, timeout, uri) <Badge type="tip" text="Since 25.5.1.1" /> {#connect}

打开一个 SQLite 数据库连接。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| database | string | 数据库文件路径，或 ':memory:'。 |
| timeout | number | (可选) 锁等待超时（秒）。默认 5.0。 |
| uri | boolean | (可选) 是否按 URI 解析 database。默认 false。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| connId | number \| null | 连接 ID，后续调用使用 |
| msg | string | 结果描述 |

```javascript
const res = await __A.sqlite3.connect('C:/data/my.db');
if (res.ok) console.log(res.connId);
```

## execute(conn_id, sql, params, auto_commit) <Badge type="tip" text="Since 25.5.1.1" /> {#execute}

执行非查询 SQL（INSERT / UPDATE / DELETE / DDL）。

::: info 注意
默认不自动提交。执行后需要调用 commit 才会落盘。
如果希望执行后立即提交，传 auto\_commit=True。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |
| sql | string | SQL 语句。 |
| params | array | (可选) 参数列表，用于参数化查询。 |
| auto_commit | boolean | (可选) 是否自动提交。默认 false。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| rowcount | number \| null | 受影响行数 |
| lastrowid | number \| null | 最后插入的自增 ID |
| msg | string | 结果描述 |

```javascript
// 默认：执行后未提交，需要手动 commit
await __A.sqlite3.execute(connId, 'INSERT INTO users (name) VALUES (?)', ['Tom']);
await __A.sqlite3.commit(connId);

// 显式要求立即提交
await __A.sqlite3.execute(connId, 'INSERT INTO users (name) VALUES (?)', ['Tom'], true);
```

## executeMany(conn_id, sql, params_list, auto_commit) <Badge type="tip" text="Since 25.5.1.1" /> {#executeMany}

批量执行同一条 SQL。

::: info 注意
默认不自动提交。执行后需要调用 commit 才会落盘。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |
| sql | string | SQL 语句。 |
| params_list | array | 参数列表的列表。 |
| auto_commit | boolean | (可选) 是否自动提交。默认 false。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| rowcount | number \| null | 受影响行数 |
| msg | string | 结果描述 |

```javascript
await __A.sqlite3.executeMany(connId,
    'INSERT INTO users (name) VALUES (?)',
    [['Tom'], ['Jerry']]);
await __A.sqlite3.commit(connId);
```

## getTableList(conn_id) <Badge type="tip" text="Since 25.5.1.1" /> {#getTableList}

获取数据库中所有表名。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| tables | array \| null | 表名列表 |
| msg | string | 结果描述 |

```javascript
const res = await __A.sqlite3.getTableList(connId);
console.log(res.tables);
```

## isConnected(conn_id) <Badge type="tip" text="Since 25.5.1.1" /> {#isConnected}

检查指定连接是否存在。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |

| 返回值 | 说明 |
|:---|:---|
| boolean | 连接是否存在。 |

```javascript
const ok = await __A.sqlite3.isConnected(connId);
```

## queryDicts(conn_id, sql, params) <Badge type="tip" text="Since 25.5.1.1" /> {#queryDicts}

执行 SELECT 查询，返回所有结果行（对象形式）。

每行是一个字典，键为列名。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |
| sql | string | SELECT 语句。 |
| params | array | (可选) 参数列表，用于参数化查询。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| rows | array \| null | 结果行，每行是一个字典 |
| msg | string | 结果描述 |

```javascript
const res = await __A.sqlite3.queryDicts(connId, 'SELECT * FROM users');
// res.rows = [{id: 1, name: 'Tom'}, {id: 2, name: 'Jerry'}]
```

## queryOne(conn_id, sql, params) <Badge type="tip" text="Since 25.5.1.1" /> {#queryOne}

执行 SELECT 查询，返回第一行。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |
| sql | string | SELECT 语句。 |
| params | array | (可选) 参数列表，用于参数化查询。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| row | object \| null | 第一行数据，无结果时为 null |
| msg | string | 结果描述 |

```javascript
const res = await __A.sqlite3.queryOne(connId, 'SELECT * FROM users WHERE id = ?', [1]);
if (res.ok && res.row) console.log(res.row.name);
```

## queryRows(conn_id, sql, params) <Badge type="tip" text="Since 25.5.1.1" /> {#queryRows}

执行 SELECT 查询，返回所有结果行（列表形式）。

每行是一个值列表，配合 columns 使用。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |
| sql | string | SELECT 语句。 |
| params | array | (可选) 参数列表，用于参数化查询。 |

返回值：`object`

| 字段 | 类型 | 说明 |
|:---|:---|:---|
| ok | boolean | 是否成功 |
| columns | array \| null | 列名列表 |
| rows | array \| null | 结果行，每行是一个值列表 |
| msg | string | 结果描述 |

```javascript
const res = await __A.sqlite3.queryRows(connId, 'SELECT id, name FROM users');
// res.columns = ['id', 'name']
// res.rows    = [[1, 'Tom'], [2, 'Jerry']]
```

## rollback(conn_id) <Badge type="tip" text="Since 25.5.1.1" /> {#rollback}

回滚事务。

::: info 注意
回滚的是「所有未提交的操作」。
:::

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| conn_id | number | 连接 ID。 |

| 返回值 | 说明 |
|:---|:---|
| object | 操作结果。 |

```javascript
await __A.sqlite3.rollback(connId);
```
