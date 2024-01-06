import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import ProfileIcon from '../Icons/ProfileIcon';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link to='/' className={styles.header__logo}>Alizon fulfillment</Link>

                <div className={styles.header__blocks}>
                    <Link className={styles.header__block} to='/'>Комплектующие</Link>
                    <Link className={styles.header__block} to='/'>Мои заявки</Link>
                </div>

                <Link to='/registration' className={styles.header__profile}><ProfileIcon/></Link>
            </div>
        </div>
    )
};

export default Header;