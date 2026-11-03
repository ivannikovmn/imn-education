import { describe, expect, it } from 'vitest'
import reducer, {
  appendApply,
  removeApply,
  setApplyStatus,
} from './applySlice'

describe('applySlice', () => {
  it('adds an application to the list', () => {
    const initialState = {
      applies: [{ id: 1, status: 'NEW' }],
      apply: {},
    }

    const result = reducer(
      initialState,
      appendApply({ id: 2, status: 'NEW' })
    )

    expect(result.applies).toHaveLength(2)
    expect(result.applies[1]).toEqual({
      id: 2,
      status: 'NEW',
    })
  })

  it('removes an application by id', () => {
    const initialState = {
      applies: [
        { id: 1, status: 'NEW' },
        { id: 2, status: 'NEW' },
      ],
      apply: {},
    }

    const result = reducer(initialState, removeApply(1))

    expect(result.applies).toEqual([
      { id: 2, status: 'NEW' },
    ])
  })

  it('updates the status of the matching application', () => {
    const initialState = {
      applies: [
        { id: 1, status: 'NEW' },
        { id: 2, status: 'NEW' },
      ],
      apply: {},
    }

    const result = reducer(
      initialState,
      setApplyStatus({
        applyId: 2,
        status: 'ATTENDED',
      })
    )

    expect(result.applies).toEqual([
      { id: 1, status: 'NEW' },
      { id: 2, status: 'ATTENDED' },
    ])
  })
})