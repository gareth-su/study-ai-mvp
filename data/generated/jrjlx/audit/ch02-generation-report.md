# jrjlx 第二讲《工具变量》生成报告

## 1. 第一章只读核查结论

- 已只读检查 `data/generated/jrjlx/full/framework-detailed.json`：JSON 可解析，未发现错误课程 ID、草稿图片占位符或缺失的 ch01 图片路径。
- 第一章图片目录 `public/generated-assets/jrjlx/ch01/` 存在，JSON 中引用的 ch01 图片均可在 public 下找到。
- 第一章当前 chapter 对象没有显式 `chapterId` 字段，属于既有结构；本轮未修改第一章。
- 第一章 JSON 正文仍存在若干历史“模块 0x”文字，但不是阻断第二章生成的 P0 问题；本轮按要求不改第一章。

## 2. 第二章资料清点结果

| 文件 | 类型 | 读取结果 | 内容作用 |
|---|---|---|---|
| 讲义2.pdf | PDF，90 页 | 已读取文本抽取样本和页码主题 | 内生性、IV、TSLS、一般 IV、工具有效性、香烟需求、寻找工具变量 |
| ch12_cig.do | Stata do | 已读取完整命令 | 导入 Excel、生成变量、运行手动两阶段、ivreg、第一阶段 F、J 检验、ivregress、ivreghdfe |
| ch12_cig.log | Stata log | 已读取完整输出 | 所有确定回归数值的主要来源 |
| ch12_cig.xlsx | Excel | 已读取 Sheet1，97 行含表头、9 列 | 48 州 × 1985/1995，香烟需求数据 |
| cigarette.pdf | PDF，1 页 | 已读取文本 | 数据定义：消费量、价格、收入、销售税、香烟税、CPI 调整 |
| Table 12.1.PNG | 图片 | 已查看原图并复制到 public | Table 12.1 复现目标 |

## 3. 讲义页码到主题映射

- 页 1-3：课程标题与大纲。
- 页 4-12：内生性、OLS 外生性条件、OLS 不一致、内生性四类原因。
- 页 14-20：一个 X 和一个 Z 的 IV 直觉、有效工具变量条件、TSLS 与协方差公式。
- 页 21-29：黄油供需、降雨工具变量、地震与班级规模案例。
- 页 30-37：TSLS 推断、第二阶段标准误错误、香烟需求 1995 横截面示例。
- 页 39-49：一般 IV 模型，X/W/Z 分工，m/k/r，恰好识别、过度识别、不可识别。
- 页 51-64：工具变量有效性，第一阶段 F、弱工具变量、J 检验。
- 页 66-77：香烟需求应用、10 年变化、Table 12.1、第一阶段 F、J 检验解释。
- 页 79-86：寻找工具变量案例：心脏导管、教会慈善、学校竞争等。
- 页 88-90：本章总结。

## 4. do/log/Table 12.1 映射结果

| 表格/任务 | do 命令 | log 输出 | 表格映射 | 追溯状态 |
|---|---|---|---|---|
| 1995 一工具 IV | `ivreg lpackpc (lravgprs = rtaxso) if year==1995, r` | lravgprs = -1.083587, SE = .3189186 | 非 Table 12.1，教学示例 | 完整追溯 |
| 1995 一般 IV，一工具 | `ivreg lpackpc lperinc (lravgprs = rtaxso) if year==1995, r` | lravgprs = -1.143375, SE = .3723028 | 讲义页 47 示例 | 完整追溯 |
| 1995 一般 IV，两个工具 | `ivreg lpackpc lperinc (lravgprs = rtaxso rtax) if year==1995, r` | lravgprs = -1.277424, SE = .24961 | 讲义页 47 示例 | 完整追溯 |
| Table 12.1 列 (1) | `ivreg dlpackpc dlperinc (dlavgprs = drtaxso), r` | dlavgprs = -.9380144, SE = .2075023；F=33.67 | 表中 -0.94 (0.21)，F=33.7 | 完整追溯 |
| Table 12.1 列 (2) | 现有 do/log 未包含单独 `drtax` 工具命令 | 未找到 | 表图显示 -1.34 (0.23)，F=107.2 | 待补充核查 |
| Table 12.1 列 (3) | `ivreg dlpackpc dlperinc (dlavgprs = drtaxso drtax), r` | dlavgprs = -1.202404, SE = .1969434；F=88.62；J=4.9319826, p=.02636405 | 表中 -1.20 (0.20)，J=4.93 (0.026) | 完整追溯 |

重要待核查：ch12_cig.log 中 Table 12.1 列 (1)/(3) 对应命令的 `_cons` 与 Table 12.1.PNG 截距行不一致。本轮没有强行改写，已在 regression_table notes 中标注。

## 5. 生成内容结构

已在 `framework-detailed.json` 中新增第二章 12 个学习节点，覆盖：导读、文件、内生性、IV 直觉、TSLS、香烟数据、do/log 复现、一般 IV、第一阶段 F 与 J 检验、Table 12.1、寻找工具变量、本章整合。

