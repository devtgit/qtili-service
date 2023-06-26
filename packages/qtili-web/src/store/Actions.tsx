import { useCallback } from 'react'
import { useAtomCallback } from 'jotai/utils'
import produce from 'immer'
import { State } from '@/store/State'
import { UIState } from '@/store/UIState'
import { StatState } from '@/store/StatState'
import { getLesson } from '@/api'

export const Actions = new (class {
  useStartLesson = () =>
    useAtomCallback(
      useCallback(async (get, set) => {
        set(UIState.lessonMode, true)

        const lessonPromise = getLesson()

        set(State.initialized, lessonPromise)

        const lesson = await lessonPromise

        set(State.questionsOrdering, lesson.questionsOrdering)
        set(State.questions, lesson.questionsRecord)
      }, [])
    )

  useToNextQuestion = () => {
    const resetState = this.useResetState()

    return useAtomCallback(
      useCallback((get, set) => {
        const lessonPageType = get(State.lessonPageType)

        if (lessonPageType.type === 'result') {
          set(UIState.lessonMode, false)
          resetState()
          return
        }

        const count = get(State.questionsCount)
        const currentQuestionIndex = get(State.currentQuestionIndex)

        if (currentQuestionIndex < count - 1) {
          set(State.currentQuestionIndex, (index) =>
            Math.min(count - 1, index + 1)
          )
          return
        }

        const correctCount = get(State.correctCount)
        const score = Math.floor((correctCount / count) * 100)

        set(State.lessonPageType, { type: 'result', score })
        set(StatState.lessonsCount, (x) => x + 1)
      }, [])
    )
  }

  useToPreviousQuestion = () =>
    useAtomCallback(
      useCallback((get, set) => {
        set(State.currentQuestionIndex, (index) => Math.max(0, index - 1))
      }, [])
    )

  useSetAnswer = () =>
    useAtomCallback(
      useCallback((get, set, questionId: string, choiceId: string) => {
        set(
          State.answerAtomFamily(questionId),
          produce((draft) => {
            draft.selectedId = choiceId
          })
        )
      }, [])
    )

  useSubmitAnswer = () =>
    useAtomCallback(
      useCallback((get, set, questionId: string) => {
        const question = get(State.questionAtomFamily(questionId))
        const { correctChoiceId } = question

        set(
          State.answerAtomFamily(questionId),
          produce((draft) => {
            draft.isSubmitted = true
            draft.isCorrect = correctChoiceId === draft.selectedId
          })
        )
      }, [])
    )

  useExitLesson = () => {
    const resetState = this.useResetState()

    return useAtomCallback(
      useCallback((get, set) => {
        set(UIState.lessonMode, false)
        resetState()
      }, [])
    )
  }

  useResetState = () =>
    useAtomCallback(
      useCallback((get, set) => {
        const ids = get(State.questionsOrdering)

        set(State.lessonPageType, { type: 'question' })
        set(State.questionsOrdering, [])
        set(State.questions, {})
        set(State.currentQuestionIndex, 0)

        for (const id of ids) {
          State.answerAtomFamily.remove(id)
          State.questionAtomFamily.remove(id)
        }
      }, [])
    )
})()
