import { describe, expect, it } from 'vitest'
import { getPageCount } from './get-page-count'

describe('getPageCount', () => {
  it('divides total by perPage when total is a multiple', () => {
    expect(getPageCount({ total: 50, perPage: 10 })).toBe(5)
  })

  it('rounds up when there is a partial last page', () => {
    expect(getPageCount({ total: 47, perPage: 10 })).toBe(5)
  })

  it('returns 0 when total is 0', () => {
    expect(getPageCount({ total: 0, perPage: 10 })).toBe(0)
  })

  it('returns 1 when total is smaller than perPage', () => {
    expect(getPageCount({ total: 3, perPage: 10 })).toBe(1)
  })
})
