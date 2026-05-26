# ch03 第三章《利用期货的对冲策略》深度增强报告

**增强日期**：2026-05-15  
**目标状态**：`polished_by_deepseek, requires_codex_review`  
**增强方式**：单章深度增强，基于 PPT 原材料和已有框架数据，不引入外部资料

---

## 1. Summary

本轮将 ch03 从提纲版（D-grade，100% children <40 chars，全部模板 node，4/4 formula_card 自然语言）提升为 polished_by_deepseek 状态。所有内容来自 PPT 原材料和已有框架数据。仍需 Codex/人工审计复核数值精度和概念准确性。

## 2. Modified Files

- `data/generated/ysjrgj/full/framework-detailed.json` — ch03 章节（chapters[2]）完整重写
- `data/generated/ysjrgj/audit/ch03-polished-by-deepseek-report.md` — 本报告

## 3. P0/P1 Fixed

| # | 问题 | 状态 |
|---|---|---|
| P0-1 | 4 个 formula_card 使用自然语言（"乘以"） | ✅ 全部改为规范 LaTeX（`h^*=\rho\frac{\sigma_S}{\sigma_F}` 等） |
| P0-2 | 4 个 formula_card 缺 priority | ✅ 4/4 全部标注（3 P0 + 1 P1） |
| P0-3 | 4 个 example_box 缺 sourceType/sourceNote | ✅ 5/5 example_box + 1 case_card 全部标注 |
| P1-1 | 尾随对冲例题缺失 | ✅ 新增 example_box/P0 "尾随对冲——从资产价值确定合约数量"（V_A=3,880,000, V_F=83,580, ĥ=0.75 → N≈35） |
| P1-2 | 日元空头对冲双路径缺失 | ✅ 扩展现有 example_box，补充基差法路径（b₁=−0.060, b₂=−0.005），证明两种方法恒等 |
| P1-3 | 股指期货调 β 情景不全 | ✅ 扩展为完整三情景：完全对冲（30空头）、降β至0.75（15空头）、升β至2.0（10多头），含方向说明 |
| P1-4 | 回归散点图 Figure 3-2 缺失 | ✅ 新增 curve_chart "最小方差对冲比率：回归斜率示意"（ΔS vs ΔF 散点图+回归线） |

## 4. Chapter Restructure

### Nodes：6 → 8（全部去模板化）

| 原 | 新 |
|---|---|
| 章节总览 | 章节总览：用期货管理价格风险 |
| 核心机制 | 多头对冲与空头对冲：方向由未来现货头寸决定 |
| 核心概念 | 基差风险：为什么对冲不会完美锁死价格 |
| —（新拆出） | 最小方差对冲比率：用相关性和波动率确定最佳比例 |
| —（新拆出） | 最优合约数量与尾随对冲 |
| —（新拆出） | 股指期货对冲：用β调整组合系统性风险 |
| 关键公式 | 滚动对冲、交叉对冲与对冲局限 |
| 易混点+复习 | 易混点与复习路径 |

### Children：22 → 24 个教学正文段落

全部从短提纲（<40 chars）扩展为 80–300 chars 的教学段落。

## 5. Examples Result

| # | 标题 | priority | 题目 | 已知 | 公式 | 代入 | 结果 | 解释 | 需复核 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 铜采购多头对冲 | P0 | ✅ | ✅ | ✅ | ✅ 两情景 | ✅ 锁定$320K | ✅ | 数值 |
| 2 | 日元空头对冲（双路径） | P0 | ✅ | ✅ | ✅ 期货盈利法+基差法 | ✅ | ✅ 48.75万 | ✅ 恒等证明 | 基差b₁,b₂数值 |
| 3 | 航空燃油交叉对冲 | P0 | ✅ | ✅ | ✅ h*=0.78 | ✅ | ✅ 37份 | ✅ | 数值 |
| 4 | 尾随对冲（新增） | P0 | ✅ | ✅ | ✅ N*=ĥ×V_A/V_F | ✅ | ✅ 35份 | ✅ 实物vs价值口径 | 数值 |
| 5 | 股指期货β调整 | P0 | ✅ | ✅ | ✅ N*=(β_c−β_t)×V_A/V_F | ✅ 三情景 | ✅ 30空/15空/10多 | ✅ 方向说明 | 数值 |

