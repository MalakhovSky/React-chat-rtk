import style from './Message.module.scss'
import {useAuth} from "../../hooks/use-auth";


export const Message = ({message}) => {
    const {id} = useAuth();
    const isUser = id === message.uid ? `${style.user}` : `${style.friend}`
    console.log(isUser, id, message.uid, 'baza')


    return (
        <div className={style.container}>
            <div className={`${isUser}`}>
                <img src={message.photoURL} alt="avatar"/>
                <div className={style.name}>{message.displayName}</div>

                <div className={style.text}>
                    {message.text}
                </div>
            </div>
        </div>
    )
}