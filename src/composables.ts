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
    timestamp: number
}
type callback = (data: Array<ChatMessage>) => void

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export const useSaveMessage = async (message: ChatMessage) => {
    const uuid: string | null = localStorage.getItem('uuid')
    message.uuid = uuid || ''
    message.timestamp = Date.now()
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

export const useFormatTimestamp = (timestamp: number | undefined): string => {
    if (!timestamp) return '';

    const messageDate = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());

    const timeDiff = today.getTime() - messageDay.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    const timeString = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Today
    if (messageDay.getTime() === today.getTime()) {
        return timeString;
    }

    // Yesterday
    if (messageDay.getTime() === yesterday.getTime()) {
        return `Yesterday at ${timeString}`;
    }

    // Within the last week (2-6 days ago)
    if (daysDiff < 7) {
        return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }

    // Older than a week
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
}

