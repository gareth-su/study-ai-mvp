# 第 4 章例题 / 应用题 / 推导链审计

## 1. 核心发现

第 4 章存在一类生成误判：当普通文本抽取没有稳定拿到公式、权重或结果时，上一轮增强把部分完整应用题降维成了 data_table 或公式说明。最典型的是第 23-25 页 A/B/C 附息债券复制 1 年期零息债券案例。

这不是资料没有解答，而是普通文本抽取没有读出 Office 数学对象中的权重和公允价值。进一步检查 PPT XML 后确认：\(N_A=-57.75\)、\(N_B=56.65\)、\(N_C=-1\)，公允价值约为 98.2。

## 2. 审计列表

| 页码 | 项目 | 当前表达 | 是否需要 example_box | 优先级 | 修复动作 |
|---|---|---|---|---|---|
| 10 | 10 年期 8% 国债传统估值 | data_table, example_box, formula_card, timeline | 是 | P0 | keep-example-box |
| 13-14 | 3 年期 10% 半年付息债券无套利估值 | data_table, example_box, formula_card | 是 | P0 | keep-example-box |
| 15-16-17 | 3 年期 6% 债券购买判断 | example_box, process_flow | 是 | P0 | keep-example-box |
| 21 | 10 年期 8% 国债分离套利 | data_table | 是 | P0 | add-example-box-and-keep-data-table |
| 22 | 10 年期 4.8% 国债重构套利 | data_table | 是 | P0 | add-example-box-and-keep-data-table |
| 23-24-25 | A/B/C 附息债券复制 1 年期零息债券 | data_table | 是 | P0 | add-example-box-and-keep-data-table |
| 27-28 | 非利息支付日净价计算 | example_box, formula_card, timeline | 是 | P0 | keep-example-box |
| 36 | 中石油五年期公司债估值差异 | case_card | 否 | P1 | keep-case-card |
| 39 | 10 年期工业债券收益利差计算 | formula_card | 是 | P0 | add-example-box-and-keep-formula-card |
| 53 | 8% 10 年期非国债估值判断 | data_table, example_box, process_flow | 是 | P1 | keep-example-box |

## 3. 被降维的问题

- 第 21 页和第 22 页分离/重构套利：原先只有 data_table，现在补充为两个 example_box，保留套利判断步骤。
- 第 23-25 页 A/B/C 债券复制零息债券：原先只有现金流矩阵 data_table，现在补充完整 example_box，包含问题、方程、权重、0 期成本和一价定律结论。
- 第 39 页收益利差计算：原先只放在 formula_card，现在补充 example_box，保留绝对利差、相对利差和收益率比率计算。

## 4. 数字不确定处理修正

这次复查确认第 23-25 页的权重和结果并非不确定，而是上一轮普通文本抽取漏读。后续如果普通文本抽取缺失公式，应先检查 PPT 数学对象、表格对象或视觉页，而不是直接把应用题降级。

如果确实无法确认数值，也必须保留题目结构和解题路径；只有具体数值才标注待核对。
