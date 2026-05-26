# 第 3 章《债券收益率》CC 增强状态审计与计划

审计日期：2026-05-13
审计范围：`data/generated/gdsyzq/full/framework-detailed.json` 第 3 章；仅新增/更新 audit 文件，不修改正文 JSON。

## Executive Summary

- 当前状态判断：**局部增强 / 混合状态 → 已做小范围修复（2026-05-13 第二轮）**。第 3 章 29 个 visualBlocks、6 个 `example_box`，P0/P1 主线覆盖较完整。
- 本轮已完成小范围正文增强：9 个 `formula_card.formula` 全部清理为规范 LaTeX；自展法方程已重命名为”自展法例题关键价格方程”并移动到 example_box 之后；第 39 页扩展表格按人工审核意见删除；第 41 页远期反推例题已补全 scenario/步骤/结果/提示；第 40 页关系图不新增。
- 是否建议下一轮做正文增强：**暂不**。本轮已修复所有确认问题，剩余为人工复核口径点，无需进一步正文修改。
- 最高优先级问题（已修复）：
  1. ~~9 个 `formula_card.formula` 中多处为自然语言或半 LaTeX 文本~~ → 已全部清理为规范数学表达式。
  2. ~~”1.5 年即期利率自展方程”孤立公式卡~~ → 已重命名并移动到 example_box 之后，绑定为示例步骤公式。
  3. ~~第 39-40 页远期利率表/关系图~~ → 第 39 页表按人工审核删除；第 40 页图不新增。

## Coverage Check

| Topic | Present? | Quality | Evidence | Gap |
|---|---|---|---|---|
| 即期利率 | Yes | Good | 正文有”零息债券即期收益率公式””到期收益率与即期收益率对比”，并在自展法模块使用 6 个月、1 年、1.5 年即期收益率。 | `formula` 已规范为数学表达式；无需额外操作。 |
| 远期利率 | Yes | Good | 正文有”两期远期利率与即期利率关系””多期远期利率推广公式””例子 4：由远期利率反推 3 年期即期利率”。 | 第 39 页扩展表已按人工审核删除；第 40 页关系图不新增；`formula` 字段已统一为规范 LaTeX。 |
| 到期收益率 | Yes | Good | 正文有 YTM 现金流折现方程、BEY、8 年期 7% 国债 BEY 例题、两只 3 年期国债 YTM 比较例题。 | YTM 方程 `formula` 已改为 `P_{dirty}=\sum...`；不再含自然语言。 |
| 零息债定价 | Yes | Adequate | “零息债券即期收益率公式”写出 `P=\frac{F}{(1+z_T)^T}`，并说明可由零息国债价格反推即期收益率。 | `formula` 已与 `formulaLatex` 对齐；目前无需额外数值例题。 |
| 自展法 / bootstrapping | Yes | Good (已修复) | 有”自展法构造即期利率曲线流程”、`example_box`（含步骤方程）→ 辅助公式卡 → 现金流贴现表。 | 公式卡已重命名为”自展法例题关键价格方程”并紧贴 example_box 之后，不再孤立。 |
| 债券价格和贴现关系 | Yes | Good | YTM 方程、零息债定价、自展法现金流贴现表均体现价格等于现金流现值。 | 自展法链已理顺：流程 → example_box（含方程步骤）→ 辅助公式卡 → 贴现表。 |
| 期限结构相关图表或表格 | Yes | Good | 有收益率曲线四种形态 `curve_chart`、期限结构理论对比表和理论关系图。 | 第 39 页扩展表已删除；第 40 页图不新增；第 29 页外部曲线仍为补充理解。 |
| 典型计算题 | Yes | Good | 6 个 `example_box` 覆盖当期收益率、BEY、YTM 比较、再投资收益分解、自展法、远期利率反推。 | 第 41 页例题已补全 scenario/steps/result/note；答案约 4.99% 保留人工复核标记。 |

## Formula / Example Check (第二轮修复后状态)

