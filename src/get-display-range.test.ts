import { describe, expect, it } from 'vitest'
import { getDisplayRange } from './get-display-range'

describe('getDisplayRange', () => {
  it('returns the full page range on a non-final page', () => {
    expect(getDisplayRange({ page: 1, perPage: 10, total: 47 })).toEqual({
      from: 1,
      to: 10,
    })
  })

  it('caps "to" at total on the final partial page', () => {
    expect(getDisplayRange({ page: 5, perPage: 10, total: 47 })).toEqual({
      from: 41,
      to: 47,
    })
  })

  it('returns the full range when the last page is exactly full', () => {
    expect(getDisplayRange({ page: 5, perPage: 10, total: 50 })).toEqual({
      from: 41,
      to: 50,
    })
  })

  it('returns { from: 0, to: 0 } when total is 0', () => {
    expect(getDisplayRange({ page: 1, perPage: 10, total: 0 })).toEqual({
      from: 0,
      to: 0,
    })
  })

  it('returns { from: 0, to: 0 } when page is past the last page', () => {
    expect(getDisplayRange({ page: 6, perPage: 10, total: 47 })).toEqual({
      from: 0,
      to: 0,
    })
  })
})
