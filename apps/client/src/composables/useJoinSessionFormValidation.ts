import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { PARTICIPANT_NAME } from '@/constants'

export const useJoinSessionFormValidation = () => {
  // Creates a typed schema for vee-validate
  const schema = toTypedSchema(
    z.object({
      name: z
        .string({ message: 'Kindly enter your name' })
        .min(1, { message: 'Kindly enter your name' })
        .default(localStorage.getItem(PARTICIPANT_NAME) ?? ''),
      rememberName: z.boolean().default(!!localStorage.getItem(PARTICIPANT_NAME) || false)
    })
  )

  const { errors, defineField, values, handleSubmit } = useForm({
    validationSchema: schema
  })

  const [name, nameAttrs] = defineField('name')
  const [rememberName, rememberNameAttrs] = defineField('rememberName')

  return {
    errors,
    values,
    handleSubmit,
    name,
    nameAttrs,
    rememberName,
    rememberNameAttrs
  }
}