| Item | Current Type | Status | Result |
|---|---|---|---|
| 当期收益率计算公式 | `formula_card` | ✅ 已修复 | `formula` 改为 `CY=\frac{C_{annual}}{P}`；解释移至 usage。 |
| 到期收益率现金流折现方程 | `formula_card` | ✅ 已修复 | `formula` 改为 `P_{dirty}=\sum_{t=1}^{T}\frac{CF_t}{(1+y)^t}`。 |
| 债券等值收益率 BEY | `formula_card` + `example_box` | ✅ 已修复 | `formula` 改为 `BEY=2y_{semi}`。 |
| 再投资收益求和公式 | `formula_card` + `example_box` | ✅ 已修复 | `formula` 改为 `RI=\sum_{t=1}^{n}C\left[(1+r)^{n-t}-1\right]`。 |
| 零息债券即期收益率公式 | `formula_card` | ✅ 已修复 | `formula` 与 `formulaLatex` 对齐为 `P=\frac{F}{(1+z_T)^T}`。 |
| 1.5 年即期利率自展方程 | 曾为孤立 `formula_card` | ✅ 已修复 | 重命名 + 移到 example_box 后；example_box 补 steps；formula 字段改为规范 LaTeX。 |
| 两期远期利率与即期利率关系 | `formula_card` | ✅ 已修复 | `formula` 改为 `f=\frac{(1+z_2)^2}{1+z_1}-1`；usage 写明两条投资路径收益因子相等。 |
| 多期远期利率推广公式 | `formula_card` | ✅ 已修复 | `formula` 改为 `f_m=\frac{(1+z_{m+1})^{m+1}}{(1+z_m)^m}-1`。 |
| 纯预期理论长期即期利率公式 | `formula_card` | ✅ 已修复 | `formula` 改为 `z_T=\left[(1+z_1)(1+f_1)\cdots(1+f_{T-1})\right]^{1/T}-1`。 |
| 例子 4：由远期利率反推 3 年期即期利率 | `example_box` | ✅ 已增强 | 补全 scenario/steps/result/takeaway/note；答案 4.99% 保留人工复核标记。 |
| 第 39 页远期利率示例表 | 曾为 `data_table` | ✅ 已删除（人工审核） | 按人工审核意见，第 39 页为扩展内容，已从正文 visualBlocks 删除。 |
| 第 40 页远期利率关系图 | 未创建 | ✅ 不新增（人工审核） | 第 40 页为扩展内容，不新增 chart_explanation。 |
| 自然语言 formula | 曾为 Yes | ✅ 已全部清理 | 所有 `formula` 字段现均为规范 LaTeX，不含英文/中文解释句。 |
| 半 LaTeX | 曾为 Yes | ✅ 已全部修复 | `formula` 中百分号用 `\%`，省略号用 `\cdots`，括号统一 `\left[...\right]`。 |

## Visual / Table Check (第二轮修复后状态)

| Visual/Table | Current Location | Problem | Status |
|---|---|---|---|
| 债券三类收益来源对比 | 章节级 visualBlocks | 内容正确；如前端展开展示可保持。 | 保持 |
| 到期收益率比较例子的债券输入与结论 | YTM 比较例题后 | 表格与例题内容匹配。 | 保持 |
| 再投资收益占比表 | 再投资收益分解例题后 | 服务再投资风险机制。 | 保持 |
| 自展法现金流贴现表 | 自展法 example_box 后 | 已紧贴例题和辅助公式卡之后，类型正确。 | ✅ 已绑定 |
| 收益率曲线四种典型形态 | 远期利率之后、理论之前 | `curve_chart` 有概念说明。 | 保持 |
| 补充理解：收益率曲线模型示例 | P2 补充位置 | 合理降权。 | 保持 |
| 第 39 页远期利率示例表 | 已删除 | 按人工审核为扩展内容。 | ✅ 已删除 |
| 第 40 页远期利率关系图 | 不新增 | 按人工审核为扩展内容。 | ✅ 不新增 |
| 利率期限结构理论关系图 | 理论模块后部 | 概念关系图作为总结。 | 保持 |

## Visual / Table Check

