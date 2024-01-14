import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import ProfileIcon from '../Icons/ProfileIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/state';
import { Button } from 'react-bootstrap';
import { api } from '../../api';
import { setLogin, setName, setId, setRole, setEmail } from '../state/user/user';

const Header: React.FC = () => {
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
    }

    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link to='/' className={styles.header__logo}>Alizon fulfillment</Link>

                <div className={styles.header__blocks}>
                    <Link className={styles.header__block} to='/'>Комплектующие</Link>
                    <Link className={styles.header__block} to='/orders'>Мои заявки</Link>
                    {/* Добавить картинку корзины */}
                    {
                        orderID != 0 && login != '' && <Link className={styles.header__block} to={'/orders/' + orderID}>Корзина</Link>  
                    }
                    {
                        orderID == 0 && login != '' && <div style={{color:"#777"}}  className={styles.header__block}> Моя заявка</div>
                    }
                </div>

                {login != '' && <div className={styles.header__block}>{login}</div>}
                <span> </span>
                {login != '' && <Button style={{margin: "10px"}} onClick={()=>{
                    logout()
                }}>Выйти</Button>}
                {login == '' && <Link to='/registration' className={styles.header__profile}><ProfileIcon/></Link>}
                
            </div>
        </div>
    )
};

export default Header;