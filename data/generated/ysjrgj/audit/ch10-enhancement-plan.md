# ysjrgj 第 10 章 Full Enhancement 执行计划

执行日期：2025-05-14
章节：第十章 期权市场机制
计划类型：Full Enhancement（依据预审计 D 级判定）

## 重组方案：6 → 9 nodes

| 顺序 | Node | Children | 说明 |
|---|---|---|---|
| 0 | 章节总览 | 3 | 定位、作用、主线 |
| 1 | 期权合约基本要素 | 4 | 标的/规模、K/T/系列、美式vs欧式、调整规则 |
| 2 | 看涨/看跌与买方/卖方 | 3 | Call定义、Put定义、Long/Short权利义务对比 |
| 3 | 四类头寸到期盈亏 | 4 | Long Call、Short Call、Long Put、Short Put |
| 4 | 价格与价值构成 | 3 | Moneyness、内在价值、时间价值 |
| 5 | 保证金与清算制度 | 4 | 保证金逻辑、裸露期权计算、OCC、佣金 |
| 6 | 市场参与者与交易流程 | 2 | 参与者角色、交易生命周期 |
| 7 | 期权型工具（P1/P2） | 3 | 认股权证、可转债、雇员期权 |
| 8 | 易混点与复习路径 | 5 | 4对易混点 + 复习路径 |

## VB 处理：12 → 13

| 处理 | VBs |
|---|---|
| 保留 | payoff_chart(1), comparison_table(4), data_table(2), process_flow(1), timeline(1), concept_map(1), example_box(1) |
| 修复 | formula_card(1): formula → formulaLatex |
| 新增 | example_box(1): 期权头寸盈亏计算（标准化复习例题，标注来源类型） |
