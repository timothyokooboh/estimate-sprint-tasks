import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { PARTICIPANT_NAME, SESSION_TITLE } from '@/constants'

export const useCreateSessionFormValidation = () => {
  // Creates a typed schema for vee-validate
  const schema = toTypedSchema(
    z.object({
      sessionTitle: z
        .string({ message: 'Kindly enter the session title' })
        .min(1, { message: 'Kindly enter the session title' })
        .default(localStorage.getItem(SESSION_TITLE) ?? ''),

      rememberSessionTitle: z.boolean().default(!!localStorage.getItem(SESSION_TITLE) ?? false),
      moderatorName: z
        .string({ message: 'Kindly enter your name' })
        .min(1, { message: 'Kindly enter your name' })
        .default(localStorage.getItem(PARTICIPANT_NAME) ?? ''),
      rememberModeratorName: z.boolean().default(!!localStorage.getItem(PARTICIPANT_NAME) ?? false)
    })
  )

  const { errors, defineField, values, handleSubmit } = useForm({
    validationSchema: schema
  })

  const [sessionTitle, sessionTitleAttrs] = defineField('sessionTitle')
  const [moderatorName, moderatorNameAttrs] = defineField('moderatorName')
  const [rememberSessionTitle, rememberSessionTitleAttrs] = defineField('rememberSessionTitle')
  const [rememberModeratorName, rememberModeratorNameAttrs] = defineField('rememberModeratorName')

  return {
    errors,
    values,
    handleSubmit,
    sessionTitle,
    sessionTitleAttrs,
    moderatorName,
    moderatorNameAttrs,
    rememberModeratorName,
    rememberModeratorNameAttrs,
    rememberSessionTitle,
    rememberSessionTitleAttrs
  }
}
