# ysjrgj 第 12 章结构重组计划

执行日期：2025-05-13
状态：待执行（预审计产出）

---

## 重组目标

将第 12 章从 6-node 提纲状态重组为 10-12 node 的完整学习模块结构，每个主要策略独立成模块。

## 当前状态 → 目标状态

| 维度 | 当前 | 目标 |
|---|---|---|
| Nodes | 6 | 10-12 |
| Children | 22 (avg 23 chars) | 35-45 (avg 70-100 chars) |
| Short children | 22 (100%) | 0 (0%) |
| example_box | 1 | 4-5 |
| payoff_chart | 5 | 5-6 |
| formula_card | 3 (半自然语言) | 4-5 (全 LaTeX) |
| 日历差价覆盖 | 无 | 有 |

## 重组步骤

### Phase 1: Node 结构重建

1. 保留 node[0] 章节总览，扩写 children
2. 新建"收益图形加法原则"node（从 node[1] 拆出）
3. 将"保护性看跌"和"备兑看涨"各独立为 node
4. 将"牛市差价"独立为 node
5. 将"熊市差价"独立为 node
6. 将"盒式差价"独立为 node
7. 将"蝶式差价"独立为 node
8. 新建"日历差价"node
9. 将"跨式与宽跨式"独立为 node
10. 新建"序列与带式组合"node（简要）
11. 保留"易混点"node，扩写
12. 保留"复习路径"node，扩写

### Phase 2: Children 扩写

每个策略 node 的 children 应覆盖：
- 构造方法（买什么、卖什么、执行价格关系）
- 盈亏结构（最大收益、最大损失、盈亏平衡点）
- 适用场景（什么市场观点下使用）
- 风险点或注意事项

### Phase 3: VB 重新分配

现有 18 个 VB 重新分配到新 node 结构：

| VB | 当前 | 目标 node |
|---|---|---|
| [0] comparison_table 策略分类 | node[1] | node[0] 章节总览 |
| [1] formula_card 牛市差价 | node[3] | node[4] 牛市差价 |
| [2] comparison_table 差价对比 | node[1] | node[11] 易混点 |
| [3] process_flow 策略选择 | node[1] | node[0] 章节总览 |
| [4] decision_tree 策略路径 | node[1] | node[0] 章节总览 |
| [5] timeline 建仓到到期 | node[1] | node[1] 加法原则 |
| [6] comparison_table 股票+期权 | node[1] | node[2]/[3] 保护性看跌/备兑看涨 |
| [7] formula_card 盒式差价 | node[3] | node[6] 盒式差价 |
| [8] formula_card 跨式组合 | node[3] | node[9] 跨式 |
| [9] concept_map 策略关系 | node[2] | node[0] 章节总览 |
| [10] example_box 保本债券 | node[1] | node[1] 加法原则 |
| [11] payoff_chart 保护性/备兑 | node[1] | node[2]/[3] |
| [12] data_table 牛市差价 | node[3] | node[4] 牛市差价 |
| [13] payoff_chart 牛市/熊市 | node[3] | node[4]/[5] |
| [14] data_table 盒式差价 | node[3] | node[6] 盒式差价 |
| [15] payoff_chart 盒式差价 | node[3] | node[6] 盒式差价 |
| [16] payoff_chart 蝶式差价 | node[3] | node[7] 蝶式差价 |
| [17] payoff_chart 跨式/宽跨式 | node[3] | node[9] 跨式 |

### Phase 4: 新增 VB

| 类型 | 标题 | 目标 node |
|---|---|---|
| example_box | 牛市差价盈亏计算 | node[4] |
| example_box | 蝶式差价构造与盈亏 | node[7] |
| example_box | 跨式组合盈亏平衡点 | node[9] |
| comparison_table | 日历差价结构 | node[8] |
| formula_card | 蝶式差价到期收益 | node[7] |

### Phase 5: Formula 修复

| VB | 当前 formula | 修复为 |
|---|---|---|
| [1] | `0; S_T - K_1; K_2 - K_1` | 使用 formulaLatex |
| [7] | `价值 = (K2 - K1)e^{-rT}` | 使用 formulaLatex |
| [8] | `收益 = max{S_T - K, 0} + max{K - S_T, 0}` | 使用 formulaLatex |

## 执行约束

- 不改 framework-concise.json
- 不改 src/
- 不改 source-materials/
- 不引入 PPT 外大段新知识
- payoff_chart 数据点已正确，不需要修改
- 保本债券 example_box 已正确，保留
