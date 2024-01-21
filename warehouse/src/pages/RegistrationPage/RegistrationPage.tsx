import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Header from '../../components/Header';
import styles from './RegistrationPage.module.scss'
import { useState } from 'react';
import { api } from '../../api';
import { setCurrentPage } from '../../components/state/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../components/state/state';

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
            <div style={{position: 'relative'}}className={styles['content']}>
                <Form onSubmit={handleFormSubmit}
                style={{backgroundColor: '#fff', width: '50%', padding: '60px 40px',
                margin: '0 auto', display: 'flex', flexDirection: 'column',
                boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)', borderRadius: '10px'}}>
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
                    
                    <Button type='submit' style={{backgroundColor: "#232F3E", padding: "10px 20px", borderColor: "#000", fontSize: 18, height: 50}}>Зарегистрироваться</Button>
                    <Link className={styles.content__link} to='/login'>У вас уже есть аккаунт?</Link>
                </Form>
            </div>
        </div>
    )
};
  
export default MainPage;