# ysjrgj 第 2 章 Enhancement Report

执行日期：2026-05-14
增强类型：Local Enhancement (C → polished)

## 增强前后对比

| 指标 | 增强前 | 增强后 |
|------|--------|--------|
| Nodes | 7 | 8 |
| Children | 32 | 24 |
| Short (<40) | 25 (78%) | 0 (0%) |
| Template nodes | 5/7 | 0/8 |
| Formula cards with priority | 0/1 | 1/1 |
| Natural language formulas | 1/1 | 0/1 |
| Example boxes with source | 0/1 | 1/1 |

## 模块重组：7→8 nodes

增强前：核心机制/核心概念/关键公式/场外市场/易混点/复习路径

增强后：
[0] 章节总览：期货市场如何运作
[1] 期货合约的标准化条款
[2] 开仓、平仓与交割
[3] 保证金制度与每日盯市
[4] 清算所与中央对手方制度
[5] 多头、空头与盈亏计算
[6] 场外市场、监管与市场参与者
[7] 易混点与复习路径

## Formula 修复

- "多头每日盈亏 = 合约份数 × 合约规模 × (今日结算价 − 前一结算价)" → LaTeX formula_card，P0

## VB 修补

- 保留原有丰富的 VB 体系（17→17，6 process_flows + 6 comparison_tables + 1 timeline + 1 cashflow_diagram + 1 concept_map + 1 example_box + 1 data_table + 1 formula_card）
- timeline events 字段补 title
- cashflow_diagram edges cashflowType 修正为 allowed enum value

## 验证结果

- validate:content → 通过
- lint → 通过
- build → 通过
