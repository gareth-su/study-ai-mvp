# 第 7 章增强计划

日期：2026-05-13

## 增强前状态

- nodes：6 个顶层模块（24 个递归节点）
- visualBlocks：6 个（formula_card 1、cashflow_diagram 1、process_flow 1、comparison_table 1、timeline 1、case_card 1）
- 状态：outline_only

## 增强方向

1. **模块重组**：从"章节总览 → 核心概念 → 核心机制 → 公式与计算 → 易混点 → 复习路径"改为按教学逻辑排序的 7 个模块。
2. **P0/P1/P2/P3 分层**：P0（定义、机制、公式、估值流程、例题链、ABS 选择规则）进主路径；P3（外部链接、泛市场讨论）audit-only。
3. **例题链重构**：将 slides 13–20 的连续例题链从零散文字中重建为四个 example_box，覆盖利率路径 → 再融资率 → 现金流 → PV → OAS 的完整逻辑。
4. **visualBlock 大幅扩展**：新增 process_flow、formula_card（4 个）、example_box（4 个）、chart_explanation、comparison_table（2 个）、data_table 和 case_card。
5. **删除低价值内容**：移除来自外部链接的建行 MBS 案例、timeline、泛市场背景。
6. **简洁同步**：本轮不修改 framework-concise.json；后续 concise_sync 不做自动处理。

## 增强后预期

- nodes：7 个顶层模块，预计 40–50 个递归节点
- visualBlocks：15–18 个，覆盖 process_flow（2）、cashflow_diagram（1）、comparison_table（3）、formula_card（4）、chart_explanation（1）、example_box（4）、case_card（1）、data_table（1）
- 状态目标：polished
