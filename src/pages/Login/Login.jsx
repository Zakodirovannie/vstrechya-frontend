import React from "react";
import styles from './Login.module.css'
import LoginForm from "../../components/Login-components/Authorization/LoginForm";
import main_image from '../../assets/main_image.png'

const Auth = () => {
    return <>
        <div className={styles.main}>
            <img className={styles.image7} src={main_image} alt='Pictures'/>
            <LoginForm className={styles.login_form} />
        </div>
    </>
}
export default  Auth;
