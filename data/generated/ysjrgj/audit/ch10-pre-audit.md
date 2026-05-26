# ysjrgj 第 10 章预审计

执行日期：2025-05-14
章节：第十章 期权市场机制
文件：data/generated/ysjrgj/full/framework-detailed.json chapters[6]
性质：只读诊断，不修改正文

---

## 1. Summary

第 10 章当前为纯提纲状态：21/21 children 全部 <40 chars（平均 24 chars），6 nodes 过于扁平化。但 VB 层面有一定基础：1 个 payoff_chart（4 curves × 16 points 全部验算正确）、4 个 comparison_tables、1 个 example_box。

**结论：D 级 — Full Enhancement。** 与第 12 章增强前状态高度相似（ch12: 22/22 short, avg 23 chars → ch10: 21/21 short, avg 24 chars）。

---

## 2. Current Structure Diagnosis

### 2.1 Node 结构

| Node | 名称 | Children | Avg chars | 问题 |
|---|---|---|---|---|
| 0 | 章节总览 | 3 | 27 | 全部 <40 |
| 1 | 核心机制 | 5 | 29 | 全部 <40，把四种头寸、合约、保证金、调整全压缩在一起 |
| 2 | 核心概念 | 4 | 23 | 全部 <40，实值/平值/虚值只有14 chars |
| 3 | 关键公式与计算逻辑 | 3 | 22 | 全部 <40 |
| 4 | 易混点 | 3 | 22 | 全部 <40 |
| 5 | 复习路径 | 3 | 16 | 全部 <40 |

**诊断**：21/21 children 100% python化。Node 命名使用通用模板（核心机制/核心概念/公式逻辑），而不是按期权市场机制的实际教学模块组织。

### 2.2 学习模块化评估

当前未按期权学习逻辑组织模块。应有的结构：

```
总览 → 期权类型与头寸（看涨/看跌/多头/空头）→ 合约规格（到期日/K/乘数/调整）→
实值/平值/虚值与价值构成 → 保证金与清算 → 佣金与税收 → 
认股权证/可转债等期权型工具 → 易混点与复习路径
```

### 2.3 VB 层面（可复用基础）

| 类型 | 数量 | 状态 |
|---|---|---|
| payoff_chart | 1 | ✓ 4 curves × 16 pts 全部验算正确 |
| comparison_table | 4 | ✓ 有内容 |
| formula_card | 1 | ⚠ formula 字段为自然语言 |
| data_table | 2 | ✓ 佣金示例 + 交易制度要点 |
| example_box | 1 | ✓ 裸露看涨保证金（来自PPT） |
| process_flow | 1 | ✓ |
| timeline | 1 | ✓ |
| concept_map | 1 | ✓ |

---

## 3. Visual / Payoff Precheck

### Payoff Chart（4 curves, K=50, c=5, p=4）

| Curve | 关键点验算 | 结论 |
|---|---|---|
| 买入看涨 | x=50→-5, x=55→0(breakeven), x=80→25 | ✓ |
| 卖出看涨 | x=50→5, x=55→0, x=80→-25 | ✓ |
| 买入看跌 | x=46→0(breakeven), x=50→-4, x=20→26 | ✓ |
| 卖出看跌 | x=46→0, x=50→4, x=20→-26 | ✓ |

**16/16 数据点全部验算正确。** 不需要修改图形数据。

### VB 类型检查

| 检查项 | 结果 |
|---|---|
| 空 chart | 0 |
| 不支持 VB type | 0 |
| comparison_table 滥用 | 否（4个均为真正对比型） |
| data_table 误承载例题 | 否 |

---

## 4. Formula / Example / Table Risks

| 风险项 | 详情 | 严重度 |
|---|---|---|
| formula_card formula 为自然语言 | `Call long = max{S_T - K, 0}; Put long = max{K - S_T, 0}` → formulaLatex 正确，需替换 | Low |
| example_box 只有1个 | 仅覆盖保证金，缺少头寸盈亏计算例题 | Medium |
| 未发现 imes/approx | N/A | — |

---

## 5. PPT Coverage Risks

PPT p01-p20 分4个 chunk：

| PPT 页 | 内容 | 当前覆盖 | 优先级 | 风险 |
|---|---|---|---|---|
| p01-p06 | 期权类型、头寸、标的资产 | ✓ payoff_chart + comparison_table | P0 | 低(VB正确，children需扩写) |
| p07-p12 | 合约规格、实值/虚值、内含/时间价值、股票分割 | ✓ data_table + comparison_table | P0 | 低 |
| p13-p17 | 佣金、保证金、裸露期权、OCC | ✓ example_box + data_table | P0 | 低 |
| p18-p20 | 税收、认股权证、可转债、中国期权市场 | ✓ node[2].children[3] 仅31 chars提及 | P1/P2 | 中(需展开) |

**主要遗漏**：认股权证/雇员股票期权/可转换债券的期权特征仅用31 chars提及，需要至少一段独立解释。但这些都是P2内容，不需要大篇幅。

---

## 6. Recommended Treatment: D — Full Enhancement

### 理由

- **100% children <40 chars** — 不是"部分短"而是"全部短"，与ch12增强前完全一致
- **6 nodes 无法覆盖期权市场机制的全部学习模块** — 需要展开为8-10 nodes
- **children 内容必须全部重写** — 无法通过"局部修"解决
- **VB 基础可复用** — payoff_chart 正确，tables 可用，不需要重建
- **需要补充 1-2 个 example_box** — 至少补一个头寸盈亏计算

### 为什么不是 C（局部增强）

C 适用于"大部分内容OK，少数模块需要重写"。本章 0% children 达到可接受长度——不存在"大部分内容OK"。

### 为什么不是 B（visual repair）

B 适用于"文本OK但视觉有问题"。本章核心问题是文本不存在（只有bullet），不是视觉问题。

---

## 7. Proposed Next Step

建议重组为 8-10 nodes：

```
[0] 章节总览：期权从权利到合约
[1] 期权类型与四种基本头寸
[2] 期权头寸到期收益与盈亏图
[3] 合约规格：到期日、执行价格、乘数与调整
[4] 实值/平值/虚值与价值构成
[5] 保证金制度与裸露期权
[6] 佣金、清算与OCC
[7] 期权型工具：认股权证、可转债、雇员期权（P2）
[8] 易混点与复习路径
```

需要新增 VB：
- formula_card 修复 ×1（替换 formula 为 formulaLatex）
- example_box ×1-2（头寸盈亏计算、保证金计算）

不需要改动：
- payoff_chart：4 curves × 16 pts 全部正确
- comparison_tables：4个保留，重新分配到新node
- data_tables：2个保留
- process_flow / timeline / concept_map：保留

---

## 8. Validation Result

待下一轮执行时运行。
