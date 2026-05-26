# ysjrgj 第 1 章 Enhancement Report

执行日期：2026-05-14
增强类型：Local Enhancement (C → polished)

## 增强前后对比

| 指标 | 增强前 | 增强后 |
|------|--------|--------|
| Nodes | 6 | 7 |
| Children | 22 | 23 |
| Short (<40) | 19 (86%) | 0 (0%) |
| Template nodes | 5/6 | 0/7 |
| Formula cards with priority | 0/2 | 2/2 |
| Natural language formulas | 2/2 | 0/2 |
| Example boxes with source | 0/1 | 1/1 |

## 模块重组：6→7 nodes

增强前（通用模板）：章节总览、核心机制、核心概念、关键公式与计算逻辑、易混点、复习路径

增强后（导言学习路径）：
[0] 章节总览：衍生品市场的基本图景
[1] 四种衍生品的基本框架（远期/期货/期权/互换 + 五维度对比）
[2] 场内市场、场外市场与清算制度
[3] 对冲者、投机者与套利者：三类市场参与者
[4] 无套利定价的直觉入门
[5] 衍生品的风险、监管与课程展望
[6] 易混点与复习路径

## Formula 修复

- "F = S(1 + r)^T" → LaTeX formula_card，P0，补变量表和适用条件
- "Call = max{S_T - K, 0}; Put = max{K - S_T, 0}" → LaTeX formula_card，P0，补变量表

## VB 修补

- comparison_table ×2：已完善表头和内容
- line_chart：field 名称从 `data` 修正为 `series`（符合 validator schema）
- example_box：补 sourceType="标准化复习例题" 和 sourceNote

## 验证结果

- validate:content → 通过
- lint → 通过
- build → 通过
