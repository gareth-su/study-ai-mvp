# ysjrgj 第 4 章 Full Enhancement Plan

制定日期：2026-05-14
增强类型：Full Enhancement (D → polished)
参考基准：ch10/ch11/ch12 增强后的 polished 标准

## 前置审计结论

- 21/23 children <40 chars (91% 提纲化)
- 6 个 formula_cards 全部缺 priority，4 个使用自然语言公式
- node 使用"核心机制/核心概念/关键公式与计算逻辑/易混点/复习路径"模板
- 2 个 example_boxes 全部缺 sourceType/sourceNote

## 目标模块结构 (6→8 nodes)

```
[0] 章节总览：为什么利率是衍生品定价基础（3 children）
[1] 利率报价体系与"无风险利率"（3 children）
[2] 计息频率与复利换算（3 children）
[3] 零息利率、收益率曲线与剥离法（3 children）
[4] 远期利率与无套利推导（3 children）
[5] FRA：远期利率的应用工具（3 children）
[6] 久期、凸性与利率风险管理（3 children）
[7] 易混点与复习路径（4 children）
```

## Formula Card 修正清单

| # | Title | Priority | 修正内容 |
|---|-------|----------|---------|
| 1 | 复利与连续复利换算 | P0 | 已含 LaTeX，补 priority，补换算公式 |
| 2 | 远期利率：由零息曲线推导 | P0 | 已含 LaTeX，补 priority，补适用条件 |
| 3 | 债券定价与久期 | P0 | 合并债券定价+久期，补 priority |
| 4 | 久期近似与凸性修正 | P0 | 将自然语言"ΔB/B≈-D×Δy"改为LaTeX，合并凸性修正，补 priority |
| 5 | FRA现金流与价值 | P1 | 已含 LaTeX，补 priority，补条件说明 |
| 6 (new) | 零息债券定价与剥离法 | P1 | 新增，覆盖 PPT p17-p19 的零息债定价和剥离起点公式 |

## Visual Block 修补

- 保留：comparison_table（更新表头）、process_flow、2×data_table、concept_map、curve_chart、case_card
- 新增：零息债券定价与剥离法 formula_card
- example_box ×2：补 sourceType/sourceNote
- curve_chart：保留，更新 description 和 keyTakeaways

## 成组关系覆盖确认

| 成组 | 正文 | formula_card | chart/table | example_box |
|------|------|-------------|-------------|-------------|
| 离散复利/连续复利 | ✓ | ✓ | — | — |
| 即期利率/远期利率 | ✓ | ✓ | data_table | — |
| 报价利率/有效利率 | ✓ | ✓ | comparison_table | — |
| 零息利率/YTM | ✓ | ✓ | 2 data_tables | — |
| 久期/凸性 | ✓ | ✓ | curve_chart | — |
| 收固定/付固定FRA | ✓ | ✓ | — | 例题1/2 |
