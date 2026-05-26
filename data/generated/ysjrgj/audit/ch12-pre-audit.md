# ysjrgj 第 12 章预先审计

执行日期：2025-05-13
章节：第十二章 期权交易策略
文件：data/generated/ysjrgj/full/framework-detailed.json (chapters[8])
性质：只读诊断，不修改正文

---

## 1. Summary

第 12 章当前为纯提纲状态：22/22 children 全部 <40 chars（平均 23 chars），6 个 nodes 过于扁平，无法形成有效学习模块。但 VB 层面有一定基础（18 个 VB，含 5 个有数据的 payoff_chart）。

**结论：需要 D 级处理（full enhancement）。**

---

## 2. Current Structure Diagnosis

### 2.1 Node 结构

| Node | 名称 | Children | Avg chars | 问题 |
|---|---|---|---|---|
| 0 | 章节总览 | 3 | 33 | 全部 <40，纯 bullet |
| 1 | 核心机制 | 5 | 25 | 全部 <40，纯 bullet |
| 2 | 核心概念 | 3 | 16 | 全部 <40，极短 |
| 3 | 关键公式与计算逻辑 | 4 | 23 | 全部 <40，纯 bullet |
| 4 | 易混点 | 4 | 23 | 全部 <40，纯 bullet |
| 5 | 复习路径 | 3 | 21 | 全部 <40，纯 bullet |

**诊断**：
- 22/22 children 全部 <40 chars — 100% 提纲化
- 平均 23 chars — 远低于可接受的 60+ chars 标准
- 6 个 nodes 无法覆盖 8+ 策略的独立学习模块
- "核心机制"把保护性看跌、差价、组合策略全部压缩在 5 个 bullet 中
- "核心概念"只有 3 个 14-19 chars 的术语定义

### 2.2 学习模块化评估

当前结构 **未按策略类型组织学习模块**。应有的模块化结构：
- 每种主要策略应有独立 node 或 children 组
- 每个策略应包含：构造逻辑 → 盈亏结构 → 适用场景 → 风险点
- 当前只有笼统分类（方向/波动/区间），没有逐策略展开

### 2.3 VB 层面

| 类型 | 数量 | 状态 |
|---|---|---|
| payoff_chart | 5 | ✓ 有数据点，可渲染 |
| comparison_table | 3 | ✓ 有内容 |
| formula_card | 3 | ⚠ formula 字段为半自然语言 |
| data_table | 2 | ✓ 有 LaTeX 内容 |
| example_box | 1 | ⚠ 只有保本债券，缺少策略例题 |
| process_flow | 1 | ✓ |
| decision_tree | 1 | ✓ |
| timeline | 1 | ✓ |
| concept_map | 1 | ✓ |

VB 基础可复用，但需要：
- 补充 example_box（至少 3-4 个策略计算例题）
- 修复 formula_card 的 formula 字段（用 formulaLatex 替换）
- 可能需要补充日历差价的 payoff_chart 或 comparison_table

---

## 3. Payoff Chart Precheck

| VB | 标题 | Curves | Points | 数据质量 |
|---|---|---|---|---|
| [11] | 保护性看跌与备兑看涨 | 2 | 8 | ✓ 拐点正确（K=50处保护性看跌平坦，K=60处备兑看涨封顶） |
| [13] | 牛市差价与熊市差价 | 2 | 10 | ✓ 拐点在K1=50和K2=60，方向相反 |
| [15] | 盒式差价固定收益 | 1 | 4 | ✓ 水平线y=10，正确 |
| [16] | 蝶式差价 | 1 | 7 | ✓ 三角形峰值在K2=60，两侧平坦 |
| [17] | 跨式与宽跨式 | 2 | 11 | ✓ V形/宽V形，最低点在执行价处 |

**结论**：5 个 payoff_chart 数据点正确，拐点和盈亏方向与策略逻辑一致。不需要修复图形数据。

### 缺失的 payoff_chart

| 策略 | PPT 覆盖 | 当前状态 | 建议 |
|---|---|---|---|
| 日历差价 | p12-p17 | 无 VB | 需补充（至少 comparison_table） |
| 序列组合 (strip) | p18-p23 | 仅文字提及 | P2，可选 |
| 带式组合 (strap) | p18-p23 | 仅文字提及 | P2，可选 |

---

## 4. PPT Coverage Risks

PPT 共 23 页，分 4 个 chunk：

