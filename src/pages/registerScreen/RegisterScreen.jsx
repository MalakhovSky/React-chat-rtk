import style from './RegisterScreen.module.scss'
import {Form} from "../../components/form/Form";
import {useDispatch} from "react-redux";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {setUser} from "../../redux/features/user/userSlice";
import {useNavigate} from 'react-router-dom'

export const RegisterScreen = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (email,password) =>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,password)
            .then(({user})=>{
                console.log(user,"Юзер в регистерСкрине")
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate('/')
            })
            .then(console.error)


    }


    return(
        <div className={style.container}>
            <div className={style.title}>
                CHAT-REACT-RTK
            </div>
            <Form
                title='Регистрация'
                handleClick={handleRegister}
            />

        </div>
    )
}