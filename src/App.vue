<template>
  <!-- Welcome Screen -->
  <div v-if="!userName" class="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
    <div class="w-full max-w-md mx-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
        <div class="text-center space-y-2">
          <div class="w-16 h-16 bg-gradient-to-br from-primary to-cyan-400 rounded-full mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white">Welcome to Gumzo</h2>
          <p class="text-gray-600 dark:text-gray-400">Choose your display name to start chatting</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
            <input 
              v-model="newUserName" 
              autofocus 
              class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400" 
              type="text"
              placeholder="Enter your name..."
              @keyup.enter="newUserName.length >= 3 && saveUser($event)">
          </div>
          <button 
            @click.prevent="saveUser" 
            :disabled="newUserName.length < 3"
            class="w-full bg-gradient-to-r from-primary to-cyan-400 hover:from-cyan-500 hover:to-primary text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
            Let's Chat! 🚀
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Chat Interface -->
  <div v-else class="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary to-cyan-400 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800 dark:text-white">Gumzo Chat</h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ userName }}
        </div>
      </div>
    </div>

    <!-- Messages Container -->
    <div class="flex-1 overflow-y-auto px-4 py-6">
      <div class="max-w-4xl mx-auto space-y-4">
        <div 
          v-for="(m, index) in messages" 
          :key="index"
          :class="[uuid == m.uuid ? 'justify-end' : 'justify-start']"
          class="flex gap-2 animate-fade-in">
          
          <!-- Avatar for other users -->
          <div v-if="uuid != m.uuid" class="flex-shrink-0">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
              {{ m.userName.charAt(0).toUpperCase() }}
            </div>
          </div>

          <!-- Message Bubble -->
          <div :class="[
            uuid == m.uuid 
              ? 'bg-gradient-to-br from-primary to-cyan-400 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' 
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-2xl rounded-tr-2xl rounded-br-2xl shadow-md'
          ]" class="max-w-[70%] px-4 py-3 break-words transition-all hover:shadow-lg">
            <p v-if="uuid != m.uuid" class="font-semibold text-sm mb-1" :class="uuid == m.uuid ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'">
              {{ m.userName }}
            </p>
            <p class="text-[15px] leading-relaxed">{{ m.message }}</p>
            <p class="text-xs mt-1 opacity-70">
              {{ useFormatTimestamp(m.timestamp) }}
            </p>
          </div>

          <!-- Avatar for current user -->
          <div v-if="uuid == m.uuid" class="flex-shrink-0">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
              {{ m.userName.charAt(0).toUpperCase() }}
            </div>
          </div>
        </div>
        <div ref="bottom" class="h-4"></div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4 shadow-lg">
      <div class="max-w-4xl mx-auto">
        <div class="flex gap-3 items-end">
          <div class="flex-1 relative">
            <textarea 
              v-model="message" 
              placeholder="Type your message..."
              class="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all resize-none max-h-32" 
              autofocus 
              name="chat" 
              rows="1"
              @keydown.enter.exact.prevent="message.trim() && sendMessage($event)"
              @input="autoResize"
              id="chat"></textarea>
          </div>
          <button 
            @click.prevent="sendMessage" 
            :disabled="!message.trim()"
            class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary to-cyan-400 hover:from-cyan-500 hover:to-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
            type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, nextTick } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useListenRealtimeDb, useSaveMessage, useFormatTimestamp } from '../src/composables'

interface ChatMessage {
  uuid: string,
  userName: string,
  message: string,
  timestamp?: number
}

const newUserName: Ref<string> = ref('')
const messages: Ref<Array<ChatMessage>> = ref([])
const bottom: Ref<HTMLElement | undefined> = ref()
const userName: Ref<string | undefined> = ref('')
const message: Ref<string> = ref('')
const uuid: Ref<string | null> = ref('')

function sendMessage(event: MouseEvent | KeyboardEvent) {
  const trimmedMessage = message.value.trim()
  if (!trimmedMessage) return

  try {
    (async function () {
      await useSaveMessage({
        uuid: uuid.value || '',
        message: trimmedMessage,
        userName: userName.value || '',
        timestamp: Date.now()
      })
      message.value = '';
      // Reset textarea height
      const textarea = document.getElementById('chat') as HTMLTextAreaElement
      if (textarea) {
        textarea.style.height = 'auto'
      }
    })();
    return event
  } catch (error) {
    console.log(error);
  }
}

function saveUser(event?: MouseEvent | KeyboardEvent) {
  localStorage.setItem('username', newUserName.value)
  userName.value = newUserName.value
  return event
}

function autoResize(event: Event) {
  const textarea = event.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px'
}

const onNewMessageCallback = async (newMessages: Array<ChatMessage>) => {
  messages.value = newMessages
  await nextTick()
  bottom.value?.scrollIntoView({ behavior: 'smooth', block: 'end' })
}

onMounted(() => {
  useListenRealtimeDb(onNewMessageCallback)
  userName.value = localStorage.getItem('username') || ''
  const currentUId = localStorage.getItem('uuid')
  if (currentUId) {
    uuid.value = currentUId
  } else {
    const newId = uuidv4()
    uuid.value = newId
    localStorage.setItem('uuid', newId)
  }
})
</script>