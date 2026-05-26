# ysjrgj 第 11 章 Claude 后审报告

审计日期：2026-05-14
审计对象：data/generated/ysjrgj/full/framework-detailed.json 第 11 章“股票期权的性质”
结论：polished

## 1. Summary

第 11 章增强结果已达到 polished。章节已从此前 D 级的通用提纲状态提升为完整学习模块，并在本轮补齐 polished-near 阶段的两个剩余覆盖缺口：新增含股息欧式期权上下限 formula_card，新增无股息欧式看跌期权价格上下限 curve_chart。

当前第 11 章为 9 个 nodes、31 个 children、15 个 visualBlocks。模块顺序为：总览 → 六因素 → 上限 → 下限 → 平价 → 股息 → 提前行权 → 综合图示 → 易混点。正文、公式卡、图表和例题之间已形成成组覆盖。

## 2. Structure Quality

通过。章节结构已经不是“核心机制/核心概念”模板，而是按股票期权性质的真实学习路径重组。

- 章节总览：定位本章在期权定价理论中的作用。
- 六因素：逐项说明股票价格、执行价格、期限、波动率、利率、股息的方向与机制。
- 上限/下限：分别讲公式、适用范围与套利逻辑。
- 平价：覆盖无股息平价、等价组合和公司资本结构解释。
- 股息：覆盖股息方向、含股息平价、含股息上下限。
- 提前行权：覆盖无股息美式看涨、美式看跌、有股息看涨。
- 综合/易混点：把边界、平价和提前行权整合为复习路径。

未发现短 children、bullet 化残留或过度扩写。

## 3. Grouped Concept Completeness

通过，成组关系完整。

| 成组关系 | 审计结果 |
|---|---|
| 看涨 / 看跌 | 正文、formula_card、data_table、example_box、curve_chart 均覆盖；看涨边界和看跌边界各有独立 chart。 |
| 欧式 / 美式 | 正文、上限公式卡、提前行权表均覆盖；平价卡明确只适用于欧式。 |
| 上限 / 下限 | 公式卡与正文均覆盖；看涨/看跌边界 chart 成组展示。 |
| 无股息 / 有股息 | 无股息下限、无股息平价、含股息平价、含股息上下限均有公式卡；股息方向和提前行权触发均覆盖。 |
| 正向 / 反向影响 | data_table 完整覆盖六因素 × 欧式/美式 × 看涨/看跌方向。 |

未发现“正文完整但 formula_card / chart / example_box 缺半边”的问题。

## 4. Formula / LaTeX / JSON Audit

通过。

重点核查结果：

- 无股息欧式看涨下限：\(c\ge\max(S_0-Ke^{-rT},0)\)，适用条件明确为无股息欧式。
- 无股息欧式看跌下限：\(p\ge\max(Ke^{-rT}-S_0,0)\)，适用条件明确为无股息欧式。
- 有股息欧式看涨下限：\(c\ge\max(S_0-D-Ke^{-rT},0)\)，已新增 P1 公式卡。
- 有股息欧式看跌下限：\(p\ge\max(D+Ke^{-rT}-S_0,0)\)，已新增 P1 公式卡。
- 无股息看跌看涨平价：\(c+Ke^{-rT}=p+S_0\)，usage/pitfalls 明确同一标的、同一 K、同一 T、无股息、欧式。
- 含股息平价：\(c+D+Ke^{-rT}=p+S_0\)，明确 D 为期权期限内所有股息现值，仅适用于欧式。
- 上限公式：\(c\le S_0\)、\(C\le S_0\)、\(p\le Ke^{-rT}\)、\(P\le K\)，适用条件已清楚。
- 提前行权：正文与 comparison_table 明确区分美式/欧式、无股息/有股息、看涨/看跌。
- 六因素方向：data_table 与正文一致。

JSON 风险：

- 未发现 e^{-rT} 的 CR 转义损坏；文件中 raw CR count 为 0。
- LaTeX 命令如 \ge、\max、\left、\right、\quad 均在 JSON 中正确转义。
- formula/formulaLatex 未发现自然语言公式或伪 LaTeX。
- 纯指数 e^{-rT} 不含反斜杠，不存在 \r 被 JSON 解析为回车的问题。

## 5. Curve Chart Audit

### Chart 1：股票价格对看涨与看跌期权价值的影响示意

通过。points 合理呈现看涨随 S0 上升、看跌随 S0 下降。title、description、curve name、keyTakeaways 与正文一致。该图是方向性示意，不要求精确定价参数；description 已说明“其他变量保持不变”。

