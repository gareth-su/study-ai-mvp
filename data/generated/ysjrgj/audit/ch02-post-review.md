# ysjrgj 第 2 章 Post-review

审查日期：2026-05-14
审查对象：第 2 章“期货市场的运作机制”（framework-detailed.json）
结论：polished（有小修，已完成）

## 审查结论

第 2 章已达到机制章 polished 状态：不是只列期货市场名词，而是按“合约标准化 → 开仓/平仓/交割 → 保证金与每日盯市 → 清算所/CCP → 多空盈亏 → 场外监管与参与者”的流程组织。核心机制能串起来，例题和公式支撑每日盯市计算。

## 结构与 children

- 8 个 node 均为具体教学主题，无模板名。
- 24 个 children 均为解释性段落，无 short children。
- 机制流程被 process_flow、timeline、cashflow_diagram 承接，正文不是孤立名词表。

## 成组概念覆盖

- 标准化条款：标的、合约规模、到期月份、交割规格等均讲清。
- 开仓 / 平仓 / 交割 / 对冲平仓：正文与流程图成组覆盖。
- 初始保证金 / 维持保证金 / 每日盯市 / 追加保证金：正文、公式、例题、表格成组覆盖。
- 多头 / 空头：盈亏方向正确，多头价格上涨盈利，空头方向相反。
- 清算所 / 中央对手方：机制准确，说明 CCP 介入后买卖双方不再直接承担对方信用风险。
- 套保者 / 投机者 / 套利者：与第 1 章表述一致，未发生概念冲突。

## Formula / LaTeX

- 1 个 formula_card 有 priority、usage、pitfalls。
- `\text{P}\&\text{L}_{\text{long}}=N\times Q\times(S_t-S_{t-1})` 可被 KaTeX 解析。
- JSON 反斜杠转义合法。
- 公式明确只计算单日盯市盈亏，空头方向相反，累计盈亏等于每日盈亏之和。

## Example_box

- 保证金账户每日盯市例题有 sourceType/sourceNote。
- 参数与公式一致，未与 data_table 形成冲突。
- 计算链完整：初始余额、每日盈亏、余额更新、是否触发追加、最终平仓盈亏。

## VisualBlock / Metadata

- 原问题：timeline title 含 `undefined`；cashflow_diagram 一条 takeaway 写成“买方和买方”；多个 comparison_table/data_table 缺 description/keyTakeaways。
- 已修复：timeline events title 改为干净时间点；cashflow_diagram 文案修为“买方和卖方”；补齐 6 个 comparison_table 与 1 个 data_table 的 metadata。
- line/chart 类 schema 无非法字段；cashflow_diagram 的 cashflowType 保持 allowed enum。
- data_table 仅承载概念汇总，没有替代应作为 example_box 的计算链；计算链仍由 example_box 承担。

## PPT 覆盖

- P0/P1 合约标准化、保证金、每日盯市、清算所、平仓/交割、多空盈亏均覆盖。
- PPT 铜期货保证金例题链被 example_box 承接。
- PPT 图示通过 process_flow、timeline、cashflow_diagram、comparison_table 结构化替代，替代合理。
- P2/P3 场外监管和市场参与者被压缩为机制章补充内容，没有稀释期货市场主线。

## 已修小问题

1. 去除 timeline events title 中的 `undefined`。
2. 修正 cashflow_diagram takeaway 中“买方和买方”为“买方和卖方”。
3. 补齐远期 vs 期货、初始 vs 维持保证金、平仓 vs 交割、场外抵押 vs 中央清算、保证金账户概念、未平仓数量 vs 成交数、保证金账户关键项目的 metadata。

## Remaining risks

- 第 2 章 visualBlocks 数量较多，网页端如果需要更强的阅读节奏，后续可考虑折叠或分组展示；本轮不改前端。
- PDF 文本抽取在当前环境不可用，PPT 覆盖判断主要基于增强报告、章节内容和可用渲染资源交叉核对。
