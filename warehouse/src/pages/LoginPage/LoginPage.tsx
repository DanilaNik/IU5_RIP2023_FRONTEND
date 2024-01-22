import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Header from '../../components/Header';
import styles from './LoginPage.module.scss'
import { api } from '../../api';
import { useState } from 'react';
import { AppDispatch, RootState } from '../../components/state/state';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setEmail, setId, setLogin, setName, setRole,  } from '../../components/state/user/user';



const LoginPage: React.FC = () => {
    //const login = useSelector((state: RootState) => state.user.login)
    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()
    const [login, setUserLogin] = useState("")
    const [password, setPassword] = useState("")

    const currentPage = useSelector((state: RootState) => state.user.currentPage)
    dispatch(setCurrentPage('Регистрация'))

    const handleFormSubmit = async(event) => {
        event.preventDefault()
        console.log(login)
        console.log(password)
        const { data } = await api.login.loginCreate({
            login: login,
            password: password,
        }, {
            withCredentials: true 
        });

        dispatch(setLogin(data.login))
        dispatch(setName(data.userName))
        dispatch(setId(data?.id))
        dispatch(setRole(String(data.role)))
        dispatch(setEmail(data.email))
        
        console.log(data)
        navigate("/")
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
                    <h3 className={styles.content__title}>Вход</h3>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="text" placeholder="Логин..." onChange={(e)=>{
                                setUserLogin(e.target.value)
                            }} required/>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="password" placeholder="Пароль..." onChange={(e)=>{
                                setPassword(e.target.value)
                            }} required/>
                        </Form.Group>
                    </div>
                    
                    <Button type='submit' style={{backgroundColor: "#2787F5", padding: "10px 20px", borderColor: "#000", fontSize: 18, height: 50}}>Войти</Button>
                    <Link className={styles.content__link} to='/registration'>У вас еще нет аккаунта?</Link>
                </Form>
            </div>
        </div>
    )
};
  
export default LoginPage;

function setUserName(userName: string | undefined): any {
    throw new Error('Function not implemented.');
}
