import type { PageRangeItem } from './types'

/**
 * Compute the sequence of page numbers (with ellipses) to render in a
 * pagination control.
 *
 * The output always starts with the first `pagesAtEdges` pages and ends with
 * the last `pagesAtEdges` pages, with `pagesAroundCurrent` pages on either
 * side of `page`. Gaps between these groups are represented as
 * `'ellipsis-before'` (gap on the left of `page`) or `'ellipsis-after'` (gap
 * on the right of `page`). When a gap consists of a single missing page, that
 * page is included in the output instead of an ellipsis.
 *
 * @param input.page - The current page (1-based)
 * @param input.pageCount - Total number of pages
 * @param input.pagesAroundCurrent - Pages to show on each side of `page`
 *   (default `2`)
 * @param input.pagesAtEdges - Pages to always show at the start and end
 *   (default `1`)
 * @returns Array of page numbers and ellipsis markers — empty when
 *   `pageCount` is `0`
 *
 * @example
 * ```ts
 * getPageRange({ page: 10, pageCount: 20 })
 * // [1, 'ellipsis-before', 8, 9, 10, 11, 12, 'ellipsis-after', 20]
 * ```
 *
 * @example
 * ```ts
 * getPageRange({ page: 5, pageCount: 10 })
 * // [1, 2, 3, 4, 5, 6, 7, 'ellipsis-after', 10]
 * ```
 */
function getPageRange({
  page,
  pageCount,
  pagesAroundCurrent = 2,
  pagesAtEdges = 1,
}: {
  page: number
  pageCount: number
  pagesAroundCurrent?: number
  pagesAtEdges?: number
}) {
  const left = page - pagesAroundCurrent
  const right = page + pagesAroundCurrent + 1
  const range: number[] = []

  for (let i = 1; i <= pageCount; i++) {
    if (
      i <= pagesAtEdges ||
      i > pageCount - pagesAtEdges ||
      (i >= left && i < right)
    ) {
      range.push(i)
    }
  }

  const result: PageRangeItem[] = []
  let last: number | undefined

  for (const i of range) {
    if (last !== undefined) {
      if (i - last === 2) {
        result.push(last + 1)
      } else if (i - last !== 1) {
        result.push(last < page ? 'ellipsis-before' : 'ellipsis-after')
      }
    }
    result.push(i)
    last = i
  }

  return result
}

export { getPageRange }
