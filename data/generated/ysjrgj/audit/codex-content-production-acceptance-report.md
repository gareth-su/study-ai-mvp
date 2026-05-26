# ysjrgj Content Production Acceptance Report

Audit date: 2026-05-15

## Scope

Course: ysjrgj（衍生金融工具）

Reviewed chapters: ch01, ch02, ch03, ch04, ch05, ch07, ch10, ch11, ch12. Source ch06 does not exist and was not processed. gdsyzq, ysjrgj concise, source materials, renderer source, Prisma, package files, and validation scripts were not modified in this pass.

## Why Previous ACCEPTED_WITH_RISKS Was Insufficient

The previous acceptance was too close to a compliance audit: it verified JSON validity, schema compatibility, missing paths, and known formula issues, but did not apply a mature course-production standard to the student-facing learning chain. In particular, it underweighted cases where a table and an example both existed but the table was not reliably embedded into the explanation path, and it accepted “structured replacement” even when the original slide image carried important visual cues.

This pass treated the following as P0/P1 when confirmed:
- tables that serve examples but are disconnected from the problem statement, calculation, or result;
- Markdown/raw table text inside example fields;
- formulas or payoff annotations that render with warnings because Chinese prose is inside math mode;
- original slide figures, payoff charts, cash-flow tables, and derivation diagrams that are more pedagogically direct than a purely structured substitute.

## Re-Acceptance Standard

Each chapter was judged as course content, not just as valid JSON. The standard was:
- A student can read in order: concept -> source visual/table -> formula -> substitution -> result -> interpretation.
- Tables have clear headers, row meanings, units where relevant, and an explicit role in the nearby example.
- Examples include known conditions, calculation method, substitution, result, and result interpretation.
- Original slide images are retained when they help students understand direction, axes, breakpoints, cash flows, or source layout.
- Frontend preview must not expose raw JSON, object arrays, Markdown tables, or broken image paths in the checked modules.

## Producer Judgment By Chapter

| Chapter | DeepSeek output judgment | Acceptance result |
| --- | --- | --- |
| ch01 | partially_effective_needs_rework | Accepted after adding original market/gold-forward teaching crops. |
| ch02 | partially_effective_needs_rework | Accepted after adding margin/CCP visuals and binding margin example to a table. |
| ch03 | partially_effective_needs_rework | Accepted after rebuilding hedge example tables and adding original example/regression crops. |
| ch04 | partially_effective_needs_rework | Accepted after replacing Markdown table flow with real data tables and adding zero/forward/duration visuals. |
| ch05 | partially_effective_needs_rework | Accepted after rebuilding forward-arbitrage table chain and adding original cash-flow/formula crops. |
| ch07 | partially_effective_needs_rework | Accepted after replacing raw rate table flow and binding swap visuals/tables/examples. |
| ch10 | effective | Accepted after adding original payoff/margin visuals for verification. |
| ch11 | effective | Accepted after adding lower-bound/parity/value-curve visuals for derivation review. |
| ch12 | partially_effective_needs_rework | Accepted after adding original payoff crops, table-example chains, and cleaning Chinese-in-math warnings. |

## Table + Example Special Check

### ch03

Reworked table/example chains:
- 铜采购多头对冲情景表 now sits directly before the copper hedge example and explains both price-rise and price-fall scenarios.
- 日元空头对冲数据表 now sits next to the original slide crop and before the dual-path example.
- 交叉对冲与尾随对冲参数表 isolates航空燃油与尾随对冲的 required inputs.
- 股指期货 beta 调整参数表 separates beta-reduction and beta-increase scenarios.

Production issue fixed: the earlier content relied on examples and parameters being present somewhere in the chapter; it did not consistently give students a local “read table -> compute -> interpret” path.

Frontend check: ch03 module preview confirmed real tables and images render near the examples, with no raw JSON/Markdown table exposure.

### ch04

Reworked table/example chains:
- 零息利率剥离例题 was rebuilt into source crop + input data table + example_box + output result table.
- FRA 例题参数表 was added before FRA calculations.
- Forward-rate and duration/convexity original crops were attached to the relevant modules.

Production issue fixed: the zero-stripping example previously contained Markdown-like table content inside the example flow and was not a mature student-facing table chain.

Frontend check: ch04 zero-stripping module preview confirmed real data tables before/after the example. A module-allocation issue initially placed the zero-stripping image under duration; it was corrected by strengthening the image title/description with the target module keywords.

### ch05

Reworked table/example chains:
- 无中间收入股票远期套利现金流表 now follows the original Figure 5-2 crop and precedes/anchors the example.
- 远期定价例题参数速查表 now groups no-income, known-cash-income, index, currency, and commodity formula inputs.
- Original crops were added for no-income formula, no-income arbitrage cash flow, and known-income arbitrage table.

