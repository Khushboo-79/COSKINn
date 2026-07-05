-- Backfill: auto-derive categories.mode from the products already in
-- each category, instead of hand-retagging every category manually.
--
-- Idempotent: safe to run multiple times, and safe to run in production
-- after being verified in staging first. It only ever narrows a category
-- from the default 'both' to 'skincare' or 'makeup' — it never sets a
-- category back to 'both' once narrowed, so re-running mid-catalog-growth
-- won't undo a deliberate manual override (see the WHERE guard below).
--
-- Prerequisite: run 001_add_mode_toggle_fields.sql first.
-- Run order: staging → verify counts below look sane → production.

BEGIN;

-- 1. For each category, find whether the products inside it are
--    exclusively skincare, exclusively makeup, or a genuine mix.
WITH category_product_types AS (
  SELECT
    p.category_id,
    COUNT(*) FILTER (WHERE p.product_type = 'skincare') AS skincare_count,
    COUNT(*) FILTER (WHERE p.product_type = 'makeup')   AS makeup_count
  FROM products p
  WHERE p.category_id IS NOT NULL
  GROUP BY p.category_id
)

-- 2. Update categories.mode based on that breakdown.
--    - All-skincare products  -> mode = 'skincare'
--    - All-makeup products    -> mode = 'makeup'
--    - Genuinely mixed        -> leave as 'both' (do nothing; this is a
--                                real signal the category needs a human
--                                decision, e.g. "Gift Sets" spanning both)
--    - No products yet        -> leave as 'both' (nothing to infer from)
--    Guard: only touches rows still at the default 'both', so it will
--    never override a category someone has already manually set via the
--    Product Management Panel's Mode selector (Day 2 of that plan).
UPDATE categories c
SET mode = CASE
  WHEN cpt.skincare_count > 0 AND cpt.makeup_count = 0 THEN 'skincare'
  WHEN cpt.makeup_count > 0 AND cpt.skincare_count = 0 THEN 'makeup'
  ELSE c.mode  -- mixed or unresolved: leave untouched
END,
updated_at = now()
FROM category_product_types cpt
WHERE c.id = cpt.category_id
  AND c.mode = 'both';  -- never clobber a manual override

-- 3. Report: categories left as 'both' with products in them are the
--    ones that need a human decision (either genuinely mixed, or a
--    category naming/tagging issue worth checking).
--    Run this SELECT after the UPDATE and review before moving on.
-- SELECT c.id, c.name, cpt.skincare_count, cpt.makeup_count
-- FROM categories c
-- JOIN category_product_types cpt ON cpt.category_id = c.id
-- WHERE c.mode = 'both' AND (cpt.skincare_count > 0 OR cpt.makeup_count > 0)
-- ORDER BY c.name;

COMMIT;

-- ------------------------------------------------------------
-- Banners and campaigns: NOT auto-backfilled. There's no reliable
-- signal to infer their mode from (a banner isn't tied to one product),
-- so they stay at the safe default 'both' until Marketing/CRM staff
-- retag the ones they want mode-scoped, using the new Mode field added
-- to the Banner/Campaign screens (see the addendum, §8). This is
-- intentional — better to under-scope (show everywhere) than
-- mis-scope (hide something that should be visible) on first rollout.
-- ------------------------------------------------------------

-- Verification query to run after backfill, in both staging and prod:
-- SELECT mode, COUNT(*) FROM categories GROUP BY mode;
-- Expect: most rows now 'skincare' or 'makeup', a small remainder
-- genuinely 'both' (mixed categories or categories with no products yet).
