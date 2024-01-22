import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Header from '../../components/Header';
import styles from './RegistrationPage.module.scss'
import { useState } from 'react';
import { api } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../components/state/state';
import { setCurrentPage } from '../../components/state/user/user';

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")

    const currentPage = useSelector((state: RootState) => state.user.currentPage)
    dispatch(setCurrentPage('Регистрация'))

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await api.signup.signupCreate({
                login: login,
                userName: userName,
                email: email,
                password: password,
            }, {})
            alert("Вы зарегестрировались")
            navigate("/login")
        } catch (error) {
            alert("Ошибка на стороне сервера. Повторите позже")
        }

        console.log('Form was submitted')
    }

    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{position: 'relative'}}>
                <Form onSubmit={handleFormSubmit} className={styles['form-container']}>
                    <h3 className={styles.content__title}>Регистрация</h3>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={(e) => {setLogin(e.target.value)}} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="text" placeholder="Логин" required/>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control  onChange={(e) => {setUserName(e.target.value)}} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="text" placeholder="ФИО..." required/>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={(e) => {setEmail(e.target.value)}} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="email" placeholder="Email..." required/>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={(e) => {setPassword(e.target.value)}} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="password" placeholder="Пароль..." required/>
                        </Form.Group>
                    </div>
                    
                    <Button type='submit' className={styles['register-button']}>Зарегистрироваться</Button>
                    <Link className={styles.content__link} to='/login'>У вас уже есть аккаунт?</Link>
                </Form>
            </div>
        </div>
    )
};
  
export default MainPage;