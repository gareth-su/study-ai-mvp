# ysjrgj 第 1 章 Enhancement Plan

制定日期：2026-05-14
增强类型：Local Enhancement (C → polished)

## 前置审计结论
- 19/22 children <40 chars (86% 提纲化)
- 5/6 nodes 使用模板命名（核心机制/核心概念/公式逻辑/易混点/复习路径）
- 2/2 formula_cards 自然语言公式
- 1/1 example_box 缺 sourceType/sourceNote

## 目标模块结构 (6→7 nodes)
```
[0] 章节总览：衍生品市场的基本图景
[1] 四种衍生品的基本框架（远期/期货/期权/互换 + 对比）
[2] 场内市场、场外市场与清算制度
[3] 对冲者、投机者与套利者：三类市场参与者
[4] 无套利定价的直觉入门（复制组合+套利vs投机）
[5] 衍生品的风险、监管与课程展望
[6] 易混点与复习路径
```

## Formula Card 修正
| # | Title | Priority | 修正 |
|---|-------|----------|------|
| 1 | 无收益资产远期价格 | P0 | "F=S(1+r)^T" → LaTeX，补优先，补适用条件说明 |
| 2 | 期权到期收益 | P0 | "Call=max{S_T-K,0}" → LaTeX，补优先 |

## VB Metadata 修补
- 保留并完善：3 comparison_tables + 1 concept_map + 1 process_flow + 1 line_chart + 1 case_card + 1 example_box + 1 data_table
- example_box → 补 sourceType/sourceNote
- line_chart → 确保 series 格式符合 schema
