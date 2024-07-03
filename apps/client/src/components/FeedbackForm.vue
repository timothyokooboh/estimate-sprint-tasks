<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import { useFeedbackFormMutation } from '@/composables/useFeedbackFormMutation'
import { useFeedbackFormValidation } from '@/composables/useFeedbackFormValidation'
import { Loader2 } from 'lucide-vue-next'

const { toast } = useToast()
const { fullName, fullNameAttrs, email, emailAttrs, message, messageAttrs, errors, handleSubmit } =
  useFeedbackFormValidation()
const { sendFeedback, loading, onDone } = useFeedbackFormMutation()

const submit = handleSubmit((values) => {
  sendFeedback({
    input: { fullName: values['fullName'], email: values['email'], message: values['message'] }
  })
})

onDone(() => {
  toast({
    title: 'Feedback sent',
    description: 'Thank you for your feedback!'
  })
})
</script>

<template>
  <form @submit.prevent="submit">
    <div class="mb-4">
      <Label for="name" class="block mb-1">Your name</Label>
      <Input
        id="name"
        placeholder="e.g. John Doe"
        class="bg-[#161616] border-0 mb-1"
        v-model="fullName"
        v-bind="fullNameAttrs"
      />
      <p v-if="errors['fullName']" class="text-sm text-red-400">{{ errors['fullName'] }}</p>
    </div>

    <div class="mb-4">
      <Label for="email" class="block mb-1">Your email address</Label>
      <Input
        id="email"
        placeholder="e.g. John Doe"
        class="bg-[#161616] border-0 mb-1"
        v-model="email"
        v-bind="emailAttrs"
      />
      <p v-if="errors['email']" class="text-sm text-red-400">{{ errors['email'] }}</p>
    </div>

    <div class="mb-6">
      <Label for="feedback" class="block mb-1">Your feedback</Label>
      <Textarea
        id="feedback"
        maxlength="500"
        placeholder="Type your feedback here"
        class="bg-[#161616] border-0 mb-1 resize-none"
        v-model="message"
        v-bind="messageAttrs"
      />
      <p v-if="errors['message']" class="text-sm text-red-400">{{ errors['message'] }}</p>
    </div>

    <Button type="submit" :disabled="loading" class="w-full rounded-[27px]">
      <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
      Send
    </Button>
  </form>
</template>
