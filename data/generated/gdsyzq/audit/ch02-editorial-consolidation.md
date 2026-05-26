# gdsyzq 第 2 章 editorial consolidation

执行日期：2026-05-13
性质：局部增强后的编辑整合检查
最终状态：**polished-near**

## 整合项

### 1. 公式字段修复

VB[2] 息票金额 formula 从自然语言 `Coupon = Face value × coupon rate / payment frequency` 修复为 `C = \frac{F \times c}{m}`，与 formulaLatex 字段一致。

VB[3] 浮动利率债券息票率 formula 从自然语言 `coupon rate = reference rate + quoted margin` 修复为 `c_t = r_t + s`，与 formulaLatex 字段一致。

验证器已确认：gdsyzq/full/detailed 中原 ch02 自然语言 formula 警告已消除。

### 2. Children 文本统一性

所有 20 个 children 从 15-40 chars 扩展为 60-180 chars 的解释性段落：
- 基础概念类（债券契约、基本条款、应急条款等）加入了定义、示例和后续章节连接
- 机制类（契约约束、息票支付、提前结束、市场分层）加入了触发条件、经济逻辑和市场背景
- 计算类（息票金额、浮动利率、基点）加入了具体数值示例
- 易混点类加入了权利归属、经济动机和应用场景对比
- 复习路径类每步结合了具体工具和指标

### 3. Cross-reference 一致性

- chapterTitle 和 summary 未修改（原文本已准确）
- keyConcepts 未修改（15 个概念覆盖全面）
- 所有 VB titles 与所属 node name 对齐
- node[3] 公式与计算逻辑 children 与 VB[2]/VB[3] formula_cards 一致
- case_card relatedConcepts 与 keyConcepts 交叉验证通过

### 4. 工程词暴露检查

全文搜索未发现 `source`、`chunk`、`generated`、`JSON`、`node id` 等工程词。

### 5. 未修改项确认

- framework-concise.json：未修改（其 ch02 自然语言 formula 警告属独立文件）
- 其他章节：未修改
- source-materials：未修改
- src/：未修改
- Prisma schema / package.json：未修改
- 未新增图片资源
