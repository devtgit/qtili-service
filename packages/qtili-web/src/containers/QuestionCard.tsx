import React from 'react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { State } from '@/store/State'
import { AnswerChoices } from '@/containers/AnswerChoices'

export const QuestionCard = React.memo((props: { questionId: string }) => {
  const { questionId } = props
  const question = useAtomValue(State.questionAtomFamily(questionId))
  const { t } = useTranslation()

  if (!question) {
    // handle reset case
    return null
  }

  return (
    <div>
      <h3>
        {t('translate', {
          word: question.word,
        })}
      </h3>
      <AnswerChoices questionId={questionId} />
    </div>
  )
})
