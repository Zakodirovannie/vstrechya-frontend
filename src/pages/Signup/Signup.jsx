import React from "react";
import styles from './Signup.module.css'
import Register from "../../components/Signup-components/Register/Register";
import main_image from "../../assets/main_image.png";

const Signup = () => {
    return <>
        <div className={styles.main}>
            <img className={styles.image7} src={main_image} alt='Pictures'/>
            <Register/>
        </div>
    </>
}
export default Signup;