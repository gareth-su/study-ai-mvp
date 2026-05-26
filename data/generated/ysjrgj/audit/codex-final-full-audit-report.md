# ysjrgj 最终全盘审计报告

审计日期：2026-05-15  
课程：ysjrgj（衍生金融工具）  
范围：ch01、ch02、ch03、ch04、ch05、ch07、ch10、ch11、ch12。源材料无 ch06，本轮未处理未列章节。

## 1. 审计范围与读取材料

读取材料：
- `source-materials/ysjrgj/*.pdf`
- `source-materials/ysjrgj/.renders/**`
- `data/generated/ysjrgj/full/framework-detailed.json`
- `data/generated/ysjrgj/audit/**`
- `src/lib/ai/framework-schema.ts`
- `src/components/framework/VisualBlockRenderer.tsx`
- `scripts/validate-generated-content.ts`

未引入外部资料；未读取或修改原始 PDF/PPT；未修改 gdsyzq、concise、src、Prisma、package/lockfile 或导入脚本。

## 2. 变更范围审计

工作区在本轮开始前已存在多处 dirty/untracked 文件，包含禁改范围风险：
- `data/generated/gdsyzq/**` 存在已修改与大量未跟踪审计文件；
- `docs/content-generation-standard.md`、`scripts/validate-generated-content.ts`、多个 `src/app/**` 与 `src/components/framework/**` 文件已处于修改状态；
- `public/generated-assets/` 已有未跟踪内容。

本轮未修改上述禁改文件，也未回滚这些预存变更。`framework-detailed.json` 可解析，listed chapters 数量为 9；未发现不支持的 block type、缺失图片路径、formula_card 缺 priority、自然语言 formula、example_box/case_card 缺 sourceType/sourceNote。未发现新增图片路径但文件不存在的问题。本轮新增最终审计报告与状态文件。

## 3. Renders 覆盖情况

| 章节 | PDF 页数 | renders 数量 | 结论 |
|---|---:|---:|---|
| ch01 导言 | 33 | 33 | 匹配 |
| ch02 期货市场的运作机制 | 21 | 21 | 匹配，目录为 `.renders/ch02` |
| ch03 利用期货的对冲策略 | 30 | 30 | 匹配 |
| ch04 利率 | 40 | 40 | 匹配 |
| ch05 确定远期和期货价格 | 54 | 54 | 匹配 |
| ch07 互换 | 41 | 41 | 匹配 |
| ch10 期权市场机制 | 20 | 20 | 匹配 |
| ch11 股票期权的性质 | 24 | 24 | 匹配 |
| ch12 期权交易策略 | 23 | 23 | 匹配 |

不需要补 render。

## 4. Schema / Renderer 兼容审计

已按 schema 与 renderer 支持范围检查全部 listed chapters。使用的 block type 均在支持范围内：`process_flow`、`comparison_table`、`formula_card`、`concept_map`、`image`、`case_card`、`data_table`、`example_box`、`chart_explanation`、`payoff_chart`、`line_chart`、`curve_chart`、`cashflow_diagram`、`decision_tree`、`timeline`。

结论：
- JSON 可解析；
- 未发现前端不支持的新 block type；
- 未发现引用不存在的 ysjrgj 图片；
- 未发现 Markdown 表格被塞入 data_table/comparison_table 单元导致结构损坏；
- 未发现长正文塞入 title 的 P0/P1；
- 未发现 formula_card 的 formula 字段为自然语言解释；
- KaTeX 检查未发现 formulaLatex 语法错误；
- sourceType/sourceNote 与 priority 已满足当前审计所需。

## 5. 逐章审计结论

### ch01 导言

