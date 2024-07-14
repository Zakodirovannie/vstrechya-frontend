import React, {useEffect, useState} from "react";
import styles from './NavBar.module.css';
import black_logo from '../../assets/black-icon.png'
import miniProfile from '../../assets/mini-profile.png'
import settingsToggle from '../../assets/settings_toggle.png'
import settings from '../../assets/settings.png';
import theme from '../../assets/theme.png';
import logoutImg from '../../assets/logout.png';
import {useDispatch, useSelector} from "react-redux";
import {getMyInfo, logout} from "../../api.auth";
import {setImage} from "../../redux/UserSlice/UserSlice";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const BASE_URL = 'https://kit.vstrechya.space/'
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth);
    const userImage = useSelector(state => state.user.image);
    const navigate = useNavigate()
    const [menuActive, setMenuActive] = useState(false);
    const [settingsActive, setSettingsActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const toggleSettings = () => {
        setSettingsActive(!settingsActive);
    }
    const handleLogOut = (e) => {
        e.preventDefault();
        logout()
        navigate('/login')
    }

    useEffect(() => {
        const fetchData = async () => {
            await getMyInfo()
                .then(res => dispatch(setImage(res.data.image_url)))
                .catch(err => console.log('Error: ', err));
        }
        fetchData()
    }, [isAuth]);
    return <>
        <header>
            <nav className={styles.navbar}>
                <a className={styles.home} href="/"><img src={black_logo} width="240" alt='Home'/> </a>
                <ul className={`${styles.navigation} ${menuActive ? styles.active : ''}`}>
                    <li>
                        <button className={styles.navButtons} onClick={() => navigate("/exhibitions")}>КАТАЛОГ
                            ВЫСТАВОК
                        </button>
                    </li>

                    <li>
                        <button className={styles.navButtons} onClick={() => navigate("/collections")}>ХРАНИЛИЩЕ
                            КОЛЛЕКЦИЙ
                        </button>
                    </li>
                    <li>
                        <button className={styles.navButtons} onClick={() => window.location.assign(`${BASE_URL}`)}>КОНСТРУКТОР ВЫСТАВОК
                        </button>
                    </li>
                    <li>
                        <button className={styles.navButtons} onClick={() => navigate("/")}>СОЦИАЛЬНЫЕ СЕТИ</button>
                    </li>
                    {isAuth ?
                        <div>
                            <a className={styles.profile} href="/profile">
                                <img className={styles.profile_img} src={userImage ? userImage : miniProfile}
                                     alt='Home'/>
                            </a>
                            <button className={styles.settingsToggle} onClick={toggleSettings}>
                                <img src={settingsToggle} alt={'Настройки'}/>
                            </button>
                            <div className={`${settingsActive ? '' : styles.hidden} ${styles.settings}`}>
                                <div style={{marginTop: 22 + 'px'}}>
                                    <button className={styles.settingsButton} onClick={() => navigate('/settings')}>
                                        <img src={settings} alt={'Настройки'}/> <span>Настройки</span>
                                    </button>
                                    <button className={styles.settingsButton}>
                                        <img src={theme} alt={'Тема'}/> <span>Тема</span>
                                    </button>
                                    <button className={styles.settingsButton} onClick={(e) => handleLogOut(e)}>
                                        <img src={logoutImg} alt={'Выйти'}/> <span>Выйти</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.loginBox}>
                            <a className={styles.loginButton} href="/login">ВХОД</a>
                        </div>
                    }
                </ul>
            </nav>
            {/*<div className={styles.line}></div>*/}
            <button className={styles.menu_toggle} aria-label="Open Navigation Menu" onClick={toggleMenu}>
                ☰
            </button>
        </header>
    </>
}

export default NavBar;
