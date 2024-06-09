import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const useCreateTaskFormValidation = () => {
  // Creates a typed schema for vee-validate
  const schema = toTypedSchema(
    z.object({
      title: z
        .string({ message: 'Kindly enter the task title' })
        .min(1, { message: 'Kindly enter the task title' })
    })
  )

  const { errors, defineField, values, handleSubmit } = useForm({
    validationSchema: schema
  })

  const [title, titleAttrs] = defineField('title')

  return {
    errors,
    values,
    handleSubmit,
    title,
    titleAttrs
  }
}