| Visual/Table | Current Location | Problem | Recommended Fix |
|---|---|---|---|
| 债券三类收益来源对比 | 章节级 visualBlocks，服务“债券收益来源”模块 | 内容正确；若渲染按章节统一展示而非模块内展示，可能与对应知识点脱节。 | 确认前端是否按 chapter visualBlocks 统一展示；如是，下一轮应把 visualBlocks 迁入或绑定对应模块。 |
| 到期收益率比较例子的债券输入与结论 | 与 YTM 比较 example_box 同在章节 visualBlocks | 表格与例题内容匹配，类型正确。 | 保持；最好紧贴“例子 2”后展示。 |
| 再投资收益占比表 | 再投资收益分解例题后 | 表格服务再投资风险机制，不必改为 example_box。 | 保持；作为 P1 对比辅助，紧随再投资收益例题或风险影响因素。 |
| 自展法现金流贴现表 | 自展法 `example_box` 后 | 类型正确，表格是例题条件和贴现路径的一部分。 | 保持并确保紧贴自展法 example_box；如果视觉顺序可控，应为流程 → 条件表/方程 → example_box 或 example_box → 表格。 |
| 收益率曲线四种典型形态 | 收益率曲线形态部分 | 当前 `curve_chart` 有概念点并说明不是历史数据，符合标准。 | 保持；图示说明应紧贴曲线图，不要移动到补充材料。 |
| 补充理解：收益率曲线模型示例的学习含义 | 利率期限结构构造相关补充 | 第 29 页中债/美联储曲线没有可靠坐标，正文降权为 `chart_explanation` 合理。 | 保持 P2 补充；不新增截图，除非人工确认版权和裁切价值。 |
| 远期利率示例表：即期利率与远期利率 | 远期利率部分 | 表格已进入正文；第 39 页抽取文本显示原 PPT 有多个表对象，数值和排版需人工核对。 | 保持 data_table，但人工复核 1-10 期数值对应关系。 |
| 第 40 页远期利率关系图 | 目前仅 slide inventory 记录为 `chart_explanation` 候选，正文未见独立 visualBlock | 如果原图表达即期与远期利率曲线/路径关系，则当前缺少紧贴读图说明；若只是第 39 页表格可视化，则可 audit-only。 | 人工查看 PPT 图像；若为强 B 对象，新增 `chart_explanation` 并放在远期利率表后、反推例题前。 |
| 第 45、50 页理论图示页 | audit-only | 文本无法确认图示细节，正文未硬造图示，处理合理。 | 保持 audit-only；不要新增图片或曲线，除非人工可读并确认教学价值。 |
| 利率期限结构理论关系图 | 理论模块后部 | 概念关系图可作为理论总结；不属于前置图。 | 保持后置总结位置。 |

## Teaching Sequence Check (第二轮修复后状态)

当前第 3 章主线利于学习：章节总览 → 收益来源 → 当期收益率 → 到期收益率 → 再投资收益/风险 → 即期利率 → 利率期限结构构造/自展法 → 远期利率 → 收益率曲线形态 → 期限结构理论 → 易混点 → 复习路径。

已修复的局部问题：

1. ✅ 自展法模块已理顺为：流程(15) → example_box(16) → 辅助公式卡(17) → 现金流贴现表(18)。公式卡已重命名并紧贴 example_box 之后，不再孤立。
2. ✅ 远期利率模块已精简为：两期公式 → 多期推广 → 反推即期利率例题。第 39 页扩展表删除，第 40 页关系图不新增。
3. 收益率曲线四形态 → 期限结构理论 顺序合理，无需调整。
4. P2 构造方法对比和曲线模型示例保持降权补充位置，不抢占主路径。

## Recommended Enhancement Plan (第二轮已执行)

### 已完成的增强操作

- ✅ 9 个 `formula_card.formula` 全部清理为规范 LaTeX。
- ✅ “1.5 年即期利率自展方程”重命名为”自展法例题关键价格方程”并移到 example_box 后。
- ✅ 自展法 example_box 补全 5 个求解步骤。
- ✅ 第 39 页扩展表按人工审核删除。
- ✅ 第 41 页远期反推例题补全 scenario/steps/result/takeaway/note。
- ✅ 第 40 页关系图不新增。

### 当前模块结构（未变）

1. 章节总览 → 2. 收益来源 → 3. 当期收益率 → 4. 到期收益率 → 5. 再投资收益/风险 → 6. 即期利率 → 7. 自展法 → 8. 远期利率 → 9. 收益率曲线形态 → 10. 期限结构理论 → 11. 易混点与复习路径。

### 人工复核点（仍未解决，需后续人工确认）

1. 第 41 页反推 3 年期即期利率约 4.99% 是否符合课堂答案口径。
2. 第 31 页自展法 PPT 数学对象中方程口径是否与当前年化/半年复利写法一致。
3. 若前端实际按章节级 visualBlocks 统一展示，需确认 visualBlocks 是否能紧贴对应学习模块。

## Do Not Change Confirmation (第二轮)

- ✅ 本轮**已修改** `data/generated/gdsyzq/full/framework-detailed.json` 第 3 章（chapters[2]），范围限于：formula 字段清理、visualBlock 标题/位置调整、example_box steps 补充、第 39 页 table 删除。
- ✅ 本轮没有修改 `data/generated/gdsyzq/full/framework-concise.json`。
- ✅ 本轮没有修改 `data/generated/gdsyzq/sample/**`。
- ✅ 本轮没有修改 `data/generated/ysjrgj/**`。
- ✅ 本轮没有修改 gdsyzq 其他章节（chapters[0]、[1]、[3]...）。
- ✅ 本轮没有修改 `source-materials/**`，也没有新增图片。
- ✅ 本轮没有修改 `src/**`、Prisma schema、loader、VisualBlockRenderer、MathText、LearningModuleSection 或 `package.json`。
- ✅ 本轮没有新增 visualBlock type。
- ✅ 本轮没有调用在线 AI API。
