import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import MainPage from '../pages/MainPage';
import DetaliedPage from '../pages/DetaliedPage';
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import { useEffect } from 'react';
import { api } from '../api';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../components/state/state';
import {  setName, setEmail, setId, setLogin, setRole } from '../components/state/user/user';
import OrderPage from '../pages/Order/Order';
import OrderListPage from '../pages/OrderList/OrderList';


function App() {
  const navigate = useNavigate();
  const login = useSelector((state: RootState) => state.user.login)
  const dispatch = useDispatch<AppDispatch>()
  const validate = async() => {
    try {
      const {data} = await api.validate.validateCreate({
        withCredentials: true,
      })
      dispatch(setLogin(String(data.login)))
      console.log("got dispatch login " +  login)
    } catch (error) {
      console.error("Error during validation: ", error);
      navigate("/");
    }
  }
    useEffect(()=> {
      validate()
      console.log("rendered")
    }, [])
    return (
      <div className='app'>
        {/* <HashRouter> */}
            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/items">
                  <Route path=":id" element={<DetaliedPage />} />
                </Route>

              
                <Route path="/orders/:id" element={<OrderPage />} />

                <Route path="/orders" element={<OrderListPage />} />


                <Route path='/registration' element={<RegistrationPage/>}></Route>
                <Route path='/login' element={<LoginPage/>}></Route>

            </Routes>
        {/* </HashRouter> */}
      </div>
    );
  }
  
export default App;