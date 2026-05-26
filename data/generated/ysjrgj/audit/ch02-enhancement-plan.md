# ysjrgj 第 2 章 Enhancement Plan

制定日期：2026-05-14
增强类型：Local Enhancement (C → polished)

## 前置审计结论
- 25/32 children <40 chars (78% 提纲化)
- 部分 node 已展开（章节总览、核心机制），但概念/公式/易混点/复习路径仍为模板
- 1/1 formula_card 缺 priority
- 1/1 example_box 缺 sourceType/sourceNote

## 目标模块结构 (7→8 nodes)
```
[0] 章节总览：期货市场如何运作
[1] 期货合约的标准化条款
[2] 开仓、平仓与交割
[3] 保证金制度与每日盯市
[4] 清算所与中央对手方制度
[5] 多头、空头与盈亏计算
[6] 场外市场、监管与市场参与者
[7] 易混点与复习路径
```

## Formula Card
| # | Title | Priority | 修正 |
|---|-------|----------|------|
| 1 | 期货每日盈亏计算逻辑 | P0 | 将自然语言公式转为 LaTeX，补 priority，补变量表 |

## VB 修补
- 保留并完善：6 process_flows, 1 timeline, 1 cashflow_diagram, 1 formula_card, 6 comparison_tables, 1 concept_map, 1 example_box, 1 data_table
- example_box → 补 sourceType/sourceNote
- timeline → events 字段补 title
- cashflow_diagram → edges cashflowType 修正为 "collateral"
