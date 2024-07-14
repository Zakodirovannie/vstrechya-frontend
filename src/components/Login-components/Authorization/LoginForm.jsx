import React, {useState} from "react";
import styles from './LoginForm.module.css'
import exit from '../../../assets/exit.png'
import vkIcon from '../../../assets/vkIcon.png'
import {login} from "../../../api.auth";
import {useDispatch} from "react-redux";
import {setAuth} from "../../../redux/AuthSlice/AuthSlice";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../../../cookie";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [accessToken, setAccessToken] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async(evt) => {
        evt.preventDefault()
        try {
            await login(email, password)
            setIsLogin(true)
            setIsError(false)
            setAccessToken(getCookie('access_token'))
            console.log('12345 ', getCookie('access_token'))
            dispatch(setAuth(accessToken !== null))
            navigate('/profile')
        } catch (e) {
            if (e.response && (e.response.status === 401 || e.response.status === 400)) {
                setIsError(true);
                setErrorMessage(e.response.data.detail==='Не найдено активной учетной записи с указанными данными'? 'Неправильный E-mail или пароль'
                    : "Произошла непредвиденная ошибка");
            } else {
                console.log('Error: ' + e);
            }
            setIsLogin(false);
        } finally {
            console.log("Access: ", accessToken);
            setIsLogin(false)
        }

    }
    return <>
        <div className={styles.form_container}>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                <a href="/" className={styles.exit}><img src={exit} alt="user" width={16} height={16} /></a>
                <h1 className={styles.title}>Вход</h1>
                <div  className={styles.inputLabel}>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={styles.input}
                        required
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div  className={styles.inputLabel}>
                    <label htmlFor='password'>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={styles.input}
                        required
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button className={styles.login} type="submit">Войти</button>
                <a  href="/signup" className={styles.signup}>Регистрация</a>
                <button className={styles.vkAuth} type={"button"}
                        onClick={() => window.location.assign('https://engine.vstrechya.space/login/vk-oauth2/')}>
                    <img className={styles.vkIcon} src={vkIcon} alt={'VK'}/>
                    <p>Вход через VK</p>
                </button>
                {isLogin && <span className={styles.success}>Вы успешно вошли в аккаунт</span>}
                {isError && <span className={styles.error}>{errorMessage}</span>}
            </form>
        </div>
    </>
}

export default LoginForm;
