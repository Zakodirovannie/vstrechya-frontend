import React, {useEffect, useState} from "react";
import styles from "./Profile.module.scss";
import image from '../../../assets/profileImg.svg'
import {getMyInfo} from "../../../api.auth";
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        id: NaN,
        email: "",
        first_name: "",
        last_name: "",
        image_url: "",
        password: "",
        phone: "",
    })
    useEffect(()=>{
        const fetchData = async() =>{
            const response = await getMyInfo();
            setUser(response.data)
        }
        fetchData()
    }, [])

    return <>
        <div className={styles.profileSection}>
            <div className={styles.profileSectionFlexCol}>
                <h1 className={styles.profileTitle}>Профиль</h1>

                <div className={styles.profileContentBox}>
                    <div className={styles.profileFlexCol1}>
                        <div className={styles.profileFlexRow}>
                            <div className={styles.profileFlexCol2}>
                                <div className={styles.profileFlexCol3}>
                                    <label htmlFor='last_name' className={styles.inputLabel}>ФИО</label>
                                    <p className={styles.input}>{user.first_name} {user.last_name}</p>
                                    <hr className={styles.profileLine1} size={1}/>
                                </div>

                                <div className={styles.profileFlexCol3}>
                                    <label htmlFor='email' className={styles.inputLabel}>E-mail</label>
                                    <p className={styles.input}>{user.email}</p>
                                    <hr className={styles.profileLine1} size={1}/>
                                </div>

                                <div className={styles.profileFlexCol3}>
                                    <label htmlFor='phone' className={styles.inputLabel}>Контактный номер</label>
                                    <p className={styles.input}>{user.phone}</p>
                                    <hr className={styles.profileLine1} size={1}/>
                                </div>
                            </div>
                            <div className={styles.profileFlexCol5}>
                                <img
                                    className={styles.profileImage}
                                    src={user.image_url ? user.image_url : image}
                                    alt="Аватарка"
                                />
                            </div>
                        </div>
                        <div className={styles.navContainer}>
                            <button className={styles.navButton} onClick={() => navigate('/me/collections')}>К моим
                                коллекциям
                            </button>
                            <button className={styles.navButton}
                                    onClick={() => window.location.assign('https://kit.vstrechya.space/me/exhibitions')}>
                                К моим выставкам
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Profile;
  