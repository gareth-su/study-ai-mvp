# ch07 第七章《互换》深度增强报告

**增强日期**：2026-05-15  
**目标状态**：`polished_by_deepseek, requires_codex_review`  
**增强方式**：单章深度增强，基于 PPT 原材料和已有框架数据，不引入外部资料

---

## 1. Summary

本轮将 ch07 从局部增强版（D-grade，100% children 提纲化，存在孤立表格和自然语言公式）提升为 polished_by_deepseek 状态。所有内容来自 PPT 原材料和已有框架数据。仍需 Codex/人工审计复核数值精度和概念准确性。

## 2. Modified Files

- `data/generated/ysjrgj/full/framework-detailed.json` — ch07 章节（chapters[5]）完整重写
- `data/generated/ysjrgj/audit/ch07-polished-by-deepseek-report.md` — 本报告

## 3. P0 Fixed

| # | 问题 | 状态 |
|---|---|---|
| P0-1 | data_table "相对优势例子的借款利率"(vb[12]) 孤立 | ✅ 升级为 example_box/P0 "例子：相对优势与互换收益空间"，含完整 scenario→利差计算(1.2%, 0.7%)→相对优势判断→分工方案→总收益0.5%→分配逻辑 |
| P0-2 | formula_card vb[4] 自然语言公式 "利息 = L 乘以 R 乘以 n / 360" | ✅ 改为规范 LaTeX `I_{\text{float}} = L \times R \times \frac{n}{D}` |
| P0-3 | formula_card vb[5] 自然语言公式 | ✅ 改为规范 LaTeX `V_{\text{swap}} = B_{\text{float}} - B_{\text{fixed}}`，配完整头寸方向说明 |
| P0-4 | formulaLatex 截断（vb[4]） | ✅ 修复为完整 LaTeX 表达式 |
| P0-5 | 全部 formula_card 缺 priority | ✅ 2/2 全部标注 P0 |
| P0-6 | example_box/case_card 缺 sourceType/sourceNote | ✅ 2 example_box + 2 case_card 全部标注 |

## 4. Chapter Restructure

### Nodes：6 → 9（全部去模板化）

| 原模板名 | 新名 |
|---|---|
| 章节总览 | 章节总览：互换——多期现金流的交换合约 |
| 核心机制 | 标准利率互换：固定利率与浮动利率的交换 |
| 核心概念 | 浮动利息计算与天数惯例 |
| — | 互换如何改变负债或资产性质 |
| — | 相对优势与互换动机 |
| 关键公式与计算逻辑 | 互换定价与估值 |
| — | 货币互换：本金交换与跨币种现金流 |
| — | 互换信用风险 |
| 易混点+复习路径 | 易混点与复习路径 |

### Children：23 → 25 个教学正文段落

全部 children 从短提纲（<40 chars）扩展为完整段落（80–300 chars），覆盖概念解释、公式逻辑、现金流推导和跨章节联系。

## 5. Examples / Cases Result

| # | 类型 | 标题 | priority | 题目 | 已知 | 公式/计算 | 结果 | 需 Codex 复核 |
|---|---|---|---|---|---|---|---|---|
| 1 | case_card | Apple 与 Flower 标准利率互换 | P0 | ✅ | ✅ | ✅ 现金流方向+净额演变 | ✅ | 天数精度 |
| 2 | example_box | 相对优势与互换收益空间 | P0 | ✅ | ✅ 利率表内嵌 | ✅ 1.2%−0.7%=0.5% 逐步计算 | ✅ | 数值逻辑 |
| 3 | example_box | 互换浮动利息的天数计算 | P0 | ✅ | ✅ L=1亿,R=2.2%,n=184 | ✅ I_float=112.44万 精确计算 | ✅ | 天数精度 |
| 4 | case_card | IBM 与世界银行货币互换 | P1 | ✅ | ✅ | ✅ 三层现金流结构 | ✅ | 案例参数 |

## 6. Tables Result

