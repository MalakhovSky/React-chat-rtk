import style from './MainWindow.module.scss'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth} from "../../hooks/use-auth";
import {removeUser} from "../../redux/features/user/userSlice";
import {useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { getFirestore } from "firebase/firestore";



export const MainWindow = () =>{
    const dispatch = useDispatch();
    const {isAuth,email} = useAuth();
    const [messageText, setMessageText] = useState('initState');



    const [messages,loading] = useCollectionData(
     getFirestore(app).collection('messages').orderBy('createdAt')
    )

    const sendMessage = async () =>{
        getFirestore().collection('messages').add({
            // uid:user.uid;// положить и взять из логина гугла
            // displayName:user.displayName;// положить и взять из логина гугла
            // photoURL:user.photoUrl; // положить и взять из логина гугла
            // text:messageText,
            // createdAt: firestore.FieldValue.serverTimestamp() // время серва
        })
        setMessageText('')
    }



    return (
    <div className={style.container}>
        <Link to='/logScreen'>
            <div onClick={()=>dispatch(removeUser())} className={style.out}>
                Выйти из {email}
            </div>
        </Link>
        <div className={style.window}>

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