Source coverage：已逐页核对 PDF/renders。市场规模趋势、远期 bid/ask、黄金远期定价与套利、期货/期权/互换入门、交易者类型、Lehman/新闻背景均有对应正文或结构化覆盖。  
Learning path：从衍生品定义、四类合约、市场机制、远期例题到交易者角色，已不是短提纲。  
Examples：黄金远期例题包含条件、公式、代入、结果和套利解释。Lehman 案例用于风险背景，sourceNote 已明确。  
Tables：四类合约对比、交易所/市场表格有服务对象与解释。  
Formulas：远期价格、payoff、基础合约方向未发现错误。  
Visual coverage：市场规模趋势图以 line_chart 结构化替代；远期/期权 payoff 与市场截图被合理筛选，未机械加入低价值图。  
Source fidelity：未发现材料外编造关键数值。  
Integration：图表、案例与正文相互引用，结论能服务章节导入。

状态：ACCEPTED_WITH_RISKS。风险为趋势图采用结构化示意而非原图截图，人工验收可按展示偏好复核。

### ch02 期货市场的运作机制

Source coverage：已逐页核对。期货合约、现货/期货收敛、保证金、每日盯市、追加保证金、报价、交割、CCP、订单与监管均有覆盖。  
Learning path：合约标准化、保证金流程、清算机制与交易生命周期顺序清楚。  
Examples：每日盯市例题包含条件、逐日计算、追加保证金判断与结论。  
Tables：合约标准化表、保证金表、报价/制度表与正文绑定。  
Formulas：多头/空头盈亏方向、保证金参数未发现反向错误。  
Visual coverage：CCP 与保证金现金流已用 process_flow/cashflow_diagram 等价表达。  
Source fidelity：未发现材料外关键数值。  
Integration：保证金表与例题链完整，流程图被正文解释。

状态：ACCEPTED_WITH_RISKS。风险为 ch02 render 目录命名为 `.renders/ch02`，但数量匹配且可读。

### ch03 利用期货的对冲策略

Source coverage：已逐页核对。铜采购、基差风险、合约选择、最小方差对冲比率、尾随对冲、日元空头对冲、股指 beta 调整、滚动对冲均覆盖。  
Learning path：从对冲目标、基差、对冲比率、合约数量到股指/滚动对冲，学习链完整。  
Examples：铜采购、日元空头、航空燃油、尾随对冲、股指期货例题均含条件、方法、代入、结果和解释。尾随对冲包含 `V_A=3,880,000`、`V_F=83,580`、`h_hat=0.75`、`N≈35`。  
Tables：基差/对冲策略比较表与例题和正文连接。  
Formulas：`h^*=rho sigma_S/sigma_F`、`N^*=h^*Q_A/Q_F`、`b=S-F`、`N^*=beta V_A/V_F` 方向与含义正确。  
Visual coverage：Figure 3-2 回归散点图以 curve_chart/解释等价表达；基差图与对冲流程覆盖。  
Source fidelity：未发现材料外编造关键数值。  
Integration：公式、图示和例题链条完整。

状态：ACCEPTED_WITH_RISKS。风险为 Figure 3-2 使用结构化替代而非图片裁切。

### ch04 利率

Source coverage：已逐页核对。利率口径、复利换算、零息剥离、远期利率、FRA、久期/凸性、期限结构与流动性案例均覆盖。  
Learning path：从利率定义到贴现、零息曲线、远期利率和风险度量，路径清楚。  
Examples：零息剥离与 FRA 例题包含条件、公式、代入和结果。  
Tables：零息剥离表与例题/正文绑定，不再孤立。  
Formulas：复利、远期利率、FRA、久期/凸性公式链完整；已修复零息剥离步骤中 JSON 转义导致的 `times/approx` 阅读问题。  
Visual coverage：零息曲线、期限结构、久期/凸性图用结构化曲线和公式说明覆盖。  
Source fidelity：未发现材料外编造关键数值。  
Integration：数据表、公式卡和例题相互连接。

状态：ACCEPTED_WITH_RISKS。风险为校验器仍提示少量 inline math 包裹建议，但不影响 validate/build。

### ch05 确定远期和期货价格

