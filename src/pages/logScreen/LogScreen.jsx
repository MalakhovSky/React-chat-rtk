import style from './LogScreen.module.scss';
import {Form} from "../../components/form/Form";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/features/user/userSlice";
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider   } from "firebase/auth";
import {useNavigate} from "react-router-dom";


export const LogScreen = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (email,password) =>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
            .then(({user})=>{
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate('/')
            })
            .then(console.error)
    }

    const loginGoole = () =>{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {const credential =
                GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: token,
                }))
                console.log(user)
                navigate('/')
            })
    }



    return(
        <div className={style.container}>
            <div className={style.title}>
                CHAT-REACT-RTK
            </div>
            <Form
                handleClick={handleLogin}
                title='Войти'/>

            <div className={style.google}>
                <div >
                    Войдите с помощью Google аккаунта
                </div>
                <div
                    onClick={loginGoole}
                    className={style.btn}>
                    Войти
                </div>
            </div>
        </div>
    )
}