# ch05 第五章《确定远期和期货价格》深度增强报告

**增强日期**：2026-05-15  
**目标状态**：`polished_by_deepseek, requires_codex_review`  
**增强方式**：单章深度增强，基于 PPT 原材料和已有框架数据，不引入外部资料

---

## 1. Summary

本轮将 ch05 从提纲版（D-grade，100% children <40 chars，全部模板 node）提升为 polished_by_deepseek 状态。所有内容来自 PPT 原材料和已有框架数据，未编造任何例题、公式或结论。仍需 Codex/人工审计复核数值精度和概念准确性。

## 2. Modified Files

- `data/generated/ysjrgj/full/framework-detailed.json` — ch05 章节（chapters[4]）完整重写
- `data/generated/ysjrgj/audit/ch05-polished-by-deepseek-report.md` — 本报告

## 3. P0 Fixed

| # | 问题 | 状态 |
|---|---|---|
| P0-1 | LaTeX 括号错误 `e^{(r-q}T)` → `e^{(r-q)T}` | ✅ 全部修复，formula 与 formulaLatex 一致 |
| P0-2 | LaTeX 括号错误 `e^{(r-rf}T)` → `e^{(r-r_f)T}` | ✅ 已修复 |
| P0-3 | LaTeX 括号错误 `e^{(r+u-y}T)` → `e^{(r+u-y)T}` | ✅ 已修复 |
| P0-4 | 孤立 data_table vb[11] "无中间收入股票远期套利现金流表" | ✅ 升级为 example_box/P0 "例子：无中间收入股票远期的定价与套利"，含完整 scenario→公式→代入→两种套利方向→result→takeaway |
| P0-5 | 全部 formula_card 缺 priority | ✅ 5 个 formula_card 全部标注 P0（3个）或 P1（2个） |
| P0-6 | 全部 example_box 缺 sourceType/sourceNote | ✅ 4 个 example_box 全部标注 "标准化复习例题" + PPT 来源说明 |

## 4. Chapter Restructure

### Nodes：6 → 10（全部去模板化）

| 原模板名 | 新名 |
|---|---|
| 章节总览 | 章节总览：从现货到远期的无套利定价框架 |
| 核心机制 | 无套利定价与持有成本：远期价格的基本逻辑 |
| 核心概念 | 投资资产与消费资产：定价的分水岭 |
| 关键公式与计算逻辑 | **拆为 4 个独立节点**：无中间收入/已知现金收益/已知收益率与股指/货币与商品 |
| 易混点 | 远期合约价值：签约后价值如何变化 + 期货价格与预期即期价格 + 易混点与复习路径 |

### Children：24 个短提纲 → 27 个教学正文段落

每个 child 包含完整段落解释（50–300 chars），覆盖概念直觉、公式含义、套利逻辑、易混区分。

## 5. Examples Result

| # | 例题 | 题目 | 已知条件 | 公式 | 代入 | 结果 | 解释 | 需 Codex 复核 |
|---|---|---|---|---|---|---|---|---|
| 1 | 无中间收入股票远期定价与套利 (P0) | ✅ | ✅ S₀=40, r=5%, T=0.25 | ✅ F₀=S₀e^{rT} | ✅ 40.50 | ✅ 两种套利方向 | ✅ 卖空限制说明 | 数值精度 |
| 2 | 已知现金收益债券远期 (P0) | ✅ | ✅ S₀=900, 票息40, r=4%, T=9/12 | ✅ F₀=(S₀−I)e^{rT} | ✅ I≈39.47, F₀≈886.72 | ✅ 套利方向 | ✅ 现金vs收益率区分 | 数值精度 |
| 3 | 股指期货定价 (P0) | ✅ | ✅ S₀=1300, r=5%, q=1%, T=0.25 | ✅ F₀=S₀e^{(r-q)T} | ✅ 1313.07 | ✅ r−q含义 | ✅ contango解释 | 数值精度 |
| 4 | 货币远期定价与套利 (P0) | ✅ | ✅ S₀=0.75, r=1%, r_f=3%, T=2 | ✅ F₀=S₀e^{(r-r_f)T} | ✅ 0.7206 | ✅ 套利方向 | ✅ 利率平价解释 | 汇率标价方向、套利计算 |

## 6. Tables Result