| PPT 页 | 内容 | 当前覆盖 | 优先级 | 风险 |
|---|---|---|---|---|
| p01-p05 | 保本债券、保护性看跌、备兑看涨 | ✓ example_box + payoff_chart | P0 | 低 |
| p06-p11 | 牛市差价、熊市差价、盒式差价 | ✓ payoff_chart + data_table + formula | P0 | 低 |
| p12-p17 | 蝶式差价、日历差价 | ⚠ 蝶式有 payoff_chart，日历差价缺失 | P1 | 中 |
| p18-p23 | 跨式、序列、带式、异价跨式 | ⚠ 跨式/异价跨式有 payoff_chart，序列/带式缺失 | P1/P2 | 低-中 |

**主要遗漏**：日历差价（calendar spread）是 P1 内容，PPT 有专门讲解但 detailed 中完全缺失。

---

## 5. Main Problems

| # | 问题 | 严重度 | 类型 |
|---|---|---|---|
| 1 | 22/22 children 全部 <40 chars，纯提纲 | **Critical** | 内容质量 |
| 2 | 6 nodes 无法覆盖 8+ 策略的独立学习模块 | **High** | 结构 |
| 3 | 只有 1 个 example_box（保本债券） | **High** | 内容缺失 |
| 4 | 日历差价完全缺失 | **Medium** | PPT 覆盖 |
| 5 | formula_card formula 字段为半自然语言 | **Low** | 格式 |
| 6 | 序列/带式组合仅文字提及 | **Low** | PPT 覆盖 |

---

## 6. Recommended Treatment

### **D — Full Enhancement**

理由：
- 100% children 为提纲（不是"部分短"而是"全部短"）
- Node 结构需要重组（6→10+ nodes）
- 需要补充 3-4 个 example_box
- 需要补充日历差价内容
- 需要修复 formula_card
- 现有 VB 可复用但需要重新分配到新 node 结构中

为什么不是 C（结构重组但不全写）：
- C 适用于"结构不对但内容有"的情况
- 本章内容本身就不存在（22 个 bullet 不构成内容）
- 需要从零生成所有 children 文本

为什么不是 B（局部增强）：
- B 适用于"大部分内容 OK，少数需要修"的情况
- 本章 0% 内容达标

---

## 7. Proposed Module Structure

建议重组为 10-12 个 nodes：

```
[0] 章节总览（3 children）
[1] 收益图形的加法原则（2-3 children）
    — 核心方法论：逐头寸写收益再相加
[2] 保护性看跌（3 children）
    — 构造、盈亏结构、适用场景
    — 复用 VB[11] payoff_chart
[3] 备兑看涨（3 children）
    — 构造、盈亏结构、适用场景
    — 复用 VB[11] payoff_chart
[4] 牛市差价（3-4 children）
    — 看涨期权构造、看跌期权构造、盈亏分析
    — 复用 VB[1] formula + VB[12] data_table + VB[13] payoff_chart
[5] 熊市差价（2-3 children）
    — 与牛市差价对称
    — 复用 VB[13] payoff_chart
[6] 盒式差价（2-3 children）
    — 构造、无套利定价
    — 复用 VB[7] formula + VB[14] data_table + VB[15] payoff_chart
[7] 蝶式差价（3 children）
    — 构造、盈亏结构、适用场景
    — 复用 VB[16] payoff_chart
[8] 日历差价（2-3 children）— 新增
    — 构造、时间价值衰减逻辑
[9] 跨式与宽跨式组合（3-4 children）
    — 构造、盈亏结构、适用场景
    — 复用 VB[8] formula + VB[17] payoff_chart
[10] 序列与带式组合（2 children）
    — 方向偏好的波动策略
[11] 易混点（4-5 children）
[12] 复习路径（3-4 children）
```

新增 VB 需求：
- example_box ×3-4：牛市差价数值例题、蝶式差价构造例题、跨式组合盈亏计算
- comparison_table 或 data_table ×1：日历差价结构
- 修复 formula_card formula 字段 ×3

---

## 8. Files to Modify in Next Round

| 文件 | 修改类型 |
|---|---|
| data/generated/ysjrgj/full/framework-detailed.json | chapters[8] 全面重写 |
| data/generated/ysjrgj/audit/ch12-enhancement-plan.md | 新增 |
| data/generated/ysjrgj/audit/ch12-enhancement-report.md | 新增 |

不需要修改：
- public/generated-assets/（payoff_chart 由前端渲染，不需要图片）
- framework-concise.json（除非同步）
- src/（payoff_chart renderer 已存在）

---

## 9. Validation Result

待运行。