## 6. 新增图片/visualBlocks

新增图片资源位于 `public/generated-assets/jrjlx/ch02/`：`cigarette-file-map.svg`、`iv-causal-chain.svg`、`butter-supply-demand-iv.svg`、`tsls-two-stage-flow.svg`、`instrument-validity-flow.svg`、`table-12-1-mapping.svg`、`table-12-1.png`。

主要 visualBlocks 类型：callout_teacher_note、process_flow、image、comparison_table、formula_card、exam_task、case_card、stata_code_block、dataset_schema、stata_output_block、regression_table、table_mapping_block、common_stata_error、interpretation_checklist。

## 7. 无法确认或待人工核查项

- Table 12.1 第 (2) 列没有在现有 ch12_cig.do/ch12_cig.log 中找到对应单独 `drtax` 工具命令和输出。当前只将其标为来自 Table 12.1.PNG，不伪装成 log 可追溯。
- Table 12.1.PNG 的截距行与 ch12_cig.log 对应命令的 `_cons` 输出不一致。可能是教材表版本、命令设定或变量定义差异，需人工核查。
- 讲义中供需曲线图未直接裁切；本轮生成的是教学示意 SVG，不是原始课件图。
- `ivreghdfe` 输出保留为扩展说明，没有作为 Table 12.1 主复现依据。

## 8. 风险评估

- P0：暂无阻断上线的 JSON 或资源路径问题，待验证命令进一步确认。
- P1：Table 12.1 第 (2) 列缺 do/log 追溯；Table 12.1 截距与 log 不一致，需要人工核查。
- P2：教学示意图为 SVG，不是从讲义原图裁切；后续如需更贴近课件，可补原图裁切。

## 9. 验证记录

- `npm.cmd run validate:content`：通过。脚本报告 Generated content validation passed；jrjlx/full detailed chapters = 2。存在若干内容质量 warning，主要是校验器对 Stata 命令括号、输出文本、既有 ch01/concise 的公式启发式提示，不构成 schema 阻断。
- `npm.cmd run lint`：通过。
- `npm.cmd run build`：通过。Prisma Client 生成成功，Next.js 生产构建成功，未出现 Windows Prisma DLL EPERM/rename 问题。


## 10. 网页端零基础体验审查后的定向修复

修复来源：CC 对 jrjlx 第二讲网页端进行只读零基础体验审查，综合分 84/100。审查认为核心链路“内生性 → 工具变量条件 → TSLS → Stata 命令 → log 输出 → Table 12.1 → 考试表达”已经成立，本轮不重写结构，只做降低误读风险的小范围定向修复。

本轮修复项：

1. 在 Table 12.1 复现实验前新增“Table 12.1 复现状态总览”提示卡，明确第 (1) 列和第 (3) 列已由 ch12_cig.log 复现，第 (2) 列仅来自教材图片，截距待人工核查。
2. 强化 Table 12.1 第 (2) 列标识：在 regression_table 和 table_mapping_block 中统一写为“未由本地 do/log 复现”“仅来自教材图片”“不可作为本页已复现结果”。
3. 强化截距不一致提示：新增“Table 12.1 截距行暂不作为重点解释对象”提示卡，并在结构化表 notes 中说明价格弹性主结果可追溯，截距暂不作为本章重点解释对象。
4. 在 Stata 输出区新增阅读提示：普通 IV 输出先看 Coef.、Robust Std. Err.、P>|t|、Instrumented、Instruments；第一阶段回归先看工具变量系数、显著性和第一阶段 F；过度识别检验先看 J 或相关统计量与 p-value。
5. 更新黄油供需 / IV 直觉图图注，明确该图是教学示意图，用于解释供给移动识别需求，不是讲义原图裁切。
6. 在第一阶段 F 之前新增过渡提示：后续第一阶段 F 服务于 Table 12.1 的 10 年变化模型，不是前面 1995 年横截面练习的同一条回归。

可选轻量优化：已在关键节点中补充术语括注：relevance（工具变量相关性）、exogeneity（工具变量外生性）、weak instrument（弱工具变量）、overidentification（过度识别）、J test（过度识别限制检验）。

未修复或仍需人工核查项：

- Table 12.1 第 (2) 列仍未在本地 ch12_cig.do / ch12_cig.log 中找到单独以 drtax 为唯一工具的输出，继续保留为“仅来自教材图片”。
- Table 12.1 截距行仍与当前 log 对应命令输出不一致。本轮没有编造原因，也没有强行修正截距数字。
- 本轮没有新增图片；供需图仍为教学示意图，不是讲义原图裁切。

风险说明：Table 12.1 第 (2) 列与截距问题属于可上线但需人工核查的 P1 风险；主线价格弹性、标准误、第一阶段 F、J 检验仍按可追溯 log 和教材图片边界呈现。
