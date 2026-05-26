# ysjrgj 第 10 章增强执行计划

执行日期：2025-05-14
来源：ch10-pre-audit.md（判定 D 级）

---

## 处理级别：D — Full Enhancement

## 增强范围

- 修改：data/generated/ysjrgj/full/framework-detailed.json chapters[6]
- 新增/更新：ch10-enhancement-plan.md, ch10-enhancement-report.md, ch10-priority-review.json, ch10-editorial-consolidation.md
- 不修改：concise, src, source-materials, Prisma, 其他章节
- 不新增 image（payoff_chart 由前端渲染）

## 重组步骤

### 1. Node 结构：6 → 9

| 顺序 | Node | Children | 说明 |
|---|---|---|---|
| 0 | 章节总览 | 3 | 扩写定位、作用和主线 |
| 1 | 期权类型与四种基本头寸 | 4 | 看涨/看跌 × 多头/空头 |
| 2 | 期权头寸到期收益与盈亏图 | 3 | 绑定 payoff_chart，逐个曲线解读 |
| 3 | 合约规格 | 4 | 到期日/K/乘数/调整 |
| 4 | 实值/平值/虚值与价值构成 | 3 | Moneyness + intrinsic/time value |
| 5 | 保证金与裸露期权 | 3 | 保留 example_box |
| 6 | 佣金、清算与OCC | 2 | 保留 data_table + comparison_table |
| 7 | 期权型工具（P2） | 2 | Warrants, 可转债, 雇员期权 |
| 8 | 易混点与复习路径 | 4 | 4对易混点 + 复习路径 |

### 2. VB 处理：12 → 13

| 处理 | VBs |
|---|---|
| 保留（不变） | payoff_chart(1), comparison_table(4), data_table(2), process_flow(1), timeline(1), concept_map(1), example_box(1) |
| 修复 | formula_card(1): formula → formulaLatex |
| 新增 | example_box(1): 期权头寸盈亏计算（P0） |

### 3. Children 目标

- 当前: 21 children, avg 24 chars, 21/21 short
- 目标: 28-32 children, avg 80-120 chars, 0 short

## 执行约束

- formula 只修字段，不改 formulaLatex
- payoff_chart 数据点不改（已验证正确）
- 不引入 PPT 外大段新知识
- 认股权证/可转债按 P2 简明处理
- 不强行凑 example_box
