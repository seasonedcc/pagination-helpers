/**
 * Compute the 1-based item range shown on the current page — useful for
 * "Showing X to Y of Z results" labels.
 *
 * @param input.page - The current page (1-based)
 * @param input.perPage - How many items each page holds
 * @param input.total - Total number of items across all pages
 * @returns `{ from, to }` — both `0` when there are no items to show on the
 *   current page (`total` is `0`, or `page` is past the last page)
 *
 * @example
 * ```ts
 * getDisplayRange({ page: 1, perPage: 10, total: 47 }) // { from: 1, to: 10 }
 * getDisplayRange({ page: 5, perPage: 10, total: 47 }) // { from: 41, to: 47 }
 * getDisplayRange({ page: 1, perPage: 10, total: 0 })  // { from: 0, to: 0 }
 * ```
 */
function getDisplayRange({
  page,
  perPage,
  total,
}: {
  page: number
  perPage: number
  total: number
}) {
  const rawFrom = (page - 1) * perPage + 1

  if (rawFrom > total) {
    return { from: 0, to: 0 }
  }

  const rawTo = page * perPage
  return { from: rawFrom, to: rawTo > total ? total : rawTo }
}

export { getDisplayRange }
