import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

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

interface Message {
    uuid?: string,
    userName: string,
    message: string
}
type callback = (data: Array<Message>) => void

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export const useSaveMessage = async (message: Message) => {
    const uuid: string | null = localStorage.getItem('uuid')
    if (uuid) {
        message.uuid = uuid
    } else {
        const newid: string = uuidv4()
        localStorage.setItem('uuid', newid)
        message.uuid = newid
    }
    return await push(ref(db, '/chats/general'), message)
}

export const useListenRealtimeDb = async (callback: callback) => {
    const messagesRef = ref(db, 'chats/general');
    onValue(messagesRef, (snapshot) => {
        const data = snapshot;
        const msgs: Array<Message> = []
        data.forEach(msg => {
            const val: Message = msg.val()
            msgs.push(val)
        })

        callback(msgs)
    });
}
