<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import AppTransition from '@/components/AppTransition.vue'
import { Loader2 } from 'lucide-vue-next'
import { useAuth } from '@/store/useAuth'
import { storeToRefs } from 'pinia'

const { isLoggedIn, authUser, loading } = storeToRefs(useAuth())
const { login, logout } = useAuth()
</script>

<template>
  <header
    class="py-4 px-[20px] mb-[30px] flex justify-between items-center border-b-[2px] border-[#3E3E3E]"
  >
    <div class="flex items-center justify-center h-[35px] w-[35px] bg-white rounded-[50%]">
      <p class="text-[#161616] text-xs">Poker</p>
    </div>
    <div class="hidden sm:flex sm:flex-grow sm:justify-center">
      <h1 class="font-bold text-2xl font-mono">SprintPoker</h1>
    </div>

    <AppTransition>
      <div v-if="isLoggedIn" class="flex items-center">
        <img
          v-if="authUser?.user?.picture"
          :src="authUser?.user?.picture"
          width="30px"
          height="30px"
          class="rounded-[50%]"
        />
        <div v-else class="w-[30px] h-[30px] bg-white rounded-[50%]">
          {{ authUser?.user?.name?.[0] }} {{ authUser?.user?.name?.[1] }}
        </div>
        <Button variant="outline" class="ml-3" @click="logout">Sign out</Button>
      </div>
      <div v-else>
        <Button variant="outline" :disabled="loading" @click="login">
          <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
          Sign in with Google</Button
        >
      </div>
    </AppTransition>
  </header>
</template>
