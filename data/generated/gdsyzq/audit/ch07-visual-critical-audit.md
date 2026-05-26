# 第 7 章强视觉对象审计

审计日期：2026-05-13
来源文件：`source-materials/gdsyzq/7.债券定价 (四)(3).pptx`

## 1. 审计结论

- 识别图表、表格、结构关系和外部链接视觉对象 10 个。
- A 类 0 个：本章没有像利率树主图那样必须用图片/空间图才能理解的对象。
- B 类 8 个。其中 slides 14 和 16 的矩阵型例题输入数据表（Table 12-2 / Table 12-3）已按 Section 7.1 原则提取为 image visualBlock 接入正文；其余继续用结构化 visualBlock 或 data_table 表达。
- C 类 4 个：外部阅读链接、泛市场讨论页，不进入网页正文。
- 本轮新增 2 个 image visualBlock，来自 PPT 内嵌图片对象，不是整页 PPT 截图。

## 2. 强视觉对象审计表

| PPT 页 | 视觉对象 | 类型 | 分级 A/B/C | 当前网页表达 | 是否需要图片/visualBlock | 处理结果 | 理由 |
|---|---|---|---|---|---|---|---|
| 4 | 二叉树估值回顾图 | 回顾图 | B | 文字提及（估值方法总览） | 不需要图片 | 仅回顾性引用 | 不是本章新知识，文字回顾即可。 |
| 5 | MBS 分层结构概念图 | 结构关系 | B | cashflow_diagram + process_flow | 不需要图片 | 已结构化 | 现金流图和流程图充分表达证券化结构。 |
| 10 | 路径依赖机制图 | 概念图 | B | chart_explanation | 不需要图片 | 已结构化 | chart_explanation 说明路径依赖，比截图更清晰。 |
| 13–16 | 利率路径/再融资率/现金流表格 | 例题输入数据表（矩阵型） | B → B+ | example_box + image + data_table | slide 14/16 需 image | 已接入 2 张 image | slides 14、16 为多路径×多期矩阵表，data_table 文本渲染无法传达规模感和路径并列直观。按 Section 7.1 原则提取为 image。 |
| 19 | 路径 PV 公式页 | 公式 + 截图 | B | formula_card | 不需要图片 | 已结构化 | 公式已用 formula_card 表达；整页截图过大不适合裁切。 |
| 26 | OAS 补偿含义图 | 机制图 | B | formula_card | 不需要图片 | 已结构化 | formula_card 表达 OAS=Z-spread−期权成本 已足够。 |
| 28–29 | ABS 估值方法对照 | 对照表 | B | comparison_table + data_table | 不需要图片 | 已结构化 | 两张对照表充分表达情形选择。 |
| 6 | 外部阅读链接图标 | 链接 | C | audit-only | 不需要 | audit-only | — |
| 7 | 外部阅读链接图标 | 链接 | C | audit-only | 不需要 | audit-only | — |
| 21 | 微信读书链接 | 链接 + 封面图 | C | audit-only | 不需要 | audit-only | — |

## 3. 已接入图片审计表

| PPT 页 | 源图片对象 | PPT 位置与尺寸（EMU） | 输出路径 | 所在模块 / 标题 | 教学价值与优先级 | 版权风险与部署判断 | 后续批量采用建议 |
|---:|---|---|---|---|---|---|---|
| 14 | `ppt/media/image16.png` | off=(700788,2521758), ext=(8372475,4171950) | `/generated-assets/gdsyzq/ch07/refinancing-rate-paths.png` | Monte Carlo 估值流程 / 配套表格：模拟再融资率路径（Table 12-2） | P0；展示多条路径下各月再融资率的矩阵表，学生可直观看到"每条路径的再融资率不同"——这是理解 Monte Carlo 输入规模的关键。 | 来源为课件内嵌教学表，局部使用；适合课程复习页。 | 可作为"例题输入数据表提取为 image"的采用样例。 |
| 16 | `ppt/media/image17.png` | off=(611560,2343973), ext=(8162925,3857625) | `/generated-assets/gdsyzq/ch07/cashflow-matrix.png` | Monte Carlo 估值流程 / 配套表格：每期现金流路径矩阵（Table 12-3） | P0；展示"同一只 MBS 在不同利率路径下产生完全不同的现金流"——这是路径依赖的核心教学点，矩阵表的结构密度是 data_table 渲染无法等价传达的。 | 来源为课件内嵌教学表，局部使用；适合课程复习页。 | 可作为"数值矩阵型例题条件表"的采用样例。 |

## 4. A 类对象状态

未识别出 A 类强视觉对象。本章的核心教学对象（路径依赖机制、现金流结构、估值流程）均可通过结构化 visualBlock 或局部图片充分表达。

## 5. 原有 visualBlock 变更

| 原 visualBlock | 处理 |
|---|---|
| formula_card: 蒙特卡罗理论价值 | 融入更完整的 formula_card 集合：单路径现值、多路径平均、OAS 校准 |
| cashflow_diagram: 资产证券化现金流结构 | 扩展：增加服务商节点、夹层和权益级投资者节点、7 条边 |
| process_flow: MBS/ABS蒙特卡罗估值流程 | 重写为五步流程，描述更具体 |
| comparison_table: MBS、ABS与普通含权债券对比 | 扩展对比维度 |
| timeline: MBS现金流估值时间线 | 删除（被 process_flow 和 example_box 覆盖） |
| case_card: 案例 1：建行首只 MBS 定价思路 | 删除（来自外部链接，替换为 CMO 组别估值要点） |
