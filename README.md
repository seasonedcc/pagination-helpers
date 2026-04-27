# pagination-helpers

Zero-dependency pagination math primitives.

Three small, pure functions for computing the page count, the page range to render (with ellipses), and the "Showing X to Y of Z" display range from `page`/`perPage`/`total`. No React, no router, no styling — just the math, so each consumer can build their own pagination component on top.

## Features

- Zero dependencies
- Pure functions — no state, no I/O, trivially testable
- Atomic primitives: pick the function you need, ignore the rest
- Full TypeScript support
- ESM and CommonJS builds

## Installation

```bash
npm install pagination-helpers
# or
pnpm add pagination-helpers
# or
yarn add pagination-helpers
```

## Quick Start

```ts
import {
  getPageCount,
  getPageRange,
  getDisplayRange,
} from 'pagination-helpers'

const page = 10
const perPage = 10
const total = 195

getPageCount({ total, perPage })
// 20

getPageRange({ page, pageCount: 20 })
// [1, 'ellipsis-before', 8, 9, 10, 11, 12, 'ellipsis-after', 20]

getDisplayRange({ page, perPage, total })
// { from: 91, to: 100 }
```

## API

### `getPageCount({ total, perPage })`

Returns the number of pages. `Math.ceil(total / perPage)`. Returns `0` when `total` is `0`.

```ts
getPageCount({ total: 50, perPage: 10 }) // 5
getPageCount({ total: 47, perPage: 10 }) // 5
getPageCount({ total: 0, perPage: 10 })  // 0
```

### `getPageRange({ page, pageCount, pagesAroundCurrent?, pagesAtEdges? })`

Returns the sequence of page numbers (with ellipses) to render in a pagination control.

The output always starts with the first `pagesAtEdges` pages and ends with the last `pagesAtEdges` pages, with `pagesAroundCurrent` pages on either side of `page`. Gaps between these groups become `'ellipsis-before'` (gap on the left of `page`) or `'ellipsis-after'` (gap on the right of `page`). When a gap consists of a single missing page, that page is included in the output instead of an ellipsis.

| Option | Default | Meaning |
| --- | --- | --- |
| `pagesAroundCurrent` | `2` | Pages to show on each side of `page` |
| `pagesAtEdges` | `1` | Pages to always show at the start and end |

Returns `Array<number | 'ellipsis-before' | 'ellipsis-after'>`. Empty when `pageCount` is `0`.

```ts
// Both ellipses
getPageRange({ page: 10, pageCount: 20 })
// [1, 'ellipsis-before', 8, 9, 10, 11, 12, 'ellipsis-after', 20]

// Single-page gaps fill in instead of ellipsis
getPageRange({ page: 5, pageCount: 10 })
// [1, 2, 3, 4, 5, 6, 7, 'ellipsis-after', 10]

// All pages fit
getPageRange({ page: 3, pageCount: 5 })
// [1, 2, 3, 4, 5]

// Custom knobs
getPageRange({ page: 10, pageCount: 20, pagesAroundCurrent: 1 })
// [1, 'ellipsis-before', 9, 10, 11, 'ellipsis-after', 20]

getPageRange({ page: 10, pageCount: 20, pagesAtEdges: 2 })
// [1, 2, 'ellipsis-before', 8, 9, 10, 11, 12, 'ellipsis-after', 19, 20]
```

The two ellipsis variants let consumers give them stable React keys without falling back to the array index.

### `getDisplayRange({ page, perPage, total })`

Returns the 1-based item range shown on the current page — `{ from, to }`. Useful for "Showing X to Y of Z results" labels.

Returns `{ from: 0, to: 0 }` when there are no items to show on the current page (`total` is `0`, or `page` is past the last page).

```ts
getDisplayRange({ page: 1, perPage: 10, total: 47 }) // { from: 1, to: 10 }
getDisplayRange({ page: 5, perPage: 10, total: 47 }) // { from: 41, to: 47 }
getDisplayRange({ page: 1, perPage: 10, total: 0 })  // { from: 0, to: 0 }
```

## Edge cases

The package does no input validation or clamping — it computes honest math from whatever you pass in. Callers are responsible for sane inputs (`page >= 1`, `perPage >= 1`, `total >= 0`). The one edge case worth highlighting:

- **`total === 0`** (empty list): `getPageCount` returns `0`, `getPageRange` returns `[]`, `getDisplayRange` returns `{ from: 0, to: 0 }`. Callers typically render an empty state instead of pagination, and `pages.length > 0` is the natural condition.

## Worked example

A minimal pagination component built from the three primitives:

```tsx
import {
  getPageCount,
  getPageRange,
  getDisplayRange,
} from 'pagination-helpers'

type Props = { page: number; perPage: number; total: number }

function Pagination({ page, perPage, total }: Props) {
  const pageCount = getPageCount({ total, perPage })
  if (pageCount === 0) return null

  const pages = getPageRange({ page, pageCount })
  const { from, to } = getDisplayRange({ page, perPage, total })

  return (
    <div>
      <p>
        Showing {from} to {to} of {total} results
      </p>
      <nav aria-label="Pagination">
        {pages.map((item) => {
          if (item === 'ellipsis-before' || item === 'ellipsis-after') {
            return <span key={item}>…</span>
          }
          return (
            <a
              key={item}
              href={`?page=${item}`}
              aria-current={item === page ? 'page' : undefined}
            >
              {item}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
```

## Types

```ts
import type { PageRangeItem } from 'pagination-helpers'
// number | 'ellipsis-before' | 'ellipsis-after'
```

## License

[MIT](LICENSE.md)