### Chart 2：无股息欧式看涨期权价格上下限示意

通过。points 正确：上限 c=S0；下限 max(S0-PV(K),0)，PV(K)=45，x=45 处为拐点。metadata 统一为欧式看涨 c，并明确下一张图单独展示看跌边界。

### Chart 3：无股息欧式看跌期权价格上下限示意

通过。points 正确：上限 p=PV(K)=45 为水平线；下限 max(PV(K)-S0,0) 在 x=0 时为45、x=25 时为20、x=45 后为0。title、description、curve name、keyTakeaways 与看涨边界图成组对应。

## 6. Example_box Audit

3 个 example_box 均通过。

- 例子 1：c=3, S0=20, K=18, T=1, r=10%，下限 20-18e^{-0.1}=3.71，市场价低估，套利方向正确。
- 例子 2：p=1, S0=37, K=40, T=0.5, r=5%，下限 40e^{-0.025}-37=2.01，市场价低估，套利方向正确。
- 例子 3：c=3, p=2.25, S0=31, K=30, T=0.25, r=10%，左边约 32.26，右边 33.25，卖出贵组合、买入便宜组合，结论正确。

sourceType/sourceNote 均存在，说明面向学习者，没有 source/chunk/generated/JSON/filePath 等工程词。例题参数与 chart 参数不同，但例题是独立套利计算题，chart 是标准化示意图；不存在需要强制共享参数的误导。例题也未宣称为 PPT 原题，只称教学常见参数/教材习题参数特征。

## 7. PPT / Visual Coverage Findings

PPT 关键内容已覆盖：

- p1-p5：六因素、假设、符号，已由六因素 node + comparison_table + data_table 覆盖。
- p6：上限公式 \(c\le S_0\)、\(C\le S_0\)、\(P\le K\)、\(p\le Ke^{-rT}\)，已由上限公式卡覆盖。
- p7-p10：无股息欧式看涨/看跌下限与两个例题，已由下限 node、公式卡、example_box 1/2 覆盖。
- p11-p12：无股息看跌看涨平价与套利例题，已由平价 node、公式卡、example_box 3 覆盖。
- p13-p14：公司资本结构解释平价，已由“公司资本结构视角下的平价” child 覆盖。
- p15-p20：美式期权上下界、无股息美式看涨不提前行权、美式看跌提前行权与边界图，已由提前行权 node、综合 node、comparison_table、看涨/看跌边界 chart 覆盖。
- p21-p22：有股息欧式看涨/看跌下限，已新增“含股息欧式期权上下限（P1）”公式卡。
- p23-p24：含股息平价与美式含股息关系，已由含股息平价公式卡、股息 node、提前行权 node 覆盖。

强视觉对象方面，PPT 中看涨/看跌边界均已有结构化 visualBlock 替代，未发现关键图示未接入且未说明原因的情况。

## 8. Web Presentation Risk

通过。

- 未发现 source / chunk / generated / JSON / node id / fallback / filePath 等工程词暴露给学习者。
- visualBlock 类型均为已有类型：comparison_table、formula_card、process_flow、data_table、curve_chart、example_box。
- 三个 curve_chart 均有 points，未发现空 chart。
- 本章未使用 image 路径，因此不存在图片路径失效风险。
- children 长度适中，未发现短 bullet 化段落，也未发现超长堆砌到不可读的段落。

## 9. Final Self-Check

1. 是否存在正文完整但 formula_card / chart / example_box 不完整？否。
2. 是否存在 chart points 正确但 metadata 缺项？否。
3. 是否存在 example_box 参数与图表参数不同但未显式脱钩？否。例题未绑定图表参数，chart 明确为标准化示意。
4. 是否存在 LaTeX 在 JSON 中未正确转义，尤其是 e^{-rT} 的 \r 问题？否。raw CR count 为 0；e^{-rT} 不含反斜杠 r。
5. 是否存在工程词暴露给学习者？否。
6. 是否所有看涨/看跌、欧式/美式、上限/下限、无股息/有股息关系都成组处理？是。
7. 是否所有公式都说明适用条件？是。公式卡 usage/pitfalls 和正文均说明欧式/美式、无股息/有股息、提前行权限制。
8. 是否存在 PPT 关键图示未接入且未说明原因？否。

## 10. Remaining Risks

无阻断风险。validate:content 可能仍对公式字段中的 max(...) 片段给启发式 warning，但 JSON 可解析、公式可读、渲染风险可控。

## 11. Final Status

polished
