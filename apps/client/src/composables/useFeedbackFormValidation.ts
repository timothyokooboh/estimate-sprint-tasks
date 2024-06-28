import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const useFeedbackFormValidation = () => {
  // Creates a typed schema for vee-validate
  const schema = toTypedSchema(
    z.object({
      email: z
        .string({ message: 'Kindly enter your email address' })
        .email({ message: 'Kindly enter a valid email' }),
      fullName: z
        .string({ message: 'Kindly enter your full name' })
        .min(1, { message: 'Kindly enter your full name' }),
      message: z
        .string({ message: 'Kindly enter your message' })
        .min(1, { message: 'Kindly enter your message' })
    })
  )

  const { errors, defineField, values, handleSubmit } = useForm({
    validationSchema: schema
  })

  const [email, emailAttrs] = defineField('email')
  const [fullName, fullNameAttrs] = defineField('fullName')
  const [message, messageAttrs] = defineField('message')

  return {
    errors,
    values,
    handleSubmit,
    email,
    emailAttrs,
    fullName,
    fullNameAttrs,
    message,
    messageAttrs
  }
}