## 6. Tables Result

| # | 表格 | 类型 | 孤立？ | 绑定 |
|---|---|---|---|---|
| 1 | 主要对冲方式对比 | comparison_table | 否 | node[1] 多空对冲 + node[7] 三种对冲 |
| 2 | 普通/交叉/滚动对冲详细对比 | comparison_table | 否 | node[7] 滚动对冲与局限性 |

**无孤立表格。**

## 7. Formula Result

| # | 公式 | priority | formula=formulaLatex | 变量 | pitfalls |
|---|---|---|---|---|---|
| 1 | 最小方差对冲比率 h*=ρσ_S/σ_F | P0 | ✅ 一致 | ✅ 4 | ✅ 3 |
| 2 | 最优合约数量 N*=h*×Q_A/Q_F | P0 | ✅ 一致 | ✅ 4 | ✅ 3 |
| 3 | 基差风险 b=S−F; Δb=ΔS−hΔF | P1 | ✅ 一致 | ✅ 4 | ✅ 2 |
| 4 | 股指期货β调整 N*=(β_c−β_t)×V_A/V_F | P0 | ✅ 一致 | ✅ 4 | ✅ 3 |

**全部 formula 字段使用规范 LaTeX，无自然语言公式。**

## 8. Visual Coverage Result

| PPT 视觉 | 结构化替代 | 类型 | 状态 |
|---|---|---|---|
| 对冲决策流程 | vb[0] process_flow | process_flow | ✅ 保留增强 |
| 多空对冲方向判断 | vb[1] decision_tree | decision_tree | ✅ 保留增强 |
| 回归散点图 Figure 3-2 | vb[8] curve_chart "最小方差对冲比率：回归斜率示意" | curve_chart | ✅ 新增——ΔS vs ΔF散点+回归线 |
| 基差收敛图 | vb[9] curve_chart "基差收敛示意" | curve_chart | ✅ 保留增强 |
| 对冲概念关系 | vb[12] concept_map | concept_map | ✅ 保留增强 |
| 德国金属案例 | vb[13] case_card/P1 | case_card | ✅ 增强——补sourceType/sourceNote，扩充分析 |

**新增 visualBlock**：1 个（vb[8] curve_chart "最小方差对冲比率：回归斜率示意"）
**未新增图片/截图。**

## 9. Validation

| 命令 | 结果 |
|---|---|
| `npm run validate:content` | ✅ 离线生成内容校验通过 |
| `npm run lint` | 未运行 |
| `npm run build` | 未运行 |

## 10. Remaining Risks

1. **日元基差法数值**：b₁=−0.060 和 b₂=−0.005 是基于建仓时期货0.980、即期0.920的反推——PPT原文的基差定义和数值可能不同。Codex需确认PPT中基差的具体定义和b₁的精确值。
2. **尾随对冲例题**：参数V_A=3,880,000和V_F=83,580来自审计记录中的PPT p15-p16提取——Codex应目视确认渲染截图中的精确数值。
3. **回归散点图**：新增的curve_chart是示意性概念图（非精确数据点）——PPT中的Figure 3-2可能有具体的散点分布和标注，如需精确复制应补充渲染截图。
4. **德国金属案例的具体数字**：当前case_card以定性分析为主——PPT可能包含具体的亏损金额、合约数量和保证金数字。如PPT有此内容，建议在后续轮次补充。
5. **股指期货β调整**：当前使用S&P500参数——PPT可能还包含沪深300或中证500的中国市场案例，如存在建议补充。
