import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB5w2vI011mPiblium-S-1kIIJx9Gr55jQ",
    authDomain: "gumzoke.firebaseapp.com",
    databaseURL: "https://gumzoke.firebaseio.com",
    projectId: "gumzoke",
    storageBucket: "gumzoke.appspot.com",
    messagingSenderId: "626454045165",
    appId: "1:626454045165:web:f503a7de6061aebfda87e4",
    measurementId: "G-TPR9TC4JED"
};

interface ChatMessage {
    userName: string,
    message: string
    uuid: string
}
type callback = (data: Array<ChatMessage>) => void

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export const useSaveMessage = async (message: ChatMessage) => {
    const uuid: string | null = localStorage.getItem('uuid')
    message.uuid = uuid || ''
    return await push(ref(db, '/chats/general'), message)
}

export const useListenRealtimeDb = async (callback: callback) => {
    const messagesRef = ref(db, 'chats/general');
    onValue(messagesRef, (snapshot) => {
        const data = snapshot;
        const msgs: Array<ChatMessage> = []
        data.forEach(msg => {
            const val: ChatMessage = msg.val()
            msgs.push(val)
        })

        callback(msgs)
    });
}
