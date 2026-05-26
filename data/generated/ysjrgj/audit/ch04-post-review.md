# ysjrgj 第 4 章 Post-review

审查日期：2026-05-14
审查对象：第 4 章“利率”（framework-detailed.json）
结论：polished（有小修，已完成）

## 审查结论

第 4 章已达到计算章 polished 状态：学习路径从利率口径开始，经复利换算、零息曲线、远期利率、FRA，再到久期凸性，形成了清晰递进。公式、例题、图表和 metadata 基本同步，没有出现正文讲一套、公式或例题参数讲另一套的情况。

## 结构与 children

- 8 个 node 均为利率章节教学主题，无模板名。
- 25 个 children 均为解释性段落，无 short children。
- 内容虽较长，但服务于计算章路径，没有变成长篇金融市场百科。

## 成组概念覆盖

- 简单利率 / 离散复利 / 连续复利：正文与复利公式卡覆盖。
- 即期利率 / 远期利率：零息曲线与远期利率公式卡区分清楚。
- 零息利率 / YTM / 平价收益率：正文与剥离法数据表区分清楚。
- LIBOR / OIS / 国债 / 回购 / 互换利率：comparison_table 覆盖，未把信用风险和抵押属性混为一谈。
- FRA 收固定 / 付固定：公式 usage、例题和 takeaway 明确方向；反向头寸符号相反。
- 久期 / 凸性：公式、适用条件、曲线图一致。

## Formula / LaTeX

- 6 个 formula_card 均有 priority、usage、pitfalls。
- 所有 formula/formulaLatex 可被 KaTeX 解析。
- JSON 中 `e^{-RT}`、`e^{-R_2T_2}` 等反斜杠与指数写法合法，无 CR 转义风险。
- 公式适用条件较完整：连续复利口径、零息曲线条件、YTM 平坦曲线假设、不含期权债券、FRA 现金流时点等均说明。

## Example_box

- 2 个 FRA example_box 均有 sourceType/sourceNote。
- 例题 2 明确与例题 1 使用不同参数，不共用同一笔 FRA，避免参数混用。
- 例题方向明确：例题 1 是借款方锁定 4% 且市场 4.5% 导致价值为负；例题 2 是收固定方向用 `RK-RF`，价值为正。

## VisualBlock / Metadata

- 原问题：利率类型 comparison_table、两个剥离法 data_table 缺 description/keyTakeaways。
- 已修复：补齐利率类型对比、债券数据表、剥离结果表的 metadata。
- curve_chart points 与说明一致：正凸性使久期+凸性曲线在两侧高于线性久期近似。
- data_table 用于承载剥离法数据与结果，未替代 FRA 例题计算链。

## PPT 覆盖

- P0/P1：利率口径、复利换算、零息债券定价、剥离法、远期利率、FRA、久期凸性均覆盖。
- PPT 剥离法表格以 data_table + process_flow 结构化替代；PPT 久期凸性图以 curve_chart 替代；替代理由合理。
- P2/P3 的市场背景与流动性风险被压缩为 case_card 和利率口径说明，没有稀释主线。

## 已修小问题

1. 补充 `利率类型对比` 的 description 与 keyTakeaways。
2. 补充 `零息利率剥离中的债券数据` 的 keyTakeaways。
3. 补充 `剥离法得到的连续复利零息利率` 的 keyTakeaways。

## Remaining risks

- 第 4 章含 OIS/SOFR、LIBOR 退出等现代市场补充，整体有助于防止利率口径混淆；若后续章节严格限制 PPT 内知识，可控制这类背景为一张对比表以内。
- PDF 文本抽取在当前环境不可用，PPT 覆盖判断主要基于增强报告、章节内容和已渲染截图交叉核对。
