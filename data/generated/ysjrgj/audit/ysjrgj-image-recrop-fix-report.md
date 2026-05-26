# ysjrgj 原课件截图重裁修复报告

## Summary

本轮只处理 `ysjrgj` 中上一轮审计确认的 `source_asset_cropped` 图片，不处理 `gdsyzq`。已从 `source-materials/ysjrgj/.renders` 对应原页重新裁剪并覆盖原路径：

- P0：1 张，已修复。
- P1：6 张，已修复。
- P2：6 张，已顺手修复。
- 未修改 `framework-detailed.json`，因为 13 张图片均保持原文件路径，JSON 引用仍有效。
- 未修改 `gdsyzq`。`gdsyzq` 仍因缺少 `.renders` 无法做可靠源页对照。

## Modified Files

替换图片：

- `public/generated-assets/ysjrgj/ch02/page06_margin_marking_table.png`
- `public/generated-assets/ysjrgj/ch03/page12_min_variance_regression.png`
- `public/generated-assets/ysjrgj/ch04/page21_forward_rate_table.png`
- `public/generated-assets/ysjrgj/ch11/page16_call_bounds_value_curves.png`
- `public/generated-assets/ysjrgj/ch12/page18_straddle_payoff.png`
- `public/generated-assets/ysjrgj/ch12/page16_calendar_spread_payoff.png`
- `public/generated-assets/ysjrgj/ch12/page20_strip_strap_payoff.png`
- `public/generated-assets/ysjrgj/ch04/page18_zero_stripping_source_table.png`
- `public/generated-assets/ysjrgj/ch04/page35_duration_convexity_curve.png`
- `public/generated-assets/ysjrgj/ch05/page13_forward_arbitrage_cashflow.png`
- `public/generated-assets/ysjrgj/ch07/page05_interest_swap_cashflow.png`
- `public/generated-assets/ysjrgj/ch07/page16_relative_advantage_rates.png`
- `public/generated-assets/ysjrgj/ch12/page21_strangle_payoff_table.png`

未修改：

- `data/generated/ysjrgj/full/framework-detailed.json`
- `data/generated/gdsyzq/**`
- `source-materials/**`
- `src/**`
- `package.json` / lockfile

新增审计文件：

- `data/generated/ysjrgj/audit/ysjrgj-image-recrop-fix-report.md`
- `data/generated/ysjrgj/audit/ysjrgj-image-recrop-fix-status.json`

## Recrop Details

