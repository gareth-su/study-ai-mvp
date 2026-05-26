# Teaching Sequence Global Audit

## Scope

- 审计课程：
  - `data/generated/ysjrgj/full/framework-detailed.json`
  - `data/generated/gdsyzq/full/framework-detailed.json`
- 审计目标：检查强视觉对象位置正确性、教学依赖顺序、`formula_card` 与 `example_box` 边界、补充材料是否吞掉主线内容、自然语言公式、松散 LaTeX。
- 本轮未修改任何课程正文 JSON、前端代码、schema、loader 或 source materials。

## Issue Distribution

| Course | Chapters Checked | Issues | P0 | P1 | P2 | P3 | Main Patterns |
|---|---:|---:|---:|---:|---:|---:|---|
| ysjrgj | 9 | 14 | 0 | 9 | 5 | 0 | 流程图过早、公式卡疑似例题、自然语言公式、payoff/策略链条分离 |
| gdsyzq | 8 | 14 | 1 | 9 | 4 | 0 | 自然语言公式、现金流/曲线图位置、强视觉对象缺位或未形成学习链条 |
| Total | 17 | 28 | 1 | 18 | 9 | 0 | 教学依赖顺序与 visualBlock 建模边界仍需强化 |

## Systemic Findings

### 1. 强视觉对象“进入正文但位置错误”是系统性风险

目前内容生成已经能识别不少图表、流程、现金流图和 payoff 图，但仍可能只做到“有这个 block”，没有进一步判断它是否位于正确学习位置。典型表现是：

- 先讲公式、流程或抽象符号，后放关键图示。
- 流程图被放在模块开头，但它实际是方法总结。
- 图示说明与图像或图表脱节。

这类问题不能单靠字段存在性校验发现，需要章节级人工审计或更强的生成后结构检查。

### 2. `formula_card` 误承载例题功能是系统性问题

两门课都存在公式卡可能承载例题、校准或求解链的情况。尤其当公式标题或上下文出现“求、已知、校准、市场价格、反推、计算、节点”等信号时，应优先判断是否应建模为 `example_box`。

自动化可初步扫描标题、公式和 explanation 中的关键词，但是否改为例题仍需结合 PPT 条件、表格和相邻页人工判断。

### 3. 自然语言公式字段仍较常见

`formula` 字段中出现英文自然语言或文字混排，是两门课共同问题。它既影响渲染，也说明内容建模边界不清。可通过自动检查较稳定地发现，例如：

- `value = average PV across paths`
- `expected loss = PD × ...`
- `Coupon = Face value × ...`
- `Vswap = ... 或 ...`

建议后续增强 `validate-generated-content.ts`：如果 `formula` 字段包含大量英文词、中文连接词或 “或 / equals / average / price / value” 这类自然语言，应输出 warning 或 error。

### 4. visualBlocks 按类型堆叠仍然存在

ysjrgj 的期货、远期、互换、期权策略章节较容易出现“先流程，再公式，再图”的顺序，而不是按照知识点链条组织。gdsyzq 的债券定价、收益率、风险章节则更容易出现“先公式，后现金流/曲线图”的顺序。

P0/P1/P2/P3 分层对取舍有帮助，但还没有完全解决“模块内部学习顺序”。需要把分层和教学依赖排序同时纳入生成标准。

### 5. 补充材料吞主线内容目前不是最严重问题，但需继续防范

本轮没有发现大量 P0/P1 被明确放入补充材料的情况，但发现了“强视觉对象可能位置靠后或未绑定对应解释”的现象。强视觉对象如果只是出现在正文底部，教学效果接近被补充材料吞掉，应按同类问题处理。

## Individual vs. Systemic

| Pattern | Systemic or Local | Evidence | Recommended Handling |
|---|---|---|---|
| 强视觉对象位置错误 | Systemic | 两门课均有“图示/曲线/现金流图晚于公式或流程”的候选。 | 写入标准；后续逐章修复。 |
| formula_card 误分类 | Systemic | 收益率、自展法、远期定价、保证金盯市、基差风险等均有候选。 | 增加关键词扫描 + 人工审计。 |
| 自然语言公式 | Systemic | gdsyzq 多章、ysjrgj 互换/期权章节均出现。 | 建议自动校验。 |
| 利率树图示缺位 | Local but high severity | gdsyzq 第 5 章已暴露并局部修复。 | 用作标准样例，推广“强视觉对象审计”。 |
| 收益率曲线风险图示链条缺失 | Local high severity | gdsyzq 第 8 章 audit 显示 A 类视觉对象。 | 下一轮 P0 修复。 |

## Checklist Recommendation

建议新增到每章生成后人工 checklist：

1. A 类强视觉对象是否出现在解释它的模块中，而不是章节底部、补充材料或资源索引。
2. 首次抽象解释前是否已有必要图示、结构图、现金流图或曲线图。
3. 图示说明是否紧贴对应图示。
4. 流程图是前置认知图还是后置总结图；位置是否匹配。
5. 公式卡是否只是定义性公式；若承担求解过程，是否已改为例题。
6. 例题是否包含已知条件、问题目标、步骤、结果和易错点。
7. 同一知识链条中的图示、公式、例题、复习提示是否被拆散。
8. 补充材料中是否出现 P0/P1 主线内容。
9. `formula` 字段是否只包含数学表达式。
10. 普通文本数学变量是否使用 `\( ... \)`。

## Automation Recommendation

### 可自动化检查

- `formula` 字段自然语言检测：英文词密度、中文连接词、`equals`、`average`、`price`、`value`、`or/或` 等。
- 半 LaTeX 检测：普通文本中出现 `(S_T)`、`(sigma=...)`、`(e^{2sigma})` 等。
- 图表型 visualBlock 数据点检查：`line_chart`、`curve_chart`、`payoff_chart` 是否有可绘制点。
- 模块首个 visualBlock 是否为 `process_flow`，并提示人工复核是否过早。
- image/chart_explanation 是否相邻或标题高度相似。

### 需要人工审计

- 某个 visualBlock 是否是 A 类强视觉对象。
- 图示是否应位于首次抽象解释之前。
- 某个公式是否实际属于完整例题。
- 流程图是“前置认知图”还是“后置总结图”。
- PPT 中相邻页是否共同构成完整题目链。

## Fix Priority

| Priority | Next Fix |
|---|---|
| P0 | gdsyzq 第 8 章收益率曲线风险强视觉对象链条。 |
| P1 | gdsyzq 第 3 章收益率公式/自展法例题边界；第 4 章现金流图与公式顺序；第 6-8 章自然语言公式。 |
| P1 | ysjrgj 第 2、3、5、7、10、12 章流程图/现金流图/payoff 图位置与公式字段。 |
| P2 | 两门课半 LaTeX、背景图表说明归属、疑似例题公式卡复核。 |

本轮只输出审计报告，不执行正文修复。
