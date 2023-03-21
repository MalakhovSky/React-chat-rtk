import {Link} from "react-router-dom";
import style from './Form.module.scss'
import {useState} from "react";

export const Form = ({title,handleClick}) =>{
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    return(
        <div className={style.login}>
            <div>
                <input type='email'
                       value={email}
                       onChange={(e)=> setEmail(e.target.value)}
                       placeholder='Введите имя...'/>
            </div>
            <div>
                <input type='password'
                       value={pass}
                       onChange={(e)=> setPass(e.target.value)}
                       placeholder='Введите пороль...'/>
                    <Link to='/registerScreen'>
                    <div onClick={()=>handleClick(email,pass)} className={style.reg}>
                        {title}
                    </div>
                   </Link>
            </div>
        </div>
    )
}