Source coverage：已逐页核对。卖空机制、无收益资产、已知现金收益、已知收益率、远期合约价值、远期/期货差异、股指、货币、商品与持有成本均覆盖。  
Learning path：从无套利定价到各资产类型扩展，再到合约价值与预期价格，逻辑完整。  
Examples：无中间收入股票远期套利包含 `S0=40`、`r=5%`、`T=0.25` 及现金流方向；其他资产类型有公式和解释。  
Tables：套利现金流表与例题绑定，不孤立。  
Formulas：`e^{(r-q)T}`、`e^{(r-r_f)T}`、`e^{(r+u-y)T}` 检查通过；`F0` 与远期合约价值 `f` 未混淆。  
Visual coverage：图 5-2 套利现金流方向以 cashflow_diagram/table 结构化覆盖；持有成本分解覆盖。  
Source fidelity：未发现材料外编造关键数值。  
Integration：公式、表格和例题互相指向。

状态：ACCEPTED_WITH_RISKS。风险为现金流图使用结构化替代而非原图裁切。

### ch07 互换

Source coverage：已逐页核对。Apple & Flower、相对优势、互换现金流、互换估值、货币互换、信用风险和其他互换均覆盖。  
Learning path：从互换定义、现金流交换、比较优势到估值与风险，层次完整。  
Examples：AAA/BBB 相对优势例题包含 `4.0%`、`LIBOR-0.1%`、`5.2%`、`LIBOR+0.6%`、`1.2%`、`0.7%`、`0.5%`；Apple & Flower 与现金流图绑定。  
Tables：相对优势利率表不孤立，表后有收益空间解释。  
Formulas：浮动利息公式规范；`V_swap = B_float - B_fixed` 的方向已解释。  
Visual coverage：现金流与货币互换本金/利息交换以 cashflow_diagram 结构化覆盖。  
Source fidelity：未发现材料外编造关键数值。  
Integration：表格、案例、现金流图与估值公式连接。

状态：ACCEPTED_WITH_RISKS。风险为部分 cashflow 图为结构化重绘而非原图裁切。

### ch10 期权市场机制

Source coverage：已逐页核对。call/put、执行价格、权利金、盈亏平衡点、交易/保证金/OCC/税务/ESO/可转债与中国市场均覆盖。  
Learning path：先建立期权术语，再进入交易机制与保证金，路径自然。  
Examples：裸露看涨期权保证金例题含条件、规则、代入和结果，sourceNote 已明确对应第16页。  
Tables：交易机制、术语和保证金表与正文绑定。  
Formulas：多头/空头 call/put payoff 方向未发现反向。  
Visual coverage：基本 payoff 图用 payoff_chart 覆盖，盈亏平衡点与最大损失/收益明确。  
Source fidelity：未发现材料外编造关键数值。  
Integration：期权术语、图示和保证金例题衔接完整。

状态：ACCEPTED_WITH_RISKS。风险为部分基础 payoff 为结构化图。

### ch11 股票期权的性质

Source coverage：已逐页核对。价格影响因素、上下界、put-call parity、提前行权、股息影响与价值曲线均覆盖。  
Learning path：从价格因素到边界，再到平价与提前行权，推导链完整。  
Examples：上下界和平价套利例题包含条件、公式、代入、结论。  
Tables：影响因素与边界关系表服务概念理解。  
Formulas：欧式/美式、看涨/看跌、实值/虚值/平值方向未发现混淆；put-call parity 方向正确。  
Visual coverage：上下界和价值曲线以 curve_chart/chart_explanation 覆盖。  
Source fidelity：未发现材料外编造关键数值。  
Integration：公式、曲线、例题和提前行权结论相互连接。

状态：ACCEPTED_WITH_RISKS。风险为校验器对 max 表达式给出 inline math 警告，但 KaTeX 检查通过且不阻断渲染。

### ch12 期权交易策略

