import './App.css';
import {LogScreen} from "./pages/logScreen/LogScreen";
import {Route, Routes, Navigate} from "react-router-dom";
import {MainWindow} from "./pages/mainWindow/MainWindow";
import {useDispatch} from "react-redux";
import {RegisterScreen} from "./pages/registerScreen/RegisterScreen";
import {useAuth} from "./hooks/use-auth";



function App() {
    const dispatch = useDispatch();
    const {isAuth,email} = useAuth()




    return isAuth ?
        (
            <div className='container'>
                <Routes>
                    <Route path='/mainWindow' element={<MainWindow/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/mainWindow" replace />} //redirect
                    />
                </Routes>

            </div>
        ) : (
            <div className='container'>
                <Routes>
                    <Route path='/logScreen' element={<LogScreen/>}/>
                    <Route path='/registerScreen' element={<RegisterScreen/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/logScreen" replace />}//redirect
                    />
                </Routes>

            </div>
        )
}

export default App;
