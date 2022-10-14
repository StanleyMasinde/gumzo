<template>
  <div v-if="!userName" class="h-screen grid place-items-center">
    <div class="flex flex-col gap-3">
      <div>
        <label for="username">Pick a chat name</label>
        <input v-model="newUserName" autofocus class="w-full rounded-lg focus:border-primary" type="text">
      </div>
      <button @click.prevent="saveUser" :disabled="newUserName.length < 3"
        class="bg-primary rounded-lg text-white py-2 disabled:bg-primary/50">Let's go!</button>
    </div>
  </div>

  <div v-else>
    <div class="flex flex-col justify-end gap-2 mb-16 mx-1">
      <div
        class="border-2 text-right text-white bg-primary rounded-2xl px-2 py-3 self-end border-primary shadow-primary"
        v-for="m in messages">
        <h1>{{ m.userName }}</h1>
        <p>{{ m.message }}</p>
      </div>
      <div ref="bottom" class="mb-12"></div>
    </div>
    <!--Bottom chat input box-->
    <div class="fixed inset-x-1 bottom-1 place-items-center">
      <div action="#" method="post" class="grid gap-1 grid-rows-1 grid-cols-5">
        <div class="col-span-4">
          <textarea v-model="message" placeholder="Say something..."
            class="w-full rounded-l-lg placeholder:italic focus:border-primary" autofocus name="chat" rows="1"
            id="chat"></textarea>
        </div>
        <div>
          <button @click.prevent="sendMessage" :disabled="!message"
            class="w-full flex justify-center align-middle bg-primary text-white rounded-r-lg disabled:bg-primary/50"
            type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-11">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Bottom chat input box-->
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { useListenRealtimeDb, useSaveMessage } from '../src/composables'

interface Message {
  userName: string,
  message: string
}

const newUserName: Ref<string> = ref('')
const messages: Ref<Array<Message>> = ref([])
const bottom: Ref<HTMLElement | undefined> = ref()
const userName: Ref<string | undefined> = ref('')
const message: Ref<string> = ref('')
function sendMessage(event: MouseEvent) {
  try {
    (async function () {
     await useSaveMessage({
      message: message.value,
      userName: userName.value || ''
     })
     console.log(message);
     
     message.value = '';
    })();
    return event
  } catch (error) {
    console.log(error);
  }
}
function saveUser(event: MouseEvent) {
  localStorage.setItem('username', newUserName.value)
  userName.value = newUserName.value
  return event
}

const onNewMessageCallback = (message: Array<Message>) => {
  messages.value = message
  bottom.value?.scrollIntoView()
}

onMounted(() => {
  useListenRealtimeDb(onNewMessageCallback)
  userName.value = localStorage.getItem('username') || ''
})
</script>