Production issue fixed: “structured replacement” was not sufficient for Figure 5-2 because the original table makes the two arbitrage directions easier to compare visually.

Frontend check: ch05 no-income forward module preview confirmed original image, real table, and surrounding explanation render without raw JSON/Markdown.

### ch07

Reworked table/example chains:
- AAA/BBB 相对优势借款利率表 now sits between original source crop and example_box.
- The example no longer relies on an embedded Markdown table; the table and steps explicitly compute 1.2%, 0.7%, and 0.5%.
- Floating-rate interest parameter table and currency-swap cash-flow crop were added.

Production issue fixed: the prior acceptance underestimated the table formatting risk in the AAA/BBB case. The table is now a renderer-native data_table and the example explicitly points upward to it.

Frontend check: ch07 relative-advantage module preview confirmed source crop, real data table, example steps, and intermediary swap cash-flow image render in order.

### ch12

Reworked table/example chains:
- Protective put, bull spread, butterfly, straddle/strangle parameter tables were added next to their examples.
- Original payoff crops were added for stock+single-option overlay, bull, bear, butterfly, calendar, straddle, strangle, and strip/strap.
- Chinese prose inside inline math for payoff/breakeven annotations was replaced with variable notation plus text explanation.

Production issue fixed: payoff strategies need visual verification of shape, breakpoints, and max loss/profit zones. Payoff_chart alone was not enough where original PPT graphs were clearer.

Frontend check: ch12 straddle/strangle module preview confirmed payoff_chart, original images, parameter table, example, and comparison table render in a continuous learning chain. Console warnings dropped to chart-container warnings only; no new formula warnings appeared after the cleanup.

## Original Slide Image Extraction Review

All source renders for the listed chapters were inspected for learning-useful visuals. Crops were taken from local render images only; source PDFs/renders were not modified. No full-page decorative screenshots were added.

### ch01

Inspected render pages: all ch01 render pages.

Extracted and inserted:
- `public/generated-assets/ysjrgj/ch01/page05_market_size_trend.png`: market-size trend; helps students see derivative market growth rather than reading it as background prose.
- `public/generated-assets/ysjrgj/ch01/page15_gold_forward_inputs.png`: gold forward example inputs; helps bind the example to the original problem statement.
- `public/generated-assets/ysjrgj/ch01/page16_gold_forward_formula.png`: gold forward formula/substitution; helps verify the calculation chain.

Attached in `framework-detailed.json` as image blocks near ch01 market/background and gold-forward content. Paths exist. Skipped pure title/background/news-like visuals that did not add learning value.

### ch02

Inspected render pages: all ch02 render pages.

Extracted and inserted:
- `public/generated-assets/ysjrgj/ch02/page06_margin_marking_table.png`: margin/daily marking example table; helps students follow daily settlement parameters.
- `public/generated-assets/ysjrgj/ch02/page16_ccp_clearing_structure.png`: CCP clearing structure; helps show central-counterparty direction and relationship.

Attached near margin mechanism and clearinghouse modules. Paths exist. Skipped decorative exchange screenshots.

### ch03

Inspected render pages: all ch03 render pages.

Extracted and inserted:
- `public/generated-assets/ysjrgj/ch03/page10_yen_short_hedge_example.png`: yen short hedge original example; helps verify numbers and two calculation paths.
- `public/generated-assets/ysjrgj/ch03/page12_min_variance_regression.png`: Figure 3-2 regression scatter; helps students see what rho/sigma regression is estimating.

Attached near short hedge and minimum-variance hedge modules. Paths exist. Skipped visuals already more clearly expressed by local data tables.

### ch04

Inspected render pages: all ch04 render pages.

Extracted and inserted:
- `public/generated-assets/ysjrgj/ch04/page18_zero_stripping_source_table.png`: zero-stripping source table; helps connect bond prices/coupons/terms to bootstrapping.
- `public/generated-assets/ysjrgj/ch04/page21_forward_rate_table.png`: forward-rate original table; helps verify tenor and rate direction.
- `public/generated-assets/ysjrgj/ch04/page35_duration_convexity_curve.png`: duration/convexity curve; helps explain first-order vs second-order price response.

Attached to zero-stripping, forward-rate, and duration/convexity modules. Paths exist. The zero-stripping crop was re-targeted after allocation diagnostics showed it initially matched the wrong module.

### ch05

Inspected render pages: all ch05 render pages.

Extracted and inserted:
- `public/generated-assets/ysjrgj/ch05/page12_no_income_forward_formula.png`: no-income forward formula/substitution.
- `public/generated-assets/ysjrgj/ch05/page13_forward_arbitrage_cashflow.png`: Figure 5-2 no-income arbitrage cash-flow table.
- `public/generated-assets/ysjrgj/ch05/page16_known_income_arbitrage_table.png`: known-income arbitrage table.

