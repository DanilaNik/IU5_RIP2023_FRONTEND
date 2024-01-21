import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import ProfileIcon from '../Icons/ProfileIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/state';
import { Button } from 'react-bootstrap';
import { api } from '../../api';
import { setLogin, setName, setId, setRole, setEmail, setCurrentPage, setOrderID, setTitle, setMaterial, setOrderStatus, setMinDate, setMaxDate, setOrderEmail } from '../state/user/user';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const login = useSelector((state: RootState) => state.user.login)
    const role = useSelector((state: RootState) => state.user.role)
    const orderID = useSelector((state: RootState) => state.user.orderID)
    const currentPage = useSelector((state: RootState) => state.user.currentPage)
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
        dispatch(setOrderID(0))
        dispatch(setTitle(''))
        dispatch(setMaterial(''))
        dispatch(setOrderStatus(''))
        dispatch(setCurrentPage(''))
        dispatch(setMinDate(''))
        dispatch(setMaxDate(''))
        dispatch(setOrderEmail(''))

        navigate("/")
        window.location.reload();
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
                    {
                        login != '' && role == 'Admin' && <Link className={styles.header__block} to='/items/edit'>Редактировать комплектующие</Link>
                    }
                    {
                        orderID != 0 && login != '' && currentPage != 'Текущая заявка' && <Link className={styles.header__block} onClick={() => {dispatch(setCurrentPage('Текущая заявка'))}} to={'/orders/' + orderID}>Текущая заявка</Link>  
                    }
                    {
                        orderID == 0 && login != '' && currentPage != 'Текущая заявка' && <div style={{color:"#777"}}  className={styles.header__block}>Текущая заявка</div>
                    }
                </div>

                {login != '' && <div className={styles.header__profile}>{login}</div>}
                
                {login != '' && <Button style={{margin: "10px", backgroundColor:"#232F3E"}} className={styles.btn} onClick={()=>{
                    logout()
                }}>Выйти</Button>}
                {login == '' && <Link to='/login' className={styles.header__profile}><ProfileIcon/></Link>}
                
            </div>
        </div>
    )
};

export default Header;