Source coverage：已逐页核对。保本债券、covered call、protective put、bull/bear spread、box、butterfly、calendar、straddle、strip/strap、strangle 与 spike payoff 均覆盖。  
Learning path：从单期权+股票组合到差价、组合波动策略，再到权重型策略，结构完整。  
Examples：保本债券、牛市差价、保护性看跌、蝶式、跨式/宽跨式例题均包含条件、构造、代入、结果和解释；标准化复习例题已在 sourceNote 明确不是 PPT 原表逐字例题。  
Tables：策略比较表和 payoff 表与对应策略绑定。  
Formulas：covered call、protective put、bull/bear、butterfly、straddle/strangle、strip/strap 方向与权重未发现错误。  
Visual coverage：每类关键策略均有 payoff_chart/curve_chart 或等价结构覆盖，拐点、盈亏平衡点、最大收益/损失与市场预期清楚。  
Source fidelity：未发现未标注的材料外关键数值。  
Integration：策略图、公式、例题和市场预期相互连接。

状态：ACCEPTED_WITH_RISKS。风险为部分复习例题参数为标准化承接参数，已明示来源性质，人工验收可决定是否保留。

## 6. Confirmed P0/P1 与实际修复

Confirmed P0：未发现仍需修复的 P0。

Confirmed P1 已修复：
- ch01：案例 sourceType/sourceNote/priority 已补齐；
- ch04：案例 sourceType/sourceNote/priority 已补齐；
- ch04：零息剥离步骤中 JSON 转义导致的 `\times` 制表符与 `approx` 显示问题已改为可读数学文本；
- ch10：裸露看涨期权保证金例题 sourceType/sourceNote/priority 已补齐；
- ch12：保本债券与多组策略复习例题 sourceType/sourceNote 已补齐，并明确标准化例题性质。

未修原因：
- ysjrgj concise 存在校验器警告，但该文件在本轮禁改范围内；
- gdsyzq 相关警告与 dirty 文件属于冻结/禁改范围；
- ysjrgj detailed 剩余 inline math 警告未构成渲染失败或理解 P1，未做风格性大改。

## 7. DeepSeek Issue Regression Check

- 孤立 data_table：未发现 confirmed P0/P1；表格均有上下文或例题绑定。
- 断链 example_box：未发现 confirmed P0/P1；关键例题均含条件、方法、代入、结果、解释。
- 自然语言 formula：未发现。
- LaTeX 括号错误：KaTeX 检查通过；validate 仅有非阻断 inline math 警告。
- formula_card 缺 priority：未发现。
- sourceType/sourceNote 缺失：未发现。
- visualBlock 脱节：未发现 confirmed P0/P1。
- payoff/cashflow/long-short 方向错误：未发现。
- 新增图片路径不存在：未发现；本轮未新增 ysjrgj 图片。
- 疑似材料外编造：未发现未标注的关键数值；ch12 标准化复习例题已明示不是 PPT 原表逐字例题。
- 误改范围：工作区存在本轮前预存的禁改范围 dirty/untracked 文件；本轮未修改。

## 8. Validation

- `npm run validate:content`：PowerShell 的 `npm.ps1` 入口被执行策略阻止；随后用等价的 `npm.cmd run validate:content` 运行，通过。仍有内容质量警告，未阻断。
- `npm run lint`：用 `npm.cmd run lint` 运行，通过。
- `npm run build`：用 `npm.cmd run build` 运行，通过，Prisma generate 与 Next build 均成功。

## 9. Remaining Risks

- 工作区存在预存禁改范围变更，需在最终交付前由项目负责人确认来源与是否纳入其他任务。
- 多个关键视觉对象采用结构化替代表达，而非局部裁切原图；教学等价性通过本轮审计，但人工验收可按视觉忠实度偏好复核。
- validate 对 ysjrgj detailed/ch11 max 表达式与 ch04少量 inline math 给出非阻断警告；不影响当前校验和构建。

## 10. 对 polished_by_deepseek 的最终判断

polished_by_deepseek 后的 ysjrgj full detailed 内容总体已达到人工验收入口条件。全盘核查未发现残留 P0；已确认并修复本轮发现的 P1 小问题。考虑到工作区存在预存禁改范围变更、部分图示采用结构化替代且仍有非阻断内容警告，最终建议状态为：ACCEPTED_WITH_RISKS。
