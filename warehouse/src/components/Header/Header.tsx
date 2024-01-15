import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import ProfileIcon from '../Icons/ProfileIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/state';
import { Button } from 'react-bootstrap';
import { api } from '../../api';
import { setLogin, setName, setId, setRole, setEmail } from '../state/user/user';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const login = useSelector((state: RootState) => state.user.login)
    const orderID = useSelector((state: RootState) => state.user.orderID)
    const dispatch = useDispatch<AppDispatch>()
    
    const logout = async () => {
        await api.logout.logoutCreate({
            withCredentials: true
        })
        
        dispatch(setLogin(''))
        dispatch(setName(''))
        dispatch(setId(0))
        dispatch(setRole(''))
        dispatch(setEmail(''))

        navigate("/")
    }

    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link to='/' className={styles.header__logo}>Alizon fulfillment</Link>

                <div className={styles.header__blocks}>
                    <Link className={styles.header__block} to='/'>Комплектующие</Link>
                    {
                        login != '' && <Link className={styles.header__block} to='/orders'>Заявки</Link>
                    }
                    {/* Добавить картинку корзины */}
                    {
                        orderID != 0 && login != '' && <Link className={styles.header__block} to={'/orders/' + orderID}>Текущая заявка</Link>  
                    }
                    {
                        orderID == 0 && login != '' && <div style={{color:"#777"}}  className={styles.header__block}>Текущая заявка</div>
                    }
                </div>

                {login != '' && <div className={styles.header__block}>{login}</div>}
                <span> </span>
                {login != '' && <Button style={{margin: "10px", backgroundColor:"#232F3E"}} className={styles.btn} onClick={()=>{
                    logout()
                }}>Выйти</Button>}
                {login == '' && <Link to='/registration' className={styles.header__profile}><ProfileIcon/></Link>}
                
            </div>
        </div>
    )
};

export default Header;