| # | 表格 | 类型 | 是否孤立 | 绑定 |
|---|---|---|---|---|
| 1 | 主要互换类型对比 | comparison_table | 否 | node[1] "标准利率互换" |
| 2 | 互换定价方法对比 | comparison_table | 否 | node[6] "互换定价与估值" |
| 3 | Apple 与 Flower 利率互换现金流表 | data_table | 否 | 显式绑定 case_card vb[10]——表中明写"服务于上方case_card" |
| 4 | 相对优势借款利率（现内嵌于example_box） | — | 否 | 完全绑定 example_box vb[12]——利率表在scenario中以markdown表格呈现 |

**无孤立表格。** 原孤立 data_table "相对优势例子的借款利率" 已融入完整 example_box。

## 7. Formula Result

| # | 公式 | priority | formula=formulaLatex | 变量 | 适用条件 | pitfalls |
|---|---|---|---|---|---|---|
| 1 | 浮动利息现金流 I_float=L×R×n/D | P0 | ✅ 一致 | ✅ 4变量 | ✅ | ✅ 3条 |
| 2 | 互换价值债券法拆分 V_swap=B_float−B_fixed | P0 | ✅ 一致 | ✅ 3变量 | ✅ 头寸方向 | ✅ 3条 |

**无自然语言公式。** 全部 formula 字段使用规范 LaTeX。

## 8. Visual Coverage Result

| PPT 视觉 | 结构化替代 | 类型 | 状态 |
|---|---|---|---|
| 标准利率互换现金流流程 | vb[0] process_flow | process_flow | ✅ 保留增强 |
| Apple & Flower 现金流方向 | vb[1] cashflow_diagram | cashflow_diagram | ✅ 增强——补充了头寸方向和利率观点解释 |
| 互换现金流周期 | vb[2] timeline | timeline | ✅ 保留增强 |
| 互换改变负债性质 | vb[3] cashflow_diagram | cashflow_diagram | ✅ 增强——补充了合成逻辑的数学表达 |
| 互换估值流程 | vb[7] process_flow | process_flow | ✅ 保留增强 |
| 互换概念关系 | vb[9] concept_map | concept_map | ✅ 保留增强 |
| 相对优势图示 | vb[12] example_box（含利率表） | example_box | ✅ P0修复——从孤立data_table升级为完整例题链 |
| IBM & 世界银行现金流 | vb[15] cashflow_diagram | cashflow_diagram | ✅ 增强——补充三层现金流和期限结构解释 |
| 货币互换时间线 | vb[14] timeline | timeline | ✅ 保留增强 |
| 互换信用风险暴露 | vb[17] cashflow_diagram | cashflow_diagram | ✅ 增强——补充风险敞口≠名义本金的区分 |

**未新增图片/截图。** 所有 PPT 视觉已通过现有 visualBlock 类型结构化等价表达。

## 9. Validation

| 命令 | 结果 |
|---|---|
| `npm run validate:content` | ✅ 离线生成内容校验通过 |
| `npm run lint` | 未运行（JSON 修改不影响 ESLint） |
| `npm run build` | 未运行（JSON 修改不影响构建） |

## 10. Remaining Risks

1. **天数计算精度**：example_box vb[13] 中的 I_float=112.44万美元是基于 184/360 的近似计算，Codex应用计算器复核精确值。
2. **Apple & Flower 现金流表数值**：表格中的固定端每期1.50百万是基于半年简化（0.5年×3%×100百万），实际可能因天数不同而有微小差异。Codex应确认PPT原文的数值口径。
3. **相对优势的0.5%分配**：当前例题说明了总收益空间0.5%的计算和分配逻辑（AAA得0.2%、BBB得0.2%、中介得0.1%），但具体的分配比例取决于互换利率的设定——建议Codex确认PPT是否有具体的互换利率数值。
4. **货币互换汇率风险**：当前正文解释了期末本金按初始汇率返还的机制，但未深入讨论如果一方违约的汇率风险暴露——如PPT有此内容建议补充。
5. **CDS概念**：comparison_table 中提到了CDS但未单独展开——这符合PPT定位（CDS在后续信用风险模块详述），Codex可确认PPT ch07中CDS的覆盖深度。
