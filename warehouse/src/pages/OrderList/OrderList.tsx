import * as React from 'react';
import Header from '../../components/Header';
import BreadCrumbs from '../../components/BreadCrumbs';
import PositiveIcon from '../../components/Icons/PositiveIcon'
import NegativeIcon from '../../components/Icons/NegativeIcon';
import styles from './OrderList.module.scss'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetRequestsForAdminWithFiltersResponse } from '../../api/Api';
import { Button, Form, Table } from 'react-bootstrap';
import { useInterval } from './interval';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../components/state/state';
import { setCurrentPage, setOrderEmail, setMaxDate, setMinDate, setOrderStatus } from '../../components/state/user/user';
import moment from 'moment-timezone';

const OrderListPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const role = useSelector((state: RootState) => state.user.role)
    const orderStatus = useSelector((state: RootState) => state.user.orderStatus)
    const orderEmail = useSelector((state: RootState) => state.user.orderEmail)
    const minDate = useSelector((state: RootState) => state.user.minDate)
    const maxDate = useSelector((state: RootState) => state.user.maxDate)
    const [orders, setOrders] = useState<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetRequestsForAdminWithFiltersResponse>()

    
    const [linksMap, setLinksMap] = useState<Map<string, string>>(
        new Map<string, string>([['Домашняя страница', '/']])
    );


    const currentPage = useSelector((state: RootState) => state.user.currentPage)

    const mapStatus = (status: string) => {
        const statusMap = {
            "formed": "В обработке",
            "completed": "Принята",
            "rejected": "Отклонена",
        }
        return statusMap[status]
    };

    const formatDate = (date: string) => {
        const timeStartIndex = date.indexOf('T') + 1;
        let result = date.substring(0, 10) + " " + date.substring(timeStartIndex, timeStartIndex + 8)
        return result;
    }

    const getOrderList = async () => {
        dispatch(setCurrentPage('Заявки'))

        const { data } = await api.orders.ordersList({
            min_date: minDate,
            max_date: maxDate,
            status: orderStatus,
        },{
            withCredentials: true,
        })

        const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
        newLinksMap.set('Заявки', '/orders');
        setLinksMap(newLinksMap)

        data.requests?.sort(function compare( a, b ) {
            if ( Number(a.id) > Number(b.id) ){
              return -1;
            }
            if ( Number(a.id) < Number(b.id) ){
              return 1;
            }
            return 0;
        })

        if (orderEmail !== '') {
            data.requests = data.requests?.filter(request => request.userEmail && request.userEmail.includes(orderEmail));
        }
        
        setOrders(data)
        //setTimeout(getOrderList, 1000)
    };

    const approveOrder = async (orderID: number) => {
        await api.orders.approveUpdate(String(orderID),{
            status: 'completed',
        }, {
            withCredentials: true,
        });
    }

    const deleteOrder = async (orderID: number) => {
        await api.orders.approveUpdate(String(orderID),{
            status: 'rejected',
        }, {
            withCredentials: true,
        });
    }

    useInterval(() => {
        getOrderList()
    }, 1000);

    // useEffect(() => {
    //     getOrderList()
    // }, [orderEmail]);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{paddingTop: "90px"}}>
                <BreadCrumbs links={linksMap}/>
                <div style={{paddingBottom: '3%'}}>
                    {role == "Admin" &&
                        <div className={styles["content__search"]}>
                            <Form className="d-flex gap-3" onSubmit={handleFormSubmit}>
                                <div className='w-100'>
                                    <Form.Group style={{height: 70}} className='w-100 mb-3' controlId="search__sub.input__sub">
                                        <div style={{marginBottom: 10}}>
                                            Email пользователя
                                            <Form.Control style={{height: '100%', borderColor: '#3D348B', fontSize: 16}} value={orderEmail} onChange={e => {dispatch(setOrderEmail(e.target.value))}} type="text" placeholder="Введите Email пользователя..." />
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', width: '50%', marginBottom: 10}}>
                                            <div style= {{ width: '20%', flex: 1, marginRight: 10, height: '40px'}}>
                                                Статус заявки
                                                <Form.Select
                                                    value={orderStatus}
                                                    onChange={e => {
                                                        dispatch(setOrderStatus(e.target.value))
                                                    }}
                                                    aria-label="Выберите статус" className='mb-3' id='status'>
                                                    <option value="">Выберите статус</option>
                                                    <option value="formed">В обработке</option>
                                                    <option value="completed">Принята</option>
                                                    <option value="rejected">Отклонена</option>
                                                </Form.Select>
                                            </div>
                                            <div style={{ width: '30%', height: '40px', marginRight: 10}}>
                                                Начальная дата
                                                <Form.Control  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {dispatch(setMinDate(event.target.value))}} value={minDate} className={styles.form__input} type="date" placeholder="Начальная дата (Год-Месяц-День)*"  max={moment().tz(moment.tz.guess()).format('YYYY-MM-DD')}/>
                                            </div>
                                            <div style={{ width: '30%', height: '40px'}}>
                                                Конечная дата
                                                <Form.Control  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {dispatch(setMaxDate(event.target.value))}} value={maxDate} className={styles.form__input} type="date" placeholder="Конечная дата (Год-Месяц-День)*" max={moment().tz(moment.tz.guess()).format('YYYY-MM-DD')}/>
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>
                            </Form>
                        </div>
                    }
                    <Table bordered hover responsive="md" className="table w-100">
                        <thead>
                            <tr>
                            <th>№ заказа</th>
                            {role == "Admin" && <th>Email</th>}
                            {role == "Admin" && <th>ID админа</th>}
                            <th>Дата формирования</th>
                            <th>Дата выполнения</th>
                            <th>Статус</th>
                            <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.requests?.map((request, index) => (
                            <tr key={index}>
                                <td>{request.id}</td>
                                {role == "Admin" && <td>{request.userEmail}</td>}
                                {role == 'Admin' && request.adminID != 0 && <td>{request.adminID}</td>}
                                {role == 'Admin' && request.adminID == 0 && <td>-</td>}
                                <td>{formatDate(String(request.formationDate))}</td>
                                {request.status == 'completed' && <td>{formatDate(String(request.completionDate))}</td>}
                                {request.status != 'completed' && <td>-</td>}
                                <td>{mapStatus(String(request.status))}</td>
                                <td style={{display: 'flex', gap: '10px'}}>
                                    <Link to={"/orders/" + request.id}><Button className="noOutline" style={{backgroundColor: "#232F3E", borderColor: "#000"}}>Подробнее</Button></Link>
                                    {role == 'Admin' && request.status != 'completed' && request.status != 'rejected' &&
                                        <Button style={{width: '30px', height: '30px', borderRadius: '15px', padding: '5px', borderColor: "green"}} className="noOutline bg-success d-flex justify-content-center align-items-center" onClick={() => {approveOrder(Number(request.id))}}>
                                            <PositiveIcon />
                                        </Button>
                                    }
                                    {role == 'Admin' && request.status != 'completed' && request.status != 'rejected' &&       
                                        <Button style={{width: '30px', height: '30px', borderRadius: '15px', padding: '5px', borderColor: "red"}} className="noOutline bg-danger d-flex justify-content-center align-items-center" onClick={() => {deleteOrder(Number(request.id))}}>
                                            <NegativeIcon />
                                        </Button>
                                    }   
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        
    )
};

export default OrderListPage;