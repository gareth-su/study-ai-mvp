# ysjrgj 第 12 章 Full Enhancement 执行计划

执行日期：2025-05-13
章节：第十二章 期权交易策略
计划类型：full enhancement（依据 pre-audit 判定 D）

## 执行摘要

依据 ch12-pre-audit.md 的 D 级判定（22/22 children <40 chars，100% 提纲化），执行 full enhancement。

## 重组方案

### Node 结构：6 → 12

| 顺序 | Node | Children | 说明 |
|---|---|---|---|
| 0 | 章节总览 | 3 | 新增加法原则为核心的框架性概述 |
| 1 | 加法原则 | 3 | 拆自原 node[1]，新增方法论 |
| 2 | 保护性看跌 | 3 | 独立模块，原仅 24 chars bullet |
| 3 | 备兑看涨 | 3 | 独立模块，原仅隐含在组合中 |
| 4 | 牛市差价 | 3 | 独立模块，含公式+例题+payoff |
| 5 | 熊市差价 | 1 | 独立模块，与牛市差价对称 |
| 6 | 盒式差价 | 3 | 独立模块，含无套利定价 |
| 7 | 蝶式差价 | 3 | 独立模块，含三K构造 |
| 8 | 日历差价 | 3 | **新增**，PPT p12-p17 P1内容 |
| 9 | 跨式与宽跨式 | 3 | 独立模块，含两策略对比 |
| 10 | 序列与带式 | 2 | 简明P2覆盖 |
| 11 | 易混点与复习路径 | 5 | 含5对易混点+复习路径 |

### VB 处理：18 → 24

| 处理类型 | 数量 | 详情 |
|---|---|---|
| 保留原样 | 14 | 5 payoff_chart + 2 data_table + 2 comparison_table + process_flow + decision_tree + timeline + concept_map + example_box(保本债券) |
| formula 修复 | 3 | formula→formulaLatex（牛市差价/盒式差价/跨式） |
| 新增 example_box | 4 | 牛市差价计算、保护性看跌、蝶式差价、跨式vs宽跨式 |
| 新增 comparison_table | 2 | 日历差价情景、波动率策略对比 |
