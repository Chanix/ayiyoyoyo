---
layout: doc
---

# ayiyoyoyo.api.runtime <Badge type="tip" text="Since 25.5.1.1" />

运行时信息与控制。

提供当前应用运行时的信息与操作。

## exit(retcode) <Badge type="tip" text="Since 25.5.1.1" /> {#exit}

退出当前应用。

| 参数 | 类型 | 说明 |
|:---|:---|:---|
| retcode | number | (可选) 进程退出码，默认为 0。0 表示正常退出，非 0 表示异常退出。 |

```javascript
await __A.runtime.exit();       // 正常退出
await __A.runtime.exit(1);      // 异常退出，返回码 1
```

## noop() <Badge type="tip" text="Since 25.5.1.1" /> {#noop}

空操作。

不执行任何逻辑，直接返回。主要用途：

- 验证 jsapi 是否正确注册、bridge 是否连通。
- 作为最小调用的，测量一次 bridge 往返的耗时。例如在前端重复调用 N 次，取平均耗时，作为其他接口的性能参照。

```javascript
// 测试 bridge 连通性
await __A.runtime.noop();

// 性能基准：测量 bridge 往返的平均耗时
const N = 1000;
const start = performance.now();
for (let i = 0; i < N; i++) {
    await __A.runtime.noop();
}
const elapsed = performance.now() - start;
console.log(`平均每次调用：${(elapsed / N).toFixed(2)} ms`);
```
