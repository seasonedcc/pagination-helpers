/**
 * Compute how many pages a paginated list spans.
 *
 * @param input.total - Total number of items across all pages
 * @param input.perPage - How many items each page holds
 * @returns The number of pages — `0` when `total` is `0`
 *
 * @example
 * ```ts
 * getPageCount({ total: 47, perPage: 10 }) // 5
 * getPageCount({ total: 0, perPage: 10 })  // 0
 * ```
 */
function getPageCount({
  total,
  perPage,
}: {
  total: number
  perPage: number
}) {
  return Math.ceil(total / perPage)
}

export { getPageCount }
