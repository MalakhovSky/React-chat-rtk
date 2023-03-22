import style from './MainWindow.module.scss'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth} from "../../hooks/use-auth";
import {removeUser} from "../../redux/features/user/userSlice";
import {useEffect, useState} from "react";
import { getFirestore } from "firebase/firestore";
import {query,collection,orderBy,doc ,serverTimestamp,onSnapshot,addDoc} from 'firebase/firestore'
import {db} from "../../firebase";
import {Message} from "../../components/message/Message";




export const MainWindow = () =>{
    const dispatch = useDispatch();
    const {email,displayName,photoURL,id} = useAuth();
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);


    const sendMessage = async (e) =>{
        e.preventDefault()
        await addDoc(collection(db, "messages"), {
            uid:id,// положить и взять из логина гугла
            displayName:displayName,// положить и взять из логина гугла
            photoURL:photoURL, // положить и взять из логина гугла
            text:messageText,
            timestamp: serverTimestamp()

        });
        setMessageText('')
    }



    useEffect(()=>{
        async function fetchData(){

            const q = query(collection(db, "messages"),orderBy('timestamp'));
            const unsubscribe = onSnapshot(q,(querySnapshot)=>{
                let messages =[]
                querySnapshot.forEach((doc) => {
                    messages.push({...doc.data(),id: doc.id})
                });
                setMessages(messages)
            })
            return ()=> unsubscribe()

        }
        fetchData()

    },[])

    console.log(messages.timestamp,'messageges')







    return (
    <div className={style.container}>
        <Link to='/logScreen'>
            <div onClick={()=>dispatch(removeUser())} className={style.out}>
                Выйти из {email}
            </div>
        </Link>
        <div className={style.window}>
            {messages && messages.map((message)=>(
                <Message
                    key={message.id}
                    message={message}/>
                ))
            }

        </div>
        <div>
            <input type='text'
                   value={messageText}
                   onChange={(e)=> setMessageText(e.target.value)}
                   placeholder='Введите сообщение...'/>
            <button onClick={sendMessage} className={style.out}>Отправить</button>
        </div>

    </div>
    );


}