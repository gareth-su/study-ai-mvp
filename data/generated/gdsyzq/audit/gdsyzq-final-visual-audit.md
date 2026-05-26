# gdsyzq 最终视觉审计报告

执行日期：2025-05-13
审计范围：framework-detailed.json 全 8 章 visualBlocks + PPT 图片对照

## VisualBlock 总览

| 章节 | VB 数量 | 类型分布 |
|---|---|---|
| ch01 | 8 | concept_map:1, comparison_table:1, process_flow:1, data_table:2, case_card:1, image:2 |
| ch02 | 8 | concept_map:1, comparison_table:2, formula_card:2, timeline:1, decision_tree:1, case_card:1 |
| ch03 | 29 | comparison_table:5, formula_card:9, example_box:6, data_table:5, process_flow:1, curve_chart:1, chart_explanation:1, concept_map:1 |
| ch04 | 39 | formula_card:8, process_flow:3, timeline:2, cashflow_diagram:1, data_table:5, example_box:9, curve_chart:3, comparison_table:4, image:3, case_card:1 |
| ch05 | 27 | comparison_table:5, formula_card:4, image:5, chart_explanation:2, example_box:5, data_table:4, process_flow:2, decision_tree:1 |
| ch06 | 28 | comparison_table:5, formula_card:11, process_flow:2, image:4, data_table:1, example_box:5 |
| ch07 | 19 | process_flow:2, cashflow_diagram:1, comparison_table:3, formula_card:4, chart_explanation:1, example_box:4, image:2, case_card:1, data_table:1 |
| ch08 | 22 | concept_map:1, comparison_table:6, formula_card:4, curve_chart:1, chart_explanation:1, process_flow:2, example_box:2, data_table:4, case_card:1 |
| **合计** | **180** | |

## Image 资产清单

所有 image visualBlock 的路径均已验证存在：

| 章节 | 文件名 | 来源 | 教学价值 |
|---|---|---|---|
| ch01 | image13.png | PPT slide 12 | 债券市场存量规模及结构 |
| ch01 | image23.png | PPT slide 22 | 违约发行人及违约金额 |
| ch04 | csi-yield-curve-example-01.png | PPT | 中债收益率曲线示例 |
| ch04 | credit-spread-economic-cycle-01.png | PPT | 信用利差与经济周期 |
| ch04 | corporate-bond-yield-curve-practice-01.png | PPT | 公司债收益率曲线实务 |
| ch05 | interest-rate-tree-basic-4y.png | PPT | 4年期利率二叉树入门图 |
| ch05 | interest-rate-tree-calibrated-step2.png | PPT | 校准后利率树 |
| ch05 | callable-bond-tree-example.png | PPT | 可赎回债券估值树 |
| ch05 | putable-bond-tree-example.png | PPT | 可回售债券估值树 |
| ch05 | capped-floater-tree-example.png | PPT | 有上限浮息债券估值树 |
| ch06 | z-spread-curve-fixed-spread-left.png | PPT | Z-spread 曲线（左） |
| ch06 | z-spread-curve-fixed-spread-right.png | PPT | Z-spread 曲线（右） |
| ch06 | oas-model-price-gap.png | PPT | OAS 模型价格差距 |
| ch06 | oas-node-spread-35bp.png | PPT | OAS 节点利差 35bp |
| ch07 | refinancing-rate-paths.png | PPT | 再融资率路径模拟 |
| ch07 | cashflow-matrix.png | PPT | 现金流矩阵 |

## PPT 强视觉对象覆盖评估

### 已覆盖的 P0/P1 强视觉对象

| 对象类型 | 章节 | 处理方式 |
|---|---|---|
| 利率二叉树 | ch05 | 5 张 image（入门、校准、可赎回、可回售、有上限浮息） |
| Z-spread 曲线 | ch06 | 2 张 image + formula_card |
| OAS 模型图 | ch06 | 2 张 image + chart_explanation |
| Monte Carlo 路径 | ch07 | 1 张 image（再融资率路径） |
| 现金流矩阵 | ch07 | 1 张 image |
| 收益率曲线形态 | ch03 | curve_chart（4种形态） |
| 收益率曲线风险 | ch08 | curve_chart（平行/非平行移动） |
| 信用利差经济周期 | ch04 | 1 张 image |
| 债券市场规模 | ch01 | 1 张 image |
| 违约数据 | ch01 | 1 张 image |

### 潜在遗漏（P2 级别，不影响验收）

| 对象 | 章节 | PPT 位置 | 当前处理 | 建议 |
|---|---|---|---|---|
| 国债各期限发行占比饼图 | ch01 | slide 12 | 未裁切（image13 已覆盖主图） | 可选补充 |
| 中美市场对比图 | ch01 | slide 14 | 已转为 data_table | 无需图片 |
| 次贷危机示意图 | ch01 | slide 26-27 | 未裁切 | P3，不建议接入 |
| 金融机构业务构成 | ch01 | slide 28 | 未裁切 | P3，不建议接入 |
| 自展法计算过程表 | ch03 | PPT | 已有 example_box | 无需图片 |
| 远期利率推导图 | ch03 | PPT | 已有 formula_card | 无需图片 |

## chart_explanation 最终状态

| 位置 | 标题 | 有对应图表 | 状态 |
|---|---|---|---|
| ch03 VB[23] | 收益率曲线模型示例 | ✓ curve_chart | OK |
| ch05 VB[5] | 二叉树利率图阅读方法 | ✓ image | OK |
| ch07 VB[7] | Monte Carlo 路径依赖示意 | ✓ image | OK |
| ch08 VB[4] | 收益率曲线风险图阅读 | ✓ curve_chart | OK |

## 版权/公开部署风险

所有 image 均裁切自课件 PPT，属于教学内部使用。如需公开部署：
- ch01 image13/image23：来自公开市场数据图表，风险低
- ch04-ch07 images：来自教材/课件例题图表，仅限教学内部使用
- 建议：如公开部署，需替换为自绘图表或获得授权
