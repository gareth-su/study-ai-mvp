# ysjrgj 第 10 章公式显示专项修复

执行日期：2025-05-14
修复类型：公式 LaTeX 包装

---

## 问题

第 10 章中所有期权头寸盈亏公式均为纯文本格式（如 `max(S_T - K, 0) - c`），未使用 `\(...\)` LaTeX 包装。在网页上 `S_T` 的 T 无法显示为下标，"max" 可能被浏览器断行。

## 修复方式

将所有 inline 数学表达式改为 MathText 兼容的 `\(...\)` 格式：

| 修复前（纯文本） | 修复后 |
|---|---|
| `max(S_T - K, 0) - c` | `\(\max(S_T-K,0)-c\)` |
| `-max(S_T - K, 0) + c` | `\(-\max(S_T-K,0)+c\)` |
| `max(K - S_T, 0) - p` | `\(\max(K-S_T,0)-p\)` |
| `-max(K - S_T, 0) + p` | `\(-\max(K-S_T,0)+p\)` |
| `S_T ≤ K` | `\(S_T\le K\)` |
| `S_T > K` | `\(S_T>K\)` |
| `S_T ≥ K` | `\(S_T\ge K\)` |
| `S_T < K` | `\(S_T<K\)` |
| `max(S-K,0)` | `\(\max(S-K,0)\)` |
| `K + c` | `\(K+c\)` |
| `K - p` | `\(K-p\)` |
| `S_T=50→0-6=-6` | `\(S_T=50\rightarrow 0-6=-6\)` |

## 修复位置

| 位置 | 修复数 |
|---|---|
| node[2] 看涨/看跌 children | 2 |
| node[3] 四类头寸到期盈亏 children | 4 |
| node[4] 内在价值 children | 1 |
| node[5] 保证金 children | 1 |
| example_box[12] steps | 4 |
| **合计** | **12** |

## 修复后状态

- formula_card formula 字段：已为合法 LaTeX ✓
- 所有 inline 公式：已用 `\(...\)` 包装 ✓
- 无 backspace 字符 ✓
- validator 零新增警告 ✓