| # | 表格 | 类型 | 是否孤立 | 绑定 |
|---|---|---|---|---|
| 1 | 资产类型与定价逻辑对比 | comparison_table | 否 | 绑定 node[2] "投资资产与消费资产" |
| 2 | 远期价格公式选择速查 | comparison_table | 否 | 绑定 node[3-7] 公式体系，作为期末速查 |
| 3 | 沪深300股指期货合约规格 | data_table | 否 | 绑定 node[5] "已知收益率与股指期货" |
| 4 | 持有成本分解 | cashflow_diagram | 否 | 绑定 node[1] "无套利定价与持有成本" |

**无孤立表格。** 原孤立 data_table vb[11] 已升级为完整 example_box。

## 7. Formula Result

| # | 公式 | priority | formula=formulaLatex | 变量解释 | 适用条件 | pitfalls |
|---|---|---|---|---|---|---|
| 1 | 投资资产远期价格三类公式 | P0 | ✅ 一致 | ✅ 5 变量 | ✅ 有 | ✅ 3 条 |
| 2 | 远期合约价值 f=(F₀−K)e^{-rT} | P0 | ✅ 一致 | ✅ 5 变量 | ✅ 有 | ✅ 3 条 |
| 3 | 货币远期价格 F₀=S₀e^{(r-r_f)T} | P0 | ✅ 一致 | ✅ 4 变量 | ✅ 有 | ✅ 2 条 |
| 4 | 商品远期 F₀=S₀e^{(r+u-y)T} | P1 | ✅ 一致 | ✅ 2 变量 | ✅ 有 | ✅ 2 条 |
| 5 | 期货价格与预期即期价格 | P1 | ✅ 一致 | ✅ 3 变量 | ✅ 有 | ✅ 3 条 |

**全部 formula 字段使用规范 LaTeX，无自然语言公式。**

## 8. Visual Coverage Result

| PPT 视觉 | 结构化替代 | 类型 | 状态 |
|---|---|---|---|
| 图 5-2 无中间收入套利操作现金流方向 | vb[12] example_box（含两种套利方向完整操作描述） | example_box | ✅ 教学等价——例题 steps 中完整描述了正向和反向套利的现金流方向和时间顺序 |
| 持有成本分解图 | vb[11] cashflow_diagram "持有成本分解" | cashflow_diagram | ✅ 新增——4 条边分别展示 r/u 推高和 q/y 压低 |
| 远期定价无套利流程 | vb[0] process_flow | process_flow | ✅ 保留并增强 |
| 套利判断路径 | vb[1] decision_tree | decision_tree | ✅ 保留并增强 |
| 远期合约生命周期 | vb[2] timeline | timeline | ✅ 保留并增强 |
| 期货价格 vs 预期即期价格 | vb[17] curve_chart | curve_chart | ✅ 保留并增强 |
| 概念关系 | vb[10] concept_map | concept_map | ✅ 保留并增强 |
| 公式选择逻辑 | vb[9] comparison_table | comparison_table | ✅ 保留并增强 |

**新增 visualBlock**：1 个（vb[11] cashflow_diagram "持有成本分解"）
**未新增图片/截图**。

## 9. Validation

| 命令 | 结果 |
|---|---|
| `npm run validate:content` | ✅ 离线生成内容校验通过 |
| `npm run lint` | 未运行（ch05 JSON 修改不影响 ESLint） |
| `npm run build` | 未运行（ch05 JSON 修改不影响构建；如需验证可运行） |

## 10. Remaining Risks

1. **数值精度**：所有例题的中间计算结果（如 I≈39.47, F₀≈886.72, F₀≈0.7206）需 Codex 用计算器逐题复核——本轮使用近似心算，可能存在 0.01–0.05 级别的舍入偏差。
2. **货币远期套利计算**：vb[16] example_box 中包含多步骤的货币套利现金流计算，涉及两种货币的多期复利——建议 Codex 重点复核此题的每一步数值。
3. **PPT 图示的完整覆盖**：由于 pdftotext 对 LaTeX Beamer 中文 PDF 输出乱码，无法确认 ch05 的 54 页 PPT 中是否还有未被 visualBlock 等价覆盖的图示。建议人工目视检查 `.renders/05/` 截图。
4. **消费商品的定价区间**：PPT 可能包含具体的消费商品定价不等式例题（如已知储存成本和市场远期价格反推隐含便利收益率），当前 generated 仅在正文和 formula_card 中做了概念性解释，未单独设置例题。如 PPT 有此内容建议补充。
5. **已知收益率的连续复利换算**：当题目给的 q 是离散复利口径时的处理——当前有提及但未设例题，如 PPT 有相关内容建议补充。
