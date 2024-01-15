import * as React from 'react';
import Header from '../../components/Header';
import BreadCrumbs from '../../components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import PlusIcon from '../../components/Icons/PlusIcon'
import MinusIcon from '../../components/Icons/MinusIcon'
import styles from './DetaliedPage.module.scss'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { mockItems } from '../../../consts'
import { api } from '../../api';
import { GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequest, GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetRequestsForAdminWithFiltersResponse, GithubComDanilaNikIU5RIP2023InternalHttpmodelsUserRequest } from '../../api/Api';
import { Button, Form, Table } from 'react-bootstrap';


const OrderListPage: React.FC = () => {
    //const {id} = useParams();
    //const [order, setOrder] = useState<GithubComDanilaNikIU5RIP2023InternalHttpmodelsUserRequest>()
    const [orders, setOrders] = useState<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetRequestsForAdminWithFiltersResponse>()
    const [linksMap, setLinksMap] = useState<Map<string, string>>(
        new Map<string, string>([['Домашняя страница', '/']])
    );



    const navigate = useNavigate();

    const mapStatus = (status: string) => {
        const statusMap = {
            "formed": "Выполняется",
            "completed": "Выполнен",
            "rejected": "Отменен",
        }
        return statusMap[status]
    };

    const formatDate = (date: string) => {
        return date.substring(0, 10);
    }

    const getOrderList = async () => {
        const { data } = await api.orders.ordersList({},{
            withCredentials: true,
        })

        const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
        newLinksMap.set('Заявки', '/orders');
        setLinksMap(newLinksMap)

        setOrders(data)

        console.log(data)
    };

    const approveOrder = async () => {
        await api.orders.makeUpdate({
            withCredentials: true,
        });

        navigate("/")
    }

    const deleteOrder = async () => {
        await api.orders.deleteDelete({id: Number(id)}, {
            withCredentials: true,
        });
        navigate("/")
    }

    useEffect(() => {
        getOrderList()
    }, []);

    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{paddingTop: "90px"}}>
                <BreadCrumbs links={linksMap}/>
                <div>
                    <Table bordered hover responsive="md" className="table w-100">
                        <thead>
                            <tr>
                            <th>№ заказа</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Статус</th>
                            {/* {order?.request?.status == "draft" && <th>Действие</th>} */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.requests?.map((request, index) => (
                            <tr key={index}>
                                <td>{request.id}</td>
                                {/* <td><Link to={"/items/"+item.id}>{item.name}</Link></td> */}
                                <td>{formatDate(request.creationDate)}</td>
                                <td>{formatDate(request.formationDate)}</td>
                                <td>{mapStatus(request.status)}</td>
                                {/* <td>
                                    <Button onClick={() => {addItem(item.id)}} >Добавить</Button>
                                    <Button onClick={() => {deleteItem(item.id)}}>Удалить</Button>
                                </td> */}
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* {order?.request?.status == "draft" && <Button onClick={approveOrder} variant="success" className="m-3" style={{width: '200px'}}>Подтвердить заказ</Button>}
                    {order?.request?.status == "draft" && <Button onClick={deleteOrder} variant="danger" className="m-3" style={{width: '200px'}}>Удалить заказ</Button>} */}
                </div>
            </div>
        </div>
        
    )
};
  
export default OrderListPage;