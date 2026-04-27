import { describe, expect, it } from 'vitest'
import { getPageRange } from './get-page-range'

describe('getPageRange', () => {
  it('returns an empty array when pageCount is 0', () => {
    expect(getPageRange({ page: 1, pageCount: 0 })).toEqual([])
  })

  it('returns just [1] when there is a single page', () => {
    expect(getPageRange({ page: 1, pageCount: 1 })).toEqual([1])
  })

  it('lists all pages without ellipses when everything fits', () => {
    expect(getPageRange({ page: 3, pageCount: 5 })).toEqual([1, 2, 3, 4, 5])
  })

  it('emits ellipsis-after when the gap is on the right of current', () => {
    expect(getPageRange({ page: 2, pageCount: 10 })).toEqual([
      1,
      2,
      3,
      4,
      'ellipsis-after',
      10,
    ])
  })

  it('emits ellipsis-before when the gap is on the left of current', () => {
    expect(getPageRange({ page: 9, pageCount: 10 })).toEqual([
      1,
      'ellipsis-before',
      7,
      8,
      9,
      10,
    ])
  })

  it('emits both ellipses when current is in the middle', () => {
    expect(getPageRange({ page: 10, pageCount: 20 })).toEqual([
      1,
      'ellipsis-before',
      8,
      9,
      10,
      11,
      12,
      'ellipsis-after',
      20,
    ])
  })

  it('fills a single-page gap with the missing page instead of an ellipsis', () => {
    expect(getPageRange({ page: 5, pageCount: 10 })).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      'ellipsis-after',
      10,
    ])
  })

  it('fills single-page gaps on both sides', () => {
    expect(getPageRange({ page: 4, pageCount: 8 })).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8,
    ])
  })

  it('respects pagesAroundCurrent', () => {
    expect(
      getPageRange({ page: 10, pageCount: 20, pagesAroundCurrent: 1 })
    ).toEqual([1, 'ellipsis-before', 9, 10, 11, 'ellipsis-after', 20])
  })

  it('respects pagesAtEdges', () => {
    expect(getPageRange({ page: 10, pageCount: 20, pagesAtEdges: 2 })).toEqual([
      1,
      2,
      'ellipsis-before',
      8,
      9,
      10,
      11,
      12,
      'ellipsis-after',
      19,
      20,
    ])
  })

  it('supports pagesAroundCurrent: 0', () => {
    expect(
      getPageRange({ page: 10, pageCount: 20, pagesAroundCurrent: 0 })
    ).toEqual([1, 'ellipsis-before', 10, 'ellipsis-after', 20])
  })

  it('supports pagesAtEdges: 0', () => {
    expect(getPageRange({ page: 10, pageCount: 20, pagesAtEdges: 0 })).toEqual([
      8, 9, 10, 11, 12,
    ])
  })
})
