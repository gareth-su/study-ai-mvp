# ysjrgj 第 1 章 Post-review

审查日期：2026-05-14
审查对象：第 1 章“导言”（framework-detailed.json）
结论：polished（有小修，已完成）

## 审查结论

第 1 章已达到导论章应有的 polished 状态：结构从“衍生品是什么”进入“四类基础合约”“两类市场结构”“三类参与者”“无套利直觉”“风险监管与课程展望”，学习路径清晰，没有把导论章扩成后续章节的百科式展开。

## 结构与 children

- 7 个 node 均为教学主题名，无“核心机制/核心概念/公式逻辑”等模板名。
- 23 个 children 均为解释性段落，无 short children。
- 段落不是简单 bullet 列表，能解释概念、制度差异和后续课程连接。
- 第 1 章公式只用于建立直觉，没有过度展开第 4/5/11 章的技术细节。

## 成组概念覆盖

- 远期 / 期货 / 期权 / 互换：正文与 comparison_table 成组覆盖，权利义务、交易场所、标准化、结算方式、信用风险均有区分。
- 套期保值 / 投机 / 套利：正文、例子和 comparison_table 成组覆盖，且没有把投机者简单污名化。
- 场内 / 场外 / CCP / 双边抵押：覆盖深度适合导论章，能说明风险监管逻辑但未扩成清算制度百科。
- 无套利定价：通过黄金远期例题建立“复制组合/同一现金流同一价格”的直觉，技术细节留给后续章节。

## Formula / LaTeX

- 2 个 formula_card 均有 priority、usage、pitfalls。
- `F=S(1+r)^T` 和期权到期收益公式均可被 KaTeX 解析。
- JSON 中反斜杠转义合法。
- 适用条件明确：无收益资产、年复利仅为导论例题简化、期权公式为到期内在价值。

## Example_box

- 黄金远期无套利例题有 sourceType/sourceNote。
- 参数与公式卡一致，未与 chart/table 发生参数混用。
- 例题承接 PPT 黄金远期链条，计算步骤完整。

## VisualBlock / Metadata

- 原问题：两个 comparison_table 和一个 data_table 缺 description/keyTakeaways。
- 已修复：补齐基础合约对比、三类交易者对比、中国大陆主要期货交易所表的 metadata。
- line_chart 使用 series 字段，title/description/keyTakeaways 与正文一致。
- concept_map 无工程词暴露。

## PPT 覆盖

- PPT P0/P1：衍生品定义、四类合约、三类交易者、场内/场外、无套利黄金远期例题、市场规模趋势均覆盖。
- PPT 图示未直接作为图片接入，已用 line_chart / comparison_table / concept_map 结构化替代；替代方式合理。
- P2/P3 的扩展监管和市场背景被压缩到导论章适当深度。

## 已修小问题

1. 补充 `基础衍生品合约对比` 的 description 与 keyTakeaways。
2. 补充 `三类交易者对比` 的 description 与 keyTakeaways。
3. 补充 `中国大陆主要期货交易所与品种示例` 的 keyTakeaways。

## Remaining risks

- 章节使用了 2008 金融危机和 Dodd-Frank 等外部背景，作为导论风险监管案例可接受；若后续课程强调只按 PPT 内容，可在生成阶段限制外部案例篇幅。
- PDF 文本抽取在当前环境不可用，PPT 覆盖判断主要基于已渲染截图、增强报告与章节内容交叉核对。