| Priority | Chapter | Image Path | Source Render Page | Issue | Recrop Action | Path Changed | File Exists | Frontend/Lightbox Checked |
|---|---|---|---|---|---|---|---|---|
| P0 | ch02 | `public/generated-assets/ysjrgj/ch02/page06_margin_marking_table.png` | `source-materials/ysjrgj/.renders/ch02/page_6_screenshot.png` | 表 2-1 右侧列和底部行被裁掉 | 重裁完整表题、全部列、全部行、表格边框，保留合理边距 | No | Yes | 页面入口可加载；该图文件级目视通过，建议人工在 lightbox 再点看一次 |
| P1 | ch03 | `public/generated-assets/ysjrgj/ch03/page12_min_variance_regression.png` | `source-materials/ysjrgj/.renders/03/page_12_screenshot.png` | Figure 3-2 左侧说明、图注和标题区域过紧 | 重裁完整说明、散点/回归线、方差曲线、坐标轴、图题 | No | Yes | 文件级目视通过 |
| P1 | ch04 | `public/generated-assets/ysjrgj/ch04/page21_forward_rate_table.png` | `source-materials/ysjrgj/.renders/04/page_21_screenshot.png` | 远期利率表底部行和上下文不完整 | 重裁远期利率推导上下文、完整表 4-6、全部行列 | No | Yes | 文件级目视通过 |
| P1 | ch11 | `public/generated-assets/ysjrgj/ch11/page16_call_bounds_value_curves.png` | `source-materials/ysjrgj/.renders/11/page_16_screenshot.png` | 左侧价值曲线被切掉一部分 | 重裁整页宽度局部，保留公式、两张价值曲线、坐标轴和图注 | No | Yes | 文件级目视通过 |
| P1 | ch12 | `public/generated-assets/ysjrgj/ch12/page18_straddle_payoff.png` | `source-materials/ysjrgj/.renders/12/page_18_screenshot.png` | 跨式组合 payoff 上下裁切过紧 | 重裁整页宽度局部，保留策略说明、完整 payoff、坐标轴、图注 | No | Yes | 文件级目视通过 |
| P1 | ch12 | `public/generated-assets/ysjrgj/ch12/page16_calendar_spread_payoff.png` | `source-materials/ysjrgj/.renders/12/page_16_screenshot.png` | 日历价差图上下文和图形边界过紧 | 重裁整页宽度局部，保留策略说明、完整图形、坐标轴、图注 | No | Yes | 文件级目视通过 |
| P1 | ch12 | `public/generated-assets/ysjrgj/ch12/page20_strip_strap_payoff.png` | `source-materials/ysjrgj/.renders/12/page_20_screenshot.png` | strip/strap 底部图注和策略说明不完整 | 重裁整页宽度局部，保留两段策略说明、两张 payoff 图、坐标轴和图注 | No | Yes | 文件级目视通过 |
| P2 | ch04 | `public/generated-assets/ysjrgj/ch04/page18_zero_stripping_source_table.png` | `source-materials/ysjrgj/.renders/04/page_18_screenshot.png` | 表格本体完整，但上下正文被切入 | 重裁整页宽度局部，保留表 4-3、脚注和前三个零息计算式 | No | Yes | 文件级目视通过 |
| P2 | ch04 | `public/generated-assets/ysjrgj/ch04/page35_duration_convexity_curve.png` | `source-materials/ysjrgj/.renders/04/page_35_screenshot.png` | 久期凸性图上方正文切入 | 重裁整页宽度局部，保留完整说明、曲线、坐标轴和图题 | No | Yes | 文件级目视通过 |
| P2 | ch05 | `public/generated-assets/ysjrgj/ch05/page13_forward_arbitrage_cashflow.png` | `source-materials/ysjrgj/.renders/05/page_13_screenshot.png` | 表 5-2 主体完整但上方公式/正文偏紧 | 重裁整页宽度局部，保留题设、公式、表题和完整套利现金流表 | No | Yes | 文件级目视通过 |
| P2 | ch07 | `public/generated-assets/ysjrgj/ch07/page05_interest_swap_cashflow.png` | `source-materials/ysjrgj/.renders/07/page_5_screenshot.png` | 互换现金流图主体完整但上方句子被切入 | 重裁整页宽度局部，保留完整例题说明、现金流图和图注 | No | Yes | 文件级目视通过 |
| P2 | ch07 | `public/generated-assets/ysjrgj/ch07/page16_relative_advantage_rates.png` | `source-materials/ysjrgj/.renders/07/page_16_screenshot.png` | 相对优势表底部正文切入 | 重裁整页宽度局部，保留完整例题、表 7-4 和表后说明 | No | Yes | 文件级目视通过 |
| P2 | ch12 | `public/generated-assets/ysjrgj/ch12/page21_strangle_payoff_table.png` | `source-materials/ysjrgj/.renders/12/page_21_screenshot.png` | 宽跨式图表上方说明切入 | 重裁整页宽度局部，保留策略说明、payoff 图、图注和完整表 12-6 | No | Yes | 文件级目视通过 |

## File And JSON Verification

- 13 个目标图片文件均可打开。
- 13 个目标图片路径均仍被 `data/generated/ysjrgj/full/framework-detailed.json` 引用。
- 因为保持原路径覆盖，未发生 broken image path。
- 重裁图片尺寸已检查，未出现 0 宽/0 高或不可读文件。

## Page Verification

- `/framework?course=ysjrgj` 可启动并加载。
- `/admin/preview/generated?course=ysjrgj&variant=full&level=detailed` 可启动并加载。
- 页面截图确认学习页与预览页整体可访问；图片组件区域和“查看大图”入口所在页面可渲染。
- 自动化对深层章节 tab/模块点击不稳定，本轮未能逐张完成 lightbox 目视点击确认。由于本轮未改前端，且图片路径未变，剩余风险主要是人工需要在页面中逐张点开 P1/P2 图片确认显示体验。

## Remaining Risks

- `gdsyzq` 未处理，原因是当前没有 `source-materials/gdsyzq/.renders`，无法可靠源页对照。
- `ysjrgj` 13 张图片文件级已修复并目视通过；仍建议人工在网页 lightbox 中逐张点看一次，尤其是 ch12 payoff 图和 ch11 价值曲线。
- 本轮未修改前端样式；如果页面在某些小屏宽度下仍显得图片偏小，应作为前端展示体验问题另行处理，不属于 source asset 裁切错误。

## Validation

- `npm.cmd run validate:content`：通过。
- `npm.cmd run lint`：通过。
- `npm.cmd run build`：通过。

## Final Status

FIXED_WITH_REMAINING_RISKS