Attached to no-income and known-income forward pricing modules. Paths exist. Skipped repetitive formula-only pages where the structured formula_card was clearer.

### ch07

Inspected render pages: all ch07 render pages.

Extracted and inserted:
- `public/generated-assets/ysjrgj/ch07/page05_interest_swap_cashflow.png`: Apple & Flower interest swap cash-flow diagram.
- `public/generated-assets/ysjrgj/ch07/page16_relative_advantage_rates.png`: AAA/BBB relative-advantage rates table.
- `public/generated-assets/ysjrgj/ch07/page18_intermediated_swap_cashflow.png`: intermediary swap cash-flow diagram.
- `public/generated-assets/ysjrgj/ch07/page29_currency_swap_cashflow_table.png`: currency swap cash-flow table.

Attached to standard swap, relative-advantage, and currency-swap modules. Paths exist. Skipped low-value definition slides without additional visual structure.

### ch10

Inspected render pages: all ch10 render pages.

Extracted and inserted:
- `public/generated-assets/ysjrgj/ch10/page04_call_payoff_original.png`: call payoff original graph.
- `public/generated-assets/ysjrgj/ch10/page05_put_payoff_original.png`: put payoff original graph.
- `public/generated-assets/ysjrgj/ch10/page16_naked_option_margin_example.png`: naked-option margin source example.

Attached to payoff and margin modules. Paths exist. Skipped exchange background screenshots.

### ch11

Inspected render pages: all ch11 render pages.

Extracted and inserted:
- `public/generated-assets/ysjrgj/ch11/page07_call_lower_bound_derivation.png`: call lower-bound derivation.
- `public/generated-assets/ysjrgj/ch11/page11_put_call_parity_derivation.png`: put-call parity derivation.
- `public/generated-assets/ysjrgj/ch11/page16_call_bounds_value_curves.png`: call bounds/value curves.

Attached to lower-bound, parity, and value-curve modules. Paths exist. Skipped duplicated algebra slides where formula cards were clearer.

### ch12

Inspected render pages: all ch12 render pages.

Extracted and inserted:
- `public/generated-assets/ysjrgj/ch12/page04_stock_option_overlay_payoffs.png`: stock plus option overlay payoff.
- `public/generated-assets/ysjrgj/ch12/page06_bull_spread_payoff.png`: bull spread payoff.
- `public/generated-assets/ysjrgj/ch12/page09_bear_spread_payoff.png`: bear spread payoff.
- `public/generated-assets/ysjrgj/ch12/page12_butterfly_payoff.png`: butterfly payoff.
- `public/generated-assets/ysjrgj/ch12/page16_calendar_spread_payoff.png`: calendar spread payoff.
- `public/generated-assets/ysjrgj/ch12/page18_straddle_payoff.png`: straddle payoff.
- `public/generated-assets/ysjrgj/ch12/page20_strip_strap_payoff.png`: strip/strap payoff.
- `public/generated-assets/ysjrgj/ch12/page21_strangle_payoff_table.png`: strangle payoff and table.

Attached to the corresponding strategy modules. Paths exist. Bull-spread image allocation was corrected after diagnostics initially matched it to the bear-spread module.

## Renderer / Frontend Preview Checks

Checked with the local preview route `/framework?course=ysjrgj`:
- ch03: copper and yen hedge table/example chains rendered as real tables/images.
- ch04: zero-stripping source/input/output chain rendered as real tables around the example.
- ch05: no-income forward module rendered original Figure 5-2 crop plus data_table; no raw JSON/Markdown.
- ch07: AAA/BBB module rendered original crop, data_table, example, and intermediary cash-flow image in order.
- ch12: straddle/strangle module rendered payoff_chart, original crops, parameter data_table, example_box, and comparison table in order.

Machine diagnostics also confirmed all new image blocks were assigned to chapter modules, not resource-index supplements, after the retargeting fixes.

## Validation

- `npm run validate:content`: passed. Existing warnings remain in ysjrgj concise/detailed and gdsyzq; this pass did not modify forbidden concise/gdsyzq files. New Chinese-in-math warnings from ch12 were eliminated.
- `npm run lint`: passed.
- `npm run build`: passed.

## Remaining Risks

- The frontend preview was targeted to high-risk table/example modules rather than every single inserted image location. Module-allocation diagnostics covered all new images, and path existence was checked.
- Existing ysjrgj detailed validation warnings remain in ch04 and ch11 formula-related fields outside this pass's confirmed table/example rework. They pass validation but should be considered known residual warning debt.
- Some original crops reproduce low-resolution slide material. They are local teaching crops, not full-page screenshots, and were retained only where they add visual learning value.

## Final Recommendation

ACCEPTED_AFTER_REWORK

ysjrgj can enter human acceptance after this content-production rework, with the explicit note that human reviewers should visually scan the newly inserted original-slide crops in the browser for subjective clarity and cropping preference.
